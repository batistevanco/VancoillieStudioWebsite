import { getCurrentUser } from "@/lib/auth/current-user";
import { query } from "@/lib/db/mysql";
import { jsonError, jsonOk } from "@/lib/auth/responses";

export const runtime = "nodejs";

type MailboxAccountRow = {
  id: string;
  provider: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  connected_at: string;
  sync_status: string;
};

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return jsonError("Niet ingelogd.", 401);
  }

  const accounts = await query<MailboxAccountRow[]>(
    `SELECT id, provider, email, display_name, avatar_url, connected_at, sync_status
     FROM mailbox_accounts
     WHERE user_id = ?
       AND disconnected_at IS NULL
     ORDER BY connected_at ASC`,
    [user.id],
  );

  return jsonOk({ accounts });
}
