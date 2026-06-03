'use client'
import { BarChart3, BotMessageSquare, Braces, Lightbulb, Settings, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

type FeatureHeroProps = {
  locale?: 'nl' | 'en'
}

const copy = {
  nl: {
    title: (
      <>
        AI die aansluit op je echte
        <br />
        digitale werking
      </>
    ),
    description:
      'Niet zomaar een chatbot op een pagina, maar functies die helpen bij zoeken, antwoorden, automatiseren, samenvatten en beslissen.',
    features: [
      {
        icon: BotMessageSquare,
        title: 'AI-assistenten',
        desc: 'Gebruiksvriendelijke assistenten die bezoekers, klanten of medewerkers naar het juiste antwoord begeleiden.',
      },
      {
        icon: Settings,
        title: 'Procesautomatisatie',
        desc: 'Herhaalbare stappen omzetten naar slimme flows die minder handmatig werk vragen.',
        highlight: true,
      },
      {
        icon: Braces,
        title: 'Integraties',
        desc: 'AI koppelen met formulieren, dashboards, API’s en bestaande softwareprocessen.',
      },
      {
        icon: Lightbulb,
        title: 'Content & inzicht',
        desc: 'Teksten, samenvattingen en analyses genereren vanuit gestructureerde bedrijfsinformatie.',
      },
      {
        icon: BarChart3,
        title: 'Beslissingshulp',
        desc: 'Data overzichtelijk maken zodat keuzes sneller, duidelijker en beter onderbouwd worden.',
      },
    ],
  },
  en: {
    title: (
      <>
        AI that fits your real
        <br />
        digital workflow
      </>
    ),
    description:
      'Not just a chatbot on a page, but features that help search, answer, automate, summarize and support decisions.',
    features: [
      {
        icon: BotMessageSquare,
        title: 'AI assistants',
        desc: 'User-friendly assistants that guide visitors, customers or teams to the right answer.',
      },
      {
        icon: Settings,
        title: 'Process automation',
        desc: 'Turn repeatable steps into smart flows that reduce manual work.',
        highlight: true,
      },
      {
        icon: Braces,
        title: 'Integrations',
        desc: 'Connect AI with forms, dashboards, APIs and existing software processes.',
      },
      {
        icon: Lightbulb,
        title: 'Content & insight',
        desc: 'Generate copy, summaries and analysis from structured business information.',
      },
      {
        icon: BarChart3,
        title: 'Decision support',
        desc: 'Make data easier to understand so decisions become faster and clearer.',
      },
    ],
  },
} as const

export const FeatureHero = ({ locale = 'nl' }: FeatureHeroProps) => {
  const content = copy[locale]

  return (
    <section className="relative min-h-screen bg-white px-6 py-24 dark:bg-black">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#f3f3f3_0px_1px,transparent_1px_8px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:opacity-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(125%_125%_at_50%_10%,rgba(255,255,255,0)_40%,rgba(50,97,237,0.42)_100%)]"></div>

      <div className="relative mx-auto max-w-7xl px-0 py-16 text-center md:px-6 md:py-24">
        <motion.div
          initial={{ opacity: 0, transform: 'translateY(20px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-200/70">
            <Sparkles className="size-6" />
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 text-balance md:text-5xl dark:text-white">
            {content.title}
          </h2>
          <p className="mx-auto mb-20 max-w-2xl text-lg text-slate-600 text-pretty dark:text-neutral-300">
            {content.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-12">
          {content.features.slice(0, 3).map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}

          <div className="md:col-span-3 flex flex-col md:flex-row justify-center gap-y-16 gap-x-12">
            {content.features.slice(3).map((f, i) => (
              <div key={i} className="md:w-1/3">
                <FeatureCard {...f} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const FeatureCard = ({
  icon: Icon,
  title,
  desc,
  highlight,
}: {
  icon: React.ElementType
  title: string
  desc: string
  highlight?: boolean
}) => (
  <div
    className={cn(
      'flex flex-col items-center group transition-all duration-200',
      highlight && 'md:scale-105'
    )}
  >
    <div
      className={cn(
        'size-12 rounded-full flex items-center justify-center mb-6 transition-colors duration-200',
        highlight
          ? 'bg-blue-600 text-white shadow-xl shadow-blue-200'
          : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
      )}
    >
      <Icon className="size-6" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-slate-900 tracking-tight dark:text-white">
      {title}
    </h3>
    <p className="text-slate-500 leading-relaxed text-sm max-w-xs mx-auto text-pretty dark:text-neutral-400">
      {desc}
    </p>
  </div>
)
