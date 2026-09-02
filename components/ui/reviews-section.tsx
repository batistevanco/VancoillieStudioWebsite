import { Star } from "lucide-react";

const REVIEWS = [
  ["Eindelijk weet ik waar mijn geld naartoe gaat. Geldinzicht geeft me in één oogopslag een overzicht van al mijn uitgaven — clean, snel en zonder gedoe.", "Geldinzicht"],
  ["Ik had geen idee hoeveel abonnementen ik had lopen. AbboBuddy heeft mij echt doen schrikken — op een goede manier.", "AbboBuddy"],
  ["De apps doen wat ze beloven. Geen overbodige functies, gewoon kwaliteit en een interface die prettig werkt.", "Vancoillie Studio"],
  ["Vancoillie News toont relevant nieuws zonder clickbait of ruis. Overzichtelijk gepresenteerd.", "Vancoillie News"],
];

function Stars() { return <span className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-[#e0a32e] text-[#e0a32e]" />)}</span>; }

export function ReviewsSection() {
  return (
    <section className="studio-band-lg bg-[#f7f5f2]">
      <div className="studio-wrap">
        <header className="studio-grid items-end gap-y-8"><div className="col-span-12 lg:col-span-7"><p className="studio-label">Reviews</p><h2 className="studio-h2 mt-6">Van de <em>eerste gebruikers.</em></h2></div><div className="col-span-12 border-t border-[#ded9d1] pt-5 sm:col-span-6 lg:col-span-3 lg:col-start-10"><div className="flex items-baseline gap-3"><span className="text-4xl font-medium tracking-[-.04em]">4,9</span><Stars /></div><p className="mt-2 text-sm text-[#5a5f66]">App Store beoordelingen</p></div></header>
        <div className="studio-grid mt-14 gap-y-10 md:mt-20">
          <figure className="col-span-12 border-t border-[#16181c] pt-8 lg:col-span-7"><blockquote className="text-[clamp(1.5rem,2.7vw,2.45rem)] font-medium italic leading-[1.34] tracking-[-.028em]">“{REVIEWS[0][0]}”</blockquote><figcaption className="mt-6 font-mono text-[.6875rem] uppercase tracking-[.14em] text-[#8c9198]">{REVIEWS[0][1]} · App Store review</figcaption></figure>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">{REVIEWS.slice(1).map(([text, app]) => <figure key={app} className="border-t border-[#ded9d1] py-7"><Stars /><blockquote className="mt-4 text-[.9375rem] leading-[1.62] text-[#5a5f66]">“{text}”</blockquote><figcaption className="mt-4 font-mono text-[.6875rem] uppercase tracking-[.14em] text-[#8c9198]">{app}</figcaption></figure>)}</div>
        </div>
      </div>
    </section>
  );
}
