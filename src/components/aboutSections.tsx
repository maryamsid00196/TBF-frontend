import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  FiUsers,
  FiCpu,
  FiTrendingUp,
  FiTarget,
  FiAward,
  FiZap,
  FiHeart,
  FiCheck,
  FiChevronRight,
  FiStar,
  FiBriefcase,
  FiUserPlus,
  FiLink2,
} from 'react-icons/fi'
import { useContactModal } from '../context/ContactModalContext'
import Counter, { useCounterInView } from './Counter'
import SectionBackdrop from './SectionBackdrop'

const STORY_STATS = [
  { value: 12, suffix: '+', label: 'Years in business' },
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

const CORE_VALUES = [
  {
    icon: FiTarget,
    title: 'Results driven',
    quote: 'We measure success by your outcomes.',
    back: 'Every project is scoped to clear KPIs and delivered on time.',
    gradient: 'from-indigo-500/20 to-cyan-500/20',
    accent: '#818cf8',
  },
  {
    icon: FiZap,
    title: 'Innovation first',
    quote: 'Creativity is inventing, experimenting, growing.',
    back: 'We invest in technology and methods that keep you ahead.',
    gradient: 'from-violet-500/20 to-indigo-500/20',
    accent: '#a78bfa',
  },
  {
    icon: FiUsers,
    title: 'Client partnership',
    quote: 'Your growth is our growth.',
    back: 'Long-term relationships built on trust and transparency.',
    gradient: 'from-cyan-500/20 to-teal-500/20',
    accent: '#22d3ee',
  },
  {
    icon: FiAward,
    title: 'Excellence always',
    quote: 'Quality is never an accident.',
    back: 'Rigorous processes and a culture of continuous improvement.',
    gradient: 'from-pink-500/20 to-rose-500/20',
    accent: '#f472b6',
  },
  {
    icon: FiHeart,
    title: 'Integrity',
    quote: 'We do what we say we will.',
    back: 'Ethics and accountability in every engagement.',
    gradient: 'from-amber-500/20 to-orange-500/20',
    accent: '#fb923c',
  },
]

const DIFFERENTIATORS = [
  {
    id: 'integrated',
    icon: FiBriefcase,
    title: 'Integrated offering',
    content: 'Real estate, software, and media under one roof. Fewer handoffs, faster delivery.',
    metric: '3',
    metricLabel: 'core divisions',
    progress: 100,
  },
  {
    id: 'tech',
    icon: FiCpu,
    title: 'Technology-led',
    content: 'Modern stack, AI-ready solutions, and data-driven decisions across all services.',
    metric: '100%',
    metricLabel: 'cloud-native',
    progress: 100,
  },
  {
    id: 'scale',
    icon: FiTrendingUp,
    title: 'Built to scale',
    content: 'From startups to enterprises, we adapt our delivery and support to your size.',
    metric: '15+',
    metricLabel: 'industries',
    progress: 95,
  },
  {
    id: 'support',
    icon: FiHeart,
    title: 'Dedicated support',
    content: 'Named account managers and clear escalation paths so you always have a point of contact.',
    metric: 'Always on',
    metricLabel: 'availability',
    progress: 90,
  },
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

const STORY_IMAGES = [
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800',
]

export function OurStorySection() {
  const { ref, inView } = useCounterInView()
  const [imageIndex, setImageIndex] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setImageIndex((i) => (i + 1) % STORY_IMAGES.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="story" className="relative overflow-hidden py-20 lg:py-28 bg-surface scroll-mt-24">
      <SectionBackdrop variant="surface" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="section-label text-indigo-400">Our story</p>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white">Who we are</h2>
            <p className="text-white/80 leading-relaxed">
              TBG started with a simple idea: bring real estate, technology, and creative services under one roof so our clients get one trusted partner instead of many.
            </p>
            <p className="text-white/80 leading-relaxed">
              Today we serve clients across industries with integrated solutions, from property and advisory to software and media, backed by a team that cares about your outcomes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-xl overflow-hidden border border-indigo-400/25 shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)] aspect-[4/3] bg-white/5 relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={imageIndex}
                  src={STORY_IMAGES[imageIndex]}
                  alt="Our team and work"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
        >
          {STORY_STATS.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-accent bg-clip-text text-transparent">
                <Counter end={s.value} suffix={s.suffix} inView={inView} duration={2} />
              </div>
              <p className="mt-1 text-white/60 text-sm font-medium">{s.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="font-heading text-xl font-bold text-white mb-8">Milestones</h3>
          <div className="flex flex-wrap gap-8 lg:gap-12 relative">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex items-center gap-4 group"
              >
                <div className="w-3 h-3 rounded-full bg-indigo-400 group-hover:scale-150 group-hover:shadow-glow transition-transform" />
                {i < MILESTONES.length - 1 && (
                  <div className="absolute left-6 top-1/2 w-16 h-px bg-white/20 -translate-y-1/2 hidden sm:block" />
                )}
                <div>
                  <span className="text-indigo-400 font-bold">{m.year}</span>
                  <span className="text-white/80 ml-2">{m.title}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function CoreValuesSection() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  return (
    <section id="values" className="relative overflow-hidden py-20 lg:py-28 bg-primary scroll-mt-24">
      <SectionBackdrop variant="primary" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl lg:text-4xl font-bold text-white text-center mb-4"
        >
          Core values
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/70 text-center max-w-2xl mx-auto mb-16"
        >
          What we stand for and how we work with you.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {CORE_VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i }}
              className="h-[280px]"
              style={{ perspective: 1000 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                setMouse({ x: (e.clientX - rect.left) / rect.width - 0.5, y: (e.clientY - rect.top) / rect.height - 0.5 })
              }}
            >
              <motion.div
                className="relative w-full h-full preserve-3d"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{
                  rotateY: hovered === i ? 180 : 0,
                  rotateX: hovered === i ? mouse.y * 8 : 0,
                  rotateZ: hovered === i ? mouse.x * -6 : 0,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <div
                  className="absolute inset-0 backface-hidden rounded-xl border border-white/10 p-6 flex flex-col bg-surface"
                  style={{
                    background: `linear-gradient(135deg, rgba(99,102,241,0.15), rgba(34,211,238,0.08))`,
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(0deg)',
                    borderTop: `2px solid ${v.accent}80`,
                  }}
                >
                  <div className={`rounded-lg p-3 bg-gradient-to-br ${v.gradient} w-fit`}>
                    <v.icon className="text-2xl text-white" />
                  </div>
                  <h3 className="font-heading mt-4 text-lg font-bold text-white">{v.title}</h3>
                  <p className="mt-2 text-white/70 text-sm italic">&ldquo;{v.quote}&rdquo;</p>
                </div>
                <div
                  className="absolute inset-0 rounded-xl border border-white/10 p-6 flex flex-col justify-center bg-surface"
                  style={{
                    background: `linear-gradient(135deg, rgba(99,102,241,0.2), rgba(34,211,238,0.1))`,
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <h3 className="font-heading text-lg font-bold text-white">{v.title}</h3>
                  <p className="mt-2 text-white/80 text-sm">{v.back}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function DifferentiatorsSection() {
  const [activeTab, setActiveTab] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="different" className="relative overflow-hidden py-20 lg:py-28 bg-surface scroll-mt-24">
      <SectionBackdrop variant="surface" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl lg:text-4xl font-bold text-white text-center mb-4"
        >
          What makes us different
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white/70 text-center max-w-2xl mx-auto mb-12"
        >
          Integrated services, technology, and support built around you.
        </motion.p>

        <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-2">
            {DIFFERENTIATORS.map((d, i) => (
              <motion.button
                key={d.id}
                type="button"
                onClick={() => setActiveTab(i)}
                className={`w-full flex items-center gap-4 p-4 rounded-lg text-left transition-colors ${
                  activeTab === i ? 'bg-indigo-500/20 border border-indigo-400/30' : 'bg-white/5 border border-transparent hover:bg-white/10'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.99 }}
              >
                <d.icon className={`text-2xl shrink-0 ${activeTab === i ? 'text-indigo-400' : 'text-white/60'}`} />
                <span className="font-semibold text-white">{d.title}</span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <p className="text-white/80 leading-relaxed">{DIFFERENTIATORS[activeTab].content}</p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-cyan-400">{DIFFERENTIATORS[activeTab].metric}</span>
                  <span className="text-white/60">{DIFFERENTIATORS[activeTab].metricLabel}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 400 }}
                >
                  <FiCheck className="w-6 h-6" strokeWidth={2.5} />
                </motion.span>
                <span className="text-sm font-medium">Key differentiator</span>
              </div>
              <div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-accent"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${DIFFERENTIATORS[activeTab].progress}%` } : {}}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
                <p className="mt-1 text-white/50 text-xs">Capability level</p>
              </div>
            </motion.div>
          </AnimatePresence>
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
          className="font-heading text-2xl lg:text-3xl font-bold text-white text-center"
        >
          Trusted by leading brands
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
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-surface">
      <SectionBackdrop variant="surface" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl lg:text-4xl font-bold text-white text-center mb-16"
        >
          What clients say
        </motion.h2>

        <div className="relative">
          <span className="absolute -top-4 -left-2 text-8xl text-indigo-400/20 font-serif">&ldquo;</span>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="card-glass p-8 lg:p-12 text-center relative"
            >
              <div className="flex justify-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.span
                    key={star}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 * star }}
                  >
                    <FiStar className="text-amber-400 fill-amber-400 inline text-xl" />
                  </motion.span>
                ))}
              </div>
              <p className="text-xl text-white/90 italic">&ldquo;{TESTIMONIALS[index].quote}&rdquo;</p>
              <div className="mt-8 flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400 flex items-center justify-center font-heading font-bold text-white text-lg">
                  {TESTIMONIALS[index].name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <p className="font-heading font-bold text-white">{TESTIMONIALS[index].name}</p>
                <p className="text-sm text-white/60">{TESTIMONIALS[index].company}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} type="button" onClick={() => setIndex(i)} className={`w-2.5 h-2.5 rounded-full ${index === i ? 'bg-cyan-400' : 'bg-white/30'}`} />
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
    { icon: FiBriefcase, title: 'Work with us', desc: 'Start a project or request a service.', href: '/contact', action: () => openModal(), primary: true },
    { icon: FiUserPlus, title: 'Join our team', desc: 'See open roles and apply.', href: '/careers', action: () => {}, primary: false },
    { icon: FiLink2, title: 'Become a partner', desc: 'Explore partnership opportunities.', href: '/contact', action: () => openModal(), primary: false },
  ]

  return (
    <section id="contact-cta" className="relative overflow-hidden py-20 lg:py-28 bg-primary scroll-mt-24">
      <SectionBackdrop variant="primary" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {ctas.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={c.href}
                onClick={(e) => {
                  if (c.action) {
                    e.preventDefault()
                    c.action()
                  }
                }}
                className={`block h-full p-8 rounded-xl border transition-all duration-300 group ${
                  c.primary
                    ? 'border-fuchsia-400/20 bg-surface hover:border-fuchsia-400/40 hover:shadow-glow-magenta'
                    : 'border-white/10 bg-surface hover:border-indigo-400/30 hover:shadow-glow'
                }`}
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${c.primary ? 'from-purple-500/30 to-pink-500/30' : 'from-white/10 to-white/5'} group-hover:scale-110 transition-transform`}>
                  <c.icon className="text-2xl text-white" />
                </div>
                <h3 className="font-heading mt-4 text-xl font-bold text-white">{c.title}</h3>
                <p className="mt-2 text-white/70 text-sm">{c.desc}</p>
                <motion.span
                  className={`inline-flex items-center gap-1 mt-4 font-medium text-sm ${c.primary ? 'text-gradient-magenta' : 'text-cyan-400'}`}
                  whileHover={{ x: 4 }}
                >
                  {c.primary ? 'Get in touch' : 'Learn more'} <FiChevronRight className={`text-sm ${c.primary ? 'text-fuchsia-400' : ''}`} />
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
