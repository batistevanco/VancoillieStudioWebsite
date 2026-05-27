import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import { ConditionalFooter } from "@/components/ui/conditional-footer";
import { OpenLinksInNewTab } from "@/components/ui/open-links-in-new-tab";
import { SmoothScroll } from "@/components/smooth-scroll";
import { copy } from "@/lib/i18n";

import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vancoilliestudio.be"),
  title: copy.nl.meta.title,
  description: copy.nl.meta.description,
  keywords: [...copy.nl.meta.keywords],
  applicationName: "Vancoillie Studio",
  alternates: {
    canonical: "/",
    languages: {
      nl: "/",
      en: "/en",
      "x-default": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: copy.nl.meta.openGraphTitle,
    description: copy.nl.meta.openGraphDescription,
    type: "website",
    url: "https://www.vancoilliestudio.be/",
    locale: "nl_BE",
    images: [
      {
        url: "/afbeeldingen/logo.png",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", rel: "icon", type: "image/x-icon" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${outfit.variable}`}>
      <body className="bg-background font-sans text-foreground antialiased">
        <SmoothScroll>
          <OpenLinksInNewTab />
          {children}
          <ConditionalFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
