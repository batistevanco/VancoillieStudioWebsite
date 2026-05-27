import React from 'react';
import { Shield, Users, Rocket } from 'lucide-react';
import {
  type FeatureItem,
  PricingTable,
  PricingTableBody,
  PricingTableHeader,
  PricingTableHead,
  PricingTableRow,
  PricingTableCell,
  PricingTablePlan,
} from '@/components/ui/pricing-table';
import { Button } from '@/components/ui/button';

const FEATURES_NL: FeatureItem[] = [
  { label: 'Doelgroep', values: ['Particulieren & senioren', 'Gezinnen & intensieve gebruikers', 'Absolute ontzorging'] },
  { label: 'Jaarlijkse APK & PC-onderhoud', values: ['1x per jaar (t.w.v. €69)', '1x per jaar (t.w.v. €69)', '1x per jaar (t.w.v. €69)'] },
  { label: 'Remote support per maand', values: ['15 min/maand (3u/jaar)', '30 min/maand (6u/jaar)', '45 min/maand (9u/jaar)'] },
  { label: 'Korting op IT-hulp aan huis', values: ['10% (€36/u)', '20% (€32/u)', '25% (€30/u)'] },
  { label: 'Geen reiskosten', values: ['In Roeselare', 'Tot 15 km', 'Volledig werkgebied'] },
  { label: 'Prioritaire hulp', values: [false, '≤ 48 uur', '≤ 24 uur'] },
  { label: 'Korting "Nieuw Toestel Startklaar"', values: [false, '25% korting (t.w.v. €99)', '50% korting (t.w.v. €99)'] },
  { label: 'Gratis virusverwijdering & PC-reset', values: [false, false, 'Inbegrepen (t.w.v. €129)'] },
  { label: 'Onbeperkt chat support (WhatsApp)', values: [false, false, true] },
  { label: '10% korting op Vancoillie Studio producten', values: [false, false, true] },
];

const FEATURES_EN: FeatureItem[] = [
  { label: 'Target audience', values: ['Individuals & seniors', 'Families & intensive users', 'Full peace of mind'] },
  { label: 'Annual PC check & maintenance', values: ['1x/year (worth €69)', '1x/year (worth €69)', '1x/year (worth €69)'] },
  { label: 'Remote support per month', values: ['15 min/month (3h/year)', '30 min/month (6h/year)', '45 min/month (9h/year)'] },
  { label: 'Discount on home IT support', values: ['10% (€36/h)', '20% (€32/h)', '25% (€30/h)'] },
  { label: 'No travel costs', values: ['In Roeselare', 'Up to 15 km', 'Full service area'] },
  { label: 'Priority support', values: [false, '≤ 48 hours', '≤ 24 hours'] },
  { label: 'Discount "New Device Setup"', values: [false, '25% off (worth €99)', '50% off (worth €99)'] },
  { label: 'Free virus removal & PC reset', values: [false, false, 'Included (worth €129)'] },
  { label: 'Unlimited chat support (WhatsApp)', values: [false, false, true] },
  { label: '10% off Vancoillie Studio products', values: [false, false, true] },
];

export function ItHulpPricing({ locale = 'nl' }: { locale?: 'nl' | 'en' }) {
  const isEN = locale === 'en';
  const FEATURES = isEN ? FEATURES_EN : FEATURES_NL;
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-5xl text-center mb-12">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400 mb-3">
          {isEN ? 'Subscriptions' : 'Abonnementen'}
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
          {isEN ? 'Choose your IT support package' : 'Kies jouw IT-hulp pakket'}
        </h2>
        <p className="mt-3 text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
          {isEN
            ? 'Monthly peace of mind for your devices, network and software — with personal follow-up.'
            : 'Maandelijkse ontzorging voor je toestellen, netwerk en software — met persoonlijke opvolging.'}
        </p>
      </div>

      <PricingTable className="mx-auto max-w-5xl">
        <PricingTableHeader>
          <PricingTableRow>
            <th />
            <th className="p-1">
              <PricingTablePlan
                name="Comfort"
                badge={isEN ? 'Individuals' : 'Particulieren'}
                price="€9,90/mo"
                icon={Shield}
              >
                <Button asChild variant="outline" className="w-full rounded-lg" size="lg">
                  <a href="https://www.vancoillieithulp.be" target="_blank" rel="noreferrer">
                    {isEN ? 'I want this plan' : 'Ik wil dit pakket'}
                  </a>
                </Button>
              </PricingTablePlan>
            </th>
            <th className="p-1">
              <PricingTablePlan
                name={isEN ? 'Security' : 'Zekerheid'}
                badge={isEN ? 'Recommended' : 'Aanbevolen'}
                price="€14,90/mo"
                icon={Users}
                className="after:pointer-events-none after:absolute after:-inset-0.5 after:rounded-[inherit] after:bg-gradient-to-b after:from-blue-500/15 after:to-transparent after:blur-[2px]"
              >
                <Button asChild className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                  <a href="https://www.vancoillieithulp.be" target="_blank" rel="noreferrer">
                    {isEN ? 'Choose this plan' : 'Kies dit pakket'}
                  </a>
                </Button>
              </PricingTablePlan>
            </th>
            <th className="p-1">
              <PricingTablePlan
                name="Premium"
                badge={isEN ? 'Fully covered' : 'Volledig ontzorgd'}
                price="€24,90/mo"
                icon={Rocket}
              >
                <Button asChild variant="outline" className="w-full rounded-lg" size="lg">
                  <a href="https://www.vancoillieithulp.be" target="_blank" rel="noreferrer">
                    {isEN ? 'Go premium' : 'Ga voor premium'}
                  </a>
                </Button>
              </PricingTablePlan>
            </th>
          </PricingTableRow>
        </PricingTableHeader>
        <PricingTableBody>
          {FEATURES.map((feature, index) => (
            <PricingTableRow key={index}>
              <PricingTableHead>{feature.label}</PricingTableHead>
              {feature.values.map((value, i) => (
                <PricingTableCell key={i}>{value}</PricingTableCell>
              ))}
            </PricingTableRow>
          ))}
        </PricingTableBody>
      </PricingTable>
    </section>
  );
}
