import type { Metadata } from "next";

import { BooklanePage } from "@/components/ui/booklane-page";

export const metadata: Metadata = {
  title: "Booklane — afsprakentool | Vancoillie Studio",
  description:
    "Booklane is een online afsprakentool waarmee klanten zelf een afspraak boeken of aanvragen, met automatische prijsindicatie en agenda-integratie. Technisch overzicht en klantreis.",
  alternates: { canonical: "/software/booklane" },
};

export default function Page() {
  return <BooklanePage />;
}
