import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import DocsLayout from '../../components/DocsLayout'
import { usePageMeta } from '../../hooks/usePageMeta'
import { FiArrowRight, FiCheck, FiInfo, FiShield, FiCheckCircle, FiCreditCard, FiDollarSign } from 'react-icons/fi'

const StripeIntegrationPage = () => {
  const { t, i18n } = useTranslation()

  usePageMeta({
    title: i18n.language === 'hr' ? 'Stripe Integracija - BookBed Dokumentacija' : 'Stripe Integration - BookBed Documentation',
    description: i18n.language === 'hr'
      ? 'Naučite kako povezati Stripe za primanje online plaćanja.'
      : 'Learn how to connect Stripe for receiving online payments.'
  })

  const benefits = t('docs.stripe.whatIsStripe.benefits', { returnObjects: true }) as string[]
  const howItWorksSteps = t('docs.stripe.howItWorks.steps', { returnObjects: true }) as string[]
  const step2Info = t('docs.stripe.connect.step2.info', { returnObjects: true }) as string[]
  const feeItems = t('docs.stripe.fees.items', { returnObjects: true }) as string[]

  return (
    <DocsLayout>
      <h1>{t('docs.stripe.title')}</h1>
      <p className="lead">{t('docs.stripe.intro')}</p>

      {/* Security Note */}
      <div className="not-prose my-8 p-5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
        <div className="flex gap-4">
          <div className="flex-shrink-0 p-2.5 bg-blue-500/20 rounded-lg">
            <FiShield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-blue-800 dark:text-blue-200 font-semibold mb-1">
              {t('docs.stripe.securityTitle')}
            </p>
            <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
              {t('docs.stripe.securityContent')}
            </p>
          </div>
        </div>
      </div>

      {/* What is Stripe */}
      <div className="not-prose mt-10">
        <h2 className="text-xl font-semibold text-text-primary dark:text-white mb-4">
          {t('docs.stripe.whatIsStripe.title')}
        </h2>
        <p className="text-text-secondary dark:text-gray-400 mb-4 leading-relaxed">
          {t('docs.stripe.whatIsStripe.content')}
        </p>
        <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-6 border border-gray-100 dark:border-zinc-700">
          <ul className="space-y-3">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-3 text-text-secondary dark:text-gray-400">
                <FiCheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* How It Works */}
      <div className="not-prose mt-10">
        <h2 className="text-xl font-semibold text-text-primary dark:text-white mb-4">
          {t('docs.stripe.howItWorks.title')}
        </h2>
        <p className="text-text-secondary dark:text-gray-400 mb-4 leading-relaxed">
          {t('docs.stripe.howItWorks.content')}
        </p>
        <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-6 border border-gray-100 dark:border-zinc-700">
          <ol className="space-y-4">
            {howItWorksSteps.map((step, i) => (
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

      {/* Connecting Stripe */}
      <div className="not-prose mt-10">
        <h2 className="text-xl font-semibold text-text-primary dark:text-white mb-4">
          {t('docs.stripe.connect.title')}
        </h2>
        <p className="text-text-secondary dark:text-gray-400 mb-6 leading-relaxed">
          {t('docs.stripe.connect.content')}
        </p>

        <div className="space-y-4">
          {/* Step 1 */}
          <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-6 border border-gray-100 dark:border-zinc-700">
            <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-3 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
                1
              </span>
              {t('docs.stripe.connect.step1.title')}
            </h3>
            <p className="text-text-secondary dark:text-gray-400 leading-relaxed pl-11">
              {t('docs.stripe.connect.step1.content')}
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-6 border border-gray-100 dark:border-zinc-700">
            <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-3 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
                2
              </span>
              {t('docs.stripe.connect.step2.title')}
            </h3>
            <p className="text-text-secondary dark:text-gray-400 mb-4 leading-relaxed pl-11">
              {t('docs.stripe.connect.step2.content')}
            </p>
            <ul className="space-y-2 pl-11">
              {step2Info.map((info, i) => (
                <li key={i} className="flex items-start gap-3 text-text-secondary dark:text-gray-400">
                  <FiCheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>{info}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Step 3 */}
          <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-6 border border-gray-100 dark:border-zinc-700">
            <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-3 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
                3
              </span>
              {t('docs.stripe.connect.step3.title')}
            </h3>
            <p className="text-text-secondary dark:text-gray-400 leading-relaxed pl-11">
              {t('docs.stripe.connect.step3.content')}
            </p>
          </div>
        </div>
      </div>

      {/* Success Box */}
      <div className="not-prose mt-10 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
            <FiCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-green-800 dark:text-green-200 text-lg mb-2">
              {t('docs.stripe.successTitle')}
            </h4>
            <p className="text-green-700 dark:text-green-300 leading-relaxed">
              {t('docs.stripe.successContent')}
            </p>
          </div>
        </div>
      </div>

      {/* Fees Section */}
      <div className="not-prose mt-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <FiCreditCard className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary dark:text-white">
            {t('docs.stripe.fees.title')}
          </h2>
        </div>
        <p className="text-text-secondary dark:text-gray-400 mb-4 leading-relaxed">
          {t('docs.stripe.fees.content')}
        </p>
        <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-6 border border-gray-100 dark:border-zinc-700">
          <ul className="space-y-3">
            {feeItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-text-secondary dark:text-gray-400">
                <FiDollarSign className="w-5 h-5 text-primary dark:text-primary-light flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Note Box */}
      <div className="not-prose mt-8 p-5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
        <div className="flex gap-4">
          <FiInfo className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <div>
            <p className="text-amber-800 dark:text-amber-200 font-semibold mb-1">
              {t('docs.stripe.noteTitle')}
            </p>
            <p className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed">
              {t('docs.stripe.noteContent')}
            </p>
          </div>
        </div>
      </div>

      {/* Payouts */}
      <div className="not-prose mt-10">
        <h2 className="text-xl font-semibold text-text-primary dark:text-white mb-4">
          {t('docs.stripe.payouts.title')}
        </h2>
        <p className="text-text-secondary dark:text-gray-400 leading-relaxed">
          {t('docs.stripe.payouts.content')}
        </p>
      </div>

      {/* Navigation */}
      <div className="not-prose mt-10 pt-8 border-t border-gray-200 dark:border-zinc-700">
        <Link
          to="/docs/integrations/ical"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors shadow-purple"
        >
          {t('docs.stripe.nextStep')} <FiArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </DocsLayout>
  )
}

export default StripeIntegrationPage
