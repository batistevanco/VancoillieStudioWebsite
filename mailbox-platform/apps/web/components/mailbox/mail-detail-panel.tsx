import { useState } from "react";
import { Mail, Clock, Reply, CornerUpRight, Trash2, Loader2 } from "lucide-react";

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

interface MailDetailPanelProps {
  mail: MailItem | null;
  onReply?: () => void;
  onForward?: () => void;
  onDelete?: () => Promise<void>;
}

const formatPlainTextToHtml = (text: string): string => {
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const urlRegex = /(https?:\/\/[^\s<]+)/g;
  html = html.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');

  const lines = html.split("\n");
  const formattedLines = lines.map((line) => {
    if (line.trim().startsWith("&gt;")) {
      return `<span style="color: #64748b; border-left: 2px solid #cbd5e1; padding-left: 8px; display: block; margin: 4px 0;">${line}</span>`;
    }
    return line;
  });

  return `<div style="white-space: pre-wrap; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14.5px; line-height: 1.6; color: #1e293b;">${formattedLines.join("\n")}</div>`;
};

export const MailDetailPanel = ({ mail, onReply, onForward, onDelete }: MailDetailPanelProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!mail) {
    return (
      <article className="hidden min-w-[30rem] flex-1 flex-col items-center justify-center bg-white/86 xl:flex">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-3xl bg-slate-100 text-slate-400">
            <Mail className="h-8 w-8" />
          </div>
          <div>
            <p className="text-base font-semibold text-slate-950">
              Selecteer een e-mail
            </p>
            <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
              Kies een bericht uit de lijst om het hier te lezen.
            </p>
          </div>
        </div>
      </article>
    );
  }

  const initials = mail.from.name ? mail.from.name.charAt(0).toUpperCase() : "?";
  
  // Choose an avatar background color based on name hash
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

  const formattedDate = new Date(mail.date).toLocaleString("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleDelete = async () => {
    if (!onDelete || isDeleting) return;
    setIsDeleting(true);
    try {
      await onDelete();
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <article className="hidden min-w-[32rem] flex-1 flex-col bg-white/86 xl:flex">
      {/* Top Header Actions */}
      <div className="flex items-center justify-between border-b border-slate-950/8 px-8 py-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReply}
            className="flex items-center gap-2 rounded-xl border border-slate-950/8 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <Reply className="h-3.5 w-3.5" />
            Beantwoorden
          </button>
          <button
            type="button"
            onClick={onForward}
            className="flex items-center gap-2 rounded-xl border border-slate-950/8 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <CornerUpRight className="h-3.5 w-3.5" />
            Doorsturen
          </button>
        </div>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          aria-label="Verwijderen"
          className="grid h-9 w-9 place-items-center rounded-xl border border-red-100 bg-white text-red-500 shadow-sm transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
        >
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Main Mail View */}
      <div className="flex flex-1 flex-col overflow-y-auto p-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-950">
          {mail.subject}
        </h2>

        {/* Sender details */}
        <div className="mt-6 flex items-center justify-between border-b border-slate-950/5 pb-6">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${getAvatarColor(
                mail.from.name
              )} text-sm font-bold text-white shadow-sm`}
            >
              {initials}
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-950">
                {mail.from.name}
              </p>
              <p className="text-xs text-slate-500">
                van: <span className="text-slate-600">{mail.from.email}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Clock className="h-3.5 w-3.5" />
            {formattedDate}
          </div>
        </div>

        {/* Iframe to securely render Rich HTML body */}
        <div className="mt-6 flex-1 bg-transparent">
          {(() => {
            const isHtml = mail.body.trim().startsWith("<") || /<\/?[a-z][\s\S]*>/i.test(mail.body);
            const displayBody = isHtml ? mail.body : formatPlainTextToHtml(mail.body);
            return (
              <iframe
                title={mail.subject}
                sandbox="allow-popups allow-popups-to-escape-sandbox"
                srcDoc={`
                  <!DOCTYPE html>
                  <html>
                    <head>
                      <meta charset="utf-8">
                      <style>
                        body {
                          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                          font-size: 14.5px;
                          line-height: 1.6;
                          color: #1e293b;
                          margin: 0;
                          padding: 10px 0;
                          word-break: break-word;
                          background-color: transparent;
                        }
                        a { color: #2563eb; text-decoration: none; }
                        a:hover { text-decoration: underline; }
                        img { max-width: 100%; height: auto; border-radius: 8px; }
                        blockquote {
                          border-left: 3px solid #cbd5e1;
                          margin: 1.5em 0;
                          padding-left: 1em;
                          color: #64748b;
                        }
                        pre {
                          background-color: #f1f5f9;
                          padding: 12px;
                          border-radius: 8px;
                          overflow-x: auto;
                        }
                      </style>
                    </head>
                    <body>
                      ${displayBody}
                    </body>
                  </html>
                `}
                className="h-full w-full border-0 bg-transparent"
              />
            );
          })()}
        </div>
      </div>
    </article>
  );
};
