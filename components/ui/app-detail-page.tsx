"use client";

import Image from "next/image";
import {
  ArrowLeft,
  Command,
  LayoutPanelTop,
  Plus,
  Sparkles,
  Target,
} from "lucide-react";
import { FaApple } from "react-icons/fa";
import { Globe } from "lucide-react";
import { motion } from "framer-motion";

import { getCopy } from "@/lib/i18n";
import { getLocalizedPath, type Locale, type RouteKey } from "@/lib/routes";
import { Badge } from "@/components/ui/badge";
import { BentoGridShowcase } from "@/components/ui/bento-product-features";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navbar } from "@/components/ui/navbar";
import { Switch } from "@/components/ui/switch";

const uiCopy = {
  nl: {
    back: "Terug naar apps",
    appStore: "Download in de App Store",
    webVersion: "Open webversie",
    screenshotsTitle: "Schermafbeeldingen",
    featureLabel: "Features",
    featureTitle: (name: string) => `Alles wat ${name} doet`,
    featureDesc: (name: string) =>
      `Een overzicht van de kernfuncties en mogelijkheden van ${name}.`,
    ctaDownload: "Download in de App Store",
    alwaysOn: "Altijd aan",
    availableOn: "App Store",
    usageStat: "Dagelijks gebruik",
  },
  en: {
    back: "Back to apps",
    appStore: "Download on the App Store",
    webVersion: "Open web version",
    screenshotsTitle: "Screenshots",
    featureLabel: "Features",
    featureTitle: (name: string) => `Everything ${name} does`,
    featureDesc: (name: string) =>
      `An overview of the core features and capabilities of ${name}.`,
    ctaDownload: "Download on the App Store",
    alwaysOn: "Always on",
    availableOn: "App Store",
    usageStat: "Daily usage",
  },
} as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 12 },
  },
};

const MASCOTTE_APPS: Record<string, string> = {
  brainox: "/afbeeldingen/brainox/mascotte.png",
};

