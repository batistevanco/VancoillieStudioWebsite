import { ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";

export type ImapMailItem = {
  id: string;
  accountId: string;
  provider: string;
  from: { name: string; email: string };
  subject: string;
  snippet: string;
  date: string;
  isRead: boolean;
  body: string;
};

const FOLDER_MAP: Record<string, Record<string, string>> = {
  icloud: {
    inbox: "INBOX",
    sent: "Sent Messages",
    drafts: "Drafts",
    spam: "Junk",
    trash: "Deleted Messages",
    all: "INBOX",
  },
  yahoo: {
    inbox: "INBOX",
    sent: "Sent",
    drafts: "Draft",
    spam: "Bulk Mail",
    trash: "Trash",
    all: "INBOX",
  },
  imap: {
    inbox: "INBOX",
    sent: "Sent",
    drafts: "Drafts",
    spam: "Spam",
    trash: "Trash",
    all: "INBOX",
  },
};

function makeClient(host: string, port: number, email: string, password: string, timeoutMs = 15000) {
  return new ImapFlow({
    host,
    port,
    secure: port === 993,
    auth: { user: email, pass: password },
    logger: false,
    tls: { rejectUnauthorized: true },
    connectionTimeout: timeoutMs,
  });
}

function getFolderName(provider: string, folder: string): string {
  const map = FOLDER_MAP[provider] ?? FOLDER_MAP.imap;
  return map[folder] ?? "INBOX";
}

export async function fetchImapMails(
  host: string,
  port: number,
  email: string,
  password: string,
  accountId: string,
  provider: string,
  folder: string
): Promise<ImapMailItem[]> {
  const client = makeClient(host, port, email, password);
  await client.connect();

  const mails: ImapMailItem[] = [];

  try {
    const mailboxName = getFolderName(provider, folder);
    const lock = await client.getMailboxLock(mailboxName);
    try {
      const total = (client.mailbox as { exists?: number })?.exists ?? 0;
      if (total === 0) return mails;

      const start = Math.max(1, total - 19);
      const range = `${start}:${total}`;

      for await (const msg of client.fetch(range, {
        envelope: true,
        flags: true,
        source: true,
      })) {
        try {
          const parsed = await simpleParser(msg.source as Buffer);
          const fromAddress = parsed.from?.value[0];
          const bodyHtml = parsed.html ? (parsed.html as string) : null;
          const bodyText = parsed.text ?? "";
          const body = bodyHtml ?? bodyText;
          const snippet = bodyText.slice(0, 200).replace(/\n+/g, " ").trim();

          mails.push({
            id: `${provider}_${msg.uid}`,
            accountId,
            provider,
            from: {
              name: fromAddress?.name || fromAddress?.address?.split("@")[0] || "",
              email: fromAddress?.address || "",
            },
            subject: parsed.subject || "(Geen onderwerp)",
            snippet,
            date: (parsed.date ?? new Date()).toISOString(),
            isRead: msg.flags?.has("\\Seen") ?? false,
            body,
          });
        } catch (parseErr) {
          console.error("Failed to parse IMAP message:", parseErr);
        }
      }
    } finally {
      lock.release();
    }
  } finally {
    await client.logout();
  }

  return mails.reverse();
}

export async function imapMarkAsRead(
  host: string,
  port: number,
  email: string,
  password: string,
  provider: string,
  folder: string,
  uid: number
): Promise<void> {
  const client = makeClient(host, port, email, password);
  await client.connect();
  try {
    const mailboxName = getFolderName(provider, folder);
    const lock = await client.getMailboxLock(mailboxName);
    try {
      await client.messageFlagsAdd(`${uid}`, ["\\Seen"], { uid: true });
    } finally {
      lock.release();
    }
  } finally {
    await client.logout();
  }
}

export async function imapTrashMessage(
  host: string,
  port: number,
  email: string,
  password: string,
  provider: string,
  folder: string,
  uid: number
): Promise<void> {
  const client = makeClient(host, port, email, password);
  await client.connect();
  try {
    const mailboxName = getFolderName(provider, folder);
    const trashFolder = getFolderName(provider, "trash");
    const lock = await client.getMailboxLock(mailboxName);
    try {
      await client.messageMove(`${uid}`, trashFolder, { uid: true });
    } finally {
      lock.release();
    }
  } finally {
    await client.logout();
  }
}

export async function validateImapConnection(
  host: string,
  port: number,
  email: string,
  password: string
): Promise<void> {
  const client = makeClient(host, port, email, password, 10000);
  await client.connect();
  await client.logout();
}
