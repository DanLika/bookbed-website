import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import useSEO from '../hooks/useSEO'
import { spacing, heroSpacing, getSectionSpacing } from '../utils/spacing'
import { typography } from '../utils/typography'
import FadeContent from '../components/ui/animations/FadeContent'
import GradientText from '../components/ui/animations/GradientText'
import GlassIcon from '../components/ui/GlassIcon'

const WidgetPage = () => {
  const { t } = useTranslation()
  useSEO(
    t('seo.widget.title'),
    t('seo.widget.description')
  )
  const [activeMode, setActiveMode] = useState<'full' | 'calendar' | 'inquiry'>('full')
  const [copied, setCopied] = useState(false)

  const modes = [
    {
      id: 'full',
      key: 'mode1',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
    {
      id: 'calendar',
      key: 'mode2',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'inquiry',
      key: 'mode3',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
  ] as const

  const getEmbedCode = () => {
    if (activeMode === 'calendar') {
      return `<iframe
  src="https://view.bookbed.io/?property=fg5nlt3aLlx4HWJeqliq&unit=Ot2PzlJYSNXjJIGvicHY&embed=true"
  style="width: 100%; border: none; aspect-ratio: 1/1.4; min-height: 500px; max-height: 850px;"
  title="BookBed Calendar Widget"
></iframe>`
    } else if (activeMode === 'inquiry') {
      return `<iframe
  src="https://view.bookbed.io/?property=fg5nlt3aLlx4HWJeqliq&unit=fEAkFrzkjLP6EF2unqLv&embed=true"
  style="width: 100%; border: none; aspect-ratio: 1/1.4; min-height: 500px; max-height: 850px;"
  title="BookBed Inquiry Widget"
></iframe>`
    }
    // Full mode (default)
    return `<iframe
  src="https://view.bookbed.io/?property=fg5nlt3aLlx4HWJeqliq&unit=gMIOos56siO74VkCsSwY&embed=true"
  style="width: 100%; border: none; aspect-ratio: 1/1.4; min-height: 500px; max-height: 850px;"
  title="BookBed Full Booking Widget"
></iframe>`
  }

  const embedCode = getEmbedCode()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
          <FadeContent
            duration={500}
            direction="none"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary dark:text-primary-light text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              {t('widget.badge')}
            </div>
          </FadeContent>

          <FadeContent
            blur
            duration={600}
            delay={100}
            direction="up"
            distance={20}
          >
            <h1 className={`${typography.h1} font-bold text-text-primary dark:text-white mb-6`}>
              <GradientText
                colors={['#6B4CE6', '#9B86F3', '#6B4CE6', '#9B86F3', '#6B4CE6']}
                animationSpeed={6}
                className={typography.h1}
              >
                {t('widget.title')}
              </GradientText>
            </h1>
          </FadeContent>

          <FadeContent
            duration={600}
            delay={200}
            direction="up"
            distance={20}
          >
            <p className={`${typography.subtitle} text-text-secondary dark:text-gray-400 max-w-2xl mx-auto`}>
              {t('widget.subtitle')}
            </p>
          </FadeContent>
        </div>
      </section>

      {/* Mode Selector */}
      <section className={`relative pb-8 ${spacing.container.padding}`}>
        <div className="max-w-4xl mx-auto">
          <FadeContent
            duration={500}
            delay={300}
            direction="up"
            distance={20}
          >
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {modes.map((mode) => (
                <motion.button
                  key={mode.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveMode(mode.id as typeof activeMode)}
                  className={`flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl font-medium transition-all border ${
                    activeMode === mode.id
                      ? 'bg-primary text-white shadow-purple border-primary'
                      : 'bg-white/70 dark:bg-zinc-800/70 backdrop-blur-xl text-text-primary dark:text-white hover:bg-gray-50/80 dark:hover:bg-zinc-700/80 border-gray-200/50 dark:border-zinc-700/50 shadow-sm'
                  }`}
                >
                  {mode.icon}
                  <span className="hidden sm:inline">{t(`widget.${mode.key}.title`)}</span>
                </motion.button>
              ))}
            </div>
          </FadeContent>
        </div>
      </section>

      {/* Mode Description */}
      <section className={`relative pb-10 ${spacing.container.padding}`}>
        <div className="max-w-2xl mx-auto text-center">
          <motion.p
            key={activeMode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg text-text-secondary dark:text-gray-400"
          >
            {t(`widget.${modes.find(m => m.id === activeMode)?.key}.desc`)}
          </motion.p>
        </div>
      </section>

      {/* Widget Preview */}
      <section className={`relative pb-12 ${spacing.container.padding}`}>
        <div className="max-w-4xl mx-auto">
          <FadeContent
            duration={600}
            delay={400}
            direction="up"
            distance={30}
          >
            <motion.div
              key={activeMode}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group"
            >
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary-light/10 to-primary/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

              {/* Widget content - Live iframe */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-700 shadow-xl">
                {activeMode === 'full' && (
                  <iframe
                    src="https://view.bookbed.io/?property=fg5nlt3aLlx4HWJeqliq&unit=gMIOos56siO74VkCsSwY&embed=true"
                    style={{ width: '100%', border: 'none', aspectRatio: '1/1.4', minHeight: '500px', maxHeight: '850px' }}
                    title="BookBed Full Booking Widget"
                  />
                )}
                {activeMode === 'calendar' && (
                  <iframe
                    src="https://view.bookbed.io/?property=fg5nlt3aLlx4HWJeqliq&unit=Ot2PzlJYSNXjJIGvicHY&embed=true"
                    style={{ width: '100%', border: 'none', aspectRatio: '1/1.4', minHeight: '500px', maxHeight: '850px' }}
                    title="BookBed Calendar Widget"
                  />
                )}
                {activeMode === 'inquiry' && (
                  <iframe
                    src="https://view.bookbed.io/?property=fg5nlt3aLlx4HWJeqliq&unit=fEAkFrzkjLP6EF2unqLv&embed=true"
                    style={{ width: '100%', border: 'none', aspectRatio: '1/1.4', minHeight: '500px', maxHeight: '850px' }}
                    title="BookBed Inquiry Widget"
                  />
                )}
              </div>
            </motion.div>
          </FadeContent>
        </div>
      </section>

      {/* Embed Code */}
      <section className={`relative ${getSectionSpacing()} ${spacing.container.padding}`}>
        <div className="max-w-3xl mx-auto">
          <FadeContent
            duration={600}
            delay={100}
            direction="up"
            distance={30}
          >
            <h3 className={`${typography.h3} font-semibold text-text-primary dark:text-white mb-6 text-center flex items-center justify-center gap-3`}>
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              {t('widget.embedCode')}
            </h3>
            <div className="relative">
              <pre className="bg-zinc-900 dark:bg-zinc-950 rounded-2xl p-6 overflow-x-auto text-sm text-gray-300 border border-zinc-800">
                <code>{embedCode}</code>
              </pre>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={copyToClipboard}
                className={`absolute top-3 right-3 p-2.5 rounded-lg transition-all ${
                  copied
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-zinc-700/50 hover:bg-zinc-700 text-gray-400 hover:text-white'
                }`}
                title={copied ? t('widget.copied') : t('widget.copyCode')}
              >
                {copied ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </motion.button>
            </div>
          </FadeContent>

          {/* Features list */}
          <FadeContent
            duration={600}
            delay={200}
            direction="up"
            distance={30}
          >
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  key: 'feature1',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  ),
                  color: 'primary' as const
                },
                {
                  key: 'feature2',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  ),
                  color: 'blue' as const
                },
                {
                  key: 'feature3',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  color: 'amber' as const
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group text-center p-5 sm:p-6 rounded-2xl bg-white/70 dark:bg-zinc-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-zinc-700/50 hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex justify-center mb-4">
                    <GlassIcon size="md" color={feature.color}>
                      {feature.icon}
                    </GlassIcon>
                  </div>
                  <h4 className="font-semibold text-text-primary dark:text-white mb-2">{t(`widget.${feature.key}.title`)}</h4>
                  <p className="text-sm text-text-secondary dark:text-gray-400">{t(`widget.${feature.key}.desc`)}</p>
                </div>
              ))}
            </div>
          </FadeContent>
        </div>
      </section>
    </div>
  )
}

export default WidgetPage
