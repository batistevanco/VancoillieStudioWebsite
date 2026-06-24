"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";

export function WebsitesHero() {
  return (
    <section className="relative w-full flex flex-col items-center overflow-hidden bg-black pb-0">
      {/* Aurora background */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-black" />

        {/* Orange beam — left */}
        <div
          className="absolute bottom-0 left-[10%] w-[32%] h-[85%]"
          style={{
            background: "radial-gradient(ellipse at bottom, #f97316 0%, #ef4444 30%, transparent 70%)",
            filter: "blur(50px)",
            opacity: 0.5,
          }}
        />
        {/* Blue/cyan/purple beam — center */}
        <div
          className="absolute bottom-0 left-[40%] w-[38%] h-[90%]"
          style={{
            background: "radial-gradient(ellipse at bottom, #3b82f6 0%, #06b6d4 25%, #8b5cf6 55%, transparent 75%)",
            filter: "blur(55px)",
            opacity: 0.55,
          }}
        />
        {/* Green beam — right */}
        <div
          className="absolute bottom-0 right-[5%] w-[22%] h-[70%]"
          style={{
            background: "radial-gradient(ellipse at bottom, #22c55e 0%, #84cc16 40%, transparent 70%)",
            filter: "blur(45px)",
            opacity: 0.35,
          }}
        />
        {/* Top fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/55 to-transparent" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Navbar */}
      <div className="absolute inset-x-0 top-0 z-30">
        <Navbar variant="overlay" />
      </div>

      {/* Hero content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 pt-40 pb-10 w-full max-w-4xl mx-auto">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
          <span className="text-xs text-white/80 tracking-wide">
            Professionele websites op maat in België
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.08] tracking-tight text-white">
          Websites die{" "}
          <span className="italic bg-gradient-to-r from-[#bfa6ff] to-[#e4d5ff] bg-clip-text text-transparent">
            jouw zaak
          </span>
          <br />
          vooruithelpen.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-xl text-base sm:text-lg text-white/65 leading-relaxed">
          Snel, modern en gemaakt om resultaat te boeken — 100% maatwerk, gebouwd in België.
        </p>

        {/* CTA */}
        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-all duration-200 hover:bg-white/90 hover:scale-[1.02] cursor-pointer"
          >
            Ontdek wat we voor jou kunnen doen
            <ArrowRight className="h-4 w-4 stroke-[2.5]" />
          </Link>
        </div>

        {/* Trust badges */}
        <div className="mt-6 flex flex-wrap justify-center items-center gap-4 text-xs text-white/50">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
            +25 projecten
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            100% maatwerk
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
            Gebouwd in België
          </span>
        </div>
      </div>

      {/* UI mockup — bottom peaking */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 mt-4">
        <div
          className="rounded-t-2xl overflow-hidden border border-white/10 shadow-2xl"
          style={{ boxShadow: "0 0 80px rgba(59,130,246,0.15), 0 0 40px rgba(249,115,22,0.08)" }}
        >
          {/* Fake browser bar */}
          <div className="flex items-center gap-2 bg-[#111] px-4 py-2.5 border-b border-white/10">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
            </div>
            <div className="ml-3 flex-1 max-w-xs mx-auto bg-white/10 rounded-md px-3 py-1">
              <span className="text-[10px] text-white/40">vancoillie-ithulp.be</span>
            </div>
          </div>
          {/* Screenshot */}
          <div className="relative w-full aspect-[16/9]">
            <Image
              src="/afbeeldingen/websiteExamples/ItHulp.png"
              alt="Voorbeeld website Vancoillie IT Hulp"
              fill
              priority
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
