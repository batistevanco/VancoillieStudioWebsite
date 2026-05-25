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
    <section className="relative bg-transparent px-6 py-28 lg:py-36 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 -z-10 h-80 w-80 rounded-full bg-blue-500/5 blur-[120px]" />
      <div className="absolute bottom-1/3 left-1/4 -z-10 h-80 w-80 rounded-full bg-indigo-500/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="mb-16 max-w-3xl">
          <h2 className="text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-5xl lg:text-6xl">
            {heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = iconMap[index % iconMap.length];

            return (
              <Feature
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={<Icon className="h-6 w-6 stroke-[1.5]" />}
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
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-[2rem] border border-zinc-200/50 bg-white/45 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.015)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:border-white/5 dark:bg-white/[0.02] dark:hover:bg-white/[0.04] min-h-[260px]"
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700 transition-colors group-hover:bg-brand group-hover:text-white dark:bg-zinc-900 dark:text-zinc-400">
        {icon}
      </div>
      
      <div className="mt-8 flex flex-col gap-2.5">
        <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
          <span className="inline-block transition duration-200">
            {title}
          </span>
        </h3>
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      </div>
    </div>
  );
}
