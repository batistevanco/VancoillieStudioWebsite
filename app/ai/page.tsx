import { Header } from "@/components/ui/header-2";
import { HeroAiInfrastructure } from "@/components/hero-ai-infrastructure";
import { FeatureBento } from "@/components/feature-bento";
import { FeatureHero } from "@/components/feature-hero";
import { AboutMission } from "@/components/about-mission";
import { StatsBanner } from "@/components/stats-banner";
import { AdvancedStats } from "@/components/advanced-stats";

export default function AiPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <HeroAiInfrastructure locale="nl" />
      <FeatureBento locale="nl" />
      <FeatureHero locale="nl" />
      <AboutMission locale="nl" />
      <StatsBanner locale="nl" />
      <AdvancedStats locale="nl" />
    </main>
  );
}
