'use client'
import { Atom, ChevronDown, Clapperboard, Columns3 } from 'lucide-react'

type AboutMissionProps = {
  locale?: 'nl' | 'en'
}

const copy = {
  nl: {
    eyebrow: 'Onze missie',
    headline: 'AI helder, bruikbaar en menselijk maken',
    scroll: 'Scroll verder',
    sectionTitle: 'Missie',
    mission:
      'AI werkt pas echt wanneer het vertrekt vanuit echte noden: minder repetitief werk, betere informatie, snellere opvolging en digitale producten die gebruikers vooruithelpen.',
    pillars: [
      {
        icon: Atom,
        title: 'Slim toegepast',
        description: 'Geen AI om de AI, maar functies die een concreet probleem oplossen.',
        color: 'blue',
      },
      {
        icon: Columns3,
        title: 'Duidelijk gebouwd',
        description: 'Interfaces en workflows blijven overzichtelijk, controleerbaar en begrijpbaar.',
        color: 'green',
      },
      {
        icon: Clapperboard,
        title: 'Klaar voor gebruik',
        description: 'Van idee naar prototype en daarna naar een praktische implementatie.',
        color: 'purple',
      },
    ],
  },
  en: {
    eyebrow: 'Our mission',
    headline: 'Make AI clear, useful and human',
    scroll: 'Scroll down',
    sectionTitle: 'Mission',
    mission:
      'AI only works when it starts from real needs: less repetitive work, better information, faster follow-up and digital products that help users move forward.',
    pillars: [
      {
        icon: Atom,
        title: 'Applied smartly',
        description: 'No AI for the sake of AI, only features that solve a concrete problem.',
        color: 'blue',
      },
      {
        icon: Columns3,
        title: 'Built clearly',
        description: 'Interfaces and workflows stay understandable, controlled and easy to use.',
        color: 'green',
      },
      {
        icon: Clapperboard,
        title: 'Ready to use',
        description: 'From idea to prototype, then into a practical implementation.',
        color: 'purple',
      },
    ],
  },
} as const

const colorClasses = {
  blue: {
    wrapper: 'bg-blue-100 dark:bg-blue-950/50',
    icon: 'text-blue-500',
  },
  green: {
    wrapper: 'bg-green-100 dark:bg-green-950/50',
    icon: 'text-green-500',
  },
  purple: {
    wrapper: 'bg-purple-100 dark:bg-purple-950/50',
    icon: 'text-purple-500',
  },
} as const

export const AboutMission = ({ locale = 'nl' }: AboutMissionProps) => {
  const content = copy[locale]

  return (
    <section className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 dark:from-neutral-900 dark:to-neutral-950">
      <div className="py-20 relative flex flex-col justify-center items-center gap-y-8 z-10">
        <span className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-300">
          {content.eyebrow}
        </span>
        <h2 className="text-4xl max-w-3xl mx-auto text-center font-medium text-slate-950 md:text-6xl dark:text-white">
          {content.headline}
        </h2>
        <a
          href="#ai-missie"
          className="flex cursor-pointer items-center gap-2 rounded-full border-2 border-black px-4 py-2 text-sm font-semibold backdrop-blur-md transition hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
        >
          {content.scroll} <ChevronDown className="size-4" />
        </a>
        <div className="absolute bottom-0 left-0 right-0 top-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] [background-size:48px_50px] [mask-image:radial-gradient(ellipse_25%_30%_at_50%_50%,#000_65%,transparent_110%)]"></div>
      </div>

      <div id="ai-missie" className="p-8 lg:p-12">
        <div className="max-w-5xl mx-auto md:flex text-left gap-10">
          <h2 className="text-3xl lg:text-4xl lg:w-72 w-52 uppercase font-medium mb-8 shrink-0">
            {content.sectionTitle}
          </h2>
          <div className="">
            <p className="text-xl dark:text-neutral-400 text-neutral-600 mb-12 leading-relaxed">
              {content.mission}
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {content.pillars.map((pillar) => {
                const Icon = pillar.icon
                const classes = colorClasses[pillar.color]

                return (
                  <div key={pillar.title} className="text-center">
                    <div className={`w-16 h-16 ${classes.wrapper} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={classes.icon} />
                    </div>
                    <h3 className="text-xl font-semibold dark:text-neutral-200 text-neutral-900 mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {pillar.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
