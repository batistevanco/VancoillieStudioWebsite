import { NextRequest } from "next/server";
import { randomUUID } from "crypto";
import { createSession } from "@/lib/security/session";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { hashPassword } from "@/lib/security/password";
import { query } from "@/lib/db/mysql";
import { writeAuditEvent } from "@/lib/auth/audit";
import {
  getRequestContext,
  isValidEmail,
  normalizeEmail,
} from "@/lib/auth/request";
import { jsonError, jsonOk } from "@/lib/auth/responses";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const { ipAddress, userAgent } = getRequestContext(request);
  const rateLimit = checkRateLimit({
    key: `signup:${ipAddress ?? "unknown"}`,
    limit: 8,
    windowMs: 15 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return jsonError(
      `Te veel pogingen. Probeer opnieuw over ${rateLimit.retryAfterSeconds} seconden.`,
      429,
    );
  }

  const body = (await request.json().catch(() => null)) as {
    name?: unknown;
    email?: unknown;
    password?: unknown;
  } | null;

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email =
    typeof body?.email === "string" ? normalizeEmail(body.email) : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (name.length < 2 || name.length > 120) {
    return jsonError("Vul een geldige naam in.", 400);
  }

  if (!isValidEmail(email)) {
    return jsonError("Vul een geldig e-mailadres in.", 400);
  }

  if (password.length < 12) {
    return jsonError("Gebruik een wachtwoord van minstens 12 tekens.", 400);
  }

  const userId = randomUUID();
  const passwordHash = await hashPassword(password);

  try {
    await query(
      `INSERT INTO users
        (id, email, name, password_hash, email_verified_at)
       VALUES
        (?, ?, ?, ?, NULL)`,
      [userId, email, name, passwordHash],
    );

    await writeAuditEvent({
      userId,
      event: "auth.signup.created",
      ipAddress,
      userAgent,
    });

    await createSession({ userId, userAgent, ipAddress });

    return jsonOk({
      user: {
        id: userId,
        email,
        name,
      },
    });
  } catch (error) {
    const code =
      typeof error === "object" && error && "code" in error
        ? String(error.code)
        : "";

    if (code === "ER_DUP_ENTRY") {
      await writeAuditEvent({
        event: "auth.signup.duplicate",
        ipAddress,
        userAgent,
        metadata: { email },
      });

      return jsonError("Er bestaat al een account met dit e-mailadres.", 409);
    }

    throw error;
  }
}
