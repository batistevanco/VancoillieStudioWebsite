import { query } from "@/lib/db/mysql";
import { encryptSecret } from "@/lib/security/encryption";
import type { OAuthProvider } from "@/lib/providers/oauth";

export const storeProviderConnection = async ({
  userId,
  provider,
  providerAccountId,
  email,
  displayName,
  avatarUrl,
  accessToken,
  refreshToken,
  expiresIn,
  scopes,
}: {
  userId: string;
  provider: OAuthProvider;
  providerAccountId: string;
  email: string;
  displayName: string | null;
  avatarUrl: string | null;
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  scopes?: string;
}) => {
  const encryptedAccessToken = encryptSecret(accessToken);
  const encryptedRefreshToken = refreshToken
    ? encryptSecret(refreshToken)
    : null;

  await query(
    `INSERT INTO mailbox_accounts
      (
        id,
        user_id,
        provider,
        provider_account_id,
        email,
        display_name,
        avatar_url,
        encrypted_access_token,
        encrypted_refresh_token,
        token_expires_at,
        scopes,
        connected_at,
        sync_status
      )
     VALUES
      (
        UUID(),
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        CASE WHEN ? IS NULL THEN NULL ELSE DATE_ADD(UTC_TIMESTAMP(), INTERVAL ? SECOND) END,
        ?,
        UTC_TIMESTAMP(),
        'connected'
      )
     ON DUPLICATE KEY UPDATE
        email = VALUES(email),
        display_name = VALUES(display_name),
        avatar_url = VALUES(avatar_url),
        encrypted_access_token = VALUES(encrypted_access_token),
        encrypted_refresh_token = COALESCE(VALUES(encrypted_refresh_token), encrypted_refresh_token),
        token_expires_at = VALUES(token_expires_at),
        scopes = VALUES(scopes),
        connected_at = UTC_TIMESTAMP(),
        disconnected_at = NULL,
        sync_status = 'connected',
        updated_at = UTC_TIMESTAMP()`,
    [
      userId,
      provider,
      providerAccountId,
      email,
      displayName,
      avatarUrl,
      encryptedAccessToken,
      encryptedRefreshToken,
      expiresIn ?? null,
      expiresIn ?? null,
      scopes ?? null,
    ],
  );
};
