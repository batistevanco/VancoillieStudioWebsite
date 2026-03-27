import type { MetadataRoute } from "next";

const siteUrl = "https://www.vancoilliestudio.be";
export const dynamic = "force-static";

const routes = [
  "",
  "/home",
  "/websites",
  "/apps",
  "/software",
  "/about",
  "/contact",
  "/bedankt",
  "/privacybeleid",
  "/algemene-voorwaarden",
  "/en",
  "/en/home",
  "/en/websites",
  "/en/apps",
  "/en/software",
  "/en/about",
  "/en/contact",
  "/en/thank-you",
  "/en/privacy-policy",
  "/en/terms-and-conditions",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.includes("thank-you") || route.includes("bedankt") ? "yearly" : "monthly",
    priority: route === "" || route === "/en" ? 1 : route.includes("contact") ? 0.9 : 0.8,
  }));
}
