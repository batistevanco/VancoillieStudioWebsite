import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCopy } from "@/lib/i18n";
import type { Locale } from "@/lib/routes";

export function AboutSection2({ locale = "nl" }: { locale?: Locale }) {
  const content = getCopy(locale).homeAbout;
  return (
    <section id="about" className="studio-band-lg border-b border-[#ded9d1] bg-[#f7f5f2]">
      <div className="studio-wrap studio-grid gap-y-10">
        <div className="col-span-12 lg:col-span-3"><p className="studio-label">Wat we doen</p></div>
        <div className="col-span-12 lg:col-span-8 lg:col-start-5">
          <h2 className="studio-h2 text-[#16181c]">{content.prefix} <em>{content.highlightOne}</em> {content.middle} <em>{content.highlightTwo}</em> {content.end} <em>{content.highlightThree}</em></h2>
          <div className="mt-12 grid gap-8 border-t border-[#ded9d1] pt-7 sm:grid-cols-2">
            <div><p className="text-[1rem] font-medium text-[#16181c]">{content.captionTitle}</p><p className="mt-2 text-[.9375rem] leading-7 text-[#5a5f66]">{content.captionSubtitle}</p></div>
            <Link href={locale === "en" ? "/en/about" : "/about"} className="studio-link flex items-center justify-between self-start text-[.9375rem] font-medium text-[#16181c] sm:justify-self-end">{content.button}<ArrowRight className="ml-6 h-4 w-4" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
