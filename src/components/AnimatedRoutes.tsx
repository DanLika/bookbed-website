import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import PageTransition from './PageTransition'
import HomePage from '../pages/HomePage'

// Lazy load all pages except HomePage (critical path)
const AboutPage = lazy(() => import('../pages/AboutPage'))
const DemoPage = lazy(() => import('../pages/DemoPage'))
const WidgetPage = lazy(() => import('../pages/WidgetPage'))
const ContactPage = lazy(() => import('../pages/ContactPage'))
const PrivacyPage = lazy(() => import('../pages/PrivacyPage'))
const TermsPage = lazy(() => import('../pages/TermsPage'))
const AccountDeletionPage = lazy(() => import('../pages/AccountDeletionPage'))
const DataDeletionPage = lazy(() => import('../pages/DataDeletionPage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))
const TestWidgetPage = lazy(() => import('../pages/TestWidgetPage'))
const FAQPage = lazy(() => import('../pages/FAQPage'))

// Docs pages
const DocsIntroPage = lazy(() => import('../pages/docs/DocsIntroPage'))
const QuickStartPage = lazy(() => import('../pages/docs/QuickStartPage'))
const CreatePropertyPage = lazy(() => import('../pages/docs/CreatePropertyPage'))
const WidgetEmbedPage = lazy(() => import('../pages/docs/WidgetEmbedPage'))
const StripeIntegrationPage = lazy(() => import('../pages/docs/StripeIntegrationPage'))
const ICalSyncPage = lazy(() => import('../pages/docs/ICalSyncPage'))
const GenericDocsPage = lazy(() => import('../pages/docs/GenericDocsPage'))

// Minimal fallback for lazy pages
const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
)

export default function AnimatedRoutes() {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
      <Route path="/about" element={<Suspense fallback={<PageFallback />}><PageTransition><AboutPage /></PageTransition></Suspense>} />
      <Route path="/demo" element={<Suspense fallback={<PageFallback />}><PageTransition><DemoPage /></PageTransition></Suspense>} />
      <Route path="/widget" element={<Suspense fallback={<PageFallback />}><PageTransition><WidgetPage /></PageTransition></Suspense>} />
      <Route path="/contact" element={<Suspense fallback={<PageFallback />}><PageTransition><ContactPage /></PageTransition></Suspense>} />
      <Route path="/privacy" element={<Suspense fallback={<PageFallback />}><PageTransition><PrivacyPage /></PageTransition></Suspense>} />
      <Route path="/terms" element={<Suspense fallback={<PageFallback />}><PageTransition><TermsPage /></PageTransition></Suspense>} />
      <Route path="/account-deletion" element={<Suspense fallback={<PageFallback />}><PageTransition><AccountDeletionPage /></PageTransition></Suspense>} />
      <Route path="/data-deletion" element={<Suspense fallback={<PageFallback />}><PageTransition><DataDeletionPage /></PageTransition></Suspense>} />
      <Route path="/test-widget" element={<Suspense fallback={<PageFallback />}><PageTransition><TestWidgetPage /></PageTransition></Suspense>} />
      <Route path="/faq" element={<Suspense fallback={<PageFallback />}><PageTransition><FAQPage /></PageTransition></Suspense>} />

      {/* Docs Routes */}
      <Route path="/docs" element={<Suspense fallback={<PageFallback />}><PageTransition><DocsIntroPage /></PageTransition></Suspense>} />
      <Route path="/docs/quick-start" element={<Suspense fallback={<PageFallback />}><PageTransition><QuickStartPage /></PageTransition></Suspense>} />
      <Route path="/docs/account" element={<Suspense fallback={<PageFallback />}><PageTransition><GenericDocsPage sectionKey="account" nextPath="/docs/properties/create" /></PageTransition></Suspense>} />
      <Route path="/docs/properties/create" element={<Suspense fallback={<PageFallback />}><PageTransition><CreatePropertyPage /></PageTransition></Suspense>} />
      <Route path="/docs/properties/units" element={<Suspense fallback={<PageFallback />}><PageTransition><GenericDocsPage sectionKey="units" prevPath="/docs/properties/create" nextPath="/docs/properties/pricing" /></PageTransition></Suspense>} />
      <Route path="/docs/properties/pricing" element={<Suspense fallback={<PageFallback />}><PageTransition><GenericDocsPage sectionKey="pricing" prevPath="/docs/properties/units" nextPath="/docs/properties/availability" /></PageTransition></Suspense>} />
      <Route path="/docs/properties/availability" element={<Suspense fallback={<PageFallback />}><PageTransition><GenericDocsPage sectionKey="availability" prevPath="/docs/properties/pricing" nextPath="/docs/widget/setup" /></PageTransition></Suspense>} />
      <Route path="/docs/bookings/manage" element={<Suspense fallback={<PageFallback />}><PageTransition><GenericDocsPage sectionKey="manageBookings" nextPath="/docs/bookings/calendar" /></PageTransition></Suspense>} />
      <Route path="/docs/bookings/calendar" element={<Suspense fallback={<PageFallback />}><PageTransition><GenericDocsPage sectionKey="calendar" prevPath="/docs/bookings/manage" nextPath="/docs/bookings/statuses" /></PageTransition></Suspense>} />
      <Route path="/docs/bookings/statuses" element={<Suspense fallback={<PageFallback />}><PageTransition><GenericDocsPage sectionKey="statuses" prevPath="/docs/bookings/calendar" /></PageTransition></Suspense>} />
      <Route path="/docs/widget/setup" element={<Suspense fallback={<PageFallback />}><PageTransition><GenericDocsPage sectionKey="widgetSetup" nextPath="/docs/widget/embed" /></PageTransition></Suspense>} />
      <Route path="/docs/widget/embed" element={<Suspense fallback={<PageFallback />}><PageTransition><WidgetEmbedPage /></PageTransition></Suspense>} />
      <Route path="/docs/widget/customize" element={<Suspense fallback={<PageFallback />}><PageTransition><GenericDocsPage sectionKey="widgetCustomize" prevPath="/docs/widget/embed" /></PageTransition></Suspense>} />
      <Route path="/docs/integrations/stripe" element={<Suspense fallback={<PageFallback />}><PageTransition><StripeIntegrationPage /></PageTransition></Suspense>} />
      <Route path="/docs/integrations/ical" element={<Suspense fallback={<PageFallback />}><PageTransition><ICalSyncPage /></PageTransition></Suspense>} />
      <Route path="/docs/settings/notifications" element={<Suspense fallback={<PageFallback />}><PageTransition><GenericDocsPage sectionKey="notifications" nextPath="/docs/settings/subdomain" /></PageTransition></Suspense>} />
      <Route path="/docs/settings/subdomain" element={<Suspense fallback={<PageFallback />}><PageTransition><GenericDocsPage sectionKey="subdomain" prevPath="/docs/settings/notifications" /></PageTransition></Suspense>} />
      <Route path="/docs/faq" element={<Suspense fallback={<PageFallback />}><PageTransition><GenericDocsPage sectionKey="faq" /></PageTransition></Suspense>} />

      <Route path="*" element={<Suspense fallback={<PageFallback />}><PageTransition><NotFoundPage /></PageTransition></Suspense>} />
    </Routes>
  )
}
