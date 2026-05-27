import HeroSection from '@/components/ui/hero-section-9';
import { ItHulpAbout } from '@/components/ui/it-hulp-about';
import { ItHulpServices } from '@/components/ui/it-hulp-services';
import { ItHulpReviews } from '@/components/ui/it-hulp-reviews';
import { Header } from '@/components/ui/header-2';
import { Wrench, MapPin, CalendarDays } from 'lucide-react';

export default function VancoillieITHulpPage() {
  return (
    <div className="bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
      <Header />
      <div className="pt-20">
        <HeroSection
          title={
            <>
              Snelle, persoonlijke{' '}
              <span className="text-blue-600 dark:text-blue-400">IT-hulp</span>
              <br />
              voor particulieren
            </>
          }
          subtitle="Vancoillie IT Hulp biedt praktische ondersteuning voor computers, smartphones, tablets, wifi, printers, software en e-mail — in gewone mensentaal, zonder gedoe."
          actions={[
            {
              text: 'Hulp aanvragen',
              href: 'https://www.vancoillieithulp.be',
              variant: 'default',
              external: true,
            },
            {
              text: 'Download de app',
              href: 'https://apps.apple.com/us/app/mijn-it-hulp/id6761382330',
              variant: 'outline',
              external: true,
            },
          ]}
          stats={[
            {
              value: '2024',
              label: 'Actief sinds',
              icon: <CalendarDays className="h-5 w-5 text-muted-foreground" />,
            },
            {
              value: '7',
              label: 'Categorieën hulp',
              icon: <Wrench className="h-5 w-5 text-muted-foreground" />,
            },
            {
              value: 'Roeselare',
              label: 'Actief in',
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
      <ItHulpAbout />
      <ItHulpServices />
      <ItHulpReviews />
    </div>
  );
}
