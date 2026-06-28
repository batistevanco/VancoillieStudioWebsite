import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db/mysql";
import {
  SESSION_COOKIE,
  clearSessionCookie,
  hashSessionToken,
} from "@/lib/security/session";
import { writeAuditEvent } from "@/lib/auth/audit";
import { getRequestContext } from "@/lib/auth/request";
import { jsonOk } from "@/lib/auth/responses";

export const runtime = "nodejs";

type SessionRow = {
  user_id: string;
};

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const { ipAddress, userAgent } = getRequestContext(request);

  if (token) {
    const tokenHash = hashSessionToken(token);
    const sessions = await query<SessionRow[]>(
      `SELECT user_id FROM sessions WHERE token_hash = ? LIMIT 1`,
      [tokenHash],
    );

    await query(
      `UPDATE sessions
       SET revoked_at = UTC_TIMESTAMP()
       WHERE token_hash = ?`,
      [tokenHash],
    );

    await writeAuditEvent({
      userId: sessions[0]?.user_id,
      event: "auth.logout.succeeded",
      ipAddress,
      userAgent,
    });
  }

  await clearSessionCookie();

  return jsonOk({});
}
