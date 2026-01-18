import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import DocsLayout from '../../components/DocsLayout'
import { usePageMeta } from '../../hooks/usePageMeta'
import { FiCopy, FiCheck, FiArrowRight, FiAlertTriangle, FiCheckCircle, FiCode } from 'react-icons/fi'
import { SiWordpress, SiWix, SiSquarespace } from 'react-icons/si'

const WidgetEmbedPage = () => {
  const { t, i18n } = useTranslation()
  const [copied, setCopied] = useState(false)

  usePageMeta({
    title: i18n.language === 'hr' ? 'Embed Widget - BookBed Dokumentacija' : 'Embed Widget - BookBed Documentation',
    description: i18n.language === 'hr'
      ? 'Naučite kako ugraditi BookBed widget na vašu web stranicu.'
      : 'Learn how to embed BookBed widget on your website.'
  })

  const embedCode = `<iframe
  src="https://view.bookbed.io/?property=PROPERTY_ID&unit=UNIT_ID"
  style="width: 100%; aspect-ratio: 1/1.4; min-height: 500px; max-height: 850px; border: none; border-radius: 12px;"
  loading="lazy"
  title="BookBed Booking Widget"
></iframe>`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const getCodeSteps = t('docs.widgetEmbed.getCode.steps', { returnObjects: true }) as string[]

  const platforms = [
    {
      key: 'wordpress',
      icon: <SiWordpress className="w-6 h-6" />,
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
    {
      key: 'wix',
      icon: <SiWix className="w-6 h-6" />,
      color: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
    },
    {
      key: 'squarespace',
      icon: <SiSquarespace className="w-6 h-6" />,
      color: 'bg-gray-500/10 text-gray-600 dark:text-gray-400',
    },
  ]

  const troubleshootingIssues = t('docs.widgetEmbed.troubleshooting.issues', { returnObjects: true }) as Array<{
    problem: string
    solution: string
  }>

  return (
    <DocsLayout>
      <h1>{t('docs.widgetEmbed.title')}</h1>
      <p className="lead">{t('docs.widgetEmbed.intro')}</p>

      {/* Getting Your Embed Code */}
      <div className="not-prose mt-8">
        <h2 className="text-xl font-semibold text-text-primary dark:text-white mb-4">
          {t('docs.widgetEmbed.getCode.title')}
        </h2>
        <p className="text-text-secondary dark:text-gray-400 mb-4">
          {t('docs.widgetEmbed.getCode.content')}
        </p>
        <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-6 border border-gray-100 dark:border-zinc-700">
          <ol className="space-y-3">
            {getCodeSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-text-secondary dark:text-gray-400">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary dark:text-primary-light text-sm font-semibold flex-shrink-0">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Example Code */}
      <div className="not-prose mt-10">
        <h2 className="text-xl font-semibold text-text-primary dark:text-white mb-4">
          {t('docs.widgetEmbed.example.title')}
        </h2>
        <p className="text-text-secondary dark:text-gray-400 mb-4">
          {t('docs.widgetEmbed.example.content')}
        </p>

        <div className="relative">
          <div className="absolute top-0 left-0 px-3 py-1.5 bg-zinc-700 text-zinc-300 text-xs font-medium rounded-tl-lg rounded-br-lg">
            HTML
          </div>
          <pre className="bg-zinc-900 text-gray-100 rounded-xl p-5 pt-10 overflow-x-auto text-sm leading-relaxed">
            <code>{embedCode}</code>
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors text-sm"
          >
            {copied ? (
              <>
                <FiCheck className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <FiCopy className="w-4 h-4 text-gray-300" />
                <span className="text-gray-300">{t('docs.widgetEmbed.copyCode')}</span>
              </>
            )}
          </button>
        </div>
        <p className="text-sm text-text-tertiary dark:text-gray-500 mt-3 italic">
          {t('docs.widgetEmbed.example.note')}
        </p>
      </div>

      {/* Platform Instructions */}
      <div className="not-prose mt-10">
        <h2 className="text-xl font-semibold text-text-primary dark:text-white mb-4">
          {t('docs.widgetEmbed.platforms.title')}
        </h2>
        <p className="text-text-secondary dark:text-gray-400 mb-6">
          {t('docs.widgetEmbed.platforms.content')}
        </p>

        <div className="grid gap-4">
          {platforms.map((platform) => {
            const steps = t(`docs.widgetEmbed.platforms.${platform.key}.steps`, { returnObjects: true }) as string[]
            return (
              <div
                key={platform.key}
                className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-6 border border-gray-100 dark:border-zinc-700"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2.5 rounded-lg ${platform.color}`}>
                    {platform.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary dark:text-white">
                    {t(`docs.widgetEmbed.platforms.${platform.key}.title`)}
                  </h3>
                </div>
                <ol className="space-y-2 ml-1">
                  {steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-text-secondary dark:text-gray-400">
                      <FiCheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )
          })}

          {/* Custom HTML */}
          <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-6 border border-gray-100 dark:border-zinc-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <FiCode className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary dark:text-white">
                {t('docs.widgetEmbed.platforms.html.title')}
              </h3>
            </div>
            <p className="text-text-secondary dark:text-gray-400">
              {t('docs.widgetEmbed.platforms.html.content')}
            </p>
          </div>
        </div>
      </div>

      {/* Warning Box */}
      <div className="not-prose mt-10 p-5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
        <div className="flex gap-4">
          <FiAlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <div>
            <p className="text-amber-800 dark:text-amber-200 font-semibold mb-1">
              {t('docs.widgetEmbed.warningTitle')}
            </p>
            <p className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed">
              {t('docs.widgetEmbed.warningContent')}
            </p>
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="not-prose mt-10">
        <h2 className="text-xl font-semibold text-text-primary dark:text-white mb-4">
          {t('docs.widgetEmbed.troubleshooting.title')}
        </h2>
        <p className="text-text-secondary dark:text-gray-400 mb-4">
          {t('docs.widgetEmbed.troubleshooting.content')}
        </p>

        <div className="space-y-3">
          {troubleshootingIssues.map((issue, i) => (
            <div
              key={i}
              className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-4 border border-gray-100 dark:border-zinc-700"
            >
              <p className="font-medium text-text-primary dark:text-white mb-1">
                {issue.problem}
              </p>
              <p className="text-sm text-text-secondary dark:text-gray-400">
                {issue.solution}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="not-prose mt-10 pt-8 border-t border-gray-200 dark:border-zinc-700 flex flex-wrap gap-4">
        <Link
          to="/docs/widget/setup"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-zinc-600 hover:bg-gray-50 dark:hover:bg-zinc-800 text-text-primary dark:text-white font-medium rounded-lg transition-colors"
        >
          {t('docs.backToWidgetSetup')}
        </Link>
        <Link
          to="/docs/widget/customize"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors shadow-purple"
        >
          {t('docs.widgetEmbed.nextStep')} <FiArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </DocsLayout>
  )
}

export default WidgetEmbedPage
