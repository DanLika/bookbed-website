import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { getSectionSpacing, getContainerClasses } from '../utils/spacing'
import { typography } from '../utils/typography'
import FadeContent from './ui/animations/FadeContent'
import GradientText from './ui/animations/GradientText'
import CircularGallery from './ui/CircularGallery'
import ScrollReveal from './ui/animations/ScrollReveal'
import ScrollFloat from './ui/animations/ScrollFloat'

export default function ScreenshotGallery() {
  const { t } = useTranslation()
  const [isDark, setIsDark] = useState(false)
  const [scrollSpeed, setScrollSpeed] = useState(1.5)

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

  // Adaptive scrollSpeed based on screen size and touch capability
  useEffect(() => {
    const calculateScrollSpeed = () => {
      const width = window.innerWidth
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

      // Mobile (≤768px) or touch device → fast scroll
      if (width <= 768 || isTouchDevice) {
        setScrollSpeed(1.5)
      }
      // Tablet (769-1024px) → medium scroll
      else if (width > 768 && width <= 1024) {
        setScrollSpeed(1.0)
      }
      // Desktop (>1024px) without touch → slow scroll
      else {
        setScrollSpeed(0.5)
      }
    }

    calculateScrollSpeed()

    // Update on window resize (handles rotation and window resizing)
    window.addEventListener('resize', calculateScrollSpeed)
    return () => window.removeEventListener('resize', calculateScrollSpeed)
  }, [])

  // Gallery data with both light and dark variants
  const galleryData = [
    {
      light: '/images/gallery/dashboard-dark.avif',  // Dark mockup for light theme
      dark: '/images/gallery/dashboard-light.avif',   // Light mockup for dark theme
      text: t('gallery.dashboard.title', 'Dashboard'),
    },
    {
      light: '/images/gallery/bookings-dark.avif',
      dark: '/images/gallery/bookings-light.avif',
      text: t('gallery.bookings.title', 'Bookings'),
    },
    {
      light: '/images/gallery/calendar-dark.avif',
      dark: '/images/gallery/calendar-light.avif',
      text: t('gallery.calendar.title', 'Calendar'),
    },
    {
      light: '/images/gallery/ical-dark.avif',
      dark: '/images/gallery/ical-light.avif',
      text: t('gallery.ical.title', 'iCal Sync'),
    },
    {
      light: '/images/gallery/unit-hub-basic-dark.avif',
      dark: '/images/gallery/unit-hub-basic-light.avif',
      text: t('gallery.unitHubBasic.title', 'Unit Hub'),
    },
    {
      light: '/images/gallery/unit-hub-widget-dark.avif',
      dark: '/images/gallery/unit-hub-widget-light.avif',
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
            <ScrollReveal
              blur
              blurAmount={10}
              stagger={0.06}
              duration={0.8}
              rotateX={45}
              ease="back.out(1.4)"
              threshold={0.3}
              className="block"
            >
              {t('gallery.subtitle', 'Beautiful, intuitive interface designed for property owners')}
            </ScrollReveal>
          </p>
        </div>
      </div>

      {/* CircularGallery - Full width without container */}
      <ScrollFloat
        direction="up"
        distance={80}
        scale
        scaleStart={0.95}
        blur
        blurAmount={8}
        duration={1}
        ease="power3.out"
        threshold={0.2}
      >
        <div className="relative w-full h-[500px] sm:h-[550px] md:h-[600px]">
          <CircularGallery
            items={galleryItems}
            bend={1}
            textColor="#6B4CE6"
            borderRadius={0.08}
            font="bold 24px Figtree, sans-serif"
            scrollSpeed={scrollSpeed}
            scrollEase={0.15}
            backgroundColor={isDark ? '#18181B' : '#FFFFFF'}
          />

          {/* Mobile Swipe Hint - Only visible on touch devices */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none md:hidden">
            <FadeContent
              duration={800}
              delay={1000}
              direction="up"
              distance={10}
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-black/60 dark:bg-white/10 backdrop-blur-sm rounded-full text-white text-xs font-medium shadow-lg">
                <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                <span>Swipe to explore</span>
                <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </FadeContent>
          </div>
        </div>
      </ScrollFloat>
    </section>
  )
}
