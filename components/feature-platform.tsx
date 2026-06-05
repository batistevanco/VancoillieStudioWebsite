'use client'

import React from 'react'
import {
  Globe,
  Smartphone,
  Wrench,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FeaturePlatformProps {
  eyebrow: string
  title: string
  description: string
  metrics: Array<{
    value: string
    label: string
  }>
  locale?: string
}

export const FeaturePlatform = ({
  eyebrow,
  title,
  description,
  metrics,
  locale = 'nl',
}: FeaturePlatformProps) => {
  const isEn = locale === 'en'

  return (
    <section className="py-32 px-6 bg-white text-slate-900 font-dmSans min-h-screen relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
        {/* Title Cell */}
        <div className="md:col-span-3 flex flex-col justify-start pr-4 space-y-4">
          <span className="text-xs font-mono text-blue-600 uppercase tracking-widest">
            {eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">
            {title}
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed pt-2">
            {description}
          </p>
        </div>

        {/* Bento Grid Cells */}
        {/* Cell 1: Web (4 cols) */}
        <div className="relative overflow-hidden md:col-span-4 bg-slate-50 p-8 rounded-3xl border border-slate-200/80 flex flex-col justify-between h-80 hover:bg-slate-50/80 hover:border-slate-300 transition-all duration-300 group">
          <img
            src="/afbeeldingen/screenshotInvoxa.png"
            alt="Invoxa Screenshot"
            className="absolute inset-0 w-full h-full object-cover opacity-5 group-hover:opacity-10 transition-opacity duration-300 ease-out"
          />
          <div className="flex justify-between items-start relative z-2">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight uppercase font-mono">
              {metrics[0]?.value || 'Web'}
            </h3>
            <Globe className="size-6 text-blue-600" />
          </div>
          <p className="text-slate-600 text-sm leading-relaxed relative z-2">
            {metrics[0]?.label || ''}
          </p>
        </div>

        {/* Cell 2: Apps (5 cols) */}
        <div className="md:col-span-5 bg-slate-50 p-8 rounded-3xl border border-slate-200/80 flex flex-col justify-between h-80 hover:bg-slate-50/80 hover:border-slate-300 transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight uppercase font-mono">
              {metrics[1]?.value || 'Apps'}
            </h3>
            <Smartphone className="size-6 text-purple-600" />
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            {metrics[1]?.label || ''}
          </p>
        </div>

        {/* Second Row */}
        {/* Cell 3: Support (4 cols) */}
        <div className="md:col-span-4 bg-slate-50 p-8 rounded-3xl border border-slate-200/80 flex flex-col justify-between h-80 hover:bg-slate-50/80 hover:border-slate-300 transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight uppercase font-mono">
              {metrics[2]?.value || 'Support'}
            </h3>
            <Wrench className="size-6 text-emerald-600" />
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            {metrics[2]?.label || ''}
          </p>
        </div>

        {/* Cell 4: Custom Details (4 cols) */}
        <div className="md:col-span-4 bg-slate-50 p-8 rounded-3xl border border-slate-200/80 flex flex-col justify-between h-80 hover:bg-slate-50/80 hover:border-slate-300 transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight uppercase font-mono">
              {isEn ? 'Tailored' : 'Op maat'}
            </h3>
            <Layers className="size-6 text-indigo-600" />
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            {isEn 
              ? 'Every detail tailored to the needs of your business, ensuring scale and clean UX.' 
              : 'Elk detail afgestemd op de behoeften van jouw onderneming, met het oog op groei en duidelijke UX.'
            }
          </p>
        </div>

        {/* Cell 5: Pricing / Packages CTA (4 cols) */}
        <div className="md:col-span-4 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl flex flex-col justify-between h-80 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
          <div className="flex justify-between items-start relative z-10">
            <h3 className="text-xl font-black text-white tracking-tight uppercase">
              {isEn ? 'Pricing' : 'Tarieven'}
            </h3>
            <Sparkles className="size-6 text-white animate-pulse" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent_70%)] pointer-events-none"></div>
          <div className="relative z-10 flex flex-col h-full justify-end">
            <p className="text-white/80 text-xs mb-4">
              {isEn 
                ? 'Check out our clear startup packages and configurations.'
                : 'Bekijk onze duidelijke startpakketten en configuraties.'
              }
            </p>
            <a 
              href={isEn ? '/en/websites' : '/websites'}
              className={cn(
                buttonVariants({ variant: 'default' }),
                "flex items-center justify-between text-black font-bold text-sm bg-white hover:bg-neutral-100 transition-all rounded-xl py-3 px-4 shadow-lg group"
              )}
            >
              <span>{isEn ? 'View packages' : 'Bekijk pakketten'}</span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
