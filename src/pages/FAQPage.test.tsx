import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import FAQPage from './FAQPage'
import { usePageMeta } from '../hooks/usePageMeta'

// Mock usePageMeta and useBreadcrumbSchema so they don't manipulate the real DOM in unexpected ways
vi.mock('../hooks/usePageMeta', () => ({
  usePageMeta: vi.fn()
}))

vi.mock('../hooks/useBreadcrumbSchema', () => ({
  useBreadcrumbSchema: vi.fn()
}))

// Mock animations to prevent jsdom issues
vi.mock('../components/ui/animations/FadeContent', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="fade-content">{children}</div>
}))

vi.mock('../components/ui/animations/GradientText', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="gradient-text">{children}</div>
}))

// Mock framer-motion AnimatePresence to just render children to bypass animation wait times
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion')
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: {
      div: ({ children, ...props }: any) => {
        // Remove framer-motion specific props
        const { initial, animate, exit, transition, ...rest } = props
        return <div {...rest}>{children}</div>
      }
    }
  }
})

const mockTranslations: Record<string, string> = {
  'faqPage.badge': 'FAQ Badge',
  'faqPage.title': 'FAQ Title',
  'faqPage.subtitle': 'FAQ Subtitle',
  'faqPage.meta.title': 'Meta Title',
  'faqPage.meta.description': 'Meta Description',
  'faqPage.cta.title': 'CTA Title',
  'faqPage.cta.subtitle': 'CTA Subtitle',
  'faqPage.cta.getStarted': 'Get Started',
  'faqPage.cta.contact': 'Contact Us',
  'faqPage.categories.about.title': 'About BookBed',
  'faqPage.categories.about.items.0.question': 'What is BookBed?',
  'faqPage.categories.about.items.0.answer': 'BookBed is a property management system.',
}

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      // Return predefined translation if exists
      if (mockTranslations[key]) return mockTranslations[key]

      // Handle the dynamic while(true) loop by returning nothing to stop it
      if (options?.defaultValue !== undefined) return options.defaultValue

      return key
    },
    i18n: {
      language: 'en'
    }
  })
}))

describe('FAQPage', () => {
  beforeEach(() => {
    // Clear DOM before each test for hooks that write to head
    document.head.innerHTML = ''
  })

  afterEach(() => {
    document.head.innerHTML = ''
    vi.clearAllMocks()
  })

  it('renders main text content including badge, title, subtitle', () => {
    render(
      <MemoryRouter>
        <FAQPage />
      </MemoryRouter>
    )

    expect(screen.getByText('FAQ Badge')).toBeInTheDocument()
    expect(screen.getByText('FAQ Title')).toBeInTheDocument()
    expect(screen.getByText('FAQ Subtitle')).toBeInTheDocument()
  })

  it('calls usePageMeta with correct SEO arguments', () => {
    render(
      <MemoryRouter>
        <FAQPage />
      </MemoryRouter>
    )

    expect(usePageMeta).toHaveBeenCalledWith({
      title: 'Meta Title',
      description: 'Meta Description'
    })
  })

  it('renders categories and interacts with accordion items', async () => {
    render(
      <MemoryRouter>
        <FAQPage />
      </MemoryRouter>
    )

    // Check category title
    expect(screen.getByText('About BookBed')).toBeInTheDocument()

    // Check the question is visible
    expect(screen.getByText('What is BookBed?')).toBeInTheDocument()

    // Answer should NOT be visible initially
    expect(screen.queryByText('BookBed is a property management system.')).not.toBeInTheDocument()

    // Click on the question to expand
    const toggleButton = screen.getByRole('button', { name: /what is bookbed\?/i })
    fireEvent.click(toggleButton)

    // The answer should now be visible
    expect(screen.getByText('BookBed is a property management system.')).toBeInTheDocument()

    // Click again to collapse
    fireEvent.click(toggleButton)

    // The answer should not be visible
    await waitFor(() => {
        expect(screen.queryByText('BookBed is a property management system.')).not.toBeInTheDocument()
    })
  })

  it('renders CTA section with links', () => {
    render(
      <MemoryRouter>
        <FAQPage />
      </MemoryRouter>
    )

    expect(screen.getByText('CTA Title')).toBeInTheDocument()
    expect(screen.getByText('CTA Subtitle')).toBeInTheDocument()

    const getStartedLink = screen.getByRole('link', { name: /get started/i })
    expect(getStartedLink).toHaveAttribute('href', 'https://app.bookbed.io')

    const contactLink = screen.getByRole('link', { name: /contact us/i })
    expect(contactLink).toHaveAttribute('href', '/contact')
  })

  it('generates FAQ schema script in document head', () => {
    render(
      <MemoryRouter>
        <FAQPage />
      </MemoryRouter>
    )

    const schemaScript = document.getElementById('faq-page-schema')
    expect(schemaScript).toBeInTheDocument()

    const schemaContent = JSON.parse(schemaScript!.textContent || '{}')
    expect(schemaContent['@type']).toBe('FAQPage')
    expect(schemaContent.mainEntity).toBeInstanceOf(Array)
    expect(schemaContent.mainEntity.length).toBe(1)
    expect(schemaContent.mainEntity[0].name).toBe('What is BookBed?')
  })
})
