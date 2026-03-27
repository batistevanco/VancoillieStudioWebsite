import { AboutSection2 } from "@/components/ui/about-section-2";
import { getCopy } from "@/lib/i18n";
import type { Locale } from "@/lib/routes";
import { Features } from "@/components/ui/features-8";
import { Gallery4 } from "@/components/ui/gallery4";
import { Header } from "@/components/ui/header-2";
import { HeroWithMockup } from "@/components/ui/hero-with-mockup";
import { Testimonials } from "@/components/ui/testimonials-columns-1";

export function LandingPage({
  locale = "nl",
  showWorldwide = false,
  showHeroMockup = true,
}: {
  locale?: Locale;
  showWorldwide?: boolean;
  showHeroMockup?: boolean;
}) {
  const content = getCopy(locale);

  return (
    <>
      <Header />
      <HeroWithMockup
        title={content.hero.title}
        description={content.hero.description}
        primaryCta={{
          text: content.hero.primaryCta,
          href: locale === "en" ? "/en/apps" : "/apps",
        }}
        secondaryCta={{
          text: content.hero.secondaryCta,
          href: locale === "en" ? "/en/websites" : "/websites",
        }}
        mockupImage={{
          alt: content.hero.mockupAlt,
          width: 1248,
          height: 765,
          src: "/afbeeldingen/screenshotInvoxa.png",
        }}
        showMockup={showHeroMockup}
      />
      {showWorldwide ? <AboutSection2 locale={locale} /> : null}
      {showWorldwide ? <Testimonials locale={locale} /> : null}
      {showWorldwide ? <Features locale={locale} /> : null}
      {showWorldwide ? (
        <Gallery4
          title={content.gallery.title}
          description={content.gallery.description}
          viewScreenshotLabel={content.gallery.viewScreenshot}
          slideAriaLabel={content.gallery.goToSlide}
          items={[...content.gallery.items]}
        />
      ) : null}
    </>
  );
}
