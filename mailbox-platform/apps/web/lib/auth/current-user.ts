import { cookies } from "next/headers";
import { query } from "@/lib/db/mysql";
import { SESSION_COOKIE, hashSessionToken } from "@/lib/security/session";

export type CurrentUser = {
  id: string;
  email: string;
  name: string;
};

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const users = await query<CurrentUser[]>(
    `SELECT users.id, users.email, users.name
     FROM sessions
     INNER JOIN users ON users.id = sessions.user_id
     WHERE sessions.token_hash = ?
       AND sessions.revoked_at IS NULL
       AND sessions.expires_at > UTC_TIMESTAMP()
     LIMIT 1`,
    [hashSessionToken(token)],
  );

  return users[0] ?? null;
};
