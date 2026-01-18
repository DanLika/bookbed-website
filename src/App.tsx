import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import CardNav from './components/CardNav'
import Footer from './components/Footer'
import AnimatedRoutes from './components/AnimatedRoutes'

function App() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newValue = !prev
      if (newValue) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
      return newValue
    })
  }

  return (
    <BrowserRouter>
      <AppContent isDark={isDark} onToggleTheme={toggleTheme} />
    </BrowserRouter>
  )
}

function AppContent({ isDark, onToggleTheme }: { isDark: boolean; onToggleTheme: () => void }) {
  const { t, i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hr' : 'en'
    i18n.changeLanguage(newLang)
  }

  const navItems = [
    {
      label: 'Pages',
      bgColor: isDark ? '#2D1B4E' : '#F3EBFF', // Dark purple / Light purple
      textColor: isDark ? '#E9D5FF' : '#5B21B6',
      links: [
        { label: t('nav.home'), href: '/', ariaLabel: 'Go to Home' },
        { label: t('nav.demo'), href: '/demo', ariaLabel: 'Go to Demo' },
        { label: t('nav.widget'), href: '/widget', ariaLabel: 'Go to Widget' },
        { label: t('nav.docs'), href: '/docs', ariaLabel: 'Go to Documentation' },
      ]
    },
    {
      label: 'Features',
      bgColor: isDark ? '#3D2960' : '#E9D5FF', // Medium purple / Light purple
      textColor: isDark ? '#F3EBFF' : '#6B21A8',
      links: [
        { label: t('features.calendar.title'), href: '/#features', ariaLabel: 'Calendar Feature' },
        { label: t('features.widget.title'), href: '/#features', ariaLabel: 'Widget Feature' },
        { label: t('features.analytics.title'), href: '/#features', ariaLabel: 'Analytics Feature' },
      ]
    },
    {
      label: t('nav.contact'),
      bgColor: isDark ? '#4C3575' : '#DDD6FE', // Lighter purple / Very light purple
      textColor: isDark ? '#FAF5FF' : '#7C3AED',
      links: [
        { label: 'Email', href: '/contact', ariaLabel: 'Email us' },
        { label: t('nav.contact'), href: '/contact', ariaLabel: 'Contact Page' },
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 px-4 py-2 bg-white dark:bg-zinc-800 text-primary dark:text-primary-light font-semibold rounded-lg shadow-md outline-none ring-2 ring-primary"
      >
        {t('skipToContent', 'Skip to main content')}
      </a>
      <CardNav
        logo="/images/logo-light.png"
        logoAlt="BookBed"
        items={navItems}
        baseColor={isDark ? '#18181B' : '#FFFFFF'}
        menuColor={isDark ? '#FFFFFF' : '#18181B'}
        buttonBgColor={isDark ? '#6B4CE6' : '#6B4CE6'}
        buttonTextColor="#FFFFFF"
        buttonText={t('hero.cta')}
        onButtonClick={() => window.open('https://app.bookbed.io', '_blank')}
        isDark={isDark}
        onToggleTheme={onToggleTheme}
        onToggleLanguage={toggleLanguage}
        currentLanguage={i18n.language}
      />
      <main id="main-content">
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  )
}

export default App
