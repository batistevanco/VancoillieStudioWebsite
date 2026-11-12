"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

const STORAGE_KEY = "studio-banner-seen";
const DELAY_MS = 9000;

/** iOS-melding rechtsboven: één keer per sessie, nooit op de contactpagina. */
export function NotificationBanner() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname.startsWith("/contact")) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {}
    if (seen) return;
    const id = setTimeout(() => {
      setVisible(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
    }, DELAY_MS);
    return () => clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    if (!visible) return;
    const id = setTimeout(() => setVisible(false), 12000);
    return () => clearTimeout(id);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="island-banner" role="status">
      <Link href="/contact" className="flex flex-1 items-start gap-3" onClick={() => setVisible(false)}>
        <span className="island-banner__icon" aria-hidden="true">
          <Image src="/apple-touch-icon.png" alt="" width={36} height={36} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline justify-between gap-3">
            <span className="text-[0.8125rem] font-semibold">Vancoillie Studio</span>
            <span className="text-[0.75rem] text-black/45">nu</span>
          </span>
          <span className="mt-0.5 block text-[0.8125rem] leading-snug text-black/75">
            Een website of app in gedachten? We denken graag mee.
          </span>
        </span>
      </Link>
      <button type="button" className="island-banner__close" aria-label="Sluit melding" onClick={() => setVisible(false)}>
        <X size={12} strokeWidth={2.5} aria-hidden="true" />
      </button>
    </div>
  );
}
