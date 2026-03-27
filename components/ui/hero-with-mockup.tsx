import type { ReactNode } from "react";
import { Github } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Glow } from "@/components/ui/glow";
import { Mockup } from "@/components/ui/mockup";
import WhisperText from "@/components/ui/whisper-text";

interface HeroWithMockupProps {
  title: string;
  description: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
    icon?: ReactNode;
  };
  mockupImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  showMockup?: boolean;
  className?: string;
}

export function HeroWithMockup({
  title,
  description,
  primaryCta = {
    text: "Get Started",
    href: "/get-started",
  },
  secondaryCta = {
    text: "GitHub",
    href: "https://github.com/batistevanco?tab=repositories",
    icon: <Github className="mr-2 h-4 w-4" />,
  },
  mockupImage,
  showMockup = true,
  className,
}: HeroWithMockupProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-background px-4 text-foreground",
        showMockup ? "py-12 md:py-24 lg:py-32" : "min-h-screen flex flex-col justify-center py-12 md:py-16 lg:py-20",
        className,
      )}
    >
      <div
        className={cn(
          "relative mx-auto flex max-w-[1280px] flex-col",
          showMockup ? "gap-12 lg:gap-24" : "gap-8 lg:gap-10",
        )}
      >
        <div
          className={cn(
            "relative z-10 flex flex-col items-center gap-6 text-center lg:gap-12",
            showMockup ? "pt-8 md:pt-16" : "pt-4 md:pt-8",
          )}
        >
          <WhisperText
            text={title}
            delay={70}
            duration={0.45}
            y={18}
            playOnMount
            className={cn(
              "justify-center text-center text-4xl font-bold leading-[1.1] tracking-tight text-foreground drop-shadow-sm sm:text-5xl sm:leading-[1.1] md:text-6xl lg:text-7xl xl:text-8xl dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]",
            )}
          />

          <p
            className={cn(
              "max-w-[550px] animate-appear text-base font-medium text-muted-foreground opacity-0 [animation-delay:150ms] sm:text-lg md:text-xl",
            )}
          >
            {description}
          </p>

          <div className="relative z-10 flex flex-wrap justify-center gap-4 animate-appear opacity-0 [animation-delay:300ms]">
            <Button
              asChild
              size="lg"
              className={cn(
                "bg-gradient-to-b from-brand to-brand/90 text-white shadow-lg transition-all duration-300 hover:from-brand/95 hover:to-brand/85 dark:from-brand/90 dark:to-brand/80 dark:hover:from-brand/80 dark:hover:to-brand/70",
              )}
            >
              <a href={primaryCta.href}>{primaryCta.text}</a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="ghost"
              className={cn(
                "text-foreground/80 transition-all duration-300 dark:text-foreground/70",
              )}
            >
              <a href={secondaryCta.href}>
                {secondaryCta.icon}
                {secondaryCta.text}
              </a>
            </Button>
          </div>

          {showMockup ? (
            <div className="relative w-full px-4 pt-12 sm:px-6 lg:px-8">
              <Mockup
                className={cn(
                  "animate-appear border-brand/10 opacity-0 shadow-[0_0_50px_-12px_rgba(0,0,0,0.3)] [animation-delay:700ms] dark:border-brand/5 dark:shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)]",
                )}
              >
                <img
                  {...mockupImage}
                  className="h-auto w-full"
                  loading="lazy"
                  decoding="async"
                />
              </Mockup>
            </div>
          ) : null}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Glow
          variant="above"
          className="animate-appear-zoom opacity-0 [animation-delay:1000ms]"
        />
      </div>
    </section>
  );
}
