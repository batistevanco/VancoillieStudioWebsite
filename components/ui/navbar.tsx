"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const LINKS = [
  { nl: "Websites", en: "Websites", href: "/websites" },
  { nl: "Apps", en: "Apps", href: "/apps" },
  { nl: "Software", en: "Software", href: "/software" },
  { nl: "Over ons", en: "About", href: "/about" },
];

interface NavbarProps {
  variant?: "overlay" | "solid";
  theme?: "light" | "dark";
}

export function Navbar({ variant = "overlay", theme }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(variant === "solid");
  const english = pathname.startsWith("/en");
  const prefix = english ? "/en" : "";

  useEffect(() => {
    if (variant === "solid") return;
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const overDark = variant === "overlay" && !solid && theme !== "dark";
  const home = prefix || "/";

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid || open ? "border-b border-[#ded9d1] bg-[#f7f5f2]/95 backdrop-blur-md" : "border-b border-transparent"}`}>
        <div className="studio-wrap flex h-[var(--nav-h)] items-center justify-between gap-6">
          <Link href={home} aria-label="Vancoillie Studio — home" className="flex items-center gap-3 transition-opacity hover:opacity-65">
            <Image
              src="/afbeeldingen/StudioMark.png"
              alt=""
              width={20}
              height={29}
              className="h-7 w-5 object-contain"
            />
            <span className={`text-[1rem] font-semibold tracking-[-.02em] ${overDark ? "text-white" : "text-[#16181c]"}`}>Vancoillie Studio</span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label={english ? "Main navigation" : "Hoofdnavigatie"}>
            {LINKS.map((link) => (
              <Link key={link.href} href={`${prefix}${link.href}`} className={`studio-link text-[.9375rem] transition-colors ${overDark ? "text-white/75 hover:text-white" : "text-[#5a5f66] hover:text-[#16181c]"}`}>
                {english ? link.en : link.nl}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <Link href={`${prefix}/contact`} className={`hidden text-[.875rem] font-medium sm:inline-flex ${overDark ? "studio-btn border-white/40 text-white hover:border-white" : "studio-btn studio-btn-primary"}`}>
              {english ? "Start a project" : "Start een project"}
            </Link>
            <button type="button" onClick={() => setOpen(!open)} className={`grid h-11 w-11 place-items-center border lg:hidden ${overDark && !open ? "border-white/35 text-white" : "border-[#cec7bc] text-[#16181c]"}`} aria-expanded={open} aria-label={open ? "Sluit menu" : "Open menu"}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 bg-[#f7f5f2] pt-[var(--nav-h)] lg:hidden">
          <nav className="studio-wrap flex h-full flex-col py-10" aria-label="Mobiele navigatie">
            {LINKS.map((link, index) => (
              <Link key={link.href} href={`${prefix}${link.href}`} onClick={() => setOpen(false)} className="grid grid-cols-[3rem_1fr] items-center border-t border-[#ded9d1] py-5 text-2xl font-medium text-[#16181c] last:border-b">
                <span className="font-mono text-[.6875rem] text-[#8c9198]">0{index + 1}</span>
                {english ? link.en : link.nl}
              </Link>
            ))}
            <div className="mt-auto flex items-center justify-between border-t border-[#ded9d1] pt-6 text-sm">
              <Link href={`${prefix}/contact`} onClick={() => setOpen(false)} className="studio-btn studio-btn-primary">{english ? "Start a project" : "Start een project"}</Link>
              <Link href={english ? pathname.replace(/^\/en/, "") || "/" : `/en${pathname === "/" ? "" : pathname}`} className="font-mono text-xs uppercase tracking-[.14em] text-[#5a5f66]">{english ? "NL" : "EN"}</Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
