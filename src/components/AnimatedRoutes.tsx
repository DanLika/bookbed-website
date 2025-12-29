import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import PageTransition from './PageTransition'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import DemoPage from '../pages/DemoPage'
import WidgetPage from '../pages/WidgetPage'
import ContactPage from '../pages/ContactPage'
import NotFoundPage from '../pages/NotFoundPage'
import { useEffect } from 'react'

export default function AnimatedRoutes() {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/demo" element={<PageTransition><DemoPage /></PageTransition>} />
        <Route path="/widget" element={<PageTransition><WidgetPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}
