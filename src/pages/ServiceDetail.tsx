import { useEffect } from 'react'
import { useParams, Link, Navigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiCheck } from 'react-icons/fi'
import { useContactModal } from '../context/ContactModalContext'
import CaseStudies from '../components/CaseStudies'
import Showreel from '../components/Showreel'
import PageHero, { CTABand } from '../components/PageHero'
import SectionBackdrop from '../components/SectionBackdrop'

type Feature = { title: string; text: string }
type Block = {
  id: string
  label: string
  title: string
  description: string
  features: Feature[]
  idealFor: string
  serviceInterest: string
}

type ServiceContent = {
  name: string
  label: string
  title: string
  highlight: string
  description: string
  accent: string
  stats: [string, string][]
  blocks: Block[]
  cta: string
}

const CONTENT: Record<string, ServiceContent> = {
  'software-development': {
    name: 'Software & AI',
    label: 'Software & AI',
    title: 'Software that',
    highlight: 'works while you sleep.',
    description:
      'AI pipelines, web platforms and mobile apps built around how your business actually runs. We design, build, launch and keep improving them.',
    accent: '#22d3ee',
    stats: [
      ['7/7', 'pipelines running daily'],
      ['4+', 'channels automated'],
      ['End-to-end', 'design to launch'],
    ],
    cta: 'Have a process that should run itself?',
    blocks: [
      {
        id: 'ai',
        label: 'AI & Automation',
        title: 'AI Pipelines & Automation',
        description:
          'Turn repetitive work into systems that run themselves, from content production to reporting to customer replies.',
        features: [
          { title: 'Content & marketing pipelines', text: 'Footage in, branded posts out, published daily across every channel.' },
          { title: 'Process automation', text: 'Bots that fill sheets, post updates, chase follow-ups and log every run.' },
          { title: 'AI agents & assistants', text: 'Chat and WhatsApp assistants trained on your services, prices and tone.' },
          { title: 'Document & data AI', text: 'Invoices, receipts and forms read automatically and turned into clean data.' },
          { title: 'Analytics & scorecards', text: 'Weekly dashboards that pull rankings, reviews and sales into one view.' },
        ],
        idealFor: 'Teams losing hours every week to manual, repeatable work.',
        serviceInterest: 'Software Development - AI',
      },
      {
        id: 'web',
        label: 'Web',
        title: 'Web Platforms',
        description: 'Fast, design-led websites and web apps that convert visitors and run your operations.',
        features: [
          { title: 'Marketing websites', text: 'Sites built to load fast, rank well and turn visitors into enquiries.' },
          { title: 'Web apps & portals', text: 'Client portals, booking systems, quote builders and internal tools.' },
          { title: 'Dashboards & admin panels', text: 'Live data, role-based access and reports your team will actually use.' },
          { title: 'E-commerce', text: 'Online stores with payments, inventory and delivery integrations.' },
          { title: 'APIs & integrations', text: 'Connect your CRM, accounting, WhatsApp and Google tools.' },
        ],
        idealFor: 'Businesses that have outgrown spreadsheets and template websites.',
        serviceInterest: 'Software Development - Web',
      },
      {
        id: 'mobile',
        label: 'Mobile',
        title: 'Mobile Apps',
        description: 'iOS and Android apps with a native feel, from first prototype to App Store launch.',
        features: [
          { title: 'Cross-platform & native', text: 'One codebase for iOS and Android, or fully native when performance demands it.' },
          { title: 'UX & product design', text: 'Clickable prototypes tested with real users before development starts.' },
          { title: 'Offline & performance', text: 'Apps that stay fast on slow networks and keep working offline.' },
          { title: 'Launch & growth', text: 'Store submission, analytics, push notifications and ongoing updates.' },
        ],
        idealFor: 'Startups launching a product and brands building customer apps.',
        serviceInterest: 'Software Development - Mobile',
      },
    ],
  },
  media: {
    name: 'Media',
    label: 'Media',
    title: 'Content that',
    highlight: 'people stop for.',
    description:
      'Commercials, CGI, AI video, photography and social media, made in-house from the first idea to the final post.',
    accent: '#c084fc',
    stats: [
      ['In-house', 'crew & editors'],
      ['CGI + AI', 'production'],
      ['Daily', 'social content'],
    ],
    cta: 'Ready for content that performs?',
    blocks: [
      {
        id: 'pre-production',
        label: 'Pre-production',
        title: 'Concept & Pre-production',
        description: 'Every great piece starts on paper. We shape the idea before a camera rolls.',
        features: [
          { title: 'Creative concepts', text: 'Campaign ideas built around your audience and your goal.' },
          { title: 'Scriptwriting', text: 'Scripts, voice-overs and hooks written for each platform.' },
          { title: 'Storyboards & shot lists', text: 'Every frame planned so shoot days run on time and on budget.' },
        ],
        idealFor: 'Brand launches, campaigns and product films.',
        serviceInterest: 'Media - Pre-production',
      },
      {
        id: 'production',
        label: 'Production',
        title: 'Production',
        description: 'Professional crews, cinema cameras and AI tools where they add real value.',
        features: [
          { title: 'Cinematography', text: 'Commercials, brand films and short-form content shot to broadcast standard.' },
          { title: 'Photography', text: 'Product, property, food and portrait photography.' },
          { title: 'AI video & imagery', text: 'AI-generated scenes and visuals that would be impossible or costly to film.' },
          { title: 'Sound recording', text: 'Clean on-set audio, voice-over recording and podcasts.' },
        ],
        idealFor: 'Brands that need premium footage without agency overheads.',
        serviceInterest: 'Media - Production',
      },
      {
        id: 'post-production',
        label: 'Post-production',
        title: 'Post-production, CGI & VFX',
        description: 'Where raw footage becomes a finished film.',
        features: [
          { title: 'Editing', text: 'Pacing, story and platform-specific cuts from a single shoot.' },
          { title: 'Colour grading', text: 'A consistent cinematic look across every deliverable.' },
          { title: 'CGI & 3D', text: 'Product renders, 3D animation and CGI ads like the ones in our showreel.' },
          { title: 'Motion graphics & VFX', text: 'Animated titles, effects and compositing.' },
        ],
        idealFor: 'Ads, product launches and anything that needs to look world-class.',
        serviceInterest: 'Media - Post-production',
      },
      {
        id: 'graphic-design',
        label: 'Design',
        title: 'Brand & Graphic Design',
        description: 'Visual identities that look consistent everywhere your brand appears.',
        features: [
          { title: 'Brand identity', text: 'Logos, colour, typography and brand guidelines.' },
          { title: 'Marketing creative', text: 'Campaign key visuals, ads and print.' },
          { title: 'Social templates', text: 'Branded templates your team can reuse every week.' },
        ],
        idealFor: 'New businesses and brands ready for a refresh.',
        serviceInterest: 'Media - Graphic Design',
      },
      {
        id: 'social-media',
        label: 'Social',
        title: 'Social Media Management',
        description:
          'Daily content and growth across Instagram, TikTok, YouTube and Google, powered by our AI content pipeline.',
        features: [
          { title: 'Daily posting', text: 'A steady stream of reels and posts, each checked before it goes live.' },
          { title: 'Paid ads', text: 'Meta, TikTok and Google campaigns tracked to leads and sales.' },
          { title: 'SEO & Google Business', text: 'Local search and Maps visibility so customers find you first.' },
          { title: 'Influencer partnerships', text: 'Creator outreach, briefs and collaboration management.' },
        ],
        idealFor: 'Local businesses that want to be visible every day without the effort.',
        serviceInterest: 'Media - Social Media Management',
      },
    ],
  },
}

