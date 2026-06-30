import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/current-user";
import { OAUTH_STATE_COOKIE_PREFIX, buildAuthorizationUrl } from "@/lib/providers/oauth";
import { env } from "@/lib/config/env";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const urlObj = new URL(request.url);
    const baseUrl = `${urlObj.protocol}//${urlObj.host}`;
    const { url, state } = await buildAuthorizationUrl("google", baseUrl);
    const response = NextResponse.redirect(url);

    response.cookies.set(`${OAUTH_STATE_COOKIE_PREFIX}google`, state, {
      httpOnly: true,
      secure: env.security.isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 10 * 60,
    });

    return response;
  } catch {
    return NextResponse.redirect(
      new URL("/connect-accounts?provider_error=google_config", request.url),
    );
  }
}
