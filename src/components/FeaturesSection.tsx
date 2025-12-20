import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export default function FeaturesSection() {
  const { t } = useTranslation()

  const features = [
    {
      key: 'calendar',
      image: '/images/bookbed/bookbed-calendar.png',
    },
    {
      key: 'widget',
      image: '/images/bookbed/bookbed-widget.png',
    },
    {
      key: 'analytics',
      image: '/images/bookbed/bookbed-dashboard.png',
    },
  ]

  return (
    <section className="relative py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white dark:from-black dark:to-zinc-900 overflow-hidden">
      {/* Subtle dot pattern background */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary dark:text-white mb-4"
          >
            {t('features.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-text-secondary dark:text-gray-400 max-w-2xl mx-auto"
          >
            {t('features.subtitle')}
          </motion.p>
        </div>

        {/* Features Grid - 3 large cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="group"
            >
              {/* Card */}
              <div className="relative bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 overflow-hidden transition-all duration-500 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 dark:from-zinc-800 dark:to-zinc-900">
                  <img
                    src={feature.image}
                    alt={t(`features.${feature.key}.title`)}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 dark:from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-text-primary dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300">
                    {t(`features.${feature.key}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="text-text-secondary dark:text-gray-400 leading-relaxed">
                    {t(`features.${feature.key}.desc`)}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-light to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
