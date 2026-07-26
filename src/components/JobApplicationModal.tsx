import { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { useJobApplicationModal } from '../context/JobApplicationModalContext'
import { submitJobApplication, JobApplicationPayload } from '../services/api'

type FormData = JobApplicationPayload

const RESUME_ACCEPT = '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'

export default function JobApplicationModal() {
  const { isOpen, position, closeJobModal } = useJobApplicationModal()
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: { position: position ?? '' },
  })

  const currentPosition = watch('position')

  useEffect(() => {
    if (isOpen && position) {
      setValue('position', position)
    }
  }, [isOpen, position, setValue])

  useEffect(() => {
    if (isOpen) {
      reset({ position: position ?? '' })
      setResumeFile(null)
    }
  }, [isOpen, reset, position])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeJobModal()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEscape)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, closeJobModal])

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10)
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  const onSubmit = async (data: FormData) => {
    try {
      await submitJobApplication(data, resumeFile)
      closeJobModal()
      reset()
      setResumeFile(null)
      alert('Thank you! Your application has been received. We will review and get in touch soon.')
    } catch (err: unknown) {
      let message = 'Something went wrong. Please try again.'
      if (axios.isAxiosError(err)) {
        const d = err.response?.data
        if (typeof d?.detail === 'string') message = d.detail
        else if (Array.isArray(d?.detail)) message = d.detail.map((x: { msg?: string }) => x.msg).filter(Boolean).join(' ')
        else if (d?.message) message = d.message
      }
      setError('root', { message: String(message) })
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={closeJobModal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-modal-title"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="glass rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-white/10"
        >
          <div className="sticky top-0 glass rounded-t-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
            <h2 id="job-modal-title" className="font-heading text-xl font-bold text-white">
              Apply for Position
            </h2>
            <button
              type="button"
              onClick={closeJobModal}
              className="p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition"
              aria-label="Close"
            >
              <FiX size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            {errors.root && (
              <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-sm" role="alert">
                {errors.root.message}
              </div>
            )}
            <div>
              <label htmlFor="job_full_name" className="block text-sm font-medium text-white/90 mb-1">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                id="job_full_name"
                type="text"
                {...register('full_name', { required: 'Full name is required' })}
                className="input-dark"
                autoComplete="name"
              />
              {errors.full_name && (
                <p className="mt-1 text-sm text-red-400">{errors.full_name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="job_email" className="block text-sm font-medium text-white/90 mb-1">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                id="job_email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className="input-dark"
                autoComplete="email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="job_phone" className="block text-sm font-medium text-white/90 mb-1">
                Phone <span className="text-red-400">*</span>
              </label>
              <input
                id="job_phone"
                type="tel"
                {...register('phone', {
                  required: 'Phone is required',
                  minLength: { value: 12, message: 'Enter a valid phone (e.g. 555-555-5555)' },
                })}
                onChange={(e) => setValue('phone', formatPhone(e.target.value), { shouldValidate: true })}
                placeholder="555-555-5555"
                className="input-dark"
                autoComplete="tel"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="job_position" className="block text-sm font-medium text-white/90 mb-1">
                Position Applying For <span className="text-red-400">*</span>
              </label>
              <input
                id="job_position"
                type="text"
                {...register('position', { required: 'Position is required' })}
                placeholder={currentPosition || 'e.g. Software Developer'}
                className="input-dark"
              />
              {errors.position && (
                <p className="mt-1 text-sm text-red-400">{errors.position.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="resume_file" className="block text-sm font-medium text-white/90 mb-1">
                Resume file
              </label>
              <input
                id="resume_file"
                type="file"
                accept={RESUME_ACCEPT}
                onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
                className="block w-full text-sm text-white/80 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/10 file:text-white file:font-medium hover:file:bg-white/15 cursor-pointer"
              />
              {resumeFile && (
                <p className="mt-1 text-xs text-cyan-400/90">Selected: {resumeFile.name}</p>
              )}
              <p className="mt-1 text-xs text-white/45">PDF, DOC, or DOCX, max 5MB</p>
            </div>
            <div>
              <label htmlFor="resume_url" className="block text-sm font-medium text-white/90 mb-1">
                Or resume link (optional)
              </label>
              <input
                id="resume_url"
                type="url"
                {...register('resume_url')}
                placeholder="https://..."
                className="input-dark"
              />
            </div>
            <div>
              <label htmlFor="portfolio_url" className="block text-sm font-medium text-white/90 mb-1">
                Portfolio or LinkedIn URL
              </label>
              <input
                id="portfolio_url"
                type="url"
                {...register('portfolio_url')}
                placeholder="https://..."
                className="input-dark"
              />
            </div>
            <div>
              <label htmlFor="cover_letter" className="block text-sm font-medium text-white/90 mb-1">
                Cover Letter
              </label>
              <textarea
                id="cover_letter"
                rows={4}
                {...register('cover_letter')}
                placeholder="Tell us why you'd like to join TBG..."
                className="input-dark resize-none"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 btn-glow text-white font-semibold disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
              <button
                type="button"
                onClick={closeJobModal}
                className="px-5 py-3 rounded-lg border border-white/20 text-white/90 font-medium hover:bg-white/10 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
