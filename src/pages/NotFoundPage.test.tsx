import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NotFoundPage from './NotFoundPage'

// Mock the components that use requestAnimationFrame or other browser APIs
// that might be problematic in JSDOM
vi.mock('../components/ui/animations/FuzzyText', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

vi.mock('../components/ui/animations/FadeContent', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (_key: string, defaultValue: string) => defaultValue,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    }
  },
}))

describe('NotFoundPage', () => {
  it('renders the 404 text', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )

    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('renders the title', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )

    expect(screen.getByText('Page Not Found')).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )

    expect(screen.getByText("The page you're looking for doesn't exist or has been moved.")).toBeInTheDocument()
  })

  it('renders the back to home link with correct href', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )

    const link = screen.getByRole('link', { name: /back to home/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })
})
