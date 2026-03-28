import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import ScreenshotGallery from './ScreenshotGallery'

// Mock FadeContent
vi.mock('./ui/animations/FadeContent', () => ({
  default: ({ children }: any) => <div data-testid="fade-content">{children}</div>
}))

// Mock translations
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (_key: string, fallback: string) => fallback
  })
}))

describe('ScreenshotGallery', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark')
    document.head.innerHTML = ''
    vi.useFakeTimers()
  })

  afterEach(() => {
    document.documentElement.classList.remove('dark')
    document.head.innerHTML = ''
    vi.clearAllMocks()
    vi.useRealTimers()
  })

  it('renders correctly', () => {
    render(<ScreenshotGallery />)
    expect(screen.getByText('See It In Action')).toBeInTheDocument()
  })

  it('updates images when dark mode changes', async () => {
    const { unmount } = render(<ScreenshotGallery />)

    const dashboardImg = screen.getByAltText('Dashboard')
    expect(dashboardImg).toHaveAttribute('src', '/images/gallery/dashboard-light.avif')

    // Change to dark mode
    await act(async () => {
      document.documentElement.classList.add('dark')
      // Advance timers by a small amount to trigger MutationObserver callbacks
      await vi.advanceTimersByTimeAsync(100)
    })

    expect(dashboardImg).toHaveAttribute('src', '/images/gallery/dashboard-dark.avif')

    // Change back to light mode
    await act(async () => {
      document.documentElement.classList.remove('dark')
      await vi.advanceTimersByTimeAsync(100)
    })

    expect(dashboardImg).toHaveAttribute('src', '/images/gallery/dashboard-light.avif')

    // Since MutationObserver is cleaned up on unmount, call unmount to prevent memory leaks or warnings
    unmount()
  })
})
