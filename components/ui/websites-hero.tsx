"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Check, MapPin } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";

export function WebsitesHero() {
  return (
    <section className="relative w-full overflow-hidden flex items-center min-h-screen py-20" style={{ backgroundImage: "url('/afbeeldingen/defaultBackground.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
      {/* Background outlined text 'WEBSITES' */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <span className="text-[16vw] font-black text-white/[0.03] tracking-[0.2em] uppercase leading-none">
          WEBSITES
        </span>
      </div>

      <Navbar variant="overlay" />
      {/* Ambient glowing effect */}
      <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none" />

      {/* Content grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* LEFT — text */}
          <div className="flex flex-col gap-6 text-left relative z-10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">
              Professionele websites
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold leading-[1.1] text-white tracking-tight">
              Websites die{" "}
              <span className="block italic font-bold bg-gradient-to-r from-[#bfa6ff] to-[#e4d5ff] bg-clip-text text-transparent my-1 py-1">
                jouw zaak
              </span>
              vooruithelpen.
            </h1>

            <p className="text-base md:text-lg text-white/80 max-w-md">
              Snel, modern en gemaakt om resultaat te boeken.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2.5 my-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md">
                <Star className="h-3.5 w-3.5 fill-white/80 text-white/80" />
                +25 projecten
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md">
                <Check className="h-3.5 w-3.5 text-white/80" />
                100% maatwerk
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md">
                <MapPin className="h-3.5 w-3.5 text-white/80" />
                Gebouwd in België
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 self-start rounded-2xl bg-white px-7 py-4 text-sm font-bold text-neutral-900 hover:bg-white/95 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/10 hover:shadow-xl transition-all"
            >
              Ontdek wat we voor jou kunnen doen
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </Link>
          </div>

          {/* RIGHT — 3D Apple Pro Display XDR mockup */}
          <div className="relative flex flex-col items-center justify-center w-full max-w-[620px] mx-auto lg:mx-0 lg:ml-auto select-none [perspective:1500px] animate-appear [animation-delay:200ms] py-6">
            
            {/* 3D Transform Wrapper */}
            <div className="w-full flex flex-col items-center [transform:rotateY(-18deg)_rotateX(6deg)_rotateZ(-2deg)] [transform-style:preserve-3d] transition-transform duration-500 hover:[transform:rotateY(-12deg)_rotateX(4deg)_rotateZ(-1deg)]">
              
              {/* XDR Display Bezel */}
              <div className="relative w-full aspect-[16/9] bg-[#090909] rounded-[8px] p-[5px] sm:p-[7px] shadow-[-20px_35px_70px_-10px_rgba(0,0,0,0.65)] border border-[#1f1f1f] ring-1 ring-white/5">
                {/* Inner bezel framing shadow */}
                <div className="absolute inset-[4px] sm:inset-[6px] border border-black/60 rounded-[3px] pointer-events-none z-20" />
                
                {/* Screen Container */}
                <div className="relative w-full h-full overflow-hidden rounded-[3px] bg-[#fafafa] border border-black/90 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
                  <Image
                    src="/afbeeldingen/websiteExamples/ItHulp.png"
                    alt="Vancoillie IT Hulp"
                    fill
                    priority
                    className="object-contain object-center z-0"
                  />
                  {/* Glass glossy shine/reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none z-10" />
                </div>
              </div>
              
              {/* Apple Pro Stand */}
              <div className="relative flex flex-col items-center w-full z-0 -mt-[1px]">
                {/* Stand Stem (Realistic Pro Stand) */}
                <div className="w-[52px] h-[125px] sm:h-[135px] bg-gradient-to-r from-[#cfcfcf] via-[#f5f5f7] to-[#bcbcbc] relative shadow-md border-x border-[#afafaf] flex justify-center">
                  {/* Highlights */}
                  <div className="absolute inset-y-0 left-1/4 w-[5px] bg-white/40 blur-[0.5px]" />
                  <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-black/20 to-transparent" />
                  
                  {/* Circular opening/cutout with metallic depth */}
                  <div className="absolute bottom-[28px] w-[26px] h-[26px] rounded-full bg-gradient-to-b from-[#949494] via-[#e0e0e0] to-[#696969] p-[1.5px] shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_2px_5px_rgba(0,0,0,0.4)]">
                    <div className="w-full h-full rounded-full bg-gradient-to-b from-[#0a48cc] to-[#052985]" />
                  </div>
                </div>
                
                {/* Pro Stand Base */}
                <div className="w-[160px] h-[5px] bg-gradient-to-b from-[#e8e8e8] via-[#d1d1d1] to-[#9c9c9c] rounded-t-[1px] rounded-b-[4px] shadow-[-15px_15px_30px_rgba(0,0,0,0.45)] border-t border-white/40 border-b border-[#7a7a7a]/50" />
                {/* Base contact shadow */}
                <div className="absolute bottom-[-4px] w-[180px] h-[5px] bg-black/30 blur-[3px] rounded-full pointer-events-none" />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
