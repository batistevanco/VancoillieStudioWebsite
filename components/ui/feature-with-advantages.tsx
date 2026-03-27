import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface AdvantageItem {
  title: string;
  description: string;
}

interface FeatureWithAdvantagesProps {
  badge?: string;
  title: string;
  description: string;
  items: readonly AdvantageItem[];
}

export function FeatureWithAdvantages({
  badge,
  title,
  description,
  items,
}: FeatureWithAdvantagesProps) {
  return (
    <section className="w-full py-12 lg:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-start gap-4 py-6 lg:py-10">
          <div>{badge ? <Badge>{badge}</Badge> : null}</div>

          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-semibold tracking-tighter md:text-5xl lg:max-w-xl">
              {title}
            </h2>
            <p className="max-w-xl text-lg leading-relaxed tracking-tight text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="flex w-full flex-col gap-8 pt-8">
            <div className="grid items-start gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <div key={item.title} className="flex w-full flex-row items-start gap-6">
                  <Check className="mt-2 h-4 w-4 shrink-0 text-primary" />
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-medium text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
