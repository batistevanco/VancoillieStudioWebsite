import type { Metadata } from "next";

import { copy } from "@/lib/i18n";

export const metadata: Metadata = {
  title: copy.en.meta.title,
  description: copy.en.meta.description,
  keywords: [...copy.en.meta.keywords],
  alternates: {
    canonical: "/en",
    languages: {
      nl: "/",
      en: "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    title: copy.en.meta.openGraphTitle,
    description: copy.en.meta.openGraphDescription,
    type: "website",
    url: "https://www.vancoilliestudio.be/en",
    locale: "en_US",
    images: [
      {
        url: "/afbeeldingen/logo.png",
      },
    ],
  },
};

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
