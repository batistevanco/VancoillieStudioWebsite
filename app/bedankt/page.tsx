import { Header } from "@/components/ui/header-2";
import { getCopy } from "@/lib/i18n";
import { getLocalizedPath } from "@/lib/routes";

export default function BedanktPage() {
  const content = getCopy("nl").thankYou;

  return (
    <>
      <Header />
      <main className="px-4 py-24">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-border/70 bg-white p-10 text-center shadow-sm md:p-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-brand">
            {content.eyebrow}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {content.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            {content.description}
          </p>
          <div className="mt-10">
            <a
              href={getLocalizedPath("nl", "home")}
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {content.backHome}
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
