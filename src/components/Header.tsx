import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LogoIcon } from './Logo'

interface HeaderProps {
  isDark: boolean
  onToggleTheme: () => void
}

export default function Header({ isDark, onToggleTheme }: HeaderProps) {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const [isVisible, setIsVisible] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const lastScrollY = useRef(0)

  const navLinks = [
    { path: '/', key: 'home' },
    { path: '/demo', key: 'demo' },
    { path: '/widget', key: 'widget' },
    { path: '/contact', key: 'contact' },
  ]

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'bs' : 'en'
    i18n.changeLanguage(newLang)
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 10) {
        setIsVisible(true)
      } else {
        if (currentScrollY > lastScrollY.current) {
          setIsVisible(false)
        } else if (currentScrollY < lastScrollY.current) {
          setIsVisible(true)
        }
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`fixed top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className={`bg-white dark:bg-zinc-900 shadow-lg border border-gray-200 dark:border-zinc-700 px-4 sm:px-6 lg:px-8 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'rounded-2xl' : 'rounded-full'
        }`}>
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            {/* Logo - Left */}
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
                <LogoIcon
                  size={32}
                  darkMode={isDark}
                  className="w-8 h-8 sm:w-10 sm:h-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                />
                <span className="text-lg sm:text-xl font-bold text-text-primary dark:text-white tracking-tight group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300">
                  BookBed
                </span>
              </Link>
            </div>

            {/* Navigation - Centered (Desktop only) */}
            <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.path}
                  className={`font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-primary dark:text-primary-light'
                      : 'text-text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-primary-light'
                  }`}
                >
                  {t(`nav.${link.key}`)}
                </Link>
              ))}
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-text-secondary dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              >
                {i18n.language === 'en' ? 'BS' : 'EN'}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={onToggleTheme}
                className="hidden sm:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg className="w-5 h-5 text-text-secondary dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-text-secondary dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* CTA Button - Desktop */}
              <a
                href="https://app.bookbed.io"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-semibold rounded-lg shadow-purple transition-all"
              >
                {t('hero.cta')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6 text-text-secondary dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-text-secondary dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 dark:border-zinc-700 mt-2 pt-3 pb-3 animate-slide-down">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.key}
                    to={link.path}
                    className={`px-4 py-2.5 rounded-lg font-medium transition-all ${
                      location.pathname === link.path
                        ? 'bg-primary/10 text-primary dark:text-primary-light'
                        : 'text-text-secondary dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                ))}

                <div className="flex gap-2 pt-3 mt-2 border-t border-gray-200 dark:border-zinc-700">
                  {/* Language Toggle - Mobile */}
                  <button
                    onClick={toggleLanguage}
                    className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-zinc-800 text-text-primary dark:text-white font-medium rounded-lg flex items-center justify-center gap-2"
                  >
                    {i18n.language === 'en' ? 'Bosanski' : 'English'}
                  </button>

                  {/* Theme Toggle - Mobile */}
                  <button
                    onClick={onToggleTheme}
                    className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-zinc-800 text-text-primary dark:text-white font-medium rounded-lg flex items-center justify-center gap-2"
                  >
                    {isDark ? (
                      <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Light
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                        Dark
                      </>
                    )}
                  </button>
                </div>

                {/* CTA Button - Mobile */}
                <a
                  href="https://app.bookbed.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 w-full px-4 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-lg flex items-center justify-center gap-2"
                >
                  {t('hero.cta')}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
