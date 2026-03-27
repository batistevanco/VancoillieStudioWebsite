"use client";

import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface HeroParallaxProduct {
  title: string;
  link: string;
  thumbnail: string;
}

export function HeroParallax({
  products,
  eyebrow,
  title,
  description,
}: {
  products: HeroParallaxProduct[];
  eyebrow: string;
  title: string;
  description: string;
}) {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig,
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 350]),
    springConfig,
  );

  return (
    <section
      ref={ref}
      className="relative flex h-[135vh] flex-col overflow-hidden bg-background pt-10 antialiased [perspective:1000px] [transform-style:preserve-3d] md:h-[150vh]"
    >
      <HeroParallaxHeader eyebrow={eyebrow} title={title} description={description} />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="-mt-4 md:-mt-8"
      >
        <motion.div className="mb-8 flex flex-row-reverse space-x-8 space-x-reverse md:mb-12 md:space-x-12">
          {firstRow.map((product) => (
            <ProductCard
              key={`${product.title}-1`}
              product={product}
              translate={translateX}
            />
          ))}
        </motion.div>
        <motion.div className="mb-8 flex flex-row space-x-8 md:mb-12 md:space-x-12">
          {secondRow.map((product) => (
            <ProductCard
              key={`${product.title}-2`}
              product={product}
              translate={translateXReverse}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-8 space-x-reverse md:space-x-12">
          {thirdRow.map((product) => (
            <ProductCard
              key={`${product.title}-3`}
              product={product}
              translate={translateX}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function HeroParallaxHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative left-0 top-0 mx-auto w-full max-w-7xl px-4 py-14 md:py-24">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-brand">
        {eyebrow}
      </p>
      <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-xl">
        {description}
      </p>
    </div>
  );
}

function ProductCard({
  product,
  translate,
}: {
  product: HeroParallaxProduct;
  translate: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className="group/product relative h-56 w-[22rem] shrink-0 md:h-72 md:w-[28rem]"
    >
      <Link
        href={product.link}
        target="_blank"
        rel="noreferrer"
        className="block h-full w-full overflow-hidden rounded-[28px] border border-border/70 bg-slate-100 shadow-[0_24px_70px_rgba(15,23,42,0.14)]"
      >
        <Image
          src={product.thumbnail}
          height={720}
          width={1280}
          className="absolute inset-0 h-full w-full object-cover object-left-top"
          alt={product.title}
        />
      </Link>
    </motion.div>
  );
}
