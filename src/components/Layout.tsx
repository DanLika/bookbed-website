import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  isDark: boolean
  onToggleTheme: () => void
}

export default function Layout({ isDark, onToggleTheme }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>
      <Header isDark={isDark} onToggleTheme={onToggleTheme} />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
