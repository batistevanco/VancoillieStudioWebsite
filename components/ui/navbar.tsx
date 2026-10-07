"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";

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

export function Navbar({ variant: _variant, theme: _theme }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isHome = ["/", "/home", "/en", "/en/home"].includes(pathname);
  const links = isHome ? NAV_LINKS : [{ label: "Home", href: "/" }, ...NAV_LINKS];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <header className={`studio-nav ${scrolled ? "studio-nav--scrolled" : ""}`}>
      <nav className="studio-nav__inner" aria-label="Hoofdnavigatie">
        <Link className="studio-nav__brand" href="/" onClick={() => setIsOpen(false)}>
          VANCOILLIE<span>.</span> STUDIO
        </Link>
        <div className="studio-nav__links">
          {links.map(({ label, href }) => (
            <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>
              {label}
            </Link>
          ))}
        </div>
        <Link className="studio-nav__cta" href="/contact">
          Contact <ArrowUpRight size={18} strokeWidth={1.7} aria-hidden="true" />
        </Link>
        <button className="studio-nav__toggle" type="button" aria-label={isOpen ? "Sluit menu" : "Open menu"} aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>
      {isOpen && (
        <nav className="studio-nav__mobile" aria-label="Mobiele navigatie">
          {links.map(({ label, href }) => <Link key={href} href={href} onClick={() => setIsOpen(false)}>{label}<ArrowUpRight size={18} /></Link>)}
          <Link href="/contact" onClick={() => setIsOpen(false)}>Contact<ArrowUpRight size={18} /></Link>
        </nav>
      )}
    </header>
  );
}
