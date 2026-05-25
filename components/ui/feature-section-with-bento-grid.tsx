import {
  Globe,
  Search,
  Server,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface BentoItem {
  title: string;
  description: string;
}

interface FeatureSectionWithBentoGridProps {
  badge?: string;
  title: string;
  description: string;
  items: readonly BentoItem[];
}

const iconMap: LucideIcon[] = [Server, Globe, Wrench, Search];

export function FeatureSectionWithBentoGrid({
  badge,
  title,
  description,
  items,
}: FeatureSectionWithBentoGridProps) {
  const [first, second, third, fourth] = items;

  return (
    <section className="relative w-full py-20 lg:py-32 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -z-10 h-72 w-72 rounded-full bg-blue-500/5 blur-[100px]" />
      <div className="absolute bottom-10 right-1/4 -z-10 h-80 w-80 rounded-full bg-purple-500/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-start gap-4">
            {badge ? (
              <div>
                <Badge className="bg-zinc-100 text-zinc-800 hover:bg-zinc-100 border-none px-3 py-1 text-xs tracking-wider uppercase font-medium dark:bg-zinc-900 dark:text-zinc-300">
                  {badge}
                </Badge>
              </div>
            ) : null}

            <div className="flex flex-col gap-4">
              <h2 className="max-w-xl text-left text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl md:text-5xl">
                {title}
              </h2>
              <p className="max-w-xl text-left text-base leading-relaxed text-zinc-500 dark:text-zinc-400 lg:max-w-lg">
                {description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {first ? (
              <BentoCard
                item={first}
                icon={iconMap[0]}
                className="min-h-[240px] lg:col-span-2"
              />
            ) : null}
            {second ? (
              <BentoCard item={second} icon={iconMap[1]} className="min-h-[240px]" />
            ) : null}
            {third ? (
              <BentoCard item={third} icon={iconMap[2]} className="min-h-[240px]" />
            ) : null}
            {fourth ? (
              <BentoCard
                item={fourth}
                icon={iconMap[3]}
                className="min-h-[240px] lg:col-span-2"
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  item,
  icon: Icon,
  className,
}: {
  item: BentoItem;
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <div
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-zinc-200/50 bg-white/45 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:border-white/5 dark:bg-white/[0.02] dark:hover:bg-white/[0.04] ${className ?? ""}`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700 transition-colors group-hover:bg-brand group-hover:text-white dark:bg-zinc-900 dark:text-zinc-400">
        <Icon className="h-6 w-6 stroke-[1.5]" />
      </div>
      <div className="mt-8 flex flex-col gap-2.5">
        <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">{item.title}</h3>
        <p className="max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {item.description}
        </p>
      </div>
    </div>
  );
}
