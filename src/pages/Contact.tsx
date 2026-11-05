import { motion } from 'framer-motion'
import { FiPhone, FiMapPin, FiInstagram, FiMessageSquare, FiFileText, FiZap, FiArrowRight } from 'react-icons/fi'
import PageHero from '../components/PageHero'
import SectionBackdrop from '../components/SectionBackdrop'
import { useContactModal } from '../context/ContactModalContext'
import { CONTACT_ADDRESS, CONTACT_PHONE_DISPLAY } from '../constants/contact'

const NEXT_STEPS = [
  { icon: FiMessageSquare, title: 'Tell us what you need', text: 'Send a short message with your goals. No brief required.' },
  { icon: FiFileText, title: 'Get a clear plan', text: 'We come back with scope, timeline and a quote.' },
  { icon: FiZap, title: 'We get to work', text: 'Your project kicks off with a named point of contact.' },
]

export default function Contact() {
  const { openModal } = useContactModal()

  const cards = [
    { icon: FiMapPin, label: 'Visit us', value: CONTACT_ADDRESS },
    { icon: FiPhone, label: 'Call or WhatsApp', value: CONTACT_PHONE_DISPLAY },
    {
      icon: FiInstagram,
      label: 'Follow our work',
      value: '@timebusinessgroup',
      href: 'https://www.instagram.com/timebusinessgroup',
    },
  ]

  return (
    <>
      <PageHero
        label="Get In Touch"
        title="Let's talk about"
        highlight="what's next."
        description="Whether it's a website, an AI pipeline or a production, tell us what you're planning and we'll show you how we can help."
        crumbs={[{ label: 'Contact' }]}
      >
        <button
          type="button"
          onClick={() => openModal()}
          className="group inline-flex items-center gap-2 btn-glow px-8 py-4 font-semibold text-white"
        >
          Send us a message
          <FiArrowRight className="transition group-hover:translate-x-1" />
        </button>
      </PageHero>

      <section className="relative overflow-hidden py-20 bg-surface">
        <SectionBackdrop variant="surface" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {cards.map(({ icon: Icon, label, value, href }, i) => {
              const body = (
                <>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-cyan-300 transition group-hover:bg-gradient-accent group-hover:text-white">
                    <Icon className="text-xl" />
                  </span>
                  <p className="mt-5 font-mono text-xs uppercase tracking-wider text-white/45">{label}</p>
                  <p className="mt-1 font-heading text-lg font-semibold text-white">{value}</p>
                </>
              )
              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block h-full rounded-3xl border border-white/10 bg-[#0d1324]/85 p-7 transition hover:-translate-y-1 hover:border-cyan-300/40"
                    >
                      {body}
                    </a>
                  ) : (
                    <div className="group h-full rounded-3xl border border-white/10 bg-[#0d1324]/85 p-7">{body}</div>
                  )}
                </motion.div>
              )
            })}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/15 to-cyan-400/10 p-8"
            >
              <p className="font-mono text-xs uppercase tracking-wider text-white/50">What happens next</p>
              <ol className="mt-6 space-y-6">
                {NEXT_STEPS.map(({ icon: Icon, title, text }, i) => (
                  <li key={title} className="flex gap-4">
                    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0d1324] text-cyan-300 border border-white/10">
                      <Icon />
                      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-accent font-mono text-[10px] font-bold text-white">
                        {i + 1}
                      </span>
                    </span>
                    <div>
                      <p className="font-semibold text-white">{title}</p>
                      <p className="text-sm text-white/60">{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <button
                type="button"
                onClick={() => openModal()}
                className="mt-8 w-full btn-glow px-6 py-3.5 font-semibold text-white"
              >
                Start the conversation
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-3 overflow-hidden rounded-3xl border border-white/10 min-h-[360px] shadow-glow"
            >
              <iframe
                title="Time Business Group office location"
                src="https://www.google.com/maps?q=Single+Business+Tower,+Sheikh+Zayed+Road,+Dubai&output=embed"
                className="h-full w-full min-h-[360px] border-0 [filter:invert(0.92)_hue-rotate(185deg)_saturate(0.8)]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
