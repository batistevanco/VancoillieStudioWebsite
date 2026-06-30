import { useEffect, useState } from "react";
import {
  Inbox,
  RefreshCw,
  Search,
  Mail,
  AlertCircle
} from "lucide-react";
import { MailDetailPanel } from "@/components/mailbox/mail-detail-panel";
import { ComposeBox } from "@/components/mailbox/compose-box";

type ConnectedAccount = {
  id: string;
  provider: string;
  email: string;
  display_name: string | null;
};

type MailItem = {
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

type MailboxFolder = "inbox" | "sent" | "all" | "drafts" | "spam" | "trash";

const FOLDER_LABELS: Record<MailboxFolder, string> = {
  inbox: "Inbox",
  sent: "Verzonden",
  all: "Alle mail",
  drafts: "Concepten",
  spam: "Spam",
  trash: "Prullenbak",
};

export const MailListPanel = ({ folder = "inbox" }: { folder?: MailboxFolder }) => {
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([]);
  const [mails, setMails] = useState<MailItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMail, setSelectedMail] = useState<MailItem | null>(null);
  
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeDefaults, setComposeDefaults] = useState({
    to: "",
    subject: "",
    body: "",
    accountId: "",
  });

  const handleReply = (mail: MailItem) => {
    // Strip HTML tags for textarea body
    const plainBody = mail.body
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n")
      .replace(/<[^>]*>/g, "");

    setComposeDefaults({
      to: mail.from.email,
      subject: mail.subject.toLowerCase().startsWith("re:")
        ? mail.subject
        : `Re: ${mail.subject}`,
      body: `\n\n\nOp ${new Date(mail.date).toLocaleString("nl-NL")} schreef ${mail.from.name || mail.from.email}:\n> ${plainBody.replace(/\n/g, "\n> ")}`,
      accountId: mail.accountId,
    });
    setIsComposeOpen(true);
  };

  const handleForward = (mail: MailItem) => {
    // Strip HTML tags for textarea body
    const plainBody = mail.body
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n")
      .replace(/<[^>]*>/g, "");

    setComposeDefaults({
      to: "",
      subject: mail.subject.toLowerCase().startsWith("fwd:")
        ? mail.subject
        : `Fwd: ${mail.subject}`,
      body: `\n\n\n---------- Doorgestuurd bericht ----------\nVan: ${mail.from.name} <${mail.from.email}>\nDatum: ${new Date(mail.date).toLocaleString("nl-NL")}\nOnderwerp: ${mail.subject}\n\n${plainBody}`,
      accountId: mail.accountId,
    });
    setIsComposeOpen(true);
  };

  const handleDeleteMail = async (mail: MailItem) => {
    const res = await fetch("/api/mails/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mailId: mail.id, accountId: mail.accountId }),
    });

    if (!res.ok) {
      throw new Error("Verwijderen mislukt.");
    }

    // Remove from local list
    const updatedMails = mails.filter((m) => m.id !== mail.id);
    setMails(updatedMails);

    // Select next message
    const currentIndex = mails.findIndex((m) => m.id === mail.id);
    let nextMail: MailItem | null = null;
    if (updatedMails.length > 0) {
      if (currentIndex < updatedMails.length) {
        nextMail = updatedMails[currentIndex];
      } else {
        nextMail = updatedMails[updatedMails.length - 1];
      }
    }
    setSelectedMail(nextMail);
  };

  const fetchPageData = async () => {
    setLoading(true);
    setError("");
    setSelectedMail(null);
    try {
      const [accountsRes, mailsRes] = await Promise.all([
        fetch("/api/provider-connections"),
        fetch(`/api/mails?folder=${folder}`),
      ]);

      if (accountsRes.ok) {
        const accountsResult = await accountsRes.json();
        if (accountsResult.ok && accountsResult.accounts) {
          setAccounts(accountsResult.accounts as ConnectedAccount[]);
        }
      }

      if (mailsRes.ok) {
        const mailsResult = await mailsRes.json();
        if (mailsResult.ok && mailsResult.mails) {
          setMails(mailsResult.mails as MailItem[]);
          if (mailsResult.mails.length > 0) {
            setSelectedMail(mailsResult.mails[0]);
          }
        }
      } else {
        setError("Er is een fout opgetreden bij het ophalen van je e-mails.");
      }
    } catch (err) {
      console.error(err);
      setError("Kan geen verbinding maken met de server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchPageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folder]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
    } else if (isYesterday) {
      return "Gisteren";
    } else {
      return date.toLocaleDateString("nl-NL", { day: "numeric", month: "short" });
    }
  };

  const getAvatarColor = (name: string) => {
    const gradients = [
      "from-blue-500 to-indigo-500",
      "from-emerald-500 to-teal-500",
      "from-violet-500 to-purple-500",
      "from-pink-500 to-rose-500",
      "from-amber-500 to-orange-500",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return gradients[Math.abs(hash) % gradients.length];
  };

  const filteredMails = mails.filter((mail) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      mail.subject.toLowerCase().includes(query) ||
      mail.from.name.toLowerCase().includes(query) ||
      mail.from.email.toLowerCase().includes(query) ||
      mail.snippet.toLowerCase().includes(query)
    );
  });

  return (
    <section className="flex h-[calc(100dvh-2rem)] min-w-0 flex-1 overflow-hidden rounded-[2rem] border border-white/70 bg-white/78 shadow-soft-panel backdrop-blur-2xl">
      <div className="flex w-full max-w-[42rem] min-w-0 flex-col border-r border-slate-950/8 bg-white/72">
        <header className="px-7 pb-4 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[1.7rem] font-semibold tracking-tight text-slate-950">
                {FOLDER_LABELS[folder]}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                {accounts.length > 0
                  ? `${accounts.map((a) => a.email).join(", ")}`
                  : "Geen accounts gekoppeld"}
              </p>
            </div>
            <button
              type="button"
              aria-label="Vernieuwen"
              onClick={fetchPageData}
              className="grid h-9 w-9 place-items-center rounded-full border border-slate-950/8 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-950"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </header>

        <div className="px-7">
          <div className="flex h-12 items-center gap-3 rounded-2xl border border-slate-950/8 bg-slate-950/[0.035] px-4 text-slate-500">
            <Search className="h-4 w-4 shrink-0" />
            <input
              className="h-full flex-1 bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400"
              placeholder="Zoeken in e-mails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-5 flex-1 overflow-y-auto px-5 pb-5">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-28 animate-pulse rounded-[1.45rem] bg-slate-100/80"
                />
              ))}
            </div>
          ) : error ? (
            error.includes("GMAIL_API_DISABLED") || error.includes("Gmail API has not been used") ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 py-16 px-6 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-3xl bg-amber-50 text-amber-600">
                  <AlertCircle className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-base font-semibold text-slate-950">
                    Gmail API is niet ingeschakeld
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    De Gmail API is nog niet geactiveerd in je Google Cloud Console project. Klik op de knop hieronder om de Gmail API in te schakelen en vernieuw daarna de pagina.
                  </p>
                  <a
                    href="https://console.developers.google.com/apis/api/gmail.googleapis.com/overview?project=71426362896"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-800"
                  >
                    Gmail API Activeren
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-3xl bg-red-50 text-red-500">
                  <AlertCircle className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-base font-semibold text-slate-950">{error}</p>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                    Probeer de pagina te vernieuwen of controleer de verbinding van je accounts.
                  </p>
                </div>
              </div>
            )
          ) : filteredMails.length > 0 ? (
            <div className="grid gap-2">
              {filteredMails.map((mail) => {
                const isSelected = selectedMail?.id === mail.id;
                const initials = mail.from.name ? mail.from.name.charAt(0).toUpperCase() : "?";

                return (
                  <button
                    key={mail.id}
                    type="button"
                    onClick={() => setSelectedMail(mail)}
                    className={`relative flex w-full min-w-0 flex-col gap-1.5 rounded-2xl p-4 text-left transition duration-200 border border-transparent ${
                      isSelected
                        ? "bg-slate-950/[0.045] border-slate-950/5 shadow-sm"
                        : "hover:bg-slate-950/[0.02] hover:border-slate-950/[0.02]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 w-full min-w-0">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="relative shrink-0">
                          <span
                            className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${getAvatarColor(
                              mail.from.name
                            )} text-xs font-bold text-white shadow-sm`}
                          >
                            {initials}
                          </span>
                          {/* Provider logo badge */}
                          {mail.provider === "google" ? (
                            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[8px] font-black text-blue-600 shadow-sm border border-slate-100">
                              G
                            </span>
                          ) : (
                            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-sky-500 shadow-sm border border-slate-100">
                              <Mail className="h-2 w-2" />
                            </span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            className={`truncate text-sm text-slate-950 ${
                              !mail.isRead ? "font-bold" : "font-medium"
                            }`}
                          >
                            {mail.from.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] font-medium text-slate-400">
                          {formatDate(mail.date)}
                        </span>
                        {!mail.isRead && (
                          <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                        )}
                      </div>
                    </div>

                    <div className="pl-12 min-w-0 w-full">
                      <p
                        className={`truncate text-sm text-slate-800 ${
                          !mail.isRead ? "font-semibold" : "font-normal"
                        }`}
                      >
                        {mail.subject}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                        {mail.snippet}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-3xl bg-slate-100 text-slate-400">
                <Inbox className="h-8 w-8" />
              </div>
              <div>
                <p className="text-base font-semibold text-slate-950">
                  Geen e-mails gevonden
                </p>
                <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                  Er staan momenteel geen e-mails in deze map.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <MailDetailPanel
        mail={selectedMail}
        onReply={selectedMail ? () => handleReply(selectedMail) : undefined}
        onForward={selectedMail ? () => handleForward(selectedMail) : undefined}
        onDelete={selectedMail ? () => handleDeleteMail(selectedMail) : undefined}
      />

      <ComposeBox
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        defaultTo={composeDefaults.to}
        defaultSubject={composeDefaults.subject}
        defaultBody={composeDefaults.body}
        defaultAccountId={composeDefaults.accountId}
        accounts={accounts.map(a => ({ id: a.id, email: a.email, provider: a.provider }))}
      />
    </section>
  );
};
