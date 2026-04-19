import { Header } from "@/components/ui/header-2";
import { Button } from "@/components/ui/button";
import { getCopy } from "@/lib/i18n";
import type { Locale } from "@/lib/routes";

export function SoftwareHero({ locale = "nl" }: { locale?: Locale }) {
  const content = getCopy(locale);

  return (
    <div className="bg-white">
      <Header />

      <main>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 isolate hidden opacity-60 lg:block"
        >
          <div className="absolute left-0 top-0 h-[80rem] w-[35rem] -translate-y-[22rem] -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,80%,0.12)_0,hsla(0,0%,70%,0.03)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="absolute left-0 top-0 h-[80rem] w-56 -translate-y-[10rem] -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,0.08)_0,hsla(0,0%,45%,0.02)_80%,transparent_100%)]" />
          <div className="absolute left-0 top-0 h-[80rem] w-56 -translate-y-[22rem] -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,0.05)_0,hsla(0,0%,45%,0.015)_80%,transparent_100%)]" />
        </div>

        <section className="overflow-hidden bg-white">
          <div className="relative mx-auto max-w-5xl px-6 py-24 md:py-28 lg:py-24">
            <div className="relative z-10 mx-auto max-w-[58rem] text-center">
              <h1 className="text-balance text-5xl font-semibold tracking-[-0.06em] text-zinc-950 sm:text-6xl md:text-7xl lg:text-[5.8rem] lg:leading-[0.92]">
                {content.softwareHero.title}
              </h1>

              <p className="mx-auto my-8 max-w-4xl text-balance text-lg leading-8 text-zinc-700 md:my-10 md:text-2xl md:leading-[1.45]">
                {content.softwareHero.description}
              </p>

              <Button
                asChild
                size="lg"
                className="h-16 rounded-2xl bg-zinc-900 px-10 text-lg font-medium text-white shadow-none hover:bg-zinc-800"
              >
                <a href={content.softwareHero.primaryCtaHref}>
                  <span>{content.softwareHero.primaryCta}</span>
                </a>
              </Button>
            </div>
          </div>

          <div className="mx-auto -mt-8 max-w-7xl [mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)] md:-mt-12 lg:-mt-16">
            <div className="[perspective:1200px] [mask-image:linear-gradient(to_right,black_84%,transparent_100%)] -mr-12 pl-8 md:-mr-24 md:pl-20 lg:-mr-56 lg:pl-56">
              <div className="[transform:rotateX(20deg)]">
                <div className="relative skew-x-[0.36rad]">
                  <img
                    className="relative z-[2] w-full rounded-[2rem] border border-zinc-200 bg-white shadow-[0_35px_90px_rgba(15,23,42,0.09)]"
                    src="/afbeeldingen/screenshotInvoxa.png"
                    alt={content.softwareHero.mockupAlt}
                    width={2880}
                    height={2074}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
