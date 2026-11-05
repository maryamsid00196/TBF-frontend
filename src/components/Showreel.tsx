import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView, useReducedMotion, type PanInfo } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiMaximize2, FiVolume2, FiVolumeX, FiPlay, FiPause } from 'react-icons/fi'
import { PORTFOLIO, Lightbox, src, type PortfolioCategory, type PortfolioItem } from './MediaPortfolio'

const FILTERS: ('All' | PortfolioCategory)[] = ['All', 'Commercial', 'CGI & AI', 'Brand', 'Real Estate']

/** Shortest signed distance from `active` to `i` on a loop of length n. */
function loopOffset(i: number, active: number, n: number) {
  let d = i - active
  if (d > n / 2) d -= n
  if (d < -n / 2) d += n
  return d
}

export default function Showreel() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const inView = useInView(sectionRef, { margin: '-150px' })
  const reduce = useReducedMotion()

  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')
  const [index, setIndex] = useState(0)
  const [muted, setMuted] = useState(true)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const [hovering, setHovering] = useState(false)
  const [open, setOpen] = useState<PortfolioItem | null>(null)

  const items = useMemo(
    () => (filter === 'All' ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === filter)),
    [filter],
  )
  const n = items.length
  const current = items[index % n]

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + n) % n), [n])

  useEffect(() => setIndex(0), [filter])
  useEffect(() => setProgress(0), [current?.slug])

  // Play the centre video only while the section is on screen.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (inView && !paused && !open) v.play().catch(() => {})
    else v.pause()
  }, [inView, paused, open, current?.slug])

  // Keyboard arrows while the section is in view.
  useEffect(() => {
    if (!inView || open) return
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [inView, open, go])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(1)
    else if (info.offset.x > 60 || info.velocity.x > 400) go(-1)
  }

  const onEnded = () => {
    if (hovering || reduce || n < 2) {
      videoRef.current?.play().catch(() => {})
    } else go(1)
  }

  return (
    <section ref={sectionRef} id="showreel" className="relative overflow-hidden py-20 lg:py-28 bg-primary scroll-mt-24">
      {/* Brand ambient glow behind the stage */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <motion.div
          className="absolute left-1/2 top-[58%] h-[620px] w-[min(1100px,140vw)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]"
          style={{ background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.38), rgba(34,211,238,0.14) 45%, transparent 70%)' }}
          animate={reduce ? undefined : { opacity: [0.75, 1, 0.75], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label mb-3"
              style={{ color: '#22d3ee', background: '#22d3ee1a', borderColor: '#22d3ee40' }}
            >
              Showreel
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05]"
            >
              Work that <span className="text-gradient-brand">stops the scroll.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-lg text-white/65"
            >
              Commercials, CGI and AI-generated films, brand content and real estate. Drag, swipe or use your arrow keys.
            </motion.p>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter showreel">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  filter === f ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                {filter === f && (
                  <motion.span
                    layoutId="showreel-filter"
                    className="absolute inset-0 rounded-full bg-gradient-accent shadow-glow"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{f}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3D stage */}
        <div
          className="relative mt-12 h-[460px] sm:h-[560px] select-none"
          style={{ perspective: '1400px' }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <motion.div
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={onDragEnd}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {items.map((item, i) => {
              const off = loopOffset(i, index % n, n)
              const abs = Math.abs(off)
              const isCenter = off === 0
              if (abs > 2) return null
              return (
                <motion.div
                  key={item.slug}
                  className="absolute left-1/2 top-1/2 h-[420px] sm:h-[520px] aspect-[9/16]"
                  initial={false}
                  animate={{
                    x: `calc(-50% + ${off * 62}%)`,
                    y: '-50%',
                    z: abs * -180,
                    rotateY: off * -28,
                    scale: 1 - abs * 0.14,
                    opacity: abs === 2 ? 0.35 : abs === 1 ? 0.75 : 1,
                    filter: isCenter ? 'brightness(1)' : 'brightness(0.55)',
                  }}
                  transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 220, damping: 30 }}
                  style={{ zIndex: 10 - abs, transformStyle: 'preserve-3d' }}
                >
                  <div
                    className={`relative h-full w-full overflow-hidden rounded-2xl border bg-black ${
                      isCenter ? 'border-white/25 shadow-[0_30px_80px_-20px_rgba(99,102,241,0.55)]' : 'border-white/10'
                    }`}
                  >
                    {isCenter ? (
                      <video
                        ref={videoRef}
                        key={item.slug}
                        src={src(item.slug, 'mp4')}
                        poster={src(item.slug, 'jpg')}
                        muted={muted}
                        playsInline
                        preload="auto"
                        onEnded={onEnded}
                        onTimeUpdate={(e) => {
                          const v = e.currentTarget
                          if (v.duration) setProgress(v.currentTime / v.duration)
                        }}
                        onClick={() => setPaused((p) => !p)}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => go(off)}
                        className="group absolute inset-0"
                        aria-label={`Show ${item.title}`}
                      >
                        <img
                          src={src(item.slug, 'jpg')}
                          alt=""
                          draggable={false}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                          <span className="rounded-full border border-white/30 bg-white/15 p-3 text-white backdrop-blur">
                            <FiPlay className="translate-x-0.5" />
                          </span>
                        </span>
                      </button>
                    )}

                    {isCenter && (
                      <>
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/85 to-transparent" />
                        <div className="absolute left-3 right-3 top-3 flex gap-2">
                          <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/25">
                            <div className="h-full bg-white" style={{ width: `${progress * 100}%` }} />
                          </div>
                        </div>
                        <div className="absolute right-3 top-6 flex flex-col gap-2">
                          <button
                            type="button"
                            onClick={() => setMuted((m) => !m)}
                            className="rounded-full bg-black/45 p-2.5 text-white backdrop-blur hover:bg-black/70"
                            aria-label={muted ? 'Unmute' : 'Mute'}
                          >
                            {muted ? <FiVolumeX /> : <FiVolume2 />}
                          </button>
                          <button
                            type="button"
                            onClick={() => setPaused((p) => !p)}
                            className="rounded-full bg-black/45 p-2.5 text-white backdrop-blur hover:bg-black/70"
                            aria-label={paused ? 'Play' : 'Pause'}
                          >
                            {paused ? <FiPlay /> : <FiPause />}
                          </button>
                          <button
                            type="button"
                            onClick={() => setOpen(item)}
                            className="rounded-full bg-black/45 p-2.5 text-white backdrop-blur hover:bg-black/70"
                            aria-label="Watch full screen"
                          >
                            <FiMaximize2 />
                          </button>
                        </div>
                        <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4">
                          <p className="font-mono text-[11px] uppercase tracking-wider text-cyan-300">{item.category}</p>
                          <p className="font-heading text-lg font-semibold text-white">{item.title}</p>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {n > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                className="absolute left-0 sm:left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-black/40 p-3 text-white backdrop-blur hover:border-cyan-300/60"
                aria-label="Previous video"
              >
                <FiChevronLeft className="text-xl" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="absolute right-0 sm:right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-black/40 p-3 text-white backdrop-blur hover:border-cyan-300/60"
                aria-label="Next video"
              >
                <FiChevronRight className="text-xl" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail rail */}
        <div className="mt-8 flex justify-center gap-2.5 overflow-x-auto pb-2">
          {items.map((item, i) => {
            const active = i === index % n
            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => setIndex(i)}
                className={`relative h-16 w-10 sm:h-20 sm:w-12 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                  active ? 'border-cyan-400 scale-110' : 'border-transparent opacity-50 hover:opacity-90'
                }`}
                aria-label={`Play ${item.title}`}
                aria-current={active}
              >
                <img src={src(item.slug, 'jpg')} alt="" className="h-full w-full object-cover" />
              </button>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <Link to="/services/media#portfolio" className="btn-glow inline-block px-8 py-3.5 text-white font-semibold">
            Explore our media services
          </Link>
        </div>
      </div>

      <AnimatePresence>{open && <Lightbox item={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  )
}
