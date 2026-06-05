'use client';

import React, { useRef } from 'react';
import { usePathname } from 'next/navigation';
import { getCopy } from '@/lib/i18n';
import {
  getAlternateLocalePath,
  getLocaleFromPathname,
  getLocalizedPath,
} from '@/lib/routes';
import { cn } from '@/lib/utils';
import { TimelineAnimation } from '@/components/ui/timeline-animation';
import { useMediaQuery } from '@/components/use-media-query';
import MotionDrawer from '@/components/ui/motion-drawer';

export function Header() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const headerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const content = getCopy(locale).header;
  const showHomeLink = pathname !== getLocalizedPath(locale, 'home') && pathname !== getLocalizedPath(locale, 'landing');

  const links = [
    ...(showHomeLink
      ? [
          {
            label: content.nav.home,
            href: getLocalizedPath(locale, 'home'),
          },
        ]
      : []),
    {
      label: content.nav.websites,
      href: getLocalizedPath(locale, 'websites'),
    },
    {
      label: content.nav.apps,
      href: getLocalizedPath(locale, 'apps'),
    },
    {
      label: content.nav.software,
      href: getLocalizedPath(locale, 'software'),
    },
    {
      label: content.nav.vancoillieITHulp,
      href: getLocalizedPath(locale, 'vancoillie-it-hulp'),
    },
    {
      label: content.nav.about,
      href: getLocalizedPath(locale, 'about'),
    },
    {
      label: content.nav.contact,
      href: getLocalizedPath(locale, 'contact'),
    },
  ];

  const logoEl = (
    <a
      href={getLocalizedPath(locale, 'landing')}
      className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white hover:opacity-90 transition"
    >
      <img
        src="/afbeeldingen/logo.png"
        alt="Vancoillie Studio logo"
        className="h-6 w-6 rounded-sm object-contain"
      />
      <span className="hidden sm:inline">Vancoillie Studio</span>
    </a>
  );

  return (
    <header
      ref={headerRef}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] w-[92%] max-w-6xl bg-black/60 border border-white/10 backdrop-blur-xl rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300"
    >
      {isMobile ? (
        <div className="flex h-12 w-full items-center justify-between px-4">
          <MotionDrawer
            direction="left"
            width={280}
            backgroundColor="#050505"
            clsBtnClassName="bg-neutral-900 border border-white/10 text-white rounded-full p-1.5"
            contentClassName="bg-[#050505] border-r border-neutral-900 text-white"
            btnClassName="bg-white/5 hover:bg-white/10 text-white border border-white/10 p-2 rounded-full transition"
          >
            <nav className="space-y-5 pt-6">
              <div className="flex items-center gap-2 text-white pb-5 border-b border-white/5">
                <img
                  src="/afbeeldingen/logo.png"
                  alt="Vancoillie Studio logo"
                  className="h-7 w-7 rounded-sm object-contain"
                />
                <span className="font-bold text-base">Vancoillie Studio</span>
              </div>
              {links.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="block p-2 text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/5 rounded-lg transition"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-2 pt-5 border-t border-white/5">
                <a
                  href={getAlternateLocalePath(pathname, 'nl')}
                  className={cn(
                    "flex-1 text-center py-2 rounded-lg text-xs font-semibold transition",
                    locale === 'nl'
                      ? 'bg-white text-black'
                      : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                  )}
                >
                  {content.language.nl}
                </a>
                <a
                  href={getAlternateLocalePath(pathname, 'en')}
                  className={cn(
                    "flex-1 text-center py-2 rounded-lg text-xs font-semibold transition",
                    locale === 'en'
                      ? 'bg-white text-black'
                      : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                  )}
                >
                  {content.language.en}
                </a>
              </div>
            </nav>
          </MotionDrawer>

          {logoEl}

          <a
            href={getLocalizedPath(locale, 'contact')}
            className="px-4 py-1.5 rounded-full text-xs font-bold bg-white text-black hover:bg-neutral-200 transition"
          >
            {content.nav.contact}
          </a>
        </div>
      ) : (
        <div className="flex h-12 w-full items-center justify-between px-6">
          <TimelineAnimation
            once={true}
            animationNum={1}
            timelineRef={headerRef}
            className="flex items-center gap-2"
          >
            {logoEl}
          </TimelineAnimation>

          <TimelineAnimation
            once={true}
            as="nav"
            animationNum={2}
            timelineRef={headerRef}
            className="flex items-center gap-6 text-[13px] text-neutral-300 font-medium"
          >
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="hover:text-white transition duration-200"
              >
                {link.label}
              </a>
            ))}
          </TimelineAnimation>

          <TimelineAnimation
            once={true}
            animationNum={3}
            timelineRef={headerRef}
            className="flex items-center gap-3.5"
          >
            {/* Language Selection */}
            <div className="flex items-center bg-white/5 border border-white/10 p-0.5 rounded-full">
              <a
                href={getAlternateLocalePath(pathname, 'nl')}
                className={cn(
                  "px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all duration-200",
                  locale === 'nl'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                )}
              >
                {content.language.nl}
              </a>
              <a
                href={getAlternateLocalePath(pathname, 'en')}
                className={cn(
                  "px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all duration-200",
                  locale === 'en'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                )}
              >
                {content.language.en}
              </a>
            </div>

            {/* CTA Button */}
            <a
              href={getLocalizedPath(locale, 'contact')}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full font-bold text-xs bg-neutral-900 text-white hover:bg-neutral-800 border border-white/15 hover:border-white/25 transition duration-200"
            >
              <span className="w-1 h-1 rounded-full bg-blue-500 animate-pulse"></span>
              <span>{content.nav.contact}</span>
            </a>
          </TimelineAnimation>
        </div>
      )}
    </header>
  );
}
