import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import HeroSection from '../components/HeroSection'
import { usePageMeta } from '../hooks/usePageMeta'

// Lazy load sections that are below the fold
const TrustSection = lazy(() => import('../components/TrustSection'))
const FeaturesSection = lazy(() => import('../components/FeaturesSection'))
const ScreenshotGallery = lazy(() => import('../components/ScreenshotGallery'))
const PricingSection = lazy(() => import('../components/PricingSection'))
const FinalCTASection = lazy(() => import('../components/FinalCTASection'))

// Minimal loading fallback
const SectionFallback = () => (
  <div className="w-full h-96 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
)

export default function HomePage() {
  const { i18n } = useTranslation()

  usePageMeta({
    title: i18n.language === 'hr'
      ? 'BookBed - Upravljajte Svim Rezervacijama na Jednom Mjestu'
      : 'BookBed - Manage All Your Bookings in One Place',
    description: i18n.language === 'hr'
      ? 'Kompletna platforma za upravljanje rezervacijama za vlasnike apartmana i smještaja. Pametni kalendar, Stripe plaćanja, automatski emailovi, iCal sinkronizacija.'
      : 'Complete booking management platform for property owners. Smart calendar, Stripe payments, automatic emails, iCal synchronization.'
  })

  return (
    <div className="overflow-x-hidden max-w-[1920px] mx-auto bg-white dark:bg-zinc-950">
      {/* Hero loads immediately - above the fold */}
      <HeroSection />

      {/* Below-the-fold sections load lazily */}
      <Suspense fallback={<SectionFallback />}>
        <TrustSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <FeaturesSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ScreenshotGallery />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <PricingSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <FinalCTASection />
      </Suspense>
    </div>
  )
}
