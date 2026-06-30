import type { MailFolder, MailItem } from "./gmail";

const FOLDER_MAP: Record<MailFolder, string | null> = {
  inbox: "inbox",
  sent: "sentitems",
  all: null,
  drafts: "drafts",
  spam: "junkemail",
  trash: "deleteditems",
};

const SELECT =
  "id,subject,from,receivedDateTime,isRead,bodyPreview,body,isDraft";

type GraphMessage = {
  id: string;
  subject: string | null;
  from: { emailAddress: { name: string; address: string } } | null;
  receivedDateTime: string;
  isRead: boolean;
  bodyPreview: string;
  body: { content: string; contentType: string };
};

type GraphResponse = {
  value: GraphMessage[];
};

export async function fetchOutlookMessages(
  accessToken: string,
  accountId: string,
  folder: MailFolder,
  maxResults = 20,
): Promise<MailItem[]> {
  const folderSegment = FOLDER_MAP[folder];
  const base = folderSegment
    ? `https://graph.microsoft.com/v1.0/me/mailFolders/${folderSegment}/messages`
    : `https://graph.microsoft.com/v1.0/me/messages`;

  const url = `${base}?$select=${SELECT}&$top=${maxResults}&$orderby=receivedDateTime desc`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) throw new Error(`Outlook fetch failed: ${res.status}`);

  const data = (await res.json()) as GraphResponse;

  return data.value.map((msg) => {
    const fromName = msg.from?.emailAddress.name ?? "";
    const fromEmail = msg.from?.emailAddress.address ?? "";
    const body =
      msg.body.contentType === "html"
        ? msg.body.content
        : `<pre style="white-space:pre-wrap;font-family:inherit">${msg.body.content}</pre>`;

    return {
      id: msg.id,
      accountId,
      provider: "microsoft" as const,
      from: { name: fromName, email: fromEmail },
      subject: msg.subject ?? "(Geen onderwerp)",
      snippet: msg.bodyPreview,
      date: msg.receivedDateTime,
      isRead: msg.isRead,
      body,
    };
  });
}
