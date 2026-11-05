import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSearch, FiMap, FiTool, FiSend, FiTrendingUp, FiArrowRight } from 'react-icons/fi'
import PageHero, { CTABand } from '../components/PageHero'
import SectionBackdrop from '../components/SectionBackdrop'
import { SERVICES, ServiceCard } from '../components/HomeServices'
import { useContactModal } from '../context/ContactModalContext'

const INDEX = [
  {
    division: 'Software & AI',
    slug: 'software-development',
    accent: '#22d3ee',
    items: [
      { label: 'AI pipelines & automation', anchor: 'ai' },
      { label: 'Web platforms & dashboards', anchor: 'web' },
      { label: 'iOS & Android apps', anchor: 'mobile' },
      { label: 'Case studies', anchor: 'work' },
    ],
  },
  {
    division: 'Media',
    slug: 'media',
    accent: '#c084fc',
    items: [
      { label: 'Showreel & portfolio', anchor: 'portfolio' },
      { label: 'Concept, script & storyboard', anchor: 'pre-production' },
      { label: 'Filming, photography & AI video', anchor: 'production' },
      { label: 'Editing, colour, CGI & VFX', anchor: 'post-production' },
      { label: 'Brand identity & design', anchor: 'graphic-design' },
      { label: 'Social media management', anchor: 'social-media' },
    ],
  },
]

const PROCESS = [
  { icon: FiSearch, title: 'Discover', text: 'We learn your business, goals and constraints in a free consultation.' },
  { icon: FiMap, title: 'Plan', text: 'A clear scope, timeline and quote, so you know exactly what you get.' },
  { icon: FiTool, title: 'Build', text: 'Our team shoots, codes or sources, with weekly check-ins and live previews.' },
  { icon: FiSend, title: 'Launch', text: 'We ship, hand over everything you own, and make sure it works in the real world.' },
  { icon: FiTrendingUp, title: 'Grow', text: 'Ongoing support, reporting and improvements as your business scales.' },
]

export default function Services() {
  const { openModal } = useContactModal()

  return (
    <>
      <PageHero
        label="What We Offer"
        title="Everything you need to"
        highlight="grow, under one roof."
        description="Software, AI and media, delivered by one team. Pick a single service or combine them, and get one partner who is accountable for the whole result."
        crumbs={[{ label: 'Services' }]}
      >
        <div className="flex flex-wrap gap-8 text-sm">
          {[
            ['2', 'specialist divisions'],
            ['15+', 'years delivering'],
            ['200+', 'projects shipped'],
          ].map(([v, l]) => (
            <div key={l}>
              <p className="font-heading text-3xl font-bold text-white">{v}</p>
              <p className="text-white/50">{l}</p>
            </div>
          ))}
        </div>
      </PageHero>

      <section className="relative overflow-hidden py-20 lg:py-24 bg-surface">
        <SectionBackdrop variant="surface" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.slug} s={s} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Capability index */}
      <section className="relative overflow-hidden py-20 lg:py-24 bg-primary">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label text-cyan-300 mb-3"
          >
            Capability index
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl lg:text-5xl font-bold text-white tracking-tight"
          >
            Jump straight to what you need
          </motion.h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {INDEX.map((col, ci) => (
              <motion.div
                key={col.division}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-xl font-bold text-white">{col.division}</h3>
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: col.accent, boxShadow: `0 0 12px ${col.accent}` }} />
                </div>
                <ul className="mt-5 divide-y divide-white/5">
                  {col.items.map((it) => (
                    <li key={it.anchor}>
                      <Link
                        to={`/services/${col.slug}#${it.anchor}`}
                        className="group flex items-center justify-between py-3 text-sm text-white/70 transition hover:text-white"
                      >
                        {it.label}
                        <FiArrowRight className="opacity-0 -translate-x-2 transition group-hover:opacity-100 group-hover:translate-x-0" style={{ color: col.accent }} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden py-20 lg:py-24 bg-surface">
        <SectionBackdrop variant="surface" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="section-label text-indigo-300 mb-3">How we work</p>
            <h2 className="font-heading text-3xl lg:text-5xl font-bold text-white tracking-tight">
              Five steps. <span className="text-gradient-brand">No surprises.</span>
            </h2>
            <p className="mt-4 text-white/60">The same process for a website, an AI pipeline or a brand film.</p>
          </div>
          <div className="relative mt-14 grid gap-6 md:grid-cols-5">
            <div className="hidden md:block absolute left-[10%] right-[10%] top-7 h-px bg-gradient-to-r from-indigo-500/0 via-cyan-400/50 to-indigo-500/0" aria-hidden />
            {PROCESS.map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative text-center"
              >
                <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#0d1324] text-cyan-300 shadow-glow">
                  <Icon className="text-xl" />
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-accent font-mono text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-heading font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-white/55 leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABand onPrimary={() => openModal()} />
    </>
  )
}
