import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/current-user";
import { query } from "@/lib/db/mysql";
import { decryptSecret, encryptSecret } from "@/lib/security/encryption";
import { refreshAccessToken } from "@/lib/providers/oauth";
import { jsonError, jsonOk } from "@/lib/auth/responses";

export const runtime = "nodejs";

type MailboxAccountRow = {
  id: string;
  provider: "google" | "microsoft";
  email: string;
  encrypted_access_token: string;
  encrypted_refresh_token: string | null;
  token_expires_at: string | null;
};

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return jsonError("Niet ingelogd.", 401);
  }

  try {
    const { accountId, to, subject, body } = await request.json();

    if (!accountId || !to || !subject || !body) {
      return jsonError("Ontbrekende verplichte velden.", 400);
    }

    // 1. Get the account credentials
    const accounts = await query<MailboxAccountRow[]>(
      `SELECT id, provider, email, encrypted_access_token, encrypted_refresh_token, token_expires_at
       FROM mailbox_accounts
       WHERE id = ? AND user_id = ? AND disconnected_at IS NULL`,
      [accountId, user.id]
    );

    if (accounts.length === 0) {
      return jsonError("Account niet gevonden.", 404);
    }

    const account = accounts[0];
    let accessToken = decryptSecret(account.encrypted_access_token);
    const expiresAt = account.token_expires_at ? new Date(account.token_expires_at) : null;
    const isExpired = expiresAt ? expiresAt.getTime() < Date.now() + 5 * 60 * 1000 : false;

    // Refresh token if expired
    if (isExpired && account.encrypted_refresh_token) {
      try {
        const refreshToken = decryptSecret(account.encrypted_refresh_token);
        const newTokens = await refreshAccessToken(account.provider, refreshToken);
        accessToken = newTokens.access_token;

        const encryptedAccessToken = encryptSecret(newTokens.access_token);
        const encryptedRefreshToken = newTokens.refresh_token ? encryptSecret(newTokens.refresh_token) : null;
        const expiresIn = newTokens.expires_in;

        if (encryptedRefreshToken) {
          await query(
            `UPDATE mailbox_accounts
             SET encrypted_access_token = ?,
                 encrypted_refresh_token = ?,
                 token_expires_at = CASE WHEN ? IS NULL THEN NULL ELSE DATE_ADD(UTC_TIMESTAMP(), INTERVAL ? SECOND) END,
                 updated_at = UTC_TIMESTAMP()
             WHERE id = ?`,
            [encryptedAccessToken, encryptedRefreshToken, expiresIn ?? null, expiresIn ?? null, account.id]
          );
        } else {
          await query(
            `UPDATE mailbox_accounts
             SET encrypted_access_token = ?,
                 token_expires_at = CASE WHEN ? IS NULL THEN NULL ELSE DATE_ADD(UTC_TIMESTAMP(), INTERVAL ? SECOND) END,
                 updated_at = UTC_TIMESTAMP()
             WHERE id = ?`,
            [encryptedAccessToken, expiresIn ?? null, expiresIn ?? null, account.id]
          );
        }
      } catch (refreshErr) {
        console.error(`Failed to refresh token for sending:`, refreshErr);
      }
    }

    // 2. Send using the provider API
    if (account.provider === "google") {
      const rawEmail = makeRawEmail(to, subject, body);
      const res = await fetch(
        "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ raw: rawEmail }),
        }
      );

      if (!res.ok) {
        const errText = await res.text();
        console.error("Gmail send error response:", errText);
        throw new Error(`Gmail send API failed with status ${res.status}`);
      }
    } else if (account.provider === "microsoft") {
      const res = await fetch(
        "https://graph.microsoft.com/v1.0/me/sendMail",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: {
              subject,
              body: {
                contentType: "HTML",
                content: body,
              },
              toRecipients: [
                {
                  emailAddress: {
                    address: to,
                  },
                },
              ],
            },
          }),
        }
      );

      if (!res.ok) {
        const errText = await res.text();
        console.error("Outlook send error response:", errText);
        throw new Error(`Microsoft send API failed with status ${res.status}`);
      }
    }

    return jsonOk({ message: "E-mail succesvol verzonden." });
  } catch (error) {
    console.error("Error sending mail route:", error);
    return jsonError("Fout bij het verzenden van e-mail.", 500);
  }
}

function makeRawEmail(to: string, subject: string, body: string) {
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString("base64")}?=`;
  const parts = [
    `To: ${to}`,
    `Subject: ${utf8Subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=utf-8",
    "Content-Transfer-Encoding: base64",
    "",
    Buffer.from(body).toString("base64"),
  ];
  return Buffer.from(parts.join("\r\n")).toString("base64url");
}
