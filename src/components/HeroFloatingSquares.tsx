type Props = {
  mouse: { x: number; y: number }
  reduced: boolean
}

type SquareSpec = {
  left: string
  top: string
  size: number
  rotate: number
  drift: 'a' | 'b' | 'c' | 'd'
  duration: string
  delay: string
  parallax: number
  opacity: number
}

const SPECS: SquareSpec[] = [
  { left: '6%', top: '12%', size: 56, rotate: 38, drift: 'a', duration: '24s', delay: '0s', parallax: 0.55, opacity: 0.85 },
  { left: '78%', top: '8%', size: 42, rotate: 52, drift: 'b', duration: '20s', delay: '-3s', parallax: 0.4, opacity: 0.7 },
  { left: '18%', top: '62%', size: 72, rotate: 33, drift: 'c', duration: '28s', delay: '-1s', parallax: 0.65, opacity: 0.9 },
  { left: '88%', top: '48%', size: 36, rotate: 48, drift: 'd', duration: '18s', delay: '-5s', parallax: 0.35, opacity: 0.65 },
  { left: '42%', top: '22%', size: 28, rotate: 45, drift: 'b', duration: '22s', delay: '-2s', parallax: 0.5, opacity: 0.55 },
  { left: '55%', top: '68%', size: 64, rotate: 40, drift: 'a', duration: '26s', delay: '-7s', parallax: 0.6, opacity: 0.8 },
  { left: '3%', top: '38%', size: 34, rotate: 50, drift: 'd', duration: '21s', delay: '-4s', parallax: 0.45, opacity: 0.6 },
  { left: '92%', top: '72%', size: 48, rotate: 44, drift: 'c', duration: '23s', delay: '-6s', parallax: 0.5, opacity: 0.75 },
  { left: '28%', top: '8%', size: 22, rotate: 46, drift: 'a', duration: '19s', delay: '-8s', parallax: 0.3, opacity: 0.45 },
  { left: '65%', top: '38%', size: 38, rotate: 41, drift: 'b', duration: '25s', delay: '-2.5s', parallax: 0.48, opacity: 0.68 },
  { left: '48%', top: '52%', size: 52, rotate: 47, drift: 'd', duration: '27s', delay: '-9s', parallax: 0.58, opacity: 0.78 },
  { left: '12%', top: '82%', size: 30, rotate: 43, drift: 'c', duration: '20s', delay: '-1.5s', parallax: 0.42, opacity: 0.58 },
]

/**
 * Glowing rotated squares (CSS drift) plus field parallax and cursor spotlight, hero only.
 */
export default function HeroFloatingSquares({ mouse, reduced }: Props) {
  const px = (mouse.x - 0.5) * 2
  const py = (mouse.y - 0.5) * 2

  const layerParallaxX = reduced ? 0 : -px * 36
  const layerParallaxY = reduced ? 0 : -py * 28

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]" aria-hidden>
      {!reduced && (
        <div
          className="absolute rounded-full mix-blend-screen opacity-95"
          style={{
            left: `${mouse.x * 100}%`,
            top: `${mouse.y * 100}%`,
            width: 'min(100vw, 560px)',
            height: 'min(100vw, 560px)',
            transform: 'translate(-50%, -50%)',
            background:
              'radial-gradient(circle, rgba(59,130,246,0.16) 0%, rgba(99,102,241,0.11) 30%, rgba(34,211,238,0.07) 50%, transparent 70%)',
            filter: 'blur(5px)',
          }}
        />
      )}

      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform:
            layerParallaxX === 0 && layerParallaxY === 0
              ? undefined
              : `translate3d(${layerParallaxX}px, ${layerParallaxY}px, 0)`,
        }}
      >
        {SPECS.map((s, i) => {
          const ox = reduced ? 0 : px * 22 * s.parallax
          const oy = reduced ? 0 : py * 18 * s.parallax
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: s.left,
                top: s.top,
                width: s.size,
                height: s.size,
                transform:
                  ox === 0 && oy === 0 ? undefined : `translate3d(${ox}px, ${oy}px, 0)`,
              }}
            >
              <div
                className={`hero-glow-square hero-glow-square--${s.drift} w-full h-full`}
                style={{
                  ['--sq-rot' as string]: `${s.rotate}deg`,
                  animationDuration: s.duration,
                  animationDelay: s.delay,
                  opacity: reduced ? s.opacity * 0.35 : s.opacity,
                  boxShadow: reduced
                    ? '0 0 20px rgba(59, 130, 246, 0.16)'
                    : `
                    0 0 16px rgba(59, 130, 246, 0.32),
                    0 0 40px rgba(37, 99, 235, 0.22),
                    0 0 70px rgba(99, 102, 241, 0.1),
                    inset 0 0 1px rgba(147, 197, 253, 0.3)
                  `,
                  background: 'rgba(8, 12, 22, 0.92)',
                  border: '1px solid rgba(99, 102, 241, 0.28)',
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
