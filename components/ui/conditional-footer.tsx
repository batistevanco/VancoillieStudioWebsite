"use client"
import { usePathname } from "next/navigation";
import { Footer7 } from "@/components/ui/footer-7";

export function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/en") return null;
  return <Footer7 />;
}
