import { About3 } from "@/components/ui/about-3";
import { TimelineDemo } from "@/components/ui/demo-timeline";
import { Navbar } from "@/components/ui/navbar";
import { TeamSectionBlock } from "@/components/ui/team-section-block-shadcnui";
import { Component as EtherealShadow } from "@/components/ui/etheral-shadow";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Ethereal shadow animated background */}
      <div className="fixed inset-0 z-0 bg-black">
        <EtherealShadow
          color="rgba(128, 128, 128, 1)"
          animation={{ scale: 100, speed: 90 }}
          noise={{ opacity: 1, scale: 1.2 }}
          sizing="fill"
        />
      </div>

      {/* Dark overlay for readability */}
      <div className="fixed inset-0 bg-black/55 z-[1]" />

      {/* Content */}
      <div className="relative z-10">
        <Navbar variant="overlay" />
        <div className="pt-6">
          <About3 locale="nl" />
          <TimelineDemo locale="nl" />
          <TeamSectionBlock locale="nl" />
        </div>
      </div>
    </div>
  );
}
