"use client";
import { useState } from "react";
import Link from "next/link";

const FAQS = [
  ["Wat doet Vancoillie Studio precies?", "We bouwen websites op maat voor zelfstandigen en kleine bedrijven en ontwikkelen daarnaast eigen iPhone-apps en softwareproducten."],
  ["Hoeveel kost een website?", "We hebben drie pakketten: Starter (€249), Growth (€549) en Compleet (€749). We bespreken vooraf helder wat binnen jouw project past."],
  ["Is hosting en domeinnaam inbegrepen?", "Bij het Compleet pakket wel. Bij Starter en Growth regelen we de technische kant en bespreken we de afzonderlijke kosten vooraf."],
  ["Hoe lang duurt het om een website te bouwen?", "Afhankelijk van de complexiteit en feedback is een website gemiddeld binnen één tot drie weken live."],
  ["Kan ik mijn website zelf aanpassen?", "Dat spreken we samen af. Voor kleine aanpassingen helpen we rechtstreeks; voor grotere sites kunnen we een beheerpaneel voorzien."],
  ["Bieden jullie ondersteuning na de lancering?", "Ja. Je blijft rechtstreeks bij ons terechtkunnen voor vragen, verbeteringen en technische ondersteuning."],
];

export function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <section className="studio-band-md border-y border-[#cec7bc] bg-[#efebe5]">
      <div className="studio-wrap studio-grid gap-y-10"><div className="col-span-12 lg:col-span-4"><p className="studio-label">Vragen</p><h2 className="studio-h2 mt-6">Veelgestelde vragen.</h2></div><div className="col-span-12 lg:col-span-7 lg:col-start-6">{FAQS.map(([q, a], i) => { const expanded = open === i; return <div key={q} className="border-t border-[#cec7bc] last:border-b"><button type="button" onClick={() => setOpen(expanded ? -1 : i)} aria-expanded={expanded} className="flex w-full items-center justify-between gap-6 py-6 text-left"><span className="text-[1.125rem] font-semibold">{q}</span><span className="relative h-3 w-3 shrink-0"><span className="absolute left-0 top-1/2 h-px w-3 bg-[#16181c]"/><span className={`absolute left-1/2 top-0 h-3 w-px bg-[#16181c] transition-transform ${expanded ? "scale-y-0" : "scale-y-100"}`}/></span></button><div className="grid transition-[grid-template-rows] duration-300" style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}><div className="overflow-hidden"><p className="max-w-[62ch] pb-7 pr-6 text-[1rem] leading-[1.68] text-[#5a5f66]">{a}</p></div></div></div>; })}<div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-[#cec7bc] pt-7 sm:flex-row sm:items-center"><div><p className="font-semibold">Nog een vraag?</p><p className="mt-1 text-sm text-[#5a5f66]">We antwoorden meestal binnen de dag.</p></div><Link href="/contact" className="studio-btn studio-btn-ink">Neem contact op</Link></div></div></div>
    </section>
  );
}
