import React from "react";

import { getCopy } from "@/lib/i18n";
import type { Locale } from "@/lib/routes";
import { Timeline } from "@/components/ui/timeline";

export function TimelineDemo({ locale = "nl" }: { locale?: Locale }) {
  const content = getCopy(locale).about;
  const data = content.entries.map((entry) => ({
    id: entry.id,
    title: entry.title,
    content: (
      <div>
        {"paragraphs" in entry
          ? entry.paragraphs.map((paragraph, index) => (
              <p
                key={`${entry.id}-paragraph-${index}`}
                className="mb-8 text-xs font-normal text-neutral-800 md:text-sm"
              >
                {paragraph}
              </p>
            ))
          : null}
        {"intro" in entry ? (
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm">
            {entry.intro}
          </p>
        ) : null}
        {"bullets" in entry ? (
          <div className="mb-8 space-y-2">
            {entry.bullets.map((item, index) => (
              <div
                key={`${entry.id}-bullet-${index}`}
                className="text-xs text-neutral-700 md:text-sm"
              >
                {item}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    ),
  }));

  return (
    <div className="w-full">
      <Timeline
        data={data}
        heading={content.heading}
        description={content.description}
      />
    </div>
  );
}
