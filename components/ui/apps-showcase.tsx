"use client";

import Image from "next/image";
import * as React from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { FaApple } from "react-icons/fa";

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

        <div className="space-y-0">
          {apps.map((app, index) => {
            const isFeatured = index === 0;
            const reverse = index % 2 === 1;
            const theme = sectionThemes[index % sectionThemes.length];
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
                      {/* iPhone mockup */}
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

                      {/* App info */}
                      <div className="flex flex-col gap-5">
                        <Badge
                          variant="outline"
                          className="w-fit border-brand/30 bg-brand/5 text-brand"
                        >
                          {availabilityLabel}
                        </Badge>
                        <div>
                          <div className="flex items-center gap-3">
                            {mascotte ? (
                              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-[10px] border border-brand/20 bg-white shadow-sm">
                                <Image
                                  src={mascotte}
                                  alt={`${app.name} mascotte`}
                                  fill
                                  className="object-contain p-0.5"
                                />
                              </div>
                            ) : null}
                            <h2 className="text-3xl font-bold tracking-tight md:text-[2rem]">
                              {app.name}
                            </h2>
                          </div>
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
                          <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="h-16 min-w-[260px] rounded-2xl border-brand/40 text-lg text-brand hover:border-brand hover:bg-brand/5 hover:text-brand"
                          >
                            <a href={detailHref}>
                              <ExternalLink className="mr-3 h-5 w-5" />
                              {locale === "en" ? `Discover ${app.name}` : `Ontdek ${app.name}`}
                            </a>
                          </Button>
                        </div>
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
