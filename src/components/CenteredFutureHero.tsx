import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useReducedMotion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { FiChevronRight, FiHome, FiCode, FiVideo, FiPlay } from 'react-icons/fi'
import { HERO_TAGLINES } from '../constants/hero'
import HeroFloatingSquares from './HeroFloatingSquares'

const DIVISIONS = [
  { icon: FiHome, label: 'Real Estate', to: '/services/real-estate' },
  { icon: FiCode, label: 'Software & AI', to: '/services/software-development' },
  { icon: FiVideo, label: 'Media', to: '/services/media' },
]

/**
 * Centered hero: aurora glow, perspective grid floor, cursor spotlight and floating squares.
 */
export default function CenteredFutureHero() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [taglineIndex, setTaglineIndex] = useState(0)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 120])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    const t = setInterval(() => setTaglineIndex((i) => (i + 1) % HERO_TAGLINES.length), 3000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      setMouse({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height })
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [reduced])

  const words = ['We', 'build', 'your', 'future.']

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden bg-primary min-h-[min(92dvh,900px)] py-20 md:py-24 lg:py-28"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-primary to-primary z-0" aria-hidden />

      {/* Aurora + floor */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        <div className="hero-aurora" />
        <div className="hero-floor" />
        <div className="absolute inset-x-0 bottom-[45%] h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent blur-[1px]" />
      </div>

      <HeroFloatingSquares mouse={mouse} reduced={reduced ?? false} />

      {/* Cursor spotlight */}
      {!reduced && (
        <div
          className="absolute w-[520px] h-[520px] rounded-full pointer-events-none z-[1] transition-[left,top] duration-200 ease-out"
          style={{
            left: `${mouse.x * 100}%`,
            top: `${mouse.y * 100}%`,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(99,102,241,0.22) 0%, rgba(34,211,238,0.08) 40%, transparent 70%)',
            filter: 'blur(20px)',
          }}
          aria-hidden
        />
      )}

      {/* Fine grid */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at 50% 40%, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, black 20%, transparent 70%)',
        }}
        aria-hidden
      />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 max-w-4xl mx-auto py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
            AI pipelines now live in Dubai
          </span>
        </motion.div>

        <motion.h1
          className="mt-7 font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[5.75rem] font-bold text-white tracking-tight leading-[1.02]"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.09 } }, hidden: {} }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className={`inline-block mr-[0.22em] last:mr-0 ${word === 'future.' ? 'text-shimmer-brand' : ''}`}
              variants={{
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', rotateX: 0 },
                hidden: { opacity: 0, y: 30, filter: 'blur(10px)', rotateX: -40 },
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <div className="mt-6 min-h-[1.75rem] flex justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={taglineIndex}
              initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
              transition={{ duration: 0.35 }}
              className="text-lg sm:text-xl text-white/75"
            >
              {HERO_TAGLINES[taglineIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="mt-4 text-base sm:text-lg text-white/55 max-w-xl mx-auto leading-relaxed"
        >
          Property, platforms and production under one roof, with AI built into every service.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.45 }}
          className="mt-9 flex flex-wrap justify-center gap-3"
        >
          {DIVISIONS.map(({ icon: Icon, label, to }) => (
            <Link
              key={label}
              to={to}
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:border-cyan-300/50 hover:bg-white/[0.08] hover:text-white hover:shadow-glow-cyan"
            >
              <Icon className="text-cyan-300 transition group-hover:scale-110" />
              {label}
            </Link>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.85, duration: 0.45 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 btn-glow px-9 py-4 text-white font-semibold text-base"
          >
            Get in touch
            <FiChevronRight className="text-lg" aria-hidden />
          </Link>
          <a
            href="#showreel"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('showreel')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            className="group inline-flex items-center gap-3 rounded-lg border border-white/15 px-7 py-4 text-white/90 font-semibold transition hover:border-cyan-300/60 hover:text-white"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition group-hover:bg-gradient-accent">
              <FiPlay className="translate-x-px text-sm" />
            </span>
            Watch our work
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
