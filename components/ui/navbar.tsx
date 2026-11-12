"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";

import { Island } from "@/components/ui/island";
import { NotificationBanner } from "@/components/ui/notification-banner";

const NAV_LINKS = [
  { label: "Websites", href: "/websites" },
  { label: "Apps", href: "/apps" },
  { label: "Software", href: "/software" },
  { label: "Over ons", href: "/about" },
];

interface NavbarProps {
  variant?: "overlay" | "solid";
  theme?: "light" | "dark";
}

const isActive = (pathname: string, href: string) => pathname === href || pathname === `${href}/`;

/** Header zoals het portfolio: NavPill links, Dynamic Island in het midden, actie-pill rechts. */
export function Navbar(_props: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const [thumb, setThumb] = useState({ left: 0, width: 0, visible: false });
  const [tone, setTone] = useState<"light" | "dark">("dark");

  useEffect(() => setMounted(true), []);
  useEffect(() => setIsOpen(false), [pathname]);

  // Segmented thumb onder de actieve link.
  useLayoutEffect(() => {
    const nav = navRef.current;
    const active = nav?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!nav || !active) return setThumb((t) => ({ ...t, visible: false }));
    setThumb({ left: active.offsetLeft, width: active.offsetWidth, visible: true });
  }, [pathname]);

  // Toon van de header volgt de sectie eronder, zoals in het portfolio.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = 28;
      const hits = document.elementsFromPoint(window.innerWidth / 2, y);
      const under = hits.find((el) => !el.closest(".studio-header, .studio-menu, .island-banner"));
      const themed = under?.closest(".theme-light, .theme-dark");
      setTone(themed?.classList.contains("theme-dark") ? "dark" : "light");
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    const late = setTimeout(update, 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      clearTimeout(late);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setIsOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    <>
      <header className="studio-header" data-tone={isOpen ? "dark" : tone}>
        <div className="nav-pill glass">
          <nav ref={navRef} aria-label="Hoofdnavigatie" className="relative flex items-center">
            <span
              aria-hidden="true"
              className="seg-thumb"
              style={{ left: thumb.left, width: thumb.width, opacity: thumb.visible ? 1 : 0 }}
            />
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={href} href={href} className="nav-pill__link" aria-current={isActive(pathname, href) ? "page" : undefined}>
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <button
          className="studio-burger glass"
          type="button"
          aria-label={isOpen ? "Sluit menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="studio-mobile-menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="studio-nav__burger" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>

        <Island />

        <div className="action-pill glass">
          <a href="mailto:info@vancoli.be" className="action-pill__icon" aria-label="Mail info@vancoli.be" title="info@vancoli.be">
            <Mail size={16} strokeWidth={1.9} aria-hidden="true" />
          </a>
          <Link href="/contact" className="action-pill__cta" aria-current={isActive(pathname, "/contact") ? "page" : undefined}>
            Contact
          </Link>
        </div>
      </header>

      <NotificationBanner />

      {mounted &&
        isOpen &&
        createPortal(
          <nav id="studio-mobile-menu" className="studio-menu" aria-label="Mobiele navigatie">
            {[{ label: "Home", href: "/" }, ...NAV_LINKS, { label: "Contact", href: "/contact" }].map(({ label, href }, i) => (
              <Link
                key={href}
                href={href}
                className="menu-item"
                aria-current={isActive(pathname, href) ? "page" : undefined}
                style={{ "--i": i } as React.CSSProperties}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>,
          document.body,
        )}
    </>
  );
}
