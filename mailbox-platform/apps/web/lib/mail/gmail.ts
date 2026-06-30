export type MailFolder = "inbox" | "sent" | "all" | "drafts" | "spam" | "trash";

export type MailItem = {
  id: string;
  accountId: string;
  provider: "google" | "microsoft";
  from: { name: string; email: string };
  subject: string;
  snippet: string;
  date: string;
  isRead: boolean;
  body: string;
};

const FOLDER_LABELS: Record<MailFolder, string[] | null> = {
  inbox: ["INBOX"],
  sent: ["SENT"],
  all: null,
  drafts: ["DRAFT"],
  spam: ["SPAM"],
  trash: ["TRASH"],
};

function parseFromHeader(from: string): { name: string; email: string } {
  const match = from.match(/^"?(.+?)"?\s*<(.+)>$/);
  if (match && match[1] && match[2]) {
    return { name: match[1].trim(), email: match[2].trim() };
  }
  return { name: from.trim(), email: from.trim() };
}

type GmailPart = {
  mimeType: string;
  body?: { data?: string };
  parts?: GmailPart[];
};

function extractBody(part: GmailPart): string {
  if (part.body?.data) {
    const decoded = Buffer.from(part.body.data, "base64url").toString("utf8");
    if (part.mimeType === "text/plain") {
      return `<pre style="white-space:pre-wrap;font-family:inherit">${decoded}</pre>`;
    }
    return decoded;
  }
  if (part.parts) {
    const html = part.parts.find((p) => p.mimeType === "text/html");
    if (html) return extractBody(html);
    const text = part.parts.find((p) => p.mimeType === "text/plain");
    if (text) return extractBody(text);
    for (const child of part.parts) {
      const found = extractBody(child);
      if (found) return found;
    }
  }
  return "";
}

type GmailMessageResponse = {
  id: string;
  snippet: string;
  labelIds: string[];
  payload: {
    headers: { name: string; value: string }[];
    body?: { data?: string };
    parts?: GmailPart[];
    mimeType: string;
  };
};

type GmailListResponse = {
  messages?: { id: string }[];
};

export async function fetchGmailMessages(
  accessToken: string,
  accountId: string,
  folder: MailFolder,
  maxResults = 20,
): Promise<MailItem[]> {
  const labels = FOLDER_LABELS[folder];
  const params = new URLSearchParams({ maxResults: String(maxResults) });
  if (labels) params.set("labelIds", labels.join(","));
  if (folder === "all") params.set("q", "-in:spam -in:trash");

  const listRes = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages?${params}`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );

  if (!listRes.ok) throw new Error(`Gmail list failed: ${listRes.status}`);

  const list = (await listRes.json()) as GmailListResponse;
  if (!list.messages?.length) return [];

  const messages = await Promise.all(
    list.messages.map((m) =>
      fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${m.id}?format=full`,
        { headers: { Authorization: `Bearer ${accessToken}` } },
      ).then((r) => r.json() as Promise<GmailMessageResponse>),
    ),
  );

  return messages.map((msg) => {
    const header = (name: string) =>
      msg.payload.headers.find(
        (h) => h.name.toLowerCase() === name.toLowerCase(),
      )?.value ?? "";

    const from = parseFromHeader(header("From"));
    const subject = header("Subject") || "(Geen onderwerp)";
    const date = header("Date");
    const isRead = !msg.labelIds.includes("UNREAD");
    const body = extractBody(msg.payload as GmailPart);

    return {
      id: msg.id,
      accountId,
      provider: "google" as const,
      from,
      subject,
      snippet: msg.snippet,
      date: date ? new Date(date).toISOString() : new Date().toISOString(),
      isRead,
      body,
    };
  });
}
