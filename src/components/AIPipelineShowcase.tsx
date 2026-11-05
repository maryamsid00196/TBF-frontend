import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import {
  FiFilm,
  FiScissors,
  FiEdit3,
  FiShield,
  FiSend,
  FiActivity,
  FiInstagram,
  FiYoutube,
  FiMapPin,
  FiMusic,
  FiCheck,
} from 'react-icons/fi'
import SectionBackdrop from './SectionBackdrop'
import { useContactModal } from '../context/ContactModalContext'

const STAGES = [
  { icon: FiFilm, name: 'Ingest', time: '07:00', detail: 'Real footage pulled from the shoot library' },
  { icon: FiScissors, name: 'Create', time: '08:00', detail: 'AI cuts branded reels and photo posts' },
  { icon: FiEdit3, name: 'Caption', time: '09:00', detail: 'Platform-ready captions in brand voice' },
  { icon: FiShield, name: 'Check', time: '09:35', detail: 'Every file reviewed before it can go live' },
  { icon: FiSend, name: 'Publish', time: '10:00', detail: 'Posted channel by channel, links saved' },
  { icon: FiActivity, name: 'Watch', time: '24/7', detail: 'Sessions kept alive, alerts on failure' },
]

const LOGS: string[][] = [
  ['07:00:04', 'ingest', '14 new clips found in footage library'],
  ['08:00:11', 'create', 'picked 6 best clips · plates blurred'],
  ['08:03:42', 'create', 'reel_01.mp4 rendered · style: kinetic · 14.2s'],
  ['09:00:07', 'caption', 'IG · TikTok · YouTube captions drafted'],
  ['09:35:19', 'check', 'reel_01 approved ✓ · photo_02 held: blurry'],
  ['10:00:02', 'publish', 'TikTok live → link saved to sheet'],
  ['11:00:15', 'publish', 'Instagram reel verified on profile ✓'],
  ['11:00:48', 'publish', 'YouTube Short published → link saved'],
  ['12:00:03', 'publish', 'Google profile photo post live'],
  ['14:00:00', 'watch', 'all sessions healthy · daily report sent'],
]

const STAGE_INDEX: Record<string, number> = { ingest: 0, create: 1, caption: 2, check: 3, publish: 4, watch: 5 }

const CHANNELS = [
  { icon: FiInstagram, name: 'Instagram' },
  { icon: FiMusic, name: 'TikTok' },
  { icon: FiYoutube, name: 'YouTube' },
  { icon: FiMapPin, name: 'Google' },
]

const STATS = [
  { value: '7/7', label: 'days a week, no one presses a button' },
  { value: '4+', label: 'channels published from one footage library' },
  { value: '100%', label: 'of files checked before going live' },
  { value: '1', label: 'tracking sheet with every live link' },
]

