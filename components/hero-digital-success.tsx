'use client'
import React, { Suspense, useRef } from 'react'
import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react'
import { TimelineAnimation } from '@/components/ui/timeline-animation'
import { useMediaQuery } from '@/components/use-media-query'

interface HeroDigitalSuccessProps {
  title: string
  description: string
  primaryCta?: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
  }
  locale?: string
}

export const HeroDigitalSuccess = ({
  title,
  description,
  primaryCta,
  secondaryCta,
  locale = 'nl',
}: HeroDigitalSuccessProps) => {
  const timelineRef = useRef<HTMLDivElement>(null)

  // Split title to highlight the last words in gradient
  const words = title.split(' ')
  const splitIndex = Math.max(1, words.length - 2)
  const firstPart = words.slice(0, splitIndex).join(' ')
  const lastPart = words.slice(splitIndex).join(' ')

  // Dynamic tags translation
  const tags = locale === 'nl' ? [
    { title: 'Webdesign', desc: 'Snel, modern & SEO' },
    { title: 'Apps', desc: 'iOS & Web' },
    { title: 'Software', desc: 'Op maat & Invoxa' },
  ] : [
    { title: 'Web Design', desc: 'Fast, modern & SEO' },
    { title: 'Apps', desc: 'iOS & Web' },
    { title: 'Software', desc: 'Custom & Invoxa' },
  ]

  return (
    <section
      ref={timelineRef}
      className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col justify-between pt-24 md:pt-28"
    >
      <Suspense>
        <ShaderGradientCanvas
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
          }}
          lazyLoad={false}
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
            uStrength={0.3}
            uDensity={0.8}
            uFrequency={5.5}
            uAmplitude={3.2}
            positionX={-0.1}
            positionY={0}
            positionZ={0}
            rotationX={0}
            rotationY={130}
            rotationZ={70}
            color1="#92dbe0"
            color2="#0b7bff"
            color3="#3865cf"
            reflection={0.4}
            // View (camera) props
            cAzimuthAngle={270}
            cPolarAngle={180}
            cDistance={0.5}
            cameraZoom={15.1}
            // Effect props
            lightType="env"
            brightness={0.8}
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

      {/* Main Hero Content */}
      <div className="relative z-10 grow flex flex-col justify-center px-6 md:px-16 lg:px-24 max-w-7xl mx-auto w-full">
        <TimelineAnimation
          once={true}
          as="h1"
          animationNum={2}
          timelineRef={timelineRef}
          className="flex flex-col xl:flex-row text-[10vw] xl:text-[6.5vw] font-medium leading-[100%] items-baseline gap-x-8 gap-y-2 pb-10"
        >
          {firstPart}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-500 to-blue-500 pb-8 xl:inline-block block">
            {lastPart}
          </span>
        </TimelineAnimation>

        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10">
          <div className="flex flex-wrap justify-start gap-4 z-20">
            {primaryCta && (
              <TimelineAnimation
                once={true}
                as="a"
                href={primaryCta.href}
                animationNum={3}
                timelineRef={timelineRef}
                className="cursor-pointer relative group overflow-hidden bg-white text-black px-8 py-4 rounded-full font-medium text-lg flex items-center gap-3 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:scale-105 transition-transform duration-300"
              >
                {primaryCta.text}
              </TimelineAnimation>
            )}
            {secondaryCta && (
              <TimelineAnimation
                once={true}
                as="a"
                href={secondaryCta.href}
                animationNum={4}
                timelineRef={timelineRef}
                className="cursor-pointer border border-white/20 bg-white/5 backdrop-blur-md px-8 py-4 rounded-full font-medium text-lg hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                {secondaryCta.text}
              </TimelineAnimation>
            )}
          </div>
          <TimelineAnimation
            once={true}
            as="p"
            animationNum={5}
            timelineRef={timelineRef}
            className="max-w-md text-neutral-200 text-xl font-light leading-relaxed"
          >
            {description}
          </TimelineAnimation>
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 p-6 md:p-12 flex flex-wrap justify-end items-end max-w-7xl mx-auto w-full">
        <TimelineAnimation
          once={true}
          animationNum={6}
          timelineRef={timelineRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-x-12 gap-y-4 bg-black/20 backdrop-blur-lg p-4 rounded-lg border border-white/10 w-full sm:w-auto"
        >
          {tags.map((tag, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-white text-sm font-semibold">{tag.title}</p>
              <p className="text-neutral-400 text-xs">{tag.desc}</p>
            </div>
          ))}
        </TimelineAnimation>
      </div>
    </section>
  )
}
