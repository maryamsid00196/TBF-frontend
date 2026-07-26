import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiPhone, FiMapPin } from 'react-icons/fi'
import { FaLinkedinIn, FaTwitter, FaFacebookF } from 'react-icons/fa'
import { useContactModal } from '../context/ContactModalContext'
import { CONTACT_ADDRESS, CONTACT_PHONE_DISPLAY } from '../constants/contact'

const quickLinks = [
  { label: 'About Us', path: '/#story' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
  { label: 'Careers', path: '/careers' },
]

export default function Footer() {
  const { openModal } = useContactModal()

  return (
    <footer className="bg-primary border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="inline-block">
              <img src="/logo.svg" alt="TBG" className="h-11 w-auto" />
            </Link>
            <p className="mt-3 text-white/80 text-sm leading-relaxed font-medium tracking-tight">
              Building brands, spaces, and software, end to end.
            </p>
            <p className="mt-2 text-white/50 text-xs leading-relaxed">
              Property, platforms, and production. One partner from first idea to final delivery.
            </p>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-white mb-4 tracking-wide">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link to={path} className="text-white/70 hover:text-cyan-400 text-sm transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-white mb-4 tracking-wide">Contact</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <FiMapPin className="text-cyan-400 flex-shrink-0" aria-hidden /> {CONTACT_ADDRESS}
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="text-cyan-400 flex-shrink-0" aria-hidden /> {CONTACT_PHONE_DISPLAY}
              </li>
              <li className="flex gap-3 mt-2">
                <a href="#" className="p-2 rounded-full border border-white/10 bg-white/5 hover:border-cyan-400/40 hover:text-cyan-300 hover:bg-white/[0.08] transition-colors" aria-label="LinkedIn">
                  <FaLinkedinIn size={16} />
                </a>
                <a href="#" className="p-2 rounded-full border border-white/10 bg-white/5 hover:border-cyan-400/40 hover:text-cyan-300 hover:bg-white/[0.08] transition-colors" aria-label="Twitter">
                  <FaTwitter size={16} />
                </a>
                <a href="#" className="p-2 rounded-full border border-white/10 bg-white/5 hover:border-cyan-400/40 hover:text-cyan-300 hover:bg-white/[0.08] transition-colors" aria-label="Facebook">
                  <FaFacebookF size={16} />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-white mb-4 tracking-wide">Work With Us</h3>
            <p className="text-white/70 text-sm mb-4">
              Get in touch for a consultation or to request a service.
            </p>
            <motion.button
              onClick={() => openModal()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-glow px-5 py-2.5 text-white font-semibold text-sm"
            >
              Contact Us
            </motion.button>
          </div>
        </div>
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs text-white/50 tracking-wide text-center md:text-right">
            © {new Date().getFullYear()} TBG Time Business Group. Terms, Privacy, Careers
          </div>
        </div>
      </div>
    </footer>
  )
}
