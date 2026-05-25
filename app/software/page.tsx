import { SoftwareHero } from "@/components/ui/software-hero";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";
import { GoogleGeminiEffectDemo } from "@/components/ui/google-gemini-effect-demo";
import { ItHulpHero } from "@/components/ui/it-hulp-hero";
import { getCopy } from "@/lib/i18n";

export default function SoftwarePage() {
  const content = getCopy("nl");

  return (
    <div className="bg-gradient-to-b from-[#FAFAFA] via-white to-[#F4F8FC] dark:from-[#0A0A0A] dark:via-[#0E0E0E] dark:to-[#080808] transition-colors duration-300">
      <SoftwareHero locale="nl" />
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
      <ItHulpHero locale="nl" />
      <FeaturesSectionWithHoverEffects
        heading={content.itHulpFeatures.heading}
        features={content.itHulpFeatures.items}
      />
    </div>
  );
}
