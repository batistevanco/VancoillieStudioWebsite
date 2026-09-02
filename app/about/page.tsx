import { About3 } from "@/components/ui/about-3";
import { TimelineDemo } from "@/components/ui/demo-timeline";
import { Navbar } from "@/components/ui/navbar";
import { TeamSectionBlock } from "@/components/ui/team-section-block-shadcnui";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#16181c]">
      <Navbar variant="overlay" />
      <div className="pt-6">
        <About3 locale="nl" />
        <TimelineDemo locale="nl" />
        <TeamSectionBlock locale="nl" />
      </div>
    </div>
  );
}
