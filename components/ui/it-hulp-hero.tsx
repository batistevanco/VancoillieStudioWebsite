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
    <section className="relative overflow-hidden bg-transparent px-6 py-28 lg:py-36">
      {/* Background ambient lighting blurs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-96 w-96 rounded-full bg-blue-500/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Text content */}
        <div className="relative text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-brand">
            {content.eyebrow}
          </p>
          <h2 className="mx-auto max-w-2xl text-balance text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white md:text-5xl lg:text-6xl">
            {content.title}
          </h2>
          <p className="mx-auto my-6 max-w-xl text-balance text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            {content.description}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-14 rounded-full bg-zinc-900 px-8 text-sm font-bold text-white shadow-lg shadow-zinc-900/10 hover:bg-zinc-800 hover:scale-[1.02] transition-all duration-300 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 w-full sm:w-auto"
            >
              <a href={APP_STORE_URL} target="_blank" rel="noreferrer">
                <FaApple className="mr-2 h-5 w-5 shrink-0" />
                {content.primaryCta}
              </a>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="h-14 rounded-full border-zinc-200/80 bg-white/50 px-8 text-sm font-bold text-zinc-900 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-900 w-full sm:w-auto"
            >
              <a href={WEB_URL} target="_blank" rel="noreferrer">
                <Globe className="mr-2 h-4 w-4 shrink-0" />
                {content.secondaryCta}
              </a>
            </Button>
          </div>
        </div>

        {/* Floating device mockup container */}
        <div className="relative mx-auto mt-16 aspect-video w-full max-w-5xl overflow-hidden rounded-[2.5rem] border border-zinc-200/40 bg-white shadow-[0_40px_100px_rgba(0,0,0,0.06)] dark:border-white/5 dark:bg-zinc-950 md:mt-24">
          <HeroDeviceAssemblePlayer
            accentColor="#2563eb"
            screenImage={{
              src: "/afbeeldingen/mijnithulpWeb.png",
              alt: "Mijn IT Hulp webversie",
              objectFit: "cover",
              objectPosition: "top center",
            }}
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/40 to-transparent dark:from-zinc-950 dark:via-zinc-950/40" />
        </div>

        {/* Platform availability */}
        <div className="mt-14 text-center">
          <p className="text-sm text-zinc-400 dark:text-zinc-500">{content.platformLabel}</p>
          <div className="mt-4 flex items-center justify-center gap-6 flex-wrap">
            {(content.platforms as readonly string[]).map((platform) => (
              <div
                key={platform}
                className="flex items-center gap-2 rounded-full border border-zinc-200/60 bg-white/40 px-4 py-1.5 text-xs font-semibold text-zinc-600 dark:border-white/5 dark:bg-white/[0.02] dark:text-zinc-400"
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
