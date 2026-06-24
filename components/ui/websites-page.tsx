import { FeatureWithAdvantages } from "@/components/ui/feature-with-advantages";
import { FeatureSectionWithBentoGrid } from "@/components/ui/feature-section-with-bento-grid";
import { Navbar } from "@/components/ui/navbar";
import { CardsParallax, iCardItem } from "@/components/ui/scroll-cards";
import { WebsitesHero } from "@/components/ui/websites-hero";
import { Pricing } from "@/components/ui/pricing";
import { WebsiteExamples } from "@/components/ui/website-examples";
import { getCopy } from "@/lib/i18n";
import type { Locale } from "@/lib/routes";

export function WebsitesPage({ locale = "nl" }: { locale?: Locale }) {
  const content = getCopy(locale).websitesPage;
  
  const scrollCardItems: iCardItem[] = [
    {
      title: "Vancoillie IT Hulp",
      description: locale === "en" ? "Reliable computer help, fair & fast at home or remote." : "Betrouwbare computer hulp, eerlijk & snel aan huis en op afstand.",
      tag: "it-support",
      src: "/afbeeldingen/websiteExamples/ItHulp.png",
      link: "https://vancoillie-ithulp.be",
      color: "#1e3a8a",
      textColor: "#ffffff",
    },
    {
      title: "SIMPLIFY THE",
      description: locale === "en" ? "Modern, minimalist software designs." : "Moderne, minimalistische software ontwerpen.",
      tag: "portfolio",
      src: "/afbeeldingen/websiteExamples/SIMPLIFYTHE.png",
      link: "https://batistevancoillie.be/",
      color: "#111827",
      textColor: "#ffffff",
    },
    {
      title: "Software Development",
      description: locale === "en" ? "Robust and scalable custom applications." : "Robuuste en schaalbare applicaties op maat.",
      tag: "development",
      src: "/afbeeldingen/websiteExamples/SoftwareDevelopment.png",
      link: "https://batistevancoillie.be/",
      color: "#0f172a",
      textColor: "#ffffff",
    },
    {
      title: "Bereikbaar",
      description: locale === "en" ? "Optimal reachability and communications." : "Optimale bereikbaarheid en communicatie.",
      tag: "communication",
      src: "/afbeeldingen/websiteExamples/Bereikbaar.png",
      link: "https://batistevancoillie.be/",
      color: "#065f46",
      textColor: "#ffffff",
    },
  ];

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
      <main className="pb-32 bg-transparent">
        <WebsitesHero />

        <WebsiteExamples />

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
