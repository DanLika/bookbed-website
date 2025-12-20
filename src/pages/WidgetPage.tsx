import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const WidgetPage = () => {
  const { t } = useTranslation()
  const [activeMode, setActiveMode] = useState<'full' | 'calendar' | 'inquiry'>('full')
  const [copied, setCopied] = useState(false)

  const modes = [
    { id: 'full', key: 'mode1' },
    { id: 'calendar', key: 'mode2' },
    { id: 'inquiry', key: 'mode3' },
  ] as const

  const embedCode = `<iframe
  src="https://view.bookbed.io/widget/your-property?mode=${activeMode}"
  width="100%"
  height="600"
  frameborder="0"
></iframe>`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-black dark:to-zinc-900">
      {/* Hero */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-text-primary dark:text-white mb-6"
          >
            {t('widget.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-text-secondary dark:text-gray-400"
          >
            {t('widget.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Mode Selector */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id as typeof activeMode)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeMode === mode.id
                    ? 'bg-primary text-white shadow-purple'
                    : 'bg-white dark:bg-zinc-800 text-text-primary dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-700 shadow-light'
                }`}
              >
                {t(`widget.${mode.key}.title`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Mode Description */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.p
            key={activeMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg text-text-secondary dark:text-gray-400"
          >
            {t(`widget.${modes.find(m => m.id === activeMode)?.key}.desc`)}
          </motion.p>
        </div>
      </section>

      {/* Widget Preview */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={activeMode}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl overflow-hidden bg-white dark:bg-zinc-800 shadow-strong"
          >
            <div className="aspect-[4/3] sm:aspect-video flex items-center justify-center bg-gray-50 dark:bg-zinc-900">
              <div className="text-center p-8">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-text-primary dark:text-white mb-2">
                  {t(`widget.${modes.find(m => m.id === activeMode)?.key}.title`)}
                </h3>
                <p className="text-text-secondary dark:text-gray-400">
                  Live widget preview coming soon
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Embed Code */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-4 text-center">
            {t('widget.embedCode')}
          </h3>
          <div className="relative">
            <pre className="bg-zinc-900 dark:bg-zinc-950 rounded-xl p-6 overflow-x-auto text-sm text-gray-300">
              <code>{embedCode}</code>
            </pre>
            <button
              onClick={copyToClipboard}
              className="absolute top-4 right-4 px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-lg transition-colors"
            >
              {copied ? '✓ Copied!' : t('widget.copyCode')}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WidgetPage
