import { Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { lazy, useEffect } from 'react'
import PageTransition from './PageTransition'
import AboutPage from '../pages/AboutPage'
import ContactPage from '../pages/ContactPage'
import NotFoundPage from '../pages/NotFoundPage'

// Performance: Lazy load the most resource-intensive pages
const HomePage = lazy(() => import('../pages/HomePage'))
const DemoPage = lazy(() => import('../pages/DemoPage'))
const WidgetPage = lazy(() => import('../pages/WidgetPage'))

export default function AnimatedRoutes() {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-white dark:bg-black"><p className="text-lg text-gray-500">Loading...</p></div>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="/demo" element={<PageTransition><DemoPage /></PageTransition>} />
          <Route path="/widget" element={<PageTransition><WidgetPage /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}
