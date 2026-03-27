import { About3 } from "@/components/ui/about-3";
import { TimelineDemo } from "@/components/ui/demo-timeline";
import { Header } from "@/components/ui/header-2";

export default function EnglishAboutPage() {
  return (
    <>
      <Header />
      <About3 locale="en" />
      <TimelineDemo locale="en" />
    </>
  );
}
