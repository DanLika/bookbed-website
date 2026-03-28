import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PageTransition from './PageTransition'

describe('PageTransition Component', () => {
  it('renders children correctly', () => {
    render(
      <PageTransition>
        <div data-testid="test-child">Test Content</div>
      </PageTransition>
    )

    const childElement = screen.getByTestId('test-child')
    expect(childElement).toBeInTheDocument()
    expect(childElement).toHaveTextContent('Test Content')
  })

  it('applies the animate-page-enter class to the wrapper div', () => {
    const { container } = render(
      <PageTransition>
        <div>Content</div>
      </PageTransition>
    )

    // The wrapper div is the first child of the container
    const wrapperElement = container.firstChild
    expect(wrapperElement).toHaveClass('animate-page-enter')
  })
})
