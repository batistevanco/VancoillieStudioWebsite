import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import { env } from "@/lib/config/env";

export type OAuthProvider = "google" | "microsoft";

export const OAUTH_STATE_COOKIE_PREFIX = env.security.isProduction
  ? "__Host-vancoillie_oauth_state_"
  : "vancoillie_oauth_state_";

export type ProviderConfig = {
  id: OAuthProvider;
  label: string;
  authUrl: string;
  tokenUrl: string;
  userInfoUrl: string;
  scopes: string[];
  clientId: () => string;
  clientSecret: () => string;
};

export const providerConfigs: Record<OAuthProvider, ProviderConfig> = {
  google: {
    id: "google",
    label: "Gmail",
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    userInfoUrl: "https://openidconnect.googleapis.com/v1/userinfo",
    scopes: [
      "openid",
      "email",
      "profile",
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/gmail.modify",
      "https://www.googleapis.com/auth/gmail.send",
    ],
    clientId: env.providers.google.clientId,
    clientSecret: env.providers.google.clientSecret,
  },
  microsoft: {
    id: "microsoft",
    label: "Outlook",
    authUrl: `https://login.microsoftonline.com/${env.providers.microsoft.tenant()}/oauth2/v2.0/authorize`,
    tokenUrl: `https://login.microsoftonline.com/${env.providers.microsoft.tenant()}/oauth2/v2.0/token`,
    userInfoUrl: "https://graph.microsoft.com/oidc/userinfo",
    scopes: [
      "openid",
      "email",
      "profile",
      "offline_access",
      "Mail.ReadWrite",
      "Mail.Send",
    ],
    clientId: env.providers.microsoft.clientId,
    clientSecret: env.providers.microsoft.clientSecret,
  },
};

export const getRedirectUri = (provider: OAuthProvider, baseUrl: string) =>
  `${baseUrl}/api/providers/${provider}/callback`;

export const createOAuthState = async (provider: OAuthProvider) => {
  const state = randomBytes(32).toString("base64url");
  const cookieStore = await cookies();

  cookieStore.set(`${OAUTH_STATE_COOKIE_PREFIX}${provider}`, state, {
    httpOnly: true,
    secure: env.security.isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 10 * 60,
  });

  return state;
};

export const consumeOAuthState = async (
  provider: OAuthProvider,
  state: string | null,
) => {
  const cookieStore = await cookies();
  const cookieName = `${OAUTH_STATE_COOKIE_PREFIX}${provider}`;
  const expectedState = cookieStore.get(cookieName)?.value;

  cookieStore.set(cookieName, "", {
    httpOnly: true,
    secure: env.security.isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return Boolean(state && expectedState && state === expectedState);
};

export const buildAuthorizationUrl = async (provider: OAuthProvider, baseUrl: string) => {
  const config = providerConfigs[provider];
  const state = randomBytes(32).toString("base64url");
  const params = new URLSearchParams({
    client_id: config.clientId(),
    redirect_uri: getRedirectUri(provider, baseUrl),
    response_type: "code",
    scope: config.scopes.join(" "),
    state,
    prompt: "consent",
  });

  if (provider === "google") {
    params.set("access_type", "offline");
    params.set("include_granted_scopes", "true");
  }

  return {
    url: `${config.authUrl}?${params.toString()}`,
    state,
  };
};

export const exchangeCodeForTokens = async ({
  provider,
  code,
  baseUrl,
}: {
  provider: OAuthProvider;
  code: string;
  baseUrl: string;
}) => {
  const config = providerConfigs[provider];
  const response = await fetch(config.tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: config.clientId(),
      client_secret: config.clientSecret(),
      code,
      grant_type: "authorization_code",
      redirect_uri: getRedirectUri(provider, baseUrl),
    }),
  });

  if (!response.ok) {
    throw new Error(`Token exchange failed for ${provider}.`);
  }

  return (await response.json()) as {
    access_token: string;
    refresh_token?: string;
    expires_in?: number;
    scope?: string;
    token_type?: string;
    id_token?: string;
  };
};

export const fetchProviderProfile = async ({
  provider,
  accessToken,
}: {
  provider: OAuthProvider;
  accessToken: string;
}) => {
  const response = await fetch(providerConfigs[provider].userInfoUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Profile fetch failed for ${provider}.`);
  }

  const profile = (await response.json()) as {
    sub?: string;
    id?: string;
    email?: string;
    name?: string;
    picture?: string;
  };

  return {
    providerAccountId: profile.sub ?? profile.id,
    email: profile.email,
    displayName: profile.name,
    avatarUrl: profile.picture,
  };
};

export const refreshAccessToken = async (
  provider: OAuthProvider,
  refreshToken: string,
) => {
  const config = providerConfigs[provider];
  const response = await fetch(config.tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: config.clientId(),
      client_secret: config.clientSecret(),
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) {
    throw new Error(`Token refresh failed for ${provider}.`);
  }

  return (await response.json()) as {
    access_token: string;
    refresh_token?: string;
    expires_in?: number;
    scope?: string;
  };
};
