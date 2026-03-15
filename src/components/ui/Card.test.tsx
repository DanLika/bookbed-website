import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Card from './Card'

describe('Card Component', () => {
  it('renders correctly with children', () => {
    render(<Card>Test Content</Card>)
    const element = screen.getByText('Test Content')
    expect(element).toBeInTheDocument()
  })

  it('applies base styles correctly', () => {
    render(<Card>Base Styles Test</Card>)
    const element = screen.getByText('Base Styles Test')
    expect(element).toHaveClass('bg-white')
    expect(element).toHaveClass('dark:bg-zinc-800')
    expect(element).toHaveClass('rounded-2xl')
    expect(element).toHaveClass('border')
    expect(element).toHaveClass('border-gray-200')
    expect(element).toHaveClass('dark:border-zinc-700')
    expect(element).toHaveClass('transition-all')
    expect(element).toHaveClass('duration-300')
  })

  it('applies default hover styles when hover prop is true (default)', () => {
    render(<Card>Hover Styles Test</Card>)
    const element = screen.getByText('Hover Styles Test')
    expect(element).toHaveClass('hover:border-primary')
    expect(element).toHaveClass('dark:hover:border-primary-light')
    expect(element).toHaveClass('hover:shadow-xl')
    expect(element).toHaveClass('hover:shadow-purple/10')
    expect(element).toHaveClass('hover:-translate-y-1')
  })

  it('does not apply hover styles when hover prop is false', () => {
    render(<Card hover={false}>No Hover Styles Test</Card>)
    const element = screen.getByText('No Hover Styles Test')
    expect(element).not.toHaveClass('hover:border-primary')
    expect(element).not.toHaveClass('dark:hover:border-primary-light')
    expect(element).not.toHaveClass('hover:shadow-xl')
    expect(element).not.toHaveClass('hover:shadow-purple/10')
    expect(element).not.toHaveClass('hover:-translate-y-1')
  })

  it('applies custom className alongside default classes', () => {
    render(<Card className="custom-test-class">Custom Class Test</Card>)
    const element = screen.getByText('Custom Class Test')
    expect(element).toHaveClass('bg-white') // base class
    expect(element).toHaveClass('custom-test-class') // custom class
  })
})
