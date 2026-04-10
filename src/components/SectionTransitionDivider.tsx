import { useId, useRef } from 'react'
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion'

export type TransitionShape =
  | 'peak'
  | 'valley'
  | 'wave'
  | 'skew'
  | 'double'
  | 'arc'
  /** Jagged “mountain range” polyline */
  | 'ridge'
  /** Single straight diagonal across the width */
  | 'slope'
  /** Blocky stepped staircase edge */
  | 'steps'
  /** Smooth S-curve with two soft bumps (cubic) */
  | 'ripple'
  /** Wide smooth scoop (concave) */
  | 'bowl'
export type TransitionTone = 'primary-surface' | 'surface-primary' | 'surface-surface'

const VB = 120
const FLAT = 84

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function morphAmount(p: number, reduced: boolean, start: number, end: number) {
  if (reduced) return 1
  if (p <= start) return 0
  if (p >= end) return 1
  return (p - start) / (end - start)
}

function buildPaths(shape: TransitionShape, t: number): { fill: string; stroke: string } {
  switch (shape) {
    case 'peak': {
      const mid = lerp(FLAT, 4, t)
      const side = lerp(FLAT, 92, t)
      return {
        fill: `M0,${side} L720,${mid} L1440,${side} L1440,${VB} L0,${VB} Z`,
        stroke: `M0,${side - 1.5} L720,${mid} L1440,${side - 1.5}`,
      }
    }
    case 'valley': {
      const side = lerp(FLAT, 44, t)
      const mid = Math.min(lerp(FLAT, 108, t), VB - 6)
      return {
        fill: `M0,${side} L720,${mid} L1440,${side} L1440,${VB} L0,${VB} Z`,
        stroke: `M0,${side + 1.5} L720,${mid} L1440,${side + 1.5}`,
      }
    }
    case 'skew': {
      const x = 520
      const y0 = lerp(FLAT, 90, t)
      const y1 = lerp(FLAT, 6, t)
      const y2 = lerp(FLAT, 88, t)
      return {
        fill: `M0,${y0} L${x},${y1} L1440,${y2} L1440,${VB} L0,${VB} Z`,
        stroke: `M0,${y0 - 1} L${x},${y1} L1440,${y2 - 1}`,
      }
    }
    case 'double': {
      const y0 = lerp(FLAT, 90, t)
      const y1 = lerp(FLAT, 22, t)
      const y2 = lerp(FLAT, 74, t)
      const y3 = lerp(FLAT, 24, t)
      const y4 = lerp(FLAT, 90, t)
      return {
        fill: `M0,${y0} L400,${y1} L720,${y2} L1040,${y3} L1440,${y4} L1440,${VB} L0,${VB} Z`,
        stroke: `M0,${y0 - 1} L400,${y1} L720,${y2} L1040,${y3} L1440,${y4 - 1}`,
      }
    }
    case 'arc': {
      const sy = lerp(FLAT, 88, t)
      const my = lerp(FLAT, 10, t)
      return {
        fill: `M0,${sy} Q720,${my} 1440,${sy} L1440,${VB} L0,${VB} Z`,
        stroke: `M0,${sy - 1} Q720,${my} 1440,${sy - 1}`,
      }
    }
    case 'wave': {
      const y0 = lerp(FLAT, 82, t)
      const yc = lerp(FLAT, 28, t)
      return {
        fill: `M0,${y0} C480,${yc} 960,${yc} 1440,${y0} L1440,${VB} L0,${VB} Z`,
        stroke: `M0,${y0 - 1} C480,${yc} 960,${yc} 1440,${y0 - 1}`,
      }
    }
    case 'ridge': {
      const xs = [0, 220, 400, 620, 820, 1040, 1240, 1440]
      const shaped = [90, 26, 78, 14, 72, 22, 84, 88]
      const ys = shaped.map((target) => lerp(FLAT, target, t))
      let d = `M0,${ys[0]}`
      for (let i = 1; i < xs.length; i++) {
        d += ` L${xs[i]},${ys[i]}`
      }
      return {
        fill: `${d} L1440,${VB} L0,${VB} Z`,
        stroke: d,
      }
    }
    case 'slope': {
      const yL = lerp(FLAT, 96, t)
      const yR = lerp(FLAT, 18, t)
      return {
        fill: `M0,${yL} L1440,${yR} L1440,${VB} L0,${VB} Z`,
        stroke: `M0,${yL - 1} L1440,${yR - 1}`,
      }
    }
    case 'steps': {
      const a = lerp(FLAT, 88, t)
      const b = lerp(FLAT, 64, t)
      const c = lerp(FLAT, 82, t)
      const d = lerp(FLAT, 48, t)
      const e = lerp(FLAT, 86, t)
      return {
        fill: `M0,${a} L320,${a} L320,${b} L640,${b} L640,${c} L1000,${c} L1000,${d} L1000,${e} L1440,${e} L1440,${VB} L0,${VB} Z`,
        stroke: `M0,${a - 1} L320,${a - 1} L320,${b - 1} L640,${b - 1} L640,${c - 1} L1000,${c - 1} L1000,${d - 1} L1000,${e - 1} L1440,${e - 1}`,
      }
    }
    case 'ripple': {
      const y0 = lerp(FLAT, 80, t)
      const c1 = lerp(FLAT, 24, t)
      const c2 = lerp(FLAT, 30, t)
      const ym = lerp(FLAT, 76, t)
      const c3 = lerp(FLAT, 22, t)
      return {
        fill: `M0,${y0} C300,${c1} 520,${c2} 720,${ym} S1120,${c3} 1440,${y0} L1440,${VB} L0,${VB} Z`,
        stroke: `M0,${y0 - 1} C300,${c1} 520,${c2} 720,${ym} S1120,${c3} 1440,${y0 - 1}`,
      }
    }
    case 'bowl': {
      const sy = lerp(FLAT, 46, t)
      const my = Math.min(lerp(FLAT, 112, t), VB - 4)
      return {
        fill: `M0,${sy} Q720,${my} 1440,${sy} L1440,${VB} L0,${VB} Z`,
        stroke: `M0,${sy - 1} Q720,${my} 1440,${sy - 1}`,
      }
    }
    default:
      return buildPaths('peak', t)
  }
}

