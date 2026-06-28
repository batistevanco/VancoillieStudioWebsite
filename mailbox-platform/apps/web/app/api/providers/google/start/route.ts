import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/current-user";
import { buildAuthorizationUrl } from "@/lib/providers/oauth";
import { jsonError } from "@/lib/auth/responses";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return jsonError("Niet ingelogd.", 401);
  }

  return NextResponse.redirect(await buildAuthorizationUrl("google"));
}
