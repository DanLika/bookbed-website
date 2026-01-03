import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { getSectionSpacing, getContainerClasses } from '../utils/spacing'
import { typography } from '../utils/typography'
import FadeContent from './ui/animations/FadeContent'
import GradientText from './ui/animations/GradientText'

export default function ScreenshotGallery() {
  const { t } = useTranslation()
  const [isDark, setIsDark] = useState(false)

  // Check if dark mode is enabled
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }

    checkDarkMode()

    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  // Gallery data with both light and dark variants
  const galleryData = [
    {
      light: '/images/gallery/dashboard-light.avif',
      dark: '/images/gallery/dashboard-dark.avif',
      text: t('gallery.dashboard.title', 'Dashboard'),
    },
    {
      light: '/images/gallery/bookings-light.avif',
      dark: '/images/gallery/bookings-dark.avif',
      text: t('gallery.bookings.title', 'Bookings'),
    },
    {
      light: '/images/gallery/calendar-light.avif',
      dark: '/images/gallery/calendar-dark.avif',
      text: t('gallery.calendar.title', 'Calendar'),
    },
    {
      light: '/images/gallery/ical-light.avif',
      dark: '/images/gallery/ical-dark.avif',
      text: t('gallery.ical.title', 'iCal Sync'),
    },
    {
      light: '/images/gallery/unit-hub-basic-light.avif',
      dark: '/images/gallery/unit-hub-basic-dark.avif',
      text: t('gallery.unitHubBasic.title', 'Unit Hub'),
    },
    {
      light: '/images/gallery/unit-hub-widget-light.avif',
      dark: '/images/gallery/unit-hub-widget-dark.avif',
      text: t('gallery.unitHubWidget.title', 'Widget Settings'),
    },
  ]

  // Select the correct images based on theme
  const galleryItems = galleryData.map(item => ({
    image: isDark ? item.dark : item.light,
    text: item.text,
  }))

  return (
    <section className={`relative ${getSectionSpacing()} bg-white dark:bg-zinc-900`}>
      {/* Section Header with container */}
      <div className={`relative ${getContainerClasses()}`}>
        <div className="text-center mb-12 sm:mb-16 px-4 sm:px-6 md:px-8 lg:px-12">
          <FadeContent
            blur
            duration={600}
            direction="up"
            distance={20}
          >
            <h2 className={`${typography.h2} font-bold text-text-primary dark:text-white mb-4`}>
              <GradientText
                colors={['#6B4CE6', '#9B86F3', '#6B4CE6', '#9B86F3', '#6B4CE6']}
                animationSpeed={6}
                className={typography.h2}
              >
                {t('gallery.title', 'See It In Action')}
              </GradientText>
            </h2>
          </FadeContent>
          <p className="text-lg sm:text-xl text-text-secondary dark:text-gray-400 max-w-2xl mx-auto">
            {t('gallery.subtitle', 'Beautiful, intuitive interface designed for property owners')}
          </p>
        </div>
      </div>

      {/* Static Image Grid */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={item.image}
                alt={item.text}
                width={400}
                height={800}
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
