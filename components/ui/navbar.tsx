"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Websites", href: "/websites" },
  { label: "Apps", href: "/apps" },
  { label: "Software", href: "/software" },
  { label: "Over ons", href: "/about" },
];

interface NavbarProps {
  /** "overlay" = transparant over afbeelding, "solid" = op witte achtergrond (donker) */
  variant?: "overlay" | "solid";
  /** "light" = witte links (voor donkere bg), "dark" = donkere links (voor lichte bg) */
  theme?: "light" | "dark";
}

export function Navbar({ variant = "overlay", theme }: NavbarProps) {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/home" || pathname === "/en" || pathname === "/en/home";

  const navLinks = isHome 
    ? NAV_LINKS 
    : [{ label: "Home", href: "/" }, ...NAV_LINKS];

  const [hovered, setHovered] = useState<string | null>(null);
  const [hoverStyle, setHoverStyle] = useState<{ left: number; width: number } | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleMouseEnter(e: React.MouseEvent<HTMLAnchorElement>) {
    const pill = navRef.current;
    if (!pill) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pillRect = pill.getBoundingClientRect();
    setHoverStyle({ left: rect.left - pillRect.left, width: rect.width });
  }

  const isOverlay = variant === "overlay";
  const activeTheme = theme ?? (isOverlay ? "light" : "dark");
  const isDarkTheme = activeTheme === "dark";

  // Dynamic colors based on scroll
  const logoColor = scrolled || isOpen
    ? "text-neutral-900 dark:text-white"
    : (isDarkTheme ? "text-neutral-900" : "text-white");

  const pillBg = scrolled
    ? "border border-neutral-200/60 bg-neutral-100/70 dark:border-neutral-800/60 dark:bg-neutral-950/70 backdrop-blur-md"
    : (isOverlay
        ? (isDarkTheme
            ? "border border-neutral-900/10 bg-neutral-950/5 backdrop-blur-md"
            : "border border-white/20 bg-white/10 backdrop-blur-md")
        : "border border-neutral-200 bg-neutral-100");

  const hoverBg = scrolled
    ? "bg-neutral-900/5 dark:bg-white/10"
    : (isOverlay
        ? (isDarkTheme ? "bg-neutral-900/10" : "bg-white/25")
        : "bg-white");

  const linkColor = scrolled
    ? "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
    : (isDarkTheme
        ? "text-neutral-600 hover:text-neutral-900"
        : "text-white/90 hover:text-white");

  const contactButtonClass = scrolled
    ? "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
    : (isDarkTheme
        ? "bg-neutral-900 text-white hover:bg-neutral-800"
        : "bg-black/80 text-white hover:bg-black");

  const hamburgerColor = scrolled || isOpen
    ? "text-neutral-900 dark:text-white"
    : (isDarkTheme ? "text-neutral-900" : "text-white");

  // Liquid glass — dark tint ensures text always readable regardless of background
  const glassBase =
    "border border-white/15 bg-black/35 backdrop-blur-xl backdrop-saturate-150 shadow-sm shadow-black/20";
  const glassScrolled =
    "border border-white/20 bg-black/50 backdrop-blur-2xl backdrop-saturate-200 shadow-md shadow-black/25";

  const pillClass = scrolled ? glassScrolled : glassBase;
  const textClass = "text-white/85 hover:text-white";
  const logoClass = "text-white";
  const contactClass = "bg-white/15 text-white hover:bg-white/25 border border-white/20";
  const hoverPillClass = "bg-white/15";

  return (
    <>
      {/* Floating navbar — one unified pill */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
        <nav
          ref={navRef}
          className={`pointer-events-auto hidden md:flex items-center justify-between w-full max-w-4xl rounded-full px-3 py-1.5 transition-all duration-500 ${pillClass}`}
          onMouseLeave={() => { setHovered(null); setHoverStyle(null); }}
        >
          {/* Hover highlight */}
          {hoverStyle && (
            <motion.div
              className={`absolute top-1.5 h-[calc(100%-12px)] rounded-full pointer-events-none ${hoverPillClass}`}
              initial={false}
              animate={{ left: hoverStyle.left, width: hoverStyle.width }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}

          {/* Logo */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`relative z-10 rounded-full px-4 py-1.5 text-sm font-semibold tracking-tight transition-colors duration-200 ${logoClass}`}
          >
            Vancoillie Studio
          </Link>

          {/* Nav links — centered */}
          <div className="relative z-10 flex items-center gap-1">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onMouseEnter={handleMouseEnter}
                className={`rounded-full px-4 py-1.5 text-sm transition-colors duration-200 ${textClass}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <Link
            href="/contact"
            onMouseEnter={handleMouseEnter}
            className={`relative z-10 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-200 ${textClass}`}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile: one unified pill */}
        <div className={`pointer-events-auto flex md:hidden items-center justify-between w-full rounded-full px-3 py-1.5 ${pillClass}`}>
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`text-sm font-semibold tracking-tight ${logoClass}`}
          >
            Vancoillie Studio
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-1.5 rounded-full transition-all duration-300 focus:outline-none ${logoClass}`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel — glass */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-4 top-20 z-40 rounded-2xl border border-white/20 bg-black/60 backdrop-blur-2xl backdrop-saturate-150 p-5 flex flex-col gap-2 shadow-2xl md:hidden"
          >
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setIsOpen(false)}
                className="w-full py-3 px-4 rounded-xl text-base font-medium text-white/90 hover:bg-white/10 hover:text-white transition-all"
              >
                {label}
              </Link>
            ))}
            <div className="mt-1 border-t border-white/10 pt-3">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full py-3 px-4 rounded-xl text-center text-sm font-semibold bg-white/15 text-white hover:bg-white/25 border border-white/20 transition-colors"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
