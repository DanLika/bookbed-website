import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { spacing, heroSpacing } from '../utils/spacing'
import { typography } from '../utils/typography'
import FadeContent from '../components/ui/animations/FadeContent'
import GradientText from '../components/ui/animations/GradientText'
import GlassIcon from '../components/ui/GlassIcon'
import { usePageMeta } from '../hooks/usePageMeta'

const TestWidgetPage = () => {
  const { i18n } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()

  const [propertyId, setPropertyId] = useState(searchParams.get('property') || '')
  const [unitId, setUnitId] = useState(searchParams.get('unit') || '')

  // Page-specific SEO meta tags
  usePageMeta({
    title: i18n.language === 'hr'
      ? 'Test Widget - BookBed'
      : 'Test Widget - BookBed',
    description: i18n.language === 'hr'
      ? 'Testirajte vaš BookBed widget prije embedanja na vaš web sajt.'
      : 'Test your BookBed widget before embedding it on your website.'
  })

  // Auto-populate fields from URL params
  useEffect(() => {
    const prop = searchParams.get('property')
    const unit = searchParams.get('unit')
    if (prop) setPropertyId(prop)
    if (unit) setUnitId(unit)
  }, [searchParams])

  const handleOpenWidget = () => {
    if (!propertyId.trim() || !unitId.trim()) {
      return
    }

    // Open widget in new tab
    const url = `https://view.bookbed.io/?property=${propertyId.trim()}&unit=${unitId.trim()}`
    window.open(url, '_blank', 'noopener,noreferrer')

    // Update URL params for sharing
    setSearchParams({ property: propertyId.trim(), unit: unitId.trim() })
  }

  // Allow Enter key to open widget
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && propertyId.trim() && unitId.trim()) {
        handleOpenWidget()
      }
    }
    document.addEventListener('keypress', handleKeyPress)
    return () => document.removeEventListener('keypress', handleKeyPress)
  }, [propertyId, unitId])

  const copyShareLink = () => {
    const shareUrl = `https://view.bookbed.io/?property=${propertyId.trim()}&unit=${unitId.trim()}`
    navigator.clipboard.writeText(shareUrl)
  }

  const isHr = i18n.language === 'hr'

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
      <section className={`relative ${heroSpacing.paddingTop} pb-8 sm:pb-12 ${spacing.container.padding}`}>
        <div className="max-w-4xl mx-auto text-center">
          <FadeContent duration={500} direction="none">
            <div className="group inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/70 dark:bg-zinc-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-zinc-700/50 text-sm font-medium mb-6 shadow-sm">
              <GlassIcon size="sm" color="primary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </GlassIcon>
              <span className="text-text-primary dark:text-white pr-1">
                {isHr ? 'Za Testere' : 'For Testers'}
              </span>
            </div>
          </FadeContent>

          <FadeContent blur duration={600} delay={100} direction="up" distance={20}>
            <h1 className={`${typography.h1} font-bold text-text-primary dark:text-white mb-6`}>
              <GradientText
                colors={['#6B4CE6', '#9B86F3', '#6B4CE6', '#9B86F3', '#6B4CE6']}
                animationSpeed={6}
                className={typography.h1}
              >
                {isHr ? 'Testiraj Widget' : 'Test Widget'}
              </GradientText>
            </h1>
          </FadeContent>

          <FadeContent duration={600} delay={200} direction="up" distance={20}>
            <p className={`${typography.subtitle} text-text-secondary dark:text-gray-400 max-w-2xl mx-auto`}>
              {isHr
                ? 'Unesite Property ID i Unit ID iz vaše aplikacije. Widget će se otvoriti u novom tabu bez cache problema.'
                : 'Enter Property ID and Unit ID from your app. Widget will open in a new tab without cache issues.'
              }
            </p>
          </FadeContent>
        </div>
      </section>

      {/* Input Form */}
      <section className={`relative pb-16 ${spacing.container.padding}`}>
        <FadeContent duration={600} delay={300} direction="up" distance={20}>
          <div className="max-w-lg mx-auto">
            <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-700 p-6 sm:p-8">
              <div className="space-y-5">
                {/* Property ID Input */}
                <div>
                  <label className="block text-sm font-semibold text-text-primary dark:text-white mb-2">
                    Property ID
                  </label>
                  <input
                    type="text"
                    value={propertyId}
                    onChange={(e) => setPropertyId(e.target.value)}
                    placeholder={isHr ? 'npr. lQjBRhK0hHbeLXpZbpxt' : 'e.g., lQjBRhK0hHbeLXpZbpxt'}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-text-primary dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  />
                  <p className="text-xs text-text-secondary dark:text-gray-400 mt-1.5">
                    {isHr ? 'Pronađite u Owner Dashboard → Properties' : 'Find in Owner Dashboard → Properties'}
                  </p>
                </div>

                {/* Unit ID Input */}
                <div>
                  <label className="block text-sm font-semibold text-text-primary dark:text-white mb-2">
                    Unit ID
                  </label>
                  <input
                    type="text"
                    value={unitId}
                    onChange={(e) => setUnitId(e.target.value)}
                    placeholder={isHr ? 'npr. haxR5PHuYEJIBLM8DVlh' : 'e.g., haxR5PHuYEJIBLM8DVlh'}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-text-primary dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  />
                  <p className="text-xs text-text-secondary dark:text-gray-400 mt-1.5">
                    {isHr ? 'Pronađite u Owner Dashboard → Units' : 'Find in Owner Dashboard → Units'}
                  </p>
                </div>

                {/* Open Widget Button */}
                <button
                  onClick={handleOpenWidget}
                  disabled={!propertyId.trim() || !unitId.trim()}
                  className="w-full mt-2 px-6 py-3.5 bg-primary hover:bg-primary-dark disabled:bg-gray-300 dark:disabled:bg-zinc-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:shadow-none transition-all disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {isHr ? 'Otvori Widget' : 'Open Widget'}
                </button>

                {/* Copy Link Button */}
                {propertyId.trim() && unitId.trim() && (
                  <button
                    onClick={copyShareLink}
                    className="w-full px-4 py-2 text-sm font-medium text-primary hover:text-primary-dark dark:text-primary-light border-2 border-primary/30 hover:border-primary rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {isHr ? 'Kopiraj Link Za Dijeljenje' : 'Copy Share Link'}
                  </button>
                )}
              </div>

              {/* Help Section */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-zinc-700">
                <p className="text-sm font-semibold text-text-primary dark:text-white mb-2">
                  {isHr ? 'Gdje pronaći ID-ove?' : 'Where to find IDs?'}
                </p>
                <p className="text-sm text-text-secondary dark:text-gray-400">
                  {isHr
                    ? 'U aplikaciji idite na: Unit Hub → Embed Code. Property ID i Unit ID su prikazani u generiranom kodu.'
                    : 'In the app go to: Unit Hub → Embed Code. Property ID and Unit ID are shown in the generated code.'
                  }
                </p>
              </div>

              {/* Benefits Info Box */}
              <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800/30">
                <div className="flex gap-2">
                  <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300 mb-1">
                      {isHr ? 'Zašto novi tab?' : 'Why new tab?'}
                    </p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400">
                      {isHr
                        ? 'Widget se otvara u novom tabu da izbjegnemo cache i localStorage probleme. Svaki test je potpuno čist i izolovano.'
                        : 'Widget opens in a new tab to avoid cache and localStorage issues. Each test is completely clean and isolated.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>
    </div>
  )
}

export default TestWidgetPage
