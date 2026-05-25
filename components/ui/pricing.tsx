"use client";

import { useRef, useState } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: readonly string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
  includesHosting?: boolean;
}

interface PricingProps {
  plans: readonly PricingPlan[];
  title?: string;
  description?: string;
  toggleLabel?: string;
  toggleBadge?: string;
  popularBadge?: string;
}

export function Pricing({
  plans,
  title = "Websitepakketten",
  description = "Kies het pakket dat het best past bij je zaak.",
  toggleLabel = "Hosting & domeinnaam toevoegen",
  toggleBadge = "(+ EUR 150)",
  popularBadge = "Popular",
}: PricingProps) {
  const [includeHosting, setIncludeHosting] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (checked: boolean) => {
    setIncludeHosting(checked);

    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: [
          "hsl(var(--primary))",
          "hsl(var(--accent))",
          "hsl(var(--secondary))",
          "hsl(var(--muted))",
        ],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  return (
    <div className="relative container mx-auto py-28 lg:py-36 overflow-hidden">
      {/* Soft background ambient blurs */}
      <div className="absolute top-1/4 right-0 -z-10 h-96 w-96 rounded-full bg-blue-500/5 blur-[120px]" />
      <div className="absolute bottom-1/4 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-[150px]" />

      <div className="mb-16 space-y-5 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        <p className="whitespace-pre-line text-lg text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      </div>

      <div className="mb-10 flex justify-center">
        <label className="relative inline-flex cursor-pointer items-center">
          <Label>
            <Switch
              ref={switchRef}
              checked={includeHosting}
              onCheckedChange={handleToggle}
              className="relative"
            />
          </Label>
        </label>
        <span className="ml-2 font-semibold">
          {toggleLabel} <span className="text-primary">{toggleBadge}</span>
        </span>
      </div>

      <div className="mx-auto flex w-full flex-col gap-5 md:w-fit md:flex-row md:items-center md:justify-center">
        {plans.map((plan, index) => {
          const displayedPrice =
            includeHosting && !plan.includesHosting
              ? Number(plan.price) + 150
              : Number(plan.price);

          return (
            <motion.div
              key={plan.name}
              initial={{ y: 50, opacity: 1 }}
              whileInView={
                isDesktop
                  ? {
                      y: plan.isPopular ? -16 : 0,
                      opacity: 1,
                      x: 0,
                      scale: plan.isPopular ? 1 : 0.98,
                    }
                  : {}
              }
              viewport={{ once: true }}
              transition={{
                duration: 1.6,
                type: "spring",
                stiffness: 100,
                damping: 30,
                delay: 0.4,
                opacity: { duration: 0.5 },
              }}
              className={cn(
                "relative flex w-full flex-none flex-col rounded-[2.5rem] border p-8 text-center backdrop-blur-lg lg:flex lg:flex-col lg:justify-center md:w-[350px] transition-all duration-300 hover:-translate-y-1",
                plan.isPopular
                  ? "bg-white/70 border-brand/35 shadow-[0_20px_50px_rgba(37,99,235,0.08)] dark:bg-black/70 dark:border-brand/40 z-10 md:w-[380px] md:scale-105"
                  : "bg-white/45 border-zinc-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.015)] dark:bg-white/[0.02] dark:border-white/5 z-0 md:mt-4",
              )}
            >
              {plan.isPopular && (
                <div className="absolute right-6 top-6 flex items-center rounded-full bg-brand/10 border border-brand/20 px-3 py-1 text-xs font-semibold tracking-wider text-brand dark:bg-brand/20 dark:text-blue-300">
                  <Star className="h-3 w-3 fill-current text-brand mr-1" />
                  <span className="font-sans font-semibold">
                    {popularBadge}
                  </span>
                </div>
              )}
              <div className="flex flex-1 flex-col">
                <p className="text-left text-base font-bold text-zinc-950 dark:text-white">
                  {plan.name}
                </p>
                <div className="mt-6 flex items-baseline justify-start gap-x-2">
                  <span className="text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
                    <NumberFlow
                      value={displayedPrice}
                      format={{
                        style: "currency",
                        currency: "EUR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }}
                    />
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-zinc-500 dark:text-zinc-400">
                    / {plan.period}
                  </span>
                </div>

                <p className="text-left text-xs mt-2 text-zinc-400 dark:text-zinc-500">
                  {includeHosting
                    ? plan.includesHosting
                      ? "hosting & domeinnaam inbegrepen"
                      : "inclusief hosting & domeinnaam"
                    : plan.includesHosting
                      ? "hosting & domeinnaam inbegrepen"
                      : "excl. hosting & domeinnaam"}
                </p>

                <ul className="mt-8 flex flex-col gap-3.5 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand dark:bg-brand/20">
                        <Check className="h-3 w-3 stroke-[2.5]" />
                      </div>
                      <span className="text-left leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="my-6 border-t border-zinc-200/50 dark:border-white/5 w-full" />

                <Link
                  href={plan.href}
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                    }),
                    "group relative w-full h-12 rounded-full overflow-hidden text-sm font-bold tracking-tight transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-md",
                    plan.isPopular
                      ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                      : "bg-white border-zinc-200/80 text-zinc-900 hover:bg-zinc-50 dark:bg-zinc-950 dark:border-white/10 dark:text-white dark:hover:bg-zinc-900",
                  )}
                >
                  {plan.buttonText}
                </Link>
                <p className="mt-6 text-xs text-left leading-5 text-zinc-400 dark:text-zinc-500">
                  {plan.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
