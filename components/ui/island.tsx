"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertCircle, Check, Copy, Download, Mail, MessageSquare } from "lucide-react";

import { ISLAND_EVENT, notifyIsland, type IslandIcon, type IslandMessage } from "@/lib/events";

const EMAIL = "info@vancoli.be";

/** Naam per pagina, voor pagina's zonder eigen data-island-secties. */
const PAGE_LABELS: Record<string, string> = {
  "/": "Studio",
  "/websites": "Websites",
  "/apps": "Apps",
  "/software": "Software",
  "/about": "Over ons",
  "/contact": "Contact",
  "/privacybeleid": "Privacybeleid",
  "/algemene-voorwaarden": "Voorwaarden",
};

const ICONS: Record<IslandIcon, typeof Check> = {
  check: Check,
  mail: Mail,
  download: Download,
  error: AlertCircle,
};

function pageLabel(pathname: string) {
  const clean = pathname.replace(/^\/en(?=\/|$)/, "").replace(/\/$/, "") || "/";
  if (PAGE_LABELS[clean]) return PAGE_LABELS[clean];
  const slug = clean.split("/").pop() ?? "";
  return slug.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

export function Island() {
  const pathname = usePathname();
  const [section, setSection] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState<IslandMessage | null>(null);
  const [expanded, setExpanded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Sectienaam: de [data-island]-sectie die het midden van het scherm raakt.
  useEffect(() => {
    setSection(null);
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-island]"));
    if (!targets.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setSection((entry.target as HTMLElement).dataset.island ?? null);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [pathname]);

  // Leesvoortgang.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Berichten van andere componenten.
  useEffect(() => {
    const onMessage = (event: Event) => {
      const detail = (event as CustomEvent<IslandMessage>).detail;
      setExpanded(false);
      setMessage(detail);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setMessage(null), 2600);
    };
    window.addEventListener(ISLAND_EVENT, onMessage);
    return () => {
      window.removeEventListener(ISLAND_EVENT, onMessage);
      clearTimeout(timer.current);
    };
  }, []);

  // Uitgeklapt: sluiten met Escape of een klik erbuiten.
  useEffect(() => {
    if (!expanded) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setExpanded(false);
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setExpanded(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [expanded]);

  useEffect(() => setExpanded(false), [pathname]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      notifyIsland("E-mail gekopieerd", "check");
    } catch {
      notifyIsland("Kopiëren lukte niet", "error");
    }
  };

  const label = section ?? pageLabel(pathname);
  const state = expanded ? "expanded" : message ? "message" : "idle";
  const MessageIcon = message ? ICONS[message.icon ?? "check"] : Check;
  const circumference = 2 * Math.PI * 11.5;

  return (
    <div ref={rootRef} className="island" data-state={state}>
      {state === "expanded" ? (
        <div className="island-panel" role="dialog" aria-label="Contact">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-white/60">Vancoillie Studio</p>
              <p className="mt-1 text-[1.0625rem] font-semibold leading-tight">Een website, een app of een idee?</p>
            </div>
            <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs text-white/60">
              <span className="size-2 rounded-full bg-[#30d158]" aria-hidden="true" />
              Antwoord binnen de dag
            </span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <a href={`mailto:${EMAIL}`} className="island-action" onClick={() => setExpanded(false)}>
              <Mail size={18} aria-hidden="true" />
              Mail
            </a>
            <Link href="/contact" className="island-action" onClick={() => setExpanded(false)}>
              <MessageSquare size={18} aria-hidden="true" />
              Contact
            </Link>
            <button type="button" className="island-action" onClick={copyEmail}>
              <Copy size={18} aria-hidden="true" />
              Kopieer
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="island-pill"
          aria-label={`${label}. Open contactopties`}
          aria-expanded={false}
          onClick={() => setExpanded(true)}
        >
          {state === "message" && message ? (
            <span key={`m-${message.text}`} className="island-label flex items-center gap-2">
              <span className={`grid size-5 place-items-center rounded-full ${message.icon === "error" ? "bg-[#ff453a]" : "bg-[#30d158]"}`}>
                <MessageIcon size={12} strokeWidth={3} aria-hidden="true" />
              </span>
              <span role="status">{message.text}</span>
            </span>
          ) : (
            <>
              <span className="island-avatar" aria-hidden="true">
                <Image src="/apple-touch-icon.png" alt="" width={24} height={24} />
              </span>
              <span key={label} className="island-label mr-auto truncate">{label}</span>
              <span className="island-ring" aria-hidden="true">
                <svg viewBox="0 0 28 28" className="-rotate-90">
                  <circle cx="14" cy="14" r="11.5" fill="none" stroke="rgb(48 209 88 / .25)" strokeWidth="2.5" />
                  <circle
                    cx="14"
                    cy="14"
                    r="11.5"
                    fill="none"
                    stroke="#30d158"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - progress)}
                  />
                </svg>
                <span className="island-ring__value">{Math.round(progress * 100)}</span>
              </span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
