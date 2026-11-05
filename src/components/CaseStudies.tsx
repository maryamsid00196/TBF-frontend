import { motion, useReducedMotion } from 'framer-motion'
import {
  FiFilm,
  FiBarChart2,
  FiMapPin,
  FiMessageCircle,
  FiFileText,
  FiZap,
  FiCpu,
  FiCheckCircle,
} from 'react-icons/fi'

const fade = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55 },
}

type Case = {
  tag: string
  title: string
  client: string
  challenge: string
  built: string[]
  results: { value: string; label: string }[]
  stack: string[]
  accent: string
  visual: 'pipeline' | 'dashboard'
}

const CASES: Case[] = [
  {
    tag: 'AI Content Pipeline',
    title: 'A daily marketing line that runs itself',
    client: 'Automotive service workshop · Dubai',
    challenge:
      'A busy workshop with years of great work and no time to post. Content went out when someone remembered, on one channel, with no record of what was live.',
    built: [
      'Content factory that picks the best raw clips and photos and renders branded reels in rotating styles',
      'AI captions per platform, brand-checked for the right contact number and banned wording',
      'Automated checker that reviews every file full-size and holds anything doubtful, with the reason',
      'Publishers for TikTok, Instagram, YouTube Shorts and Google Business Profile, with live links logged',
      'Session keeper that refreshes logins every 4 hours and alerts the team when a sign-in is needed',
      'Privacy rules built in: number plates blurred, nothing cropped, nothing posted twice',
    ],
    results: [
      { value: '7/7', label: 'days a week, fully automated' },
      { value: '4', label: 'channels from one footage library' },
      { value: '0', label: 'manual uploads' },
      { value: '1', label: 'sheet with every post & link' },
    ],
    stack: ['Claude AI agents', 'Video rendering', 'Browser automation', 'Google Drive & Sheets', 'Scheduled jobs'],
    accent: '#22d3ee',
    visual: 'pipeline',
  },
  {
    tag: 'Brand Intelligence + Automation',
    title: 'Weekly scorecard and Google Business auto-poster',
    client: 'Multi-brand home & auto services group · UAE',
    challenge:
      'Three brands, a dozen channels, and no single view of what was working. Google Business posting was manual and kept falling behind.',
    built: [
      'Weekly scorecard across Google search rankings, Maps listings, Instagram, SEO health and AI search readiness',
      'Published as a live dashboard the leadership team opens every Monday',
      'Google Business Profile poster that publishes approved rows from the content sheet, with photos',
      'Retry and catch-up logic so missed or failed posts are found and re-sent',
      'Every run logged back to the tracking sheet: posted, held or failed',
    ],
    results: [
      { value: '3', label: 'brands tracked in one view' },
      { value: '6', label: 'signal sources per brand' },
      { value: 'Weekly', label: 'scorecard, generated automatically' },
      { value: 'Daily', label: 'Google profile posts on autopilot' },
    ],
    stack: ['AI research agents', 'SEO & Maps data', 'Dashboards', 'Playwright automation', 'Google Sheets'],
    accent: '#a78bfa',
    visual: 'dashboard',
  },
]

const CAPABILITIES = [
  { icon: FiFilm, title: 'Content factories', text: 'Footage in, branded reels, photos and captions out, daily.' },
  { icon: FiZap, title: 'Auto-publishing bots', text: 'Post to Instagram, TikTok, YouTube and Google on a schedule, with proof.' },
  { icon: FiBarChart2, title: 'Performance scorecards', text: 'Rankings, reviews and social signals rolled into one weekly view.' },
  { icon: FiMapPin, title: 'Local SEO automation', text: 'Google Business posts, photo galleries and listing health checks.' },
  { icon: FiFileText, title: 'Document AI', text: 'Invoices, receipts and forms read and turned into clean data.' },
  { icon: FiMessageCircle, title: 'Lead & review responders', text: 'Instant, on-brand replies on WhatsApp, email and reviews.' },
]

