"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { FaApple } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { Locale } from "@/lib/routes";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  ctaLabel?: string;
  ctaType?: "ios" | "software";
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  viewScreenshotLabel?: string;
  slideAriaLabel?: string;
  items: Gallery4Item[];
}

const data = [
  {
    id: "invoxa-dashboard",
    title: "Invoxa Dashboard",
    description:
      "A clean financial workspace focused on clarity, overview, and smooth day-to-day business operations.",
    href: "#",
    image: "/afbeeldingen/screenshotInvoxa.png",
  },
];

const Gallery4 = ({
  title = "Screenshots",
  description = "A first look at the interfaces, flows, and product screens behind our apps and software.",
  viewScreenshotLabel = "View screenshot",
  slideAriaLabel = "Go to slide",
  items = data,
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
          <div className="flex max-w-2xl flex-col gap-4">
            <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="max-w-lg text-muted-foreground">{description}</p>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: "start",
            containScroll: "trimSnaps",
            loop: true,
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-0 px-4 md:px-6 2xl:ml-[max(8rem,calc(50vw-700px))] 2xl:mr-[max(0rem,calc(50vw-700px))]">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-[88%] pl-5 sm:basis-[76%] md:basis-[58%] lg:basis-[46%] xl:basis-[38%]"
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group block rounded-xl"
                >
                  <div className="group relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-xl border border-border/60 bg-slate-100 md:aspect-[5/4] lg:aspect-[16/9]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute h-full w-full object-contain object-center p-2 transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 h-full bg-[linear-gradient(hsl(var(--primary)/0),hsl(var(--primary)/0.08),hsl(var(--primary)/0.72)_100%)] mix-blend-multiply" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-primary-foreground md:p-8">
                      <div className="mb-2 pt-4 text-xl font-semibold md:mb-3 md:pt-4 lg:pt-4">
                        {item.title}
                      </div>
                      <div className="mb-8 line-clamp-2 md:mb-12 lg:mb-9">
                        {item.description}
                      </div>
                      <div
                        className={`inline-flex items-center rounded-2xl px-4 py-3 text-sm font-medium shadow-lg transition-transform duration-300 group-hover:scale-[1.02] ${
                          item.ctaType === "software"
                            ? "bg-white/95 text-slate-900"
                            : "bg-black text-white"
                        }`}
                      >
                        {item.ctaType === "ios" ? (
                          <FaApple className="mr-3 h-4 w-4" />
                        ) : null}
                        {item.ctaLabel || viewScreenshotLabel}
                        <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-primary" : "bg-primary/20"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`${slideAriaLabel} ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery4 };
