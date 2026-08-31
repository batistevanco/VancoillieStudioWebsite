import Image from "next/image";
import Link from "next/link";

import { Navbar } from "@/components/ui/navbar";

const IMG = "/afbeeldingen/Booklane";

const flow = [
  "Dienst",
  "Behoefte",
  "Locatie & prijs",
  "Moment",
  "Bevestiging",
];

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

/* -------------------------------------------------------------------------- */
/*  Booklane — sectie onder de hero                                           */
/* -------------------------------------------------------------------------- */

export function BooklaneExperience() {
  return (
    <section id="booklane-experience" className="overflow-x-clip bg-[#14181c] text-[#f4f1ea]">
      <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        {/* statement */}
        <div className="grid gap-x-12 gap-y-8 border-b border-white/12 pb-16 md:grid-cols-[1fr_1fr] md:pb-20">
          <h3 className="font-serif text-[2rem] font-normal leading-[1.1] tracking-[-0.01em] text-[#f4f1ea] sm:text-4xl md:text-[2.9rem]">
            Een planner begint met een lege kalender.
            <br />
            Booklane begint bij de <em className="italic text-[#c9a978]">klant</em>.
          </h3>
          <p className="max-w-md self-end text-[15px] leading-7 text-white/55 md:justify-self-end">
            Het achterhaalt wat iemand nodig heeft, bepaalt de juiste dienst, geeft
            duidelijkheid over de prijs en toont pas daarna momenten die echt passen —
            direct boekbaar of op aanvraag, zoals jij het instelt.
          </p>
        </div>

        {/* flow als genummerde regel, geen cards */}
        <ol className="grid grid-cols-2 border-b border-white/12 sm:grid-cols-3 md:grid-cols-5">
          {flow.map((step, index) => (
            <li
              key={step}
              className="border-t border-white/12 py-6 pr-4 sm:border-t-0 sm:py-8"
            >
              <span className="font-serif text-sm text-[#c9a978]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-[13px] text-white/70">{step}</p>
            </li>
          ))}
        </ol>

        {/* admin-beeld, breed */}
        <figure className="mt-16 md:mt-20">
          <div className="overflow-hidden border border-white/12">
            <Image
              src={`${IMG}/web-8.png`}
              alt="De web-admin van Booklane — dashboard"
              width={2400}
              height={1350}
              className="h-auto w-full"
            />
          </div>
          <figcaption className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-white/40">
            <span className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#c9a978]" />
              De web-admin
            </span>
            <Link
              href="/software/booklane"
              className="group inline-flex items-center gap-2 normal-case tracking-normal text-white/70"
            >
              <span className="border-b border-white/25 pb-0.5 text-sm transition-colors group-hover:border-[#c9a978]">
                Volledige pagina
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
