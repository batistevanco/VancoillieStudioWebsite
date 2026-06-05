"use client";

import { Code2, Zap, HeartHandshake } from "lucide-react";

const STRENGTHS = [
  {
    icon: Code2,
    title: "Gebouwd voor de lange termijn",
    description:
      "Geen templates, geen shortcuts. Jouw website wordt volledig op maat gebouwd — schaalbaar, snel en toekomstbestendig.",
  },
  {
    icon: Zap,
    title: "Snel live, zonder gedoe",
    description:
      "Van eerste gesprek tot live product. Wij zorgen voor hosting, domeinnaam en onderhoud — jij focust op je zaak.",
  },
  {
    icon: HeartHandshake,
    title: "Eén aanspreekpunt",
    description:
      "Geen groot agency met wisselende gezichten. Jij praat rechtstreeks met de persoon die jouw product bouwt.",
  },
];

export function StrengthsSection() {
  return (
    <section className="bg-white px-8 md:px-28 py-24 md:py-32">
      <div className="rounded-[2rem] bg-[#4a6d96] px-10 py-16 md:px-20 md:py-24">
        {/* Top label */}
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
          Waarom Vancoillie Studio
        </p>

        {/* Headline */}
        <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight text-white md:text-5xl">
          Gebouwd voor{" "}
          <span className="italic text-neutral-400">resultaat.</span>
        </h2>

        {/* Strength cards */}
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {STRENGTHS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5">
                <Icon className="h-5 w-5 text-white/60" />
              </div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-white/70">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