export default function AIPipelineShowcase() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { margin: '-120px' })
  const reduce = useReducedMotion()
  const { openModal } = useContactModal()
  const [step, setStep] = useState(reduce ? LOGS.length - 1 : 0)

  useEffect(() => {
    if (!inView || reduce) return
    const t = window.setInterval(() => setStep((s) => (s + 1) % (LOGS.length + 2)), 1400)
    return () => window.clearInterval(t)
  }, [inView, reduce])

  const visibleLogs = LOGS.slice(0, Math.min(step + 1, LOGS.length))
  const activeStage = STAGE_INDEX[LOGS[Math.min(step, LOGS.length - 1)][1]]
  const publishedText = visibleLogs.filter((l) => l[1] === 'publish').map((l) => l[2]).join(' ')

  return (
    <section ref={ref} id="ai-pipelines" className="relative overflow-hidden py-20 lg:py-28 bg-primary scroll-mt-24">
      <SectionBackdrop variant="primary" />
      <div className="absolute inset-0 bg-gradient-hero opacity-60 pointer-events-none" aria-hidden />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label text-cyan-300 mb-3"
          >
            AI Pipelines
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05]"
          >
            Marketing that <span className="text-gradient-brand">runs itself.</span>
            <br className="hidden sm:block" /> Every single day.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-lg text-white/65"
          >
            We build production lines that turn real footage into branded reels, write the captions, check every file
            and publish to every channel, then report back. Live today for businesses in Dubai.
          </motion.p>
        </div>

        {/* Pipeline track */}
        <div className="relative mt-14 lg:mt-16">
          <div className="hidden lg:block absolute left-[8%] right-[8%] top-[34px] h-px bg-white/10" aria-hidden>
            <motion.div
              className="absolute top-0 left-0 h-px bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500"
              animate={{ width: `${(activeStage / (STAGES.length - 1)) * 100}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
            {!reduce && (
              <motion.div
                className="absolute -top-[3px] h-[7px] w-24 rounded-full bg-cyan-300/70 blur-[3px]"
                animate={{ left: ['-10%', '100%'] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
              />
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-3">
            {STAGES.map(({ icon: Icon, name, time, detail }, i) => {
              const active = i === activeStage
              const done = i < activeStage
              return (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="relative flex flex-col items-center text-center"
                >
                  <motion.div
                    animate={active && !reduce ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                    transition={{ duration: 1.4, repeat: active ? Infinity : 0 }}
                    className={`relative z-10 flex h-[68px] w-[68px] items-center justify-center rounded-2xl border transition-colors duration-500 ${
                      active
                        ? 'border-cyan-300/70 bg-gradient-accent text-white shadow-glow-strong'
                        : done
                          ? 'border-indigo-400/40 bg-indigo-500/15 text-indigo-200'
                          : 'border-white/10 bg-white/[0.04] text-white/50'
                    }`}
                  >
                    <Icon className="text-2xl" />
                    {done && (
                      <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-[10px] text-primary">
                        <FiCheck />
                      </span>
                    )}
                  </motion.div>
                  <span className="mt-3 font-mono text-[11px] tracking-wider text-cyan-300/80">{time}</span>
                  <span className="font-heading font-semibold text-white">{name}</span>
                  <span className="mt-1 text-xs text-white/50 leading-snug max-w-[11rem]">{detail}</span>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Console + outputs */}
        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 rounded-2xl border border-white/10 bg-[#070a12]/90 shadow-glow overflow-hidden"
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-3 font-mono text-xs text-white/40">content-line · today</span>
              <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE
              </span>
            </div>
            <div className="h-[290px] overflow-hidden px-4 py-3 font-mono text-[12.5px] leading-7" aria-live="off">
              <AnimatePresence initial={false}>
                {visibleLogs.map(([t, stage, msg]) => (
                  <motion.div
                    key={t}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-3 whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    <span className="text-white/30">{t}</span>
                    <span className="w-16 shrink-0 text-cyan-300">{stage}</span>
                    <span className="text-white/75 truncate">{msg}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {step < LOGS.length && <span className="inline-block h-4 w-2 translate-y-1 bg-cyan-300/80 animate-pulse" />}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <p className="font-mono text-xs uppercase tracking-wider text-white/40">Published today</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {CHANNELS.map(({ icon: Icon, name }) => {
                const live = publishedText.includes(name)
                return (
                  <div
                    key={name}
                    className={`flex items-center gap-3 rounded-xl border px-3 py-3 transition-all duration-500 ${
                      live ? 'border-emerald-400/40 bg-emerald-400/10' : 'border-white/10 bg-white/[0.02]'
                    }`}
                  >
                    <Icon className={`text-xl ${live ? 'text-emerald-300' : 'text-white/40'}`} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">{name}</p>
                      <p className={`text-[11px] ${live ? 'text-emerald-300' : 'text-white/40'}`}>
                        {live ? 'Live · link saved' : 'Queued'}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-xl bg-white/[0.03] border border-white/5 p-3">
                  <p className="font-heading text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-[11px] leading-snug text-white/50">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/services/software-development#work" className="btn-glow px-8 py-3.5 text-white font-semibold">
            See the work
          </Link>
          <button
            type="button"
            onClick={() => openModal({ service_interest: 'Software Development - AI' })}
            className="px-8 py-3.5 rounded-lg border border-white/15 text-white/90 font-semibold hover:border-cyan-300/60 hover:text-white transition"
          >
            Build my pipeline
          </button>
        </div>
      </div>
    </section>
  )
}
