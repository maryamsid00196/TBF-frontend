import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const industries = [
  'Healthcare', 'Retail', 'Education', 'Government', 'Hospitality', 'Manufacturing',
  'Office', 'Industrial', 'Warehouse', 'Banking', 'Restaurant', 'Fitness',
  'Senior Living', 'Data Centers', 'Automotive', 'Pharmaceutical', 'Logistics', 'Real Estate', 'Airport', 'Stadium',
]

export default function Industries() {
  return (
    <>
      <section className="relative py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold"
          >
            Industries We Serve
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-xl text-white/90 max-w-2xl mx-auto"
          >
            Tailored facility solutions across 20+ verticals.
          </motion.p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {industries.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
              >
                <Link
                  to={`/industries/${name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block p-4 rounded-lg border border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition text-center font-medium text-primary"
                >
                  {name}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
