/** @vitest-environment jsdom */
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi, describe, it, expect } from 'vitest'
import Footer from './Footer'

// Mock the translations
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, _options?: unknown) => key,
  }),
}))

// Mock the animations and icons to prevent issues with JSDOM
vi.mock('./ui/animations/FadeContent', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

vi.mock('./ui/animations/GlassIcons', () => ({
  default: () => <div data-testid="glass-icons-mock">GlassIcons</div>,
}))

// Mock LogoIcon to simplify testing
vi.mock('./Logo', () => ({
  LogoIcon: () => <div data-testid="logo-icon-mock">Logo</div>,
}))

describe('Footer Component', () => {
  const renderFooter = () => {
    return render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
  }

  it('renders without crashing', () => {
    renderFooter()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders company logo and name', () => {
    renderFooter()
    expect(screen.getByTestId('logo-icon-mock')).toBeInTheDocument()
    expect(screen.getByText('BookBed')).toBeInTheDocument()
    expect(screen.getByText('footer.description')).toBeInTheDocument()
  })

  it('renders navigation links correctly', () => {
    renderFooter()
    expect(screen.getByText('footer.navigation')).toBeInTheDocument()

    // Check navigation items based on translation keys
    expect(screen.getByText('nav.home')).toBeInTheDocument()
    expect(screen.getByText('nav.widget')).toBeInTheDocument()
    expect(screen.getByText('nav.docs')).toBeInTheDocument()
    expect(screen.getByText('nav.faqNav')).toBeInTheDocument()
    expect(screen.getByText('nav.contact')).toBeInTheDocument()
  })

  it('renders contact section with icons', () => {
    renderFooter()
    expect(screen.getByText('footer.contact')).toBeInTheDocument()
    expect(screen.getByTestId('glass-icons-mock')).toBeInTheDocument()
  })

  it('renders copyright and legal links', () => {
    renderFooter()
    expect(screen.getByText('footer.copyright')).toBeInTheDocument()

    // Check legal links
    expect(screen.getByText('footer.privacy')).toBeInTheDocument()
    expect(screen.getByText('footer.terms')).toBeInTheDocument()
    expect(screen.getByText('footer.accountDeletion')).toBeInTheDocument()
    expect(screen.getByText('footer.dataDeletion')).toBeInTheDocument()
  })
})
