import { cookies } from "next/headers";
import { createHash, randomBytes } from "crypto";
import { query } from "@/lib/db/mysql";
import { env } from "@/lib/config/env";

export const SESSION_COOKIE = env.security.isProduction
  ? "__Host-vancoillie_mailbox_session"
  : "vancoillie_mailbox_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export const hashSessionToken = (token: string) =>
  createHash("sha256")
    .update(`${token}.${env.security.sessionSecret()}`)
    .digest("base64url");

export const createSession = async ({
  userId,
  userAgent,
  ipAddress,
}: {
  userId: string;
  userAgent: string | null;
  ipAddress: string | null;
}) => {
  const token = randomBytes(32).toString("base64url");
  const tokenHash = hashSessionToken(token);

  await query(
    `INSERT INTO sessions
      (id, user_id, token_hash, user_agent, ip_address, expires_at)
     VALUES
      (UUID(), ?, ?, ?, ?, DATE_ADD(UTC_TIMESTAMP(), INTERVAL ? SECOND))`,
    [userId, tokenHash, userAgent, ipAddress, SESSION_MAX_AGE_SECONDS],
  );

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: env.security.isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
};

export const clearSessionCookie = async () => {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: env.security.isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
};
