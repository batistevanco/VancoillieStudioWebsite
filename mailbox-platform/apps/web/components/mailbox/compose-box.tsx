import { useState, useEffect } from "react";
import { Send, X, Trash2 } from "lucide-react";

interface ComposeBoxProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTo?: string;
  defaultSubject?: string;
  defaultBody?: string;
  defaultAccountId?: string;
  accounts: Array<{ id: string; email: string; provider: string }>;
  onSent?: () => void;
}

export const ComposeBox = ({
  isOpen,
  onClose,
  defaultTo = "",
  defaultSubject = "",
  defaultBody = "",
  defaultAccountId = "",
  accounts,
  onSent,
}: ComposeBoxProps) => {
  const [to, setTo] = useState(defaultTo);
  const [subject, setSubject] = useState(defaultSubject);
  const [body, setBody] = useState(defaultBody);
  const [selectedAccountId, setSelectedAccountId] = useState(defaultAccountId);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Update states if defaults change (e.g. user clicks Reply on a different mail)
  useEffect(() => {
    setTo(defaultTo);
    setSubject(defaultSubject);
    setBody(defaultBody);
    
    if (defaultAccountId) {
      setSelectedAccountId(defaultAccountId);
    } else if (accounts.length > 0) {
      setSelectedAccountId(accounts[0].id);
    }
  }, [defaultTo, defaultSubject, defaultBody, defaultAccountId, accounts]);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAccountId) {
      setError("Selecteer een account om van te verzenden.");
      return;
    }
    if (!to.trim()) {
      setError("Vul een ontvanger in.");
      return;
    }
    if (!subject.trim()) {
      setError("Vul een onderwerp in.");
      return;
    }
    if (!body.trim()) {
      setError("Schrijf een bericht.");
      return;
    }

    setSending(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/mails/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountId: selectedAccountId,
          to,
          subject,
          body: body.replace(/\n/g, "<br>"), // basic HTML line break conversion
        }),
      });

      const result = await res.json();

      if (res.ok && result.ok) {
        setSuccess("E-mail succesvol verzonden!");
        setTimeout(() => {
          onClose();
          if (onSent) onSent();
        }, 1200);
      } else {
        setError(result.message || "Fout bij het verzenden van e-mail.");
      }
    } catch (err) {
      console.error(err);
      setError("Kan geen verbinding maken met de server.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed bottom-0 right-8 z-50 flex w-full max-w-[34rem] flex-col rounded-t-[1.6rem] border border-slate-950/10 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.3)] transition duration-300">
      {/* Header bar */}
      <div className="flex items-center justify-between rounded-t-[1.6rem] bg-slate-950 px-6 py-4 text-white">
        <span className="text-sm font-semibold tracking-tight">Nieuw bericht</span>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <form onSubmit={handleSend} className="flex flex-col gap-3 p-5">
        {error && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
            {success}
          </div>
        )}

        {/* From selector */}
        <div className="flex items-center border-b border-slate-100 pb-2">
          <label htmlFor="compose-from" className="w-16 text-xs font-semibold text-slate-400">Van:</label>
          <select
            id="compose-from"
            value={selectedAccountId}
            onChange={(e) => setSelectedAccountId(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-950 outline-none"
          >
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.email} ({acc.provider})
              </option>
            ))}
          </select>
        </div>

        {/* To field */}
        <div className="flex items-center border-b border-slate-100 pb-2">
          <label htmlFor="compose-to" className="w-16 text-xs font-semibold text-slate-400">Aan:</label>
          <input
            id="compose-to"
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="ontvanger@domein.com"
            className="flex-1 bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Subject field */}
        <div className="flex items-center border-b border-slate-100 pb-2">
          <label htmlFor="compose-subject" className="w-16 text-xs font-semibold text-slate-400">Onderwerp:</label>
          <input
            id="compose-subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Onderwerp van de e-mail"
            className="flex-1 bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Body field */}
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Typ hier je bericht..."
          rows={8}
          className="mt-2 w-full resize-none bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400"
        />

        {/* Bottom actions row */}
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-4">
          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" />
            {sending ? "Verzenden..." : "Verzenden"}
          </button>
          
          <button
            type="button"
            onClick={onClose}
            aria-label="Weggooien"
            className="grid h-9 w-9 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
