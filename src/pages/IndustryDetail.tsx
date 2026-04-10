import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useContactModal } from '../context/ContactModalContext'

export default function IndustryDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { openModal } = useContactModal()
  const name = slug ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Industry'

  return (
    <>
      <section className="relative py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold"
          >
            {name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-xl text-white/90 max-w-2xl mx-auto"
          >
            Facility management and janitorial solutions for the {name.toLowerCase()} sector.
          </motion.p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gray-600 leading-relaxed text-lg"
          >
            We understand the unique requirements of {name.toLowerCase()} facilities. Our teams are trained
            on industry-specific standards and compliance, and we tailor our janitorial, maintenance,
            and engineering services to support your operations and brand.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex gap-4"
          >
            <button
              onClick={() => openModal()}
              className="px-6 py-3 bg-secondary text-white font-medium rounded-lg hover:bg-secondary/90"
            >
              Request a Service
            </button>
            <Link to="/industries" className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50">
              Back to Industries
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
