import Link from "next/link";

import { getCopy } from "@/lib/i18n";
import type { Locale } from "@/lib/routes";

function Words({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className={className}>
          {word}{" "}
        </span>
      ))}
    </>
  );
}

/** Statement: één grote alinea waarvan de woorden oplichten tijdens het scrollen. */
export function AboutSection2({ locale = "nl" }: { locale?: Locale }) {
  const content = getCopy(locale).homeAbout;

  return (
    <section id="about" data-island="De studio" className="theme-light bg-white py-[var(--space-section)]">
      <div className="mx-auto max-w-[80rem] px-[var(--space-gutter)]">
        <p className="kicker reveal">{locale === "en" ? "Studio" : "De studio"}</p>
        <h2 className="word-reveal mt-4 max-w-[22ch] text-[length:var(--font-size-display)] font-semibold leading-[1.05] tracking-[-0.035em]">
          <Words text={content.prefix} />
          <Words text={content.highlightOne} />
          <Words text={content.middle} />
          <Words text={content.highlightTwo} />
          <Words text={content.end} />
          <Words text={content.highlightThree} />
        </h2>

        <div className="reveal mt-14 flex flex-col gap-6 border-t border-rule pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[var(--measure)]">
            <p className="text-lg leading-snug text-ink-soft">{content.captionTitle}</p>
            <p className="micro-label mt-3">{content.captionSubtitle}</p>
          </div>
          <Link href={locale === "en" ? "/en/about" : "/about"} className="link-signal shrink-0 text-lg">
            {content.button} <span aria-hidden="true">›</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
