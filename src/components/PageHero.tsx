import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiChevronRight } from 'react-icons/fi'

type Crumb = { label: string; to?: string }

/** Shared hero for inner pages: aurora glow, masked grid, breadcrumb, gradient headline. */
export default function PageHero({
  label,
  title,
  highlight,
  description,
  crumbs = [],
  children,
  accent = '#22d3ee',
}: {
  label: string
  title: string
  /** Part of the title rendered with the brand gradient (appended after `title`). */
  highlight?: string
  description: string
  crumbs?: Crumb[]
  children?: ReactNode
  accent?: string
}) {
  return (
    <section className="relative overflow-hidden bg-primary pt-16 pb-20 lg:pt-24 lg:pb-28">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="hero-aurora" style={{ top: '30%', opacity: 0.35 }} />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse at 50% 30%, black 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 20%, transparent 70%)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {crumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-1.5 text-xs text-white/45"
          >
            <Link to="/" className="hover:text-white">Home</Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5">
                <FiChevronRight aria-hidden />
                {c.to ? (
                  <Link to={c.to} className="hover:text-white">{c.label}</Link>
                ) : (
                  <span className="text-white/75">{c.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-label mb-4"
            style={{ color: accent, background: `${accent}1a`, borderColor: `${accent}40` }}
          >
            {label}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.03]"
          >
            {title}
            {highlight && (
              <>
                {' '}
                <span className="text-shimmer-brand">{highlight}</span>
              </>
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 text-lg sm:text-xl text-white/65 leading-relaxed"
          >
            {description}
          </motion.p>
        </div>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-10"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}

/** Big closing call-to-action band, used at the bottom of inner pages. */
export function CTABand({
  title = "Let's build what's next.",
  text = "Tell us what you need and we'll come back with a clear plan, timeline and next steps.",
  onPrimary,
  primaryLabel = 'Start a project',
}: {
  title?: string
  text?: string
  onPrimary: () => void
  primaryLabel?: string
}) {
  return (
    <section className="relative overflow-hidden bg-primary py-20 lg:py-24">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-white/10 px-6 py-14 sm:px-12 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.25), rgba(15,23,42,0.9) 45%, rgba(34,211,238,0.18))' }}
        >
          <div className="hero-aurora" style={{ top: '50%', opacity: 0.3 }} aria-hidden />
          <div className="relative">
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight">{title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/70">{text}</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button type="button" onClick={onPrimary} className="btn-glow px-8 py-3.5 font-semibold text-white">
                {primaryLabel}
              </button>
              <Link
                to="/#showreel"
                className="rounded-lg border border-white/20 px-8 py-3.5 font-semibold text-white/90 transition hover:border-cyan-300/60 hover:text-white"
              >
                See our work
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
