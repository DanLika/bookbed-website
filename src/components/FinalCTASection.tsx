import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export default function FinalCTASection() {
  const { t } = useTranslation()

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary via-primary-hover to-primary-light dark:from-primary-dark dark:via-primary dark:to-primary-light overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
        >
          {t('cta.title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl sm:text-2xl text-white/90 mb-12 max-w-2xl mx-auto"
        >
          {t('cta.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <a
            href="https://app.bookbed.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-primary font-bold rounded-xl text-lg hover:bg-gray-50 transition-all transform hover:scale-105 shadow-2xl"
          >
            {t('cta.button')}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
