import { SoftwareHero } from "@/components/ui/software-hero";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";
import { GoogleGeminiEffectDemo } from "@/components/ui/google-gemini-effect-demo";
import { ItHulpHero } from "@/components/ui/it-hulp-hero";
import { getCopy } from "@/lib/i18n";

export default function EnglishSoftwarePage() {
  const content = getCopy("en");

  return (
    <>
      <SoftwareHero locale="en" />
      <div id="invoxa-features">
        <FeaturesSectionWithHoverEffects
          heading={content.softwareFeatures.heading}
          features={content.softwareFeatures.items}
        />
      </div>
      <GoogleGeminiEffectDemo
        title={content.softwareToolShowcase.title}
        description={content.softwareToolShowcase.description}
        ctaLabel={content.softwareToolShowcase.ctaLabel}
        ctaHref={content.softwareToolShowcase.href}
      />
      <ItHulpHero locale="en" />
      <FeaturesSectionWithHoverEffects
        heading={content.itHulpFeatures.heading}
        features={content.itHulpFeatures.items}
      />
    </>
  );
}
