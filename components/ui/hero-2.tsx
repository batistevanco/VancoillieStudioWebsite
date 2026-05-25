"use client";

import type { ReactNode } from "react";

import { Noise } from "@/components/ui/noise";
import { GeminiWave } from "@/components/ui/gemini-wave";
import { cn } from "@/lib/utils";

interface AuroraHeroProps {
  children: ReactNode;
  className?: string;
  theme?: "websites" | "apps" | "software";
}

const AuroraAnimation = () => (
  <style>
    {`
      @keyframes aurora-1 {
        0% { transform: translate(0%, 0%) scale(1); }
        33% { transform: translate(8%, -6%) scale(1.08); }
        66% { transform: translate(-8%, 6%) scale(0.94); }
        100% { transform: translate(0%, 0%) scale(1); }
      }
      @keyframes aurora-2 {
        0% { transform: translate(0%, 0%) scale(1); }
        33% { transform: translate(-8%, 6%) scale(1.04); }
        66% { transform: translate(8%, -6%) scale(0.96); }
        100% { transform: translate(0%, 0%) scale(1); }
      }
    `}
  </style>
);

export function AuroraHero({ children, className, theme = "websites" }: AuroraHeroProps) {
  return (
    <div className="h-full w-full">
      <AuroraAnimation />
      <Noise />
      <div
        className={cn(
          "relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-tr from-[#FAF9F5] via-[#F4F6F9] to-[#FBF8FD] antialiased",
          className,
        )}
      >
        {/* Soft, magical drifting pastel glow blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute -top-[15%] -right-[10%] h-[700px] w-[700px] animate-[aurora-1_24s_ease-in-out_infinite] rounded-full bg-orange-200/18 blur-[130px] filter" />
          <div className="absolute -bottom-[15%] -left-[10%] h-[700px] w-[700px] animate-[aurora-2_24s_ease-in-out_infinite] rounded-full bg-indigo-100/32 blur-[130px] filter" />
        </div>

        <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000">
          <GeminiWave theme={theme} />
        </div>

        <div className="relative z-10 w-full">{children}</div>
      </div>
    </div>
  );
}
