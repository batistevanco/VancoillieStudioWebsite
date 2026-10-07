import { About3 } from "@/components/ui/about-3";
import { TimelineDemo } from "@/components/ui/demo-timeline";
import { Navbar } from "@/components/ui/navbar";
import { TeamSectionBlock } from "@/components/ui/team-section-block-shadcnui";

export default function AboutPage() {
  return (
    <div className="studio-inner studio-about">
      <Navbar variant="solid" />
      <About3 locale="nl" />
      <TimelineDemo locale="nl" />
      <TeamSectionBlock locale="nl" />
    </div>
  );
}
