import type { Metadata } from "next";

import { copy } from "@/lib/i18n";
import { ConditionalSiteFooter } from "@/components/ui/conditional-site-footer";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://software.vancoli.be"),
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
    url: "https://software.vancoli.be/",
    locale: "nl_BE",
    images: [
      {
        url: "/afbeeldingen/TransparantLogo.png",
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
    <html lang="nl">
      <body className="bg-background font-sans text-foreground antialiased">
        {children}
        <ConditionalSiteFooter />
      </body>
    </html>
  );
}
