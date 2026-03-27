"use client";

import React from "react";
import { useMotionValue, useMotionValueEvent, useScroll } from "framer-motion";

import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";

export function GoogleGeminiEffectDemo({
  title,
  description,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  const ref = React.useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useMotionValue(0.2);
  const pathLengthSecond = useMotionValue(0.15);
  const pathLengthThird = useMotionValue(0.1);
  const pathLengthFourth = useMotionValue(0.05);
  const pathLengthFifth = useMotionValue(0);
  const lastProgress = React.useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest <= lastProgress.current) {
      return;
    }

    lastProgress.current = latest;

    const normalized = Math.min(latest / 0.8, 1);

    pathLengthFirst.set(0.2 + normalized);
    pathLengthSecond.set(0.15 + normalized * 1.05);
    pathLengthThird.set(0.1 + normalized * 1.1);
    pathLengthFourth.set(0.05 + normalized * 1.15);
    pathLengthFifth.set(normalized * 1.2);
  });

  return (
    <section
      ref={ref}
      className="relative h-[170vh] overflow-clip bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.14),_transparent_32%),linear-gradient(180deg,_rgba(255,255,255,1)_0%,_rgba(246,249,253,1)_56%,_rgba(243,247,252,1)_100%)] px-6 py-20 md:h-[190vh] md:px-8 md:py-24"
    >
      <GoogleGeminiEffect
        className="mx-auto max-w-7xl"
        title={title}
        description={description}
        ctaLabel={ctaLabel}
        ctaHref={ctaHref}
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      />
    </section>
  );
}
