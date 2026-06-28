import {
  Archive,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Link as LinkIcon,
  MailOpen,
  MoreHorizontal,
  RefreshCw,
  Search,
} from "lucide-react";
import { MailDetailPanel } from "@/components/mailbox/mail-detail-panel";

const quickPeople = [
  { name: "Esther A.", initials: "EA", color: "bg-sky-100 text-sky-700", unread: 2 },
  { name: "Leslie N.", initials: "LN", color: "bg-rose-100 text-rose-700" },
  { name: "Guy R.", initials: "GR", color: "bg-orange-100 text-orange-700", active: true },
  { name: "Robert F.", initials: "R", color: "bg-pink-100 text-pink-700" },
  { name: "Jacob K.", initials: "JK", color: "bg-emerald-100 text-emerald-700" },
  { name: "Wade W.", initials: "WW", color: "bg-violet-100 text-violet-700" },
];

const messages = [
  {
    sender: "Team - Alex S. Liza E.",
    topic: "Discussion of the new project design",
    preview:
      "Colleagues, it is important for all those who are marked in this message to review the latest wireframes.",
    time: "12:29 PM",
    date: "Today, Monday",
    initials: ["A", "L", "E"],
    avatarColor: "bg-indigo-100 text-indigo-700",
    tags: ["Meeting"],
    attachment: "meeting-notes.pdf",
    active: true,
  },
  {
    sender: "Brooklyn Simmons",
    topic: "Mobile booking design edits",
    preview:
      "Hello, Vidiry! We really like the design of the application, but we left a few precise comments.",
    time: "13:45 PM",
    date: "Today, Monday",
    initials: ["B"],
    avatarColor: "bg-amber-100 text-amber-800",
    tags: ["App", "Work"],
  },
  {
    sender: "Spotify",
    topic: "Unidentified device",
    preview:
      "Dear orfdesignarea, someone tried to log into your account from a new device. Please check this activity.",
    time: "09:32 AM",
    date: "Yesterday, Sunday",
    initials: ["S"],
    avatarColor: "bg-green-400 text-green-950",
    tags: ["Social"],
  },
  {
    sender: "Team - Michael B. Sergey A.",
    topic: "Working build",
    preview:
      "Hi, Sergey and I have prepared a working build. You can check the new mail interactions when ready.",
    time: "05:12 AM",
    date: "30 Sep, Friday",
    initials: ["M", "S"],
    avatarColor: "bg-rose-100 text-rose-700",
    tags: ["Team"],
    attachment: "2 files.zip",
  },
  {
    sender: "Discord",
    topic: "Name change",
    preview:
      "You changed your name to codex-workspace. If this was not you, secure your account immediately.",
    time: "Yesterday",
    date: "28 Sep, Wednesday",
    initials: ["D"],
    avatarColor: "bg-indigo-500 text-white",
    tags: ["Community"],
  },
];

const tabs = [
  { label: "All Messages", count: 19, active: true },
  { label: "Work", count: 4 },
  { label: "Social", count: 3 },
];

const tagStyles: Record<string, string> = {
  Meeting: "bg-violet-50 text-violet-700 ring-violet-100",
  App: "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-100",
  Work: "bg-sky-50 text-sky-700 ring-sky-100",
  Social: "bg-slate-100 text-slate-600 ring-slate-200",
  Team: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  Community: "bg-indigo-50 text-indigo-700 ring-indigo-100",
};

const AvatarStack = ({
  initials,
  color,
}: {
  initials: string[];
  color: string;
}) => (
  <div className="flex -space-x-2">
    {initials.slice(0, 3).map((initial, index) => (
      <span
        key={`${initial}-${index}`}
        className={`grid h-10 w-10 place-items-center rounded-full border-[3px] border-white text-sm font-semibold shadow-sm ${color}`}
      >
        {initial}
      </span>
    ))}
  </div>
);

