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
    <section className="w-full py-10 lg:py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-start gap-4">
            {badge ? (
              <div>
                <Badge>{badge}</Badge>
              </div>
            ) : null}

            <div className="flex flex-col gap-2">
              <h2 className="max-w-xl text-left text-3xl font-semibold tracking-tighter md:text-4xl">
                {title}
              </h2>
              <p className="max-w-xl text-left text-base leading-relaxed tracking-tight text-muted-foreground lg:max-w-lg">
                {description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {first ? (
              <BentoCard
                item={first}
                icon={iconMap[0]}
                className="min-h-[220px] lg:col-span-2"
              />
            ) : null}
            {second ? (
              <BentoCard item={second} icon={iconMap[1]} className="min-h-[220px]" />
            ) : null}
            {third ? (
              <BentoCard item={third} icon={iconMap[2]} className="min-h-[220px]" />
            ) : null}
            {fourth ? (
              <BentoCard
                item={fourth}
                icon={iconMap[3]}
                className="min-h-[220px] lg:col-span-2"
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
      className={`flex h-full flex-col justify-between rounded-md bg-muted p-5 ${className ?? ""}`}
    >
      <Icon className="h-7 w-7 stroke-1" />
      <div className="flex flex-col gap-2">
        <h3 className="text-lg tracking-tight">{item.title}</h3>
        <p className="max-w-sm text-sm leading-6 text-muted-foreground">
          {item.description}
        </p>
      </div>
    </div>
  );
}
