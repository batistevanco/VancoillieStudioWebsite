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

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? "bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md shadow-sm border-b border-neutral-200/30 dark:border-neutral-800/30 py-3 md:py-4" 
          : "bg-transparent py-5 md:py-6"
      }`}>
        <nav className="flex items-center justify-between px-6 md:px-12 max-w-7xl mx-auto w-full">
          {/* Logo */}
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className={`text-base font-semibold tracking-tight transition-colors duration-300 ${logoColor}`}
          >
            Vancoillie Studio
          </Link>

          {/* Desktop nav pill */}
          <div
            ref={navRef}
            className={`relative hidden md:flex items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-300 ${pillBg}`}
            onMouseLeave={() => { setHovered(null); setHoverStyle(null); }}
          >
            {hoverStyle && (
              <motion.div
                className={`absolute top-1.5 h-[calc(100%-12px)] rounded-full pointer-events-none transition-colors duration-300 ${hoverBg}`}
                initial={false}
                animate={{ left: hoverStyle.left, width: hoverStyle.width }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}

            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onMouseEnter={handleMouseEnter}
                className={`relative z-10 rounded-full px-4 py-1.5 text-sm transition-colors duration-300 ${linkColor}`}
              >
                {label}
              </Link>
            ))}

            <Link
              href="/contact"
              className={`relative z-10 rounded-full px-5 py-1.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.03] ${contactButtonClass}`}
            >
              Contact
            </Link>
          </div>

          {/* Desktop balancer */}
          <div className="w-40 hidden md:block" />

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex md:hidden p-2 rounded-full hover:bg-neutral-500/10 transition-colors duration-300 focus:outline-none z-50 ${hamburgerColor}`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-0 top-0 pt-20 pb-8 px-6 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-200/50 dark:border-neutral-800/50 z-40 flex flex-col gap-4 shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-2 mt-4">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 px-4 rounded-xl text-base font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white transition-all"
                >
                  {label}
                </Link>
              ))}
              
              <hr className="my-2 border-neutral-200 dark:border-neutral-800" />
              
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full py-3.5 px-4 rounded-xl text-center text-sm font-semibold bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 transition-colors"
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
