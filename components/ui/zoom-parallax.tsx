"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Image {
  src: string;
  alt?: string;
}

interface ZoomParallaxProps {
  images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  return (
    <div ref={container} className="relative h-[220vh] md:h-[260vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {images.map(({ src, alt }, index) => {
          const scale = scales[index % scales.length];

          return (
            <motion.div
              key={`${src}-${index}`}
              style={{ scale }}
              className={`absolute top-0 flex h-full w-full items-center justify-center ${
                index === 1
                  ? "[&>div]:!-top-[28vh] [&>div]:!left-[7vw] [&>div]:!h-[28vh] [&>div]:!w-[34vw]"
                  : ""
              } ${
                index === 2
                  ? "[&>div]:!-top-[12vh] [&>div]:!-left-[22vw] [&>div]:!h-[40vh] [&>div]:!w-[22vw]"
                  : ""
              } ${
                index === 3
                  ? "[&>div]:!left-[27vw] [&>div]:!h-[24vh] [&>div]:!w-[26vw]"
                  : ""
              } ${
                index === 4
                  ? "[&>div]:!top-[28vh] [&>div]:!left-[7vw] [&>div]:!h-[24vh] [&>div]:!w-[20vw]"
                  : ""
              } ${
                index === 5
                  ? "[&>div]:!top-[28vh] [&>div]:!-left-[21vw] [&>div]:!h-[24vh] [&>div]:!w-[30vw]"
                  : ""
              } ${
                index === 6
                  ? "[&>div]:!top-[22vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]"
                  : ""
              }`}
            >
              <div className="relative h-[25vh] w-[25vw] overflow-hidden rounded-[28px] border border-border/70 bg-white p-2 shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
                <img
                  src={src}
                  alt={alt || `Parallax image ${index + 1}`}
                  className="h-full w-full rounded-[20px] object-contain bg-slate-50"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
