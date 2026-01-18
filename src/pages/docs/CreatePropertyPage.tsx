import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import DocsLayout from '../../components/DocsLayout'
import { usePageMeta } from '../../hooks/usePageMeta'
import { FiArrowRight, FiInfo, FiCheck, FiHome, FiCheckCircle, FiFileText, FiMapPin, FiClock } from 'react-icons/fi'

const CreatePropertyPage = () => {
  const { t, i18n } = useTranslation()

  usePageMeta({
    title: i18n.language === 'hr' ? 'Kreiranje Nekretnine - BookBed Dokumentacija' : 'Create Property - BookBed Documentation',
    description: i18n.language === 'hr'
      ? 'Naučite kako kreirati nekretninu u BookBed platformi.'
      : 'Learn how to create a property in BookBed platform.'
  })

  const propertyExamples = [
    t('docs.createProperty.whatIsProperty.examples.0'),
    t('docs.createProperty.whatIsProperty.examples.1'),
    t('docs.createProperty.whatIsProperty.examples.2'),
  ]

  const formFields = [
    {
      icon: <FiHome className="w-5 h-5" />,
      label: t('docs.createProperty.steps.step2.fields.name.label'),
      desc: t('docs.createProperty.steps.step2.fields.name.desc'),
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
    },
    {
      icon: <FiMapPin className="w-5 h-5" />,
      label: t('docs.createProperty.steps.step2.fields.address.label'),
      desc: t('docs.createProperty.steps.step2.fields.address.desc'),
      color: 'bg-green-500/10 text-green-600 dark:text-green-400'
    },
    {
      icon: <FiFileText className="w-5 h-5" />,
      label: t('docs.createProperty.steps.step2.fields.description.label'),
      desc: t('docs.createProperty.steps.step2.fields.description.desc'),
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
    },
    {
      icon: <FiClock className="w-5 h-5" />,
      label: t('docs.createProperty.steps.step2.fields.checkInOut.label'),
      desc: t('docs.createProperty.steps.step2.fields.checkInOut.desc'),
      color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
    },
  ]

  const afterCreationSteps = [
    t('docs.createProperty.afterCreation.steps.0'),
    t('docs.createProperty.afterCreation.steps.1'),
    t('docs.createProperty.afterCreation.steps.2'),
  ]

  return (
    <DocsLayout>
      <h1>{t('docs.createProperty.title')}</h1>
      <p className="lead">{t('docs.createProperty.intro')}</p>

      {/* What is a Property */}
      <div className="not-prose mt-10">
        <h2 className="text-xl font-semibold text-text-primary dark:text-white mb-4">
          {t('docs.createProperty.whatIsProperty.title')}
        </h2>
        <p className="text-text-secondary dark:text-gray-400 mb-4 leading-relaxed">
          {t('docs.createProperty.whatIsProperty.content')}
        </p>
        <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-6 border border-gray-100 dark:border-zinc-700">
          <p className="text-sm font-medium text-text-secondary dark:text-gray-400 mb-3">
            {i18n.language === 'hr' ? 'Primjeri nekretnina:' : 'Examples of properties:'}
          </p>
          <ul className="space-y-2">
            {propertyExamples.map((example, i) => (
              <li key={i} className="flex items-center gap-3 text-text-secondary dark:text-gray-400">
                <FiCheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                <span>{example}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Steps to Create */}
      <div className="not-prose mt-10">
        <h2 className="text-xl font-semibold text-text-primary dark:text-white mb-6">
          {t('docs.createProperty.steps.title')}
        </h2>

        <div className="space-y-4">
          {/* Step 1 */}
          <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-6 border border-gray-100 dark:border-zinc-700">
            <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-3 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
                1
              </span>
              {t('docs.createProperty.steps.step1.title')}
            </h3>
            <p className="text-text-secondary dark:text-gray-400 leading-relaxed pl-11">
              {t('docs.createProperty.steps.step1.content')}
            </p>
          </div>

          {/* Step 2 - Form Fields */}
          <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-6 border border-gray-100 dark:border-zinc-700">
            <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-3 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
                2
              </span>
              {t('docs.createProperty.steps.step2.title')}
            </h3>
            <p className="text-text-secondary dark:text-gray-400 mb-4 leading-relaxed pl-11">
              {t('docs.createProperty.steps.step2.content')}
            </p>
            <div className="grid sm:grid-cols-2 gap-3 pl-11">
              {formFields.map((field, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-white dark:bg-zinc-900/50 rounded-lg border border-gray-100 dark:border-zinc-700">
                  <div className={`p-2 rounded-lg ${field.color}`}>
                    {field.icon}
                  </div>
                  <div>
                    <p className="font-medium text-text-primary dark:text-white text-sm">
                      {field.label}
                    </p>
                    <p className="text-xs text-text-secondary dark:text-gray-400 mt-0.5">
                      {field.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-6 border border-gray-100 dark:border-zinc-700">
            <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-3 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
                3
              </span>
              {t('docs.createProperty.steps.step3.title')}
            </h3>
            <p className="text-text-secondary dark:text-gray-400 leading-relaxed pl-11">
              {t('docs.createProperty.steps.step3.content')}
            </p>
          </div>
        </div>
      </div>

      {/* Tip Box */}
      <div className="not-prose mt-8 p-5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
        <div className="flex gap-4">
          <FiInfo className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <div>
            <p className="text-amber-800 dark:text-amber-200 font-semibold mb-1">
              {t('docs.createProperty.tipTitle')}
            </p>
            <p className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed">
              {t('docs.createProperty.tipContent')}
            </p>
          </div>
        </div>
      </div>

      {/* After Creation */}
      <div className="not-prose mt-10">
        <h2 className="text-xl font-semibold text-text-primary dark:text-white mb-4">
          {t('docs.createProperty.afterCreation.title')}
        </h2>
        <p className="text-text-secondary dark:text-gray-400 mb-4 leading-relaxed">
          {t('docs.createProperty.afterCreation.content')}
        </p>
        <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-6 border border-gray-100 dark:border-zinc-700">
          <ol className="space-y-3">
            {afterCreationSteps.map((step, i) => (
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

      {/* Success Box */}
      <div className="not-prose mt-10 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
            <FiCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-green-800 dark:text-green-200 text-lg mb-2">
              {i18n.language === 'hr' ? 'Spremno za sljedeći korak!' : 'Ready for the next step!'}
            </h4>
            <p className="text-green-700 dark:text-green-300 leading-relaxed">
              {i18n.language === 'hr'
                ? 'Nakon što kreirate nekretninu, možete dodati smještajne jedinice i započeti primanje rezervacija.'
                : 'After creating a property, you can add accommodation units and start receiving bookings.'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="not-prose mt-10 pt-8 border-t border-gray-200 dark:border-zinc-700 flex flex-wrap gap-4">
        <Link
          to="/docs/quick-start"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-zinc-600 hover:bg-gray-50 dark:hover:bg-zinc-800 text-text-primary dark:text-white font-medium rounded-lg transition-colors"
        >
          {t('docs.backToQuickStart')}
        </Link>
        <Link
          to="/docs/properties/units"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors shadow-purple"
        >
          {t('docs.createProperty.nextStep')} <FiArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </DocsLayout>
  )
}

export default CreatePropertyPage