export function AppDetailPage({
  locale = "nl",
  slug,
}: {
  locale?: Locale;
  slug: string;
}) {
  const appContent = getCopy(locale).appsPage;
  const app = appContent.apps.find((a) => a.slug === slug);
  const t = uiCopy[locale];
  const mascotte = MASCOTTE_APPS[slug] ?? null;

  if (!app) return null;

  const appStoreUrl = (app as { appStoreUrl?: string }).appStoreUrl ?? null;
  const webUrl = (app as { webUrl?: string }).webUrl ?? null;
  const availabilityLabel =
    (app as { availabilityLabel?: string }).availabilityLabel ??
    (locale === "en" ? "Available on iPhone" : "Beschikbaar op iPhone");

  const integration = (
    <Card className="flex h-full flex-col rounded-[24px] border-border/70 bg-white">
      <CardHeader className="p-5 pb-3 md:p-6 md:pb-3">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
          <Sparkles className="h-5 w-5" />
        </div>
        <CardTitle>{app.spec.integrationTitle}</CardTitle>
        <CardDescription>{app.spec.integrationDescription}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex items-center justify-between p-5 pt-0 md:p-6 md:pt-0">
        <Button variant="outline" size="sm" asChild>
          <a href={appStoreUrl ?? "#"} target={appStoreUrl ? "_blank" : undefined} rel={appStoreUrl ? "noreferrer" : undefined}>
            <LayoutPanelTop className="mr-2 h-4 w-4" />
            {t.availableOn}
          </a>
        </Button>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-muted-foreground">{t.alwaysOn}</span>
          <Switch checked aria-label={t.alwaysOn} />
        </div>
      </CardFooter>
    </Card>
  );

  const trackers = (
    <Card className="h-full rounded-[24px] border-border/70 bg-white">
      <CardContent className="flex h-full flex-col justify-between p-5 md:p-6">
        <div>
          <CardTitle className="text-base font-medium">{app.spec.trackersTitle}</CardTitle>
          <CardDescription>{app.spec.trackersDescription}</CardDescription>
        </div>
        <div className="flex -space-x-3 overflow-hidden">
          {app.screenshots.slice(0, 3).map((src) => (
            <div key={src} className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-background">
              <Image src={src} alt={app.name} fill className="object-cover" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const statistic = (
    <Card className="relative h-full overflow-hidden rounded-[24px] border-border/70 bg-white">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      <CardContent className="relative z-10 flex h-full flex-col items-center justify-center p-5 text-center md:p-6">
        <CardDescription className="mb-3">{t.usageStat}</CardDescription>
        <span className="text-5xl font-bold tracking-tight text-foreground/90 md:text-6xl">
          {app.spec.statisticValue}
        </span>
      </CardContent>
    </Card>
  );

  const focus = (
    <Card className="h-full rounded-[24px] border-border/70 bg-white">
      <CardContent className="flex h-full flex-col justify-between p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-base font-medium">{app.spec.focusTitle}</CardTitle>
            <CardDescription>{app.spec.focusDescription}</CardDescription>
          </div>
          <Badge variant="outline" className="border-brand/30 text-brand">
            {app.spec.focusBadge}
          </Badge>
        </div>
        <div>
          <span className="text-4xl font-bold md:text-5xl">{app.spec.focusValue}</span>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{app.spec.focusLeft}</span>
          <span>{app.spec.focusRight}</span>
        </div>
      </CardContent>
    </Card>
  );

  const productivity = (
    <Card className="h-full rounded-[24px] border-border/70 bg-white">
      <CardContent className="flex h-full flex-col justify-end p-5 md:p-6">
        <CardTitle className="text-base font-medium">{app.spec.productivityTitle}</CardTitle>
        <CardDescription>{app.spec.productivityDescription}</CardDescription>
      </CardContent>
    </Card>
  );

  const shortcuts = (
    <Card className="h-full rounded-[24px] border-border/70 bg-white">
      <CardContent className="flex h-full flex-wrap items-center justify-between gap-4 p-5 md:p-6">
        <div>
          <CardTitle className="text-base font-medium">{app.spec.shortcutsTitle}</CardTitle>
          <CardDescription>{app.spec.shortcutsDescription}</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-8 min-w-8 items-center justify-center rounded-md border bg-background px-2 font-mono text-xs font-medium text-muted-foreground">
            <Command className="h-3.5 w-3.5" />
          </div>
          <Plus className="h-3.5 w-3.5 text-muted-foreground" />
          <div className="flex h-8 min-w-8 items-center justify-center rounded-md border bg-background px-2 font-mono text-xs font-medium text-muted-foreground">
            {app.spec.shortcutsKeys[0]}
          </div>
          <Plus className="h-3.5 w-3.5 text-muted-foreground" />
          <div className="flex h-8 min-w-8 items-center justify-center rounded-md border bg-background px-2 font-mono text-xs font-medium text-muted-foreground">
            {app.spec.shortcutsKeys[1]}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <div className="absolute inset-x-0 top-0 z-20">
        <Navbar variant="overlay" theme="light" />
      </div>
      <main className="pb-20 pt-0">

        {/* Hero */}
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#3b8eff] via-[#75b4ff] to-[#aad0ff] pt-28 md:pt-36">
          {/* Ambient soft highlight */}
          <div className="absolute top-0 left-0 w-full h-full bg-white/10 pointer-events-none opacity-50" />
          
          <div className="relative z-10 mx-auto max-w-[1440px] px-6 pb-12 md:px-8 md:pb-18">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="mb-8 -ml-1 text-blue-900 hover:text-blue-950 hover:bg-white/20 rounded-full transition-all"
            >
              <a href={getLocalizedPath(locale, "apps")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t.back}
              </a>
            </Button>

            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Left: info */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-6"
              >
                <motion.div variants={itemVariants} className="flex items-center gap-4">
                  {mascotte ? (
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[18px] border border-white/20 bg-white p-1 shadow-md shadow-blue-500/10">
                      <Image
                        src={mascotte}
                        alt={`${app.name} logo`}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  ) : null}
                  <Badge variant="outline" className="border-neutral-100 bg-white text-blue-900 shadow-sm font-semibold">
                    {availabilityLabel}
                  </Badge>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h1 className="text-5xl font-extrabold tracking-tight text-neutral-950 md:text-6xl">
                    {app.name}
                  </h1>
                  <p className="mt-3 text-2xl font-bold text-blue-950 md:text-3xl">
                    {app.tagline}
                  </p>
                  <p className="mt-4 max-w-xl text-base font-medium leading-7 text-blue-950/80 md:text-[1.05rem]">
                    {app.description}
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                  {appStoreUrl ? (
                    <Button
                      asChild
                      size="lg"
                      className="h-16 min-w-[260px] rounded-full bg-neutral-950 px-6 text-lg text-white shadow-lg shadow-neutral-950/15 hover:bg-neutral-900 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      <a href={appStoreUrl} target="_blank" rel="noreferrer">
                        <FaApple className="mr-3 h-5 w-5" />
                        {t.appStore}
                      </a>
                    </Button>
                  ) : null}
                  {webUrl ? (
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="h-16 min-w-[260px] rounded-full bg-white px-6 text-lg text-neutral-950 border border-neutral-200/50 hover:bg-neutral-50 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      <a href={webUrl} target="_blank" rel="noreferrer">
                        <Globe className="mr-3 h-5 w-5" />
                        {t.webVersion}
                      </a>
                    </Button>
                  ) : null}
                </motion.div>
              </motion.div>

              {/* Right: mascotte (Brainox only) + iPhone mockup */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative flex items-end justify-center gap-6"
              >
                {mascotte ? (
                  <div className="relative hidden h-[340px] w-[260px] shrink-0 sm:block">
                    <Image
                      src={mascotte}
                      alt={`${app.name} mascotte`}
                      fill
                      className="object-contain object-bottom drop-shadow-xl"
                    />
                  </div>
                ) : null}
                
                {/* iPhone 17 Pro Max - Orange Titanium Outer Frame */}
                <div className="relative aspect-[9/19.5] w-full max-w-[260px] md:max-w-[290px] rounded-[52px] bg-gradient-to-b from-[#ffecd2] via-[#f97316] to-[#7c2d12] p-[3px] shadow-[0_30px_100px_rgba(0,0,0,0.35)] border border-white/20 select-none">
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
                      alt={`${app.name} scherm`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features bento */}
        <section className="w-full bg-[#dfe3e8] py-12 md:py-16">
          <div className="mx-auto max-w-[1440px] px-3 md:px-4">
            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-brand">
                {t.featureLabel}
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                {t.featureTitle(app.name)}
              </h2>
              <p className="mt-2 max-w-2xl text-base leading-7 text-muted-foreground md:text-[1.05rem]">
                {t.featureDesc(app.name)}
              </p>
            </div>
            <BentoGridShowcase
              integration={integration}
              trackers={trackers}
              statistic={statistic}
              focus={focus}
              productivity={productivity}
              shortcuts={shortcuts}
            />
          </div>
        </section>

        {/* Screenshots */}
        <section className="w-full bg-white py-12 md:py-16">
          <div className="mx-auto max-w-[1440px] px-3 md:px-4">
            <div className="mb-8 flex items-center gap-3">
              <Target className="h-5 w-5 text-brand" />
              <h2 className="text-2xl font-semibold tracking-tight">
                {t.screenshotsTitle}
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {app.screenshots.map((src) => (
                <a
                  key={src}
                  href={src}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative overflow-hidden rounded-[20px] border border-border/70 bg-slate-100 p-2 shadow-sm transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-[10/18] w-full overflow-hidden rounded-[16px] bg-white">
                    <Image
                      src={src}
                      alt={`${app.name} screenshot`}
                      fill
                      className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        {appStoreUrl ? (
          <section className="w-full bg-[linear-gradient(180deg,rgba(237,247,255,0.6),rgba(255,255,255,1))] py-16 md:py-20">
            <div className="mx-auto max-w-[1440px] px-3 text-center md:px-4">
              {mascotte ? (
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center overflow-hidden rounded-[22px] border border-brand/20 bg-white shadow-lg shadow-brand/10">
                  <Image
                    src={mascotte}
                    alt={app.name}
                    width={72}
                    height={72}
                    className="object-contain"
                  />
                </div>
              ) : null}
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                {app.name}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-base leading-7 text-muted-foreground">
                {app.tagline}
              </p>
              <div className="mt-8 flex justify-center">
                <Button
                  asChild
                  size="lg"
                  className="h-16 min-w-[260px] rounded-2xl bg-black px-6 text-lg text-white shadow-lg shadow-black/15 transition hover:bg-black/90"
                >
                  <a href={appStoreUrl} target="_blank" rel="noreferrer">
                    <FaApple className="mr-3 h-5 w-5" />
                    {t.ctaDownload}
                  </a>
                </Button>
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}
