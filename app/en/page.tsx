"use client"
import Hero from "@/components/ui/animated-shader-hero";
import { useRouter } from "next/navigation";

export default function EnglishLandingPage() {
  const router = useRouter();

  return (
    <Hero
      headline={{
        line1: "We build",
        line2: "digital products",
      }}
      subtitle="From website to app, from idea to launch. Vancoillie Studio creates digital solutions that move your business forward."
      buttons={{
        primary: {
          text: "Discover",
          onClick: () => router.push('/en/home'),
        },
      }}
    />
  );
}
