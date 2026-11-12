import Image from "next/image";
import Link from "next/link";

const FACTS = [
  { value: "Op maat", label: "geen templates" },
  { value: "1–3 weken", label: "tot livegang" },
  { value: "Vanaf €249", label: "eenmalig" },
];

export function HeroHome() {
  return (
    <section data-island="Studio" className="hero theme-dark">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="label-in text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-white/60">Vancoillie Studio · Roeselare</p>
          <h1 className="label-in mt-4 text-[clamp(3rem,5.4vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white">
            Jouw idee.
            <br />
            Onze code.
          </h1>
          <p className="line-in mt-6 max-w-[32rem] text-[1.1875rem] leading-snug text-white/75" style={{ "--i": 1 } as React.CSSProperties}>
            Websites op maat voor zelfstandigen en kleine bedrijven, en eigen apps voor iPhone. Eén aanspreekpunt, van eerste gesprek tot lancering.
          </p>
          <div className="line-in mt-8 flex flex-wrap gap-3" style={{ "--i": 2 } as React.CSSProperties}>
            <Link href="/contact" className="btn bg-white text-[#0c1a2e] hover:bg-white">
              Neem contact op
            </Link>
            <Link href="/websites" className="btn glass">
              Bekijk websites
            </Link>
          </div>

          <dl className="line-in hero-facts" style={{ "--i": 3 } as React.CSSProperties}>
            {FACTS.map(({ value, label }) => (
              <div key={value}>
                <dt className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-white">{value}</dt>
                <dd className="mt-0.5 text-[0.8125rem] text-white/60">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="browser">
            <div className="browser__bar">
              <span className="browser__dots"><i /><i /><i /></span>
              <span className="browser__url">batistevancoillie.be</span>
            </div>
            <div className="browser__screen">
              <Image
                src="/afbeeldingen/hero/website-appstore.webp"
                alt=""
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 92vw, 46rem"
                className="object-cover object-top"
              />
            </div>
          </div>
          <div className="hero-iphone">
            <div className="hero-iphone__screen">
              <Image src="/afbeeldingen/hero/geldinzicht.webp" alt="" fill sizes="12rem" className="object-cover object-top" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
