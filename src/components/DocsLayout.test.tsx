/** @vitest-environment jsdom */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import DocsLayout from './DocsLayout'

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue?: string) => defaultValue || key,
  }),
}))

describe('DocsLayout', () => {
  beforeEach(() => {
    // Reset body style before each test
    document.body.style.overflow = ''
  })

  it('renders the children content', () => {
    render(
      <MemoryRouter>
        <DocsLayout>
          <div data-testid="test-child">Test Content</div>
        </DocsLayout>
      </MemoryRouter>
    )

    expect(screen.getByTestId('test-child')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('toggles the mobile sidebar when menu button is clicked', () => {
    render(
      <MemoryRouter>
        <DocsLayout>
          <div>Test Content</div>
        </DocsLayout>
      </MemoryRouter>
    )

    // The mobile menu button
    const menuButton = screen.getByRole('button', { name: /open menu/i })

    // Initially sidebar is closed (translate-x-full or similar class is applied)
    // We can check aria-expanded
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    // Click to open
    fireEvent.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    // Verify body overflow is hidden
    expect(document.body.style.overflow).toBe('hidden')

    // Click to close
    fireEvent.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    // Verify body overflow is restored
    expect(document.body.style.overflow).toBe('')
  })

  it('closes the mobile sidebar when Escape key is pressed', () => {
    render(
      <MemoryRouter>
        <DocsLayout>
          <div>Test Content</div>
        </DocsLayout>
      </MemoryRouter>
    )

    const menuButton = screen.getByRole('button', { name: /open menu/i })

    // Open sidebar
    fireEvent.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    // Press Escape
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })

    // Sidebar should be closed
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    expect(document.body.style.overflow).toBe('')
  })

  it('closes the mobile sidebar when clicking the overlay', () => {
    const { container } = render(
      <MemoryRouter>
        <DocsLayout>
          <div>Test Content</div>
        </DocsLayout>
      </MemoryRouter>
    )

    const menuButton = screen.getByRole('button', { name: /open menu/i })

    // Open sidebar
    fireEvent.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    // Find overlay and click it
    // The overlay has className "lg:hidden fixed inset-0 z-30 bg-black/50"
    const overlay = container.querySelector('.bg-black\\/50')
    expect(overlay).not.toBeNull()
    if (overlay) {
      fireEvent.click(overlay)
    }

    // Sidebar should be closed
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    expect(document.body.style.overflow).toBe('')
  })
})
