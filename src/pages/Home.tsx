import { useLocation } from 'react-router-dom'
import { useScroll } from 'framer-motion'
import { useRef, useEffect } from 'react'
import CenteredFutureHero from '../components/CenteredFutureHero'
import SectionTransitionDivider, {
  SectionShapeBridge,
} from '../components/SectionTransitionDivider'
import AIPipelineShowcase from '../components/AIPipelineShowcase'
import Showreel from '../components/Showreel'
import HomeServices from '../components/HomeServices'
import {
  OurStorySection,
  DifferentiatorsSection,
  LogosSection,
  TestimonialsSection,
  AboutCTASection,
} from '../components/aboutSections'

export default function Home() {
  const location = useLocation()
  const heroBlockRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroBlockRef,
    offset: ['start start', 'end start'],
  })

  useEffect(() => {
    const id = location.hash?.replace(/^#/, '')
    if (!id) return
    const run = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    const timer = window.setTimeout(run, 80)
    return () => window.clearTimeout(timer)
  }, [location.hash, location.pathname])

  return (
    <>
      <div ref={heroBlockRef} className="flex flex-col bg-primary">
        <div className="relative">
          <CenteredFutureHero />
          <SectionTransitionDivider
            shape="peak"
            tone="primary-surface"
            scrollYProgress={heroScrollProgress}
            morphRange={[0.32, 0.78]}
            className="absolute bottom-0 left-0 right-0 z-20 w-full"
          />
        </div>
      </div>

      <HomeServices />

      <SectionShapeBridge shape="steps" tone="surface-primary" />

      <Showreel />

      <AIPipelineShowcase />

      <LogosSection />

      <SectionShapeBridge shape="slope" tone="primary-surface" />

      <OurStorySection />

      <SectionShapeBridge shape="ridge" tone="surface-surface" />

      <DifferentiatorsSection />

      <SectionShapeBridge shape="ripple" tone="surface-surface" />

      <TestimonialsSection />

      <SectionShapeBridge shape="arc" tone="surface-primary" />

      <AboutCTASection />
    </>
  )
}
