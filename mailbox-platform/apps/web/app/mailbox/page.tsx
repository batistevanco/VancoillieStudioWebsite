"use client";

import { useState } from "react";
import { MailListPanel } from "@/components/mailbox/mail-list-panel";
import { MailboxSidebar } from "@/components/mailbox/mailbox-sidebar";
import { SettingsPanel } from "@/components/mailbox/settings-panel";

export type MailboxView = "inbox" | "sent" | "all" | "drafts" | "spam" | "trash" | "settings";

export default function MailboxPage() {
  const [view, setView] = useState<MailboxView>("inbox");

  return (
    <main className="min-h-[100dvh] overflow-hidden bg-[radial-gradient(circle_at_12%_12%,rgba(43,135,255,0.20),transparent_28%),radial-gradient(circle_at_88%_8%,rgba(27,211,214,0.18),transparent_30%),linear-gradient(135deg,#eef4fb_0%,#f8fbff_44%,#eef6f8_100%)] p-4">
      <section className="flex min-h-[calc(100dvh-2rem)] gap-4">
        <MailboxSidebar view={view} onViewChange={setView} />
        {view === "settings" ? <SettingsPanel /> : <MailListPanel folder={view} />}
      </section>
    </main>
  );
}
