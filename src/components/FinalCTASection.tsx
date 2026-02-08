import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getSectionSpacing, getContainerClasses } from '../utils/spacing'
import { typography } from '../utils/typography'
import FadeContent from './ui/animations/FadeContent'
import BlurText from './ui/animations/BlurText'
import { motion, AnimatePresence } from 'framer-motion'

// HubSpot configuration - set these in your environment or replace with actual values
const HUBSPOT_PORTAL_ID = import.meta.env.VITE_HUBSPOT_PORTAL_ID || ''
const HUBSPOT_FORM_ID = import.meta.env.VITE_HUBSPOT_FORM_ID || ''
const HUBSPOT_REGION = import.meta.env.VITE_HUBSPOT_REGION || 'na1' // eu1 for Europe, na1 for US

export default function FinalCTASection() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      setStatus('error')
      setErrorMessage(t('newsletter.invalidEmail'))
      return
    }

    // Check if HubSpot is configured
    if (!HUBSPOT_PORTAL_ID || !HUBSPOT_FORM_ID) {
      // Fallback: just show success (for development/testing)
      console.log('Newsletter signup (HubSpot not configured):', email)
      setStatus('success')
      setEmail('')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      // Use region-specific API endpoint (eu1 for Europe, na1 for US)
      const apiBase = HUBSPOT_REGION === 'eu1'
        ? 'https://api-eu1.hsforms.com'
        : 'https://api.hsforms.com'

      const response = await fetch(
        `${apiBase}/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fields: [
              {
                objectTypeId: '0-1',
                name: 'email',
                value: email,
              },
            ],
            context: {
              pageUri: window.location.href,
              pageName: document.title,
            },
          }),
        }
      )

      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        throw new Error('Submission failed')
      }
    } catch {
      setStatus('error')
      setErrorMessage(t('newsletter.error'))
    }
  }

  return (
    <section className={`relative ${getSectionSpacing()} px-4 sm:px-6 md:px-8 lg:px-12 bg-gradient-to-br from-primary via-primary-hover to-primary-light dark:from-primary-dark dark:via-primary dark:to-primary-light`}>
      {/* Background decoration - bubbles hidden on mobile, shown on desktop only */}
      <div className="absolute inset-0 opacity-30 hidden lg:block">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full animate-float" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className={`relative ${getContainerClasses()}`}>
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <BlurText
              text={t('newsletter.title')}
              as="h2"
              delay={100}
              animateBy="words"
              direction="top"
              justify="responsive"
              className={`${typography.h2} font-bold text-white mb-6`}
            />

            <FadeContent
              duration={600}
              delay={100}
              direction="up"
              distance={30}
            >
              <p className="text-xl sm:text-2xl text-white/90 mb-10 max-w-xl mx-auto lg:mx-0">
                {t('newsletter.subtitle')}
              </p>
            </FadeContent>

            <FadeContent
              duration={600}
              delay={200}
              direction="up"
              distance={30}
            >
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 px-6 py-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white font-medium">{t('newsletter.success')}</span>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto lg:mx-0"
                  >
                    <div className="flex-1 relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (status === 'error') setStatus('idle')
                        }}
                        placeholder={t('newsletter.placeholder')}
                        className={`w-full px-5 py-3.5 rounded-xl bg-white/95 dark:bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all ${status === 'error' ? 'ring-2 ring-red-400' : ''
                          }`}
                        disabled={status === 'loading'}
                      />
                      {status === 'error' && errorMessage && (
                        <p className="absolute -bottom-6 left-0 text-sm text-red-200">{errorMessage}</p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-primary font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? (
                        <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      ) : (
                        <>
                          {t('newsletter.button')}
                          <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </FadeContent>
          </div>

          {/* Newsletter Illustration */}
          <FadeContent
            duration={600}
            delay={300}
            direction="right"
            distance={50}
            className="flex-1 w-full max-w-xl lg:max-w-none"
          >
            <div className="relative flex items-center justify-center">
              {/* Glow behind illustration */}
              <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-75" />

              {/* Newsletter Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/newsletter-illustration.png"
                  alt="Newsletter subscription"
                  width={500}
                  height={500}
                  loading="lazy"
                  decoding="async"
                  className="w-full max-w-md h-auto"
                />
              </div>
            </div>
          </FadeContent>
        </div>
      </div>
    </section>
  )
}
