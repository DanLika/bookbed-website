import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LogoIcon } from './Logo'
import LetterSwapForward from './ui/animations/LetterSwapForward'

interface HeaderProps {
  isDark: boolean
  onToggleTheme: () => void
}

export default function Header({ isDark, onToggleTheme }: HeaderProps) {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
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
    const newLang = i18n.language === 'en' ? 'hr' : 'en'
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

  // Handle logo click - always navigate to home and scroll to top
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    // Navigate to home (this will refresh if already on home)
    navigate('/', { replace: true })
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-zinc-900 shadow-lg border border-gray-200 dark:border-zinc-700 px-3 sm:px-5 lg:px-6 rounded-2xl lg:rounded-full overflow-hidden">
          <div className="flex items-center justify-between h-12 sm:h-14 lg:h-16">
            {/* Logo - Left */}
            <div className="flex items-center flex-shrink-0">
              <Link
                to="/"
                onClick={handleLogoClick}
                className="inline-flex items-center gap-1.5 sm:gap-2 group"
              >
                <LogoIcon
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                />
                <span className="text-xs sm:text-sm lg:text-base font-bold text-text-primary dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300">
                  BookBed
                </span>
              </Link>
            </div>

            {/* Navigation - Centered (Desktop only) */}
            <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2" aria-label="Main navigation">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path
                return (
                  <Link
                    key={link.key}
                    to={link.path}
                    aria-current={isActive ? 'page' : undefined}
                    className={`font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-zinc-900 rounded-lg px-2.5 py-1.5 active:opacity-80 ${
                      isActive
                        ? 'text-primary dark:text-primary-lighter'
                        : 'text-text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-primary-lighter'
                    }`}
                  >
                    <LetterSwapForward text={t(`nav.${link.key}`)} staggerDelay={0.02} />
                  </Link>
                )
              })}
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm font-medium text-text-secondary dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
                aria-label={i18n.language === 'en' ? 'Switch to Croatian' : 'Switch to English'}
              >
                {i18n.language === 'en' ? 'HR' : 'EN'}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={onToggleTheme}
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className="hidden sm:flex p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
              >
                {isDark ? (
                  <svg className="w-4.5 h-4.5 text-text-secondary dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-4.5 h-4.5 text-text-secondary dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              <span className="sr-only" aria-live="polite">
                {isDark ? 'Switched to dark mode' : 'Switched to light mode'}
              </span>

              {/* CTA Button - Desktop */}
              <a
                href="https://app.bookbed.io"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary hover:scale-[1.02] active:scale-95 text-white text-sm font-semibold rounded-lg shadow-purple transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
              >
                {t('hero.cta')}
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <svg className="w-5 h-5 text-text-secondary dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-text-secondary dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu - Slide down animation */}
          <div
            className={`lg:hidden border-t border-gray-200 dark:border-zinc-700 overflow-hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? 'max-h-[500px] opacity-100 mt-2 pt-3 pb-4' : 'max-h-0 opacity-0'
            }`}
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path
                return (
                  <Link
                    key={link.key}
                    to={link.path}
                    aria-current={isActive ? 'page' : undefined}
                    className={`px-4 py-3 rounded-lg font-medium transition-all active:scale-[0.98] ${
                      isActive
                        ? 'bg-primary/10 text-primary dark:text-primary-lighter'
                        : 'text-text-secondary dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                )
              })}

              {/* Get Started Free - CTA Button */}
              <a
                href="https://app.bookbed.io"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 w-full px-4 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
              >
                {t('hero.cta')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              <div className="flex gap-2 pt-3 mt-2 border-t border-gray-200 dark:border-zinc-700">
                {/* Language Toggle - Mobile */}
                <button
                  onClick={toggleLanguage}
                  className="flex-1 px-4 py-3 bg-gray-100 dark:bg-zinc-800 text-text-primary dark:text-white font-medium rounded-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                  aria-label={i18n.language === 'en' ? 'Switch to Croatian' : 'Switch to English'}
                >
                  {i18n.language === 'en' ? 'Hrvatski' : 'English'}
                </button>

                {/* Theme Toggle - Mobile */}
                <button
                  onClick={onToggleTheme}
                  className="flex-1 px-4 py-3 bg-gray-100 dark:bg-zinc-800 text-text-primary dark:text-white font-medium rounded-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
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
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
