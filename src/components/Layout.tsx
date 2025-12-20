import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  isDark: boolean
  onToggleTheme: () => void
}

export default function Layout({ isDark, onToggleTheme }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] transition-colors duration-300">
      <Header isDark={isDark} onToggleTheme={onToggleTheme} />
      <main className="pt-20 sm:pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
