"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/ui/site-footer";

const HIDDEN_ON = ["/contact", "/en/contact"];

export function ConditionalSiteFooter() {
  const pathname = usePathname();
  if (HIDDEN_ON.includes(pathname)) return null;
  return <SiteFooter />;
}
