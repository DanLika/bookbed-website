import { useTranslation } from 'react-i18next'
import { spacing, heroSpacing } from '../utils/spacing'
import { typography } from '../utils/typography'
import FadeContent from '../components/ui/animations/FadeContent'
import { usePageMeta } from '../hooks/usePageMeta'

const PrivacyPage = () => {
  const { t, i18n } = useTranslation()

  usePageMeta({
    title: i18n.language === 'hr'
      ? 'Politika Privatnosti - BookBed'
      : 'Privacy Policy - BookBed',
    description: i18n.language === 'hr'
      ? 'Saznajte kako BookBed prikuplja, koristi i štiti vaše osobne podatke. Naša politika privatnosti objašnjava vaša prava i naše obveze.'
      : 'Learn how BookBed collects, uses, and protects your personal data. Our privacy policy explains your rights and our obligations.'
  })

  const renderList = (key: string) => {
    const items = t(key, { returnObjects: true }) as string[]
    if (Array.isArray(items)) {
      return (
        <ul className="list-disc pl-6 text-text-secondary dark:text-gray-400 mb-4 space-y-2">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )
    }
    return null
  }

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
              {t('privacy.title')}
            </h1>
          </FadeContent>

          <FadeContent duration={600} delay={100} direction="up" distance={20}>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-text-secondary dark:text-gray-400 mb-6">
                {t('privacy.lastUpdated')}: 14. {i18n.language === 'hr' ? 'siječnja' : 'January'} 2026.
              </p>

              <div className="text-text-secondary dark:text-gray-400 mb-8 whitespace-pre-wrap">
                {t('privacy.intro')}
              </div>

              {/* Section 1 */}
              <h2 className="text-xl font-semibold text-text-primary dark:text-white mt-8 mb-4">
                {t('privacy.section1.title')}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-6">
                {t('privacy.section1.content')}
              </p>

              <div className="pl-4 space-y-8 mb-8">
                {/* 1.A */}
                <div>
                  <h3 className="text-lg font-medium text-text-primary dark:text-white mb-2">
                    {t('privacy.section1.items.A.title')}
                  </h3>
                  <p className="text-text-secondary dark:text-gray-400 mb-2">
                    {t('privacy.section1.items.A.content')}
                  </p>
                  {renderList('privacy.section1.items.A.list')}
                </div>

                {/* 1.B */}
                <div>
                  <h3 className="text-lg font-medium text-text-primary dark:text-white mb-2">
                    {t('privacy.section1.items.B.title')}
                  </h3>
                  <p className="text-text-secondary dark:text-gray-400 mb-2">
                    {t('privacy.section1.items.B.content')}
                  </p>
                  {renderList('privacy.section1.items.B.list')}
                </div>

                {/* 1.C */}
                <div>
                  <h3 className="text-lg font-medium text-text-primary dark:text-white mb-2">
                    {t('privacy.section1.items.C.title')}
                  </h3>
                  <p className="text-text-secondary dark:text-gray-400 mb-2">
                    {t('privacy.section1.items.C.content')}
                  </p>
                </div>

                {/* 1.D */}
                <div>
                  <h3 className="text-lg font-medium text-text-primary dark:text-white mb-2">
                    {t('privacy.section1.items.D.title')}
                  </h3>
                  <p className="text-text-secondary dark:text-gray-400 mb-2">
                    {t('privacy.section1.items.D.content')}
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <h2 className="text-xl font-semibold text-text-primary dark:text-white mt-8 mb-4">
                {t('privacy.section2.title')}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                {t('privacy.section2.content')}
              </p>
              {renderList('privacy.section2.list')}

              {/* Section 3 */}
              <h2 className="text-xl font-semibold text-text-primary dark:text-white mt-8 mb-4">
                {t('privacy.section3.title')}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                {t('privacy.section3.content')}
              </p>

              {/* Section 4 */}
              <h2 className="text-xl font-semibold text-text-primary dark:text-white mt-8 mb-4">
                {t('privacy.section4.title')}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                {t('privacy.section4.content')}
              </p>
              <p className="text-text-secondary dark:text-gray-400 mb-2">
                {t('privacy.section4.subcontent')}
              </p>
              {renderList('privacy.section4.list')}
              <div className="mt-4 mb-6">
                <a
                  href="/account-deletion"
                  className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:underline font-medium"
                >
                  {i18n.language === 'hr' ? 'Posjetite stranicu za brisanje računa →' : 'Visit Account Deletion Page →'}
                </a>
              </div>
              <p className="text-text-secondary dark:text-gray-400 mt-4">
                {t('privacy.section4.footer')}
              </p>

              {/* Section 5 */}
              <h2 className="text-xl font-semibold text-text-primary dark:text-white mt-8 mb-4">
                {t('privacy.section5.title')}
              </h2>
              <div className="text-text-secondary dark:text-gray-400 mb-4 whitespace-pre-wrap">
                {t('privacy.section5.content')}
              </div>
              {renderList('privacy.section5.list')}

              {/* Section 6 */}
              <h2 className="text-xl font-semibold text-text-primary dark:text-white mt-8 mb-4">
                {t('privacy.section6.title')}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                {t('privacy.section6.content')}
              </p>

              {/* Section 7 */}
              <h2 className="text-xl font-semibold text-text-primary dark:text-white mt-8 mb-4">
                {t('privacy.section7.title')}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                {t('privacy.section7.content')}
              </p>

              {/* Section 8 */}
              <h2 className="text-xl font-semibold text-text-primary dark:text-white mt-8 mb-4">
                {t('privacy.section8.title')}
              </h2>
              <div className="text-text-secondary dark:text-gray-400 mb-4 whitespace-pre-wrap">
                {t('privacy.section8.content')}
              </div>

              {/* Section 9 */}
              <h2 className="text-xl font-semibold text-text-primary dark:text-white mt-8 mb-4">
                {t('privacy.section9.title')}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                {t('privacy.section9.content')}
              </p>
              {renderList('privacy.section9.list')}
            </div>
          </FadeContent>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPage
