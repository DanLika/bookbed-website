import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LogoIcon } from './Logo'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-zinc-900 dark:bg-black border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Logo & Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <LogoIcon
              size={36}
              isWhite={true}
              className="w-9 h-9 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
            />
            <span className="text-xl font-bold text-white group-hover:text-primary-light transition-colors duration-300">
              BookBed
            </span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <a
              href="mailto:dusko@bookbed.io"
              className="text-gray-400 hover:text-white transition-colors"
            >
              dusko@bookbed.io
            </a>
            <Link
              to="/contact"
              className="text-gray-400 hover:text-white transition-colors"
            >
              {t('nav.contact')}
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-zinc-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>{t('footer.copyright')}</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-gray-400 transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="#" className="hover:text-gray-400 transition-colors">
                {t('footer.terms')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
