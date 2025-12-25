import { useTranslation } from 'react-i18next'
import { getSectionSpacing, getContainerClasses } from '../utils/spacing'
import { typography } from '../utils/typography'
import FadeContent from './ui/animations/FadeContent'
import BlurText from './ui/animations/BlurText'
import MagicBento from './ui/MagicBento'

export default function FeaturesSection() {
  const { t } = useTranslation()

  return (
    <section
      id="features"
      className={`relative ${getSectionSpacing()} bg-gradient-to-b from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900 overflow-hidden`}
    >

      <div className={getContainerClasses()}>
        {/* Section Header */}
        <FadeContent>
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light">
              {t('features.title')}
            </span>
            <h2
              className={`${typography.h2} font-bold text-text-primary dark:text-white mb-4`}
            >
              <BlurText text={t('features.title')} delay={0.05} />
            </h2>
            <p className={`${typography.body} text-text-secondary dark:text-gray-400 max-w-2xl mx-auto`}>
              {t('features.subtitle')}
            </p>
          </div>
        </FadeContent>

        {/* MagicBento Grid - Original ReactBits Implementation */}
        <MagicBento
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={400}
          particleCount={12}
          glowColor="107, 76, 230"
        />
      </div>
    </section>
  )
}
