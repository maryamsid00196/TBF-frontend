import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SectionBackdrop from '../components/SectionBackdrop'
import { FiMapPin, FiClock } from 'react-icons/fi'
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
            Join Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="hero-title text-white"
          >
            Careers at TBG
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-xl text-white/80 max-w-2xl mx-auto"
          >
            Join Time Business Group: real estate, tech, and creative under one roof.
          </motion.p>
        </div>
      </section>
      <section className="relative overflow-hidden py-20 bg-surface">
        <SectionBackdrop variant="surface" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/70 text-center mb-12"
          >
            We offer competitive benefits, growth opportunities, and a culture built on innovation and collaboration.
          </motion.p>
          {loadError && (
            <p className="text-center text-amber-400/90 text-sm mb-8" role="alert">
              {loadError}
            </p>
          )}
          <div className="space-y-4">
            {jobs.length === 0 && !loadError ? (
              <p className="text-center text-white/50 py-8">No open roles listed right now. Check back soon.</p>
            ) : (
              jobs.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                  className="card-glass p-6 flex flex-wrap items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="text-lg font-bold text-white">{job.title}</h3>
                    {job.description && (
                      <p className="mt-2 text-sm text-white/55 leading-relaxed max-w-xl">{job.description}</p>
                    )}
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-white/60">
                      <span className="flex items-center gap-1">
                        <FiMapPin /> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiClock /> {job.job_type}
                      </span>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => openJobModal(job.title)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-glow px-5 py-2.5 text-white font-semibold text-sm"
                  >
                    Apply
                  </motion.button>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  )
}
