import Image from "next/image";
import Link from "next/link";

import { Navbar } from "@/components/ui/navbar";

const IMG = "/afbeeldingen/Booklane";

/* -------------------------------------------------------------------------- */
/*  Booklane — intro op de software-pagina                                    */
/* -------------------------------------------------------------------------- */

export function BooklaneHero() {
  return (
    <div className="overflow-x-clip bg-[#f4f1ea] text-[#14181c]">
      <Navbar variant="overlay" theme="dark" />

      <section className="px-5 pt-28 sm:px-8 md:pt-36 lg:px-12">
        <div className="mx-auto max-w-[1240px]">
          {/* kop-regel */}
          <div className="flex items-baseline justify-between border-b border-[#14181c]/12 pb-4">
            <span className="font-serif text-lg italic text-[#14181c]">Booklane</span>
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#8a8377]">
              In ontwikkeling
            </span>
          </div>

          {/* titelblok */}
          <div className="grid gap-x-12 gap-y-10 pt-14 md:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <h2 className="font-serif text-[2.9rem] font-normal leading-[1.04] tracking-[-0.015em] text-[#14181c] sm:text-6xl md:text-[4.4rem] lg:text-[4.75rem]">
              Een afsprakentool die begint
              <br className="hidden sm:block" /> bij de <em className="font-light italic text-[#9a7b4f]">klant</em>.
            </h2>

            <div className="lg:pb-3">
              <p className="max-w-md text-[15px] leading-7 text-[#5b5f63]">
                Klanten van een dienstverlener boeken of vragen zelf een afspraak aan —
                zonder heen-en-weer berichten, met een automatische prijsindicatie en
                agenda-integratie. Booklane is gebouwd voor Vancoillie IT Hulp.
              </p>
              <Link
                href="/software/booklane"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#14181c]"
              >
                <span className="border-b border-[#14181c]/30 pb-0.5 transition-colors group-hover:border-[#9a7b4f]">
                  Bekijk Booklane in detail
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* productbeeld — breekt naar de rechterrand */}
          <figure className="mt-16 md:mt-24">
            <div className="relative -mr-5 overflow-hidden border border-[#14181c]/12 sm:-mr-8 lg:mr-[-6vw]">
              <Image
                src={`${IMG}/web-1.png`}
                alt="De publieke boekingssite van Booklane"
                width={2200}
                height={1400}
                priority
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-[#8a8377]">
              <span className="h-px w-8 bg-[#9a7b4f]" />
              De publieke boekingssite
            </figcaption>
          </figure>
        </div>
      </section>
    </div>
  );
}
