'use client';
import { motion } from 'framer-motion';
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight';

const copy = {
  nl: {
    label: 'Over Vancoillie IT Hulp',
    heading1: 'IT-problemen opgelost in',
    highlight: 'gewone mensentaal',
    heading2: '— snel en persoonlijk.',
    description: 'Vancoillie IT Hulp biedt praktische ondersteuning voor particulieren en gezinnen in Roeselare. Geen ingewikkelde technische termen, geen lange wachttijden. Gewoon iemand die je probleem begrijpt en oplost — aan huis, op afstand of via de app.',
    stats: [
      { value: '2024', label: 'Opgericht' },
      { value: '14+', label: 'Reviews' },
      { value: '100%', label: 'Klantgericht' },
    ],
  },
  en: {
    label: 'About Vancoillie IT Hulp',
    heading1: 'IT problems solved in',
    highlight: 'plain language',
    heading2: '— fast and personal.',
    description: 'Vancoillie IT Hulp offers practical support for individuals and families in Roeselare. No complicated technical terms, no long waiting times. Just someone who understands your problem and solves it — at home, remotely or via the app.',
    stats: [
      { value: '2024', label: 'Founded' },
      { value: '14+', label: 'Reviews' },
      { value: '100%', label: 'Customer-focused' },
    ],
  },
};

export function ItHulpAbout({ locale = 'nl' }: { locale?: 'nl' | 'en' }) {
  const t = copy[locale];
  return (
    <HeroHighlight containerClassName="py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [20, -5, 0] }}
        transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
        className="max-w-4xl mx-auto text-center px-6"
      >
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400 mb-4">
          {t.label}
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-neutral-700 dark:text-white leading-snug mb-6">
          {t.heading1}{' '}
          <Highlight className="text-black dark:text-white">
            {t.highlight}
          </Highlight>
          {' '}{t.heading2}
        </h2>
        <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          {t.description}
        </p>
        <div className="mt-12 grid grid-cols-3 gap-8 max-w-sm mx-auto">
          {t.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">{stat.value}</p>
              <p className="text-sm text-neutral-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </HeroHighlight>
  );
}
