/** @vitest-environment jsdom */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import WidgetPage from './WidgetPage'
import { usePageMeta } from '../hooks/usePageMeta'
import { useBreadcrumbSchema } from '../hooks/useBreadcrumbSchema'

// Mock Hooks
vi.mock('../hooks/usePageMeta', () => ({
  usePageMeta: vi.fn(),
}))

vi.mock('../hooks/useBreadcrumbSchema', () => ({
  useBreadcrumbSchema: vi.fn(),
}))

// Mock UI components
vi.mock('../components/ui/animations/FadeContent', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

vi.mock('../components/ui/animations/GradientText', () => ({
  default: ({ children }: { children: React.ReactNode }) => <span>{children}</span>
}))

vi.mock('../components/ui/GlassIcon', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

vi.mock('../components/ui/animations/GlassIcons', () => ({
  default: () => <div>GlassIcons</div>
}))

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, whileHover, whileTap, initial, animate, ...props }: any) => <div className={className} {...props}>{children}</div>,
    button: ({ children, className, onClick, whileHover, whileTap, initial, animate, ...props }: any) => (
      <button className={className} onClick={onClick} {...props}>
        {children}
      </button>
    ),
    p: ({ children, className, whileHover, whileTap, initial, animate, ...props }: any) => <p className={className} {...props}>{children}</p>,
  },
}))

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'en',
    },
  }),
}))

describe('WidgetPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Mock clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    })
  })

  it('renders the WidgetPage successfully', () => {
    render(
      <MemoryRouter>
        <WidgetPage />
      </MemoryRouter>
    )

    expect(screen.getByText('widget.title')).toBeInTheDocument()
    expect(screen.getByText('widget.subtitle')).toBeInTheDocument()

    // Check mode buttons
    expect(screen.getByText('widget.mode1.title')).toBeInTheDocument()
    expect(screen.getByText('widget.mode2.title')).toBeInTheDocument()
    expect(screen.getByText('widget.mode3.title')).toBeInTheDocument()

    // Check embed code section
    expect(screen.getByText('widget.embedCode')).toBeInTheDocument()

    // SEO hooks called
    expect(usePageMeta).toHaveBeenCalledWith({
      title: 'widget.meta.title',
      description: 'widget.meta.description',
    })
    expect(useBreadcrumbSchema).toHaveBeenCalled()
  })

  it('renders default full mode embed', () => {
    render(
      <MemoryRouter>
        <WidgetPage />
      </MemoryRouter>
    )

    const iframe = screen.getByTitle('BookBed Full Booking Widget')
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute('src', 'https://view.bookbed.io/?property=fg5nlt3aLlx4HWJeqliq&unit=gMIOos56siO74VkCsSwY&embed=true')

    // Verify default description is shown
    expect(screen.getByText('widget.mode1.desc')).toBeInTheDocument()
  })

  it('switches to calendar mode on button click', () => {
    render(
      <MemoryRouter>
        <WidgetPage />
      </MemoryRouter>
    )

    const calendarButton = screen.getByText('widget.mode2.title').closest('button')
    fireEvent.click(calendarButton!)

    // Check iframe
    const iframe = screen.getByTitle('BookBed Calendar Widget')
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute('src', 'https://view.bookbed.io/?property=fg5nlt3aLlx4HWJeqliq&unit=Ot2PzlJYSNXjJIGvicHY&embed=true')

    // Verify description updated
    expect(screen.getByText('widget.mode2.desc')).toBeInTheDocument()
  })

  it('switches to inquiry mode on button click', () => {
    render(
      <MemoryRouter>
        <WidgetPage />
      </MemoryRouter>
    )

    const inquiryButton = screen.getByText('widget.mode3.title').closest('button')
    fireEvent.click(inquiryButton!)

    // Check iframe
    const iframe = screen.getByTitle('BookBed Inquiry Widget')
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute('src', 'https://view.bookbed.io/?property=fg5nlt3aLlx4HWJeqliq&unit=fEAkFrzkjLP6EF2unqLv&embed=true')

    // Verify description updated
    expect(screen.getByText('widget.mode3.desc')).toBeInTheDocument()
  })

  it('copies embed code to clipboard and updates copy button state', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })

    render(
      <MemoryRouter>
        <WidgetPage />
      </MemoryRouter>
    )

    const copyButton = screen.getByTitle('widget.copyCode')

    // Test that it copies and shows "copied"
    fireEvent.click(copyButton)

    expect(navigator.clipboard.writeText).toHaveBeenCalled()
    expect(screen.getByTitle('widget.copied')).toBeInTheDocument()

    // Fast-forward 2 seconds to reset copied state
    // We use waitFor with fake timers for the state update
    await act(async () => {
      await vi.runAllTimersAsync()
    })

    expect(screen.getByTitle('widget.copyCode')).toBeInTheDocument()

    vi.useRealTimers()
  })
})
