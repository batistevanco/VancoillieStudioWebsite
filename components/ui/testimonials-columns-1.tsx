"use client";

import React from "react";
import { motion } from "motion/react";
import type { Locale } from "@/lib/routes";
import { getCopy } from "@/lib/i18n";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: {
    text: string;
    image: string;
    name: string;
    role: string;
    app?: string;
    featured?: boolean;
  }[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 bg-background pb-6 will-change-transform"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(
                ({ text, image, name, role, app, featured }, i) => (
                <div
                  className={`w-full max-w-xs rounded-3xl border p-10 shadow-lg transition-colors ${
                    featured
                      ? "border-primary/40 bg-primary/5 shadow-primary/20"
                      : "bg-white shadow-primary/10"
                  }`}
                  key={i}
                >
                  {featured ? (
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground">
                        Uitgelichte review
                      </span>
                      {app ? (
                        <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
                          {app}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                  <div className="text-lg leading-10 text-foreground/80">
                    {text}
                  </div>
                  <div className="mt-5 flex items-center gap-2">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5">
                        {name}
                      </div>
                      <div className="leading-5 opacity-60 tracking-tight">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
                ),
              )}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

export function Testimonials({ locale = "en" }: { locale?: Locale }) {
  const content = getCopy(locale).testimonials;
  const itemsPerColumn = Math.ceil(content.items.length / 3);
  const firstColumn = content.items.slice(0, itemsPerColumn);
  const secondColumn = content.items.slice(itemsPerColumn, itemsPerColumn * 2);
  const thirdColumn = content.items.slice(itemsPerColumn * 2);

  return (
    <section className="bg-background relative my-20 px-4">
      <div className="container z-10 mx-auto max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-[540px] flex-col items-center justify-center"
        >
          <div className="flex justify-center">
            <div className="rounded-lg border px-4 py-1 text-sm font-medium">
              {content.badge}
            </div>
          </div>

          <h2 className="mt-5 text-center text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            {content.title}
          </h2>
          <p className="mt-5 text-center opacity-75">{content.description}</p>
        </motion.div>

        <div className="mt-10 flex max-h-[740px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
}
