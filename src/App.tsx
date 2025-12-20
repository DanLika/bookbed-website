import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import DemoPage from './pages/DemoPage'
import WidgetPage from './pages/WidgetPage'
import ContactPage from './pages/ContactPage'

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
    setIsDark(!isDark)
    if (!isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
        <Header isDark={isDark} onToggleTheme={toggleTheme} />
        <main className="pt-20 sm:pt-24">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/widget" element={<WidgetPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
