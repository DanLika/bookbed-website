import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import DocsLayout from '../../components/DocsLayout'
import { usePageMeta } from '../../hooks/usePageMeta'
import { FiArrowRight, FiBook, FiCode, FiCreditCard, FiCalendar } from 'react-icons/fi'

const DocsIntroPage = () => {
  const { t, i18n } = useTranslation()

  usePageMeta({
    title: i18n.language === 'hr' ? 'Dokumentacija - BookBed' : 'Documentation - BookBed',
    description: i18n.language === 'hr'
      ? 'Naučite kako koristiti BookBed platformu za upravljanje rezervacijama.'
      : 'Learn how to use the BookBed booking management platform.'
  })

  const quickLinks = [
    {
      icon: <FiBook className="w-6 h-6" />,
      titleKey: 'docs.quickLinks.createProperty.title',
      descKey: 'docs.quickLinks.createProperty.desc',
      path: '/docs/properties/create',
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
    },
    {
      icon: <FiCode className="w-6 h-6" />,
      titleKey: 'docs.quickLinks.embedWidget.title',
      descKey: 'docs.quickLinks.embedWidget.desc',
      path: '/docs/widget/embed',
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
    },
    {
      icon: <FiCreditCard className="w-6 h-6" />,
      titleKey: 'docs.quickLinks.stripeSetup.title',
      descKey: 'docs.quickLinks.stripeSetup.desc',
      path: '/docs/integrations/stripe',
      color: 'bg-green-500/10 text-green-600 dark:text-green-400'
    },
    {
      icon: <FiCalendar className="w-6 h-6" />,
      titleKey: 'docs.quickLinks.manageBookings.title',
      descKey: 'docs.quickLinks.manageBookings.desc',
      path: '/docs/bookings/manage',
      color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
    },
  ]

  return (
    <DocsLayout>
      {/* Header - outside not-prose to get prose styling like GenericDocsPage */}
      <h1 className="text-text-primary dark:text-white">{t('docs.intro.title')}</h1>
      <p className="lead text-text-secondary dark:text-gray-300">{t('docs.intro.subtitle')}</p>

      <div className="not-prose space-y-6 mt-8">
        {/* Quick Links Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="group p-6 rounded-xl border border-gray-200 dark:border-zinc-700 hover:border-primary dark:hover:border-primary-light transition-colors"
            >
              <div className={`inline-flex p-3 rounded-lg mb-4 ${link.color}`}>
                {link.icon}
              </div>
              <h2 className="text-base font-semibold text-text-primary dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                {t(link.titleKey)}
              </h2>
              <p className="text-sm text-text-secondary dark:text-gray-400 mb-3">
                {t(link.descKey)}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary dark:text-primary-light">
                {t('docs.readMore')} <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        {/* Getting Started Steps */}
        <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-text-primary dark:text-white mb-6">
            {t('docs.intro.stepsTitle')}
          </h2>
          <ol className="space-y-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <li key={step} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary dark:text-primary-light font-semibold flex items-center justify-center text-sm">
                  {step}
                </span>
                <div>
                  <h3 className="text-base font-medium text-text-primary dark:text-white">
                    {t(`docs.intro.steps.step${step}.title`)}
                  </h3>
                  <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">
                    {t(`docs.intro.steps.step${step}.desc`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* CTA - separate not-prose like GenericDocsPage navigation */}
      <div className="not-prose mt-10 pt-8 border-t border-gray-200 dark:border-zinc-700">
        <p className="text-text-secondary dark:text-gray-400 mb-4">
          {t('docs.intro.ctaText')}
        </p>
        <Link
          to="/docs/quick-start"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors shadow-purple"
        >
          {t('docs.intro.ctaButton')} <FiArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </DocsLayout>
  )
}

export default DocsIntroPage
