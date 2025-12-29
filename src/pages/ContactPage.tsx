import { useState, useEffect, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { spacing, heroSpacing, getSectionSpacing } from '../utils/spacing'
import { typography } from '../utils/typography'
import BlurText from '../components/ui/animations/BlurText'
import ScrollReveal from '../components/ui/animations/ScrollReveal'
import ScrollFloat from '../components/ui/animations/ScrollFloat'
import SpotlightCard from '../components/ui/animations/SpotlightCard'
import ShinyText from '../components/ui/animations/ShinyText'
import GlassIcon from '../components/ui/GlassIcon'

const ContactPage = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  // Auto-dismiss success message after 5 seconds
  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => setStatus('idle'), 5000)
      return () => clearTimeout(timer)
    }
  }, [status])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    // Create mailto link
    const subject = encodeURIComponent(`BookBed Contact: ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )

    // Small delay to show loading state
    setTimeout(() => {
      window.location.href = `mailto:info@bookbed.io?subject=${subject}&body=${body}`
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    }, 300)
  }

  const isSubmitting = status === 'submitting'

  return (
    <div className="relative min-h-screen bg-white dark:bg-zinc-900 overflow-hidden">
      {/* Subtle dot pattern background */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Hero */}
      <section className={`relative ${heroSpacing.paddingTop} pb-12 sm:pb-16 ${spacing.container.padding}`}>
        <div className="max-w-4xl mx-auto text-center">
          <ScrollFloat
            direction="up"
            distance={30}
            scale
            scaleStart={0.9}
            blur
            blurAmount={6}
            duration={0.6}
            threshold={0.1}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary dark:text-primary-light text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {t('contact.badge', 'Get in Touch')}
            </div>
          </ScrollFloat>

          <h1 className={`${typography.h1} font-bold mb-6`}>
            <BlurText
              text={t('contact.title')}
              className="text-text-primary dark:text-white"
              animateBy="words"
              delay={120}
              direction="top"
            />
          </h1>

          <p className={`${typography.subtitle} text-text-secondary dark:text-gray-400 max-w-2xl mx-auto`}>
            <ScrollReveal
              blur
              blurAmount={8}
              direction="up"
              stagger={0.04}
              duration={0.5}
              threshold={0.1}
              delay={0.3}
            >
              {t('contact.subtitle')}
            </ScrollReveal>
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className={`relative ${getSectionSpacing()} ${spacing.container.padding}`}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form */}
            <ScrollFloat
              direction="left"
              distance={50}
              blur
              blurAmount={8}
              duration={0.8}
              threshold={0.15}
              className="lg:col-span-3"
            >
              <SpotlightCard
                spotlightColor="rgba(107, 76, 230, 0.25)"
                className="bg-white dark:bg-zinc-800/50 rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-200 dark:border-zinc-700 shadow-xl"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-text-primary dark:text-white mb-2"
                    >
                      {t('contact.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 text-text-primary dark:text-white placeholder-text-tertiary focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder={t('contact.namePlaceholder', 'Your name')}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-text-primary dark:text-white mb-2"
                    >
                      {t('contact.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 text-text-primary dark:text-white placeholder-text-tertiary focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder={t('contact.emailPlaceholder', 'you@example.com')}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-text-primary dark:text-white mb-2"
                    >
                      {t('contact.message')}
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 text-text-primary dark:text-white placeholder-text-tertiary focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                      placeholder={t('contact.messagePlaceholder', 'How can we help you?')}
                    />
                  </div>

                  <motion.button
                    whileHover={isSubmitting ? {} : { scale: 1.02 }}
                    whileTap={isSubmitting ? {} : { scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full py-4 px-6 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-semibold rounded-xl shadow-purple hover:shadow-purple-dark transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:from-primary disabled:hover:to-primary-dark"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>{t('contact.sending', 'Sending...')}</span>
                      </>
                    ) : (
                      <>
                        <ShinyText text={t('contact.send')} speed={4} />
                        <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </motion.button>

                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between gap-2 text-green-600 dark:text-green-400 bg-green-500/10 p-3 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{t('contact.success')}</span>
                      </div>
                      <button
                        type="button"
                        aria-label={t('contact.dismiss', 'Dismiss')}
                        onClick={() => setStatus('idle')}
                        className="p-1 rounded-full hover:bg-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </motion.div>
                  )}
                </form>
              </SpotlightCard>
            </ScrollFloat>

            {/* Contact Info */}
            <ScrollFloat
              direction="right"
              distance={50}
              blur
              blurAmount={8}
              duration={0.8}
              threshold={0.15}
              stagger
              staggerAmount={0.12}
              className="lg:col-span-2 space-y-4 sm:space-y-6"
            >
              {/* Email Card */}
              <a
                href="mailto:info@bookbed.io"
                className="group block bg-white/70 dark:bg-zinc-800/70 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-gray-200/50 dark:border-zinc-700/50 hover:border-primary/30 dark:hover:border-primary/30 transition-all hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <GlassIcon color="primary">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </GlassIcon>
                  <div>
                    <h3 className="font-semibold text-text-primary dark:text-white mb-1">
                      {t('contact.emailUs', 'Email Us')}
                    </h3>
                    <p className="text-primary dark:text-primary-light font-medium">
                      info@bookbed.io
                    </p>
                  </div>
                </div>
              </a>

              {/* App Link Card */}
              <a
                href="https://app.bookbed.io"
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white/70 dark:bg-zinc-800/70 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-gray-200/50 dark:border-zinc-700/50 hover:border-primary/30 dark:hover:border-primary/30 transition-all hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <GlassIcon color="emerald">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </GlassIcon>
                  <div>
                    <h3 className="font-semibold text-text-primary dark:text-white mb-1">
                      {t('contact.openApp', 'Open App')}
                    </h3>
                    <p className="text-text-secondary dark:text-gray-400 text-sm">
                      {t('contact.openAppDesc', 'Access your dashboard')}
                    </p>
                  </div>
                </div>
              </a>

              {/* Response Time Card */}
              <div className="bg-white/70 dark:bg-zinc-800/70 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-gray-200/50 dark:border-zinc-700/50">
                <div className="flex items-start gap-4">
                  <GlassIcon color="blue">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </GlassIcon>
                  <div>
                    <h3 className="font-semibold text-text-primary dark:text-white mb-1">
                      {t('contact.responseTime', 'Quick Response')}
                    </h3>
                    <p className="text-text-secondary dark:text-gray-400 text-sm">
                      {t('contact.responseTimeDesc', 'We typically respond within 24 hours')}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollFloat>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
