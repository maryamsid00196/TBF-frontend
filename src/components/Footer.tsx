import { Link } from 'react-router-dom'
import { FiPhone, FiMapPin, FiArrowUpRight } from 'react-icons/fi'
import { FaInstagram } from 'react-icons/fa'
import { useContactModal } from '../context/ContactModalContext'
import { CONTACT_ADDRESS, CONTACT_PHONE_DISPLAY } from '../constants/contact'

const columns = [
  {
    title: 'Services',
    links: [
      { label: 'Real Estate', path: '/services/real-estate' },
      { label: 'Software & AI', path: '/services/software-development' },
      { label: 'Media', path: '/services/media' },
      { label: 'AI Pipelines', path: '/services/software-development#ai' },
      { label: 'Our Work', path: '/#showreel' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our Story', path: '/#story' },
      { label: 'Why TBG', path: '/#different' },
      { label: 'Careers', path: '/careers' },
      { label: 'Contact', path: '/contact' },
    ],
  },
]

export default function Footer() {
  const { openModal } = useContactModal()

  return (
    <footer className="relative overflow-hidden bg-primary border-t border-white/10 text-white">
      <div className="absolute -bottom-40 left-1/2 h-80 w-[min(900px,120vw)] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-[100px] pointer-events-none" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="col-span-2">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src="/logo-badge.svg" alt="" className="h-11 w-11" />
              <span className="font-heading text-lg font-semibold">Time Business Group</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-white/60 leading-relaxed">
              Real estate, software and media under one roof. We build brands, spaces and software, end to end.
            </p>
            <button
              type="button"
              onClick={() => openModal()}
              className="group mt-6 inline-flex items-center gap-2 btn-glow px-5 py-2.5 text-sm font-semibold"
            >
              Start a project
              <FiArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <ul className="mt-6 space-y-3 text-sm text-white/65">
              <li className="flex items-start gap-2">
                <FiMapPin className="mt-0.5 text-cyan-400 flex-shrink-0" aria-hidden /> {CONTACT_ADDRESS}
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="text-cyan-400 flex-shrink-0" aria-hidden /> {CONTACT_PHONE_DISPLAY}
              </li>
            </ul>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs uppercase tracking-wider text-white/45 mb-4">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map(({ label, path }) => (
                  <li key={path}>
                    <Link to={path} className="text-sm text-white/70 transition hover:text-cyan-300">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-white/45 mb-4">Follow</h3>
            <a
              href="https://www.instagram.com/timebusinessgroup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-cyan-400/40 hover:text-cyan-300"
            >
              <FaInstagram /> @timebusinessgroup
            </a>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-xs text-white/45">
          <span>© {new Date().getFullYear()} TBG Time Business Group. All rights reserved.</span>
          <span>Dubai, United Arab Emirates</span>
        </div>
      </div>
    </footer>
  )
}