const GRADIENT_STOPS: Record<
  TransitionTone,
  { offset: string; color: string; opacity?: number }[]
> = {
  'primary-surface': [
    { offset: '0%', color: '#0b0f1a' },
    { offset: '28%', color: '#111827' },
    { offset: '48%', color: '#1e293b' },
    { offset: '62%', color: '#172554', opacity: 0.95 },
    { offset: '78%', color: '#0c4a6e', opacity: 0.55 },
    { offset: '100%', color: '#0f172a' },
  ],
  'surface-primary': [
    { offset: '0%', color: '#0f172a' },
    { offset: '35%', color: '#152038' },
    { offset: '55%', color: '#1a1f35' },
    { offset: '72%', color: '#12182a' },
    { offset: '88%', color: '#0d1424' },
    { offset: '100%', color: '#0b0f1a' },
  ],
  'surface-surface': [
    { offset: '0%', color: '#0f172a' },
    { offset: '40%', color: '#141c2f' },
    { offset: '55%', color: '#182240' },
    { offset: '72%', color: '#131b2e' },
    { offset: '100%', color: '#0f172a' },
  ],
}

type Props = {
  shape: TransitionShape
  tone: TransitionTone
  scrollYProgress?: MotionValue<number>
  /** Scroll sub-range where flat morphs into shape (0 to 1 progress) */
  morphRange?: [number, number]
  /** When false: static straight edge (no scroll morph). Hero uses true. */
  animated?: boolean
  className?: string
}

export default function SectionTransitionDivider({
  shape,
  tone,
  scrollYProgress: externalProgress,
  morphRange,
  animated = true,
  className = '',
}: Props) {
  const reduced = useReducedMotion() ?? false
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress: internalProgress } = useScroll({
    target: ref,
    offset: ['start 0.92', 'start 0.12'],
  })
  const progress = externalProgress ?? internalProgress
  const [m0, m1] = morphRange ?? [0.22, 0.68]

  const uid = useId().replace(/:/g, '')
  const fillId = `st-fill-${uid}`
  const accentId = `st-accent-${uid}`
  const glowId = `st-glow-${uid}`

  const stops = GRADIENT_STOPS[tone]

  const fillD = useTransform(progress, (p) => {
    const t = animated ? morphAmount(p, reduced, m0, m1) : 0
    return buildPaths(shape, t).fill
  })

  const strokeD = useTransform(progress, (p) => {
    const t = animated ? morphAmount(p, reduced, m0, m1) : 0
    return buildPaths(shape, t).stroke
  })

  return (
    <motion.div
      ref={ref}
      className={`pointer-events-none leading-[0] overflow-visible ${className}`}
      aria-hidden
    >
      <svg
        viewBox={`0 0 1440 ${VB}`}
        preserveAspectRatio="none"
        className="block w-full h-[56px] sm:h-[72px] md:h-[84px]"
        aria-hidden
      >
        <defs>
          <linearGradient id={fillId} x1="0%" y1="0%" x2="50%" y2="100%">
            {stops.map((s, i) => (
              <stop
                key={i}
                offset={s.offset}
                stopColor={s.color}
                stopOpacity={s.opacity ?? 1}
              />
            ))}
          </linearGradient>
          <linearGradient id={accentId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(34,211,238,0.2)" />
            <stop offset="35%" stopColor="rgba(99,102,241,0.9)" />
            <stop offset="50%" stopColor="rgba(34,211,238,0.98)" />
            <stop offset="65%" stopColor="rgba(99,102,241,0.9)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0.2)" />
          </linearGradient>
          <filter id={glowId} x="-20%" y="-60%" width="140%" height="220%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path fill={`url(#${fillId})`} style={{ d: fillD }} />
        <motion.path
          fill="none"
          stroke={`url(#${accentId})`}
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${glowId})`}
          style={{ d: strokeD }}
        />
      </svg>
    </motion.div>
  )
}

const upperBg: Record<TransitionTone, string> = {
  'primary-surface': 'bg-primary',
  'surface-primary': 'bg-surface',
  'surface-surface': 'bg-surface',
}

/** Full-width strip matching the section above; divider sits on the bottom edge */
export function SectionShapeBridge({
  shape,
  tone,
}: {
  shape: TransitionShape
  tone: TransitionTone
}) {
  return (
    <div
      className={`relative z-10 -mt-px overflow-hidden ${upperBg[tone]} h-[56px] sm:h-[72px] md:h-[84px] pointer-events-none`}
      aria-hidden
    >
      <SectionTransitionDivider
        shape={shape}
        tone={tone}
        animated={false}
        className="absolute bottom-0 left-0 right-0 w-full"
      />
    </div>
  )
}
