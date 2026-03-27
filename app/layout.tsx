import type { Metadata } from "next";

import { ConditionalFooter } from "@/components/ui/conditional-footer";
import { OpenLinksInNewTab } from "@/components/ui/open-links-in-new-tab";
import { copy } from "@/lib/i18n";

import "./globals.css";

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
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-48x48.ico", rel: "shortcut icon", type: "image/x-icon" },
    ],
    apple: [{ url: "/favicon-180x180.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className="bg-background text-foreground antialiased">
        <OpenLinksInNewTab />
        {children}
        <ConditionalFooter />
      </body>
    </html>
  );
}
