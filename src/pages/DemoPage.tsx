import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { spacing, heroSpacing, getSectionSpacing, getContainerClasses } from '../utils/spacing'
import { typography } from '../utils/typography'
import FadeContent from '../components/ui/animations/FadeContent'
import GradientText from '../components/ui/animations/GradientText'
import GlassIcon from '../components/ui/GlassIcon'
import { usePageMeta } from '../hooks/usePageMeta'

const DemoPage = () => {
  const { t } = useTranslation()

  // Page-specific SEO meta tags
  usePageMeta({
    title: t('demo.meta.title'),
    description: t('demo.meta.description')
  })

  const videos = [
    {
      id: 'video1',
      youtubeId: 'dQw4w9WgXcQ', // Placeholder - replace with actual video
    },
    {
      id: 'video2',
      youtubeId: 'dQw4w9WgXcQ',
    },
    {
      id: 'video3',
      youtubeId: 'dQw4w9WgXcQ',
    },
    {
      id: 'video4',
      youtubeId: 'dQw4w9WgXcQ',
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

      {/* Hero */}
      <section className={`relative ${heroSpacing.paddingTop} pb-12 sm:pb-16 ${spacing.container.padding}`}>
        <div className="max-w-4xl mx-auto text-center">
          <FadeContent
            duration={500}
            direction="none"
          >
            <div className="group inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/70 dark:bg-zinc-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-zinc-700/50 text-sm font-medium mb-6 shadow-sm">
              <GlassIcon size="sm" color="primary">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </GlassIcon>
              <span className="text-text-primary dark:text-white pr-1">{t('demo.badge', 'Video Tutorials')}</span>
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
                {t('demo.title')}
              </GradientText>
            </h1>
          </FadeContent>

          <FadeContent
            duration={600}
            delay={200}
            direction="up"
            distance={20}
          >
            <p className={`${typography.subtitle} text-text-secondary dark:text-gray-400 max-w-2xl mx-auto`}>
              {t('demo.subtitle')}
            </p>
          </FadeContent>
        </div>
      </section>

      {/* Videos - Zig-zag layout */}
      <section className={`relative ${getSectionSpacing()} ${spacing.container.padding}`}>
        <div className={`relative ${getContainerClasses()}`}>
          <div className="space-y-16 sm:space-y-20 lg:space-y-24">
            {videos.map((video, index) => (
              <FadeContent
                key={video.id}
                duration={600}
                delay={index * 100}
                direction={index % 2 === 0 ? 'left' : 'right'}
                distance={40}
              >
                <div
                  className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    } items-center gap-8 lg:gap-12`}
                >
                  {/* Text */}
                  <div className={`flex-1 text-center ${index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'}`}>
                    <h2 className={`${typography.h3} font-bold text-text-primary dark:text-white mb-4`}>
                      {t(`demo.${video.id}.title`)}
                    </h2>
                    <p className="text-lg text-text-secondary dark:text-gray-400 leading-relaxed">
                      {t(`demo.${video.id}.desc`)}
                    </p>
                  </div>

                  {/* Video Placeholder */}
                  <div className="flex-1 w-full">
                    <div className="group relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 dark:from-zinc-800 dark:to-zinc-900 shadow-xl border border-gray-200 dark:border-zinc-700 hover:shadow-2xl transition-shadow duration-300">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mx-auto mb-4 cursor-pointer group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors"
                          >
                            <svg
                              className="w-8 h-8 sm:w-10 sm:h-10 text-primary ml-1"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </motion.div>
                          <p className="text-sm text-text-secondary dark:text-gray-500 font-medium">
                            {t('demo.comingSoon', 'Video coming soon')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeContent>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default DemoPage
