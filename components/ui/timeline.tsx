"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface TimelineEntry {
  id?: string;
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({
  data,
  heading,
  description,
}: {
  data: TimelineEntry[];
  heading: string;
  description: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  useEffect(() => {
    const updateActiveItem = () => {
      const viewportAnchor = window.innerHeight * 0.4;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      itemRefs.current.forEach((item, index) => {
        if (!item) {
          return;
        }

        const rect = item.getBoundingClientRect();
        const itemAnchor = rect.top + rect.height * 0.28;
        const distance = Math.abs(itemAnchor - viewportAnchor);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    updateActiveItem();
    window.addEventListener("scroll", updateActiveItem, { passive: true });
    window.addEventListener("resize", updateActiveItem);

    return () => {
      window.removeEventListener("scroll", updateActiveItem);
      window.removeEventListener("resize", updateActiveItem);
    };
  }, [data.length]);

  return (
    <div
      className="w-full bg-white font-sans md:px-10"
      ref={containerRef}
    >
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:px-10">
        <h2 className="mb-4 max-w-4xl text-lg text-black md:text-4xl">
          {heading}
        </h2>
        <p className="max-w-sm text-sm text-neutral-700 md:text-base">
          {description}
        </p>
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl pb-20">
        {data.map((item, index) => (
          <div
            key={item.id ?? `${item.title}-${index}`}
            ref={(element) => {
              itemRefs.current[index] = element;
            }}
            className="flex justify-start pt-10 md:gap-10 md:pt-40"
          >
            <div className="sticky top-40 z-40 flex max-w-xs self-start md:w-full md:max-w-sm md:flex-row md:items-center">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-white md:left-3">
                <div
                  className={cn(
                    "h-4 w-4 rounded-full border p-2 transition-all duration-300",
                    activeIndex === index
                      ? "scale-125 border-brand bg-brand shadow-[0_0_0_6px_rgba(37,99,235,0.16)]"
                      : "border-neutral-300 bg-neutral-200",
                  )}
                />
              </div>
              <h3
                className={cn(
                  "hidden text-xl font-bold transition-colors duration-300 md:block md:pl-20 md:text-5xl",
                  activeIndex === index ? "text-zinc-950" : "text-neutral-500",
                )}
              >
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <h3
                className={cn(
                  "mb-4 block text-left text-2xl font-bold transition-colors duration-300 md:hidden",
                  activeIndex === index ? "text-zinc-950" : "text-neutral-500",
                )}
              >
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%]"
          />
        </div>
      </div>
    </div>
  );
};
