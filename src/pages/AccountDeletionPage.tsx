import { useTranslation } from 'react-i18next'
import { spacing, heroSpacing } from '../utils/spacing'
import { typography } from '../utils/typography'
import FadeContent from '../components/ui/animations/FadeContent'
import { usePageMeta } from '../hooks/usePageMeta'

const AccountDeletionPage = () => {
  const { t } = useTranslation()

  usePageMeta({
    title: t('accountDeletion.meta.title'),
    description: t('accountDeletion.meta.description')
  })

  return (
    <div className="relative min-h-screen bg-white dark:bg-zinc-900 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <section className={`relative ${heroSpacing.paddingTop} pb-12 sm:pb-16 ${spacing.container.padding}`}>
        <div className="max-w-4xl mx-auto">
          <FadeContent duration={500} direction="up" distance={20}>
            <h1 className={`${typography.h1} font-bold text-text-primary dark:text-white mb-8`}>
              {t('accountDeletion.title')}
            </h1>
          </FadeContent>

          <FadeContent duration={600} delay={100} direction="up" distance={20}>
            <div className="prose prose-lg dark:prose-invert max-w-none">

              {/* Method 1: In-App Deletion */}
              <h2 className="text-2xl font-semibold text-text-primary dark:text-white mt-8 mb-4">
                {t('accountDeletion.method1.title')}
              </h2>
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mb-8">
                <ol className="list-decimal pl-6 text-text-secondary dark:text-gray-300 space-y-3">
                  <li>
                    <strong className="text-text-primary dark:text-white">
                      {t('accountDeletion.method1.step1')}
                    </strong>
                  </li>
                  <li>
                    {t('accountDeletion.method1.step2')}
                  </li>
                  <li>
                    {t('accountDeletion.method1.step3')}
                  </li>
                  <li>
                    {t('accountDeletion.method1.step4')}
                  </li>
                  <li>
                    {t('accountDeletion.method1.step5')}
                  </li>
                </ol>
                <div className="mt-4 p-4 bg-white dark:bg-zinc-800 rounded-md border border-purple-200 dark:border-purple-700">
                  <p className="text-sm text-text-secondary dark:text-gray-400">
                    ⏱️ {t('accountDeletion.method1.note')}
                  </p>
                </div>
              </div>

              {/* Method 2: Email Request */}
              <h2 className="text-2xl font-semibold text-text-primary dark:text-white mt-12 mb-4">
                {t('accountDeletion.method2.title')}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                {t('accountDeletion.method2.intro')}
              </p>
              <div className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6 mb-8">
                <div className="space-y-3 text-text-secondary dark:text-gray-300">
                  <div>
                    <span className="font-semibold text-text-primary dark:text-white">Email:</span>{' '}
                    <a href="mailto:info@bookbed.io" className="text-purple-600 dark:text-purple-400 hover:underline">
                      info@bookbed.io
                    </a>
                  </div>
                  <div>
                    <span className="font-semibold text-text-primary dark:text-white">
                      {t('accountDeletion.method2.subjectLabel')}
                    </span>{' '}
                    {t('accountDeletion.method2.subjectValue')}
                  </div>
                  <div>
                    <span className="font-semibold text-text-primary dark:text-white">
                      {t('accountDeletion.method2.includeLabel')}
                    </span>{' '}
                    {t('accountDeletion.method2.includeValue')}
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    ⏰ {t('accountDeletion.method2.note')}
                  </p>
                </div>
              </div>

              {/* What Gets Deleted */}
              <h2 className="text-2xl font-semibold text-text-primary dark:text-white mt-12 mb-4">
                {t('accountDeletion.whatGetsDeleted.title')}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                {t('accountDeletion.whatGetsDeleted.intro')}
              </p>
              <ul className="list-none pl-0 text-text-secondary dark:text-gray-400 mb-6 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-3 text-xl">✓</span>
                  <span>{t('accountDeletion.whatGetsDeleted.item1')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-3 text-xl">✓</span>
                  <span>{t('accountDeletion.whatGetsDeleted.item2')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-3 text-xl">✓</span>
                  <span>{t('accountDeletion.whatGetsDeleted.item3')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-3 text-xl">✓</span>
                  <span>{t('accountDeletion.whatGetsDeleted.item4')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-3 text-xl">✓</span>
                  <span>{t('accountDeletion.whatGetsDeleted.item5')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-3 text-xl">✓</span>
                  <span>{t('accountDeletion.whatGetsDeleted.item6')}</span>
                </li>
              </ul>

              {/* Data Retention */}
              <h2 className="text-2xl font-semibold text-text-primary dark:text-white mt-12 mb-4">
                {t('accountDeletion.dataRetention.title')}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                {t('accountDeletion.dataRetention.intro')}
              </p>
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 mb-8">
                <ul className="list-none pl-0 text-text-secondary dark:text-gray-300 space-y-3">
                  <li className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 mr-3 font-bold">📋</span>
                    <div>
                      <strong className="text-text-primary dark:text-white">
                        {t('accountDeletion.dataRetention.taxRecordsTitle')}
                      </strong>{' '}
                      {t('accountDeletion.dataRetention.taxRecordsContent')}
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 mr-3 font-bold">🔒</span>
                    <div>
                      <strong className="text-text-primary dark:text-white">
                        {t('accountDeletion.dataRetention.fraudLogsTitle')}
                      </strong>{' '}
                      {t('accountDeletion.dataRetention.fraudLogsContent')}
                    </div>
                  </li>
                </ul>
              </div>

              {/* Questions Section */}
              <h2 className="text-2xl font-semibold text-text-primary dark:text-white mt-12 mb-4">
                {t('accountDeletion.questions.title')}
              </h2>
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                <p className="text-text-secondary dark:text-gray-300 mb-3">
                  {t('accountDeletion.questions.intro')}
                </p>
                <div className="space-y-2">
                  <div>
                    <strong className="text-text-primary dark:text-white">
                      {t('accountDeletion.questions.contactLabel')}
                    </strong>{' '}
                    <a href="mailto:info@bookbed.io" className="text-purple-600 dark:text-purple-400 hover:underline">
                      info@bookbed.io
                    </a>
                  </div>
                  <div>
                    <strong className="text-text-primary dark:text-white">
                      {t('accountDeletion.questions.privacyPolicyLabel')}
                    </strong>{' '}
                    <a href="/privacy" className="text-purple-600 dark:text-purple-400 hover:underline">
                      bookbed.io/privacy
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </FadeContent>
        </div>
      </section>
    </div>
  )
}

export default AccountDeletionPage
