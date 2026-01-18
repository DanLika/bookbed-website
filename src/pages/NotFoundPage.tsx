import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import FuzzyText from '../components/ui/animations/FuzzyText'
import FadeContent from '../components/ui/animations/FadeContent'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-4 sm:px-6 md:px-8 bg-white dark:bg-zinc-900">
      <div className="text-center">
        {/* Fuzzy 404 - 200x200 container */}
        <div className="flex justify-center mb-8">
          <div className="w-[200px] h-[200px] flex items-center justify-center">
            <FuzzyText
              fontSize="clamp(4rem, 12vw, 6rem)"
              fontWeight={900}
              color="#6B4CE6"
              baseIntensity={0.15}
              hoverIntensity={0.6}
              enableHover
            >
              404
            </FuzzyText>
          </div>
        </div>

        {/* Title */}
        <FadeContent
          duration={600}
          delay={100}
          direction="up"
          distance={20}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary dark:text-white mb-4">
            {t('notFound.title', 'Page Not Found')}
          </h1>
        </FadeContent>

        {/* Description */}
        <FadeContent
          duration={600}
          delay={200}
          direction="up"
          distance={20}
        >
          <p className="text-lg text-text-secondary dark:text-gray-400 mb-8 max-w-md mx-auto">
            {t('notFound.description', "The page you're looking for doesn't exist or has been moved.")}
          </p>
        </FadeContent>

        {/* Back to Home Button */}
        <FadeContent
          duration={600}
          delay={300}
          direction="up"
          distance={20}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-all transform md:hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('notFound.backHome', 'Back to Home')}
          </Link>
        </FadeContent>
      </div>
    </section>
  )
}
