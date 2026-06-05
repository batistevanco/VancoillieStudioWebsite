"use client";

import Image from "next/image";
import Link from "next/link";

const FOOTER_LINKS: Record<string, { label: string; href: string; external?: boolean }[]> = {
  Diensten: [
    { label: "Websites", href: "/websites" },
    { label: "Apps", href: "/apps" },
    { label: "Software", href: "/software" },
    { label: "Vancoillie IT Hulp", href: "https://vancoillieithulp.be/", external: true },
  ],
  Bedrijf: [
    { label: "Over ons", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacybeleid", href: "/privacybeleid" },
    { label: "Algemene voorwaarden", href: "/algemene-voorwaarden" },
  ],
  "Volg ons": [
    { label: "Instagram", href: "https://www.instagram.com/vancoilliestudio/", external: true },
    { label: "GitHub", href: "https://github.com/batistevancoillie", external: true },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/batiste-vancoillie-622562291/", external: true },
    { label: "X / Twitter", href: "https://x.com/vancstudio", external: true },
  ],
};

export function SiteFooter() {
  return (
    <footer className="bg-white px-6 md:px-10 pb-0">
      {/* Main footer card with image background + rounded top corners */}
      <div className="relative overflow-hidden rounded-t-[2.5rem] min-h-[560px] flex flex-col justify-between">
        {/* Background image */}
        <Image
          src="/afbeeldingen/footerAfbeelding.png"
          alt="Footer"
          fill
          className="object-cover object-center"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Hero content — top half */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-16">
          <h2 className="text-4xl md:text-6xl font-semibold text-white leading-tight tracking-tight max-w-2xl">
            Klaar om samen<br />iets te bouwen?
          </h2>
          <p className="mt-4 text-base text-white/70 max-w-sm">
            Van website tot app — we maken het voor je.
          </p>
          <Link
            href="/websites"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black hover:bg-white/90 transition-colors"
          >
            Bekijk onze websites
          </Link>
        </div>

        {/* Footer links — bottom half */}
        <div className="relative z-10 px-10 md:px-16 pb-8">
          <div className="border-t border-white/15 pt-8 grid grid-cols-2 md:grid-cols-4 gap-8 items-start">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-4">
                  {category}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {links.map(({ label, href, external }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-sm text-white/70 hover:text-white transition-colors"
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Logo kolom rechts */}
            <div className="flex items-start justify-end">
              <Image
                src="/afbeeldingen/TransparantLogo.png"
                alt="Vancoillie Studio"
                width={120}
                height={120}
                className="opacity-60"
              />
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="text-xs text-white/35">
                © {new Date().getFullYear()} Vancoillie Studio · Alle rechten voorbehouden
              </p>
              <div className="flex items-center gap-6">
                <Link href="/privacybeleid" className="text-xs text-white/35 hover:text-white/60 transition-colors">
                  Privacybeleid
                </Link>
                <Link href="/algemene-voorwaarden" className="text-xs text-white/35 hover:text-white/60 transition-colors">
                  Algemene voorwaarden
                </Link>
              </div>
            </div>
            <p className="text-xs text-white/25 text-center">
              De personen op de foto's zijn AI-gegenereerd en geen echte personen.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
