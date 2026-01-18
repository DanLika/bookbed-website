import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import DocsLayout from '../../components/DocsLayout'
import { usePageMeta } from '../../hooks/usePageMeta'
import { FiArrowRight, FiAlertTriangle, FiRefreshCw, FiDownload, FiUpload, FiLink, FiGlobe } from 'react-icons/fi'
import { SiAirbnb } from 'react-icons/si'

const ICalSyncPage = () => {
  const { t, i18n } = useTranslation()

  usePageMeta({
    title: i18n.language === 'hr' ? 'iCal Sinkronizacija - BookBed Dokumentacija' : 'iCal Sync - BookBed Documentation',
    description: i18n.language === 'hr'
      ? 'Naučite kako sinkronizirati BookBed sa Airbnb, Booking.com i drugim platformama.'
      : 'Learn how to sync BookBed with Airbnb, Booking.com and other platforms.'
  })

  const supportedPlatforms = [
    {
      name: 'Airbnb',
      icon: <SiAirbnb className="w-6 h-6" />,
      desc: t('docs.ical.supported.airbnb'),
      color: 'bg-red-500/10 text-red-500'
    },
    {
      name: 'Booking.com',
      icon: <FiGlobe className="w-6 h-6" />,
      desc: t('docs.ical.supported.booking'),
      color: 'bg-blue-600/10 text-blue-600 dark:text-blue-400'
    },
    {
      name: 'VRBO / HomeAway',
      icon: <FiLink className="w-6 h-6" />,
      desc: t('docs.ical.supported.vrbo'),
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
    },
    {
      name: 'Google Calendar',
      icon: <FiLink className="w-6 h-6" />,
      desc: t('docs.ical.supported.google'),
      color: 'bg-green-500/10 text-green-600 dark:text-green-400'
    },
  ]

  const airbnbSteps = [
    t('docs.ical.import.airbnb.steps.0'),
    t('docs.ical.import.airbnb.steps.1'),
    t('docs.ical.import.airbnb.steps.2'),
    t('docs.ical.import.airbnb.steps.3'),
    t('docs.ical.import.airbnb.steps.4'),
  ]

  const bookingSteps = [
    t('docs.ical.import.booking.steps.0'),
    t('docs.ical.import.booking.steps.1'),
    t('docs.ical.import.booking.steps.2'),
    t('docs.ical.import.booking.steps.3'),
    t('docs.ical.import.booking.steps.4'),
  ]

  const exportSteps = [
    t('docs.ical.export.steps.0'),
    t('docs.ical.export.steps.1'),
    t('docs.ical.export.steps.2'),
  ]

  const troubleshootingIssues = [
    {
      problem: t('docs.ical.troubleshooting.issues.0.problem'),
      solution: t('docs.ical.troubleshooting.issues.0.solution'),
    },
    {
      problem: t('docs.ical.troubleshooting.issues.1.problem'),
      solution: t('docs.ical.troubleshooting.issues.1.solution'),
    },
    {
      problem: t('docs.ical.troubleshooting.issues.2.problem'),
      solution: t('docs.ical.troubleshooting.issues.2.solution'),
    },
  ]

  return (
    <DocsLayout>
      <h1>{t('docs.ical.title')}</h1>
      <p className="lead">{t('docs.ical.intro')}</p>

      {/* What is iCal */}
      <div className="not-prose mt-10">
        <h2 className="text-xl font-semibold text-text-primary dark:text-white mb-4">
          {t('docs.ical.whatIsIcal.title')}
        </h2>
        <p className="text-text-secondary dark:text-gray-400 leading-relaxed">
          {t('docs.ical.whatIsIcal.content')}
        </p>
      </div>

      {/* Supported Platforms */}
      <div className="not-prose mt-10">
        <h2 className="text-xl font-semibold text-text-primary dark:text-white mb-4">
          {t('docs.ical.supported.title')}
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {supportedPlatforms.map((platform) => (
            <div
              key={platform.name}
              className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-gray-100 dark:border-zinc-700"
            >
              <div className={`p-2.5 rounded-lg ${platform.color}`}>
                {platform.icon}
              </div>
              <div>
                <h3 className="font-semibold text-text-primary dark:text-white">
                  {platform.name}
                </h3>
                <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">
                  {platform.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-text-tertiary dark:text-gray-500 mt-4 italic">
          {t('docs.ical.supported.other')}
        </p>
      </div>

      {/* Import Section */}
      <div className="not-prose mt-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <FiDownload className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary dark:text-white">
            {t('docs.ical.import.title')}
          </h2>
        </div>
        <p className="text-text-secondary dark:text-gray-400 mb-6 leading-relaxed">
          {t('docs.ical.import.content')}
        </p>

        {/* Airbnb Steps */}
        <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-6 border border-gray-100 dark:border-zinc-700 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
              <SiAirbnb className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary dark:text-white">
              {t('docs.ical.import.airbnb.title')}
            </h3>
          </div>
          <ol className="space-y-3">
            {airbnbSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-4 text-text-secondary dark:text-gray-400">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/10 text-red-500 text-sm font-semibold flex-shrink-0">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Booking.com Steps */}
        <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-6 border border-gray-100 dark:border-zinc-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-400">
              <FiGlobe className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary dark:text-white">
              {t('docs.ical.import.booking.title')}
            </h3>
          </div>
          <ol className="space-y-3">
            {bookingSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-4 text-text-secondary dark:text-gray-400">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 text-sm font-semibold flex-shrink-0">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Sync Frequency Info */}
      <div className="not-prose mt-8 p-5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
        <div className="flex gap-4">
          <FiRefreshCw className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
          <div>
            <p className="text-blue-800 dark:text-blue-200 font-semibold mb-1">
              {t('docs.ical.syncFrequency.title')}
            </p>
            <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
              {t('docs.ical.syncFrequency.content')}
            </p>
          </div>
        </div>
      </div>

      {/* Export Section */}
      <div className="not-prose mt-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400">
            <FiUpload className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary dark:text-white">
            {t('docs.ical.export.title')}
          </h2>
        </div>
        <p className="text-text-secondary dark:text-gray-400 mb-4 leading-relaxed">
          {t('docs.ical.export.content')}
        </p>
        <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-6 border border-gray-100 dark:border-zinc-700">
          <ol className="space-y-3">
            {exportSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-4 text-text-secondary dark:text-gray-400">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-sm font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Two-Way Sync */}
      <div className="not-prose mt-10">
        <h2 className="text-xl font-semibold text-text-primary dark:text-white mb-4">
          {t('docs.ical.twoWay.title')}
        </h2>
        <p className="text-text-secondary dark:text-gray-400 leading-relaxed">
          {t('docs.ical.twoWay.content')}
        </p>
      </div>

      {/* Warning Box */}
      <div className="not-prose mt-8 p-5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
        <div className="flex gap-4">
          <FiAlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <div>
            <p className="text-amber-800 dark:text-amber-200 font-semibold mb-1">
              {t('docs.ical.warningTitle')}
            </p>
            <p className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed">
              {t('docs.ical.warningContent')}
            </p>
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="not-prose mt-10">
        <h2 className="text-xl font-semibold text-text-primary dark:text-white mb-4">
          {t('docs.ical.troubleshooting.title')}
        </h2>
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
      <div className="not-prose mt-10 pt-8 border-t border-gray-200 dark:border-zinc-700">
        <Link
          to="/docs/bookings/manage"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors shadow-purple"
        >
          {t('docs.ical.nextStep')} <FiArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </DocsLayout>
  )
}

export default ICalSyncPage
