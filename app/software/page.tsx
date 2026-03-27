import { SoftwareHero } from "@/components/ui/software-hero";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";
import { GoogleGeminiEffectDemo } from "@/components/ui/google-gemini-effect-demo";
import { getCopy } from "@/lib/i18n";

export default function SoftwarePage() {
  const content = getCopy("nl");

  return (
    <>
      <SoftwareHero locale="nl" />
      <FeaturesSectionWithHoverEffects
        heading={content.softwareFeatures.heading}
        features={content.softwareFeatures.items}
      />
      <GoogleGeminiEffectDemo
        title={content.softwareToolShowcase.title}
        description={content.softwareToolShowcase.description}
        ctaLabel={content.softwareToolShowcase.ctaLabel}
        ctaHref={content.softwareToolShowcase.href}
      />
    </>
  );
}