export const MailListPanel = () => {
  return (
    <section className="flex h-[calc(100dvh-2rem)] min-w-0 flex-1 overflow-hidden rounded-[2rem] border border-white/70 bg-white/78 shadow-soft-panel backdrop-blur-2xl">
      <div className="flex w-full max-w-[42rem] flex-col border-r border-slate-950/8 bg-white/72">
        <header className="px-7 pb-4 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[1.7rem] font-semibold tracking-tight text-slate-950">
                  Quick Messages
                </h1>
                <span className="rounded-full bg-violet-600 px-2 py-1 text-[0.65rem] font-bold text-white shadow-[0_8px_22px_rgba(124,58,237,0.25)]">
                  Beta
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Unified overview from all connected inboxes.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous contacts"
                className="grid h-9 w-9 place-items-center rounded-full border border-slate-950/8 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-950"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next contacts"
                className="grid h-9 w-9 place-items-center rounded-full border border-slate-950/8 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-950"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-4 overflow-hidden">
            {quickPeople.map((person) => (
              <button
                key={person.name}
                type="button"
                className="group relative flex min-w-[4.25rem] flex-col items-center gap-2 text-center"
              >
                <span
                  className={`relative grid h-12 w-12 place-items-center rounded-full text-sm font-semibold shadow-sm ring-offset-4 ring-offset-white transition ${
                    person.color
                  } ${person.active ? "ring-2 ring-slate-950" : "ring-0"}`}
                >
                  {person.initials}
                  {person.unread && (
                    <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[0.65rem] font-bold text-white">
                      {person.unread}
                    </span>
                  )}
                </span>
                <span className="max-w-[4.5rem] truncate text-xs font-medium text-slate-500 transition group-hover:text-slate-950">
                  {person.name}
                </span>
              </button>
            ))}
          </div>
        </header>

        <div className="px-7">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                  Inboxes
                </h2>
                <span className="rounded-full bg-rose-500 px-2.5 py-1 text-xs font-bold text-white">
                  16
                </span>
              </div>
              <div className="mt-4 flex gap-6 border-b border-slate-950/10">
                {tabs.map((tab) => (
                  <button
                    key={tab.label}
                    type="button"
                    className={`relative pb-3 text-sm font-semibold transition ${
                      tab.active ? "text-violet-700" : "text-slate-500 hover:text-slate-950"
                    }`}
                  >
                    {tab.label} ({tab.count})
                    {tab.active && (
                      <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-violet-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-3 flex items-center gap-2">
              <button
                type="button"
                aria-label="Mark read"
                className="grid h-9 w-9 place-items-center rounded-full bg-slate-950/[0.04] text-slate-500 transition hover:bg-slate-950/[0.08] hover:text-slate-950"
              >
                <MailOpen className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Refresh"
                className="grid h-9 w-9 place-items-center rounded-full bg-slate-950/[0.04] text-slate-500 transition hover:bg-slate-950/[0.08] hover:text-slate-950"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="More"
                className="grid h-9 w-9 place-items-center rounded-full bg-slate-950/[0.04] text-slate-500 transition hover:bg-slate-950/[0.08] hover:text-slate-950"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 flex h-12 items-center gap-3 rounded-2xl border border-slate-950/8 bg-slate-950/[0.035] px-4 text-slate-500">
            <Search className="h-4 w-4" />
            <input
              className="h-full flex-1 bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400"
              placeholder="Search mail, people, attachments..."
            />
          </div>
        </div>

        <div className="mt-5 flex-1 overflow-y-auto px-5 pb-5">
          <div className="space-y-2">
            {messages.map((message) => (
              <article
                key={`${message.sender}-${message.time}`}
                className={`group grid grid-cols-[auto_auto_1fr] gap-4 rounded-[1.45rem] border p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(15,23,42,0.10)] ${
                  message.active
                    ? "border-violet-100 bg-white shadow-[0_18px_45px_rgba(109,40,217,0.10)]"
                    : "border-transparent bg-white/58 hover:border-slate-950/8 hover:bg-white"
                }`}
              >
                <button
                  type="button"
                  aria-label="Select message"
                  className="mt-2 h-4 w-4 rounded-full border border-slate-300 transition group-hover:border-slate-950"
                />

                <AvatarStack initials={message.initials} color={message.avatarColor} />

                <div className="min-w-0">
                  <div className="flex min-w-0 items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-semibold tracking-tight text-slate-950">
                        {message.sender}
                      </h3>
                      <p className="mt-1 truncate text-xs font-medium text-slate-400">
                        Topic: {message.topic}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      {message.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`rounded-full px-2.5 py-1 text-[0.68rem] font-bold ring-1 ${
                            tagStyles[tag] ?? "bg-slate-100 text-slate-600 ring-slate-200"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                    {message.preview}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {message.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="h-3.5 w-3.5" />
                      {message.time}
                    </span>
                    {message.attachment && (
                      <span className="inline-flex items-center gap-1.5">
                        <LinkIcon className="h-3.5 w-3.5" />
                        {message.attachment}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <MailDetailPanel />
    </section>
  );
};
