"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary";
}

export function MagneticButton({
  children,
  href,
  className,
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const innerContent = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        "group relative flex h-14 items-center justify-center overflow-hidden rounded-full px-8 text-sm font-semibold transition-colors",
        variant === "primary"
          ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          : "border border-zinc-200 bg-white/50 text-zinc-900 backdrop-blur-md hover:bg-white dark:border-white/10 dark:bg-black/50 dark:text-white dark:hover:bg-white/10",
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <motion.span
          className="inline-block"
          initial={{ x: 0, opacity: 0 }}
          whileHover={{ x: 4, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          &rarr;
        </motion.span>
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {innerContent}
      </Link>
    );
  }

  return <div className="inline-block">{innerContent}</div>;
}
