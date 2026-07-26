import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { useContactModal } from '../context/ContactModalContext'
import { submitContact, ContactPayload } from '../services/api'

type FormData = ContactPayload

export default function ContactModal() {
  const { isOpen, closeModal, initialData } = useContactModal()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
    setValue,
  } = useForm<FormData>()

  useEffect(() => {
    if (isOpen) {
      reset({
        full_name: '',
        company_name: '',
        email: '',
        phone: '',
        service_interest: initialData?.service_interest ?? '',
        location: '',
        message: '',
      })
    }
  }, [isOpen, reset, initialData?.service_interest])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEscape)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, closeModal])

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10)
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  const onSubmit = async (data: FormData) => {
    try {
      await submitContact(data)
      closeModal()
      reset()
      alert('Thank you! We have received your message and will get back to you soon.')
    } catch (err: unknown) {
      const message = err && typeof err === 'object' && 'response' in err
        ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
        : 'Something went wrong. Please try again.'
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
        onClick={closeModal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="glass rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-white/10"
        >
          <div className="sticky top-0 glass rounded-t-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
            <h2 id="contact-modal-title" className="font-heading text-xl font-bold text-white">
              Contact Us
            </h2>
            <button
              type="button"
              onClick={closeModal}
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
              <label htmlFor="full_name" className="block text-sm font-medium text-white/90 mb-1">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                id="full_name"
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
              <label htmlFor="company_name" className="block text-sm font-medium text-white/90 mb-1">
                Company Name
              </label>
              <input
                id="company_name"
                type="text"
                {...register('company_name')}
                className="input-dark"
                autoComplete="organization"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-1">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                id="email"
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
              <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-1">
                Phone <span className="text-red-400">*</span>
              </label>
              <input
                id="phone"
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
              <label htmlFor="service_interest" className="block text-sm font-medium text-white/90 mb-1">
                Service Interest <span className="text-red-400">*</span>
              </label>
              <select
                id="service_interest"
                {...register('service_interest', { required: 'Please select a service' })}
                className="input-dark"
              >
                <option value="">Select...</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Real Estate - Commercial">Real Estate - Commercial</option>
                <option value="Real Estate - Residential">Real Estate - Residential</option>
                <option value="Real Estate - Advisory">Real Estate - Advisory</option>
                <option value="Media">Media</option>
                <option value="Media - Pre-production">Media - Pre-production</option>
                <option value="Media - Production">Media - Production</option>
                <option value="Media - Post-production">Media - Post-production</option>
                <option value="Media - Graphic Design">Media - Graphic Design</option>
                <option value="Media - Social Media Management">Media - Social Media Management</option>
                <option value="Software Development">Software Development</option>
                <option value="Software Development - AI">Software Development - AI</option>
                <option value="Software Development - Web">Software Development - Web</option>
                <option value="Software Development - Mobile">Software Development - Mobile</option>
                <option value="Other">Other</option>
              </select>
              {errors.service_interest && (
                <p className="mt-1 text-sm text-red-400">{errors.service_interest.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-white/90 mb-1">
                Location or ZIP code
              </label>
              <input
                id="location"
                type="text"
                {...register('location')}
                placeholder="City or ZIP"
                className="input-dark"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-1">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                rows={4}
                {...register('message', { required: 'Message is required' })}
                className="input-dark resize-none"
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
              )}
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 btn-glow text-white font-semibold disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              <button
                type="button"
                onClick={closeModal}
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
