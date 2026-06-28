import {
  Archive,
  ArrowLeft,
  Download,
  FileArchive,
  FileImage,
  FileText,
  Image,
  Link,
  MoreHorizontal,
  Paperclip,
  Reply,
  Send,
  Smile,
  Star,
  Type,
  Undo2,
} from "lucide-react";

const attachments = [
  {
    name: "Payment Data",
    type: "PDF",
    size: "72 KB",
    icon: FileText,
    tone: "from-slate-950 to-slate-700",
  },
  {
    name: "Booking App",
    type: "FIG",
    size: "1.72 MB",
    icon: FileImage,
    tone: "from-amber-300 via-lime-300 to-cyan-300",
  },
  {
    name: "UX-Flow",
    type: "ZIP",
    size: "28.2 MB",
    icon: FileArchive,
    tone: "from-violet-100 via-white to-slate-100",
  },
];

const actionButtons = [
  { label: "Favorite", icon: Star, active: true },
  { label: "Undo", icon: Undo2 },
  { label: "Archive", icon: Archive },
  { label: "More", icon: MoreHorizontal },
];

export const MailDetailPanel = () => {
  return (
    <article className="hidden min-w-[30rem] flex-1 flex-col bg-white/86 xl:flex">
      <header className="flex items-start justify-between border-b border-slate-950/8 px-8 py-6">
        <div className="flex min-w-0 items-start gap-4">
          <button
            type="button"
            aria-label="Back to messages"
            className="mt-1 grid h-9 w-9 place-items-center rounded-full bg-slate-950/[0.04] text-slate-500 transition hover:bg-slate-950/[0.08] hover:text-slate-950"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="grid h-12 w-12 place-items-center rounded-full bg-amber-100 text-sm font-bold text-amber-800 shadow-sm">
            BS
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-base font-semibold tracking-tight text-slate-950">
                Brooklyn Simmons
              </h2>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="text-xs font-medium text-slate-400">
                from: whitecompany@alokee.com
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="truncate text-xs font-medium text-slate-400">
                to: office@vancoillie.studio
              </span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400">
              <span>Today, Monday</span>
              <span>13:45 PM</span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {actionButtons.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.label}
                type="button"
                aria-label={action.label}
                className={`grid h-9 w-9 place-items-center rounded-full transition ${
                  action.active
                    ? "bg-amber-50 text-amber-500"
                    : "bg-slate-950/[0.04] text-slate-500 hover:bg-slate-950/[0.08] hover:text-slate-950"
                }`}
              >
                <Icon className="h-4 w-4" />
              </button>
            );
          })}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-8 py-7">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-[2rem] font-semibold leading-tight tracking-tight text-slate-950">
            Mobile Booking Design Edits
          </h1>

          <div className="mt-7 space-y-5 text-[0.95rem] leading-7 text-slate-700">
            <p className="font-semibold text-slate-950">Hello, Vitaliy!</p>
            <p>
              We really like the design of the application you sent us. To
              understand the completeness of the project, I will send you the old
              design of the app. There you can see the current state of the
              project.
            </p>
            <div>
              <p className="font-semibold text-slate-950">
                Brooklyn Simmons, CPO
              </p>
              <p className="mt-1 text-sm font-medium text-slate-400">
                Site: whitecompany.com
              </p>
            </div>
          </div>

          <section className="mt-9">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-950">
                Attachments <span className="text-slate-400">(3 Files)</span>
              </h3>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 transition hover:bg-blue-100"
              >
                <Download className="h-3.5 w-3.5" />
                Download All
              </button>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              {attachments.map((attachment) => {
                const Icon = attachment.icon;

                return (
                  <button
                    key={attachment.name}
                    type="button"
                    className="group overflow-hidden rounded-[1.35rem] border border-slate-950/8 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]"
                  >
                    <div
                      className={`grid aspect-[1.32] place-items-center bg-gradient-to-br ${attachment.tone}`}
                    >
                      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/80 text-slate-950 shadow-sm backdrop-blur-xl">
                        <Icon className="h-7 w-7" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-3">
                      <span className="grid h-5 w-5 place-items-center rounded-md bg-rose-50 text-rose-500">
                        <Paperclip className="h-3 w-3" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-slate-950">
                          {attachment.name}
                        </p>
                        <p className="mt-0.5 text-[0.68rem] font-medium text-slate-400">
                          {attachment.type} / {attachment.size}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      <footer className="border-t border-slate-950/8 bg-white/90 px-8 py-5">
        <div className="mx-auto max-w-3xl">
          <div className="mb-3 flex items-center gap-2 rounded-[1.15rem] bg-slate-950 px-3 py-2 text-white shadow-[0_14px_35px_rgba(15,23,42,0.20)]">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-1.5 text-xs font-semibold transition hover:bg-white/16"
            >
              <Reply className="h-3.5 w-3.5" />
              Reply
            </button>
            <span className="text-xs text-white/36">To:</span>
            <span className="rounded-full bg-white/12 px-2.5 py-1 text-xs font-medium">
              whitecompany@alokee.com
            </span>
            <button
              type="button"
              aria-label="Add recipient"
              className="grid h-7 w-7 place-items-center rounded-full text-white/54 transition hover:bg-white/10 hover:text-white"
            >
              +
            </button>
            <div className="ml-auto flex items-center gap-1">
              <button
                type="button"
                aria-label="Attach file"
                className="grid h-7 w-7 place-items-center rounded-full text-white/54 transition hover:bg-white/10 hover:text-white"
              >
                <Paperclip className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                aria-label="More"
                className="grid h-7 w-7 place-items-center rounded-full text-white/54 transition hover:bg-white/10 hover:text-white"
              >
                <MoreHorizontal className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="rounded-[1.35rem] border border-slate-950/8 bg-white p-4 shadow-sm">
            <p className="text-sm leading-7 text-slate-700">
              Hi, Brooklyn Simmons <span className="text-amber-500">hi</span>
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Glad you like the new design. My partner{" "}
              <span className="rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">
                Eugene
              </span>{" "}
              and I will analyze your documents and offer our solution.
            </p>

            <div className="mt-4 flex items-center justify-between border-t border-slate-950/8 pt-3">
              <div className="flex items-center gap-1">
                {[Type, Smile, Image, Link].map((Icon, index) => (
                  <button
                    key={index}
                    type="button"
                    className="grid h-8 w-8 place-items-center rounded-full text-slate-400 transition hover:bg-slate-950/[0.04] hover:text-slate-950"
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.20)] transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Send
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
};
