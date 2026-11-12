"use client";

import Link from "next/link";

import { notifyIsland } from "@/lib/events";

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
    { label: "Instagram", href: "https://www.instagram.com/vancoli_be/", external: true },
    { label: "GitHub", href: "https://github.com/batistevancoillie", external: true },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/batiste-vancoillie-622562291/", external: true },
    { label: "X / Twitter", href: "https://x.com/vancoli_be", external: true },
  ],
};

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export function SiteFooter() {
  return (
    <footer id="contact" data-island="Contact" className="theme-dark relative overflow-hidden">
      <div className="studio-glow" aria-hidden="true" />
      <div className="relative mx-auto max-w-[80rem] px-[var(--space-gutter)]">
        <div className="py-[var(--space-section)] text-center">
          <p className="kicker reveal">Contact</p>
          <h2 className="reveal mx-auto mt-2 max-w-[14ch] text-[length:var(--font-size-display)] font-semibold leading-none tracking-[-0.035em]">
            Een website, een app of een idee.
          </h2>
          <p className="reveal mx-auto mt-5 max-w-[var(--measure)] text-lg leading-snug text-ink-soft">
            Vertel kort wat je nodig hebt. Je krijgt meestal binnen de dag antwoord.
          </p>
          <div className="reveal mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn btn-primary">Neem contact op</Link>
            <button
              type="button"
              className="btn btn-quiet"
              aria-label="Kopieer info@vancoli.be"
              onClick={() =>
                navigator.clipboard
                  .writeText("info@vancoli.be")
                  .then(() => notifyIsland("E-mail gekopieerd", "check"))
                  .catch(() => notifyIsland("Kopiëren lukte niet", "error"))
              }
            >
              info@vancoli.be
            </button>
          </div>
        </div>

        <div className="grid gap-10 border-t border-rule py-12 sm:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="text-xl font-semibold tracking-[-0.02em]">
              Vancoillie<span className="text-signal">.</span> Studio
            </Link>
            <p className="mt-3 max-w-[16rem] text-sm text-ink-soft">Websites op maat en eigen apps, gebouwd in Roeselare.</p>
          </div>
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <p className="micro-label">{category}</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {links.map(({ label, href, external: isExternal }) => (
                  <li key={label}>
                    <Link href={href} {...(isExternal ? external : {})} className="text-white/75 transition-colors hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-rule py-6 text-xs text-ink-faint sm:flex-row sm:flex-wrap sm:justify-between">
          <span>© {new Date().getFullYear()} Vancoillie Studio · BTW BE 1014.303.066</span>
          <span>
            Powered by{" "}
            <a href="https://vancoli.be" {...external} className="font-semibold text-white/75 hover:text-white">
              VANCOLI.
            </a>
          </span>
          <span>De personen op de foto&apos;s zijn AI-gegenereerd.</span>
          <span>Apple, iPhone en App Store zijn handelsmerken van Apple Inc.</span>
        </div>
      </div>
    </footer>
  );
}
