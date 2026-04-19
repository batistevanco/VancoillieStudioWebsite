"use client";

import { motion } from "framer-motion";

import { AuroraHero } from "@/components/ui/hero-2";

export default function EnglishLandingPage() {
  return (
    <AuroraHero>
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: "easeInOut" }}
          className="mb-8 text-center text-5xl font-bold leading-none tracking-normal text-zinc-950 sm:text-6xl md:text-7xl"
        >
          Vancoillie Studio
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.75, ease: "easeInOut" }}
          className="mb-4 text-sm font-semibold uppercase tracking-normal text-brand"
        >
          Websites, apps and software
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: "easeInOut" }}
          className="bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-center text-4xl font-bold leading-tight tracking-normal text-transparent sm:text-5xl md:text-6xl"
        >
          Digital solutions that feel clear from the first screen.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
          className="mx-auto mt-5 max-w-2xl text-center text-base leading-7 text-muted-foreground md:text-lg"
        >
          From website to app, from idea to launch. Vancoillie Studio creates
          digital products that bring structure, speed and usability together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.75, ease: "easeInOut" }}
          className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <a
            href="/en/home"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-zinc-900 px-7 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
          >
            Discover Vancoillie Studio
          </a>
          <a
            href="/en/websites"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-white/80 px-7 text-sm font-semibold text-zinc-900 backdrop-blur transition-colors hover:bg-white"
          >
            View websites
          </a>
        </motion.div>
      </div>
    </AuroraHero>
  );
}
