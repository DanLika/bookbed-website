import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export default function TrustSection() {
  const { t } = useTranslation()

  const techStack = [
    { name: 'Flutter', color: '#02569B' },
    { name: 'Firebase', color: '#FFCA28' },
    { name: 'Stripe', color: '#635BFF' },
    { name: 'Resend', color: '#000000' },
    { name: 'iCal', color: '#FF6B6B' },
  ]

  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white dark:from-black dark:to-zinc-900 overflow-hidden">
      {/* Subtle dot pattern background */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-text-secondary dark:text-gray-400 font-medium mb-10"
        >
          {t('trust.title')}
        </motion.p>

        {/* Tech Stack Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12"
        >
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 hover:border-gray-200 dark:hover:border-zinc-700 transition-colors"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: tech.color }}
              />
              <span className="text-sm font-medium text-text-primary dark:text-white">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
