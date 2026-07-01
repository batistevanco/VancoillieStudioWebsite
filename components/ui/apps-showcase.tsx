"use client";

import Image from "next/image";
import * as React from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { FaApple } from "react-icons/fa";
import { motion } from "framer-motion";

import { getCopy } from "@/lib/i18n";
import { getLocalizedPath, type Locale } from "@/lib/routes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import { SparklesText } from "@/components/ui/sparkles-text";
import { ZoomParallax } from "@/components/ui/zoom-parallax";

type AppShowcaseItem = ReturnType<typeof getCopy>["appsPage"]["apps"][number] & {
  appStoreUrl?: string;
  primaryHref?: string;
  primaryLabel?: string;
  availabilityLabel?: string;
  webUrl?: string;
};

const MASCOTTE_APPS: Record<string, string> = {
  brainox: "/afbeeldingen/brainox/mascotte.png",
};

export function AppsShowcase({ locale = "nl" }: { locale?: Locale }) {
  const content = getCopy(locale).appsPage;
  const apps = content.apps as readonly AppShowcaseItem[];
  const sectionThemes = ["bg-white", "bg-[#dfe3e8]"];

  return (
    <>
      <div className="relative">
        <Navbar variant="overlay" />
        <div className="pb-8 pt-28 md:pt-32">
          <div className="mx-auto max-w-[1440px] px-3 md:px-4">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
                {content.eyebrow}
              </p>
              <SparklesText
                text={content.title}
                sparklesCount={8}
                colors={{ first: "#93c5fd", second: "#c4b5fd" }}
                className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-[3.8rem]"
              />
              <p className="mt-4 text-base leading-7 text-white/70 md:text-[1.05rem]">
                {content.description}
              </p>
            </div>
          </div>
        </div>

      </div>

      <main className="pb-16">

        <div className="w-full divide-y divide-white/10">
          {apps.map((app, index) => {
            const isFeatured = index === 0;
            const reverse = index % 2 === 1;
            
            const primaryHref =
              app.primaryHref ?? app.appStoreUrl ?? getLocalizedPath(locale, "contact");
            const primaryLabel =
              app.primaryLabel ??
              (app.appStoreUrl ? content.buttons.appStore : content.buttons.contact);
            const availabilityLabel = app.availabilityLabel ?? content.labels.availableOn;
            const isExternalPrimary = /^https?:\/\//.test(primaryHref);
            const mascotte = MASCOTTE_APPS[app.slug] ?? null;
            const detailHref = locale === "en" ? `/en/${app.slug}` : `/${app.slug}`;

            return (
              <section
                key={app.slug}
                className="relative w-full overflow-hidden py-20 md:py-32"
              >
                
                <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
                  <div
                    className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                      reverse ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    {/* Floating Phone Mockup Column */}
                    <div className="relative flex items-center justify-center py-4">
                      {/* Floating UI Overlays for AbboBuddy */}
                      {app.slug === "abbo" && (
                        <motion.div
                          animate={{ y: [-6, 6, -6] }}
                          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute bottom-16 -left-4 z-20 hidden md:flex flex-col items-start gap-1 rounded-2xl border border-white/20 bg-white/70 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.06)] backdrop-blur-md dark:border-white/10 dark:bg-black/70"
                        >
                          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Abonnementen</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-zinc-800 dark:text-white">Totaal p/m</span>
                            <span className="text-base font-extrabold text-brand">€ 87,55</span>
                          </div>
                        </motion.div>
                      )}

                      {/* Floating animation using framer-motion */}
                      <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="relative z-10 w-full max-w-[280px] sm:max-w-[305px] select-none"
                      >
                        {/* iPhone 17 Pro Max - Orange Titanium Outer Frame */}
                        <div className="relative w-full aspect-[9/19.5] rounded-[52px] bg-gradient-to-b from-[#ffecd2] via-[#f97316] to-[#7c2d12] p-[3px] shadow-[0_30px_100px_rgba(0,0,0,0.35)] border border-white/20">
                          {/* Screen Container & Ultra-Thin Bezel */}
                          <div className="relative w-full h-full overflow-hidden rounded-[49px] border-[5px] border-black bg-neutral-950">
                            
                            {/* Dynamic Island */}
                            <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[80px] h-[22px] rounded-full bg-black z-30 flex items-center justify-center pointer-events-none">
                              {/* Tiny Camera Lens Reflection */}
                              <div className="absolute right-[18px] w-2 h-2 rounded-full bg-[#050f26]/80 border border-[#0d2a4d]/30" />
                              <div className="absolute right-[21px] w-1 h-1 rounded-full bg-[#1c385c]" />
                            </div>

                            {/* Speaker grill at the very top bezel */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-neutral-800 rounded-b-sm z-30" />

                            <Image
                              src={app.heroImage}
                              alt={app.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover"
                              priority={isFeatured}
                            />
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* App Description Content Column */}
                    <div className="flex flex-col items-start text-left">
                      <div className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-white/90 backdrop-blur-sm">
                        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                        {availabilityLabel}
                      </div>

                      <div className="flex items-center gap-4 mb-3">
                        {mascotte ? (
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-white/20 bg-white p-1 shadow-sm">
                            <Image
                              src={mascotte}
                              alt={`${app.name} mascotte`}
                              fill
                              className="object-contain"
                            />
                          </div>
                        ) : null}
                        <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                          {app.name}
                        </h2>
                      </div>

                      <h3 className="text-xl font-bold tracking-tight text-white/80 md:text-2xl mb-4">
                        {app.tagline}
                      </h3>

                      <p className="max-w-xl text-base leading-relaxed text-white/65 md:text-lg mb-8 font-medium">
                        {app.description}
                      </p>

                      <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                        {/* App Store */}
                        <a
                          href={primaryHref}
                          target={isExternalPrimary ? "_blank" : undefined}
                          rel={isExternalPrimary ? "noreferrer" : undefined}
                          className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15 active:translate-y-0"
                        >
                          {isExternalPrimary || app.appStoreUrl ? (
                            <FaApple className="mr-2.5 h-4 w-4 shrink-0" />
                          ) : (
                            <ArrowRight className="mr-2.5 h-4 w-4 shrink-0" />
                          )}
                          {primaryLabel}
                        </a>

                        {/* Detail */}
                        <a
                          href={detailHref}
                          className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-neutral-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/90 active:translate-y-0"
                        >
                          <ExternalLink className="mr-2.5 h-4 w-4 shrink-0" />
                          {locale === "en" ? `Discover ${app.name}` : `Ontdek ${app.name}`}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
}
