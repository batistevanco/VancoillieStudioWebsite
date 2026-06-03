'use client'
import React from 'react'
import { motion } from 'motion/react'

type StatsBannerProps = {
  locale?: 'nl' | 'en'
}

const copy = {
  nl: {
    title: 'AI met focus op bruikbaarheid',
    description:
      'Elke oplossing wordt ontworpen rond duidelijke schermen, controleerbare output en workflows die in de praktijk tijd winnen.',
    heroNumber: 'AI',
    heroLabel: 'voor websites, apps, software en interne processen',
    stats: [
      { number: '4', label: 'AI-bouwstenen' },
      { number: '1', label: 'persoonlijk traject' },
      { number: '24/7', label: 'mogelijke automatisatie' },
    ],
  },
  en: {
    title: 'AI focused on usability',
    description:
      'Every solution is designed around clear screens, controllable output and workflows that save time in real use.',
    heroNumber: 'AI',
    heroLabel: 'for websites, apps, software and internal processes',
    stats: [
      { number: '4', label: 'AI building blocks' },
      { number: '1', label: 'personal process' },
      { number: '24/7', label: 'automation potential' },
    ],
  },
} as const

export const StatsBanner = ({ locale = 'nl' }: StatsBannerProps) => {
  const content = copy[locale]

  return (
    <section className="min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 to-white px-6 py-20 dark:from-neutral-950 dark:to-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-4xl font-semibold text-slate-900 text-balance md:text-5xl dark:text-white"
          >
            {content.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-lg max-w-2xl mx-auto dark:text-neutral-300"
          >
            {content.description}
          </motion.p>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative w-full overflow-hidden rounded-lg p-10 text-center text-white shadow-2xl shadow-blue-500/20 md:p-16"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-blue-500" />
            <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_25%_25%,rgba(125,211,252,0.75),transparent_28%),radial-gradient(circle_at_75%_70%,rgba(59,130,246,0.75),transparent_32%)]" />
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-300 rounded-full blur-3xl"></div>
            </div>

            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:4rem_4rem]"></div>

            <div className="relative z-10">
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
                className="text-7xl md:text-8xl font-semibold block mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
              >
                {content.heroNumber}
              </motion.span>
              <p className="text-xl md:text-2xl font-medium text-blue-50">
                {content.heroLabel}
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.stats.map((stat, index) => (
              <StatBox
                key={stat.label}
                number={stat.number}
                label={stat.label}
                delay={0.3 + index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const StatBox = ({
  number,
  label,
  delay,
}: {
  number: string
  label: string
  delay: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className="bg-white rounded-lg p-8 text-center border border-slate-200 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 hover:border-blue-200 transition-all duration-300 group dark:border-white/10 dark:bg-white/10 dark:shadow-none"
  >
    <span className="text-4xl md:text-5xl font-semibold text-slate-900 block mb-3 transition-colors dark:text-white">
      {number}
    </span>
    <p className="text-slate-600 text-base font-medium dark:text-neutral-300">{label}</p>
  </motion.div>
)
