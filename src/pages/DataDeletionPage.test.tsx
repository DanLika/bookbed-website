import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import DataDeletionPage from './DataDeletionPage'

// Mock the components that use requestAnimationFrame or other browser APIs
// that might be problematic in JSDOM
vi.mock('../components/ui/animations/FadeContent', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

// Mock custom hooks
vi.mock('../hooks/usePageMeta', () => ({
  usePageMeta: vi.fn()
}))

vi.mock('../hooks/useBreadcrumbSchema', () => ({
  useBreadcrumbSchema: vi.fn()
}))

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key: string) => key,
      i18n: {
        language: 'en',
        changeLanguage: () => new Promise(() => {}),
      },
    }
  },
}))

describe('DataDeletionPage', () => {
  it('renders the main title', () => {
    render(
      <MemoryRouter>
        <DataDeletionPage />
      </MemoryRouter>
    )

    expect(screen.getByText('dataDeletion.title')).toBeInTheDocument()
  })

  it('renders the in-app deletion sections', () => {
    render(
      <MemoryRouter>
        <DataDeletionPage />
      </MemoryRouter>
    )

    // Properties
    expect(screen.getByText(/dataDeletion.deleteProperties.title/)).toBeInTheDocument()
    expect(screen.getByText('dataDeletion.deleteProperties.step1')).toBeInTheDocument()

    // Units
    expect(screen.getByText(/dataDeletion.deleteUnits.title/)).toBeInTheDocument()
    expect(screen.getByText('dataDeletion.deleteUnits.step1')).toBeInTheDocument()

    // Bookings
    expect(screen.getByText(/dataDeletion.deleteBookings.title/)).toBeInTheDocument()
    expect(screen.getByText('dataDeletion.deleteBookings.step1')).toBeInTheDocument()
  })

  it('renders the profile data deletion section and email link', () => {
    render(
      <MemoryRouter>
        <DataDeletionPage />
      </MemoryRouter>
    )

    expect(screen.getByText('dataDeletion.deleteProfileData.title')).toBeInTheDocument()

    const emailLink = screen.getByRole('link', { name: 'info@bookbed.io' })
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', 'mailto:info@bookbed.io')
  })

  it('renders the full account deletion link', () => {
    render(
      <MemoryRouter>
        <DataDeletionPage />
      </MemoryRouter>
    )

    expect(screen.getByText('dataDeletion.fullAccountDeletion.title')).toBeInTheDocument()

    const accountDeletionLink = screen.getByRole('link', { name: 'dataDeletion.fullAccountDeletion.button' })
    expect(accountDeletionLink).toBeInTheDocument()
    expect(accountDeletionLink).toHaveAttribute('href', '/account-deletion')
  })
})
