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
    <main className="bg-[#f7f5f2] pb-24 pt-[calc(var(--nav-h)+5rem)] md:pb-32">
      <div className="studio-wrap studio-grid">
        <div className="col-span-12 lg:col-span-8 lg:col-start-3">
        <p className="studio-label mb-6">
          Juridisch
        </p>
        <h1 className="studio-display text-[#16181c]">
          {title}
        </h1>
        <p className="mt-5 font-mono text-[.75rem] text-[#8c9198]">{updatedAt}</p>
        <p className="studio-lead mt-10">{intro}</p>

        <div className="mt-16">
          {sections.map((section) => (
            <section key={section.title} className="border-t border-[#ded9d1] py-9">
              <h2 className="studio-h3 text-[#16181c]">
                {section.title}
              </h2>
              <div className="mt-5 space-y-4">
                {section.paragraphs.map((paragraph, index) => (
                  <p
                    key={`${section.title}-${index}`}
                    className="leading-8 text-[#5a5f66]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
        </div>
      </div>
    </main>
  );
}
