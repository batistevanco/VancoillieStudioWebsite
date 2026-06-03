'use client'

import { ArrowUpRight, Bot, BrainCircuit, DatabaseZap, PlugZap, Workflow } from 'lucide-react'

type FeatureBentoProps = {
  locale?: 'nl' | 'en'
}

const copy = {
  nl: {
    eyebrow: 'AI-bouwstenen',
    title: 'Van losse ideeën naar werkende AI-flows',
    description:
      'We combineren analyse, automatisatie en interfaces tot AI-oplossingen die passen bij je website, app of interne software.',
    metricOne: '4',
    metricOneLabel: 'AI-domeinen',
    featureTitle: 'Slimme assistenten',
    featureDescription:
      'Chat- en toolinterfaces die gebruikers begeleiden, vragen beantwoorden en acties voorbereiden.',
    ctaBadge: 'Start',
    ctaTitle: (
      <>
        Bespreek je
        <br />
        AI-idee
      </>
    ),
    ctaHref: '/contact',
    metricTwo: '24/7',
    metricTwoLabel: 'automatisaties',
    metricThree: '1',
    metricThreeLabel: 'duidelijk traject',
  },
  en: {
    eyebrow: 'AI building blocks',
    title: 'From loose ideas to working AI flows',
    description:
      'We combine analysis, automation and interfaces into AI solutions that fit your website, app or internal software.',
    metricOne: '4',
    metricOneLabel: 'AI domains',
    featureTitle: 'Smart assistants',
    featureDescription:
      'Chat and tool interfaces that guide users, answer questions and prepare actions.',
    ctaBadge: 'Start',
    ctaTitle: (
      <>
        Discuss your
        <br />
        AI idea
      </>
    ),
    ctaHref: '/en/contact',
    metricTwo: '24/7',
    metricTwoLabel: 'automations',
    metricThree: '1',
    metricThreeLabel: 'clear process',
  },
} as const

export const FeatureBento = ({ locale = 'nl' }: FeatureBentoProps) => {
  const content = copy[locale]

  return (
    <section className="bg-[#F7F8FB] py-16 text-slate-950 dark:bg-black dark:text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[280px]">
          <div className="md:col-span-2 md:row-span-2 rounded-lg bg-gradient-to-br from-slate-950 via-blue-950 to-blue-600 p-8 text-white flex flex-col justify-end relative overflow-hidden group md:p-10">
            <div className="absolute inset-0 opacity-50 [background:radial-gradient(circle_at_30%_20%,rgba(96,165,250,0.65),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.18)_0_1px,transparent_1px_18px)]" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />

            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium">
                <span className="size-2 bg-green-400 rounded-full animate-pulse" />
                {content.eyebrow}
              </div>
              <h3 className="max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">
                {content.title}
              </h3>
              <p className="max-w-md text-white/90 text-lg">
                {content.description}
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-gradient-to-br from-blue-300 to-blue-700 p-8 flex flex-col justify-between relative overflow-hidden group transition-all">
            <div className="absolute -right-8 -top-8 size-32 bg-white/20 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="size-14 text-white rounded-2xl bg-blue-600 backdrop-blur-sm flex items-center justify-center text-2xl mb-4">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h4 className="text-4xl font-black text-white mb-2">{content.metricOne}</h4>
              <p className="text-neutral-200 font-medium">{content.metricOneLabel}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 flex flex-col justify-between border border-gray-200 transition-all group dark:border-white/10 dark:bg-white/10">
            <div className="size-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xl font-bold">
              <Bot className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                {content.featureTitle}
              </h4>
              <p className="text-gray-600 dark:text-neutral-300">
                {content.featureDescription}
              </p>
            </div>
          </div>

          <a
            href={content.ctaHref}
            className="bg-gradient-to-br from-neutral-950 to-neutral-800 rounded-lg p-8 text-white flex flex-col justify-between transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                {content.ctaBadge}
              </span>
              <div className="size-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-xl group-hover:bg-white/30 group-hover:rotate-45 transition-all">
                <ArrowUpRight className="size-5" />
              </div>
            </div>
            <h4 className="text-2xl font-bold leading-tight">
              {content.ctaTitle}
            </h4>
          </a>

          <div className="bg-gray-950 rounded-lg p-8 text-white flex flex-col justify-center gap-3 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="absolute top-5 right-5 flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-blue-500"></span>
            </span>
            <div className="relative z-10">
              <PlugZap className="mb-5 size-8 text-blue-300" />
              <span className="text-5xl font-black bg-gradient-to-r from-blue-200 to-blue-600 bg-clip-text text-transparent">
                {content.metricTwo}
              </span>
              <p className="text-sm uppercase tracking-widest text-neutral-500 font-semibold mt-2">
                {content.metricTwoLabel}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-8 text-white flex flex-col justify-center gap-3 relative overflow-hidden group hover:shadow-2xl transition-all">
            <div className="absolute -bottom-10 -right-10 size-40 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <Workflow className="mb-5 size-8 text-blue-100" />
              <span className="text-5xl font-black">{content.metricThree}</span>
              <p className="text-sm uppercase tracking-widest text-rose-100 font-semibold mt-2">
                {content.metricThreeLabel}
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-slate-950 dark:border-white/10 dark:bg-white/10 dark:text-white">
            <DatabaseZap className="mb-5 size-8 text-blue-500" />
            <h4 className="mb-2 text-2xl font-bold">Data-ready</h4>
            <p className="text-slate-600 dark:text-neutral-300">
              {locale === 'en'
                ? 'Prepare sources, prompts and integrations so AI output stays relevant.'
                : 'Bereid bronnen, prompts en integraties voor zodat AI-output relevant blijft.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
