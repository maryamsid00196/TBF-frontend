import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionBackdrop from '../components/SectionBackdrop'

const services = [
  { slug: 'real-estate', name: 'Real Estate', description: 'Full-service real estate solutions for commercial, residential, and advisory needs.', accent: '#818cf8' },
  { slug: 'media', name: 'Media', description: 'Pre through post-production, graphic design, and full social media management.', accent: '#22d3ee' },
  { slug: 'software-development', name: 'Software Development', description: 'AI, web, mobile, and 3D. Custom software that scales with you.', accent: '#c084fc' },
]

export default function Services() {
  return (
    <>
      <section className="relative py-24 bg-primary overflow-hidden">
        <SectionBackdrop variant="primary" />
        <div className="absolute inset-0 bg-gradient-radial z-[1]" aria-hidden />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-label text-indigo-400/90 mb-3"
          >
            What We Offer
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="hero-title text-white"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-xl text-white/70 max-w-2xl mx-auto"
          >
            Real estate, media, and software development.
          </motion.p>
        </div>
      </section>
      <section className="relative overflow-hidden py-20 bg-surface">
        <SectionBackdrop variant="surface" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <motion.div
                key={svc.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/services/${svc.slug}`}
                  className="card-glass block p-6 h-full group"
                  style={{ borderTop: `2px solid ${svc.accent}66` }}
                >
                  <h3 className="font-heading text-xl font-bold text-white group-hover:text-cyan-400 transition">{svc.name}</h3>
                  <p className="mt-2 text-white/60 text-sm leading-relaxed">{svc.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan-400 group-hover:gap-2 transition-all">
                    Learn more →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
