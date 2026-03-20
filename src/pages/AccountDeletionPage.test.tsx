/** @vitest-environment jsdom */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AccountDeletionPage from './AccountDeletionPage'
import { usePageMeta } from '../hooks/usePageMeta'
import { useBreadcrumbSchema } from '../hooks/useBreadcrumbSchema'

// Mock the components that use browser APIs
vi.mock('../components/ui/animations/FadeContent', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

// Mock custom hooks
vi.mock('../hooks/usePageMeta', () => ({
  usePageMeta: vi.fn(),
}))

vi.mock('../hooks/useBreadcrumbSchema', () => ({
  useBreadcrumbSchema: vi.fn(),
}))

// Mock react-i18next
const mockChangeLanguage = vi.fn()
let currentLanguage = 'hr'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      get language() {
        return currentLanguage
      },
      changeLanguage: mockChangeLanguage,
    },
  }),
}))

describe('AccountDeletionPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    currentLanguage = 'hr'
  })

  it('renders the main title and sections', () => {
    render(
      <MemoryRouter>
        <AccountDeletionPage />
      </MemoryRouter>
    )

    // Main title
    expect(screen.getByText('accountDeletion.title')).toBeInTheDocument()

    // Sections
    expect(screen.getByText('accountDeletion.method1.title')).toBeInTheDocument()
    expect(screen.getByText('accountDeletion.method2.title')).toBeInTheDocument()
    expect(screen.getByText('accountDeletion.whatGetsDeleted.title')).toBeInTheDocument()
    expect(screen.getByText('accountDeletion.dataRetention.title')).toBeInTheDocument()
    expect(screen.getByText('accountDeletion.questions.title')).toBeInTheDocument()
  })

  it('renders links correctly', () => {
    render(
      <MemoryRouter>
        <AccountDeletionPage />
      </MemoryRouter>
    )

    const mailtoLinks = screen.getAllByRole('link', { name: 'info@bookbed.io' })
    expect(mailtoLinks.length).toBe(2)
    mailtoLinks.forEach(link => {
      expect(link).toHaveAttribute('href', 'mailto:info@bookbed.io')
    })

    const privacyLink = screen.getByRole('link', { name: 'bookbed.io/privacy' })
    expect(privacyLink).toBeInTheDocument()
    expect(privacyLink).toHaveAttribute('href', '/privacy')
  })

  it('calls usePageMeta with correct translation keys and noindex', () => {
    render(
      <MemoryRouter>
        <AccountDeletionPage />
      </MemoryRouter>
    )

    expect(usePageMeta).toHaveBeenCalledWith({
      title: 'accountDeletion.meta.title',
      description: 'accountDeletion.meta.description',
      noindex: true,
    })
  })

  it('calls useBreadcrumbSchema with Croatian labels when language is hr', () => {
    currentLanguage = 'hr'
    render(
      <MemoryRouter>
        <AccountDeletionPage />
      </MemoryRouter>
    )

    expect(useBreadcrumbSchema).toHaveBeenCalledWith([
      { name: 'Početna', url: 'https://bookbed.io/' },
      { name: 'Brisanje Računa', url: 'https://bookbed.io/account-deletion/' },
    ])
  })

  it('calls useBreadcrumbSchema with English labels when language is en', () => {
    currentLanguage = 'en'
    render(
      <MemoryRouter>
        <AccountDeletionPage />
      </MemoryRouter>
    )

    expect(useBreadcrumbSchema).toHaveBeenCalledWith([
      { name: 'Home', url: 'https://bookbed.io/' },
      { name: 'Account Deletion', url: 'https://bookbed.io/account-deletion/' },
    ])
  })
})
