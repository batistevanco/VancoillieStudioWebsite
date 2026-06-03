'use client'
import { cn } from '@/lib/utils'
import { Globe, Smartphone, Wrench } from 'lucide-react'

interface FeatureVelocityProps {
  eyebrow: string
  title: string
  description: string
  metrics: Array<{
    value: string
    label: string
  }>
}

export const FeatureVelocity = ({
  eyebrow,
  title,
  description,
  metrics,
}: FeatureVelocityProps) => {
  const icons = [Globe, Smartphone, Wrench]
  const colors = ['from-blue-500/20', 'from-purple-500/20', 'from-emerald-500/20']
  const categories = ['01 / WEB DEVELOPMENT', '02 / APP DEVELOPMENT', '03 / SYSTEM SUPPORT']

  return (
    <section className="bg-black py-32 px-6 min-h-screen relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#1f1f1f_0px_1px,transparent_1px_10px)] opacity-60 mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]"></div>
      
      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-neutral-800 pb-12">
          <div className="space-y-6 max-w-3xl">
            <span className="text-sm font-mono text-blue-500 uppercase tracking-widest">
              {eyebrow}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-none">
              {title}
            </h2>
          </div>
          <p className="max-w-md text-neutral-400 text-lg leading-relaxed">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((metric, i) => {
            const Icon = icons[i % icons.length]
            const color = colors[i % colors.length]
            const category = categories[i % categories.length]

            return (
              <div
                key={i}
                className="group relative bg-neutral-950/60 border border-neutral-800 rounded-2xl p-12 overflow-hidden hover:border-neutral-700 hover:bg-neutral-950 transition-all duration-500"
              >
                <div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-br to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700',
                    color
                  )}
                />
                <div className="relative z-10 space-y-16">
                  <div className="size-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
                    <Icon className="size-6 text-white" />
                  </div>
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.3em]">
                      {category}
                    </span>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter">
                      {metric.value}
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed pt-2">
                      {metric.label}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
