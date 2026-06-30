import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/current-user";
import { query } from "@/lib/db/mysql";
import { encryptSecret } from "@/lib/security/encryption";
import { validateImapConnection } from "@/lib/mail/imap";
import { jsonError, jsonOk } from "@/lib/auth/responses";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

const PROVIDER_DEFAULTS: Record<string, { imapHost: string; imapPort: number; smtpHost: string; smtpPort: number }> = {
  icloud: { imapHost: "imap.mail.me.com", imapPort: 993, smtpHost: "smtp.mail.me.com", smtpPort: 587 },
  yahoo:  { imapHost: "imap.mail.yahoo.com", imapPort: 993, smtpHost: "smtp.mail.yahoo.com", smtpPort: 465 },
};

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return jsonError("Niet ingelogd.", 401);

  try {
    const { provider, email, password, imapHost, imapPort, smtpHost, smtpPort } = await request.json();

    if (!provider || !email || !password) {
      return jsonError("E-mailadres en wachtwoord zijn verplicht.", 400);
    }

    const defaults = PROVIDER_DEFAULTS[provider];
    const resolvedImapHost: string = imapHost || defaults?.imapHost;
    const resolvedImapPort: number = Number(imapPort) || defaults?.imapPort;
    const resolvedSmtpHost: string = smtpHost || defaults?.smtpHost;
    const resolvedSmtpPort: number = Number(smtpPort) || defaults?.smtpPort;

    if (!resolvedImapHost || !resolvedImapPort || !resolvedSmtpHost || !resolvedSmtpPort) {
      return jsonError("IMAP- en SMTP-servergegevens zijn verplicht.", 400);
    }

    // Validate the IMAP credentials before storing
    try {
      await validateImapConnection(resolvedImapHost, resolvedImapPort, email, password);
    } catch (err) {
      console.error("IMAP validation failed:", err);
      return jsonError(
        "Kan geen verbinding maken met de IMAP-server. Controleer je e-mailadres, wachtwoord en servergegevens.",
        422
      );
    }

    const encryptedPassword = encryptSecret(password);
    const id = randomUUID();
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");

    // Upsert: update if same provider+email already exists for this user
    const existing = await query<{ id: string }[]>(
      `SELECT id FROM mailbox_accounts WHERE user_id = ? AND provider = ? AND email = ? LIMIT 1`,
      [user.id, provider, email]
    );

    if (existing.length > 0) {
      await query(
        `UPDATE mailbox_accounts
         SET encrypted_access_token = ?, imap_host = ?, imap_port = ?, smtp_host = ?, smtp_port = ?,
             disconnected_at = NULL, sync_status = 'connected', updated_at = UTC_TIMESTAMP()
         WHERE id = ?`,
        [encryptedPassword, resolvedImapHost, resolvedImapPort, resolvedSmtpHost, resolvedSmtpPort, existing[0].id]
      );
    } else {
      await query(
        `INSERT INTO mailbox_accounts
           (id, user_id, provider, provider_account_id, email, display_name,
            encrypted_access_token, imap_host, imap_port, smtp_host, smtp_port,
            sync_status, connected_at, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'connected', ?, ?, ?)`,
        [id, user.id, provider, email, email, email.split("@")[0],
         encryptedPassword, resolvedImapHost, resolvedImapPort, resolvedSmtpHost, resolvedSmtpPort,
         now, now, now]
      );
    }

    return jsonOk({ message: "Account succesvol gekoppeld.", provider });
  } catch (error) {
    console.error("IMAP connect error:", error);
    return jsonError("Fout bij het koppelen van het account.", 500);
  }
}
