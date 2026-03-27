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
    <div className="container mx-auto py-20">
      <div className="mb-12 space-y-4 text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h2>
        <p className="whitespace-pre-line text-lg text-muted-foreground">
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
                "relative flex w-full flex-none flex-col rounded-2xl border-[1px] bg-background p-6 text-center lg:flex lg:flex-col lg:justify-center md:w-[350px]",
                plan.isPopular ? "border-primary border-2" : "border-border",
                !plan.isPopular && "md:mt-4",
                plan.isPopular && "z-10 md:w-[380px]",
                !plan.isPopular && "z-0",
              )}
            >
              {plan.isPopular && (
                <div className="absolute right-0 top-0 flex items-center rounded-bl-xl rounded-tr-xl bg-primary px-2 py-0.5">
                  <Star className="h-4 w-4 fill-current text-primary-foreground" />
                  <span className="ml-1 font-sans font-semibold text-primary-foreground">
                    {popularBadge}
                  </span>
                </div>
              )}
              <div className="flex flex-1 flex-col">
                <p className="text-base font-semibold text-muted-foreground">
                  {plan.name}
                </p>
                <div className="mt-6 flex items-center justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-foreground">
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
                  <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                    / {plan.period}
                  </span>
                </div>

                <p className="text-xs leading-5 text-muted-foreground">
                  {includeHosting
                    ? plan.includesHosting
                      ? "hosting & domeinnaam inbegrepen"
                      : "inclusief hosting & domeinnaam"
                    : plan.includesHosting
                      ? "hosting & domeinnaam inbegrepen"
                      : "excl. hosting & domeinnaam"}
                </p>

                <ul className="mt-5 flex flex-col gap-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-left">{feature}</span>
                    </li>
                  ))}
                </ul>

                <hr className="my-4 w-full" />

                <Link
                  href={plan.href}
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                    }),
                    "group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter ring-offset-current transition-all duration-300 ease-out hover:bg-primary hover:text-primary-foreground hover:ring-2 hover:ring-primary hover:ring-offset-1",
                    plan.isPopular
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-foreground",
                  )}
                >
                  {plan.buttonText}
                </Link>
                <p className="mt-6 text-xs leading-5 text-muted-foreground">
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
