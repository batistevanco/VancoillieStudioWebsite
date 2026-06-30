"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Cloud,
  ExternalLink,
  Info,
  Mail,
  MessageCircle,
  Plus,
  Save,
  Trash2,
  UserRound,
  X,
} from "lucide-react";

type CurrentUser = { id: string; email: string; name: string };
type ConnectedAccount = {
  id: string;
  provider: string;
  email: string;
  display_name: string | null;
  connected_at: string;
};

const providerGradient: Record<string, string> = {
  google: "from-blue-400 via-red-300 to-amber-300",
  microsoft: "from-sky-400 to-blue-600",
};

const providerLabel: Record<string, string> = {
  google: "Gmail / Google",
  microsoft: "Outlook / Microsoft",
};

const APP_VERSION = "0.1.0";
const BUILD_DATE = "Juni 2025";

export const SettingsPanel = () => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([]);
  const [nameInput, setNameInput] = useState("");
  const [nameSaving, setNameSaving] = useState(false);
  const [nameSuccess, setNameSuccess] = useState(false);
  const [nameError, setNameError] = useState("");
  const [disconnecting, setDisconnecting] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const loadData = () => {
    void Promise.all([
      fetch("/api/auth/me").then((r) => r.json()),
      fetch("/api/provider-connections").then((r) => r.json()),
    ]).then(([userResult, accountsResult]) => {
      if (userResult.ok && userResult.user) {
        const u = userResult.user as CurrentUser;
        setUser(u);
        setNameInput(u.name ?? "");
      }
      if (accountsResult.ok && accountsResult.accounts) {
        setAccounts(accountsResult.accounts as ConnectedAccount[]);
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const saveName = async () => {
    if (!nameInput.trim()) return;
    setNameSaving(true);
    setNameError("");
    setNameSuccess(false);

    try {
      const res = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nameInput.trim() }),
      });
      const result = (await res.json()) as { ok: boolean; message?: string };

      if (result.ok) {
        setNameSuccess(true);
        setTimeout(() => setNameSuccess(false), 3000);
      } else {
        setNameError(result.message ?? "Er is iets misgegaan.");
      }
    } finally {
      setNameSaving(false);
    }
  };

  const disconnectAccount = async (id: string) => {
    setDisconnecting(id);

    try {
      const res = await fetch(`/api/provider-connections/${id}`, {
        method: "DELETE",
      });
      const result = (await res.json()) as { ok: boolean };

      if (result.ok) {
        setAccounts((prev) => prev.filter((a) => a.id !== id));
      }
    } finally {
      setDisconnecting(null);
      setConfirmDelete(null);
    }
  };

  return (
    <section className="flex h-[calc(100dvh-2rem)] min-w-0 flex-1 overflow-hidden rounded-[2rem] border border-white/70 bg-white/78 shadow-soft-panel backdrop-blur-2xl">
      <div className="flex w-full flex-col overflow-y-auto">
        <header className="sticky top-0 z-10 border-b border-slate-950/8 bg-white/90 px-8 py-6 backdrop-blur-xl">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
            Instellingen
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Beheer je account, gekoppelde mailboxen en app-informatie.
          </p>
        </header>

        <div className="mx-auto w-full max-w-2xl space-y-8 px-8 py-8">

          {/* Account gegevens */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-2xl bg-slate-100 text-slate-600">
                <UserRound className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-950">
                  Account gegevens
                </h2>
                <p className="text-xs text-slate-500">Jouw naam en e-mailadres</p>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-950/8 bg-white p-5 shadow-sm space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-500">
                  E-mailadres
                </label>
                <div className="flex h-11 items-center rounded-xl border border-slate-950/8 bg-slate-50 px-4 text-sm text-slate-400">
                  {user?.email ?? "—"}
                </div>
              </div>

              <div>
                <label
                  htmlFor="nameInput"
                  className="mb-1.5 block text-xs font-semibold text-slate-500"
                >
                  Weergavenaam
                </label>
                <div className="flex gap-2">
                  <input
                    id="nameInput"
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") void saveName(); }}
                    className="flex h-11 flex-1 items-center rounded-xl border border-slate-950/8 bg-white px-4 text-sm text-slate-950 outline-none ring-0 transition focus:border-slate-950/20 focus:ring-2 focus:ring-slate-950/8"
                    placeholder="Jouw naam"
                  />
                  <button
                    type="button"
                    onClick={() => void saveName()}
                    disabled={nameSaving || !nameInput.trim()}
                    className="flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-50"
                  >
                    {nameSuccess ? (
                      <Check className="h-4 w-4 text-emerald-300" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    {nameSaving ? "Opslaan..." : nameSuccess ? "Opgeslagen" : "Opslaan"}
                  </button>
                </div>
                {nameError && (
                  <p className="mt-2 text-xs text-red-600">{nameError}</p>
                )}
              </div>
            </div>
          </section>

          {/* Gekoppelde accounts */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-2xl bg-slate-100 text-slate-600">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-slate-950">
                    Gekoppelde mailboxen
                  </h2>
                  <p className="text-xs text-slate-500">
                    {accounts.length === 0
                      ? "Nog geen accounts gekoppeld"
                      : `${accounts.length} account${accounts.length === 1 ? "" : "s"} gekoppeld`}
                  </p>
                </div>
              </div>
              <a
                href="/connect-accounts"
                className="flex items-center gap-1.5 rounded-xl border border-slate-950/10 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                <Plus className="h-3.5 w-3.5" />
                Account toevoegen
              </a>
            </div>

            <div className="space-y-2">
              {accounts.length === 0 && (
                <div className="rounded-[1.5rem] border border-dashed border-slate-950/12 bg-white/60 px-6 py-8 text-center">
                  <p className="text-sm text-slate-500">
                    Voeg een Gmail of Outlook account toe om te starten.
                  </p>
                  <a
                    href="/connect-accounts"
                    className="mt-3 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Account koppelen
                  </a>
                </div>
              )}

              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center gap-4 rounded-[1.35rem] border border-slate-950/8 bg-white p-4 shadow-sm"
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br ${
                      providerGradient[account.provider] ?? "from-slate-400 to-slate-600"
                    } text-white shadow-sm`}
                  >
                    {account.provider === "google" ? (
                      <span className="text-xs font-bold">G</span>
                    ) : (
                      <Cloud className="h-4 w-4" />
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-950">
                      {account.display_name ?? account.email}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {providerLabel[account.provider] ?? account.provider} · {account.email}
                    </p>
                  </div>

                  {confirmDelete === account.id ? (
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="text-xs text-slate-500">Verwijderen?</span>
                      <button
                        type="button"
                        onClick={() => void disconnectAccount(account.id)}
                        disabled={disconnecting === account.id}
                        className="flex h-8 items-center gap-1.5 rounded-xl bg-red-500 px-3 text-xs font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
                      >
                        {disconnecting === account.id ? "..." : "Ja, verwijder"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDelete(null)}
                        className="grid h-8 w-8 place-items-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(account.id)}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-xl text-slate-300 transition hover:bg-red-50 hover:text-red-500"
                      aria-label="Account ontkoppelen"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Support */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-2xl bg-slate-100 text-slate-600">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-950">Support</h2>
                <p className="text-xs text-slate-500">Hulp nodig? Neem contact op</p>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-950/8 bg-white p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">E-mail</span>
                <a
                  href="mailto:support@vancoillie.studio"
                  className="font-medium text-slate-950 transition hover:text-blue-600"
                >
                  support@vancoillie.studio
                </a>
              </div>
              <div className="border-t border-slate-950/6" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Website</span>
                <a
                  href="https://www.vancoilliestudio.be/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-slate-950 transition hover:text-blue-600"
                >
                  vancoilliestudio.be
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </section>

          {/* App info */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-2xl bg-slate-100 text-slate-600">
                <Info className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-950">App informatie</h2>
                <p className="text-xs text-slate-500">Versie en build details</p>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-950/8 bg-white p-5 shadow-sm space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Versie</span>
                <span className="font-medium text-slate-950">{APP_VERSION}</span>
              </div>
              <div className="border-t border-slate-950/6" />
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Build</span>
                <span className="font-medium text-slate-950">{BUILD_DATE}</span>
              </div>
              <div className="border-t border-slate-950/6" />
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Platform</span>
                <span className="font-medium text-slate-950">Vancoillie Mailbox</span>
              </div>
            </div>
          </section>

        </div>
      </div>
    </section>
  );
};
