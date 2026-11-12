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
    <main className="studio-legal theme-light bg-white px-[var(--space-gutter)] pb-[var(--space-section)]">
      <div className="mx-auto max-w-4xl">
        <p className="kicker mb-2">
          Juridisch
        </p>
        <h1 className="text-ink">
          {title}
        </h1>
        <p className="mt-4 text-sm text-ink-faint">{updatedAt}</p>
        <p className="mt-8 max-w-[var(--measure)] text-xl leading-snug text-ink-soft">{intro}</p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-semibold text-ink">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph, index) => (
                  <p
                    key={`${section.title}-${index}`}
                    className="max-w-[var(--measure)] leading-relaxed text-ink-soft"
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
