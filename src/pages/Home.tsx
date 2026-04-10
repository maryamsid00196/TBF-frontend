import { Link, useLocation } from 'react-router-dom'
import { motion, useInView, useScroll } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { FiHome, FiCode, FiVideo } from 'react-icons/fi'
import CenteredFutureHero from '../components/CenteredFutureHero'
import SectionTransitionDivider, {
  SectionShapeBridge,
} from '../components/SectionTransitionDivider'
import SectionBackdrop from '../components/SectionBackdrop'
import {
  OurStorySection,
  CoreValuesSection,
  DifferentiatorsSection,
  LogosSection,
  TestimonialsSection,
  AboutCTASection,
} from '../components/aboutSections'

const TBG_SERVICES = [
  { icon: FiHome, name: 'Real Estate', slug: 'real-estate' },
  { icon: FiVideo, name: 'Media', slug: 'media' },
  { icon: FiCode, name: 'Software Development', slug: 'software-development' },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

export default function Home() {
  const location = useLocation()
  const servicesRef = useRef(null)
  const servicesInView = useInView(servicesRef, { once: true, margin: '-50px' })
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

      <section ref={servicesRef} className="relative z-10 -mt-px overflow-hidden py-20 lg:py-28 bg-surface">
        <SectionBackdrop variant="surface" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label text-indigo-400/90 text-center mb-3"
          >
            What We Offer
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hero-title text-white text-center mb-4"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white/60 max-w-2xl mx-auto mb-14"
          >
            Real estate, software development, and media.
          </motion.p>
          <motion.div
            variants={container}
            initial="hidden"
            animate={servicesInView ? 'show' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {TBG_SERVICES.map(({ icon: Icon, name, slug }) => (
              <motion.div key={slug} variants={item}>
                <Link
                  to={`/services/${slug}`}
                  className="card-glass flex items-center gap-4 p-6 group"
                >
                  <div className="p-2.5 rounded-xl bg-white/10 text-cyan-400 group-hover:bg-gradient-accent group-hover:text-white transition-all duration-300 group-hover:scale-110">
                    <Icon className="text-2xl" />
                  </div>
                  <span className="font-semibold text-white">{name}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/services"
              className="btn-glow inline-block px-8 py-3.5 text-white font-semibold"
            >
              View All Services
            </Link>
          </motion.div>
        </div>
      </section>

      <SectionShapeBridge shape="ripple" tone="surface-surface" />

      <OurStorySection />

      <SectionShapeBridge shape="ridge" tone="surface-primary" />

      <CoreValuesSection />

      <SectionShapeBridge shape="bowl" tone="primary-surface" />

      <DifferentiatorsSection />

      <SectionShapeBridge shape="steps" tone="surface-primary" />

      <LogosSection />

      <SectionShapeBridge shape="slope" tone="primary-surface" />

      <TestimonialsSection />

      <SectionShapeBridge shape="arc" tone="surface-primary" />

      <AboutCTASection />
    </>
  )
}
