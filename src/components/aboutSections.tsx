import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiCpu,
  FiTrendingUp,
  FiTarget,
  FiAward,
  FiZap,
  FiHeart,
  FiChevronRight,
  FiChevronLeft,
  FiStar,
  FiBriefcase,
  FiUserPlus,
  FiLink2,
  FiShield,
  FiUsers,
  FiCode,
  FiVideo,
} from 'react-icons/fi'
import type { IconType } from 'react-icons'
import { useContactModal } from '../context/ContactModalContext'
import Counter, { useCounterInView } from './Counter'
import SectionBackdrop from './SectionBackdrop'

const STORY_STATS = [
  { value: 15, suffix: '+', label: 'Years in business' },
  { value: 150, suffix: '+', label: 'Clients served' },
  { value: 50, suffix: '+', label: 'Team members' },
  { value: 200, suffix: '+', label: 'Projects delivered' },
]

const MILESTONES = [
  { year: '2010', title: 'Founded' },
  { year: '2012', title: 'Expanded in Asia' },
  { year: '2016', title: 'Expanded in USA' },
  { year: '2024', title: 'Expanded in UAE' },
]

const DIVISION_TILES = [
  { icon: FiCode, name: 'Software & AI', text: 'Pipelines, web & mobile apps', accent: '#22d3ee' },
  { icon: FiVideo, name: 'Media', text: 'Production, CGI & social', accent: '#c084fc' },
]

type Item = { icon: IconType; title: string; text: string }

const DIFFERENTIATORS: (Item & { stat: string; statLabel: string })[] = [
  {
    icon: FiBriefcase,
    title: 'One partner, tech and creative',
    text: 'Software and media under one roof. Your content is filmed by our crew, your website and automations are built by our engineers, and nothing gets lost between agencies.',
    stat: '2',
    statLabel: 'divisions, one team',
  },
  {
    icon: FiCpu,
    title: 'AI built in, not bolted on',
    text: 'We run AI pipelines in production every day, so we know what works. Every service we offer is faster and smarter because of it.',
    stat: '7/7',
    statLabel: 'days our pipelines run',
  },
  {
    icon: FiTrendingUp,
    title: 'Built to scale with you',
    text: 'From a single shoot to a multi-brand automation stack, we adapt to where you are and grow with you.',
    stat: '15+',
    statLabel: 'industries served',
  },
  {
    icon: FiHeart,
    title: 'People you can reach',
    text: 'A named point of contact, clear timelines and honest updates. No ticket queues.',
    stat: '1',
    statLabel: 'point of contact',
  },
]

const VALUES: Item[] = [
  { icon: FiTarget, title: 'Results driven', text: 'Success is measured by your outcomes.' },
  { icon: FiZap, title: 'Innovation first', text: 'We test new tools so you get the best.' },
  { icon: FiUsers, title: 'Partnership', text: 'Your growth is our growth.' },
  { icon: FiAward, title: 'Excellence', text: 'Quality is never an accident.' },
  { icon: FiShield, title: 'Integrity', text: 'We do what we say we will.' },
]

const BRAND_CAROUSEL = [
  { name: 'North West Contractors', url: 'https://northwestcontractors.net/', logo: '/clients/north-west-contractors.png' },
  { name: 'ICNA Relief', url: 'https://icnarelief.org/', logo: '/clients/icna-relief.png' },
  { name: 'Artal Productions', url: 'https://pro.imdb.com/company/co0865001/', logo: '/clients/artal-productions.svg' },
  { name: 'Justice For All', url: 'https://www.justiceforall.org/', logo: '/clients/justice-for-all.png' },
  { name: 'Invar Studios', url: 'https://www.invarstudios.global/mobile/', logo: '/clients/invar-studios.png' },
  { name: 'Good Karma LA', url: 'https://www.thegoodkarmala.org/', logo: '/clients/good-karma-la.svg' },
  { name: 'Muslim Network TV', url: 'https://www.muslimnetwork.tv/', logo: '/clients/muslim-network-tv.png' },
  { name: 'Neo TV', url: 'https://en.neonews.pk/', logo: '/clients/neo-tv.png' },
  { name: 'Digital Diraction', url: 'https://digitaldiraction.com/', logo: '/clients/digital-diraction.png' },
  { name: 'Superior University', url: 'https://superior.ac.ae/', logo: '/clients/superior-university.png' },
  { name: 'Naseeha Institute', url: 'https://naseeha.live/', logo: '/clients/naseeha-institute.png' },
  { name: 'Voices of Muslims', url: 'https://voicesofmuslims.org/', logo: '/clients/voices-of-muslims.png' },
]

