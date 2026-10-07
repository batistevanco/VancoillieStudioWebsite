"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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

export function SiteFooter() {
  return (
    <footer className="studio-footer">
      <div className="studio-footer__inner">
        <div className="studio-footer__top">
          <div>
            <span className="studio-eyebrow">Klaar om te beginnen?</span>
            <h2>Klaar om samen<br />iets te bouwen?</h2>
            <p>Van website tot app — we maken het voor je.</p>
          </div>
          <Link href="/websites" className="studio-footer__cta">Bekijk onze websites <ArrowUpRight size={21} /></Link>
        </div>
        <div className="studio-footer__main">
          <div className="studio-footer__identity">
            <Link href="/" className="studio-footer__wordmark">VANCOILLIE<span>.</span><br />STUDIO</Link>
            <p>Digitale ideeën, met zorg gebouwd.</p>
          </div>
          <div className="studio-footer__links">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <span className="studio-eyebrow">{category}</span>
                {links.map(({ label, href, external }) => <Link key={label} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{label}</Link>)}
              </div>
            ))}
          </div>
        </div>
        <div className="studio-footer__bottom">
          <span>© {new Date().getFullYear()} Vancoillie Studio · Alle rechten voorbehouden</span>
          <span className="studio-footer__credit">Powered by <a href="https://vancoli.be" target="_blank" rel="noopener noreferrer">VANCOLI.</a></span>
          <span>De personen op de foto's zijn AI-gegenereerd en geen echte personen.</span>
          <div><Link href="/privacybeleid">Privacybeleid</Link><Link href="/algemene-voorwaarden">Algemene voorwaarden</Link></div>
        </div>
      </div>
    </footer>
  );
}
