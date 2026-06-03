'use client'
import { cn } from '@/lib/utils'
import React, { useRef } from 'react'
import { TimelineAnimation } from '@/components/ui/timeline-animation'

type AdvancedStatsProps = {
  locale?: 'nl' | 'en'
}

const copy = {
  nl: {
    eyebrow: 'AI-voortgang',
    title: 'Meetbaar vanaf de eerste flow',
    description:
      'AI-projecten blijven overzichtelijk wanneer doelen, output en gebruikerservaring vanaf het begin zichtbaar worden gemaakt.',
    chartTitle: 'Implementatiepad',
    chartSubtitle: 'Van intake naar automatisatie',
    primaryGoal: 'Primaire focus',
    primaryGoalValue: 'Bruikbare AI',
    target: 'Doel: productie',
    progress: '78%',
    insightTitle: 'Gebruikservaring',
    insight:
      'Elke flow wordt getest op duidelijkheid, controle en praktische meerwaarde voor de gebruiker.',
    kpis: [
      { label: 'Analyse', value: '01', change: 'start', status: 'up' },
      { label: 'Prototype', value: '02', change: 'snel', status: 'up' },
      { label: 'Integratie', value: '03', change: 'gericht', status: 'up' },
      { label: 'Lancering', value: '04', change: 'live', status: 'up' },
    ],
  },
  en: {
    eyebrow: 'AI progress',
    title: 'Measurable from the first flow',
    description:
      'AI projects stay clear when goals, output and user experience are visible from the start.',
    chartTitle: 'Implementation path',
    chartSubtitle: 'From intake to automation',
    primaryGoal: 'Primary focus',
    primaryGoalValue: 'Usable AI',
    target: 'Goal: production',
    progress: '78%',
    insightTitle: 'User experience',
    insight:
      'Every flow is tested for clarity, control and practical value for the user.',
    kpis: [
      { label: 'Analysis', value: '01', change: 'start', status: 'up' },
      { label: 'Prototype', value: '02', change: 'fast', status: 'up' },
      { label: 'Integration', value: '03', change: 'focused', status: 'up' },
      { label: 'Launch', value: '04', change: 'live', status: 'up' },
    ],
  },
} as const

export const AdvancedStats = ({ locale = 'nl' }: AdvancedStatsProps) => {
  const timelineRef = useRef<HTMLDivElement>(null)
  const content = copy[locale]

  return (
    <section
      ref={timelineRef}
      className="flex min-h-screen flex-col justify-center gap-8 bg-white px-5 py-20 dark:bg-black md:px-0"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-300">
            {content.eyebrow}
          </p>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl dark:text-white">
            {content.title}
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-300">
            {content.description}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <TimelineAnimation
            animationNum={1}
            timelineRef={timelineRef}
            className="lg:col-span-2 rounded-lg border border-zinc-200 bg-zinc-50 p-8 dark:border-white/10 dark:bg-white/10"
          >
            <ProcessChart title={content.chartTitle} subtitle={content.chartSubtitle} />
          </TimelineAnimation>

          <div>
            <div className="flex flex-col gap-4">
              <TimelineAnimation
                animationNum={2}
                timelineRef={timelineRef}
                className="p-6 rounded-lg h-full bg-zinc-900 text-white flex flex-col justify-between shadow-lg"
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">
                    {content.primaryGoal}
                  </p>
                  <h4 className="text-xl font-bold tracking-tight">
                    {content.primaryGoalValue}
                  </h4>
                </div>
                <div className="mt-8">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-3xl font-semibold tracking-tighter ">
                      {content.progress}
                    </span>
                    <span className="text-xs font-medium text-zinc-400 mb-1">
                      {content.target}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-white w-[78%] rounded-full" />
                  </div>
                </div>
              </TimelineAnimation>

              <TimelineAnimation
                animationNum={3}
                timelineRef={timelineRef}
                className="p-6 rounded-lg h-full bg-zinc-50 border border-zinc-200 dark:border-white/10 dark:bg-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-8 rounded-lg bg-zinc-50 flex items-center justify-center border border-zinc-100 dark:border-white/10 dark:bg-white/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-6 h-6"
                      color="#000000"
                      fill="none"
                      stroke="#141B34"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z" />
                      <path d="M16 4C17.6569 4 19 5.34315 19 7C19 8.22309 18.2681 9.27523 17.2183 9.7423" />
                      <path d="M13.7143 14H10.2857C7.91876 14 5.99998 15.9188 5.99998 18.2857C5.99998 19.2325 6.76749 20 7.71426 20H16.2857C17.2325 20 18 19.2325 18 18.2857C18 15.9188 16.0812 14 13.7143 14Z" />
                      <path d="M17.7143 13C20.0812 13 22 14.9188 22 17.2857C22 18.2325 21.2325 19 20.2857 19" />
                      <path d="M8 4C6.34315 4 5 5.34315 5 7C5 8.22309 5.73193 9.27523 6.78168 9.7423" />
                      <path d="M3.71429 19C2.76751 19 2 18.2325 2 17.2857C2 14.9188 3.91878 13 6.28571 13" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-zinc-900 dark:text-white">{content.insightTitle}</h4>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-300">
                  {content.insight}
                </p>
              </TimelineAnimation>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
          {content.kpis.map((kpi, index) => (
            <TimelineAnimation
              animationNum={4 + index}
              timelineRef={timelineRef}
              key={kpi.label}
              className={cn(
                'p-6 rounded-lg border bg-zinc-50 border-zinc-200 transition-colors dark:border-white/10 dark:bg-white/10',
                kpi.status === 'up'
                  ? 'hover:border-emerald-400 hover:bg-emerald-50'
                  : 'hover:border-rose-400 hover:bg-rose-50'
              )}
            >
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                {kpi.label}
              </p>
              <div className="flex items-baseline justify-between">
                <p className="text-2xl font-black text-zinc-900 tracking-tighter dark:text-white">
                  {kpi.value}
                </p>
                <span
                  className={cn(
                    'text-xs font-bold  px-1.5 py-0.5 rounded',
                    kpi.status === 'up'
                      ? 'text-emerald-600 bg-emerald-50'
                      : 'text-rose-600 bg-rose-50'
                  )}
                >
                  {kpi.change}
                </span>
              </div>
            </TimelineAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessChart({ title, subtitle }: { title: string; subtitle: string }) {
  const points = [
    { label: '01', height: '35%' },
    { label: '02', height: '55%' },
    { label: '03', height: '72%' },
    { label: '04', height: '88%' },
  ]

  return (
    <div className="flex min-h-[360px] flex-col justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-300">
          {title}
        </p>
        <h3 className="mt-2 text-3xl font-bold text-zinc-950 dark:text-white">
          {subtitle}
        </h3>
      </div>

      <div className="relative mt-10 h-56 overflow-hidden rounded-lg border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-black/35">
        <div className="absolute inset-0 opacity-70 [background:linear-gradient(to_right,rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.16)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="relative flex h-full items-end justify-between gap-4">
          {points.map((point, index) => (
            <div key={point.label} className="flex h-full flex-1 flex-col justify-end gap-3">
              <div
                className="rounded-t-lg bg-gradient-to-t from-blue-700 to-cyan-300 shadow-lg shadow-blue-500/20"
                style={{ height: point.height }}
              />
              <span className="text-center text-xs font-bold text-zinc-500 dark:text-zinc-400">
                {point.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
