import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const DemoPage = () => {
  const { t } = useTranslation()

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-black dark:to-zinc-900">
      {/* Hero */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-text-primary dark:text-white mb-6"
          >
            {t('demo.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-text-secondary dark:text-gray-400"
          >
            {t('demo.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Videos - Zig-zag layout */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-24">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-8 lg:gap-16`}
            >
              {/* Text */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary dark:text-white mb-4">
                  {t(`demo.${video.id}.title`)}
                </h2>
                <p className="text-lg text-text-secondary dark:text-gray-400">
                  {t(`demo.${video.id}.desc`)}
                </p>
              </div>

              {/* Video Placeholder */}
              <div className="flex-1 w-full">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-zinc-800 shadow-strong">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-8 h-8 text-primary"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="text-text-secondary dark:text-gray-500">
                        Video coming soon
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default DemoPage
