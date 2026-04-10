import { useId } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Props = {
  variant: 'surface' | 'primary'
}

/**
 * Subtle mesh lines, gradient blooms, and grid for section depth (sits under content at z-0).
 */
export default function SectionBackdrop({ variant }: Props) {
  const reduced = useReducedMotion()
  const isPrimary = variant === 'primary'
  const gradId = `sb-stroke-${useId().replace(/:/g, '')}`

  const paths = isPrimary
    ? ['M0 180 Q 400 80 800 200 T 1600 140', 'M-80 420 Q 500 320 1000 440 T 1800 380']
    : ['M0 220 Q 450 120 900 240 T 1600 160', 'M-60 480 Q 520 360 1040 500 T 1760 400']

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0" aria-hidden>
      <div
        className={`absolute inset-0 ${
          isPrimary
            ? 'bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.12),transparent),radial-gradient(ellipse_60%_40%_at_100%_50%,rgba(34,211,238,0.06),transparent)]'
            : 'bg-[radial-gradient(ellipse_70%_45%_at_20%_0%,rgba(99,102,241,0.1),transparent),radial-gradient(ellipse_50%_35%_at_90%_80%,rgba(34,211,238,0.07),transparent)]'
        }`}
      />

      <svg
        className="absolute w-[140%] min-h-[100%] -left-[20%] top-0 opacity-[0.14] sm:opacity-[0.18]"
        viewBox="0 0 1600 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.22" />
          </linearGradient>
        </defs>
        {paths.map((d, i) =>
          reduced ? (
            <path key={i} d={d} fill="none" stroke={`url(#${gradId})`} strokeWidth="1" />
          ) : (
            <motion.path
              key={i}
              d={d}
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth="1"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.6 + i * 0.2, ease: 'easeOut' }}
            />
          ),
        )}
      </svg>

      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148,163,184,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      <div
        className={`absolute -right-[20%] top-1/2 -translate-y-1/2 w-[min(70vw,520px)] aspect-square rounded-full blur-[80px] ${
          isPrimary ? 'bg-indigo-600/12' : 'bg-cyan-500/10'
        }`}
      />
      <div
        className={`absolute -left-[15%] bottom-0 w-[min(55vw,400px)] aspect-square rounded-full blur-[70px] ${
          isPrimary ? 'bg-cyan-500/8' : 'bg-indigo-500/10'
        }`}
      />
    </div>
  )
}
