const STRENGTHS = [
  ["01", "Gebouwd voor de lange termijn", "Geen templates of shortcuts. Elk product wordt schaalbaar, snel en toekomstbestendig gebouwd."],
  ["02", "Snel live, zonder gedoe", "Van eerste gesprek tot live product. Wij regelen techniek, hosting en onderhoud."],
  ["03", "Eén aanspreekpunt", "Je praat rechtstreeks met de persoon die jouw product ontwerpt en bouwt."],
];

export function StrengthsSection() {
  return (
    <section className="studio-band-lg bg-[#16181c] text-[#f7f5f2]">
      <div className="studio-wrap studio-grid gap-y-12">
        <div className="col-span-12 lg:col-span-4"><p className="studio-label !text-[#a0a5ac]">Waarom Vancoillie Studio</p><h2 className="studio-h2 mt-6 text-[#f7f5f2]">Gebouwd voor <em className="text-[#a0a5ac]">resultaat.</em></h2></div>
        <ol className="col-span-12 lg:col-span-7 lg:col-start-6">
          {STRENGTHS.map(([num, title, text]) => <li key={num} className="grid gap-4 border-t border-[#31353b] py-8 sm:grid-cols-[3.5rem_1fr]"><span className="font-mono text-[.75rem] text-[#a0a5ac]">{num}</span><div><h3 className="studio-h3 text-[#f7f5f2]">{title}</h3><p className="mt-4 max-w-[52ch] text-[1rem] leading-[1.68] text-[#a0a5ac]">{text}</p></div></li>)}
        </ol>
      </div>
    </section>
  );
}
