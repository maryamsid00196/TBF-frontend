import { motion } from 'framer-motion'
import { FiPhone, FiMapPin } from 'react-icons/fi'
import SectionBackdrop from '../components/SectionBackdrop'
import { useContactModal } from '../context/ContactModalContext'
import { CONTACT_ADDRESS, CONTACT_PHONE_DISPLAY } from '../constants/contact'

export default function Contact() {
  const { openModal } = useContactModal()

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
            Get In Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="hero-title text-white"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-xl text-white/80 max-w-2xl mx-auto"
          >
            Get in touch for a consultation or to request a service.
          </motion.p>
        </div>
      </section>
      <section className="relative overflow-hidden py-20 bg-surface">
        <SectionBackdrop variant="surface" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-glass p-8 space-y-6"
            >
              <h2 className="font-heading text-2xl font-bold text-white">Get In Touch</h2>
              <div className="flex items-start gap-3 text-white/80">
                <FiMapPin className="text-2xl text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-white">Headquarters</p>
                  <p>{CONTACT_ADDRESS}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <FiPhone className="text-2xl text-cyan-400 flex-shrink-0" aria-hidden />
                <span className="font-semibold text-white">{CONTACT_PHONE_DISPLAY}</span>
              </div>
              <motion.button
                onClick={() => openModal()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-glow px-6 py-3.5 text-white font-semibold"
              >
                Send a Message
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-xl overflow-hidden ring-1 ring-cyan-400/25 shadow-[0_0_60px_-15px_rgba(34,211,238,0.45)] aspect-video"
            >
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800"
                alt="Office"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
