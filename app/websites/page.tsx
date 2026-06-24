import { WebsitesPage } from "@/components/ui/websites-page";
import { Component as EtherealShadow } from "@/components/ui/etheral-shadow";

export default function Websites() {
  return (
    <div className="relative min-h-screen bg-black">
      <div className="fixed inset-0 z-0 bg-black">
        <EtherealShadow
          color="rgba(128, 128, 128, 1)"
          animation={{ scale: 100, speed: 90 }}
          noise={{ opacity: 1, scale: 1.2 }}
          sizing="fill"
        />
      </div>
      <div className="fixed inset-0 bg-black/55 z-[1]" />
      <div className="relative z-10">
        <WebsitesPage locale="nl" />
      </div>
    </div>
  );
}
