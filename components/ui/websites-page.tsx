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
      <main className="pb-32 pt-8 md:pt-16 bg-gradient-to-b from-[#FAFAFA] via-white to-[#F4F8FC] dark:from-[#0A0A0A] dark:via-[#0E0E0E] dark:to-[#080808] transition-colors duration-300">
        <HeroParallax
          products={websiteExamples}
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.subtitle}
        />

        <div className="relative overflow-hidden">
          {/* Ambient background glow */}
          <div className="absolute top-0 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[150px]" />
          <FeatureWithAdvantages
            badge={content.kicker}
            title={content.servicesTitle}
            description={content.servicesDescription}
            items={content.services}
          />
        </div>

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
