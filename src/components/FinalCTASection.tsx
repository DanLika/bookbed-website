import { useTranslation } from 'react-i18next'
import { getSectionSpacing, getContainerClasses } from '../utils/spacing'
import { typography } from '../utils/typography'
import FadeContent from './ui/animations/FadeContent'
import BlurText from './ui/animations/BlurText'
import ShinyText from './ui/animations/ShinyText'

export default function FinalCTASection() {
  const { t } = useTranslation()

  return (
    <section className={`relative ${getSectionSpacing()} px-4 sm:px-6 md:px-8 lg:px-12 bg-gradient-to-br from-primary via-primary-hover to-primary-light dark:from-primary-dark dark:via-primary dark:to-primary-light`}>
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
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <BlurText
              text={t('cta.title')}
              as="h2"
              delay={100}
              animateBy="words"
              direction="top"
              justify="responsive"
              className={`${typography.h2} font-bold text-white mb-6`}
            />

            <FadeContent
              duration={600}
              delay={100}
              direction="up"
              distance={30}
            >
              <p className="text-xl sm:text-2xl text-white/90 mb-10 max-w-xl mx-auto lg:mx-0">
                {t('cta.subtitle')}
              </p>
            </FadeContent>

            <FadeContent
              duration={600}
              delay={200}
              direction="up"
              distance={30}
            >
              <a
                href="https://app.bookbed.io"
                target="_blank"
                rel="noopener noreferrer"
                title="Otvori BookBed aplikaciju"
                className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary font-semibold rounded-lg text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <ShinyText text={t('cta.button')} speed={4} />
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </FadeContent>
          </div>

          {/* Mockup Image */}
          <FadeContent
            duration={600}
            delay={300}
            direction="right"
            distance={50}
            className="flex-1 w-full max-w-xl lg:max-w-none"
          >
            <div className="relative">
              {/* Glow behind mockup */}
              <div className="absolute inset-0 bg-white/20 blur-3xl rounded-3xl scale-95" />

              {/* Mockup frame */}
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                <div className="rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src="/images/bookbed/dashboard.avif"
                    alt="BookBed Dashboard"
                    title="BookBed Dashboard"
                    width={800}
                    height={502}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </FadeContent>
        </div>
      </div>
    </section>
  )
}
