import { motion } from 'framer-motion'

const brands = Array.from({ length: 14 }, (_, i) => `Partner Brand ${i + 1}`)

export default function Brands() {
  return (
    <>
      <section className="relative py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl lg:text-5xl font-bold"
          >
            Our Brands
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-xl text-white/90 max-w-2xl mx-auto"
          >
            Leading the industry through innovation and operational excellence.
          </motion.p>
        </div>
      </section>
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {brands.map((name) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="h-24 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:border-cyan-400/30 hover:text-cyan-400 transition-colors cursor-pointer text-sm font-medium text-white/60"
              >
                {name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
