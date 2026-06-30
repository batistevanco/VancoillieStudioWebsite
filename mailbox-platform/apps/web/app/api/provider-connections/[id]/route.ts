import { getCurrentUser } from "@/lib/auth/current-user";
import { query } from "@/lib/db/mysql";
import { jsonError, jsonOk } from "@/lib/auth/responses";

export const runtime = "nodejs";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();

  if (!user) {
    return jsonError("Niet ingelogd.", 401);
  }

  const { id } = await params;

  const result = await query<{ affectedRows: number }>(
    `UPDATE mailbox_accounts
     SET disconnected_at = UTC_TIMESTAMP()
     WHERE id = ? AND user_id = ? AND disconnected_at IS NULL`,
    [id, user.id],
  );

  if ((result as unknown as { affectedRows: number }).affectedRows === 0) {
    return jsonError("Account niet gevonden.", 404);
  }

  return jsonOk({ message: "Account ontkoppeld." });
}
