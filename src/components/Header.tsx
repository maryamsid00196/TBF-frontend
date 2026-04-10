import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiPhone, FiChevronDown } from 'react-icons/fi'
import { useContactModal } from '../context/ContactModalContext'
import { CONTACT_PHONE_DISPLAY } from '../constants/contact'

const TBG_SERVICES = [
  { label: 'Real Estate', path: '/services/real-estate' },
  { label: 'Media', path: '/services/media' },
  { label: 'Software Development', path: '/services/software-development' },
]

const menuItems = [
  {
    label: 'About Us',
    path: '/#story',
    children: [
      { label: 'Our Story', path: '/#story' },
      { label: 'Core Values', path: '/#values' },
      { label: 'What Makes Us Different', path: '/#different' },
    ],
  },
  {
    label: 'Services',
    path: '/services',
    children: TBG_SERVICES,
  },
  { label: 'Contact Us', path: '/contact' },
  { label: 'Careers', path: '/careers' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { openModal } = useContactModal()

  return (
    <header className="sticky top-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0" aria-label="TBG Home">
            <img src="/logo-badge.svg" alt="TBG" className="h-9 w-9 sm:h-11 sm:w-11 shrink-0 logo-glow" />
            <span className="text-white font-semibold text-sm leading-tight sm:text-lg sm:leading-normal truncate sm:whitespace-normal">
              Time Business Group
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <div
                key={item.path}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children ? (
                  <>
                    <button
                      className="flex items-center gap-1 px-4 py-2 text-white/90 hover:text-white font-medium transition-colors"
                      aria-expanded={activeDropdown === item.label}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <FiChevronDown className="text-sm opacity-80" />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 top-full pt-1 min-w-[220px]"
                        >
                          <div className="glass rounded-xl py-2 shadow-xl">
                            {item.children.map((child) => (
                              <Link
                                key={child.path}
                                to={child.path}
                                className="block px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 hover:text-white transition"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className="block px-4 py-2 text-white/90 hover:text-white font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <span
              className="flex items-center gap-2 text-white/90 font-medium"
              aria-label={`Phone ${CONTACT_PHONE_DISPLAY}`}
            >
              <FiPhone className="text-accent-cyan" aria-hidden />
              {CONTACT_PHONE_DISPLAY}
            </span>
            <button
              onClick={() => openModal()}
              className="btn-glow px-5 py-2.5 text-white font-semibold text-sm"
            >
              Get in Touch
            </button>
          </div>

          <button
            className="lg:hidden p-2 text-white/90 hover:text-white transition"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-white/10 overflow-hidden"
          >
            <nav className="px-4 py-4 space-y-2">
              {menuItems.map((item) => (
                <div key={item.path}>
                  <Link
                    to={item.path}
                    className="block py-2.5 text-white/90 font-medium"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block py-1.5 text-sm text-white/70 hover:text-white"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <span className="flex items-center gap-2 py-2.5 text-accent-cyan font-medium">
                <FiPhone aria-hidden /> {CONTACT_PHONE_DISPLAY}
              </span>
              <button
                onClick={() => { openModal(); setMobileOpen(false); }}
                className="w-full py-3 btn-glow text-white font-semibold"
              >
                Get in Touch
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
