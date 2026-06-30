"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Archive,
  Cloud,
  Inbox,
  LogOut,
  Mail,
  Send,
  Settings,
  Shield,
  Trash2,
  UserRound,
} from "lucide-react";
import type { MailboxView } from "@/app/mailbox/page";

type CurrentUser = { id: string; email: string; name: string };
type ConnectedAccount = {
  id: string;
  provider: string;
  email: string;
  display_name: string | null;
};

const navItems: { label: string; icon: React.ElementType; view: MailboxView }[] = [
  { label: "Inbox", icon: Inbox, view: "inbox" },
  { label: "Verzonden", icon: Send, view: "sent" },
  { label: "Alle mail", icon: Mail, view: "all" },
  { label: "Concepten", icon: Archive, view: "drafts" },
  { label: "Spam", icon: Shield, view: "spam" },
  { label: "Prullenbak", icon: Trash2, view: "trash" },
];

const providerGradient: Record<string, string> = {
  google: "from-blue-400 via-red-300 to-amber-300",
  microsoft: "from-sky-400 to-blue-600",
};

const WindowDots = () => (
  <div className="flex gap-1.5">
    <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b62] shadow-[0_0_18px_rgba(255,107,98,0.45)]" />
    <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166] shadow-[0_0_18px_rgba(255,209,102,0.38)]" />
    <span className="h-2.5 w-2.5 rounded-full bg-[#46d58a] shadow-[0_0_18px_rgba(70,213,138,0.38)]" />
  </div>
);

type Props = {
  view: MailboxView;
  onViewChange: (view: MailboxView) => void;
};

export const MailboxSidebar = ({ view, onViewChange }: Props) => {
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([]);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    void Promise.all([
      fetch("/api/auth/me").then((r) => r.json()),
      fetch("/api/provider-connections").then((r) => r.json()),
    ]).then(([userResult, accountsResult]) => {
      if (userResult.ok && userResult.user) setUser(userResult.user as CurrentUser);
      if (accountsResult.ok && accountsResult.accounts)
        setAccounts(accountsResult.accounts as ConnectedAccount[]);
    });
  }, []);

  const logout = async () => {
    setIsLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  const firstName = user?.name?.trim().split(/\s+/)[0] ?? "";

  return (
    <aside className="relative flex h-full min-h-[calc(100dvh-2rem)] w-full max-w-[18rem] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#14293d] p-4 text-white shadow-[0_28px_80px_rgba(8,20,35,0.45)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(70,132,191,0.34),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.07),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-x-5 top-20 h-32 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative z-10 flex items-center justify-between">
        <WindowDots />
      </div>

      <div className="relative z-10 mt-5 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-slate-100 to-slate-400 text-slate-950 shadow-[0_16px_38px_rgba(0,0,0,0.28)]">
          <UserRound className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          {user ? (
            <>
              <p className="text-xs font-medium text-white/48">Ingelogd als</p>
              <p className="truncate text-sm font-semibold tracking-tight text-white">
                {firstName || user.email}
              </p>
            </>
          ) : (
            <div className="h-8 w-24 animate-pulse rounded-xl bg-white/10" />
          )}
        </div>
      </div>

      <div className="relative z-10 mt-7">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/32">
          Navigatie
        </p>
      </div>

      <nav className="relative z-10 mt-2 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.view ? view === item.view : false;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onViewChange(item.view)}
              className={`flex h-10 w-full items-center gap-3 rounded-2xl px-3 text-sm transition ${
                isActive
                  ? "bg-[#eef5ff] text-[#163455] shadow-[0_16px_36px_rgba(4,14,26,0.22)]"
                  : "text-white/68 hover:bg-white/8 hover:text-white"
              }`}
            >
              <Icon
                className={`h-4 w-4 ${isActive ? "text-[#377dff]" : "text-white/54"}`}
              />
              <span className="flex-1 text-left font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {accounts.length > 0 && (
        <div className="relative z-10 mt-6">
          <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/32">
            Gekoppelde accounts
          </p>
          <div className="rounded-[1.4rem] border border-white/8 bg-[#091b28]/78 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="space-y-2">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="flex w-full items-center gap-3 rounded-2xl px-2 py-2"
                >
                  <span
                    className={`grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br ${
                      providerGradient[account.provider] ?? "from-slate-500 to-slate-700"
                    } text-white shadow-[0_10px_24px_rgba(0,0,0,0.24)]`}
                  >
                    {account.provider === "google" ? (
                      <span className="text-xs font-bold">G</span>
                    ) : (
                      <Cloud className="h-4 w-4" />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-white/88">
                      {account.display_name ?? account.email}
                    </span>
                    <span className="block truncate text-xs text-white/34">
                      {account.email}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 mt-auto space-y-1 pt-4">
        <button
          type="button"
          onClick={() => onViewChange("settings")}
          className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition ${
            view === "settings"
              ? "bg-white/12 text-white"
              : "text-white/58 hover:bg-white/8 hover:text-white"
          }`}
        >
          <Settings className="h-4 w-4" />
          Instellingen
        </button>

        <button
          type="button"
          onClick={() => void logout()}
          disabled={isLoggingOut}
          className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-white/58 transition hover:bg-white/8 hover:text-white disabled:opacity-50"
        >
          <LogOut className="h-4 w-4" />
          {isLoggingOut ? "Uitloggen..." : "Uitloggen"}
        </button>
      </div>
    </aside>
  );
};
