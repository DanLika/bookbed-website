import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import DocsIntroPage from './DocsIntroPage'
import { usePageMeta } from '../../hooks/usePageMeta'

// Mock usePageMeta hook
vi.mock('../../hooks/usePageMeta', () => ({
  usePageMeta: vi.fn(),
}))

// Mock DocsLayout to keep tests focused on the page content
vi.mock('../../components/DocsLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="docs-layout">{children}</div>
}))

// Mock react-i18next
const mockChangeLanguage = vi.fn()
const mockUseTranslation = vi.fn()
vi.mock('react-i18next', () => ({
  useTranslation: () => mockUseTranslation(),
}))

describe('DocsIntroPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Default mock implementation for useTranslation to return 'hr' language
    mockUseTranslation.mockReturnValue({
      t: (key: string) => key,
      i18n: {
        language: 'hr',
        changeLanguage: mockChangeLanguage,
      },
    })
  })

  it('renders correctly with title and subtitle', () => {
    render(
      <MemoryRouter>
        <DocsIntroPage />
      </MemoryRouter>
    )

    expect(screen.getByTestId('docs-layout')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: 'docs.intro.title' })).toBeInTheDocument()
    expect(screen.getByText('docs.intro.subtitle')).toBeInTheDocument()
  })

  it('calls usePageMeta with correct hr language meta tags', () => {
    render(
      <MemoryRouter>
        <DocsIntroPage />
      </MemoryRouter>
    )

    expect(usePageMeta).toHaveBeenCalledWith({
      title: 'Dokumentacija - BookBed',
      description: 'Naučite kako koristiti BookBed platformu za upravljanje rezervacijama.'
    })
  })

  it('calls usePageMeta with correct en language meta tags', () => {
    // Override useTranslation mock for this test
    mockUseTranslation.mockReturnValue({
      t: (key: string) => key,
      i18n: {
        language: 'en',
        changeLanguage: mockChangeLanguage,
      },
    })

    render(
      <MemoryRouter>
        <DocsIntroPage />
      </MemoryRouter>
    )

    expect(usePageMeta).toHaveBeenCalledWith({
      title: 'Documentation - BookBed',
      description: 'Learn how to use the BookBed booking management platform.'
    })
  })

  it('renders all quick links with correct paths and translation keys', () => {
    render(
      <MemoryRouter>
        <DocsIntroPage />
      </MemoryRouter>
    )

    const expectedLinks = [
      {
        path: '/docs/properties/create',
        title: 'docs.quickLinks.createProperty.title',
        desc: 'docs.quickLinks.createProperty.desc',
      },
      {
        path: '/docs/widget/embed',
        title: 'docs.quickLinks.embedWidget.title',
        desc: 'docs.quickLinks.embedWidget.desc',
      },
      {
        path: '/docs/integrations/stripe',
        title: 'docs.quickLinks.stripeSetup.title',
        desc: 'docs.quickLinks.stripeSetup.desc',
      },
      {
        path: '/docs/bookings/manage',
        title: 'docs.quickLinks.manageBookings.title',
        desc: 'docs.quickLinks.manageBookings.desc',
      },
    ]

    expectedLinks.forEach((linkConfig) => {
      const link = screen.getByRole('link', { name: new RegExp(linkConfig.title) })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', linkConfig.path)
      expect(screen.getByText(linkConfig.title)).toBeInTheDocument()
      expect(screen.getByText(linkConfig.desc)).toBeInTheDocument()
    })
  })

  it('renders all getting started steps with translation keys', () => {
    render(
      <MemoryRouter>
        <DocsIntroPage />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { level: 2, name: 'docs.intro.stepsTitle' })).toBeInTheDocument()

    const steps = [1, 2, 3, 4, 5]
    steps.forEach((step) => {
      expect(screen.getByText(step.toString())).toBeInTheDocument()
      expect(screen.getByText(`docs.intro.steps.step${step}.title`)).toBeInTheDocument()
      expect(screen.getByText(`docs.intro.steps.step${step}.desc`)).toBeInTheDocument()
    })
  })

  it('renders the CTA with correct link and translation keys', () => {
    render(
      <MemoryRouter>
        <DocsIntroPage />
      </MemoryRouter>
    )

    expect(screen.getByText('docs.intro.ctaText')).toBeInTheDocument()

    const ctaLink = screen.getByRole('link', { name: /docs\.intro\.ctaButton/ })
    expect(ctaLink).toBeInTheDocument()
    expect(ctaLink).toHaveAttribute('href', '/docs/quick-start')
  })
})
