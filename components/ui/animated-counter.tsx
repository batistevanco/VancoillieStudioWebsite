"use client";

import * as React from "react";
import { motion } from "motion/react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...args: any[]) => twMerge(clsx(args));

interface CounterProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  end: number;
  duration?: number;
  className?: string;
  fontSize?: number;
}

export const Counter = ({
  end,
  duration = 1.2,
  className,
  fontSize = 30,
  ...rest
}: CounterProps) => {
  const digits = String(end).split("");
  const [visibleDigits, setVisibleDigits] = React.useState(0);

  React.useEffect(() => {
    setVisibleDigits(0);

    const stepDuration = Math.max((duration * 1000) / digits.length, 120);
    const interval = setInterval(() => {
      setVisibleDigits((prev) => {
        if (prev >= digits.length) {
          clearInterval(interval);
          return prev;
        }

        return prev + 1;
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [duration, end, digits.length]);

  return (
    <div
      style={{ fontSize }}
      {...rest}
      className={cn(
        "flex min-h-[1em] items-end overflow-hidden px-0 leading-none font-bold text-zinc-950 tabular-nums",
        className,
      )}
    >
      {digits.map((digit, index) => (
        <motion.span
          key={`${end}-${index}`}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={
            index < visibleDigits
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 10, filter: "blur(4px)" }
          }
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="inline-block w-[0.62em] text-center"
        >
          {digit}
        </motion.span>
      ))}
    </div>
  );
};
