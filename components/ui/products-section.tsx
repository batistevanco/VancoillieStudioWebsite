import Image from "next/image";
import Link from "next/link";

const PRODUCTS = [
  {
    name: "Brainox",
    tagline: "Denk het. Brainox doet de rest.",
    description: "Notities via tekst of stem. Brainox transcribeert alles en houdt je gedachten geordend.",
    image: "/afbeeldingen/ProductShowcase/BrainoxShowcase1.png",
    href: "/brainox",
  },
  {
    name: "AbboBuddy",
    tagline: "Grip op je abonnementen.",
    description: "Overzicht over alles wat je betaalt. Nooit meer verrast door een onverwachte afschrijving.",
    image: "/afbeeldingen/ProductShowcase/AbboBuddyShowcase.png",
    href: "/abbo",
  },
  {
    name: "Vancoillie News",
    tagline: "Nieuws op jouw manier.",
    description: "Het laatste nieuws, gefilterd op wat jij belangrijk vindt. Snel, overzichtelijk en zonder ruis.",
    image: "/afbeeldingen/ProductShowcase/VancoillieNewsShowcase3.png",
    href: "/news",
  },
  {
    name: "InMandje",
    tagline: "Slimmer boodschappen doen.",
    description: "Maak en deel boodschappenlijstjes met je huishouden. Altijd weten wat er nog moet gekocht worden.",
    image: "/afbeeldingen/ProductShowcase/InMandjeShowcase4.png",
    href: "/inmandje",
  },
];

export function ProductsSection() {
  return (
    <section id="apps" data-island="Apps" className="studio-products theme-dark py-[var(--space-section)]">
      <div className="mx-auto max-w-[80rem] px-[var(--space-gutter)]">
        <p className="kicker reveal">Eigen producten</p>
        <div className="reveal mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-[length:var(--font-size-display)] font-semibold leading-none tracking-[-0.035em]">
            Apps die het werk doen.
          </h2>
          <Link href="/apps" className="link-signal shrink-0 text-lg">
            Bekijk alle apps <span aria-hidden="true">›</span>
          </Link>
        </div>
      </div>

      <div className="scrollbar-hide mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[var(--space-gutter)] px-[max(var(--space-gutter),calc((100vw_-_80rem)/2_+_var(--space-gutter)))] pb-4">
        {PRODUCTS.map((product) => (
          <Link
            key={product.name}
            href={product.href}
            className="tile press group relative flex w-[82vw] shrink-0 snap-start flex-col overflow-hidden sm:w-[26rem]"
          >
            <div className="p-8 pb-6">
              <p className="micro-label">{product.name}</p>
              <h3 className="mt-2 text-[length:var(--font-size-title)] font-semibold leading-tight tracking-[-0.03em]">
                {product.tagline}
              </h3>
              <p className="mt-3 text-ink-soft">{product.description}</p>
            </div>
            <div className="relative mt-auto aspect-[4/3] overflow-hidden">
              <Image
                src={product.image}
                alt={`${product.name} op iPhone`}
                fill
                sizes="(max-width: 640px) 82vw, 26rem"
                className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
