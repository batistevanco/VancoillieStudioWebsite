"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  FaGithub,
  FaInstagram,
} from "react-icons/fa";
import { FaGlobe, FaTiktok, FaXTwitter } from "react-icons/fa6";

import { getCopy } from "@/lib/i18n";
import { getLocaleFromPathname, getLocalizedPath } from "@/lib/routes";

interface Footer7Props {
  logo?: {
    url: string;
    src?: string;
    alt: string;
    title: string;
  };
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSocialLinks = [
  { icon: <FaXTwitter className="size-5" />, href: "https://x.com/vancstudio", label: "X" },
  { icon: <FaInstagram className="size-5" />, href: "https://www.instagram.com/vancoilliestudio/", label: "Instagram" },
  { icon: <FaTiktok className="size-5" />, href: "https://www.tiktok.com/@vancoillieracing", label: "TikTok" },
  { icon: <FaGithub className="size-5" />, href: "https://github.com/batistevanco?tab=repositories", label: "GitHub" },
  { icon: <FaGlobe className="size-5" />, href: "https://batistevancoillie.be/", label: "Portfolio" },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

export const Footer7 = ({
  logo = {
    url: "/",
    alt: "Vancoillie Studio logo",
    title: "Vancoillie Studio",
  },
  description = "We design and build modern apps and software that feel clear, fast, and ready for real business use.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2026 Vancoillie Studio. All rights reserved.",
  legalLinks = defaultLegalLinks,
}: Footer7Props) => {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const content = getCopy(locale).footer;
  const nav = getCopy(locale).header.nav;

  return (
    <section className="relative z-20 mt-12 border-t border-border/70 bg-slate-50/70 py-24 backdrop-blur-sm">
      <div className="container mx-auto max-w-[1280px] px-4">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            <div className="flex items-center gap-2 lg:justify-start">
              <a href={logo.url}>
                {logo.src ? (
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    title={logo.title}
                    className="h-8"
                  />
                ) : (
                  <span className="text-xl font-semibold">{logo.title}</span>
                )}
              </a>
              {!logo.src ? null : (
                <h2 className="text-xl font-semibold">{logo.title}</h2>
              )}
            </div>
            <p className="max-w-[70%] text-sm text-muted-foreground">{content.description || description}</p>
            <ul className="flex items-center space-x-6 text-muted-foreground">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-primary">
                  <a
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full max-w-md gap-10 sm:grid-cols-2 lg:gap-16">
            <div>
              <h3 className="mb-4 font-bold">{content.navigation}</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="font-medium hover:text-primary">
                  <a href={getLocalizedPath(locale, "home")}>{nav.home}</a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href={getLocalizedPath(locale, "websites")}>{nav.websites}</a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href={getLocalizedPath(locale, "apps")}>{nav.apps}</a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href={getLocalizedPath(locale, "software")}>{nav.software}</a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href={getLocalizedPath(locale, "contact")}>{nav.contact}</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-bold">{content.contact}</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="font-medium hover:text-primary">
                  <a href={`mailto:${content.email}`}>{content.email}</a>
                </li>
                <li className="font-medium">{content.country}</li>
                <li className="font-medium hover:text-primary">
                  <a href={getLocalizedPath(locale, "contact")}>{content.getInTouch}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium text-muted-foreground md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{content.copyright || copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {(content.legal || legalLinks).map((link, idx) => (
              <li key={idx} className="hover:text-primary">
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
