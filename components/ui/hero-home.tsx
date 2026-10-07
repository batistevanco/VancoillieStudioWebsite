"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Star } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";

export function HeroHome() {
  return (
    <section className="studio-landing-hero">
      <Navbar variant="overlay" />
      <div className="studio-landing-hero__surface">
        <div className="studio-landing-hero__composition" aria-hidden="true">
          <span className="studio-landing-hero__wordmark">STUDIO</span>
          <div className="studio-landing-hero__gradient" />
          <div className="studio-landing-hero__art">
            <Image src="/afbeeldingen/studio-sculpture.png" alt="" fill priority sizes="(max-width: 700px) 100vw, 65vw" className="object-contain object-center" />
          </div>
        </div>
        <div className="studio-landing-hero__bottom">
          <div className="studio-landing-hero__copy">
            <span className="studio-eyebrow">Websites · Apps · Software</span>
            <h1>Jouw idee.<br />Onze code.</h1>
            <p>Vancoillie Studio bouwt websites op maat voor jouw zaak — en ontwikkelt daarnaast eigen apps die je dagelijks leven eenvoudiger maken.</p>
            <div className="studio-landing-hero__rating" aria-label="4,9 op 5 van onze klanten">
              <span aria-hidden="true">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={14} fill="currentColor" />)}</span>
              4,9/5 van onze klanten
            </div>
          </div>
          <div className="studio-landing-hero__actions">
            <Link href="/contact" className="studio-pill-link">Neem contact op <ArrowUpRight size={21} /></Link>
            <a href="#about" className="studio-discover-link">Ontdek meer <ArrowDown size={17} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
