import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-[90vh] pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-black dark:to-zinc-900">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />

      <div className="relative max-w-7xl mx-auto">
        {/* Hero Content - Centered */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary dark:text-white leading-tight max-w-5xl mx-auto mb-6"
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl md:text-2xl text-text-secondary dark:text-gray-400 max-w-3xl mx-auto mb-10"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="https://app.bookbed.io"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-semibold rounded-xl text-lg shadow-purple hover:shadow-purple-dark transition-all transform hover:scale-[1.02]"
            >
              {t('hero.cta')}
            </a>
            <Link
              to="/demo"
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-zinc-800 border-2 border-gray-200 dark:border-zinc-700 text-text-primary dark:text-white font-semibold rounded-xl text-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              {t('hero.watchDemo')}
            </Link>
          </motion.div>
        </div>

        {/* Central Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex justify-center"
        >
          {/* Mockup Container */}
          <div className="relative w-full max-w-4xl">
            {/* Glow effect behind mockup */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-3xl scale-110 opacity-50" />

            {/* Mockup Frame - Dashboard style */}
            <div className="relative bg-white dark:bg-zinc-800 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 dark:border-zinc-700 overflow-hidden">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white dark:bg-zinc-800 rounded-lg px-4 py-1.5 text-sm text-text-tertiary dark:text-gray-500 text-center">
                    app.bookbed.io
                  </div>
                </div>
              </div>

              {/* Dashboard Screenshot */}
              <img
                src="/images/bookbed/bookbed-mockup.avif"
                alt="BookBed Dashboard"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Floating Cards */}
          {/* Left Card - Booking Notification */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="hidden lg:block absolute left-0 top-1/4 -translate-x-1/4"
          >
            <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-xl border border-gray-200 dark:border-zinc-700 w-64 animate-float">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-text-primary dark:text-white text-sm">New Booking</p>
                  <p className="text-xs text-text-tertiary dark:text-gray-400">Just now</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary dark:text-gray-300">
                John D. booked Apartment A1 for Dec 24-28
              </p>
            </div>
          </motion.div>

          {/* Right Card - Payment Received */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="hidden lg:block absolute right-0 top-1/2 translate-x-1/4"
          >
            <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-xl border border-gray-200 dark:border-zinc-700 w-56 animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-text-primary dark:text-white text-sm">$450.00</p>
                  <p className="text-xs text-state-success">Payment received</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
