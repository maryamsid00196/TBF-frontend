import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion'
import { FiChevronRight } from 'react-icons/fi'
import { HERO_TAGLINES } from './aboutSections'
import HeroGraphicLayer from './HeroGraphicLayer'
import HeroFloatingSquares from './HeroFloatingSquares'

/**
 * Centered hero: “We build your future with you.” Mesh lines, bokeh, grid, subtle cursor glow.
 */
export default function CenteredFutureHero() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [taglineIndex, setTaglineIndex] = useState(0)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const reduced = useReducedMotion()

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

  const headline = 'We build your future with you.'
  const words = headline.split(' ')

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden bg-primary min-h-[min(88dvh,860px)] py-20 md:py-24 lg:py-28"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-primary to-slate-950 z-0" aria-hidden />
      <HeroFloatingSquares mouse={mouse} reduced={reduced ?? false} />
      <HeroGraphicLayer />

      {!reduced && (
        <div
          className="absolute w-[min(100vw,720px)] h-[min(100vw,720px)] rounded-full pointer-events-none opacity-[0.14]"
          style={{
            right: '-18%',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'radial-gradient(circle, rgba(34,211,238,0.28) 0%, rgba(99,102,241,0.1) 45%, transparent 70%)',
            filter: 'blur(2px)',
          }}
          aria-hidden
        />
      )}

      {!reduced && (
        <motion.div
          className="absolute w-[min(55vw,420px)] h-[min(55vw,420px)] rounded-full pointer-events-none opacity-25"
          style={{
            left: '-8%',
            top: '18%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.5), transparent 68%)',
            filter: 'blur(40px)',
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.28, 0.2] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        />
      )}
      {!reduced && (
        <motion.div
          className="absolute w-[280px] h-[280px] rounded-full pointer-events-none opacity-20"
          style={{
            left: '22%',
            bottom: '12%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.4), transparent 70%)',
            filter: 'blur(36px)',
          }}
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        />
      )}
      {!reduced && (
        <div
          className="absolute w-[min(55vw,380px)] h-[min(55vw,380px)] rounded-full pointer-events-none opacity-[0.055]"
          style={{
            left: `${mouse.x * 100}%`,
            top: `${mouse.y * 100}%`,
            transform: 'translate(-50%, -50%)',
            background:
              'radial-gradient(circle, rgba(15,23,42,0.85) 0%, rgba(99,102,241,0.12) 35%, rgba(34,211,238,0.06) 55%, transparent 70%)',
            filter: 'blur(32px)',
          }}
          aria-hidden
        />
      )}

      <div
        className="absolute inset-0 z-[2] opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-3xl mx-auto py-6 sm:py-8 md:py-10">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08]"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            visible: { transition: { staggerChildren: 0.07 } },
            hidden: {},
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.22em] last:mr-0"
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 22 },
              }}
              transition={{ duration: 0.45 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <div className="mt-6 min-h-[1.75rem] flex justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={taglineIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              className="text-lg sm:text-xl text-white/70 font-normal"
            >
              {HERO_TAGLINES[taglineIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="mt-5 text-base sm:text-lg text-white/60 max-w-xl mx-auto leading-relaxed"
        >
          From real estate to software development and media, each of our services stands on its own.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.75, duration: 0.45 }}
          className="mt-10 sm:mt-12"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 btn-glow px-9 py-4 rounded-full text-white font-semibold text-base hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            Get in touch
            <FiChevronRight className="text-lg" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
