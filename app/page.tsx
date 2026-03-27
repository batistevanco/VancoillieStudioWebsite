"use client"
import Hero from "@/components/ui/animated-shader-hero";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <Hero
      headline={{
        line1: "Welcome to",
        line2: "Vancoillie Studio",
      }}
      subtitle="Van website tot app, van idee tot lancering. Vancoillie Studio maakt digitale oplossingen die jou vooruit helpen."
      buttons={{
        primary: {
          text: "Ontdek",
          onClick: () => router.push('/home'),
        },
      }}
    />
  );
}
