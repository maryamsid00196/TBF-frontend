import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiPlay, FiX } from 'react-icons/fi'

type PortfolioItem = {
  slug: string
  title: string
  /** width / height of the source video */
  aspect: number
}

const VERTICAL = 9 / 16

const PORTFOLIO: PortfolioItem[] = [
  { slug: 'power-horse-car-chase', title: 'Power Horse: Car Chase', aspect: VERTICAL },
  { slug: 'sherra-dubai-scifi', title: 'SHERRA Dubai', aspect: VERTICAL },
  { slug: 'kenzie-pistachio-cgi', title: 'KENZIE Pistachio', aspect: VERTICAL },
  { slug: 'brands-for-less', title: 'Brands For Less', aspect: VERTICAL },
  { slug: 'power-horse-machine', title: 'Power Horse: Machine Power', aspect: VERTICAL },
  { slug: 'hind-tahnoun', title: 'Hind Tahnoun', aspect: VERTICAL },
  { slug: 'laundry-business', title: 'Laundry Business', aspect: VERTICAL },
  { slug: 'real-estate', title: 'Real Estate', aspect: VERTICAL },
]

const src = (slug: string, ext: 'mp4' | 'jpg') => `/portfolio/${slug}.${ext}`

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Muted looping preview that only plays while on screen. */
function PreviewTile({ item, onOpen }: { item: PortfolioItem; onOpen: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || prefersReducedMotion()) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.25 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative shrink-0 snap-start h-[380px] sm:h-[440px] rounded-xl overflow-hidden border border-white/10 bg-black/40 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      style={{ aspectRatio: item.aspect }}
      aria-label={`Play ${item.title}`}
    >
      <video
        ref={videoRef}
        src={src(item.slug, 'mp4')}
        poster={src(item.slug, 'jpg')}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="p-4 rounded-full bg-white/15 backdrop-blur border border-white/30 text-white">
          <FiPlay className="text-2xl translate-x-0.5" />
        </span>
      </div>
      <p className="absolute bottom-0 left-0 right-0 p-4 font-heading font-semibold text-white">{item.title}</p>
    </button>
  )
}

function Lightbox({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
        aria-label="Close video"
      >
        <FiX className="text-2xl" />
      </button>
      <video
        src={src(item.slug, 'mp4')}
        poster={src(item.slug, 'jpg')}
        controls
        autoPlay
        playsInline
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] max-w-full rounded-lg shadow-2xl"
      />
    </motion.div>
  )
}

export default function MediaPortfolio() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<PortfolioItem | null>(null)

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current
    if (track) track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section id="portfolio" className="relative py-16 lg:py-24 scroll-mt-24 overflow-hidden bg-primary">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label mb-2"
              style={{ color: '#22d3ee', background: '#22d3ee1a', borderColor: '#22d3ee40' }}
            >
              Portfolio
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-3xl lg:text-4xl font-bold text-white"
            >
              Our work
            </motion.h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              className="p-2.5 rounded-full border border-white/15 bg-white/5 text-white hover:border-cyan-400/40 hover:text-cyan-300 transition-colors"
              aria-label="Scroll portfolio left"
            >
              <FiChevronLeft className="text-xl" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              className="p-2.5 rounded-full border border-white/15 bg-white/5 text-white hover:border-cyan-400/40 hover:text-cyan-300 transition-colors"
              aria-label="Scroll portfolio right"
            >
              <FiChevronRight className="text-xl" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:thin]"
        >
          {PORTFOLIO.map((item) => (
            <PreviewTile key={item.slug} item={item} onOpen={() => setActive(item)} />
          ))}
        </div>
      </div>

      <AnimatePresence>{active && <Lightbox item={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </section>
  )
}
