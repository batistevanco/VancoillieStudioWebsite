import { About3 } from "@/components/ui/about-3";
import { TimelineDemo } from "@/components/ui/demo-timeline";
import { Header } from "@/components/ui/header-2";
import { TeamSectionBlock } from "@/components/ui/team-section-block-shadcnui";

export default function EnglishAboutPage() {
  return (
    <>
      <Header />
      <About3 locale="en" />
      <TimelineDemo locale="en" />
      <TeamSectionBlock locale="en" />
    </>
  );
}
