import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";

const VALUES = ["Websites op maat", "Eigen digitale producten", "Eén vast aanspreekpunt", "Gebouwd in België"];

export function HeroHome() {
  return (
    <section className="relative flex min-h-[680px] w-full flex-col overflow-hidden bg-[#16181c] text-[#f7f5f2] lg:min-h-[clamp(760px,100svh,980px)]">
      <Image src="/afbeeldingen/HeroWithBooklane2411.png" alt="Vancoillie Studio ontwikkelt digitale producten" fill priority className="object-cover object-[58%_center]" />
      <div className="absolute inset-0 bg-[rgba(11,12,15,.62)]" />
      <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-black/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
      <Navbar variant="overlay" />

      <div className="studio-wrap relative z-10 flex flex-1 flex-col items-center justify-center pb-8 pt-[calc(var(--nav-h)+3rem)] text-center">
        <p className="flex items-center gap-4">
          <span className="h-px w-8 bg-white/35 sm:w-12" />
          <span className="studio-label !text-white/75">Vancoillie Studio — Roeselare</span>
          <span className="h-px w-8 bg-white/35 sm:w-12" />
        </p>
        <h1 className="mt-8 max-w-[15ch] text-[clamp(2.55rem,5.7vw,5.2rem)] font-medium leading-[1.02] tracking-[-.04em] text-white">
          Jouw idee. <span className="italic text-[#74a5ff]">Onze code.</span>
        </h1>
        <p className="mt-7 max-w-[56ch] text-[1.0625rem] leading-[1.62] text-white/80 sm:text-[1.125rem]">
          Websites op maat voor jouw zaak en eigen apps die het dagelijkse leven eenvoudiger maken — helder ontworpen, zorgvuldig gebouwd.
        </p>
        <div className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <Link href="/contact" className="studio-btn studio-btn-primary w-full sm:w-auto">Start een project <ArrowRight className="h-4 w-4" /></Link>
          <Link href="/apps" className="studio-btn w-full border-white/40 text-white hover:border-white sm:w-auto">Bekijk onze producten</Link>
        </div>
        <div className="mt-9 flex items-center gap-2.5 text-[.875rem] text-white/80">
          <span className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-[#e0a32e] text-[#e0a32e]" />)}</span>
          <span><strong className="font-medium text-white">4,9/5</strong> van onze klanten</span>
        </div>
      </div>
      <div className="studio-wrap relative z-10 hidden pb-10 sm:block">
        <ul className="flex flex-wrap items-center justify-center border-t border-white/25 pt-5 text-[.875rem] text-white/75">
          {VALUES.map((value, i) => <li key={value} className="flex items-center"><span className="px-5">{value}</span>{i < VALUES.length - 1 && <span className="h-3 w-px bg-white/25" />}</li>)}
        </ul>
      </div>
    </section>
  );
}
