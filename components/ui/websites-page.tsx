import { FeatureWithAdvantages } from "@/components/ui/feature-with-advantages";
import { FeatureSectionWithBentoGrid } from "@/components/ui/feature-section-with-bento-grid";
import { Header } from "@/components/ui/header-2";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { Pricing } from "@/components/ui/pricing";
import { getCopy } from "@/lib/i18n";
import type { Locale } from "@/lib/routes";

export function WebsitesPage({ locale = "nl" }: { locale?: Locale }) {
  const content = getCopy(locale).websitesPage;
  const websiteExamples = [
    {
      title: "SIMPLIFY THE",
      link: "https://batistevancoillie.be/",
      thumbnail: "/afbeeldingen/websiteExamples/SIMPLIFYTHE.png",
    },
    {
      title: "Software Development",
      link: "https://batistevancoillie.be/",
      thumbnail: "/afbeeldingen/websiteExamples/SoftwareDevelopment.png",
    },
    {
      title: "Bereikbaar",
      link: "https://batistevancoillie.be/",
      thumbnail: "/afbeeldingen/websiteExamples/Bereikbaar.png",
    },
    {
      title: "Choose Your Domain",
      link: "https://batistevancoillie.be/",
      thumbnail: "/afbeeldingen/websiteExamples/ChooseYourDomain.png",
    },
    {
      title: "Ervaringen van klanten",
      link: "https://batistevancoillie.be/",
      thumbnail: "/afbeeldingen/websiteExamples/ErvaringenVanklanten.png",
    },
    {
      title: "Demeest bekende AI",
      link: "https://batistevancoillie.be/",
      thumbnail: "/afbeeldingen/websiteExamples/DemeestbekendeAl.png",
    },
    {
      title: "Kunstmatige intelligentie",
      link: "https://batistevancoillie.be/",
      thumbnail: "/afbeeldingen/websiteExamples/Kunstmatigeintelligentie.png",
    },
    {
      title: "Capability clusters",
      link: "https://batistevancoillie.be/",
      thumbnail: "/afbeeldingen/websiteExamples/Capabilityclustersdesignedfor.png",
    },
    {
      title: "Begrip en controle",
      link: "https://batistevancoillie.be/",
      thumbnail: "/afbeeldingen/websiteExamples/WijfocussenOpbegripencontrole.png",
    },
    {
      title: "SIMPLIFY THE",
      link: "https://batistevancoillie.be/",
      thumbnail: "/afbeeldingen/websiteExamples/SIMPLIFYTHE.png",
    },
    {
      title: "Software Development",
      link: "https://batistevancoillie.be/",
      thumbnail: "/afbeeldingen/websiteExamples/SoftwareDevelopment.png",
    },
    {
      title: "Bereikbaar",
      link: "https://batistevancoillie.be/",
      thumbnail: "/afbeeldingen/websiteExamples/Bereikbaar.png",
    },
    {
      title: "Choose Your Domain",
      link: "https://batistevancoillie.be/",
      thumbnail: "/afbeeldingen/websiteExamples/ChooseYourDomain.png",
    },
    {
      title: "Ervaringen van klanten",
      link: "https://batistevancoillie.be/",
      thumbnail: "/afbeeldingen/websiteExamples/ErvaringenVanklanten.png",
    },
    {
      title: "Kunstmatige intelligentie",
      link: "https://batistevancoillie.be/",
      thumbnail: "/afbeeldingen/websiteExamples/Kunstmatigeintelligentie.png",
    },
  ];

  return (
    <>
      <Header />
      <main className="pb-20 pt-4 md:pt-8">
        <HeroParallax
          products={websiteExamples}
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.subtitle}
        />

        <FeatureWithAdvantages
          badge={content.kicker}
          title={content.servicesTitle}
          description={content.servicesDescription}
          items={content.services}
        />

        <Pricing
          plans={content.plans}
          title={content.pricingTitle}
          description={content.pricingDescription}
          popularBadge={content.popularBadge}
          toggleLabel={content.pricingToggleLabel}
          toggleBadge={content.pricingToggleBadge}
        />

        <FeatureSectionWithBentoGrid
          badge={content.kicker}
          title={content.extrasTitle}
          description={content.extrasDescription}
          items={content.extras}
        />
      </main>
    </>
  );
}
