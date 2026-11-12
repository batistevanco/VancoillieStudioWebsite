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
    <figure className="tile flex w-[19rem] flex-none flex-col gap-4 bg-[var(--paper)] p-7 md:w-[22rem]">
      <div className="flex gap-0.5" aria-label={`${review.stars} van 5 sterren`}>
        {[...Array(review.stars)].map((_, i) => (
          <Star key={i} className="size-4 fill-[#ff9f0a] text-[#ff9f0a]" aria-hidden="true" />
        ))}
      </div>
      <blockquote className="flex-1 text-[1.0625rem] leading-relaxed">“{review.text}”</blockquote>
      <figcaption className="text-sm">
        <span className="font-semibold">{review.app}</span>
        <span className="text-ink-soft"> · {review.author}</span>
      </figcaption>
    </figure>
  );
}

export function ReviewsSection() {
  const doubled = [...REVIEWS, ...REVIEWS];

  return (
    <section data-island="Reviews" className="studio-reviews theme-light overflow-hidden bg-white py-[var(--space-section)]">
      <div className="mx-auto max-w-[80rem] px-[var(--space-gutter)]">
        <p className="kicker reveal">Reviews</p>
        <h2 className="reveal mt-2 text-[length:var(--font-size-display)] font-semibold leading-none tracking-[-0.035em]">
          Van de eerste gebruikers.
        </h2>
        <p className="reveal mt-5 max-w-[var(--measure)] text-lg leading-snug text-ink-soft">
          Reacties van mensen die onze apps dagelijks gebruiken.
        </p>
      </div>

      <div className="relative mt-12 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="animate-marquee flex gap-4">
          {doubled.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
