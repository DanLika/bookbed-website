import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiMenu, FiX, FiChevronRight, FiHome, FiBook, FiSettings, FiCalendar, FiCode, FiLink, FiHelpCircle } from 'react-icons/fi'

interface DocsSection {
  id: string
  icon: React.ReactNode
  items: { id: string; path: string }[]
}

interface DocsLayoutProps {
  children: React.ReactNode
}

const DocsLayout = ({ children }: DocsLayoutProps) => {
  const { t } = useTranslation()
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isSidebarOpen])

  // Close sidebar on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isSidebarOpen])

  const sections: DocsSection[] = [
    {
      id: 'gettingStarted',
      icon: <FiHome className="w-4 h-4" />,
      items: [
        { id: 'introduction', path: '/docs' },
        { id: 'quickStart', path: '/docs/quick-start' },
        { id: 'account', path: '/docs/account' },
      ]
    },
    {
      id: 'properties',
      icon: <FiBook className="w-4 h-4" />,
      items: [
        { id: 'createProperty', path: '/docs/properties/create' },
        { id: 'addUnits', path: '/docs/properties/units' },
        { id: 'pricing', path: '/docs/properties/pricing' },
        { id: 'availability', path: '/docs/properties/availability' },
      ]
    },
    {
      id: 'bookings',
      icon: <FiCalendar className="w-4 h-4" />,
      items: [
        { id: 'manageBookings', path: '/docs/bookings/manage' },
        { id: 'calendar', path: '/docs/bookings/calendar' },
        { id: 'statuses', path: '/docs/bookings/statuses' },
      ]
    },
    {
      id: 'widget',
      icon: <FiCode className="w-4 h-4" />,
      items: [
        { id: 'setupWidget', path: '/docs/widget/setup' },
        { id: 'embedCode', path: '/docs/widget/embed' },
        { id: 'customization', path: '/docs/widget/customize' },
      ]
    },
    {
      id: 'integrations',
      icon: <FiLink className="w-4 h-4" />,
      items: [
        { id: 'stripe', path: '/docs/integrations/stripe' },
        { id: 'ical', path: '/docs/integrations/ical' },
      ]
    },
    {
      id: 'settings',
      icon: <FiSettings className="w-4 h-4" />,
      items: [
        { id: 'notifications', path: '/docs/settings/notifications' },
        { id: 'subdomain', path: '/docs/settings/subdomain' },
      ]
    },
    {
      id: 'faq',
      icon: <FiHelpCircle className="w-4 h-4" />,
      items: [
        { id: 'commonQuestions', path: '/docs/faq' },
      ]
    },
  ]

  const isActive = (path: string) => location.pathname === path

  const Sidebar = () => (
    <nav className="space-y-6" aria-label={t('docs.navigation', 'Documentation navigation')}>
      {sections.map((section) => (
        <div key={section.id} role="group" aria-labelledby={`section-${section.id}`}>
          <div
            id={`section-${section.id}`}
            className="flex items-center gap-2 text-sm font-semibold text-text-primary dark:text-white mb-2 px-2"
          >
            <span aria-hidden="true">{section.icon}</span>
            {t(`docs.sections.${section.id}.title`)}
          </div>
          <ul className="space-y-1" role="list">
            {section.items.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-zinc-900 ${
                    isActive(item.path)
                      ? 'bg-primary/10 text-primary dark:text-primary-light font-medium'
                      : 'text-text-secondary dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <FiChevronRight className={`w-3 h-3 ${isActive(item.path) ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true" />
                  {t(`docs.sections.${section.id}.items.${item.id}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )

  return (
    <div className="min-h-screen max-w-[1920px] mx-auto bg-white dark:bg-zinc-900">
      {/* Mobile Header - positioned below navbar */}
      <div className="lg:hidden sticky top-0 z-40 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 px-4 py-3 mt-16">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-expanded={isSidebarOpen}
          aria-controls="mobile-sidebar"
          aria-label={isSidebarOpen ? t('docs.closeMenu', 'Close menu') : t('docs.openMenu', 'Open menu')}
          className="flex items-center gap-2 text-text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-zinc-900 rounded-lg p-1 -m-1"
        >
          {isSidebarOpen ? <FiX className="w-5 h-5" aria-hidden="true" /> : <FiMenu className="w-5 h-5" aria-hidden="true" />}
          <span className="font-medium">{t('docs.menu')}</span>
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Add top padding to account for fixed navbar */}
        <div className="flex gap-8 pt-20 lg:pt-24 pb-16">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0" aria-label={t('docs.navigation', 'Documentation navigation')}>
            {/* Sticky sidebar positioned below navbar */}
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </aside>

          {/* Sidebar - Mobile */}
          <aside
            id="mobile-sidebar"
            role="dialog"
            aria-modal="true"
            aria-label={t('docs.navigation', 'Documentation navigation')}
            className={`lg:hidden fixed top-[calc(5rem+57px)] left-0 z-40 w-72 h-[calc(100vh-5rem-57px)] bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 overflow-y-auto transform transition-transform duration-300 ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="p-4">
              <Sidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0" id="docs-content">
            <article className="prose prose-lg dark:prose-invert max-w-none" aria-label={t('docs.content', 'Documentation content')}>
              {children}
            </article>
          </main>
        </div>
      </div>
    </div>
  )
}

export default DocsLayout
