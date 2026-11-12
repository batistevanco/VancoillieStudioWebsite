import { About3 } from "@/components/ui/about-3";
import { TimelineDemo } from "@/components/ui/demo-timeline";
import { TeamSectionBlock } from "@/components/ui/team-section-block-shadcnui";

export default function AboutPage() {
  return (
    <div className="studio-inner studio-about">
      <About3 locale="nl" />
      <TimelineDemo locale="nl" />
      <TeamSectionBlock locale="nl" />
    </div>
  );
}
