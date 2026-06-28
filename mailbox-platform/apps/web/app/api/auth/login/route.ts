import { NextRequest } from "next/server";
import { createSession } from "@/lib/security/session";
import { verifyPassword } from "@/lib/security/password";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { query } from "@/lib/db/mysql";
import { writeAuditEvent } from "@/lib/auth/audit";
import {
  getRequestContext,
  isValidEmail,
  normalizeEmail,
} from "@/lib/auth/request";
import { jsonError, jsonOk } from "@/lib/auth/responses";

export const runtime = "nodejs";

type UserRow = {
  id: string;
  email: string;
  name: string;
  password_hash: string;
};

export async function POST(request: NextRequest) {
  const { ipAddress, userAgent } = getRequestContext(request);
  const rateLimit = checkRateLimit({
    key: `login:${ipAddress ?? "unknown"}`,
    limit: 10,
    windowMs: 15 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return jsonError(
      `Te veel pogingen. Probeer opnieuw over ${rateLimit.retryAfterSeconds} seconden.`,
      429,
    );
  }

  const body = (await request.json().catch(() => null)) as {
    email?: unknown;
    password?: unknown;
  } | null;

  const email =
    typeof body?.email === "string" ? normalizeEmail(body.email) : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!isValidEmail(email) || !password) {
    return jsonError("Controleer je e-mailadres en wachtwoord.", 400);
  }

  const users = await query<UserRow[]>(
    `SELECT id, email, name, password_hash
     FROM users
     WHERE email = ?
     LIMIT 1`,
    [email],
  );

  const user = users[0];

  if (!user || !(await verifyPassword(password, user.password_hash))) {
    await writeAuditEvent({
      userId: user?.id,
      event: "auth.login.failed",
      ipAddress,
      userAgent,
      metadata: { email },
    });

    return jsonError("Controleer je e-mailadres en wachtwoord.", 401);
  }

  await createSession({ userId: user.id, userAgent, ipAddress });

  await query(`UPDATE users SET last_login_at = UTC_TIMESTAMP() WHERE id = ?`, [
    user.id,
  ]);

  await writeAuditEvent({
    userId: user.id,
    event: "auth.login.succeeded",
    ipAddress,
    userAgent,
  });

  return jsonOk({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
}
