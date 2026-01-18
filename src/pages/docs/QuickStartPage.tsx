import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import DocsLayout from '../../components/DocsLayout'
import { usePageMeta } from '../../hooks/usePageMeta'
import { FiCheck, FiArrowRight, FiInfo, FiCheckCircle } from 'react-icons/fi'

const QuickStartPage = () => {
  const { t, i18n } = useTranslation()

  usePageMeta({
    title: i18n.language === 'hr' ? 'Brzi Početak - BookBed Dokumentacija' : 'Quick Start - BookBed Documentation',
    description: i18n.language === 'hr'
      ? 'Započnite s BookBed platformom u 5 minuta.'
      : 'Get started with BookBed platform in 5 minutes.'
  })

  const steps = [
    { key: 'step1', hasItems: true },
    { key: 'step2', hasItems: true },
    { key: 'step3', hasItems: false, hasSubcontent: true },
    { key: 'step4', hasItems: false },
    { key: 'step5', hasItems: false },
  ]

  return (
    <DocsLayout>
      <h1>{t('docs.quickStart.title')}</h1>
      <p className="lead">{t('docs.quickStart.intro')}</p>

      {/* Tip Box */}
      <div className="not-prose my-8 p-5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
        <div className="flex gap-3">
          <FiInfo className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-blue-800 dark:text-blue-200">
              {t('docs.quickStart.tipLabel')}
            </span>{' '}
            <span className="text-blue-700 dark:text-blue-300">
              {t('docs.quickStart.tip')}
            </span>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="not-prose space-y-6">
        {steps.map((step, index) => {
          const items = step.hasItems
            ? t(`docs.quickStart.${step.key}.items`, { returnObjects: true }) as string[]
            : null

          return (
            <div
              key={step.key}
              className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-6 border border-gray-100 dark:border-zinc-700"
            >
              <h2 className="text-lg font-semibold text-text-primary dark:text-white mb-3 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
                  {index + 1}
                </span>
                {t(`docs.quickStart.${step.key}.title`)}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4 leading-relaxed pl-11">
                {t(`docs.quickStart.${step.key}.content`)}
              </p>

              {items && Array.isArray(items) && (
                <ul className="space-y-2 pl-11">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-text-secondary dark:text-gray-400">
                      <FiCheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {step.hasSubcontent && (
                <p className="text-text-secondary dark:text-gray-400 mt-3 pl-11 leading-relaxed">
                  {t(`docs.quickStart.${step.key}.subcontent`)}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {/* Success Box */}
      <div className="not-prose mt-10 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
            <FiCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-green-800 dark:text-green-200 text-lg mb-2">
              {t('docs.quickStart.successTitle')}
            </h4>
            <p className="text-green-700 dark:text-green-300 leading-relaxed">
              {t('docs.quickStart.successText')}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="not-prose mt-10 pt-8 border-t border-gray-200 dark:border-zinc-700">
        <Link
          to="/docs/properties/create"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors shadow-purple"
        >
          {t('docs.quickStart.nextStep')} <FiArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </DocsLayout>
  )
}

export default QuickStartPage
