'use client';

import React from 'react';
import { Star } from 'lucide-react';

type ReviewCard = {
  name: string;
  initials: string;
  avatarColor: string;
  rating: number;
  text: string;
  date: string;
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-3.5 w-3.5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-zinc-200 text-zinc-200'}`}
      />
    ))}
  </div>
);

const Card = ({ card }: { card: ReviewCard }) => (
  <div className="p-4 rounded-xl mx-3 shadow-sm hover:shadow-md transition-all duration-200 w-72 shrink-0 bg-white border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800">
    <div className="flex gap-3 items-start">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white text-sm font-bold"
        style={{ backgroundColor: card.avatarColor }}
      >
        {card.initials}
      </div>
      <div className="flex flex-col min-w-0">
        <p className="font-semibold text-sm text-zinc-900 dark:text-white truncate">{card.name}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <StarRating rating={card.rating} />
          <span className="text-xs text-zinc-400">{card.date}</span>
        </div>
      </div>
    </div>
    <p className="text-sm mt-3 text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-4">
      {card.text}
    </p>
  </div>
);

function MarqueeRow({
  data,
  reverse = false,
  speed = 30,
}: {
  data: ReviewCard[];
  reverse?: boolean;
  speed?: number;
}) {
  const doubled = React.useMemo(() => [...data, ...data], [data]);
  return (
    <div className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 md:w-32 z-10 bg-gradient-to-r from-[#FAFAFA] to-transparent dark:from-[#0A0A0A]" />
      <div
        className={`flex w-max ${reverse ? 'pt-3 pb-6' : 'pt-6 pb-3'}`}
        style={{
          animation: `itHulpMarquee ${speed}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {doubled.map((c, i) => (
          <Card key={i} card={c} />
        ))}
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 md:w-32 z-10 bg-gradient-to-l from-[#FAFAFA] to-transparent dark:from-[#0A0A0A]" />
    </div>
  );
}

const ROW1: ReviewCard[] = [
  {
    name: 'Marleen Vanwest',
    initials: 'M',
    avatarColor: '#8B7355',
    rating: 5,
    date: '6 maanden geleden',
    text: 'Contact opgenomen ivm printerprobleem. Onmiddellijk reactie gekregen. Probleem opgelost de dag zelf. Uitleg in heldere taal. Rustig en heel vriendelijk. Warm aanbevolen.',
  },
  {
    name: 'RC GoesaertStaessen',
    initials: 'RC',
    avatarColor: '#5C7A9B',
    rating: 5,
    date: '2 maanden geleden',
    text: 'Fantastisch en vlug geholpen.',
  },
  {
    name: 'Iris Deknudt',
    initials: 'I',
    avatarColor: '#2E8B6B',
    rating: 5,
    date: '3 maanden geleden',
    text: 'Directe & snelle service! Heel vriendelijk, met goede uitleg.',
  },
  {
    name: 'Kristof Cassaert',
    initials: 'K',
    avatarColor: '#7B5EA7',
    rating: 5,
    date: '5 maanden geleden',
    text: 'Prima service! Enerzijds in het advies bij de keuze nieuwe laptop en anderzijds bij het overzetten van alle gegevens van de oude laptop naar de nieuwe. En alles heel snel afgehandeld.',
  },
  {
    name: 'Jean-Claude Alleman',
    initials: 'JC',
    avatarColor: '#4A7FA5',
    rating: 5,
    date: '6 maanden geleden',
    text: 'Super service! Mijn Outlook werkte niet goed, maar het probleem was binnen no-time opgelost. Heel tevreden!',
  },
  {
    name: 'Amylia Bauwens',
    initials: 'A',
    avatarColor: '#9B4F8E',
    rating: 5,
    date: '8 maanden geleden',
    text: 'Ik had een nieuwe laptop nodig voor school en met heel gerichte vragen gingen ze meteen aan de slag om de beste uit te kiezen. Er was geen vraag die ze niet konden beantwoorden. Uitstekende en snelle service.',
  },
  {
    name: 'Andres Vermeersch',
    initials: 'AV',
    avatarColor: '#4A6741',
    rating: 5,
    date: '9 maanden geleden',
    text: 'Heel vriendelijk en snelle service!',
  },
];

const ROW2: ReviewCard[] = [
  {
    name: 'Fien Van Brempt',
    initials: 'F',
    avatarColor: '#D4702A',
    rating: 5,
    date: 'een jaar geleden',
    text: 'Vlot, correct en Wifi bereik terug helemaal top!',
  },
  {
    name: 'Maxim V',
    initials: 'MV',
    avatarColor: '#3A6B8A',
    rating: 5,
    date: 'een jaar geleden',
    text: 'Heeft al mijn IT-gerelateerde vragen beantwoord en mij geholpen bij de aanschaf van een nieuwe PC, die hij helemaal van scratch heeft gebouwd. Zeer tevreden met de service en snelheid.',
  },
  {
    name: 'Francis Soete',
    initials: 'FS',
    avatarColor: '#6B7280',
    rating: 4,
    date: 'een jaar geleden',
    text: 'Op maat gemaakte desktop geleverd. Correct en best betaalbaar tov pre made pc\'s.',
  },
  {
    name: 'Elias Popescu',
    initials: 'EP',
    avatarColor: '#C0392B',
    rating: 5,
    date: 'een jaar geleden',
    text: 'Echt een aardige en vriendelijke man, hij weet hoe hij zijn werk moet doen. Ik beveel hem aan. Goed gedaan!',
  },
  {
    name: 'Claudine Vermeersch',
    initials: 'CV',
    avatarColor: '#5D7A6B',
    rating: 5,
    date: 'een jaar geleden',
    text: 'Heel vlug geholpen geweest. Probleem snel en doeltreffend opgelost.',
  },
  {
    name: 'Aden Vansevenant',
    initials: 'A',
    avatarColor: '#D4802A',
    rating: 5,
    date: 'een jaar geleden',
    text: 'Ik heb onlangs een vaste pc gekocht en had hulp nodig bij het kiezen van de onderdelen en het samenstellen ervan. Hij heeft me goed geholpen en heb nu een goeie pc voor een goeie prijs.',
  },
  {
    name: 'Remy Deschamps',
    initials: 'R',
    avatarColor: '#9B8050',
    rating: 5,
    date: 'een jaar geleden',
    text: "Enorm vriendelijk en geeft duidelijk advies in gewone mensentaal. Met zijn hulp bij het kiezen van de juiste apparatuur en ook de installatie ervan kan ik nu optimaal gebruik maken van mijn nieuwe fiber internet aan 'top speeds' doorheen het hele huis en dit alles aan een hele mooie prijs! Top service :)",
  },
];

export function ItHulpReviews({ locale = 'nl' }: { locale?: 'nl' | 'en' }) {
  const isEN = locale === 'en';
  return (
    <>
      <style>{`
        @keyframes itHulpMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <section className="w-full py-16 overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400 mb-3">
            Google Reviews
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
            {isEN ? 'What customers say' : 'Wat klanten zeggen'}
          </h2>
          <p className="mt-3 text-base text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            {isEN
              ? 'Real reviews from customers helped by Vancoillie IT Hulp.'
              : 'Echte reviews van klanten die geholpen werden door Vancoillie IT Hulp.'}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <MarqueeRow data={ROW1} reverse={false} speed={35} />
          <MarqueeRow data={ROW2} reverse={true} speed={35} />
        </div>
      </section>
    </>
  );
}
