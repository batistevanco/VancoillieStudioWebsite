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
import { Header } from "@/components/ui/header-2";
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
      <Header />
      <main className="pb-16 pt-12 md:pt-18">
        <div className="mx-auto max-w-[1440px] px-3 md:px-4">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-brand">
              {content.eyebrow}
            </p>
            <SparklesText
              text={content.title}
              sparklesCount={8}
              colors={{ first: "#2563EB", second: "#8B5CF6" }}
              className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-[3.8rem]"
            />
            <p className="mt-4 text-base leading-7 text-muted-foreground md:text-[1.05rem]">
              {content.description}
            </p>
          </div>
        </div>

        <section className="pb-6">
          <div className="mx-auto mb-8 max-w-3xl px-3 text-center md:px-4">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {content.parallax.title}
            </h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground md:text-[1.05rem]">
              {content.parallax.description}
            </p>
          </div>
          <ZoomParallax
            images={[
              { src: "/afbeeldingen/mijnithulp-iphone/ithulp1.png", alt: "Mijn IT Hulp screenshot" },
              { src: "/afbeeldingen/mijnithulp-iphone/ithulp2.png", alt: "Mijn IT Hulp screenshot" },
              { src: "/afbeeldingen/mijnithulp-iphone/ithulp3.png", alt: "Mijn IT Hulp screenshot" },
              { src: "/afbeeldingen/brainox/homescreen.png", alt: "Brainox screenshot" },
              { src: "/afbeeldingen/screenshots/news1.png", alt: "News screenshot" },
              { src: "/afbeeldingen/screenshots/abbo1.png", alt: "AbboBuddy screenshot" },
              { src: "/afbeeldingen/screenshots/Geldinzicht1.png", alt: "Geldinzicht screenshot" },
              { src: "/afbeeldingen/screenshots/taakflow1.png", alt: "TaakFlow screenshot" },
            ]}
          />
        </section>

        <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {apps.map((app, index) => {
            const isFeatured = index === 0;
            const reverse = index % 2 === 1;
            // Alternating fresh off-whites and whites
            const bgClass = index % 2 === 0 ? "bg-white dark:bg-[#0A0A0A]" : "bg-[#FAFAFA] dark:bg-[#0E0E0E]";
            
            const primaryHref =
              app.primaryHref ?? app.appStoreUrl ?? getLocalizedPath(locale, "contact");
            const primaryLabel =
              app.primaryLabel ??
              (app.appStoreUrl ? content.buttons.appStore : content.buttons.contact);
            const availabilityLabel = app.availabilityLabel ?? content.labels.availableOn;
            const isExternalPrimary = /^https?:\/\//.test(primaryHref);
            const mascotte = MASCOTTE_APPS[app.slug] ?? null;
            const detailHref = locale === "en" ? `/en/${app.slug}` : `/${app.slug}`;

            // Define ambient glow color based on app brand
            const glowColor = app.slug === "brainox" 
              ? "bg-purple-500/10 dark:bg-purple-500/20" 
              : "bg-blue-500/10 dark:bg-blue-500/20";

            return (
              <section
                key={app.slug}
                className={`w-full py-20 md:py-32 ${bgClass} transition-colors duration-300`}
              >
                <div className="mx-auto max-w-7xl px-6 md:px-8">
                  <div
                    className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                      reverse ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    {/* Floating Phone Mockup Column */}
                    <div className="relative flex items-center justify-center py-10">
                      {/* Ambient light glow behind the device (Google Gemini style) */}
                      <div className={`absolute h-72 w-72 rounded-full ${glowColor} blur-[80px] md:h-96 md:w-96`} />
                      
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
                        className="relative z-10 w-full max-w-[280px] sm:max-w-[310px]"
                      >
                        {/* Phone Screen Container - Clean & Simple */}
                        <div className="relative aspect-[9/18.5] w-full overflow-hidden rounded-[40px] border-[8px] border-zinc-900 bg-zinc-950 shadow-[0_30px_100px_rgba(0,0,0,0.12)] dark:border-zinc-800">
                          <Image
                            src={app.heroImage}
                            alt={app.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                            priority={isFeatured}
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* App Description Content Column */}
                    <div className="flex flex-col items-start text-left">
                      <div className="mb-4 inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50/50 px-4 py-1.5 text-xs font-semibold tracking-wider text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
                        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                        {availabilityLabel}
                      </div>

                      <div className="flex items-center gap-4 mb-3">
                        {mascotte ? (
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-1 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <Image
                              src={mascotte}
                              alt={`${app.name} mascotte`}
                              fill
                              className="object-contain"
                            />
                          </div>
                        ) : null}
                        <h2 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
                          {app.name}
                        </h2>
                      </div>

                      <h3 className="text-xl font-semibold tracking-tight text-brand md:text-2xl mb-4">
                        {app.tagline}
                      </h3>

                      <p className="max-w-xl text-base leading-relaxed text-zinc-500 dark:text-zinc-400 md:text-lg mb-8">
                        {app.description}
                      </p>

                      <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
                        <a
                          href={primaryHref}
                          target={isExternalPrimary ? "_blank" : undefined}
                          rel={isExternalPrimary ? "noreferrer" : undefined}
                          className="inline-flex h-14 items-center justify-center rounded-full bg-zinc-900 px-8 text-sm font-semibold text-white shadow-lg shadow-zinc-900/10 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                        >
                          {isExternalPrimary || app.appStoreUrl ? (
                            <FaApple className="mr-2.5 h-4 w-4 shrink-0" />
                          ) : (
                            <ArrowRight className="mr-2.5 h-4 w-4 shrink-0" />
                          )}
                          {primaryLabel}
                        </a>

                        <a
                          href={detailHref}
                          className="inline-flex h-14 items-center justify-center rounded-full border border-zinc-200 bg-white/50 px-8 text-sm font-semibold text-zinc-900 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md dark:border-zinc-800 dark:bg-black/50 dark:text-white dark:hover:bg-zinc-900"
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
