import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import FinalCTASection from './FinalCTASection'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, _defaultValue?: string) => key,
  }),
}))

vi.mock('./ui/animations/FadeContent', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

vi.mock('./ui/animations/BlurText', () => ({
  default: ({ text, as: Component = 'div', className }: { text: string, as?: any, className?: string }) => (
    <Component className={className}>{text}</Component>
  ),
}))

describe('FinalCTASection', () => {
  it('renders correctly with translated title and subtitle', () => {
    render(<FinalCTASection />)

    expect(screen.getByText('cta.title')).toBeInTheDocument()
    expect(screen.getByText('cta.subtitle')).toBeInTheDocument()
  })

  it('renders download links with correct attributes and text', () => {
    render(<FinalCTASection />)

    // Check App Store link
    const appStoreLink = screen.getByRole('link', { name: /App Store/i })
    expect(appStoreLink).toHaveAttribute('href', 'https://apps.apple.com/ba/app/bookbed/id6758141353')
    expect(appStoreLink).toHaveAttribute('target', '_blank')
    expect(appStoreLink).toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.getByText('hero.downloadIosPrefix')).toBeInTheDocument()
    expect(screen.getByText('App Store')).toBeInTheDocument()

    // Check Google Play link
    const googlePlayLink = screen.getByRole('link', { name: /Google Play/i })
    expect(googlePlayLink).toHaveAttribute('href', 'https://play.google.com/store/apps/details?id=io.bookbed.app')
    expect(googlePlayLink).toHaveAttribute('target', '_blank')
    expect(googlePlayLink).toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.getByText('hero.downloadAndroidPrefix')).toBeInTheDocument()
    expect(screen.getByText('Google Play')).toBeInTheDocument()
  })
})
