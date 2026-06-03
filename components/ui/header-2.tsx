'use client';

import React, { useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Button, buttonVariants } from '@/components/ui/button';
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
      className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white visited:text-white md:text-xl"
    >
      <img
        src="/afbeeldingen/logo.png"
        alt="Vancoillie Studio logo"
        className="h-7 w-7 rounded-sm object-contain"
      />
      <span>Vancoillie Studio</span>
    </a>
  );

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-[9999] w-full bg-black/10 backdrop-blur-xl border-b border-white/5"
    >
      {isMobile ? (
        <div className="flex h-16 w-full items-center justify-between px-6">
          <MotionDrawer
            direction="left"
            width={300}
            backgroundColor="#000000"
            clsBtnClassName="bg-neutral-800 border-r border-neutral-900 text-white"
            contentClassName="bg-black border-r border-neutral-900 text-white"
            btnClassName="bg-white/10 hover:bg-white/20 text-white border border-white/15 p-2 rounded-lg"
          >
            <nav className="space-y-6 pt-8">
              <div className="flex items-center gap-2 text-white pb-6 border-b border-white/10">
                <img
                  src="/afbeeldingen/logo.png"
                  alt="Vancoillie Studio logo"
                  className="h-8 w-8 rounded-sm object-contain"
                />
                <span className="font-bold text-lg">Vancoillie Studio</span>
              </div>
              {links.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="block p-3 text-lg font-medium text-neutral-300 hover:text-white hover:bg-white/5 rounded-lg transition"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-2 pt-6 border-t border-white/10">
                <a
                  href={getAlternateLocalePath(pathname, 'nl')}
                  className={cn(
                    "flex-1 text-center py-2.5 rounded-lg text-sm font-medium transition",
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
                    "flex-1 text-center py-2.5 rounded-lg text-sm font-medium transition",
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
            className="flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-xs bg-white text-black hover:bg-neutral-200 transition"
          >
            {content.nav.contact}
          </a>
        </div>
      ) : (
        <div className="flex h-20 w-full items-center justify-between px-10">
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
            className="flex items-center gap-8 text-sm text-neutral-300 font-medium"
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
            className="flex items-center gap-4"
          >
            {/* Language Selection */}
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-1 rounded-full">
              <a
                href={getAlternateLocalePath(pathname, 'nl')}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200",
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
                  "px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200",
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
              className="flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm bg-neutral-800 text-white hover:bg-neutral-700 border border-white/10 transition duration-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              <span>{content.nav.contact}</span>
            </a>
          </TimelineAnimation>
        </div>
      )}
    </header>
  );
}
