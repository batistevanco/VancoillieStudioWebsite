"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

import { getCopy } from "@/lib/i18n";
import type { Locale } from "@/lib/routes";

export function AboutSection2({ locale = "nl" }: { locale?: Locale }) {
  const content = getCopy(locale).homeAbout;

  return (
    <section className="min-h-[56vh] bg-gray-50 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start gap-8 lg:flex-row">
          <div className="flex-1">
            <motion.h2
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
              className="mb-8 text-2xl font-semibold !leading-[110%] text-gray-900 sm:text-4xl md:text-5xl"
            >
              {content.prefix}{" "}
              <motion.span
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="inline-block rounded-2xl bg-gradient-to-r from-blue-100 to-blue-200 px-3 py-1 text-blue-700"
              >
                {content.highlightOne}
              </motion.span>{" "}
              {content.middle}{" "}
              <motion.span
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="inline-block rounded-2xl bg-gradient-to-r from-orange-100 to-orange-200 px-3 py-1 text-orange-700"
              >
                {content.highlightTwo}
              </motion.span>{" "}
              {content.end}{" "}
              <motion.span
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="inline-block rounded-2xl bg-gradient-to-r from-green-100 to-green-200 px-3 py-1 text-green-700"
              >
                {content.highlightThree}
              </motion.span>
            </motion.h2>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <motion.div
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: 0.8, duration: 0.7 }}
                className="mb-4 text-sm sm:text-xl"
              >
                <div className="mb-1 font-medium capitalize text-gray-900">
                  {content.captionTitle}
                </div>
                <div className="font-semibold uppercase text-gray-600">
                  {content.captionSubtitle}
                </div>
              </motion.div>

              <motion.a
                href={locale === "en" ? "/en/about" : "/about"}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: 1, duration: 0.7 }}
                className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-blue-600 px-4 text-sm font-medium text-white shadow-lg shadow-blue-600/30"
              >
                <Zap size={16} fill="white" />
                {content.button}
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
