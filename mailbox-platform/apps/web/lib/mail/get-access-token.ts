import { query } from "@/lib/db/mysql";
import { decryptSecret, encryptSecret } from "@/lib/security/encryption";
import { refreshAccessToken, type OAuthProvider } from "@/lib/providers/oauth";

type AccountTokenRow = {
  id: string;
  provider: string;
  encrypted_access_token: string;
  encrypted_refresh_token: string | null;
  token_expires_at: string | null;
};

export const getValidAccessToken = async (
  accountId: string,
  userId: string,
): Promise<{ accessToken: string; provider: OAuthProvider }> => {
  const rows = await query<AccountTokenRow[]>(
    `SELECT id, provider, encrypted_access_token, encrypted_refresh_token, token_expires_at
     FROM mailbox_accounts
     WHERE id = ? AND user_id = ? AND disconnected_at IS NULL
     LIMIT 1`,
    [accountId, userId],
  );

  const account = rows[0];
  if (!account) throw new Error(`Account ${accountId} not found.`);

  const expiresAt = account.token_expires_at
    ? new Date(account.token_expires_at + " UTC")
    : null;
  const isExpired = expiresAt
    ? expiresAt.getTime() - 60_000 < Date.now()
    : false;

  if (!isExpired) {
    return {
      accessToken: decryptSecret(account.encrypted_access_token),
      provider: account.provider as OAuthProvider,
    };
  }

  if (!account.encrypted_refresh_token) {
    throw new Error(`No refresh token for account ${accountId}.`);
  }

  const refreshToken = decryptSecret(account.encrypted_refresh_token);
  const tokens = await refreshAccessToken(
    account.provider as OAuthProvider,
    refreshToken,
  );

  await query(
    `UPDATE mailbox_accounts
     SET encrypted_access_token = ?,
         token_expires_at = CASE WHEN ? IS NULL THEN NULL ELSE DATE_ADD(UTC_TIMESTAMP(), INTERVAL ? SECOND) END,
         updated_at = UTC_TIMESTAMP()
     WHERE id = ?`,
    [
      encryptSecret(tokens.access_token),
      tokens.expires_in ?? null,
      tokens.expires_in ?? null,
      accountId,
    ],
  );

  return {
    accessToken: tokens.access_token,
    provider: account.provider as OAuthProvider,
  };
};
