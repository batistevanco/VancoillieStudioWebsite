"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface WhisperTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  triggerStart?: string;
  playOnMount?: boolean;
}

export default function WhisperText({
  text,
  className = "",
  delay = 80,
  duration = 0.4,
  x = 0,
  y = 0,
  triggerStart = "top 90%",
  playOnMount = false,
}: WhisperTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-word]");

      gsap.set(targets, { opacity: 0, x, y });

      gsap.to(targets, {
        ...(playOnMount
          ? {}
          : {
              scrollTrigger: {
                trigger: containerRef.current,
                start: triggerStart,
                toggleActions: "play none none none",
                once: true,
              },
            }),
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        ease: "power2.out",
        stagger: delay / 1000,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [text, delay, duration, x, y, triggerStart, playOnMount]);

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-flex flex-wrap gap-x-2", className)}
      style={{ overflow: "visible" }}
    >
      {text.split(" ").map((word, index) => (
        <span
          key={`${word}-${index}`}
          data-word
          className="inline-block whitespace-nowrap"
          style={{ position: "relative" }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}
