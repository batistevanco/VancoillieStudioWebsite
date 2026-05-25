"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { AuroraHero } from "@/components/ui/hero-2";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { getCopy } from "@/lib/i18n";
import { getLocalizedPath, type Locale } from "@/lib/routes";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function LandingHero({ locale }: { locale: Locale }) {
  const c = getCopy(locale).landing;
  const [activeTab, setActiveTab] = useState<"websites" | "apps" | "software">("websites");

  const landingHref = getLocalizedPath(locale, "landing");
  const primaryHref = "#about";
  const secondaryHref = getLocalizedPath(locale, "websites");
  const nlLanding = getLocalizedPath("nl", "landing");
  const enLanding = getLocalizedPath("en", "landing");

  // Tab translations/labels
  const tabLabels = {
    websites: locale === "nl" ? "Websites" : "Websites",
    apps: locale === "nl" ? "Apps" : "Apps",
    software: locale === "nl" ? "Software" : "Software",
  };

  return (
    <AuroraHero theme={activeTab}>
      <div className="relative flex min-h-[100svh] w-full flex-col overflow-hidden">
        {/* Fine architectural horizontal & vertical lines for grounding */}
        <div className="pointer-events-none absolute inset-x-0 top-[88px] h-px bg-zinc-200/30" />
        <div className="pointer-events-none absolute left-[12%] top-0 bottom-0 w-px bg-zinc-200/10 hidden xl:block" />
        <div className="pointer-events-none absolute right-[12%] top-0 bottom-0 w-px bg-zinc-200/10 hidden xl:block" />

        {/* Soft magical light ambient warmth */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(99,102,241,0.05),transparent_80%)]" />

        {/* Top bar */}
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative z-10 flex items-center justify-between px-6 py-6 md:px-10 md:py-8"
        >
          <a href={landingHref} className="flex items-center gap-2.5">
            <img
              src="/afbeeldingen/logo.png"
              alt="Vancoillie Studio"
              className="h-7 w-7 rounded-md object-contain"
            />
            <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-900">
              Vancoillie Studio
            </span>
          </a>

          <div className="flex items-center gap-0.5 rounded-full border border-zinc-200/80 bg-white/40 p-0.5 backdrop-blur-md shadow-sm dark:border-zinc-200/80 dark:bg-white/40">
            <a
              href={nlLanding}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200",
                locale === "nl"
                  ? "bg-white text-zinc-900 shadow-sm border border-zinc-200/20 dark:bg-white dark:text-zinc-900"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-900",
              )}
            >
              NL
            </a>
            <a
              href={enLanding}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200",
                locale === "en"
                  ? "bg-white text-zinc-900 shadow-sm border border-zinc-200/20 dark:bg-white dark:text-zinc-900"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-900",
              )}
            >
              EN
            </a>
          </div>
        </motion.header>

        {/* Center stage */}
        <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12">
          <div className="flex w-full max-w-4xl flex-col items-center text-center">
            {/* Premium Eyebrow Glass Pill with Shimmering 4-Point Gold Star */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200/60 bg-white/70 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-zinc-600 shadow-sm backdrop-blur-sm dark:border-zinc-200/60 dark:bg-white/70 dark:text-zinc-600">
                <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                  <svg className="h-3 w-3 animate-pulse text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.6L12 0Z"/>
                  </svg>
                </span>
                {c.eyebrow}
              </span>
            </motion.div>

            {/* Premium Dark Metallic Gradient Heading + Blue/Violet Glowing Highlight */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
              className="mt-6 bg-gradient-to-b from-zinc-950 via-zinc-800 to-zinc-700 bg-clip-text text-4xl font-extrabold leading-[1.12] tracking-tight text-transparent [text-wrap:balance] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {c.headline.lead}{" "}
              <span className="relative inline-block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent font-extrabold drop-shadow-[0_2px_12px_rgba(79,70,229,0.12)]">
                {c.headline.highlight}
              </span>{" "}
              {c.headline.trail}
            </motion.h1>

            {/* Spacious, Highly Readable Charcoal Description */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42, ease: EASE }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 [text-wrap:balance] md:text-lg lg:text-xl font-normal dark:text-zinc-600"
            >
              {c.description}
            </motion.p>

            {/* Main Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <MagneticButton 
                href={primaryHref} 
                variant="primary"
                className="dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 shadow-md shadow-zinc-950/5"
              >
                {c.primaryCta}
              </MagneticButton>
              <MagneticButton 
                href={secondaryHref} 
                variant="secondary"
                className="dark:border-zinc-200 dark:bg-white/50 dark:text-zinc-900 dark:hover:bg-white shadow-sm"
              >
                {c.secondaryCta}
              </MagneticButton>
            </motion.div>
          </div>

          {/* Majestic Interactive Studio Showcase Panel (The deliberate high-end design centerpiece) */}
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
            className="relative mt-14 w-full max-w-4xl rounded-2xl border border-zinc-200/50 bg-white/20 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.05)] backdrop-blur-md pointer-events-auto dark:border-zinc-200/50 dark:bg-white/20"
          >
            {/* Architectural Grid Details and fine outlines */}
            <div className="absolute -left-3 -top-3 h-6 w-6 border-l-2 border-t-2 border-zinc-300/60 pointer-events-none rounded-tl" />
            <div className="absolute -right-3 -top-3 h-6 w-6 border-r-2 border-t-2 border-zinc-300/60 pointer-events-none rounded-tr" />
            <div className="absolute -left-3 -bottom-3 h-6 w-6 border-l-2 border-b-2 border-zinc-300/60 pointer-events-none rounded-bl" />
            <div className="absolute -right-3 -bottom-3 h-6 w-6 border-r-2 border-b-2 border-zinc-300/60 pointer-events-none rounded-br" />

            {/* Showcase Header: Browser frame bar with high-end shared selector */}
            <div className="flex items-center justify-between border-b border-zinc-200/30 bg-zinc-50/20 px-4 py-3 rounded-t-xl">
              {/* Traffic lights controls */}
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-300/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-300/50" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-300/30" />
              </div>

              {/* Shared Layout Segment Selector tabs */}
              <div className="flex items-center gap-0.5 rounded-full bg-zinc-200/40 p-0.5 border border-zinc-200/30">
                {(["websites", "apps", "software"] as const).map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        "relative rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-300",
                        isActive ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-800"
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeShowcaseTab"
                          transition={{ type: "spring", stiffness: 350, damping: 28 }}
                          className="absolute inset-0 rounded-full bg-white shadow-sm border border-zinc-200/10"
                        />
                      )}
                      <span className="relative z-10">{tabLabels[tab]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mock address bar */}
              <div className="hidden sm:block text-[10px] font-semibold text-zinc-400 bg-white/40 border border-zinc-200/30 px-3 py-1 rounded-md tracking-tight">
                vancoilliestudio.be/{locale === "nl" ? "" : "en/"}{activeTab}
              </div>
            </div>

            {/* Showcase Canvas Screen Viewport */}
            <div className="relative h-[280px] sm:h-[350px] md:h-[400px] w-full bg-gradient-to-b from-zinc-50/10 to-zinc-100/10 rounded-b-xl overflow-hidden flex items-center justify-center p-6 border-t border-zinc-200/20">
              <AnimatePresence mode="wait">
                {activeTab === "websites" && (
                  <motion.div
                    key="websites-preview"
                    initial={{ opacity: 0, scale: 0.97, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: -10 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="w-full h-full flex flex-col md:flex-row gap-6 items-center"
                  >
                    {/* Left: Minimalist editorial typography */}
                    <div className="flex-1 text-left space-y-4 max-w-sm">
                      <div className="h-5 w-20 rounded bg-amber-500/10 text-[9px] font-bold text-amber-600 flex items-center justify-center tracking-wider uppercase">
                        Premium Web
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-800 leading-tight">
                        Doordachte websites die resultaat opleveren.
                      </h3>
                      <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                        Geen templates, maar volledig op maat gemaakte ontwerpen die razendsnel laden en conversies verhogen.
                      </p>
                      <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-400">
                        <span className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> SEO geoptimaliseerd
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> React / Next.js
                        </span>
                      </div>
                    </div>

                    {/* Right: Bespoke Architectural Wireframe Drawing */}
                    <div className="flex-1 w-full h-full flex items-center justify-center relative bg-white/40 rounded-xl border border-zinc-200/30 p-4 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.03)]">
                      <svg className="w-full h-full max-h-[260px] text-zinc-300" viewBox="0 0 320 220" fill="none">
                        {/* Grid borders */}
                        <line x1="10" y1="10" x2="310" y2="10" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
                        <line x1="10" y1="210" x2="310" y2="210" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
                        <line x1="10" y1="10" x2="10" y2="210" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
                        <line x1="310" y1="10" x2="310" y2="210" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
                        
                        {/* Horizontal divider */}
                        <line x1="10" y1="50" x2="310" y2="50" stroke="currentColor" strokeWidth="0.8" />
                        
                        {/* Interactive UI card outlines */}
                        <rect x="25" y="70" width="80" height="110" rx="6" stroke="currentColor" strokeWidth="0.8" className="animate-pulse" style={{ animationDuration: "3s" }} />
                        <rect x="120" y="70" width="175" height="48" rx="6" stroke="currentColor" strokeWidth="0.8" />
                        <rect x="120" y="130" width="175" height="50" rx="6" stroke="currentColor" strokeWidth="0.8" />
                        
                        {/* Typographic simulator lines */}
                        <line x1="35" y1="85" x2="70" y2="85" stroke="currentColor" strokeWidth="1.2" />
                        <line x1="35" y1="95" x2="85" y2="95" stroke="currentColor" strokeWidth="0.6" />
                        <line x1="35" y1="102" x2="78" y2="102" stroke="currentColor" strokeWidth="0.6" />
                        <circle cx="85" cy="150" r="10" stroke="currentColor" strokeWidth="0.8" />
                        
                        {/* Speed stats box */}
                        <rect x="135" y="82" width="28" height="24" rx="4" fill="rgba(217,119,6,0.06)" stroke="rgba(217,119,6,0.18)" strokeWidth="0.8" />
                        <circle cx="149" cy="94" r="5" stroke="rgb(217,119,6)" strokeWidth="1" className="animate-pulse" />
                        <line x1="175" y1="88" x2="230" y2="88" stroke="currentColor" strokeWidth="1" />
                        <line x1="175" y1="96" x2="210" y2="96" stroke="currentColor" strokeWidth="0.6" />

                        {/* Interactive connecting lines */}
                        <path d="M105 125 L120 125" stroke="rgb(217, 119, 6)" strokeWidth="0.8" strokeDasharray="2 2" />
                      </svg>
                    </div>
                  </motion.div>
                )}

                {activeTab === "apps" && (
                  <motion.div
                    key="apps-preview"
                    initial={{ opacity: 0, scale: 0.97, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: -10 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="w-full h-full flex flex-col md:flex-row gap-6 items-center"
                  >
                    {/* Left: Phone Device Silhouette */}
                    <div className="flex-1 w-full h-full flex items-center justify-center relative">
                      <div className="w-[155px] h-[260px] md:h-[300px] rounded-[28px] border-4 border-zinc-800/90 bg-zinc-950 p-2 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                        {/* Speaker dynamic notch */}
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 h-3.5 w-14 rounded-full bg-zinc-800/90 flex items-center justify-center z-20">
                          <span className="h-1 w-1 rounded-full bg-zinc-600/90 mr-1.5" />
                          <span className="h-0.5 w-6 rounded-full bg-zinc-700" />
                        </div>
                        
                        {/* iPhone Canvas content */}
                        <div className="w-full flex-1 bg-gradient-to-tr from-zinc-900 to-zinc-950 rounded-[22px] p-2 pt-5 flex flex-col justify-between overflow-hidden">
                          {/* Inner Screen Header */}
                          <div className="flex items-center justify-between text-[7px] text-zinc-500 font-bold px-1 mt-1">
                            <span>Vancoillie App</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                          </div>

                          {/* Progress Circle Visualizer */}
                          <div className="flex-1 flex flex-col items-center justify-center py-2 space-y-2">
                            <div className="relative h-20 w-20 flex items-center justify-center">
                              <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="15.91" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
                                <motion.circle 
                                  cx="18" 
                                  cy="18" 
                                  r="15.91" 
                                  fill="none" 
                                  stroke="rgb(14, 165, 233)" 
                                  strokeWidth="2.5" 
                                  strokeDasharray="100"
                                  initial={{ strokeDashoffset: 100 }}
                                  animate={{ strokeDashoffset: 32 }}
                                  transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
                                />
                              </svg>
                              <div className="text-center">
                                <span className="text-[10px] font-black text-white">68%</span>
                                <p className="text-[5px] text-zinc-400 uppercase tracking-widest font-semibold">Active</p>
                              </div>
                            </div>
                            
                            {/* Floating data rows */}
                            <div className="w-full space-y-1 px-1">
                              <div className="flex items-center justify-between rounded bg-white/5 p-1 text-[6px] font-semibold text-zinc-300">
                                <span>UX Interaction</span>
                                <span className="text-sky-400">99.9%</span>
                              </div>
                              <div className="flex items-center justify-between rounded bg-white/5 p-1 text-[6px] font-semibold text-zinc-300">
                                <span>Build Speed</span>
                                <span className="text-emerald-400">Perfect</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Inner Screen Footer menu */}
                          <div className="h-5 w-full border-t border-white/5 flex items-center justify-around">
                            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                            <span className="h-1 w-3 rounded-full bg-white/10" />
                            <span className="h-1 w-3 rounded-full bg-white/10" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Apps value description */}
                    <div className="flex-1 text-left space-y-4 max-w-sm">
                      <div className="h-5 w-20 rounded bg-sky-500/10 text-[9px] font-bold text-sky-600 flex items-center justify-center tracking-wider uppercase">
                        iOS / Mobile
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-800 leading-tight">
                        Razendsnelle native iOS applicaties.
                      </h3>
                      <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                        We ontwerpen en ontwikkelen native iPhone apps met adembenemende micro-animaties en vlekkeloze interfaces.
                      </p>
                      <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-400">
                        <span className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" /> Swift & UIKit
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Native Performance
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "software" && (
                  <motion.div
                    key="software-preview"
                    initial={{ opacity: 0, scale: 0.97, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: -10 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="w-full h-full flex flex-col md:flex-row gap-6 items-center"
                  >
                    {/* Left: Software details */}
                    <div className="flex-1 text-left space-y-4 max-w-sm">
                      <div className="h-5 w-20 rounded bg-violet-500/10 text-[9px] font-bold text-violet-600 flex items-center justify-center tracking-wider uppercase">
                        SaaS / Core
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-800 leading-tight">
                        Schaalbare software en cloud architecture.
                      </h3>
                      <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                        Robuuste backends en databasestructuren ontworpen voor miljoenen interacties, met de nadruk op uptime en databeveiliging.
                      </p>
                      <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-400">
                        <span className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-violet-500" /> Cloud Databases
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> End-to-End API
                        </span>
                      </div>
                    </div>

                    {/* Right: Cloud Node Network Database Visualizer */}
                    <div className="flex-1 w-full h-full flex items-center justify-center relative bg-white/40 rounded-xl border border-zinc-200/30 p-4 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.03)]">
                      <svg className="w-full h-full max-h-[260px] text-zinc-300" viewBox="0 0 320 220" fill="none">
                        {/* Server Rack Node Graphics */}
                        <rect x="20" y="30" width="110" height="46" rx="6" fill="rgba(124,58,237,0.02)" stroke="currentColor" strokeWidth="0.8" />
                        <rect x="20" y="90" width="110" height="46" rx="6" fill="rgba(124,58,237,0.02)" stroke="currentColor" strokeWidth="0.8" />
                        <rect x="20" y="150" width="110" height="46" rx="6" fill="rgba(124,58,237,0.02)" stroke="currentColor" strokeWidth="0.8" />
                        
                        {/* Active LEDs */}
                        <circle cx="35" cy="53" r="3" fill="rgb(124,58,237)" className="animate-pulse" />
                        <circle cx="35" cy="113" r="3" fill="rgb(244,63,94)" className="animate-pulse" style={{ animationDuration: "2s" }} />
                        <circle cx="35" cy="173" r="3" fill="rgb(124,58,237)" className="animate-pulse" style={{ animationDuration: "1.5s" }} />
                        
                        {/* Visual data lines in Server boxes */}
                        <line x1="50" y1="48" x2="95" y2="48" stroke="currentColor" strokeWidth="1.2" />
                        <line x1="50" y1="56" x2="105" y2="56" stroke="currentColor" strokeWidth="0.6" />
                        <line x1="50" y1="108" x2="90" y2="108" stroke="currentColor" strokeWidth="1.2" />
                        <line x1="50" y1="116" x2="100" y2="116" stroke="currentColor" strokeWidth="0.6" />
                        <line x1="50" y1="168" x2="105" y2="168" stroke="currentColor" strokeWidth="1.2" />
                        <line x1="50" y1="176" x2="85" y2="176" stroke="currentColor" strokeWidth="0.6" />

                        {/* Central Hub Database */}
                        <rect x="190" y="75" width="110" height="75" rx="8" stroke="currentColor" strokeWidth="0.8" />
                        <circle cx="245" cy="112" r="16" stroke="rgb(124, 58, 237)" strokeWidth="0.8" strokeDasharray="3 3" className="animate-spin" style={{ animationDuration: "8s" }} />
                        <circle cx="245" cy="112" r="8" fill="rgba(124, 58, 237, 0.15)" stroke="rgb(124, 58, 237)" strokeWidth="1" />

                        {/* Animated Signal Connections */}
                        <path d="M130 53 Q160 53 190 90" stroke="currentColor" strokeWidth="0.6" strokeDasharray="4 4" />
                        <path d="M130 113 Q160 113 190 113" stroke="rgb(124, 58, 237)" strokeWidth="0.8" strokeDasharray="3 3" />
                        <path d="M130 173 Q160 173 190 135" stroke="currentColor" strokeWidth="0.6" strokeDasharray="4 4" />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </main>

        {/* Bottom bar */}
        <motion.footer
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.68, ease: EASE }}
          className="relative z-10 flex items-center justify-center gap-4 px-6 py-6 sm:justify-between md:px-10 md:py-8 mt-6"
        >
          <nav className="flex items-center gap-3">
            {c.disciplines.map((d, i) => (
              <span key={d.label} className="flex items-center gap-3">
                <a
                  href={d.href}
                  className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-900"
                >
                  {d.label}
                </a>
                {i < c.disciplines.length - 1 && (
                  <span className="h-3 w-px bg-zinc-200/60 dark:bg-zinc-200/60" />
                )}
              </span>
            ))}
          </nav>

          <div className="hidden items-center gap-2 text-sm text-zinc-500 sm:flex dark:text-zinc-500">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="2.25" fill="rgb(124 58 237)" className="animate-pulse" />
              <circle
                cx="6"
                cy="6"
                r="5"
                stroke="rgb(124 58 237)"
                strokeOpacity="0.4"
              />
            </svg>
            <span>{c.location}</span>
          </div>
        </motion.footer>
      </div>
    </AuroraHero>
  );
}
