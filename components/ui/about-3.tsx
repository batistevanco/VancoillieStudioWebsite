import { Button } from "@/components/ui/button";
import { Counter } from "@/components/ui/animated-counter";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { getCopy } from "@/lib/i18n";
import type { Locale } from "@/lib/routes";

interface About3Props {
  locale?: Locale;
}

export function About3({ locale = "nl" }: About3Props) {
  const content = getCopy(locale).aboutIntro;

  return (
    <section className="px-4 py-24 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
          <TypingAnimation
            text={content.title}
            duration={22}
            className="mx-auto max-w-4xl text-4xl font-semibold leading-[0.95] tracking-tight text-zinc-950 md:mx-0 md:text-left md:text-5xl"
          />
          <p className="text-base leading-7 text-muted-foreground md:pl-8">
            {content.description}
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          <img
            src={content.mainImage.src}
            alt={content.mainImage.alt}
            className="size-full max-h-[620px] rounded-xl border object-cover lg:col-span-2"
          />
          <div className="flex h-full flex-col gap-7 md:flex-row lg:flex-col">
            <div className="flex h-full flex-col justify-between gap-6 rounded-xl bg-muted p-7 md:w-1/2 lg:w-auto">
              <img
                src={content.breakout.src}
                alt={content.breakout.alt}
                className="mr-auto h-12 w-auto"
              />
              <div>
                <p className="mb-2 text-lg font-semibold">{content.breakout.title}</p>
                <p className="text-muted-foreground">{content.breakout.description}</p>
              </div>
              <Button variant="outline" className="mr-auto" asChild>
                <a href={content.breakout.buttonUrl}>{content.breakout.buttonText}</a>
              </Button>
            </div>
          </div>
        </div>

        <div className="py-12 md:py-14">
          <p className="text-center text-sm font-medium text-muted-foreground">
            {content.companiesTitle}
          </p>
          <div className="mt-4 flex justify-center">
            {content.companies.map((company, idx) => (
              <a
                href={company.url}
                target="_blank"
                rel="noreferrer"
                className="flex w-full max-w-[180px] items-center justify-center p-2 transition-opacity hover:opacity-80"
                key={company.src + idx}
              >
                <img
                  src={company.src}
                  alt={company.alt}
                  className="h-12 w-auto object-contain md:h-14"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl bg-muted p-10 md:p-16">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-3xl font-semibold md:text-4xl">
              {content.achievementsTitle}
            </h2>
            <p className="max-w-screen-sm text-muted-foreground">
              {content.achievementsDescription}
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-between gap-10 text-center">
            {content.achievements.map((item, idx) => (
              <div className="flex flex-col gap-3" key={item.label + idx}>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                {Number.isNaN(Number(item.value)) ? (
                  <span className="text-4xl font-semibold md:text-5xl">
                    {item.value}
                  </span>
                ) : (
                  <Counter
                    end={Number(item.value)}
                    duration={0.9}
                    fontSize={40}
                    className="px-0 text-4xl font-semibold md:text-5xl"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute -top-1 right-1 z-10 hidden h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] bg-[size:80px_80px] opacity-15 [mask-image:linear-gradient(to_bottom_right,#000,transparent,transparent)] md:block"></div>
        </div>
      </div>
    </section>
  );
}