const TESTIMONIALS = [
  { quote: "TBG's production crew understood our vision from day one — every shoot came out polished and delivered right on schedule.", name: 'Malik Mujahid', company: 'Muslim Network TV' },
  { quote: 'The media team at TBG brought real craftsmanship to our content. A smooth process from planning through to the final edit.', name: 'Mrs Koshy', company: 'Invar Studios' },
  { quote: "Our promotional videos turned out better than we imagined. TBG's team was easy to work with and genuinely cared about the outcome.", name: 'Vishal', company: 'Good Karma LA' },
  { quote: 'As a broadcaster, our bar for production quality is high. TBG met it every time, from concept to final cut.', name: 'Fawad Ahmed', company: 'Neo TV' },
  { quote: "TBG's production work elevated every campaign we handed them. Sharp editing, great communication, delivered on time.", name: 'Hamza Rehman', company: 'Digital Diraction' },
  { quote: 'TBG handled our campaign videos with real care for our mission. The final production was powerful and moving.', name: 'Saima Azfar', company: 'ICNA Relief' },
]

export function OurStorySection() {
  const { ref, inView } = useCounterInView()

  return (
    <section id="story" className="relative overflow-hidden py-20 lg:py-28 bg-surface scroll-mt-24">
      <SectionBackdrop variant="surface" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="section-label text-indigo-300 mb-3">Our story</p>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.08]">
              One partner instead of <span className="text-gradient-brand">many.</span>
            </h2>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              TBG started with a simple idea: clients shouldn't need a different agency for every part of their growth.
              So we brought technology, AI and creative production under one roof.
            </p>
            <p className="mt-4 text-white/60 leading-relaxed">
              Today one team can build your platform, automate your operations and tell your story, with AI working behind every
              service to make it faster and smarter.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="absolute inset-0 -z-0 rounded-full bg-indigo-500/20 blur-[90px]" aria-hidden />
            <div className="relative grid gap-4">
              {DIVISION_TILES.map(({ icon: Icon, name, text, accent }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0d1324]/85 p-5 backdrop-blur"
                  style={{ marginLeft: `${i * 8}%` }}
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white"
                    style={{ background: `linear-gradient(135deg, ${accent}, #6366f1)`, boxShadow: `0 0 30px ${accent}55` }}
                  >
                    <Icon className="text-xl" />
                  </span>
                  <div>
                    <p className="font-heading font-semibold text-white">{name}</p>
                    <p className="text-sm text-white/55">{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10"
        >
          {STORY_STATS.map((s) => (
            <div key={s.label} className="bg-[#0d1324] p-6 text-center">
              <div className="font-heading text-4xl lg:text-5xl font-bold text-gradient-brand">
                <Counter end={s.value} suffix={s.suffix} inView={inView} duration={2} />
              </div>
              <p className="mt-1 text-sm text-white/55">{s.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="mt-16">
          <p className="font-mono text-xs uppercase tracking-wider text-white/40 mb-6">Milestones</p>
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="hidden md:block absolute left-0 right-0 top-[7px] h-px bg-gradient-to-r from-indigo-500/60 via-cyan-400/60 to-indigo-500/10" aria-hidden />
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <span className="relative block h-[15px] w-[15px] rounded-full border-2 border-cyan-300 bg-primary shadow-glow-cyan" />
                <p className="mt-4 font-heading text-2xl font-bold text-white">{m.year}</p>
                <p className="text-sm text-white/60">{m.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function DifferentiatorsSection() {
  return (
    <section id="different" className="relative overflow-hidden py-20 lg:py-28 bg-surface scroll-mt-24">
      <SectionBackdrop variant="surface" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label text-cyan-300 mb-3"
          >
            Why TBG
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl lg:text-5xl font-bold text-white tracking-tight"
          >
            What makes us <span className="text-gradient-brand">different</span>
          </motion.h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {DIFFERENTIATORS.map(({ icon: Icon, title, text, stat, statLabel }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d1324]/85 p-7 transition hover:border-indigo-400/40 ${
                i === 0 ? 'lg:col-span-2 lg:row-span-1' : ''
              } ${i === 3 ? 'lg:col-span-2' : ''}`}
            >
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-500/20 blur-[60px] opacity-0 transition group-hover:opacity-100" />
              <div className="relative flex items-start justify-between gap-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-cyan-300 transition group-hover:bg-gradient-accent group-hover:text-white">
                  <Icon className="text-xl" />
                </span>
                <div className="text-right">
                  <p className="font-heading text-3xl font-bold text-white">{stat}</p>
                  <p className="text-[11px] uppercase tracking-wider text-white/40">{statLabel}</p>
                </div>
              </div>
              <h3 className="relative mt-6 font-heading text-xl font-bold text-white">{title}</h3>
              <p className="relative mt-2 text-white/60 leading-relaxed">{text}</p>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/15 to-cyan-400/10 p-7 md:col-span-2 lg:col-span-3"
          >
            <p className="font-mono text-xs uppercase tracking-wider text-white/50">Our values</p>
            <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {VALUES.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex items-start gap-3">
                  <Icon className="mt-1 shrink-0 text-cyan-300" />
                  <p className="text-sm text-white/70">
                    <span className="font-semibold text-white">{title}. </span>
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


export function LogosSection() {
  return (
    <section className="relative overflow-hidden py-16 bg-primary">
      <SectionBackdrop variant="primary" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-[0.2em] text-white/45 text-center"
        >
          Trusted by broadcasters, studios and organisations worldwide
        </motion.h2>
      </div>
      <div className="relative z-10 marquee-pause-on-hover">
        <div className="flex gap-4 animate-marquee-brands whitespace-nowrap">
          {[...BRAND_CAROUSEL, ...BRAND_CAROUSEL].map((entry, i) => (
            <a
              key={`${entry.name}-${i}`}
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              title={entry.name}
              className="inline-flex flex-shrink-0 items-center justify-center h-16 sm:h-20 min-w-[9rem] px-3 rounded-lg bg-white shadow-md shadow-black/20 border border-white/10 hover:border-cyan-400/60 hover:shadow-cyan-400/20 hover:scale-[1.04] transition-all"
            >
              {entry.logo ? (
                <img src={entry.logo} alt={entry.name} className="max-h-10 sm:max-h-12 max-w-[7.5rem] object-contain" />
              ) : (
                <span className="text-[11px] sm:text-xs font-semibold text-primary/80 text-center leading-tight">{entry.name}</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 6000)
    return () => clearInterval(t)
  }, [paused])
  const go = (d: number) => setIndex((i) => (i + d + TESTIMONIALS.length) % TESTIMONIALS.length)
  const t = TESTIMONIALS[index]

  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-surface">
      <SectionBackdrop variant="surface" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-12 items-center">
        <div className="lg:col-span-4">
          <p className="section-label text-indigo-300 mb-3">Testimonials</p>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white tracking-tight">
            What clients <span className="text-gradient-brand">say</span>
          </h2>
          <p className="mt-4 text-white/60">Broadcasters, studios and nonprofits who trust us with their story.</p>
          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              className="rounded-full border border-white/15 bg-white/5 p-3 text-white hover:border-cyan-300/60"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="rounded-full border border-white/15 bg-white/5 p-3 text-white hover:border-cyan-300/60"
              aria-label="Next testimonial"
            >
              <FiChevronRight />
            </button>
            <span className="ml-2 font-mono text-sm text-white/40">
              {String(index + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div
          className="lg:col-span-8 relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-indigo-500/20 to-cyan-400/10 blur-2xl" aria-hidden />
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
              transition={{ duration: 0.4 }}
              className="relative rounded-3xl border border-white/10 bg-[#0d1324]/90 p-8 lg:p-12"
            >
              <span className="absolute right-8 top-4 font-serif text-[120px] leading-none text-indigo-400/15" aria-hidden>
                &rdquo;
              </span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <FiStar key={s} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="mt-6 font-heading text-2xl lg:text-3xl font-medium leading-snug text-white">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-accent font-heading font-bold text-white">
                  {t.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
                </span>
                <span>
                  <span className="block font-semibold text-white">{t.name}</span>
                  <span className="block text-sm text-white/55">{t.company}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
          <div className="relative mt-6 flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${index === i ? 'w-8 bg-cyan-400' : 'w-3 bg-white/25 hover:bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function AboutCTASection() {
  const { openModal } = useContactModal()
  const ctas = [
    { icon: FiBriefcase, title: 'Start a project', desc: 'Tell us what you need and get a clear plan, timeline and quote.', label: 'Get in touch', action: () => openModal() },
    { icon: FiUserPlus, title: 'Join our team', desc: 'Engineers, editors and creatives building what comes next.', label: 'See open roles', to: '/careers' },
    { icon: FiLink2, title: 'Become a partner', desc: 'Agencies, developers and brands: let\'s create more together.', label: 'Explore partnerships', action: () => openModal({ service_interest: 'Other' }) },
  ]

  return (
    <section id="contact-cta" className="relative overflow-hidden py-20 lg:py-28 bg-primary scroll-mt-24">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="hero-aurora" style={{ top: '40%', opacity: 0.3 }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-heading text-4xl sm:text-6xl font-bold text-white tracking-tight">
            Let's build your <span className="text-shimmer-brand">future.</span>
          </h2>
          <p className="mt-4 text-lg text-white/65">Pick where you'd like to start.</p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {ctas.map((c, i) => {
            const inner = (
              <>
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl text-white transition group-hover:scale-110 ${
                    i === 0 ? 'bg-gradient-accent shadow-glow' : 'bg-white/10'
                  }`}
                >
                  <c.icon className="text-xl" />
                </span>
                <h3 className="mt-5 font-heading text-xl font-bold text-white">{c.title}</h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{c.desc}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-cyan-300">
                  {c.label} <FiChevronRight className="transition group-hover:translate-x-1" />
                </span>
              </>
            )
            const cls = `group block h-full rounded-3xl border p-8 text-left transition-all duration-300 hover:-translate-y-1 ${
              i === 0 ? 'border-indigo-400/40 bg-indigo-500/10 hover:shadow-glow' : 'border-white/10 bg-[#0d1324]/80 hover:border-indigo-400/30'
            }`
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {c.to ? (
                  <Link to={c.to} className={cls}>{inner}</Link>
                ) : (
                  <button type="button" onClick={c.action} className={`${cls} w-full`}>{inner}</button>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

