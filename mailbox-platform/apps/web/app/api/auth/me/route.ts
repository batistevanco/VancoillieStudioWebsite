import { getCurrentUser } from "@/lib/auth/current-user";
import { query } from "@/lib/db/mysql";
import { jsonError, jsonOk } from "@/lib/auth/responses";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return jsonError("Niet ingelogd.", 401);
  }

  return jsonOk({ user });
}

export async function PATCH(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return jsonError("Niet ingelogd.", 401);
  }

  const body = (await request.json()) as { name?: string };
  const name = body.name?.trim();

  if (!name || name.length < 1 || name.length > 100) {
    return jsonError("Ongeldige naam.", 400);
  }

  await query(`UPDATE users SET name = ? WHERE id = ?`, [name, user.id]);

  return jsonOk({ message: "Naam bijgewerkt." });
}
