import { Code2, Zap, HeartHandshake } from "lucide-react";

const STRENGTHS = [
  {
    icon: Code2,
    title: "Gebouwd voor de lange termijn.",
    description:
      "Geen templates, geen shortcuts. Je website wordt volledig op maat gebouwd: schaalbaar, snel en toekomstbestendig.",
  },
  {
    icon: Zap,
    title: "Snel live, zonder gedoe.",
    description:
      "Van eerste gesprek tot live product. Wij regelen hosting, domeinnaam en onderhoud, jij focust op je zaak.",
  },
  {
    icon: HeartHandshake,
    title: "Eén aanspreekpunt.",
    description:
      "Geen groot agency met wisselende gezichten. Je praat rechtstreeks met de persoon die je product bouwt.",
  },
];

const SPECS = [
  { label: "Diensten", value: "Websites op maat, iPhone-apps, software" },
  { label: "Werkwijze", value: "Eén aanspreekpunt, van eerste gesprek tot lancering" },
  { label: "Doorlooptijd", value: "Meestal 1 tot 3 weken voor een website" },
  { label: "Prijzen", value: "Eenmalig, vanaf €249" },
  { label: "Locatie", value: "Roeselare, België" },
];

export function StrengthsSection() {
  return (
    <section data-island="Waarom" className="studio-strengths theme-light py-[var(--space-section)]">
      <div className="mx-auto max-w-[80rem] px-[var(--space-gutter)]">
        <p className="kicker reveal">Waarom Vancoillie Studio</p>
        <h2 className="reveal mt-2 text-[length:var(--font-size-display)] font-semibold leading-none tracking-[-0.035em]">
          Gebouwd voor resultaat.
        </h2>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {STRENGTHS.map(({ icon: Icon, title, description }) => (
            <article key={title} className="tile reveal flex flex-col p-8">
              <Icon className="size-8 text-signal" strokeWidth={1.75} aria-hidden="true" />
              <h3 className="mt-10 text-[length:var(--font-size-title)] font-semibold leading-tight tracking-[-0.03em]">{title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{description}</p>
            </article>
          ))}
        </div>

        <div className="reveal mt-[var(--space-section)] grid gap-6 lg:grid-cols-[minmax(0,20rem)_1fr]">
          <h3 className="text-[length:var(--font-size-title)] font-semibold tracking-[-0.03em]">In het kort</h3>
          <dl className="divide-y divide-rule border-y border-rule">
            {SPECS.map(({ label, value }) => (
              <div key={label} className="grid gap-1 py-5 sm:grid-cols-[12rem_1fr]">
                <dt className="font-semibold">{label}</dt>
                <dd className="text-ink-soft">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
