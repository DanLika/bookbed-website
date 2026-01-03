import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useState, useEffect, lazy, Suspense } from 'react'
import { containers } from '../utils/typography'
import { spacing } from '../utils/spacing'
import ShinyText from './ui/animations/ShinyText'
import StarBorder from './ui/animations/StarBorder'
import { useMediaQuery } from '../hooks/useMediaQuery'

// Lazy load GridScan - heavy WebGL component, only needed in dark mode
const GridScan = lazy(() => import('./ui/backgrounds/GridScan'))

export default function HeroSection() {
  const { t } = useTranslation()
  const [isDark, setIsDark] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkTheme()

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  const showGridScan = isDark && isDesktop && !prefersReducedMotion;

  return (
    <section className="relative w-full pb-4 sm:pb-6 md:pb-8 lg:pb-10 bg-gradient-to-br from-slate-100 to-white dark:from-zinc-950 dark:to-zinc-900 overflow-hidden">
      {/* Background - Light theme overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-50/80 via-white to-white dark:hidden" />

      {/* Background - Dark theme overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] to-zinc-900 hidden dark:block" />

      {/* GridScan Background - Dark theme only, lazy loaded with performance optimizations */}
      {showGridScan && (
        <Suspense fallback={null}>
          <div className="absolute inset-0 w-full h-full opacity-50">
            <GridScan
              linesColor="#6B4CE6"
              scanColor="#9B86F3"
              gridScale={0.1}
              lineThickness={0.8}
              lineJitter={0.08}
              scanOpacity={0.45}
              scanGlow={0.5}
              scanSoftness={2}
              scanDuration={2.5}
              scanDelay={2.0}
              scanDirection="pingpong"
              sensitivity={0.5}
              enablePost={true}
              bloomIntensity={0.3}
              chromaticAberration={0.001}
              noiseIntensity={0.008}
            />
          </div>
        </Suspense>
      )}

      {/* Hero Title (inside container) - closer to navbar on desktop */}
      <div className={`relative ${containers.hero} mx-auto ${spacing.container.padding} pt-24 sm:pt-28 md:pt-32 lg:pt-28 xl:pt-32`}>
        <div className="text-center mb-4 sm:mb-5 md:mb-6 lg:mb-6">
          {/* Hero Title - INSTANT render for LCP (no animation delay) */}
          <h1 className="text-[clamp(1.75rem,5vw,3.5rem)] font-bold text-text-primary dark:text-white leading-tight max-w-5xl mx-auto">
            {t('hero.title')}
          </h1>
        </div>
      </div>

      {/* Central Mockup - Larger on mobile with scale transform */}
      <div className="relative w-full flex justify-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        {/* Subtle glow effect behind mockup */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary-light/10 to-primary/10 blur-3xl scale-105 opacity-30" />

        {/* Dashboard Screenshot - Light/Dark versions with optimized responsive srcset */}
        <img
          src="/images/hero/hero-light-1280.avif"
          srcSet="/images/hero/hero-light-768.avif 768w, /images/hero/hero-light-1000.avif 1000w, /images/hero/hero-light-1280.avif 1280w, /images/hero/hero-light.avif 1778w"
          alt="BookBed Dashboard"
          title="BookBed Dashboard"
          width={1280}
          height={720}
          sizes="(max-width: 640px) 130vw, (max-width: 1024px) 115vw, 1280px"
          className="relative w-[130%] sm:w-[130%] md:w-[115%] lg:w-full max-w-7xl mx-auto h-auto block dark:hidden"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <img
          src="/images/hero/hero-dark-1280.avif"
          srcSet="/images/hero/hero-dark-768.avif 768w, /images/hero/hero-dark-1000.avif 1000w, /images/hero/hero-dark-1280.avif 1280w, /images/hero/hero-dark.avif 1778w"
          alt="BookBed Dashboard"
          title="BookBed Dashboard"
          width={1280}
          height={720}
          sizes="(max-width: 640px) 130vw, (max-width: 1024px) 115vw, 1280px"
          className="relative w-[130%] sm:w-[130%] md:w-[115%] lg:w-full max-w-7xl mx-auto h-auto hidden dark:block"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />

        {/* Floating Cards - NO ANIMATIONS, just static display */}
        {/* Left Card - New Booking (visible on mobile too, but smaller) */}
        <div className="absolute left-[2%] sm:left-[3%] lg:left-[5%] xl:left-[10%] top-[15%] sm:top-[20%] lg:top-1/4 z-10">
          {/* Mobile version - compact */}
          <div className="lg:hidden bg-white dark:bg-zinc-800 rounded-lg p-2 shadow-xl border border-gray-200 dark:border-zinc-700 w-28 sm:w-36 animate-float">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-text-primary dark:text-white text-[10px] sm:text-xs truncate">New Booking</p>
                <p className="text-[8px] sm:text-[10px] text-gray-600 dark:text-gray-400">Just now</p>
              </div>
            </div>
          </div>
          {/* Desktop version - full */}
          <div className="hidden lg:block bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-2xl border border-gray-200 dark:border-zinc-700 w-64 animate-float">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-text-primary dark:text-white text-sm">New Booking</p>
                <p className="text-xs text-text-secondary dark:text-gray-300">Just now</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary dark:text-gray-300">
              Marko P. booked Apartman A2 for Dec 20-25
            </p>
          </div>
        </div>

        {/* Top Right Card - Payment Received (desktop only) */}
        <div className="hidden lg:block absolute right-[5%] xl:right-[10%] top-1/4 z-10">
          <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-2xl border border-gray-200 dark:border-zinc-700 w-56 animate-float" style={{ animationDelay: '1s' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-text-primary dark:text-white text-sm">€320.00</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400">Payment received</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card - Check-in Today (mobile shows this instead of Payment) */}
        <div className="absolute right-[2%] sm:right-[3%] lg:right-[10%] xl:right-[15%] top-[60%] sm:top-[55%] lg:top-2/3 z-10">
          {/* Mobile version - compact Check-in card */}
          <div className="lg:hidden bg-white dark:bg-zinc-800 rounded-lg p-2 shadow-xl border border-gray-200 dark:border-zinc-700 w-26 sm:w-32 animate-float" style={{ animationDelay: '1s' }}>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-text-primary dark:text-white text-[10px] sm:text-xs truncate">Check-in</p>
                <p className="text-[8px] sm:text-[10px] text-gray-600 dark:text-gray-300">Today</p>
              </div>
            </div>
          </div>
          {/* Desktop version - full */}
          <div className="hidden lg:block bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-2xl border border-gray-200 dark:border-zinc-700 w-56 animate-float" style={{ animationDelay: '2s' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-text-primary dark:text-white text-sm">Check-in Today</p>
                <p className="text-xs text-text-secondary dark:text-gray-300">Ana M. - Apartman A1</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Left Card - Occupancy Rate */}
        <div className="hidden lg:block absolute left-[10%] xl:left-[15%] top-2/3 z-10">
          <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-2xl border border-gray-200 dark:border-zinc-700 w-52 animate-float" style={{ animationDelay: '1.5s' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-text-primary dark:text-white text-sm">85% Occupancy</p>
                <p className="text-xs text-text-secondary dark:text-gray-300">This month</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Watch Demo Button - Below mockup */}
      <div className={`flex justify-center mt-4 sm:mt-6 md:mt-8 lg:mt-6 ${spacing.container.padding} animate-fade-in-up`} style={{ animationDelay: '0.2s' }}>
        <StarBorder
          as="div"
          color="#6B4CE6"
          speed="4s"
          thickness={2}
          className="shadow-lg hover:shadow-xl transition-shadow"
        >
          <Link
            to="/demo"
            title="Pogledaj demo"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-text-primary dark:text-white font-semibold rounded-lg text-base sm:text-lg transition-all transform md:hover:scale-[1.02] active:scale-[0.98] focus:outline-none"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <ShinyText text={t('hero.watchDemo')} speed={4} />
          </Link>
        </StarBorder>
      </div>
    </section>
  )
}
