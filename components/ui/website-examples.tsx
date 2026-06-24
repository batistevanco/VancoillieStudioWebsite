"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const EXAMPLES = [
  { title: "Vancoillie IT Hulp", src: "/afbeeldingen/websiteExamples/ItHulp.png", href: "https://vancoillie-ithulp.be" },
  { title: "Simplify The", src: "/afbeeldingen/websiteExamples/SIMPLIFYTHE.png", href: "https://batistevancoillie.be/" },
  { title: "Software Development", src: "/afbeeldingen/websiteExamples/SoftwareDevelopment.png", href: "https://batistevancoillie.be/" },
  { title: "Bereikbaar", src: "/afbeeldingen/websiteExamples/Bereikbaar.png", href: "https://batistevancoillie.be/" },
  { title: "Choose Your Domain", src: "/afbeeldingen/websiteExamples/ChooseYourDomain.png", href: "https://batistevancoillie.be/" },
  { title: "Ervaringen van klanten", src: "/afbeeldingen/websiteExamples/ErvaringenVanklanten.png", href: "https://batistevancoillie.be/" },
  { title: "Kunstmatige Intelligentie", src: "/afbeeldingen/websiteExamples/Kunstmatigeintelligentie.png", href: "https://batistevancoillie.be/" },
];

export function WebsiteExamples() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollRight() {
    scrollRef.current?.scrollBy({ left: 480, behavior: "smooth" });
  }

  return (
    <section className="py-20 md:py-28">
      {/* Header */}
      <div className="flex items-end justify-between px-8 md:px-20 mb-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            Portfolio
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Bekijk onze <span className="italic">voorbeelden.</span>
          </h2>
          <p className="mt-3 text-base text-white/55 max-w-md">
            Scroll door een selectie van websites die we bouwden — elk op maat, elk met een eigen aanpak.
          </p>
        </div>
        {/* Scroll button */}
        <button
          onClick={scrollRight}
          className="hidden md:flex flex-none items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/70 hover:bg-white/10 hover:border-white/25 transition-colors backdrop-blur-sm"
        >
          Scroll verder
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Scroll indicator — mobile */}
      <div className="flex items-center gap-2 px-8 mb-6 md:hidden">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-white/35 flex items-center gap-1">
          <ArrowRight className="h-3 w-3" /> Swipe
        </span>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pl-8 md:pl-20 pr-8 md:pr-20 pb-4"
      >
        {EXAMPLES.map(({ title, src, href }) => (
          <a
            key={title}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex-none w-[80vw] md:w-[55vw] lg:w-[45vw] snap-start shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-sm hover:shadow-lg hover:border-white/20 transition-all duration-300"
            style={{ aspectRatio: "16/10" }}
          >
            <Image
              src={src}
              alt={title}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />
            {/* Subtle bottom label on hover */}
            <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/70 to-transparent px-6 py-5">
              <p className="text-sm font-semibold text-white">{title}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
