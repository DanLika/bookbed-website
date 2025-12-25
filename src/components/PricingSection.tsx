import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { getSectionSpacing, getContainerClasses } from '../utils/spacing'
import { typography } from '../utils/typography'
import FadeContent from './ui/animations/FadeContent'
import BlurText from './ui/animations/BlurText'
import ShinyText from './ui/animations/ShinyText'
import SpotlightCard from './ui/animations/SpotlightCard'
import ScrollFloat from './ui/animations/ScrollFloat'

const CheckIcon = () => (
  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

export default function PricingSection() {
  const { t } = useTranslation()

  const features = [
    t('pricing.features.unlimited'),
    t('pricing.features.stripe'),
    t('pricing.features.ical'),
    t('pricing.features.emails'),
    t('pricing.features.widget'),
    t('pricing.features.support'),
  ]

  return (
    <section className={`relative ${getSectionSpacing()} px-4 sm:px-6 md:px-8 lg:px-12 bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-950`}>
      <div className={`relative ${getContainerClasses()}`}>
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <FadeContent
            duration={500}
            direction="none"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary dark:text-primary-light text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t('pricing.badge')}
            </div>
          </FadeContent>

          <div className="mb-4">
            <BlurText
              text={t('pricing.title')}
              as="h2"
              delay={60}
              animateBy="words"
              direction="top"
              className={`${typography.h2} font-bold text-text-primary dark:text-white`}
            />
          </div>
          <FadeContent
            duration={600}
            delay={200}
            direction="up"
            distance={20}
          >
            <p className="text-lg sm:text-xl text-text-secondary dark:text-gray-400 max-w-2xl mx-auto">
              {t('pricing.subtitle')}
            </p>
          </FadeContent>
        </div>

        {/* Single Pricing Card - Centered with scroll float effect */}
        <ScrollFloat
          direction="up"
          distance={100}
          scale
          scaleStart={0.85}
          rotate
          rotateAmount={-8}
          blur
          blurAmount={12}
          duration={1.2}
          ease="elastic.out(1, 0.5)"
          threshold={0.15}
          className="max-w-md mx-auto"
        >
            {/* Card with popular style + Spotlight effect */}
            <SpotlightCard
              className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-primary via-primary-hover to-primary-dark border-2 border-primary shadow-purple"
              spotlightColor="rgba(255, 255, 255, 0.35)"
            >
              <div className="relative">
                {/* Plan name */}
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  {t('pricing.custom.title')}
                </h3>
                <p className="text-white/80 mb-8 text-lg">
                  {t('pricing.custom.desc')}
                </p>

                {/* Features list */}
                <ul className="space-y-4 mb-10">
                  {features.map((feature, i) => (
                    <FadeContent
                      key={i}
                      duration={300}
                      delay={400 + i * 50}
                      direction="left"
                      distance={20}
                    >
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                          <CheckIcon />
                        </div>
                        <span className="text-white/90">
                          {feature}
                        </span>
                      </li>
                    </FadeContent>
                  ))}
                </ul>

                {/* CTA Button */}
                <FadeContent
                  duration={400}
                  delay={700}
                  direction="up"
                  distance={20}
                >
                  <Link
                    to="/contact"
                    className="group block w-full py-4 px-6 text-center font-semibold rounded-xl bg-white text-primary shadow-lg transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/20"
                  >
                    <span className="inline-flex items-center gap-2">
                      <ShinyText text={t('pricing.cta')} speed={4} />
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Link>
                </FadeContent>
              </div>
            </SpotlightCard>
        </ScrollFloat>
      </div>
    </section>
  )
}
