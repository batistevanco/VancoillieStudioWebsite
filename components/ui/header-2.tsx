'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import { Button, buttonVariants } from '@/components/ui/button';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import { getCopy } from '@/lib/i18n';
import {
  getAlternateLocalePath,
  getLocaleFromPathname,
  getLocalizedPath,
} from '@/lib/routes';
import { cn } from '@/lib/utils';

export function Header() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);
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

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-[9999] w-full transition-all duration-300 ease-in-out md:top-6 md:left-1/2 md:-translate-x-1/2',
        open
          ? 'bg-white dark:bg-zinc-950 border-b border-border dark:border-border'
          : 'bg-white/45 border-b border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-xl dark:bg-black/45 dark:border-white/5 md:top-6 md:max-w-5xl md:rounded-full md:border',
      )}
    >
      <nav
        className={cn(
          'flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out',
          {
            'md:px-2': scrolled,
          },
        )}
      >
        <a
          href={getLocalizedPath(locale, 'landing')}
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground visited:text-foreground md:text-xl"
        >
          <img
            src="/afbeeldingen/TransparantLogo.png"
            alt="Vancoillie Studio logo"
            className="h-6 w-6 rounded-sm object-contain md:h-7 md:w-7"
          />
          <span>Vancoillie Studio</span>
        </a>
        <div className="hidden items-center gap-0.5 md:flex">
          {links.map((link, i) => (
            <a
              key={i}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'text-zinc-600 visited:text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:visited:text-zinc-300 dark:hover:text-white transition-colors'
              )}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
          <div className="ml-2 flex items-center gap-1">
            <a
              href={getAlternateLocalePath(pathname, 'nl')}
              className={cn(
                buttonVariants({
                  variant: locale === 'nl' ? 'default' : 'ghost',
                  size: 'sm',
                }),
                locale === 'nl'
                  ? ''
                  : 'text-zinc-600 visited:text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:visited:text-zinc-300 dark:hover:text-white'
              )}
            >
              {content.language.nl}
            </a>
            <a
              href={getAlternateLocalePath(pathname, 'en')}
              className={cn(
                buttonVariants({
                  variant: locale === 'en' ? 'default' : 'ghost',
                  size: 'sm',
                }),
                locale === 'en'
                  ? ''
                  : 'text-zinc-600 visited:text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:visited:text-zinc-300 dark:hover:text-white'
              )}
            >
              {content.language.en}
            </a>
          </div>
        </div>
        <Button
          size="icon"
          variant="outline"
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </Button>
      </nav>

      <div
        className={cn(
          'fixed inset-0 z-[9998] flex flex-col bg-white dark:bg-zinc-950 md:hidden pt-14',
          open ? 'flex' : 'hidden',
        )}
      >
        <div className="flex h-full flex-col px-6 py-8">
          <nav className="flex flex-1 flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-4 text-2xl font-semibold text-foreground transition-colors hover:bg-muted"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 border-t pt-6">
            <a
              href={getAlternateLocalePath(pathname, 'nl')}
              className={buttonVariants({
                variant: locale === 'nl' ? 'default' : 'outline',
                className: 'flex-1 h-12 text-base',
              })}
            >
              {content.language.nl}
            </a>
            <a
              href={getAlternateLocalePath(pathname, 'en')}
              className={buttonVariants({
                variant: locale === 'en' ? 'default' : 'outline',
                className: 'flex-1 h-12 text-base',
              })}
            >
              {content.language.en}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
