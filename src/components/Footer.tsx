import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LogoIcon } from './Logo'
import FadeContent from './ui/animations/FadeContent'
import GlassIcons from './ui/animations/GlassIcons'

export default function Footer() {
  const { t } = useTranslation()

  const navLinks = [
    { path: '/', key: 'home' },
    { path: '/demo', key: 'demo' },
    { path: '/widget', key: 'widget' },
    { path: '/contact', key: 'contact' },
  ]

  return (
    <footer className="relative bg-white dark:bg-zinc-900 overflow-hidden">

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-10">
          {/* Logo & Description */}
          <FadeContent
            duration={500}
            direction="up"
            distance={20}
            className="flex-1"
          >
            <Link to="/" className="inline-flex items-center gap-1.5 sm:gap-2 group mb-4">
              <LogoIcon
                className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
              />
              <span className="text-xs sm:text-sm lg:text-base font-bold text-text-primary dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300">
                BookBed
              </span>
            </Link>
            <p className="text-text-secondary dark:text-gray-400 text-sm leading-relaxed max-w-sm">
              {t('footer.description')}
            </p>
          </FadeContent>

          {/* Navigation & Contact - Same Row */}
          <div className="flex gap-12 md:gap-16">
            {/* Navigation Links */}
            <FadeContent
              duration={500}
              delay={100}
              direction="up"
              distance={20}
            >
              <h4 className="text-text-primary dark:text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t('footer.navigation')}</h4>
              <nav className="flex flex-col gap-1" aria-label="Footer navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.key}
                    to={link.path}
                    className="text-text-secondary dark:text-gray-400 hover:text-primary hover:translate-x-2 active:opacity-80 transition-all text-sm py-2 -ml-1 pl-1"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                ))}
              </nav>
            </FadeContent>

            {/* Contact */}
            <FadeContent
              duration={500}
              delay={200}
              direction="up"
              distance={20}
            >
              <h4 className="text-text-primary dark:text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t('footer.contact')}</h4>
              <GlassIcons
                items={[
                  {
                    icon: (
                      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                    color: 'linear-gradient(135deg, hsl(220, 8%, 50%), hsl(220, 8%, 40%))',
                    label: 'Email',
                    href: 'mailto:info@bookbed.io',
                  },
                  {
                    icon: (
                      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    ),
                    color: 'linear-gradient(135deg, hsl(200, 8%, 50%), hsl(200, 8%, 40%))',
                    label: 'App',
                    href: 'https://app.bookbed.io',
                  },
                ]}
                className="justify-start !gap-3 !py-1"
              />
            </FadeContent>
          </div>
        </div>

        {/* Copyright */}
        <FadeContent
          duration={500}
          delay={300}
          direction="up"
          distance={10}
        >
          <div className="border-t border-gray-300 dark:border-zinc-800 pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-tertiary dark:text-gray-500">
              <p>{t('footer.copyright')}</p>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-primary active:opacity-80 transition-all py-2 px-1">
                  {t('footer.privacy')}
                </a>
                <a href="#" className="hover:text-primary active:opacity-80 transition-all py-2 px-1">
                  {t('footer.terms')}
                </a>
              </div>
            </div>
          </div>
        </FadeContent>
      </div>
    </footer>
  )
}
