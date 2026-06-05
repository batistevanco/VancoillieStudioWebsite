"use client";

import { Star } from "lucide-react";

const REVIEWS = [
  {
    text: "Eindelijk weet ik waar mijn geld naartoe gaat. Geldinzicht geeft me in één oogopslag een overzicht van al mijn uitgaven — clean, snel en zonder gedoe.",
    author: "App Store Review",
    app: "Geldinzicht",
    stars: 5,
  },
  {
    text: "Ik had geen idee hoeveel abonnementen ik had lopen. AbboBuddy heeft mij echt doen schrikken — op een goede manier. Nu heb ik alles onder controle.",
    author: "App Store Review",
    app: "AbboBuddy",
    stars: 5,
  },
  {
    text: "Vancoillie News toont écht relevant nieuws. Geen clickbait, geen overbodige drama. Gewoon de zaken die er toe doen, overzichtelijk gepresenteerd.",
    author: "App Store Review",
    app: "Vancoillie News",
    stars: 5,
  },
  {
    text: "Je hebt vaak dat apps er zo ingewikkeld of outbollig uitzien, maar bij alle apps van Vancoillie Studio klopt de interface gewoon. Netjes en prettig in gebruik.",
    author: "App Store Review",
    app: "Vancoillie Studio",
    stars: 5,
  },
  {
    text: "Geldinzicht heeft mijn relatie met geld veranderd. Ik open het elke ochtend. De UI is zo clean dat het bijna plezierig is om je budget bij te houden.",
    author: "App Store Review",
    app: "Geldinzicht",
    stars: 5,
  },
  {
    text: "AbboBuddy is zo simpel maar zo nuttig. Ik betaalde maandenlang voor een abonnement dat ik vergeten was — nu nooit meer.",
    author: "App Store Review",
    app: "AbboBuddy",
    stars: 5,
  },
  {
    text: "Wat ik het meest waardeer aan de apps van Vancoillie Studio is dat ze doen wat ze beloven. Geen overbodige functies, gewoon kwaliteit.",
    author: "App Store Review",
    app: "Vancoillie Studio",
    stars: 5,
  },
  {
    text: "Vancoillie News filtert het nieuws op een manier die ik zelf nooit zou kunnen. Alleen de dingen die écht belangrijk zijn, zonder de rommel.",
    author: "App Store Review",
    app: "Vancoillie News",
    stars: 5,
  },
];

function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
  return (
    <div className="flex-none w-72 md:w-80 rounded-2xl bg-white p-6 shadow-sm border border-neutral-100 flex flex-col gap-4">
      {/* Stars */}
      <div className="flex gap-0.5">
        {[...Array(review.stars)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-orange-500 text-orange-500" />
        ))}
      </div>

      {/* Text */}
      <p className="text-sm leading-relaxed text-neutral-700 flex-1">
        "{review.text}"
      </p>

      {/* Footer */}
      <div className="flex items-center gap-2 pt-2 border-t border-neutral-100">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900">
          <svg viewBox="0 0 24 24" className="h-3 w-3 fill-white">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
        </div>
        <div>
          <p className="text-xs font-semibold text-neutral-900">{review.app}</p>
          <p className="text-xs text-neutral-400">{review.author}</p>
        </div>
      </div>
    </div>
  );
}

export function ReviewsSection() {
  // Duplicate reviews for seamless loop
  const doubled = [...REVIEWS, ...REVIEWS];

  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden">
      {/* Header */}
      <div className="px-8 md:px-28 mb-14 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
          Reviews
        </p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
          Van de <span className="italic">eerste gebruikers.</span>
        </h2>
        <p className="mt-4 text-base text-neutral-500 max-w-md mx-auto">
          Eerlijke reacties van mensen die onze apps dagelijks gebruiken.
        </p>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

        <div className="flex gap-5 animate-marquee">
          {doubled.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
