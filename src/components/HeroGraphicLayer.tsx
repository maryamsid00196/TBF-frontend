import { motion, useReducedMotion } from 'framer-motion'

/** Curved mesh lines + nodes (no large ring borders) */
export default function HeroGraphicLayer() {
  const reduced = useReducedMotion()

  const paths = [
    'M40 400 Q 260 140 520 360 T 980 220',
    'M100 620 Q 380 500 660 580 T 1160 440',
    'M180 160 L 420 300 L 700 200 L 1020 340',
    'M60 520 L 340 400 L 620 480 L 920 360 L 1180 500',
  ]

  if (reduced) {
    return (
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.14] z-[2]"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="heroMeshStrokeR" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.28" />
          </linearGradient>
        </defs>
        {paths.slice(0, 2).map((d, i) => (
          <path key={i} d={d} fill="none" stroke="url(#heroMeshStrokeR)" strokeWidth="1" />
        ))}
      </svg>
    )
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]" aria-hidden>
      <svg
        className="absolute w-[125%] h-full -left-[12%] opacity-[0.18]"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="heroMeshStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#a5b4fc" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.42" />
          </linearGradient>
          <filter id="heroMeshGlow" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur stdDeviation="0.9" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {paths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="url(#heroMeshStroke)"
            strokeWidth="1.1"
            strokeLinecap="round"
            filter="url(#heroMeshGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.8 + i * 0.2, delay: 0.08 * i, ease: 'easeOut' }}
          />
        ))}
        {[
          [320, 200],
          [640, 320],
          [920, 240],
          [480, 540],
          [780, 460],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={`n-${i}`}
            cx={cx}
            cy={cy}
            r={3}
            fill="#22d3ee"
            fillOpacity={0.28}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.75 + i * 0.06, type: 'spring', stiffness: 280, damping: 22 }}
          />
        ))}
      </svg>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.85) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  )
}
