"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PRODUCTS = [
  {
    name: "Brainox",
    tagline: "Denk het.",
    tagline2: "Brainox doet de rest.",
    description:
      "Notities via tekst of stem. Brainox transcribeert alles en houdt jouw gedachten geordend — altijd en overal.",
    image: "/afbeeldingen/ProductShowcase/BrainoxShowcase1.png",
    href: "/apps",
    dark: true,
    bg: "bg-[#0f0f1a]",
  },
  {
    name: "AbboBuddy",
    tagline: "Grip op je",
    tagline2: "abonnementen.",
    description:
      "Overzicht over alles wat je betaalt. Nooit meer verrast door een onverwachte afschrijving.",
    image: "/afbeeldingen/ProductShowcase/AbboBuddyShowcase2.png",
    href: "/apps",
    dark: false,
  },
  {
    name: "Vancoillie News",
    tagline: "Nieuws op",
    tagline2: "jouw manier.",
    description:
      "Het laatste nieuws, gefilterd op wat jij belangrijk vindt. Snel, overzichtelijk en zonder ruis.",
    image: "/afbeeldingen/ProductShowcase/VancoillieNewsShowcase3.png",
    href: "/apps",
    dark: true,
    bg: "bg-[#0d1a0d]",
  },
  {
    name: "InMandje",
    tagline: "Slimmer",
    tagline2: "boodschappen doen.",
    description:
      "Maak en deel boodschappenlijstjes met je huishouden. Altijd weten wat er nog moet worden gekocht.",
    image: "/afbeeldingen/ProductShowcase/InMandjeShowcase4.png",
    href: "/apps",
    dark: false,
  },
];

export function ProductsSection() {
  return (
    <section className="bg-white pt-24 pb-32 md:pt-32 md:pb-40">
      {/* Header */}
      <div className="mb-12 px-8 md:px-28">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
          Eigen producten
        </p>
        <h2 className="mt-3 text-5xl font-semibold tracking-tight text-neutral-900 md:text-6xl">
          Apps die het werk doen
        </h2>
      </div>

      {/* Horizontal scroll row */}
      <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
        {/* Left spacer */}
        <div className="flex-none w-20 md:w-32 shrink-0" />

        {PRODUCTS.map((product) =>
          product.dark ? (
            <Link
              key={product.name}
              href={product.href}
              className={`relative flex-none w-[80vw] md:w-[42vw] h-[65vh] min-h-[480px] rounded-[2rem] overflow-hidden snap-start shrink-0 ${product.bg}`}
            >
              {/* Full-bleed showcase image */}
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover object-center"
              />
              {/* Gradient overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
              {/* Text */}
              <div className="absolute inset-0 p-9 md:p-12">
                <h3 className="text-3xl md:text-4xl font-semibold text-white leading-tight">
                  {product.tagline}{" "}
                  <span className="italic">{product.tagline2}</span>
                </h3>
                <p className="mt-5 text-base text-white/65 max-w-xs leading-relaxed">
                  {product.description}
                </p>
              </div>
            </Link>
          ) : (
            <Link
              key={product.name}
              href={product.href}
              className="relative flex-none w-[80vw] md:w-[42vw] h-[65vh] min-h-[480px] rounded-[2rem] overflow-hidden snap-start shrink-0 bg-neutral-100"
            >
              {/* Full-bleed showcase image */}
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover object-center"
              />
              {/* Gradient overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/40 to-transparent" />
              {/* Text */}
              <div className="absolute inset-0 p-9 md:p-12">
                <h3 className="text-3xl md:text-4xl font-semibold text-neutral-900 leading-tight">
                  {product.tagline}{" "}
                  <span className="italic">{product.tagline2}</span>
                </h3>
                <p className="mt-5 text-base text-neutral-600 max-w-xs leading-relaxed">
                  {product.description}
                </p>
              </div>
            </Link>
          )
        )}

        {/* 5th tile — CTA naar apps pagina */}
        <Link
          href="/apps"
          className="relative flex-none w-[60vw] md:w-[28vw] h-[65vh] min-h-[480px] rounded-[2rem] snap-start shrink-0 bg-neutral-900 flex flex-col items-center justify-center gap-6 group"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
            <ArrowRight className="h-6 w-6 text-white" />
          </div>
          <div className="text-center px-8">
            <p className="text-xl font-semibold text-white">Bekijk alle apps</p>
            <p className="mt-2 text-sm text-white/50">Ontdek de volledige collectie</p>
          </div>
        </Link>

        {/* Right spacer */}
        <div className="flex-none w-20 md:w-32 shrink-0" />
      </div>
    </section>
  );
}
