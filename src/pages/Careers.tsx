import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SectionBackdrop from '../components/SectionBackdrop'
import PageHero from '../components/PageHero'
import { FiMapPin, FiClock, FiLayers, FiCpu, FiTrendingUp, FiGlobe } from 'react-icons/fi'
import { useJobApplicationModal } from '../context/JobApplicationModalContext'
import { getJobPostings, JobPostingPublic } from '../services/api'

export default function Careers() {
  const { openJobModal } = useJobApplicationModal()
  const [jobs, setJobs] = useState<JobPostingPublic[]>([])
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const rows = await getJobPostings()
        if (!cancelled) {
          setJobs(rows)
          setLoadError(null)
        }
      } catch {
        if (!cancelled) {
          setJobs([])
          setLoadError('Could not load openings. Please try again later.')
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const perks = [
    { icon: FiLayers, title: 'Tech and creative, one team', text: 'Work across software, AI and media, not just one lane.' },
    { icon: FiCpu, title: 'AI-first tools', text: 'Ship with the latest AI pipelines and tooling every day.' },
    { icon: FiTrendingUp, title: 'Room to grow', text: 'Real ownership, mentorship and a clear path upward.' },
    { icon: FiGlobe, title: 'Dubai HQ, global clients', text: 'Work with brands and organisations around the world.' },
  ]

  return (
    <>
      <PageHero
        label="Careers"
        title="Build the future"
        highlight="with us."
        description="We're engineers, editors and creatives working side by side. If you love shipping great work, you'll fit right in."
        crumbs={[{ label: 'Careers' }]}
      >
        <a
          href="#openings"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
          className="inline-flex btn-glow px-8 py-4 font-semibold text-white"
        >
          View open roles
        </a>
      </PageHero>

      <section className="relative overflow-hidden py-20 bg-surface">
        <SectionBackdrop variant="surface" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label text-cyan-300 mb-3">Why TBG</p>
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-white tracking-tight">A place to do your best work</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-3xl border border-white/10 bg-[#0d1324]/85 p-6 transition hover:-translate-y-1 hover:border-indigo-400/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-cyan-300 transition group-hover:bg-gradient-accent group-hover:text-white">
                  <Icon className="text-xl" />
                </span>
                <h3 className="mt-5 font-heading text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-white/60">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="openings" className="relative overflow-hidden py-20 bg-primary scroll-mt-24">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label text-indigo-300 mb-3">Open roles</p>
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-white tracking-tight">Current openings</h2>
          {loadError && (
            <p className="mt-6 text-amber-400/90 text-sm" role="alert">
              {loadError}
            </p>
          )}
          <div className="mt-10 space-y-4">
            {jobs.length === 0 && !loadError ? (
              <p className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-white/55">
                No open roles listed right now. We still want to hear from great people.
              </p>
            ) : (
              jobs.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                  className="group flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0d1324]/85 p-6 transition hover:border-cyan-300/40"
                >
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white">{job.title}</h3>
                    {job.description && (
                      <p className="mt-2 text-sm text-white/55 leading-relaxed max-w-xl">{job.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-3 text-xs text-white/60">
                      <span className="flex items-center gap-1 rounded-full border border-white/10 px-2.5 py-1">
                        <FiMapPin /> {job.location}
                      </span>
                      <span className="flex items-center gap-1 rounded-full border border-white/10 px-2.5 py-1">
                        <FiClock /> {job.job_type}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => openJobModal(job.title)}
                    className="btn-glow px-5 py-2.5 text-white font-semibold text-sm"
                  >
                    Apply now
                  </button>
                </motion.div>
              ))
            )}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/15 to-cyan-400/10 p-6">
            <div>
              <p className="font-heading text-lg font-semibold text-white">Don't see your role?</p>
              <p className="text-sm text-white/60">Send us your CV and tell us what you'd bring to the team.</p>
            </div>
            <button
              type="button"
              onClick={() => openJobModal('General application')}
              className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-cyan-300/60"
            >
              Send a general application
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
