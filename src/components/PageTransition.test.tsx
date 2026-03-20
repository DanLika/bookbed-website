/** @vitest-environment jsdom */
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PageTransition from './PageTransition'

describe('PageTransition Component', () => {
  it('renders correctly with children elements', () => {
    render(
      <PageTransition>
        <div data-testid="child-element">Test Content</div>
      </PageTransition>
    )

    const childElement = screen.getByTestId('child-element')
    expect(childElement).toBeInTheDocument()
    expect(childElement.parentElement).toHaveClass('animate-page-enter')
  })

  it('renders correctly with plain text children', () => {
    render(<PageTransition>Plain text content</PageTransition>)

    const textElement = screen.getByText('Plain text content')
    expect(textElement).toBeInTheDocument()
    // When the child is just plain text, getByText returns the wrapping element
    expect(textElement).toHaveClass('animate-page-enter')
  })

  it('renders correctly with empty children', () => {
    const { container } = render(<PageTransition>{null}</PageTransition>)
    expect(container.firstChild).toHaveClass('animate-page-enter')
    expect(container.firstChild).toBeEmptyDOMElement()
  })
})
