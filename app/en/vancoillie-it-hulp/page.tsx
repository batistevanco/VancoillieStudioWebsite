import HeroSection from '@/components/ui/hero-section-9';
import { ItHulpAbout } from '@/components/ui/it-hulp-about';
import { ItHulpServices } from '@/components/ui/it-hulp-services';
import { ItHulpReviews } from '@/components/ui/it-hulp-reviews';
import { Header } from '@/components/ui/header-2';
import { Wrench, MapPin, CalendarDays } from 'lucide-react';

export default function VancoillieITHulpEnglishPage() {
  return (
    <div className="bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
      <Header />
      <div className="pt-20">
        <HeroSection
          title={
            <>
              Fast, personal{' '}
              <span className="text-blue-600 dark:text-blue-400">IT support</span>
              <br />
              for individuals
            </>
          }
          subtitle="Vancoillie IT Hulp offers practical support for computers, smartphones, tablets, wifi, printers, software and email — in plain language, no hassle."
          actions={[
            {
              text: 'Request help',
              href: 'https://www.vancoillieithulp.be',
              variant: 'default',
              external: true,
            },
            {
              text: 'Download the app',
              href: 'https://apps.apple.com/us/app/mijn-it-hulp/id6761382330',
              variant: 'outline',
              external: true,
            },
          ]}
          stats={[
            {
              value: '2024',
              label: 'Active since',
              icon: <CalendarDays className="h-5 w-5 text-muted-foreground" />,
            },
            {
              value: '7',
              label: 'Help categories',
              icon: <Wrench className="h-5 w-5 text-muted-foreground" />,
            },
            {
              value: 'Roeselare',
              label: 'Active in',
              icon: <MapPin className="h-5 w-5 text-muted-foreground" />,
            },
          ]}
          images={[
            '/afbeeldingen/mijnithulp-iphone/ithulp1.png',
            '/afbeeldingen/mijnithulp-iphone/ithulp3.png',
            '/afbeeldingen/mijnithulp-iphone/ithulp5.png',
          ]}
        />
      </div>
      <ItHulpAbout locale="en" />
      <ItHulpServices locale="en" />
      <ItHulpReviews locale="en" />
    </div>
  );
}
