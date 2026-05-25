import { Header } from "@/components/ui/header-2";
import { Button } from "@/components/ui/button";
import { getCopy } from "@/lib/i18n";
import type { Locale } from "@/lib/routes";

export function SoftwareHero({ locale = "nl" }: { locale?: Locale }) {
  const content = getCopy(locale);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#FAFAFA] via-white to-[#F4F8FC] dark:from-[#0A0A0A] dark:via-[#0E0E0E] dark:to-[#0A0A0A] transition-colors duration-300">
      <Header />

      <main className="relative">
        {/* Soft background ambient blurs */}
        <div className="absolute top-1/4 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute bottom-1/3 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-[120px]" />

        <section className="relative overflow-hidden pt-16 md:pt-24 pb-20">
          <div className="relative mx-auto max-w-5xl px-6 py-12 md:py-20 lg:py-24">
            <div className="relative z-10 mx-auto max-w-[58rem] text-center">
              <h1 className="text-balance text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-6xl md:text-7xl lg:text-[5.5rem] lg:leading-[0.95]">
                {content.softwareHero.title}
              </h1>

              <p className="mx-auto my-8 max-w-3xl text-balance text-lg leading-relaxed text-zinc-500 dark:text-zinc-400 md:my-10 md:text-xl">
                {content.softwareHero.description}
              </p>

              <Button
                asChild
                size="lg"
                className="h-14 rounded-full bg-zinc-900 px-10 text-base font-bold text-white shadow-lg shadow-zinc-900/10 hover:bg-zinc-800 hover:scale-[1.02] transition-all duration-300 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
              >
                <a href={content.softwareHero.primaryCtaHref}>
                  <span>{content.softwareHero.primaryCta}</span>
                </a>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto -mt-8 max-w-5xl px-6 [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] md:-mt-12 lg:-mt-16">
            <div className="[perspective:1200px] [mask-image:linear-gradient(to_right,black_84%,transparent_100%)] -mr-4 pl-4 md:-mr-12 md:pl-12 lg:-mr-24 lg:pl-24">
              <div className="[transform:rotateX(15deg)] relative">
                
                {/* Floating UI Overlay over Mockup */}
                <div className="absolute top-1/4 -left-6 z-10 hidden md:flex flex-col items-start gap-1 rounded-2xl border border-white/30 bg-white/70 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.06)] backdrop-blur-md dark:border-white/10 dark:bg-black/70 animate-[bounce_4s_ease-in-out_infinite]">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-500">Factuur Status</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-sm font-bold text-zinc-800 dark:text-white">Betaald</span>
                    <span className="text-xs font-semibold rounded bg-emerald-100 dark:bg-emerald-950/40 px-1.5 py-0.5 text-emerald-700 dark:text-emerald-300">EUR 249,00</span>
                  </div>
                </div>

                <div className="relative skew-x-[0.24rad]">
                  <img
                    className="relative z-[2] w-full rounded-[2rem] border border-zinc-200/50 bg-white shadow-[0_40px_100px_rgba(15,23,42,0.06)] dark:border-white/5 dark:bg-zinc-950"
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
