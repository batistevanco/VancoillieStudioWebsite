"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Cloud,
  ExternalLink,
  Inbox,
  LockKeyhole,
  Mail,
  Plus,
  Server,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { LogoutButton } from "@/components/auth/logout-button";

type CurrentUser = {
  id: string;
  email: string;
  name: string;
};

type Provider = {
  id: string;
  name: string;
  description: string;
  accent: string;
  icon: ReactNode;
  status: "ready" | "soon";
};

type ConnectedAccount = {
  id: string;
  provider: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  connected_at: string;
  sync_status: string;
};

const providers: Provider[] = [
  {
    id: "google",
    name: "Gmail",
    description: "Google Workspace en persoonlijke Gmail-accounts.",
    accent: "from-blue-500 via-red-400 to-amber-400",
    icon: <span className="text-lg font-semibold">G</span>,
    status: "ready",
  },
  {
    id: "microsoft",
    name: "Outlook",
    description: "Outlook, Hotmail, Live en Microsoft 365.",
    accent: "from-sky-500 via-blue-500 to-indigo-500",
    icon: <Mail className="h-5 w-5" />,
    status: "ready",
  },
  {
    id: "icloud",
    name: "iCloud Mail",
    description: "Voor Apple Mail-accounts met app-specifieke toegang.",
    accent: "from-slate-300 via-white to-sky-200",
    icon: <Cloud className="h-5 w-5" />,
    status: "soon",
  },
  {
    id: "imap",
    name: "Eigen domein",
    description: "IMAP en SMTP voor providers met aangepaste servers.",
    accent: "from-emerald-400 via-teal-400 to-cyan-400",
    icon: <Server className="h-5 w-5" />,
    status: "soon",
  },
];

const previewMessages = [
  {
    from: "Google",
    subject: "Account klaar om veilig te koppelen",
    time: "Nu",
    active: true,
  },
  {
    from: "Vancoillie Mailbox",
    subject: "Je centrale inbox wordt voorbereid",
    time: "1 min",
    active: false,
  },
  {
    from: "Security",
    subject: "Tokens worden versleuteld opgeslagen",
    time: "2 min",
    active: false,
  },
];

