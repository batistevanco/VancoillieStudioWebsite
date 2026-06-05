"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    question: "Wat doet Vancoillie Studio precies?",
    answer:
      "Vancoillie Studio bouwt websites op maat voor zelfstandigen en kleine bedrijven, en ontwikkelt daarnaast eigen iPhone-apps en softwareproducten. Van een eenvoudige onepager tot een volledige webapplicatie — alles wordt op maat gebouwd, zonder templates.",
  },
  {
    question: "Hoeveel kost een website?",
    answer:
      "We hebben drie pakketten: Starter (€249 eenmalig) voor een professionele onepager, Growth (€549 eenmalig) voor 3 tot 5 pagina's met custom design, en Compleet (€749 eenmalig) waarbij hosting en domeinnaam inbegrepen zijn. Alle prijzen zijn eenmalig — geen verborgen maandelijkse kosten.",
  },
  {
    question: "Is hosting en domeinnaam inbegrepen?",
    answer:
      "Bij het Compleet pakket zijn hosting en domeinnaam volledig inbegrepen. Bij de Starter en Growth pakketten regelen we de technische kant, maar de hosting- en domeinkosten zijn apart. We helpen je wel bij elke stap.",
  },
  {
    question: "Hoe lang duurt het om een website te bouwen?",
    answer:
      "Afhankelijk van de complexiteit en hoe snel je feedback geeft, is een website gemiddeld binnen 1 tot 3 weken live. We werken efficiënt en houden je op de hoogte tijdens het hele proces.",
  },
  {
    question: "Kan ik mijn website zelf aanpassen achteraf?",
    answer:
      "Dat bespreken we samen. Voor kleine aanpassingen neem je gewoon contact op — we helpen je snel verder. Voor grotere wijzigingen of een eigen beheerpaneel zoeken we de beste oplossing op maat.",
  },
  {
    question: "Bieden jullie ook ondersteuning na de lancering?",
    answer:
      "Absoluut. Na de lancering blijf je bij ons terecht kunnen voor vragen, verbeteringen en technische ondersteuning. Geen ticketsysteem, geen callcenter — gewoon direct contact via e-mail of WhatsApp.",
  },
  {
    question: "Maken jullie ook apps?",
    answer:
      "Naast onze websitedienst bouwen we een groeiende collectie eigen apps: Geldinzicht, AbboBuddy, Brainox, InMandje, Vancoillie News, Taakflow, StockBuddy en meer. Dit zijn producten die we zelf ontwikkelen en beschikbaar stellen — geen dienst die we voor klanten uitvoeren.",
  },
  {
    question: "Hoe neem ik contact op?",
    answer:
      "Stuur een e-mail naar support@vancoilliestudio.be of gebruik het contactformulier op de website. We antwoorden zo snel mogelijk — meestal binnen de dag.",
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-neutral-200">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-base font-medium text-neutral-900">{question}</span>
        <span className="flex-none text-neutral-400">
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-neutral-500">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  return (
    <section className="bg-white px-8 md:px-28 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
            FAQ
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
            Veelgestelde <span className="italic">vragen.</span>
          </h2>
        </div>

        {/* Questions */}
        <div>
          {FAQS.map((faq) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-neutral-50 px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-neutral-900">Nog een vraag?</p>
            <p className="text-sm text-neutral-500 mt-1">We antwoorden meestal binnen de dag.</p>
          </div>
          <a
            href="/contact"
            className="flex-none rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-700 transition-colors"
          >
            Neem contact op
          </a>
        </div>
      </div>
    </section>
  );
}
