import { getCurrentUser } from "@/lib/auth/current-user";
import { jsonError, jsonOk } from "@/lib/auth/responses";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return jsonError("Niet ingelogd.", 401);
  }

  return jsonOk({ user });
}
