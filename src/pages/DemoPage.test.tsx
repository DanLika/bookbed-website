/** @vitest-environment jsdom */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import DemoPage from './DemoPage'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { whileHover, ...rest } = props
      return <div {...rest}>{children}</div>
    }
  }
}))

// Mock UI animation components
vi.mock('../components/ui/animations/FadeContent', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

vi.mock('../components/ui/animations/GradientText', () => ({
  default: ({ children }: { children: React.ReactNode }) => <span>{children}</span>
}))

vi.mock('../components/ui/GlassIcon', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

// Mock hooks
vi.mock('../hooks/usePageMeta', () => ({
  usePageMeta: vi.fn()
}))

vi.mock('../hooks/useBreadcrumbSchema', () => ({
  useBreadcrumbSchema: vi.fn()
}))

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue?: string) => defaultValue || key,
    i18n: {
      language: 'en'
    }
  })
}))

describe('DemoPage', () => {
  beforeEach(() => {
    // Clear any existing scripts in document head to avoid test pollution
    const scripts = document.head.querySelectorAll('script')
    scripts.forEach(script => script.remove())
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders title and subtitle correctly', () => {
    render(<DemoPage />)
    expect(screen.getByText('demo.title')).toBeInTheDocument()
    // It renders subtitle twice (once in the hero, once in the schema hook though not visible, but getByText will find the visible one)
    expect(screen.getAllByText('demo.subtitle')[0]).toBeInTheDocument()
    expect(screen.getByText('Video Tutorials')).toBeInTheDocument()
  })

  it('renders 4 video placeholders', () => {
    render(<DemoPage />)
    const placeholders = screen.getAllByText('Video coming soon')
    expect(placeholders).toHaveLength(4)

    // Check if the specific demo text keys are rendered
    expect(screen.getByText('demo.video1.title')).toBeInTheDocument()
    expect(screen.getByText('demo.video2.title')).toBeInTheDocument()
    expect(screen.getByText('demo.video3.title')).toBeInTheDocument()
    expect(screen.getByText('demo.video4.title')).toBeInTheDocument()
  })

  it('appends application/ld+json schema on mount', () => {
    render(<DemoPage />)
    const schemaScript = document.getElementById('demo-video-schema')
    expect(schemaScript).toBeInTheDocument()
    expect(schemaScript?.getAttribute('type')).toBe('application/ld+json')

    // Verify the content of the schema
    const schemaContent = JSON.parse(schemaScript?.textContent || '{}')
    expect(schemaContent['@type']).toBe('ItemList')
    expect(schemaContent.name).toBe('BookBed Video Demos')
    expect(schemaContent.itemListElement).toHaveLength(4)
  })

  it('cleans up application/ld+json schema on unmount', () => {
    const { unmount } = render(<DemoPage />)

    // Schema should be there initially
    expect(document.getElementById('demo-video-schema')).toBeInTheDocument()

    unmount()

    // Schema should be removed after unmount
    expect(document.getElementById('demo-video-schema')).not.toBeInTheDocument()
  })
})
