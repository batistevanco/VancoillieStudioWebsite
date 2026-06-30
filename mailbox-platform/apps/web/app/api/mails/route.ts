import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/current-user";
import { query } from "@/lib/db/mysql";
import { decryptSecret, encryptSecret } from "@/lib/security/encryption";
import { refreshAccessToken, type OAuthProvider } from "@/lib/providers/oauth";
import { fetchImapMails } from "@/lib/mail/imap";
import { jsonError, jsonOk } from "@/lib/auth/responses";

export const runtime = "nodejs";

const IMAP_PROVIDERS = ["icloud", "yahoo", "imap"];

type MailboxAccountRow = {
  id: string;
  provider: string;
  email: string;
  encrypted_access_token: string;
  encrypted_refresh_token: string | null;
  token_expires_at: string | null;
  imap_host: string | null;
  imap_port: number | null;
};

type MailFolder = "inbox" | "sent" | "all" | "drafts" | "spam" | "trash";
const VALID_FOLDERS: MailFolder[] = ["inbox", "sent", "all", "drafts", "spam", "trash"];

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return jsonError("Niet ingelogd.", 401);
  }

  const folderParam = request.nextUrl.searchParams.get("folder") ?? "inbox";
  const folder: MailFolder = VALID_FOLDERS.includes(folderParam as MailFolder)
    ? (folderParam as MailFolder)
    : "inbox";

  try {
    // 1. Fetch connected accounts
    const accounts = await query<MailboxAccountRow[]>(
      `SELECT id, provider, email, encrypted_access_token, encrypted_refresh_token, token_expires_at, imap_host, imap_port
       FROM mailbox_accounts
       WHERE user_id = ?
         AND disconnected_at IS NULL`,
      [user.id]
    );

    if (accounts.length === 0) {
      return jsonOk({ mails: [] });
    }

    const allMails: any[] = [];

    // 2. Fetch mails for each account
    await Promise.all(
      accounts.map(async (account) => {
        try {
          let accessToken = decryptSecret(account.encrypted_access_token);
          const expiresAt = account.token_expires_at ? new Date(account.token_expires_at) : null;
          const isExpired = expiresAt ? expiresAt.getTime() < Date.now() + 5 * 60 * 1000 : false;

          // Try to refresh token if expired
          if (isExpired && account.encrypted_refresh_token) {
            try {
              const refreshToken = decryptSecret(account.encrypted_refresh_token);
              const newTokens = await refreshAccessToken(account.provider as OAuthProvider, refreshToken);
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
              console.error(`Failed to refresh token for ${account.email}:`, refreshErr);
            }
          }

          // Fetch actual emails based on provider
          let mails: any[] = [];
          if (account.provider === "google") {
            mails = await fetchGoogleMails(accessToken, account.id, folder);
          } else if (account.provider === "microsoft") {
            mails = await fetchMicrosoftMails(accessToken, account.id, folder);
          } else if (IMAP_PROVIDERS.includes(account.provider)) {
            if (account.imap_host && account.imap_port) {
              const password = decryptSecret(account.encrypted_access_token);
              mails = await fetchImapMails(
                account.imap_host, account.imap_port,
                account.email, password,
                account.id, account.provider, folder
              );
            }
          }

          allMails.push(...mails);
        } catch (accountErr: any) {
          console.error(`Failed to fetch mails for account ${account.email}:`, accountErr);
          if (accountErr?.message && (accountErr.message.includes("GMAIL_API_DISABLED") || accountErr.message.includes("Gmail API has not been used"))) {
            throw accountErr; // Propagate up to return a 403
          }
        }
      })
    );

    // 3. Sort mails by date descending
    allMails.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return jsonOk({ mails: allMails });
  } catch (error: any) {
    console.error("Failed to fetch mails route:", error);
    if (error?.message && (error.message.includes("GMAIL_API_DISABLED") || error.message.includes("Gmail API has not been used"))) {
      return jsonError(error.message, 403);
    }
    return jsonError("Fout bij het ophalen van e-mails.", 500);
  }
}

// --- Gmail Fetcher Helper ---
const GMAIL_LABEL_MAP: Record<string, string> = {
  inbox: "INBOX",
  sent: "SENT",
  drafts: "DRAFT",
  spam: "SPAM",
  trash: "TRASH",
};

