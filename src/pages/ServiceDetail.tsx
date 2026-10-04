import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useContactModal } from '../context/ContactModalContext'
import MediaPortfolio from '../components/MediaPortfolio'
import { FiCpu, FiMonitor, FiSmartphone, FiImage, FiVideo, FiLayers, FiFilm } from 'react-icons/fi'

const SECTION_ANIMATION = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
}

function SectionBlock({
  id,
  label,
  title,
  description,
  features,
  serviceInterest,
  openModal,
  children,
  sectionClassName = 'bg-surface',
  backgroundSlot,
  graphicOnSide,
  accent = '#818cf8',
}: {
  id: string
  label: string
  title: string
  description: string
  features: string[]
  serviceInterest: string
  openModal: (initial?: { service_interest?: string }) => void
  children?: React.ReactNode
  sectionClassName?: string
  backgroundSlot?: React.ReactNode
  graphicOnSide?: boolean
  accent?: string
}) {
  return (
    <section id={id} className={`relative py-16 lg:py-24 scroll-mt-24 overflow-hidden ${sectionClassName}`}>
      {backgroundSlot && (
        <div
          className={`absolute top-0 bottom-0 pointer-events-none ${graphicOnSide ? 'right-0 w-1/2 lg:w-[45%]' : 'inset-0'}`}
          aria-hidden
        >
          {graphicOnSide && (
            <div
              className="absolute left-0 top-0 bottom-0 w-px hidden lg:block"
              style={{ background: `linear-gradient(to bottom, transparent, ${accent}66, transparent)` }}
            />
          )}
          {backgroundSlot}
        </div>
      )}
      <div
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${graphicOnSide ? 'lg:max-w-[55%] lg:mr-auto lg:pr-8' : ''}`}
      >
        <motion.p
          {...SECTION_ANIMATION}
          className="section-label mb-2"
          style={{ color: accent, background: `${accent}1a`, borderColor: `${accent}40` }}
        >
          {label}
        </motion.p>
        <motion.h2 {...SECTION_ANIMATION} className="font-heading text-3xl lg:text-4xl font-bold text-white mb-4">
          {title}
        </motion.h2>
        <motion.p {...SECTION_ANIMATION} className="text-white/70 max-w-3xl text-lg mb-8">
          {description}
        </motion.p>
        <motion.ul {...SECTION_ANIMATION} className="grid sm:grid-cols-2 gap-3 mb-10">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-white/80">
              <span style={{ color: accent }}>✓</span> {f}
            </li>
          ))}
        </motion.ul>
        {children}
        <motion.div {...SECTION_ANIMATION} className="mt-10">
          <motion.button
            onClick={() => openModal({ service_interest: serviceInterest })}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-glow px-6 py-3.5 text-white font-semibold"
          >
            Request a Service
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

/* AI section: AI logo with "thinking" glow, aligned to right side */
function AIBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-radial opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-[320px] h-[320px]">
        <motion.div
          className="absolute inset-0 rounded-full bg-indigo-500/20 blur-[60px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <FiCpu className="text-[100px] text-indigo-400/25" />
        </motion.div>
        <motion.div
          className="absolute top-1/4 left-1/4 w-2.5 h-2.5 rounded-full bg-cyan-400/50"
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-indigo-400/50"
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-violet-400/40"
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </div>
    </>
  )
}

/* Web section: computer screen with things running, aligned to right side */
function WebBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-primary/80" />
      <div className="absolute bottom-0 right-0 left-1/2 top-0 flex items-end justify-center pb-6 pr-4">
        <motion.div
          className="w-full max-w-md h-52 rounded-t-xl border-4 border-white/20 bg-surface/90 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="h-6 bg-white/10 flex items-center gap-2 px-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <div className="p-3 font-mono text-xs text-cyan-400/80 space-y-0.5">
            {['const app = () => {', '  return Dashboard()', '}', ''].map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {line}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <FiMonitor className="absolute right-8 top-1/4 text-[72px] text-white/5" />
    </>
  )
}

/* Mobile section: floating balls and phone, aligned to right side */
function MobileBackground() {
  const balls = [
    { size: 56, right: '8%', top: '18%', color: 'bg-cyan-400/30', anim: 'ball-float' },
    { size: 44, right: '25%', top: '28%', color: 'bg-indigo-400/25', anim: 'ball-float-2' },
    { size: 64, right: '12%', top: '68%', color: 'bg-violet-400/20', anim: 'ball-float-3' },
    { size: 36, right: '32%', top: '62%', color: 'bg-cyan-400/25', anim: 'ball-float-4' },
    { size: 48, right: '18%', top: '42%', color: 'bg-indigo-400/20', anim: 'ball-float-5' },
    { size: 40, right: '38%', top: '22%', color: 'bg-violet-400/25', anim: 'ball-float-6' },
  ]
  return (
    <>
      <div className="absolute inset-0 bg-surface" />
      <FiSmartphone className="absolute right-4 top-1/2 -translate-y-1/2 text-[160px] text-white/10" />
      {balls.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${b.color} ${b.anim}`}
          style={{
            width: b.size,
            height: b.size,
            right: b.right,
            top: b.top,
          }}
        />
      ))}
    </>
  )
}

