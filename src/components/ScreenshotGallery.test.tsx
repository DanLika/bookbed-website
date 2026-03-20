/** @vitest-environment jsdom */
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import ScreenshotGallery from './ScreenshotGallery'

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (_key: string, defaultValue: string) => defaultValue,
  }),
}))

// Mock FadeContent
vi.mock('./ui/animations/FadeContent', () => ({
  default: ({ children }: any) => <div>{children}</div>,
}))

describe('ScreenshotGallery', () => {
  beforeEach(() => {
    // Clear any class from html element
    document.documentElement.className = ''
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders correctly with title and subtitle', () => {
    render(<ScreenshotGallery />)

    expect(screen.getByText('See It In Action')).toBeInTheDocument()
    expect(screen.getByText('Beautiful, intuitive interface designed for property owners')).toBeInTheDocument()
  })

  it('renders 6 gallery images', () => {
    render(<ScreenshotGallery />)

    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(6)
  })

  it('initially renders light mode images when dark class is not present', () => {
    render(<ScreenshotGallery />)

    const images = screen.getAllByRole('img') as HTMLImageElement[]

    // Check first and last image as representative examples
    expect(images[0].src).toContain('dashboard-light.avif')
    expect(images[5].src).toContain('unit-hub-widget-light.avif')

    // Ensure no dark images are rendered
    images.forEach(img => {
      expect(img.src).not.toContain('-dark.avif')
    })
  })

  it('renders dark mode images when dark class is present', () => {
    // Set dark mode before rendering
    document.documentElement.classList.add('dark')

    render(<ScreenshotGallery />)

    const images = screen.getAllByRole('img') as HTMLImageElement[]

    // Check first and last image as representative examples
    expect(images[0].src).toContain('dashboard-dark.avif')
    expect(images[5].src).toContain('unit-hub-widget-dark.avif')

    // Ensure no light images are rendered
    images.forEach(img => {
      expect(img.src).not.toContain('-light.avif')
    })
  })
})
