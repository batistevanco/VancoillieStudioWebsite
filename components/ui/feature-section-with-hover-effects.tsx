import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

type FeatureItem = {
  title: string;
  description: string;
};

const iconMap = [
  IconTerminal2,
  IconEaseInOut,
  IconCurrencyDollar,
  IconCloud,
  IconRouteAltLeft,
  IconHelp,
  IconAdjustmentsBolt,
  IconHeart,
];

export function FeaturesSectionWithHoverEffects({
  heading,
  features,
}: {
  heading: string;
  features: readonly FeatureItem[];
}) {
  return (
    <section className="bg-white px-6 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-zinc-950 md:text-5xl">
            {heading}
          </h2>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = iconMap[index % iconMap.length];

            return (
              <Feature
                key={feature.title}
                index={index}
                title={feature.title}
                description={feature.description}
                icon={<Icon className="h-6 w-6" strokeWidth={1.7} />}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Feature({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) {
  return (
    <div
      className={cn(
        "group/feature relative flex flex-col border-zinc-200 py-10",
        "md:min-h-[250px]",
        "lg:border-r",
        (index === 0 || index === 4) && "lg:border-l",
        index < 4 && "lg:border-b",
      )}
    >
      {index < 4 ? (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-zinc-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100" />
      ) : (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-zinc-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100" />
      )}

      <div className="relative z-10 mb-4 px-10 text-zinc-500">{icon}</div>
      <div className="relative z-10 mb-3 px-10 text-lg font-bold">
        <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-br-full rounded-tr-full bg-zinc-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-blue-500" />
        <span className="inline-block text-zinc-900 transition duration-200 group-hover/feature:translate-x-2">
          {title}
        </span>
      </div>
      <p className="relative z-10 max-w-xs px-10 text-sm leading-7 text-zinc-600">
        {description}
      </p>
    </div>
  );
}