function ServiceBlock({
  block,
  index,
  accent,
  onRequest,
}: {
  block: Block
  index: number
  accent: string
  onRequest: (interest: string) => void
}) {
  const alt = index % 2 === 1
  return (
    <section id={block.id} className={`relative overflow-hidden py-20 lg:py-24 scroll-mt-24 ${alt ? 'bg-primary' : 'bg-surface'}`}>
      {!alt && <SectionBackdrop variant="surface" />}
      <div
        className={`absolute top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full blur-[120px] opacity-25 pointer-events-none ${alt ? '-left-40' : '-right-40'}`}
        style={{ background: accent }}
        aria-hidden
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          className="lg:col-span-5 lg:sticky lg:top-28 self-start"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-white/30">{String(index + 1).padStart(2, '0')}</span>
            <span
              className="section-label"
              style={{ color: accent, background: `${accent}1a`, borderColor: `${accent}40` }}
            >
              {block.label}
            </span>
          </div>
          <h2 className="mt-4 font-heading text-3xl lg:text-5xl font-bold text-white tracking-tight">{block.title}</h2>
          <p className="mt-4 text-lg text-white/65 leading-relaxed">{block.description}</p>
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <FiCheck className="mt-0.5 shrink-0" style={{ color: accent }} />
            <p className="text-sm text-white/70">
              <span className="font-semibold text-white">Ideal for: </span>
              {block.idealFor}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onRequest(block.serviceInterest)}
            className="group mt-8 inline-flex items-center gap-2 btn-glow px-6 py-3.5 font-semibold text-white"
          >
            Request this service
            <FiArrowRight className="transition group-hover:translate-x-1" />
          </button>
        </motion.div>

        <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
          {block.features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.06 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1324]/80 p-6 transition hover:-translate-y-1 hover:border-white/20 ${
                block.features.length % 2 === 1 && i === block.features.length - 1 ? 'sm:col-span-2' : ''
              }`}
            >
              <div
                className="absolute inset-x-0 top-0 h-px opacity-0 transition group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
              />
              <span className="font-mono text-xs" style={{ color: accent }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-heading text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { openModal } = useContactModal()
  const { hash } = useLocation()

  useEffect(() => {
    const id = hash?.replace(/^#/, '')
    if (!id) return
    const timer = window.setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      120,
    )
    return () => window.clearTimeout(timer)
  }, [hash, slug])

  if (slug === 'content-creation') {
    return <Navigate to="/services/media" replace />
  }
  if (slug === 'real-estate') {
    return <Navigate to="/services" replace />
  }

  const c = slug ? CONTENT[slug] : null

  if (!c) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 bg-primary">
        <p className="text-white/70">Service not found.</p>
        <Link to="/services" className="mt-4 btn-glow px-5 py-2.5 text-white font-medium">Back to Services</Link>
      </div>
    )
  }

  const jumpLinks = [
    ...(slug === 'software-development' ? [{ id: 'work', label: 'Our work' }] : []),
    ...(slug === 'media' ? [{ id: 'portfolio', label: 'Showreel' }] : []),
    ...c.blocks.map((b) => ({ id: b.id, label: b.title })),
  ]

  const request = (interest: string) => openModal({ service_interest: interest })

  return (
    <>
      <PageHero
        label={c.label}
        title={c.title}
        highlight={c.highlight}
        description={c.description}
        accent={c.accent}
        crumbs={[{ label: 'Services', to: '/services' }, { label: c.name }]}
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap gap-8 text-sm">
            {c.stats.map(([v, l]) => (
              <div key={l}>
                <p className="font-heading text-3xl font-bold text-white">{v}</p>
                <p className="text-white/50">{l}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {jumpLinks.map((j) => (
              <a
                key={j.id}
                href={`#${j.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(j.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/75 backdrop-blur transition hover:border-cyan-300/50 hover:text-white"
              >
                {j.label}
              </a>
            ))}
          </div>
        </div>
      </PageHero>

      {slug === 'software-development' && <CaseStudies />}
      {slug === 'media' && (
        <div id="portfolio" className="scroll-mt-20">
          <Showreel />
        </div>
      )}

      {c.blocks.map((b, i) => (
        <ServiceBlock key={b.id} block={b} index={i} accent={c.accent} onRequest={request} />
      ))}

      <CTABand title={c.cta} onPrimary={() => openModal({ service_interest: slug === 'software-development' ? 'Software Development' : c.name })} primaryLabel="Talk to our team" />
    </>
  )
}
