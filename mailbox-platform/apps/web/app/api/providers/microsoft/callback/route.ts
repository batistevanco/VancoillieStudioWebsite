import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/current-user";
import { writeAuditEvent } from "@/lib/auth/audit";
import { getRequestContext } from "@/lib/auth/request";
import {
  consumeOAuthState,
  exchangeCodeForTokens,
  fetchProviderProfile,
} from "@/lib/providers/oauth";
import { storeProviderConnection } from "@/lib/providers/store-connection";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  const { ipAddress, userAgent } = getRequestContext(request);
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!user) {
    return NextResponse.redirect(
      new URL("/connect-accounts?provider_error=session_lost", request.url),
    );
  }

  if (!code || !(await consumeOAuthState("microsoft", state))) {
    return NextResponse.redirect(
      new URL("/connect-accounts?provider_error=microsoft_state", request.url),
    );
  }

  try {
    const urlObj = new URL(request.url);
    const baseUrl = `${urlObj.protocol}//${urlObj.host}`;
    const tokens = await exchangeCodeForTokens({ provider: "microsoft", code, baseUrl });
    const profile = await fetchProviderProfile({
      provider: "microsoft",
      accessToken: tokens.access_token,
    });

    if (!profile.providerAccountId || !profile.email) {
      throw new Error("Microsoft profile is missing required identifiers.");
    }

    await storeProviderConnection({
      userId: user.id,
      provider: "microsoft",
      providerAccountId: profile.providerAccountId,
      email: profile.email,
      displayName: profile.displayName ?? null,
      avatarUrl: profile.avatarUrl ?? null,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresIn: tokens.expires_in,
      scopes: tokens.scope,
    });

    await writeAuditEvent({
      userId: user.id,
      event: "provider.microsoft.connected",
      ipAddress,
      userAgent,
      metadata: { email: profile.email },
    });

    return NextResponse.redirect(
      new URL("/connect-accounts?connected=microsoft", request.url),
    );
  } catch {
    return NextResponse.redirect(
      new URL("/connect-accounts?provider_error=microsoft", request.url),
    );
  }
}
