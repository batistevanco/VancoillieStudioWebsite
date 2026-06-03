'use client'
import React, { Suspense, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react'
import { TimelineAnimation } from '@/components/ui/timeline-animation'

type HeroAiInfrastructureProps = {
  locale?: 'nl' | 'en'
}

const copy = {
  nl: {
    badge: 'Nieuw',
    badgeText: 'AI-oplossingen voor moderne digitale producten',
    title: (
      <>
        Bouw slimmer met <br />
        praktische AI
        <br />
        infrastructuur
      </>
    ),
    description:
      'Van slimme automatisaties tot AI-interfaces en workflows: Vancoillie Studio helpt AI concreet, bruikbaar en professioneel in je digitale product te brengen.',
    primaryCta: 'Plan een gesprek',
    secondaryCta: 'Ontdek AI',
    trustedText: 'AI voor websites, apps, software en bedrijfsprocessen',
    pillars: ['Automatisatie', 'Dataflows', 'AI-tools', 'Integraties'],
  },
  en: {
    badge: 'New',
    badgeText: 'AI solutions for modern digital products',
    title: (
      <>
        Build smarter with <br />
        practical AI
        <br />
        infrastructure
      </>
    ),
    description:
      'From smart automations to AI interfaces and workflows, Vancoillie Studio helps bring AI into digital products in a concrete, usable and professional way.',
    primaryCta: 'Start a conversation',
    secondaryCta: 'Explore AI',
    trustedText: 'AI for websites, apps, software and business workflows',
    pillars: ['Automation', 'Data flows', 'AI tools', 'Integrations'],
  },
} as const

export const HeroAiInfrastructure = ({ locale = 'nl' }: HeroAiInfrastructureProps) => {
  const timelineRef = useRef<HTMLDivElement>(null)
  const content = copy[locale]

  return (
    <section
      ref={timelineRef}
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-black text-white"
    >
      <Suspense>
        <ShaderGradientCanvas
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '120vh',
          }}
          lazyLoad={undefined}
          fov={undefined}
          pixelDensity={1}
          pointerEvents="none"
        >
          <ShaderGradient
            animate="on"
            type="sphere"
            wireframe={false}
            shader="defaults"
            uTime={0}
            uSpeed={0.3}
            uStrength={0.4}
            uDensity={0.8}
            uFrequency={5.5}
            uAmplitude={7}
            positionX={0}
            positionY={0}
            positionZ={0}
            rotationX={0}
            rotationY={0}
            rotationZ={140}
            color1="#1f469a"
            color2="#000000"
            color3="#000000"
            reflection={0.5}
            // View (camera) props
            cAzimuthAngle={250}
            cPolarAngle={140}
            cDistance={1.5}
            cameraZoom={12.5}
            // Effect props
            lightType="3d"
            brightness={1.5}
            envPreset="city"
            grain="on"
            // Tool props
            toggleAxis={false}
            zoomOut={false}
            hoverState=""
            // Optional - if using transition features
            enableTransition={false}
          />
        </ShaderGradientCanvas>
      </Suspense>

      {/* Main Content */}
      <div className="relative z-10 mb-10 flex grow flex-col items-center justify-center px-4 pt-28 text-center md:pt-36">
        <TimelineAnimation
          timelineRef={timelineRef}
          animationNum={3}
          className="flex items-center gap-2 rounded-2xl border border-blue-800 bg-blue-800/50 p-1 pr-3 backdrop-blur-lg"
        >
          <span className="py-0.5 px-1 rounded-lg bg-blue-600 text-white">
            {content.badge}
          </span>
          <span>{content.badgeText}</span>
        </TimelineAnimation>
        <TimelineAnimation
          timelineRef={timelineRef}
          as="h1"
          animationNum={4}
          className="text-5xl md:text-7xl font-medium tracking-tight leading-[120%] max-w-5xl my-5"
        >
          {content.title}
        </TimelineAnimation>

        <TimelineAnimation
          timelineRef={timelineRef}
          as="p"
          animationNum={5}
          className="text-neutral-300 text-lg md:text-xl max-w-xl mb-10 font-light"
        >
          {content.description}
        </TimelineAnimation>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <TimelineAnimation
            timelineRef={timelineRef}
            as="a"
            href={locale === 'en' ? '/en/contact' : '/contact'}
            animationNum={6}
            className="cursor-pointer bg-white text-black px-6 py-3 rounded-sm font-semibold flex items-center gap-2 hover:bg-neutral-200 transition"
          >
            {content.primaryCta} <ArrowRight size={18} />
          </TimelineAnimation>
          <TimelineAnimation
            timelineRef={timelineRef}
            as="a"
            href="#ai-pijlers"
            animationNum={7}
            className="cursor-pointer relative bg-white/10 hover:bg-white/20 transition px-8 py-3 rounded-sm font-semibold border border-white/20 backdrop-blur-md"
          >
            {content.secondaryCta}
          </TimelineAnimation>
        </div>
      </div>

      {/* Trusted By Logos */}
      <div id="ai-pijlers" className="relative z-10 flex flex-col items-center py-16">
        <TimelineAnimation
          timelineRef={timelineRef}
          as="p"
          animationNum={7}
          className="text-neutral-400 md:text-xl text-nd text-center mb-8"
        >
          {content.trustedText}
        </TimelineAnimation>
        <div className="flex flex-wrap items-center justify-center gap-3 px-4 opacity-80">
          {content.pillars.map((pillar, index) => (
            <TimelineAnimation
              key={pillar}
              timelineRef={timelineRef}
              animationNum={8 + index}
              className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-md"
            >
              {pillar}
            </TimelineAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
