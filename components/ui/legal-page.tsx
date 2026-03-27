interface LegalSection {
  title: string;
  paragraphs: string[];
}

interface LegalPageProps {
  title: string;
  updatedAt: string;
  intro: string;
  sections: LegalSection[];
}

export function LegalPage({
  title,
  updatedAt,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <main className="bg-white px-4 py-20 md:px-6 md:py-24">
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-brand">
          Juridisch
        </p>
        <h1 className="text-4xl font-semibold tracking-[-0.04em] text-zinc-950 md:text-6xl">
          {title}
        </h1>
        <p className="mt-4 text-sm text-zinc-500">{updatedAt}</p>
        <p className="mt-8 text-lg leading-8 text-zinc-600">{intro}</p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-semibold text-zinc-950">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph, index) => (
                  <p
                    key={`${section.title}-${index}`}
                    className="leading-8 text-zinc-600"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
