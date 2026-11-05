import { useRef, type MouseEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { FiHome, FiCode, FiVideo, FiArrowUpRight } from 'react-icons/fi'
import SectionBackdrop from './SectionBackdrop'
import { PORTFOLIO, src } from './MediaPortfolio'

/* ---------- mini visuals ---------- */

function SkylineVisual() {
  const bars = [38, 62, 46, 84, 56, 72, 40, 94, 60, 50, 76, 44]
  return (
    <div className="relative h-full w-full flex items-end gap-1.5 px-5 pb-5">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-500/25 to-indigo-300/70 relative overflow-hidden"
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1.5px)',
              backgroundSize: '6px 9px',
              backgroundPosition: '2px 4px',
            }}
          />
        </motion.div>
      ))}
      <div className="absolute inset-x-5 bottom-5 h-px bg-indigo-300/50" />
    </div>
  )
}

function CodeVisual() {
  const reduce = useReducedMotion()
  const lines = [
    ['const', ' pipeline = ', 'agent', '({'],
    ['  ingest', ': footageLibrary,'],
    ['  create', ': ', 'renderReels', '(brand),'],
    ['  check', ': ', 'reviewEveryFile', ','],
    ['  publish', ': [ig, tiktok, yt, maps],'],
    ['})'],
    ['await', ' pipeline.', 'run', '({ daily: ', 'true', ' })'],
  ]
  return (
    <div className="h-full w-full p-5 font-mono text-[11.5px] leading-6">
      {lines.map((parts, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -6 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: reduce ? 0 : 0.12 * i }}
          className="whitespace-nowrap overflow-hidden"
        >
          <span className="mr-3 text-white/20">{i + 1}</span>
          {parts.map((p, j) => (
            <span
              key={j}
              className={
                /^(const|await)$/.test(p)
                  ? 'text-violet-300'
                  : /^(agent|renderReels|reviewEveryFile|run)$/.test(p)
                    ? 'text-cyan-300'
                    : p === 'true'
                      ? 'text-amber-300'
                      : 'text-white/65'
              }
            >
              {p}
            </span>
          ))}
        </motion.div>
      ))}
      <span className="ml-6 inline-block h-3.5 w-1.5 translate-y-0.5 bg-cyan-300/80 animate-pulse" />
    </div>
  )
}

function FilmVisual() {
  const reduce = useReducedMotion()
  const frames = [...PORTFOLIO, ...PORTFOLIO]
  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.div
        className="absolute left-0 top-1/2 flex -translate-y-1/2 gap-2.5 pl-4"
        animate={reduce ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {frames.map((p, i) => (
          <div key={i} className="h-36 aspect-[9/16] shrink-0 overflow-hidden rounded-lg border border-white/10">
            <img src={src(p.slug, 'jpg')} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#0d1324] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#0d1324] to-transparent" />
    </div>
  )
}

/* ---------- card ---------- */

type Service = {
  icon: typeof FiHome
  index: string
  name: string
  slug: string
  pitch: string
  tags: string[]
  visual: ReactNode
  accent: string
}

export const SERVICES: Service[] = [
  {
    icon: FiHome,
    index: '01',
    name: 'Real Estate',
    slug: 'real-estate',
    pitch: 'Commercial, residential and advisory, from acquisition to portfolio growth.',
    tags: ['Commercial', 'Residential', 'Advisory'],
    visual: <SkylineVisual />,
    accent: '#818cf8',
  },
  {
    icon: FiCode,
    index: '02',
    name: 'Software & AI',
    slug: 'software-development',
    pitch: 'AI pipelines, web and mobile apps that run your operations on autopilot.',
    tags: ['AI pipelines', 'Web', 'Mobile'],
    visual: <CodeVisual />,
    accent: '#22d3ee',
  },
  {
    icon: FiVideo,
    index: '03',
    name: 'Media',
    slug: 'media',
    pitch: 'Commercials, CGI, AI video and social content, shot and edited in-house.',
    tags: ['Production', 'CGI & AI', 'Social'],
    visual: <FilmVisual />,
    accent: '#c084fc',
  },
]

export function ServiceCard({ s, i }: { s: Service; i: number }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduce = useReducedMotion()
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
    if (!reduce) {
      rx.set((0.5 - py) * 8)
      ry.set((px - 0.5) * 10)
    }
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  const Icon = s.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}>
        <Link
          ref={ref}
          to={`/services/${s.slug}`}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="spotlight-card group flex h-full flex-col overflow-hidden rounded-3xl bg-[#0d1324]/90 backdrop-blur"
        >
          <div className="relative h-52 border-b border-white/5 overflow-hidden">
            <div
              className="absolute inset-0 opacity-40"
              style={{ background: `radial-gradient(circle at 70% 20%, ${s.accent}33, transparent 60%)` }}
            />
            {s.visual}
          </div>
          <div className="flex flex-1 flex-col p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-white transition group-hover:scale-110"
                  style={{ background: `linear-gradient(135deg, ${s.accent}, #6366f1)` }}
                >
                  <Icon />
                </span>
                <h3 className="font-heading text-xl font-bold text-white">{s.name}</h3>
              </div>
              <span className="font-mono text-xs text-white/30">{s.index}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/60">{s.pitch}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/60">
                  {t}
                </span>
              ))}
            </div>
            <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">
              Explore
              <FiArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default function HomeServices() {
  return (
    <section className="relative z-10 -mt-px overflow-hidden py-20 lg:py-28 bg-surface">
      <SectionBackdrop variant="surface" />
      <div
        className="absolute left-1/2 top-1/3 h-[480px] w-[min(1000px,130vw)] -translate-x-1/2 rounded-full blur-[120px] opacity-40 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.35), rgba(34,211,238,0.12) 50%, transparent 70%)' }}
        aria-hidden
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label text-indigo-300 mb-3"
            >
              What We Offer
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05]"
            >
              Three divisions. <span className="text-gradient-brand">One partner.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-start lg:items-end gap-4"
          >
            <p className="text-white/60 max-w-sm lg:text-right">
              Each service stands on its own. Together they cover everything from the property to the platform to the post.
            </p>
            <Link to="/services" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">
              View all services →
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.slug} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
