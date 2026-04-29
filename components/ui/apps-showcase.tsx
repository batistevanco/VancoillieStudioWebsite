"use client";

import Image from "next/image";
import * as React from "react";
import {
  ArrowRight,
  Command,
  Globe,
  LayoutPanelTop,
  Plus,
  Sparkles,
  Target,
} from "lucide-react";
import { FaApple } from "react-icons/fa";

import { getCopy } from "@/lib/i18n";
import { getLocalizedPath, type Locale } from "@/lib/routes";
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
import { Header } from "@/components/ui/header-2";
import { SparklesText } from "@/components/ui/sparkles-text";
import { Switch } from "@/components/ui/switch";
import { ZoomParallax } from "@/components/ui/zoom-parallax";

type AppShowcaseItem = ReturnType<typeof getCopy>["appsPage"]["apps"][number] & {
  appStoreUrl?: string;
  primaryHref?: string;
  primaryLabel?: string;
  availabilityLabel?: string;
  webUrl?: string;
};

function AppSpecs({
  app,
  labels,
}: {
  app: AppShowcaseItem;
  labels: ReturnType<typeof getCopy>["appsPage"]["labels"];
}) {
  const secondaryHref = app.appStoreUrl ?? "#";
  const secondaryLabel = app.appStoreUrl
    ? labels.availableOn
    : labels.availableOn;
  const isExternalSecondary = /^https?:\/\//.test(secondaryHref);

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
          <a
            href={secondaryHref}
            target={isExternalSecondary ? "_blank" : undefined}
            rel={isExternalSecondary ? "noreferrer" : undefined}
          >
            <LayoutPanelTop className="mr-2 h-4 w-4" />
            {secondaryLabel}
          </a>
        </Button>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-muted-foreground">
            {labels.alwaysOn}
          </span>
          <Switch checked aria-label={labels.alwaysOn} />
        </div>
      </CardFooter>
    </Card>
  );

  const trackers = (
    <Card className="h-full rounded-[24px] border-border/70 bg-white">
      <CardContent className="flex h-full flex-col justify-between p-5 md:p-6">
        <div>
          <CardTitle className="text-base font-medium">
            {app.spec.trackersTitle}
          </CardTitle>
          <CardDescription>{app.spec.trackersDescription}</CardDescription>
        </div>
        <div className="flex -space-x-3 overflow-hidden">
          {app.screenshots.slice(0, 3).map((src) => (
            <div
              key={src}
              className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-background"
            >
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
          backgroundImage:
            "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      <CardContent className="relative z-10 flex h-full flex-col items-center justify-center p-5 text-center md:p-6">
        <CardDescription className="mb-3">{labels.usageStat}</CardDescription>
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
            <CardTitle className="text-base font-medium">
              {app.spec.focusTitle}
            </CardTitle>
            <CardDescription>{app.spec.focusDescription}</CardDescription>
          </div>
          <Badge variant="outline" className="border-brand/30 text-brand">
            {app.spec.focusBadge}
          </Badge>
        </div>
        <div>
          <span className="text-4xl font-bold md:text-5xl">
            {app.spec.focusValue}
          </span>
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
        <CardTitle className="text-base font-medium">
          {app.spec.productivityTitle}
        </CardTitle>
        <CardDescription>{app.spec.productivityDescription}</CardDescription>
      </CardContent>
    </Card>
  );

  const shortcuts = (
    <Card className="h-full rounded-[24px] border-border/70 bg-white">
      <CardContent className="flex h-full flex-wrap items-center justify-between gap-4 p-5 md:p-6">
        <div>
          <CardTitle className="text-base font-medium">
            {app.spec.shortcutsTitle}
          </CardTitle>
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
    <BentoGridShowcase
      integration={integration}
      trackers={trackers}
      statistic={statistic}
      focus={focus}
      productivity={productivity}
      shortcuts={shortcuts}
    />
  );
}

export function AppsShowcase({ locale = "nl" }: { locale?: Locale }) {
  const content = getCopy(locale).appsPage;
  const apps = content.apps as readonly AppShowcaseItem[];
  const [openScreenshots, setOpenScreenshots] = React.useState<string | null>(
    null,
  );
  const screenshotSections = React.useRef<Record<string, HTMLDivElement | null>>(
    {},
  );
  const sectionThemes = [
    "bg-white",
    "bg-[#dfe3e8]",
  ];

  React.useEffect(() => {
    if (!openScreenshots) {
      return;
    }

    const element = screenshotSections.current[openScreenshots];
    if (!element) {
      return;
    }

    requestAnimationFrame(() => {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [openScreenshots]);

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
              {
                src: "/afbeeldingen/mijnithulp-iphone/ithulp1.png",
                alt: "Mijn IT Hulp screenshot",
              },
              {
                src: "/afbeeldingen/mijnithulp-iphone/ithulp2.png",
                alt: "Mijn IT Hulp screenshot",
              },
              {
                src: "/afbeeldingen/mijnithulp-iphone/ithulp3.png",
                alt: "Mijn IT Hulp screenshot",
              },
              {
                src: "/afbeeldingen/brainox/homescreen.png",
                alt: "Brainox screenshot",
              },
              {
                src: "/afbeeldingen/screenshots/news1.png",
                alt: "News screenshot",
              },
              {
                src: "/afbeeldingen/screenshots/abbo1.png",
                alt: "AbboBuddy screenshot",
              },
              {
                src: "/afbeeldingen/screenshots/Geldinzicht1.png",
                alt: "Geldinzicht screenshot",
              },
              {
                src: "/afbeeldingen/screenshots/taakflow1.png",
                alt: "TaakFlow screenshot",
              },
            ]}
          />
        </section>

        <div className="space-y-0">
          {apps.map((app, index) => {
            const isFeatured = index === 0;
            const reverse = index % 2 === 1;
            const screenshotsVisible = openScreenshots === app.slug;
            const theme = sectionThemes[index % sectionThemes.length];
            const primaryHref =
              app.primaryHref ??
              app.appStoreUrl ??
              getLocalizedPath(locale, "contact");
            const primaryLabel =
              app.primaryLabel ??
              (app.appStoreUrl
                ? content.buttons.appStore
                : content.buttons.contact);
            const availabilityLabel =
              app.availabilityLabel ?? content.labels.availableOn;
            const isExternalPrimary = /^https?:\/\//.test(primaryHref);

            return (
              <section
                key={app.slug}
                className={`w-full ${theme} ${isFeatured ? "py-12 md:py-18" : "py-10 md:py-14"}`}
              >
                <div className="mx-auto max-w-[1440px] px-3 md:px-4">
                  <div
                    className={`rounded-[24px] border p-4 shadow-sm md:p-6 lg:p-7 ${
                      isFeatured
                        ? "border-brand/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(237,247,255,0.98))] shadow-[0_24px_80px_rgba(37,99,235,0.12)]"
                        : "border-border/70 bg-slate-50/95"
                    }`}
                  >
                    <div
                      className={`grid items-center gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(360px,480px)] lg:gap-6 ${
                        reverse ? "lg:[&>*:first-child]:order-2" : ""
                      }`}
                    >
                      <div
                        className={`relative overflow-hidden rounded-[20px] border p-3 ${
                          isFeatured
                            ? "border-brand/20 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.14),transparent_60%),linear-gradient(180deg,#eff6ff_0%,#e2e8f0_100%)] shadow-[0_18px_56px_rgba(37,99,235,0.16)]"
                            : "border-border/70 bg-slate-100 shadow-[0_16px_42px_rgba(15,23,42,0.07)]"
                        }`}
                      >
                        <div
                          className={`relative mx-auto aspect-[11/18] w-full overflow-hidden rounded-[20px] border bg-white md:max-w-[280px] lg:max-w-[310px] ${
                            isFeatured
                              ? "max-w-[280px] border-brand/20 shadow-[0_16px_42px_rgba(37,99,235,0.12)] md:max-w-[320px] lg:max-w-[350px]"
                              : "max-w-[250px] border-border/60"
                          }`}
                        >
                          <Image
                            src={app.heroImage}
                            alt={app.name}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-5">
                        <Badge
                          variant="outline"
                          className="w-fit border-brand/30 bg-brand/5 text-brand"
                        >
                          {availabilityLabel}
                        </Badge>
                        <div>
                          <h2 className="text-3xl font-bold tracking-tight md:text-[2rem]">
                            {app.name}
                          </h2>
                          <p className="mt-2 text-lg font-medium text-foreground/80 md:text-[1.35rem]">
                            {app.tagline}
                          </p>
                          <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground md:text-[1.05rem]">
                            {app.description}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                          <Button
                            asChild
                            size="lg"
                            className="h-16 min-w-[260px] rounded-2xl bg-black px-6 text-lg text-white shadow-lg shadow-black/15 transition hover:bg-black/90"
                          >
                            <a
                              href={primaryHref}
                              target={isExternalPrimary ? "_blank" : undefined}
                              rel={isExternalPrimary ? "noreferrer" : undefined}
                            >
                              {isExternalPrimary || app.appStoreUrl ? (
                                <FaApple className="mr-3 h-5 w-5" />
                              ) : (
                                <ArrowRight className="mr-3 h-5 w-5" />
                              )}
                              {primaryLabel}
                            </a>
                          </Button>
                          {app.webUrl ? (
                            <Button
                              asChild
                              size="lg"
                              variant="outline"
                              className="h-16 min-w-[260px] rounded-2xl text-lg"
                            >
                              <a
                                href={app.webUrl}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Globe className="mr-3 h-5 w-5" />
                                {content.buttons.webVersion}
                              </a>
                            </Button>
                          ) : null}
                          <Button
                            size="lg"
                            variant="outline"
                            className="h-16 min-w-[260px] rounded-2xl text-lg"
                            onClick={() =>
                              setOpenScreenshots((current) =>
                                current === app.slug ? null : app.slug,
                              )
                            }
                          >
                            {content.buttons.screenshots}
                            <ArrowRight
                              className={`ml-2 h-4 w-4 transition-transform ${
                                screenshotsVisible ? "rotate-90" : ""
                              }`}
                            />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-5">
                      <AppSpecs app={app} labels={content.labels} />

                      {screenshotsVisible ? (
                        <div
                          className="space-y-6"
                          ref={(element) => {
                            screenshotSections.current[app.slug] = element;
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <Target className="h-5 w-5 text-brand" />
                            <h3 className="text-xl font-semibold">
                              {content.labels.screenshotGallery}
                            </h3>
                          </div>
                          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                      ) : null}
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