function PipelineVisual({ accent }: { accent: string }) {
  const reduce = useReducedMotion()
  const rows = [
    ['08:00', 'Reels & photos built', '2 reels · 2 photos'],
    ['09:00', 'Captions drafted', 'IG · TikTok · YT'],
    ['09:35', 'Checked & approved', '3 ready · 1 held'],
    ['10:00', 'TikTok live', 'link saved'],
    ['11:00', 'Instagram & YouTube', 'verified on profile'],
    ['12:00', 'Google profile', 'photo posts live'],
  ]
  return (
    <div className="relative rounded-2xl border border-white/10 bg-[#070a12]/90 p-5 overflow-hidden">
      <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full blur-[70px] opacity-30" style={{ background: accent }} />
      <p className="relative font-mono text-[11px] uppercase tracking-wider text-white/40">A day on the line</p>
      <div className="relative mt-4 space-y-2.5">
        {rows.map(([t, a, b], i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: reduce ? 0 : 0.15 * i }}
            className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2.5"
          >
            <span className="font-mono text-xs" style={{ color: accent }}>{t}</span>
            <span className="text-sm text-white/85 flex-1">{a}</span>
            <span className="text-[11px] text-white/45 hidden sm:inline">{b}</span>
            <FiCheckCircle className="text-emerald-400 shrink-0" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function DashboardVisual({ accent }: { accent: string }) {
  const brands = [
    { name: 'Brand A', score: 82, delta: '+6' },
    { name: 'Brand B', score: 67, delta: '+3' },
    { name: 'Brand C', score: 58, delta: '+9' },
  ]
  const metrics = ['Search', 'Maps', 'Instagram', 'AI search', 'Site health']
  const cells = [
    [88, 91, 74, 69, 85],
    [72, 80, 55, 61, 70],
    [60, 66, 48, 52, 63],
  ]
  return (
    <div className="relative rounded-2xl border border-white/10 bg-[#070a12]/90 p-5 overflow-hidden">
      <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full blur-[70px] opacity-30" style={{ background: accent }} />
      <div className="relative flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-wider text-white/40">Weekly scorecard</p>
        <span className="font-mono text-[11px] text-emerald-300">auto-generated · Mon 08:00</span>
      </div>
      <div className="relative mt-4 grid grid-cols-3 gap-3">
        {brands.map((b, i) => (
          <div key={b.name} className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-center">
            <div className="relative mx-auto h-16 w-16">
              <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                <motion.circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke={accent}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="97.4"
                  initial={{ strokeDashoffset: 97.4 }}
                  whileInView={{ strokeDashoffset: 97.4 * (1 - b.score / 100) }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.15 }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-heading font-bold text-white">{b.score}</span>
            </div>
            <p className="mt-2 text-xs text-white/70">{b.name}</p>
            <p className="text-[11px] text-emerald-300">{b.delta} wk/wk</p>
          </div>
        ))}
      </div>
      <div className="relative mt-4 space-y-1.5">
        {metrics.map((m, mi) => (
          <div key={m} className="flex items-center gap-2">
            <span className="w-20 shrink-0 text-[11px] text-white/45">{m}</span>
            <div className="grid flex-1 grid-cols-3 gap-1.5">
              {cells.map((row, bi) => (
                <div key={bi} className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, #6366f1, ${accent})` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${row[mi]}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.05 * (mi + bi) }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="relative mt-4 flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2">
        <FiMapPin className="text-emerald-300" />
        <span className="text-xs text-white/75">Google Business: 21 posts this week</span>
        <span className="ml-auto font-mono text-[11px] text-white/40">0 failed</span>
      </div>
    </div>
  )
}

export default function CaseStudies() {
  return (
    <section id="work" className="relative py-20 lg:py-28 bg-surface overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 bg-gradient-hero opacity-50 pointer-events-none" aria-hidden />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.p {...fade} className="section-label text-cyan-300 mb-3">Our Work</motion.p>
          <motion.h2 {...fade} className="font-heading text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Systems we've built and <span className="text-gradient-brand">run in production</span>
          </motion.h2>
          <motion.p {...fade} className="mt-4 text-lg text-white/65">
            Not demos. These pipelines run every day for real businesses in the UAE. Client names kept confidential.
          </motion.p>
        </div>

        <div className="mt-14 space-y-10 lg:space-y-14">
          {CASES.map((c, idx) => (
            <motion.article
              key={c.title}
              {...fade}
              className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:p-10"
            >
              <div className={idx % 2 ? 'lg:order-2' : ''}>
                <span
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider"
                  style={{ color: c.accent, borderColor: `${c.accent}55`, background: `${c.accent}12` }}
                >
                  <FiCpu /> {c.tag}
                </span>
                <h3 className="mt-4 font-heading text-2xl sm:text-3xl font-bold text-white">{c.title}</h3>
                <p className="mt-1 text-sm text-white/45">{c.client}</p>
                <p className="mt-5 text-white/70 leading-relaxed">
                  <span className="font-semibold text-white/90">The problem. </span>
                  {c.challenge}
                </p>
                <p className="mt-5 font-semibold text-white/90">What we built</p>
                <ul className="mt-3 space-y-2">
                  {c.built.map((b) => (
                    <li key={b} className="flex gap-2.5 text-sm text-white/70 leading-relaxed">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: c.accent }} />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {c.stack.map((s) => (
                    <span key={s} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/60">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className={idx % 2 ? 'lg:order-1' : ''}>
                {c.visual === 'pipeline' ? <PipelineVisual accent={c.accent} /> : <DashboardVisual accent={c.accent} />}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {c.results.map((r) => (
                    <div key={r.label} className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                      <p className="font-heading text-xl font-bold text-white">{r.value}</p>
                      <p className="text-[11px] leading-snug text-white/50">{r.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-20">
          <motion.p {...fade} className="section-label text-indigo-300 mb-3">AI Pipelines</motion.p>
          <motion.h3 {...fade} className="font-heading text-3xl lg:text-4xl font-bold text-white">
            Pipelines we can build for you
          </motion.h3>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="card-glass p-5 group"
              >
                <div className="inline-flex rounded-lg bg-white/10 p-2.5 text-cyan-300 transition group-hover:bg-gradient-accent group-hover:text-white">
                  <Icon className="text-xl" />
                </div>
                <p className="mt-3 font-heading font-semibold text-white">{title}</p>
                <p className="mt-1 text-sm text-white/55">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