export default function ConnectAccountsPage() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>(
    [],
  );
  const [selectedProviderIds, setSelectedProviderIds] = useState<string[]>([]);
  const [providerError, setProviderError] = useState("");
  const [providerSuccess, setProviderSuccess] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadPageData = async () => {
      try {
        const [userResponse, accountsResponse] = await Promise.all([
          fetch("/api/auth/me"),
          fetch("/api/provider-connections"),
        ]);
        const userResult = (await userResponse.json()) as {
          ok: boolean;
          user?: CurrentUser;
        };
        const accountsResult = (await accountsResponse.json()) as {
          ok: boolean;
          accounts?: ConnectedAccount[];
        };

        if (isMounted && userResponse.ok && userResult.ok && userResult.user) {
          setUser(userResult.user);
        }

        if (
          isMounted &&
          accountsResponse.ok &&
          accountsResult.ok &&
          accountsResult.accounts
        ) {
          setConnectedAccounts(accountsResult.accounts);
        }
      } catch {
        if (isMounted) {
          setUser(null);
        }
      }
    };

    void loadPageData();

    const params = new URLSearchParams(window.location.search);
    const connected = params.get("connected");
    const error = params.get("provider_error");

    if (connected) {
      setProviderSuccess(
        connected === "google"
          ? "Gmail is gekoppeld."
          : "Outlook is gekoppeld.",
      );
    }

    if (error) {
      setProviderError(
        "De providerkoppeling is niet gelukt. Controleer de OAuth-instellingen en probeer opnieuw.",
      );
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const firstName = useMemo(() => {
    const name = user?.name?.trim();
    if (!name) {
      return "daar";
    }

    return name.split(/\s+/)[0];
  }, [user]);

  const toggleProvider = (providerId: string) => {
    const provider = providers.find((item) => item.id === providerId);

    if (provider?.status === "ready") {
      window.location.href = `/api/providers/${providerId}/start`;
      return;
    }

    setSelectedProviderIds((current) =>
      current.includes(providerId)
        ? current.filter((id) => id !== providerId)
        : [...current, providerId],
    );
  };

  return (
    <main className="min-h-[100dvh] overflow-hidden px-4 py-5 text-slate-950 sm:px-6 lg:px-8">
      <section className="mx-auto grid min-h-[calc(100dvh-2.5rem)] max-w-7xl grid-cols-1 gap-5 lg:grid-cols-[0.8fr_1.1fr_0.9fr]">
        <aside className="animate-element animate-delay-100 flex flex-col justify-between rounded-[2rem] border border-white/70 bg-white/58 p-6 shadow-soft-panel backdrop-blur-2xl">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-[0_18px_38px_rgba(15,23,42,0.22)]">
                  <Inbox className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-tight">
                    Vancoillie Mailbox
                  </p>
                  <p className="text-xs text-slate-500">Account setup</p>
                </div>
              </div>
              <LogoutButton />
            </div>

            <div className="mt-14">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-3 py-1.5 text-xs font-medium text-slate-600 backdrop-blur-xl">
                <Sparkles className="h-3.5 w-3.5 text-slate-950" />
                Eerste mailbox koppelen
              </div>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.03] tracking-tight md:text-5xl">
                Welkom, {firstName}. Voeg je mailbox toe.
              </h1>
              <p className="mt-5 max-w-sm text-base leading-7 text-slate-600">
                Koppel eerst een mailboxaccount. Later kan je vanuit instellingen
                extra accounts toevoegen en alles in een centrale inbox beheren.
              </p>
            </div>
          </div>

          <div className="mt-12 space-y-3">
            <div className="flex items-start gap-3 rounded-3xl border border-white/70 bg-white/55 p-4 backdrop-blur-xl">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-slate-950" />
              <div>
                <p className="text-sm font-semibold">Security eerst</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  OAuth-tokens en providergeheimen krijgen een aparte
                  versleutelde opslaglaag.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-3xl border border-white/70 bg-white/55 p-4 backdrop-blur-xl">
              <LockKeyhole className="mt-0.5 h-5 w-5 text-slate-950" />
              <div>
                <p className="text-sm font-semibold">Je blijft in controle</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Elk gekoppeld account krijgt later eigen sync-, privacy- en
                  verwijderopties.
                </p>
              </div>
            </div>
          </div>
        </aside>

        <section className="animate-element animate-delay-200 rounded-[2rem] border border-white/70 bg-white/68 p-5 shadow-soft-panel backdrop-blur-2xl sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">
                Mailbox accounts
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Kies waarmee je wil starten.
              </h2>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-950/10 bg-white/75 px-3 py-2 text-xs font-medium text-slate-600">
              {connectedAccounts.length} gekoppeld
              <ChevronDown className="h-3.5 w-3.5" />
            </div>
          </div>

          {(providerError || providerSuccess) && (
            <div
              className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${
                providerError
                  ? "border-red-200 bg-red-50/80 text-red-700"
                  : "border-emerald-200 bg-emerald-50/80 text-emerald-700"
              }`}
            >
              {providerError || providerSuccess}
            </div>
          )}

          {connectedAccounts.length > 0 && (
            <div className="mt-5 rounded-[1.6rem] border border-emerald-200/70 bg-emerald-50/70 p-4">
              <p className="text-sm font-semibold text-emerald-900">
                Gekoppelde accounts
              </p>
              <div className="mt-3 grid gap-2">
                {connectedAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center justify-between rounded-2xl bg-white/75 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-950">
                        {account.display_name ?? account.email}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {account.provider} · {account.email}
                      </p>
                    </div>
                    <Check className="h-4 w-4 text-emerald-600" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-7 grid gap-3">
            {providers.map((provider, index) => {
              const selected = selectedProviderIds.includes(provider.id);

              return (
                <button
                  key={provider.id}
                  type="button"
                  onClick={() => toggleProvider(provider.id)}
                  className="group grid min-h-24 grid-cols-[auto_1fr_auto] items-center gap-4 rounded-[1.6rem] border border-slate-950/10 bg-white/70 p-4 text-left shadow-[0_1px_0_rgba(255,255,255,0.85)_inset] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-soft-panel"
                  style={{ animationDelay: `${300 + index * 80}ms` }}
                >
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br ${provider.accent} text-white shadow-[0_14px_35px_rgba(15,23,42,0.18)]`}
                  >
                    {provider.icon}
                  </span>
                  <span>
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-base font-semibold">
                        {provider.name}
                      </span>
                      <span
                        className={`rounded-full px-2 py-1 text-[0.68rem] font-semibold ${
                          provider.status === "ready"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {provider.status === "ready"
                          ? "Nu koppelen"
                          : "Volgt"}
                      </span>
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-slate-500">
                      {provider.description}
                    </span>
                  </span>
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${
                      selected
                        ? "border-slate-950 bg-slate-950 text-white"
                        : "border-slate-950/10 bg-white/70 text-slate-400 group-hover:text-slate-950"
                    }`}
                  >
                    {selected ? (
                      <Check className="h-4 w-4" />
                    ) : provider.status === "ready" ? (
                      <ExternalLink className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/mailbox"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-[1.35rem] bg-slate-950 px-5 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Doorgaan naar mailbox
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/mailbox"
              className="rounded-[1.35rem] border border-slate-950/10 bg-white/70 px-5 py-4 text-center text-sm font-semibold text-slate-700 transition hover:bg-white"
            >
              Later koppelen
            </Link>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-500">
            Gmail en Outlook starten nu een echte OAuth-koppeling. iCloud en
            eigen IMAP volgen via een aparte veilige flow met app-wachtwoorden
            en servervalidatie.
          </p>
        </section>

        <aside className="animate-element animate-delay-300 overflow-hidden rounded-[2rem] border border-slate-950/10 bg-slate-950 p-4 text-white shadow-soft-panel">
          <div className="flex h-full min-h-[34rem] flex-col rounded-[1.6rem] border border-white/10 bg-white/[0.06] p-4 backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>
              <p className="text-xs text-white/45">Preview</p>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div>
                <p className="text-sm text-white/45">Unified inbox</p>
                <h3 className="mt-1 text-2xl font-semibold tracking-tight">
                  Alle inboxen
                </h3>
              </div>
              <div className="flex -space-x-2">
                {connectedAccounts.length === 0 ? (
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-sm">
                    +
                  </span>
                ) : (
                  connectedAccounts.slice(0, 3).map((account) => (
                    <span
                      key={account.id}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-950 bg-white text-sm font-semibold text-slate-950"
                    >
                      {account.provider[0]?.toUpperCase()}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.08] p-3">
              <div className="h-10 rounded-xl bg-white/[0.08] px-4 py-2 text-sm text-white/45">
                Zoek in al je accounts
              </div>
              <div className="mt-4 space-y-3">
                {previewMessages.map((message) => (
                  <div
                    key={message.subject}
                    className={`rounded-2xl border p-4 ${
                      message.active
                        ? "border-blue-400/40 bg-blue-500/16"
                        : "border-white/8 bg-white/[0.045]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">{message.from}</p>
                      <p className="text-xs text-white/40">{message.time}</p>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-white/62">
                      {message.subject}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.08] p-4">
              <p className="text-sm font-semibold">Setup status</p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/55">Platformaccount</span>
                  <Check className="h-4 w-4 text-emerald-300" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/55">Mailboxaccount</span>
                  <span className="text-xs font-medium text-white/45">
                    {connectedAccounts.length > 0 ? "Gekoppeld" : "Wacht"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
