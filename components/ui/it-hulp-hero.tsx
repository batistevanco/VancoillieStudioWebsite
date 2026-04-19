import { FaApple } from "react-icons/fa";
import { Globe, Monitor, Smartphone, Tablet } from "lucide-react";

import { getCopy } from "@/lib/i18n";
import type { Locale } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import { HeroDeviceAssemblePlayer } from "@/components/ui/hero-device-assemble";

const APP_STORE_URL = "https://apps.apple.com/us/app/mijn-it-hulp/id6761382330";
const WEB_URL = "https://vancoillieithulp.be/mijnithulp/index.html";

const platformIcons = {
  iPhone: <Smartphone className="h-4 w-4" />,
  iPad: <Tablet className="h-4 w-4" />,
  Mac: <Monitor className="h-4 w-4" />,
  Web: <Globe className="h-4 w-4" />,
};

export function ItHulpHero({ locale = "nl" }: { locale?: Locale }) {
  const content = getCopy(locale).itHulpHero;

  return (
    <section className="overflow-hidden bg-white px-6 py-20 md:px-8 md:py-28">
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Text content */}
        <div className="relative text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-brand">
            {content.eyebrow}
          </p>
          <h2 className="mx-auto max-w-2xl text-balance text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl">
            {content.title}
          </h2>
          <p className="mx-auto my-6 max-w-xl text-balance text-lg leading-7 text-muted-foreground">
            {content.description}
          </p>

          <div className="flex flex-col items-center justify-center gap-3 *:w-full sm:flex-row sm:*:w-auto">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-xl bg-black px-6 text-base text-white shadow-lg shadow-black/15 hover:bg-black/90"
            >
              <a href={APP_STORE_URL} target="_blank" rel="noreferrer">
                <FaApple className="mr-2 h-5 w-5" />
                {content.primaryCta}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-xl px-6 text-base">
              <a href={WEB_URL} target="_blank" rel="noreferrer">
                <Globe className="mr-2 h-4 w-4" />
                {content.secondaryCta}
              </a>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto mt-14 aspect-video w-full max-w-5xl overflow-hidden rounded-[2rem] shadow-2xl shadow-slate-300/60 ring-1 ring-black/5 md:mt-20">
          <HeroDeviceAssemblePlayer
            accentColor="#2563eb"
            screenImage={{
              src: "/afbeeldingen/mijnithulpWeb.png",
              alt: "Mijn IT Hulp webversie",
              objectFit: "cover",
              objectPosition: "top center",
            }}
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Platform availability */}
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">{content.platformLabel}</p>
          <div className="mt-3 flex items-center justify-center gap-6">
            {(content.platforms as readonly string[]).map((platform) => (
              <div
                key={platform}
                className="flex items-center gap-1.5 text-sm font-medium text-zinc-700"
              >
                {platformIcons[platform as keyof typeof platformIcons]}
                {platform}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
