"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";

const FAQS = [
  {
    question: "Wat doet Vancoillie Studio precies?",
    answer:
      "Vancoillie Studio bouwt websites op maat voor zelfstandigen en kleine bedrijven, en ontwikkelt daarnaast eigen iPhone-apps en softwareproducten. Van een eenvoudige onepager tot een volledige webapplicatie: alles wordt op maat gebouwd, zonder templates.",
  },
  {
    question: "Hoeveel kost een website?",
    answer:
      "Er zijn drie pakketten: Starter (€249 eenmalig) voor een professionele onepager, Growth (€549 eenmalig) voor 3 tot 5 pagina's met custom design, en Compleet (€749 eenmalig) waarbij hosting en domeinnaam inbegrepen zijn. Alle prijzen zijn eenmalig, zonder verborgen maandelijkse kosten.",
  },
  {
    question: "Is hosting en domeinnaam inbegrepen?",
    answer:
      "Bij het Compleet-pakket zijn hosting en domeinnaam volledig inbegrepen. Bij Starter en Growth regelen we de technische kant, maar de hosting- en domeinkosten zijn apart. We helpen je wel bij elke stap.",
  },
  {
    question: "Hoe lang duurt het om een website te bouwen?",
    answer:
      "Afhankelijk van de complexiteit en hoe snel je feedback geeft, staat een website gemiddeld binnen 1 tot 3 weken live. We houden je op de hoogte tijdens het hele proces.",
  },
  {
    question: "Kan ik mijn website achteraf zelf aanpassen?",
    answer:
      "Dat bespreken we samen. Voor kleine aanpassingen neem je gewoon contact op. Voor grotere wijzigingen of een eigen beheerpaneel zoeken we de beste oplossing op maat.",
  },
  {
    question: "Bieden jullie ondersteuning na de lancering?",
    answer:
      "Ja. Na de lancering kun je bij ons terecht voor vragen, verbeteringen en technische ondersteuning. Geen ticketsysteem of callcenter, gewoon direct contact via e-mail of WhatsApp.",
  },
  {
    question: "Maken jullie ook apps?",
    answer:
      "Naast websites bouwen we een groeiende collectie eigen apps: Geldinzicht, AbboBuddy, Brainox, InMandje, Vancoillie News, Taakflow, StockBuddy en meer. Dat zijn producten die we zelf ontwikkelen, geen dienst voor klanten.",
  },
  {
    question: "Hoe neem ik contact op?",
    answer: "Stuur een e-mail naar info@vancoli.be. We antwoorden meestal binnen de dag.",
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="border-b border-rule" data-open={open}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="text-xl font-semibold tracking-[-0.02em]">{question}</span>
        <Plus className="accordion-icon size-5 flex-none text-ink-soft" aria-hidden="true" />
      </button>
      <div id={id} className="accordion-body" data-open={open} role="region">
        <div>
          <p className="max-w-[var(--measure)] pb-6 text-lg leading-snug text-ink-soft">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FaqSection() {
  return (
    <section id="faq" data-island="FAQ" className="studio-faq theme-light py-[var(--space-section)]">
      <div className="mx-auto grid max-w-[80rem] gap-12 px-[var(--space-gutter)] lg:grid-cols-[minmax(0,26rem)_1fr]">
        <div>
          <p className="kicker reveal">FAQ</p>
          <h2 className="reveal mt-2 text-[length:var(--font-size-display)] font-semibold leading-none tracking-[-0.035em]">
            Veelgestelde vragen.
          </h2>
          <p className="reveal mt-5 text-lg leading-snug text-ink-soft">
            Nog een vraag? We antwoorden meestal binnen de dag.
          </p>
          <a href="/contact" className="btn btn-primary reveal mt-8">
            Neem contact op
          </a>
        </div>
        <div className="border-t border-rule">
          {FAQS.map((faq) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
