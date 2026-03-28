import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HeroSection from './HeroSection'

// Mock useTranslation
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

// Mock nested components to avoid animation/WebGL issues in JSDOM
vi.mock('./ui/animations/ShinyText', () => ({
  default: ({ text }: { text: string }) => <div data-testid="shiny-text">{text}</div>,
}))

vi.mock('./ui/animations/StarBorder', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="star-border">{children}</div>,
}))

vi.mock('./ui/backgrounds/GridScan', () => ({
  default: () => <div data-testid="grid-scan" />,
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

describe('HeroSection', () => {
  beforeEach(() => {
    // Clear document state before each test
    document.documentElement.className = ''
    vi.clearAllMocks()
  })

  afterEach(() => {
    // Clean up document state after each test
    document.documentElement.className = ''
  })

  it('renders correctly initially with light theme (no .dark class on html)', async () => {
    vi.useFakeTimers()
    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>
    )

    await act(async () => {
      await vi.runAllTimersAsync()
    })

    // Find the light theme image which should not be hidden in light mode
    // The component sets 'dark:hidden' on the light version image, and 'hidden dark:block' on the dark version.
    // In our test environment without a real browser interpreting Tailwind, both elements are in the DOM,
    // but we can check if they rendered.

    const lightImage = screen.getAllByAltText('hero.alt')[0]
    const darkImage = screen.getAllByAltText('hero.alt')[1]

    expect(lightImage).toBeInTheDocument()
    expect(darkImage).toBeInTheDocument()

    // Light image should have 'dark:hidden'
    expect(lightImage.className).toContain('dark:hidden')

    // Dark image should have 'hidden dark:block'
    expect(darkImage.className).toContain('hidden dark:block')

    vi.useRealTimers()
  })

  it('detects theme change via MutationObserver when .dark class is added to html element', async () => {
    vi.useFakeTimers()
    let container: HTMLElement
    let unmount: () => void

    const result = render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>
    )
    container = result.container
    unmount = result.unmount

    await act(async () => {
      await vi.runAllTimersAsync()
    })

    // Wait for initial render to complete
    await act(async () => {
      // Simulate adding 'dark' class to document.documentElement
      document.documentElement.classList.add('dark')
    })

    await act(async () => {
      // Let's actually check if GridScan lazy load is triggered by waiting for next tick
      await vi.runAllTimersAsync()
    })

    expect(screen.getByTestId('grid-scan')).toBeInTheDocument()

    // Remove dark class
    await act(async () => {
      document.documentElement.classList.remove('dark')
    })

    await act(async () => {
      await vi.runAllTimersAsync()
    })

    const lightImage = screen.getAllByAltText('hero.alt')[0]
    const darkImage = screen.getAllByAltText('hero.alt')[1]

    // Light image should be visible again, dark image should be hidden
    expect(lightImage.className).toContain('dark:hidden')
    expect(darkImage.className).toContain('hidden dark:block')
    expect(screen.queryByTestId('grid-scan')).not.toBeInTheDocument()

    if (unmount) {
      unmount()
    }
    vi.useRealTimers()
  })

  it('detects initial dark theme correctly when .dark class is present on html before render', async () => {
    vi.useFakeTimers()
    document.documentElement.classList.add('dark')

    let unmount: () => void

    const result = render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>
    )
    unmount = result.unmount

    // Wait for lazy components if any
    await act(async () => {
      await vi.runAllTimersAsync()
    })

    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(screen.getByTestId('grid-scan')).toBeInTheDocument()

    if (unmount) {
        unmount()
    }
    vi.useRealTimers()
  })
})