async function fetchGoogleMails(accessToken: string, accountId: string, folder: string) {
  const params = new URLSearchParams({ maxResults: "20" });
  const label = GMAIL_LABEL_MAP[folder];
  if (label) {
    params.set("labelIds", label);
  } else {
    // "all" — exclude spam and trash
    params.set("q", "-in:spam -in:trash");
  }

  const listRes = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages?${params}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!listRes.ok) {
    const errBody = await listRes.json().catch(() => ({}));
    const message = errBody?.error?.message || "";
    if (message.includes("Gmail API has not been used") || message.includes("disabled")) {
      throw new Error(`GMAIL_API_DISABLED: ${message}`);
    }
    throw new Error(`Gmail API returned status ${listRes.status}`);
  }

  const listData = await listRes.json();
  const messages = listData.messages || [];

  const mailDetails = await Promise.all(
    messages.map(async (msg: any) => {
      try {
        const detailRes = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=full`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (!detailRes.ok) return null;
        const detail = await detailRes.json();

        const headers = detail.payload?.headers || [];
        const fromHeader = headers.find((h: any) => h.name.toLowerCase() === "from")?.value || "";
        const subjectHeader = headers.find((h: any) => h.name.toLowerCase() === "subject")?.value || "(Geen onderwerp)";
        const dateHeader = headers.find((h: any) => h.name.toLowerCase() === "date")?.value || "";

        let body = "";
        if (detail.payload) {
          body = extractGoogleMailBody(detail.payload);
        }
        if (!body) {
          body = detail.snippet || "";
        }

        const unread = detail.labelIds?.includes("UNREAD") || false;

        return {
          id: `google_${msg.id}`,
          accountId,
          provider: "google",
          from: parseEmailAddress(fromHeader),
          subject: subjectHeader,
          snippet: detail.snippet || "",
          date: dateHeader ? new Date(dateHeader).toISOString() : new Date().toISOString(),
          isRead: !unread,
          body,
        };
      } catch (err) {
        console.error("Error fetching Google message detail:", err);
        return null;
      }
    })
  );

  return mailDetails.filter(Boolean);
}

// --- Microsoft Outlook Fetcher Helper ---
const OUTLOOK_FOLDER_MAP: Record<string, string | null> = {
  inbox: "inbox",
  sent: "sentitems",
  drafts: "drafts",
  spam: "junkemail",
  trash: "deleteditems",
  all: null,
};

async function fetchMicrosoftMails(accessToken: string, accountId: string, folder: string) {
  const folderSegment = OUTLOOK_FOLDER_MAP[folder];
  const base = folderSegment
    ? `https://graph.microsoft.com/v1.0/me/mailFolders/${folderSegment}/messages`
    : "https://graph.microsoft.com/v1.0/me/messages";

  const res = await fetch(
    `${base}?$top=20&$select=id,subject,bodyPreview,from,receivedDateTime,isRead,body&$orderby=receivedDateTime desc`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!res.ok) {
    throw new Error(`Microsoft Graph API returned status ${res.status}`);
  }

  const data = await res.json();
  const messages = data.value || [];

  return messages.map((msg: any) => {
    const fromName = msg.from?.emailAddress?.name || "";
    const fromEmail = msg.from?.emailAddress?.address || "";

    return {
      id: `microsoft_${msg.id}`,
      accountId,
      provider: "microsoft",
      from: {
        name: fromName || fromEmail.split("@")[0],
        email: fromEmail,
      },
      subject: msg.subject || "(Geen onderwerp)",
      snippet: msg.bodyPreview || "",
      date: msg.receivedDateTime ? new Date(msg.receivedDateTime).toISOString() : new Date().toISOString(),
      isRead: msg.isRead ?? true,
      body: msg.body?.content || msg.bodyPreview || "",
    };
  });
}

// --- Helper Parsers ---
function parseEmailAddress(fromHeader: string) {
  const match = fromHeader.match(/^(.*?)\s*<(.*?)>$/);
  if (match) {
    return {
      name: match[1].replace(/['"]/g, "").trim(),
      email: match[2].trim(),
    };
  }
  return {
    name: fromHeader.split("@")[0],
    email: fromHeader.trim(),
  };
}

function findPartByMimeType(payload: any, mimeType: string): any {
  if (payload.mimeType === mimeType && payload.body?.data) {
    return payload;
  }

  if (payload.parts) {
    for (const part of payload.parts) {
      const found = findPartByMimeType(part, mimeType);
      if (found) return found;
    }
  }

  return null;
}

function extractGoogleMailBody(payload: any): string {
  // 1. Try to find HTML part
  const htmlPart = findPartByMimeType(payload, "text/html");
  if (htmlPart && htmlPart.body?.data) {
    return decodeBase64Url(htmlPart.body.data);
  }

  // 2. Fall back to plain text part
  const plainPart = findPartByMimeType(payload, "text/plain");
  if (plainPart && plainPart.body?.data) {
    return decodeBase64Url(plainPart.body.data);
  }

  // 3. Fall back to raw body if present
  if (payload.body?.data) {
    return decodeBase64Url(payload.body.data);
  }

  // 4. Recursively check first available part if nothing specific found
  if (payload.parts && payload.parts.length > 0) {
    return extractGoogleMailBody(payload.parts[0]);
  }

  return "";
}

function decodeBase64Url(data: string) {
  const base64 = data.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(base64, "base64").toString("utf-8");
}
