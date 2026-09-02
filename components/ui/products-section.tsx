"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PRODUCTS = [
  { name: "Brainox", line: "Notities via tekst of stem, automatisch geordend.", image: "/afbeeldingen/ProductShowcase/BrainoxShowcase1.png", href: "/brainox" },
  { name: "AbboBuddy", line: "Eenvoudig overzicht over al je abonnementen.", image: "/afbeeldingen/ProductShowcase/AbboBuddyShowcase.png", href: "/abbo" },
  { name: "Vancoillie News", line: "Relevant nieuws zonder clickbait of ruis.", image: "/afbeeldingen/ProductShowcase/VancoillieNewsShowcase3.png", href: "/news" },
  { name: "InMandje", line: "Gedeelde boodschappenlijstjes voor je huishouden.", image: "/afbeeldingen/ProductShowcase/InMandjeShowcase4.png", href: "/inmandje" },
];

export function ProductsSection() {
  const [active, setActive] = useState(0);
  return (
    <section className="studio-band-xl border-t border-[#ded9d1] bg-[#f7f5f2]">
      <div className="studio-wrap"><header className="max-w-3xl"><p className="studio-label">Eigen producten</p><h2 className="studio-h2 mt-6">Apps die het werk doen.</h2><p className="studio-lead mt-6">Een groeiende collectie digitale producten, ontwikkeld vanuit echte dagelijkse noden.</p></header>
        <div className="studio-grid mt-14 md:mt-20">
          <ul className="col-span-12 border-b border-[#ded9d1] lg:col-span-7">{PRODUCTS.map((product, i) => <li key={product.name}><Link href={product.href} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className="group grid grid-cols-[2.5rem_1fr_1.5rem] gap-4 border-t border-[#ded9d1] py-7 sm:grid-cols-[3.5rem_1fr_2rem] sm:py-8"><span className={`pt-1 font-mono text-[.75rem] ${active === i ? "text-[#16181c]" : "text-[#8c9198]"}`}>0{i + 1}</span><span><span className="studio-h3 block transition-transform duration-500 group-hover:translate-x-1.5">{product.name}</span><span className="mt-2.5 block max-w-[46ch] text-[.9375rem] text-[#5a5f66]">{product.line}</span></span><ArrowRight className="mt-2 h-[18px] w-[18px] text-[#8c9198] transition-all group-hover:translate-x-1 group-hover:text-[#0a58f6]" /></Link></li>)}</ul>
          <div className="col-span-5 hidden lg:col-start-9 lg:block"><div className="sticky top-[calc(var(--nav-h)+3rem)]"><div className="studio-frame relative aspect-[4/5]">{PRODUCTS.map((product, i) => <Image key={product.name} src={product.image} alt="" fill className={`object-cover transition-all duration-700 ${active === i ? "scale-100 opacity-100" : "pointer-events-none scale-[1.02] opacity-0"}`} />)}</div><p className="mt-3 flex justify-between font-mono text-[.6875rem] uppercase tracking-[.08em] text-[#8c9198]"><span>{PRODUCTS[active].name}</span><span>0{active + 1} / 0{PRODUCTS.length}</span></p></div></div>
        </div>
        <Link href="/apps" className="studio-btn studio-btn-ink mt-12">Bekijk alle apps <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}
