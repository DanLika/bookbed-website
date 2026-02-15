import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LogoIcon } from './Logo'
import { getContainerClasses } from '../utils/spacing'
import FadeContent from './ui/animations/FadeContent'
import GlassIcons from './ui/animations/GlassIcons'

export default function Footer() {
  const { t } = useTranslation()

  const navLinks = [
    { path: '/', key: 'home' },
    { path: '/demo', key: 'demo' },
    { path: '/widget', key: 'widget' },
    { path: '/docs', key: 'docs' },
    { path: '/faq', key: 'faqNav' },
    { path: '/contact', key: 'contact' },
  ]

  return (
    <footer className="relative max-w-[1920px] mx-auto bg-white dark:bg-zinc-900 overflow-hidden">

      <div className={`relative ${getContainerClasses()} py-12 sm:py-16`}>
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-10">
          {/* Logo & Description */}
          <FadeContent
            duration={500}
            direction="up"
            distance={20}
            className="flex-1"
          >
            <Link to="/" title={t('footer.navTitles.home')} className="inline-flex items-center gap-1.5 sm:gap-2 group mb-4">
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

          {/* Navigation & Contact */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 md:gap-16">
            {/* Navigation Links */}
            <FadeContent
              duration={500}
              delay={100}
              direction="up"
              distance={20}
            >
              <div className="text-text-primary dark:text-white font-semibold mb-3 text-sm uppercase tracking-wider">{t('footer.navigation')}</div>
              <nav className="flex flex-col" aria-label="Footer navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.key}
                    to={link.path}
                    title={t(`footer.navTitles.${link.key === 'faqNav' ? 'faq' : link.key}`)}
                    className="text-text-secondary dark:text-gray-400 hover:text-primary active:opacity-80 transition-colors text-sm py-1.5"
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
              <div className="text-text-primary dark:text-white font-semibold mb-6 text-sm uppercase tracking-wider">{t('footer.contact')}</div>
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
                    title: t('footer.navTitles.contact'),
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
                    title: t('footer.navTitles.home'), // Link to app home
                  },
                ]}
                className="!flex !gap-4 !py-0"
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
              <p>{t('copyright') || t('footer.copyright')}</p>
              <div className="flex items-center gap-4">
                <Link to="/privacy" title={t('footer.navTitles.privacy')} className="hover:text-primary active:opacity-80 transition-all py-2 px-1 text-center">
                  {t('footer.privacy')}
                </Link>
                <Link to="/terms" title={t('footer.navTitles.terms')} className="hover:text-primary active:opacity-80 transition-all py-2 px-1 text-center">
                  {t('footer.terms')}
                </Link>
                <Link to="/account-deletion" title={t('footer.navTitles.accountDeletion')} className="hover:text-primary active:opacity-80 transition-all py-2 px-1 text-center">
                  {t('footer.accountDeletion')}
                </Link>
                <Link to="/data-deletion" title={t('footer.navTitles.dataDeletion')} className="hover:text-primary active:opacity-80 transition-all py-2 px-1 text-center">
                  {t('footer.dataDeletion')}
                </Link>
              </div>
            </div>
          </div>
        </FadeContent>
      </div>
    </footer>
  )
}
