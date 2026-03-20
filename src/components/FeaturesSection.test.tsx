import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import FeaturesSection from './FeaturesSection'

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue?: string) => {
      // Return a predictable string based on the key
      if (key === 'features.badge') return 'Features Badge'
      if (key === 'features.title') return 'Features Title'
      if (key === 'features.subtitle') return 'Features Subtitle'
      return defaultValue || key
    }
  })
}))

// Mock UI animations to avoid jsdom/browser API issues
vi.mock('./ui/animations/FadeContent', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="fade-content-mock">{children}</div>
}))

vi.mock('./ui/animations/BlurText', () => ({
  default: ({ text }: { text: string }) => <span data-testid="blur-text-mock">{text}</span>
}))

// Mock OnboardingStepper component
vi.mock('./ui/OnboardingStepper', () => ({
  default: () => <div data-testid="onboarding-stepper-mock">Stepper Mock</div>
}))

describe('FeaturesSection', () => {
  it('renders the features section with correct id', () => {
    const { container } = render(<FeaturesSection />)
    const section = container.querySelector('section#features')
    expect(section).toBeInTheDocument()
  })

  it('renders the translated texts correctly', () => {
    render(<FeaturesSection />)

    // Check badge
    expect(screen.getByText('Features Badge')).toBeInTheDocument()

    // Check title (rendered inside BlurText mock)
    const blurTextMock = screen.getByTestId('blur-text-mock')
    expect(blurTextMock).toHaveTextContent('Features Title')

    // Check subtitle
    expect(screen.getByText('Features Subtitle')).toBeInTheDocument()
  })

  it('renders the child components correctly', () => {
    render(<FeaturesSection />)

    // Check FadeContent
    expect(screen.getByTestId('fade-content-mock')).toBeInTheDocument()

    // Check OnboardingStepper
    expect(screen.getByTestId('onboarding-stepper-mock')).toBeInTheDocument()
  })
})
