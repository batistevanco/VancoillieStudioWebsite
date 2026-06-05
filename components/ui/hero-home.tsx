"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";

export function HeroHome() {
  return (
    <section className="relative min-h-screen w-full flex flex-col md:block bg-[#0a0a0a] overflow-hidden">
      {/* Image Container */}
      <div className="relative w-full h-[46vh] md:absolute md:inset-0 md:h-full z-0">
        <Image
          src="/afbeeldingen/HeroWidth.png"
          alt="Vancoillie Studio"
          fill
          priority
          className="object-cover object-[25%_center] md:object-[65%_center] lg:object-[60%_center] xl:object-[55%_center] 2xl:object-[50%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r md:from-black/40 md:via-transparent" />
      </div>

      {/* Navbar */}
      <div className="absolute inset-x-0 top-0 z-30">
        <Navbar variant="overlay" />
      </div>

      {/* Hero text */}
      <div className="relative md:absolute inset-0 z-20 flex flex-col justify-center px-6 py-10 md:py-0 md:px-16 bg-[#0a0a0a] md:bg-transparent flex-grow">
        <div className="mr-auto max-w-xl w-full md:translate-y-10">
          <h1 className="text-4xl sm:text-5xl font-semibold leading-[1.1] tracking-tight text-white md:text-7xl">
            Jouw idee.<br />Onze code.
          </h1>
          <p className="mt-4 max-w-sm text-sm sm:text-base text-white/80 md:text-lg">
            Vancoillie Studio bouwt websites op maat voor jouw zaak — en ontwikkelt daarnaast eigen apps die je dagelijks leven eenvoudiger maken.
          </p>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-white/90 hover:scale-[1.02]"
            >
              Neem contact op
            </Link>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-white text-white" />
              ))}
            </div>
            <span className="text-sm text-white/80">5/5 van onze klanten</span>
          </div>
        </div>
      </div>
    </section>
  );
}
