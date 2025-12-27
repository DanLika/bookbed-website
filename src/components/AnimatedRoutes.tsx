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
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

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
      <Route path="*" element={<Suspense fallback={<PageFallback />}><PageTransition><NotFoundPage /></PageTransition></Suspense>} />
    </Routes>
  )
}
