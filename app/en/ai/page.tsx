import { Header } from "@/components/ui/header-2";
import { HeroAiInfrastructure } from "@/components/hero-ai-infrastructure";
import { FeatureBento } from "@/components/feature-bento";
import { FeatureHero } from "@/components/feature-hero";
import { AboutMission } from "@/components/about-mission";
import { StatsBanner } from "@/components/stats-banner";
import { AdvancedStats } from "@/components/advanced-stats";

export default function EnglishAiPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <HeroAiInfrastructure locale="en" />
      <FeatureBento locale="en" />
      <FeatureHero locale="en" />
      <AboutMission locale="en" />
      <StatsBanner locale="en" />
      <AdvancedStats locale="en" />
    </main>
  );
}
