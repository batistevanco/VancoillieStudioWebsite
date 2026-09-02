"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const GROUPS = [
  { title: "Diensten", links: [["Websites", "/websites"], ["Apps", "/apps"], ["Software", "/software"], ["IT Hulp", "https://vancoillieithulp.be/"]] },
  { title: "Studio", links: [["Over ons", "/about"], ["Contact", "/contact"], ["Privacy", "/privacybeleid"], ["Voorwaarden", "/algemene-voorwaarden"]] },
  { title: "Volg ons", links: [["Instagram", "https://www.instagram.com/vancoilliestudio/"], ["GitHub", "https://github.com/batistevancoillie"], ["LinkedIn", "https://www.linkedin.com/in/batiste-vancoillie-622562291/"], ["X / Twitter", "https://x.com/vancstudio"]] },
];

export function SiteFooter() {
  const english = usePathname().startsWith("/en");
  const prefix = english ? "/en" : "";
  return (
    <footer className="border-t border-[#31353b] bg-[#16181c] text-[#f7f5f2]">
      <div className="studio-wrap studio-grid gap-y-12 pb-12 pt-16 md:pb-14 md:pt-20">
        <div className="col-span-12 md:col-span-4 lg:col-span-3">
          <Link href={prefix || "/"} className="inline-flex items-center gap-3">
            <Image
              src="/afbeeldingen/StudioMark.png"
              alt=""
              width={23}
              height={33}
              className="h-8 w-6 object-contain"
            />
            <span className="font-semibold">Vancoillie Studio</span>
          </Link>
          <p className="mt-8 max-w-[28ch] text-[.9375rem] leading-[1.7] text-[#a0a5ac]">Digitale producten en websites, ontworpen en gebouwd in Roeselare.</p>
          <a href="mailto:support@vancoilliestudio.be" className="studio-link mt-5 text-[.9375rem] text-[#f7f5f2]">support@vancoilliestudio.be</a>
        </div>
        {GROUPS.map((group) => (
          <nav key={group.title} className="col-span-6 md:col-span-4 lg:col-span-3" aria-label={group.title}>
            <p className="studio-label !text-[#a0a5ac]">{group.title}</p>
            <ul className="mt-5 space-y-2.5 text-[.9375rem]">
              {group.links.map(([label, href]) => {
                const external = href.startsWith("http");
                return <li key={href}><Link href={external ? href : `${prefix}${href}`} className="studio-link text-[#a0a5ac] hover:text-[#f7f5f2]" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{label}</Link></li>;
              })}
            </ul>
          </nav>
        ))}
      </div>
      <div className="studio-wrap flex flex-col gap-3 border-t border-[#31353b] py-6 font-mono text-[.75rem] text-[#8c9198] md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} Vancoillie Studio · BE 1014.303.066</span>
        <a href="https://vancoilliegroup.be" target="_blank" rel="noopener noreferrer" className="studio-link self-start md:self-auto">Vancoillie Group</a>
      </div>
    </footer>
  );
}
