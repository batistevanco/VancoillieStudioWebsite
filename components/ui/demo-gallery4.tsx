import { Gallery4, type Gallery4Props } from "@/components/ui/gallery4";

const demoData: Gallery4Props = {
  title: "Projects",
  description:
    "A first look at real product screens, interfaces, and workflows from our own apps and software.",
  items: [
    {
      id: "invoxa",
      title: "Invoxa",
      description:
        "Financial workspace with a clean dashboard, strong overview, and practical business controls.",
      href: "#",
      image: "/afbeeldingen/screenshotInvoxa.png",
    },
  ],
};

export function Gallery4Demo() {
  return <Gallery4 {...demoData} />;
}
