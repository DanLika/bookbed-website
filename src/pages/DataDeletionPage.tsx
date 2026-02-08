import { useTranslation } from 'react-i18next'
import { spacing, heroSpacing } from '../utils/spacing'
import { typography } from '../utils/typography'
import FadeContent from '../components/ui/animations/FadeContent'
import { usePageMeta } from '../hooks/usePageMeta'

const DataDeletionPage = () => {
  const { t } = useTranslation()

  usePageMeta({
    title: t('dataDeletion.meta.title'),
    description: t('dataDeletion.meta.description')
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
              {t('dataDeletion.title')}
            </h1>
          </FadeContent>

          <FadeContent duration={600} delay={100} direction="up" distance={20}>
            <div className="prose prose-lg dark:prose-invert max-w-none">

              <p className="text-lg text-text-secondary dark:text-gray-400 mb-8">
                {t('dataDeletion.intro')}
              </p>

              {/* In the BookBed App */}
              <h2 className="text-2xl font-semibold text-text-primary dark:text-white mt-8 mb-4">
                {t('dataDeletion.inAppTitle')}
              </h2>

              {/* Delete Properties */}
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-medium text-text-primary dark:text-white mb-3">
                  🏠 {t('dataDeletion.deleteProperties.title')}
                </h3>
                <ol className="list-decimal pl-6 text-text-secondary dark:text-gray-300 space-y-2">
                  <li>{t('dataDeletion.deleteProperties.step1')}</li>
                  <li>{t('dataDeletion.deleteProperties.step2')}</li>
                  <li>{t('dataDeletion.deleteProperties.step3')}</li>
                </ol>
              </div>

              {/* Delete Units */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-medium text-text-primary dark:text-white mb-3">
                  🏘️ {t('dataDeletion.deleteUnits.title')}
                </h3>
                <ol className="list-decimal pl-6 text-text-secondary dark:text-gray-300 space-y-2">
                  <li>{t('dataDeletion.deleteUnits.step1')}</li>
                  <li>{t('dataDeletion.deleteUnits.step2')}</li>
                  <li>{t('dataDeletion.deleteUnits.step3')}</li>
                </ol>
              </div>

              {/* Delete Bookings */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-medium text-text-primary dark:text-white mb-3">
                  📅 {t('dataDeletion.deleteBookings.title')}
                </h3>
                <ol className="list-decimal pl-6 text-text-secondary dark:text-gray-300 space-y-2">
                  <li>{t('dataDeletion.deleteBookings.step1')}</li>
                  <li>{t('dataDeletion.deleteBookings.step2')}</li>
                  <li>{t('dataDeletion.deleteBookings.step3')}</li>
                </ol>
              </div>

              {/* Delete Profile Data */}
              <h2 className="text-2xl font-semibold text-text-primary dark:text-white mt-12 mb-4">
                {t('dataDeletion.deleteProfileData.title')}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                {t('dataDeletion.deleteProfileData.intro')}
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
                      {t('dataDeletion.deleteProfileData.subjectLabel')}
                    </span>{' '}
                    {t('dataDeletion.deleteProfileData.subjectValue')}
                  </div>
                  <div>
                    <span className="font-semibold text-text-primary dark:text-white">
                      {t('dataDeletion.deleteProfileData.specifyLabel')}
                    </span>{' '}
                    {t('dataDeletion.deleteProfileData.specifyValue')}
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    ⏰ {t('dataDeletion.deleteProfileData.note')}
                  </p>
                </div>
              </div>

              {/* Important Note */}
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-3 flex items-center">
                  <span className="mr-2">⚠️</span>
                  {t('dataDeletion.importantNote.title')}
                </h3>
                <p className="text-text-secondary dark:text-gray-300">
                  {t('dataDeletion.importantNote.content')}
                </p>
              </div>

              {/* Full Account Deletion */}
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-3">
                  {t('dataDeletion.fullAccountDeletion.title')}
                </h3>
                <p className="text-text-secondary dark:text-gray-300 mb-3">
                  {t('dataDeletion.fullAccountDeletion.intro')}
                </p>
                <a
                  href="/account-deletion"
                  className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                >
                  {t('dataDeletion.fullAccountDeletion.button')}
                </a>
              </div>

            </div>
          </FadeContent>
        </div>
      </section>
    </div>
  )
}

export default DataDeletionPage
