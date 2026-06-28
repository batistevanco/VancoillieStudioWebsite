import {
  Archive,
  Bell,
  CalendarDays,
  ChevronRight,
  CircleHelp,
  Cloud,
  Cog,
  Filter,
  Github,
  Inbox,
  LifeBuoy,
  Mail,
  Moon,
  PanelLeft,
  Plus,
  Send,
  Settings,
  Shield,
  Sparkles,
  Star,
  Tag,
  Trash2,
  UserRound,
} from "lucide-react";

const mainItems = [
  { label: "Inbox", icon: Inbox, count: "120", active: true },
  { label: "Sent Mail", icon: Send, count: "129" },
  { label: "All Mail", icon: Mail, count: "20" },
  { label: "Drafts", icon: Archive, count: "20" },
  { label: "Favorites", icon: Star, count: "12" },
  { label: "Spam", icon: Shield },
  { label: "Trash", icon: Trash2, count: "10" },
];

const services = [
  {
    label: "Gmail",
    detail: "Personal",
    icon: Mail,
    tone: "from-blue-400 via-red-300 to-amber-300",
  },
  {
    label: "Outlook",
    detail: "Work",
    icon: Cloud,
    tone: "from-sky-400 to-blue-600",
  },
  {
    label: "GitHub",
    detail: "Notifications",
    icon: Github,
    tone: "from-slate-500 to-slate-900",
  },
];

const utilityItems = [
  { icon: PanelLeft, label: "Panels" },
  { icon: Tag, label: "Labels" },
  { icon: UserRound, label: "Contacts" },
  { icon: Moon, label: "Focus" },
  { icon: Settings, label: "Settings" },
  { icon: CircleHelp, label: "Help" },
];

const WindowDots = () => (
  <div className="flex gap-1.5">
    <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b62] shadow-[0_0_18px_rgba(255,107,98,0.45)]" />
    <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166] shadow-[0_0_18px_rgba(255,209,102,0.38)]" />
    <span className="h-2.5 w-2.5 rounded-full bg-[#46d58a] shadow-[0_0_18px_rgba(70,213,138,0.38)]" />
  </div>
);

export const MailboxSidebar = () => {
  return (
    <aside className="relative flex h-full min-h-[calc(100dvh-2rem)] w-full max-w-[18rem] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#14293d] p-4 text-white shadow-[0_28px_80px_rgba(8,20,35,0.45)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(70,132,191,0.34),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.07),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-x-5 top-20 h-32 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative z-10 flex items-center justify-between">
        <WindowDots />
        <button
          type="button"
          aria-label="Sidebar instellingen"
          className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-[#0c1a29]/65 text-white/64 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:bg-white/10 hover:text-white"
        >
          <Cog className="h-4 w-4" />
        </button>
      </div>

      <div className="relative z-10 mt-5 flex items-center gap-3">
        <div className="relative">
          <div className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-slate-100 to-slate-400 text-slate-950 shadow-[0_16px_38px_rgba(0,0,0,0.28)]">
            <UserRound className="h-6 w-6" />
          </div>
          <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full border border-[#14293d] bg-amber-300 text-[0.65rem]">
            *
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium text-white/48">Good day</p>
          <p className="truncate text-sm font-semibold tracking-tight text-white">
            Manoj Adhikari
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-7 flex items-center justify-between">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/32">
          Main
        </p>
        <button
          type="button"
          aria-label="Filter menu"
          className="grid h-7 w-7 place-items-center rounded-xl text-white/58 transition hover:bg-white/8 hover:text-white"
        >
          <Filter className="h-4 w-4" />
        </button>
      </div>

      <nav className="relative z-10 mt-2 space-y-1.5">
        {mainItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              type="button"
              className={`group flex h-10 w-full items-center gap-3 rounded-2xl px-3 text-sm transition ${
                item.active
                  ? "bg-[#eef5ff] text-[#163455] shadow-[0_16px_36px_rgba(4,14,26,0.22)]"
                  : "text-white/68 hover:bg-white/8 hover:text-white"
              }`}
            >
              <Icon
                className={`h-4.5 w-4.5 ${
                  item.active ? "text-[#377dff]" : "text-white/54"
                }`}
              />
              <span className="flex-1 text-left font-medium">{item.label}</span>
              {item.count && (
                <span
                  className={`rounded-full px-2 py-0.5 text-[0.68rem] font-semibold ${
                    item.active
                      ? "bg-rose-500 text-white"
                      : "bg-white/7 text-white/42"
                  }`}
                >
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="relative z-10 mt-6">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/32">
            Servers
          </p>
          <ChevronRight className="h-3.5 w-3.5 text-white/26" />
        </div>

        <div className="rounded-[1.4rem] border border-white/8 bg-[#091b28]/78 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <div className="space-y-2">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <button
                  key={service.label}
                  type="button"
                  className="flex w-full items-center gap-3 rounded-2xl px-2 py-2 text-left transition hover:bg-white/7"
                >
                  <span
                    className={`grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br ${service.tone} text-white shadow-[0_10px_24px_rgba(0,0,0,0.24)]`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-white/88">
                      {service.label}
                    </span>
                    <span className="block truncate text-xs text-white/34">
                      {service.detail}
                    </span>
                  </span>
                </button>
              );
            })}

            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-2xl px-2 py-2 text-left transition hover:bg-white/7"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#3978ff] text-white shadow-[0_10px_24px_rgba(57,120,255,0.34)]">
                <Plus className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold text-white/88">
                Add New Plugin
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-5">
        <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/32">
          Settings
        </p>
        <div className="grid grid-cols-6 gap-2 rounded-[1.2rem] border border-white/8 bg-[#091b28]/74 p-2">
          {utilityItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                aria-label={item.label}
                title={item.label}
                className="grid aspect-square place-items-center rounded-xl text-white/58 transition hover:bg-white/9 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className="relative z-10 mt-4 grid min-h-[7.5rem] place-items-center rounded-[1.45rem] border border-white/8 bg-[#091b28]/82 px-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:-translate-y-0.5 hover:bg-[#0b2030]"
      >
        <span className="grid h-13 w-13 place-items-center rounded-full bg-[#4ea1ff] text-white shadow-[0_14px_32px_rgba(78,161,255,0.42)]">
          <Plus className="h-7 w-7" />
        </span>
        <span>
          <span className="mt-2 block text-base font-semibold tracking-tight">
            Compose Mail
          </span>
          <span className="mt-1 block text-xs text-white/38">
            Or use quick link
          </span>
        </span>
      </button>

      <div className="relative z-10 mt-auto flex items-center justify-between pt-4 text-xs text-white/32">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5" />
          Premium workspace
        </span>
        <Bell className="h-3.5 w-3.5" />
      </div>
    </aside>
  );
};