/* Graphic design: layers, color palette, pen tool vibe, right side */
function GraphicBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-radial opacity-40" />
      <FiLayers className="absolute right-8 top-1/2 -translate-y-1/2 text-[140px] text-cyan-400/15" />
      <FiImage className="absolute right-16 top-1/4 text-[72px] text-indigo-400/15" />
      <motion.div
        className="absolute right-12 top-20 w-24 h-24 rounded-full border-2 border-cyan-400/25"
        animate={{ scale: [1, 1.08, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-20 bottom-24 w-20 h-20 border-2 border-indigo-400/20 rotate-12"
        animate={{ scale: [1, 1.1, 1], rotate: [12, 57, 12] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      {/* Color swatch palette */}
      <div className="absolute right-8 bottom-16 flex gap-2">
        {['bg-cyan-400/30', 'bg-indigo-400/25', 'bg-violet-400/25', 'bg-pink-400/20'].map((c, i) => (
          <motion.div
            key={i}
            className={`w-8 h-8 rounded-lg ${c}`}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
      <motion.div
        className="absolute right-24 top-1/3 w-14 h-14 bg-cyan-400/10 rounded-lg"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </>
  )
}

/* Videography: camera, film strip, play button, right side */
function VideoBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-primary/70" />
      <FiVideo className="absolute right-6 top-1/2 -translate-y-1/2 text-[120px] text-white/10" />
      <FiFilm className="absolute right-12 top-1/4 text-[64px] text-cyan-400/15" />
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 w-36 h-36 rounded-full border-4 border-white/15 flex items-center justify-center"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="w-0 h-0 border-t-[20px] border-t-transparent border-l-[32px] border-l-white/20 border-b-[20px] border-b-transparent ml-1" />
      </motion.div>
      {/* Film strip holes */}
      <div className="absolute right-4 bottom-20 flex flex-col gap-3">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-10 h-2 rounded-sm bg-black/30"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
      <motion.div
        className="absolute right-20 top-24 w-16 h-16 rounded-lg border-2 border-cyan-400/20"
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
      />
    </>
  )
}

function SoftwareDevelopmentPage({ openModal }: { openModal: (i?: { service_interest?: string }) => void }) {
  return (
    <>
      <SectionBlock
        id="ai"
        label="AI Solutions"
        title="AI and Intelligent Systems"
        description="We integrate AI into your workflows, from chatbots and analytics to process automation and custom ML models."
        features={[
          'Custom AI and ML models and integrations',
          'Chatbots and conversational AI',
          'Process automation and RPA',
          'Data analytics and insights',
          'Computer vision and NLP',
        ]}
        serviceInterest="Software Development - AI"
        openModal={openModal}
        backgroundSlot={<AIBackground />}
        graphicOnSide
        accent="#a78bfa"
      />
      <SectionBlock
        id="web"
        label="Web"
        title="Web Development"
        description="From landing pages to full-scale web applications. Responsive, fast, and built for growth."
        features={[
          'React, Next.js, and modern frameworks',
          'APIs and backend systems',
          'E-commerce and dashboards',
          'CMS and content-driven sites',
          'Performance and SEO',
        ]}
        serviceInterest="Software Development - Web"
        openModal={openModal}
        sectionClassName="bg-primary"
        backgroundSlot={<WebBackground />}
        graphicOnSide
        accent="#818cf8"
      />
      <SectionBlock
        id="mobile"
        label="Mobile"
        title="Mobile Applications"
        description="Native and cross-platform mobile apps with smooth transitions and a focus on UX and performance."
        features={[
          'iOS and Android native or cross-platform',
          'Smooth transitions and native feel',
          'Offline and performance optimization',
          'Push and in-app experiences',
          'App store deployment support',
        ]}
        serviceInterest="Software Development - Mobile"
        openModal={openModal}
        backgroundSlot={<MobileBackground />}
        graphicOnSide
        accent="#22d3ee"
      />
    </>
  )
}

function RealEstatePage({ openModal }: { openModal: (i?: { service_interest?: string }) => void }) {
  return (
    <>
      <SectionBlock
        id="commercial"
        label="Commercial"
        title="Commercial Real Estate"
        description="End-to-end commercial real estate services: acquisitions, leasing, management, and advisory."
        features={[
          'Property acquisition and due diligence',
          'Leasing and tenant relations',
          'Portfolio and asset management',
          'Valuation and market analysis',
          'Transaction support',
        ]}
        serviceInterest="Real Estate - Commercial"
        openModal={openModal}
        accent="#818cf8"
      />
      <SectionBlock
        id="residential"
        label="Residential"
        title="Residential Real Estate"
        description="Full-service residential support for buyers, sellers, and investors."
        features={[
          'Buyer and seller representation',
          'Listing and marketing',
          'Investment property advisory',
          'Relocation and referrals',
          'New development sales',
        ]}
        serviceInterest="Real Estate - Residential"
        openModal={openModal}
        sectionClassName="bg-primary"
        accent="#22d3ee"
      />
      <SectionBlock
        id="advisory"
        label="Advisory"
        title="Real Estate Advisory"
        description="Strategic advice to help you make informed decisions and grow your portfolio."
        features={[
          'Market research and trends',
          'Investment strategy',
          'Risk and feasibility studies',
          'Regulatory and compliance',
          'Portfolio optimization',
        ]}
        serviceInterest="Real Estate - Advisory"
        openModal={openModal}
        accent="#c084fc"
      />
    </>
  )
}

function MediaPage({ openModal }: { openModal: (i?: { service_interest?: string }) => void }) {
  return (
    <>
      <MediaPortfolio />
      <SectionBlock
        id="pre-production"
        label="Pre-production"
        title="Pre-production"
        description="Shape the story before cameras roll, with clear creative direction from day one."
        features={['Ideation', 'Script writing', 'Storyboarding']}
        serviceInterest="Media - Pre-production"
        openModal={openModal}
        backgroundSlot={<GraphicBackground />}
        graphicOnSide
        accent="#f472b6"
      />
      <SectionBlock
        id="production"
        label="Production"
        title="Production"
        description="Capture picture and sound with professional crews and modern tools, including AI-assisted workflows where they fit."
        features={[
          'Cinematography',
          'AI video and photo generation',
          'Photography',
          'Audio recording',
        ]}
        serviceInterest="Media - Production"
        openModal={openModal}
        sectionClassName="bg-primary"
        backgroundSlot={<VideoBackground />}
        graphicOnSide
        accent="#22d3ee"
      />
      <SectionBlock
        id="post-production"
        label="Post-production"
        title="Post-production"
        description="Polish and elevate your footage with full finishing, from edit suite to final deliverables."
        features={[
          'Video, photo, and audio editing',
          'Color grading',
          'Animation',
          'CGI',
          'Special effects',
        ]}
        serviceInterest="Media - Post-production"
        openModal={openModal}
        backgroundSlot={<VideoBackground />}
        graphicOnSide
        accent="#c084fc"
      />
      <SectionBlock
        id="graphic-design"
        label="Graphic Design"
        title="Graphic Design"
        description="Visual systems and assets that keep your brand consistent across every touchpoint."
        features={[
          'Brand identity and logos',
          'Print and digital layouts',
          'Marketing and campaign creative',
          'Social templates and toolkits',
        ]}
        serviceInterest="Media - Graphic Design"
        openModal={openModal}
        sectionClassName="bg-primary"
        backgroundSlot={<GraphicBackground />}
        graphicOnSide
        accent="#818cf8"
      />
      <SectionBlock
        id="social-media"
        label="Social Media Management"
        title="Social Media Management"
        description="Grow visibility and engagement with channel strategy, paid media, and creator partnerships."
        features={[
          'SEO',
          'Ads (paid social and search)',
          'Full social media handling and management',
          'Influencer outreach and coordination',
        ]}
        serviceInterest="Media - Social Media Management"
        openModal={openModal}
        backgroundSlot={<GraphicBackground />}
        graphicOnSide
        accent="#f472b6"
      />
    </>
  )
}

const SERVICE_META: Record<string, { name: string; description: string }> = {
  'real-estate': {
    name: 'Real Estate',
    description: 'Commercial, residential, and advisory real estate solutions.',
  },
  media: {
    name: 'Media',
    description: 'Pre through post-production, graphic design, and social media management.',
  },
  'software-development': {
    name: 'Software Development',
    description: 'AI, web, and mobile. Custom software that scales.',
  },
}

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { openModal } = useContactModal()

  if (slug === 'content-creation') {
    return <Navigate to="/services/media" replace />
  }

  const meta = slug ? SERVICE_META[slug] : null

  if (!meta) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 bg-primary">
        <p className="text-white/70">Service not found.</p>
        <Link to="/services" className="mt-4 btn-glow px-5 py-2.5 text-white font-medium">Back to Services</Link>
      </div>
    )
  }

  return (
    <>
      <section className="relative py-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-title text-white"
          >
            {meta.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-xl text-white/80 max-w-2xl mx-auto"
          >
            {meta.description}
          </motion.p>
          <Link
            to="/services"
            className="inline-block mt-6 text-cyan-400 hover:text-cyan-300 text-sm font-medium"
          >
            ← Back to Services
          </Link>
        </div>
      </section>

      {slug === 'software-development' && <SoftwareDevelopmentPage openModal={openModal} />}
      {slug === 'real-estate' && <RealEstatePage openModal={openModal} />}
      {slug === 'media' && <MediaPage openModal={openModal} />}
    </>
  )
}
