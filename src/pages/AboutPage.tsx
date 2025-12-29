import { useTranslation } from 'react-i18next'
import useSEO from '../hooks/useSEO'
import { spacing, heroSpacing, getSectionSpacing } from '../utils/spacing'
import { typography } from '../utils/typography'
import FadeContent from '../components/ui/animations/FadeContent'
import GradientText from '../components/ui/animations/GradientText'

export default function AboutPage() {
  const { t } = useTranslation()
  useSEO(
    t('seo.about.title'),
    t('seo.about.description')
  )

  const features = [
    {
      key: 'fast',
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      key: 'secure',
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      key: 'team',
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="relative min-h-screen bg-white dark:bg-zinc-900 overflow-hidden">
      {/* Subtle dot pattern background */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Hero Section */}
      <section className={`relative ${heroSpacing.paddingTop} pb-12 sm:pb-16 ${spacing.container.padding}`}>
        <div className="max-w-4xl mx-auto text-center">
          <FadeContent
            duration={500}
            direction="none"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary dark:text-primary-light text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t('about.badge', 'About Us')}
            </div>
          </FadeContent>

          <FadeContent
            blur
            duration={600}
            delay={100}
            direction="up"
            distance={20}
          >
            <h1 className={`${typography.h1} font-bold text-text-primary dark:text-white mb-6`}>
              <GradientText
                colors={['#6B4CE6', '#9B86F3', '#6B4CE6', '#9B86F3', '#6B4CE6']}
                animationSpeed={6}
                className={typography.h1}
              >
                {t('about.title')}
              </GradientText>
            </h1>
          </FadeContent>

          <FadeContent
            duration={600}
            delay={200}
            direction="up"
            distance={20}
          >
            <p className={`${typography.subtitle} text-text-secondary dark:text-gray-400 max-w-3xl mx-auto leading-relaxed`}>
              {t('about.description')}
            </p>
          </FadeContent>
        </div>
      </section>

      {/* Mission Section */}
      <section className={`relative ${getSectionSpacing()} ${spacing.container.padding} bg-gray-50 dark:bg-zinc-800/30`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
            {/* Text */}
            <FadeContent
              duration={600}
              delay={100}
              direction="left"
              distance={40}
            >
              <h2 className={`${typography.h2} font-bold text-text-primary dark:text-white mb-4 sm:mb-6`}>
                {t('about.mission.title')}
              </h2>
              <p className="text-base sm:text-lg text-text-secondary dark:text-gray-400 leading-relaxed mb-4">
                {t('about.mission.description1')}
              </p>
              <p className="text-base sm:text-lg text-text-secondary dark:text-gray-400 leading-relaxed">
                {t('about.mission.description2')}
              </p>
            </FadeContent>

            {/* Features Card */}
            <FadeContent
              duration={600}
              delay={200}
              direction="right"
              distance={40}
            >
              <div className="bg-white dark:bg-zinc-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200 dark:border-zinc-700">
                <div className="space-y-5 sm:space-y-6">
                  {features.map((feature, index) => (
                    <FadeContent
                      key={feature.key}
                      duration={400}
                      delay={300 + index * 100}
                      direction="up"
                      distance={20}
                    >
                      <div className="flex items-start gap-4 group">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary dark:bg-primary-light flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-primary/20">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-semibold text-text-primary dark:text-white mb-1.5 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300">
                            {t(`about.features.${feature.key}.title`)}
                          </h3>
                          <p className="text-sm sm:text-base text-text-secondary dark:text-gray-400 leading-relaxed">
                            {t(`about.features.${feature.key}.desc`)}
                          </p>
                        </div>
                      </div>
                    </FadeContent>
                  ))}
                </div>
              </div>
            </FadeContent>
          </div>
        </div>
      </section>
    </div>
  )
}
