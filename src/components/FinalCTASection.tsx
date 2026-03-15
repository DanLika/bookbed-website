import { useTranslation } from 'react-i18next'
import { getSectionSpacing, getContainerClasses } from '../utils/spacing'
import { typography } from '../utils/typography'
import FadeContent from './ui/animations/FadeContent'
import BlurText from './ui/animations/BlurText'

export default function FinalCTASection() {
  const { t } = useTranslation()

  return (
    <section className={`relative max-w-[1920px] mx-auto ${getSectionSpacing()} px-4 sm:px-6 md:px-8 lg:px-12 bg-gradient-to-br from-primary via-primary-hover to-primary-light dark:from-primary-dark dark:via-primary dark:to-primary-light`}>
      {/* Background decoration - bubbles hidden on mobile, shown on desktop only */}
      <div className="absolute inset-0 opacity-30 hidden lg:block">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full animate-float" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className={`relative ${getContainerClasses()}`}>
        <div className="flex flex-col items-center text-center">
          <BlurText
            text={t('cta.title', 'Preuzmite BookBed Danas')}
            as="h2"
            delay={100}
            animateBy="words"
            direction="top"
            className={`${typography.h2} font-bold text-white mb-6`}
          />

          <FadeContent
            duration={600}
            delay={100}
            direction="up"
            distance={30}
          >
            <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              {t('cta.subtitle', 'Započnite upravljati rezervacijama besplatno. Dostupno na iOS i Android.')}
            </p>
          </FadeContent>

          <FadeContent
            duration={600}
            delay={200}
            direction="up"
            distance={30}
          >
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="https://apps.apple.com/ba/app/bookbed/id6758141353"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-white text-gray-900 rounded-xl text-base font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <span className="flex flex-col leading-tight text-left">
                  <span className="text-[10px] opacity-70">{t('hero.downloadIosPrefix', 'Preuzmi na')}</span>
                  <span className="text-sm font-bold -mt-0.5">App Store</span>
                </span>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=io.bookbed.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-white text-gray-900 rounded-xl text-base font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.49c-.36-.17-.58-.54-.58-.94V1.45c0-.4.22-.77.58-.94l10.93 11.49L3.18 23.49zM16.81 15.3L5.27 21.81l9.62-10.12L16.81 15.3zM20.16 10.69c.38.22.63.64.63 1.09 0 .45-.25.87-.63 1.09l-2.56 1.51-2.19-2.38 2.19-2.38 2.56 1.07zM5.27 2.19l11.54 6.51-1.92 2.61L5.27 2.19z" />
                </svg>
                <span className="flex flex-col leading-tight text-left">
                  <span className="text-[10px] opacity-70">{t('hero.downloadAndroidPrefix', 'Preuzmi na')}</span>
                  <span className="text-sm font-bold -mt-0.5">Google Play</span>
                </span>
              </a>
            </div>
          </FadeContent>
        </div>
      </div>
    </section>
  )
}
