import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import {
  SyncAnimation,
  EmailAnimation,
  ManualChaosAnimation,
  AutomatedAnimation,
  PaymentAnimation,
  MultiPropertyAnimation,
  BentoAnimations,
} from './BentoAnimations'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => {
  const React = require('react')

  // Helper to create a functional component that strips motion props
  const createMockComponent = (Tag: any) => {
    return React.forwardRef(({
      animate,
      initial,
      transition,
      whileHover,
      whileTap,
      style,
      ...props
    }: any, ref: any) => {
      // Keep only regular React/HTML props and style if it doesn't have animation-specific objects
      return React.createElement(Tag, { ...props, ref, style })
    })
  }

  return {
    motion: {
      div: createMockComponent('div'),
      svg: createMockComponent('svg'),
      path: createMockComponent('path'),
      rect: createMockComponent('rect'),
      circle: createMockComponent('circle'),
    },
    AnimatePresence: ({ children }: any) => children,
  }
})

describe('BentoAnimations', () => {
  it('should render SyncAnimation without crashing', () => {
    const { container } = render(<SyncAnimation />)
    expect(container.firstChild).toBeInTheDocument()
    // It should have an svg inside
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('should render EmailAnimation without crashing', () => {
    const { container } = render(<EmailAnimation />)
    expect(container.firstChild).toBeInTheDocument()
    // It should render 3 email items
    expect(container.querySelectorAll('svg')).toHaveLength(3)
  })

  it('should render ManualChaosAnimation without crashing', () => {
    const { container } = render(<ManualChaosAnimation />)
    expect(container.firstChild).toBeInTheDocument()
    // 1 frustrated person + 6 excel sheets = 7 svgs
    expect(container.querySelectorAll('svg')).toHaveLength(7)
  })

  it('should render AutomatedAnimation without crashing', () => {
    const { container } = render(<AutomatedAnimation />)
    expect(container.firstChild).toBeInTheDocument()
    // 1 happy person + 6 checkmarks = 7 svgs
    expect(container.querySelectorAll('svg')).toHaveLength(7)
  })

  it('should render PaymentAnimation without crashing', () => {
    const { container } = render(<PaymentAnimation />)
    expect(container.firstChild).toBeInTheDocument()
    // 1 checkmark svg
    expect(container.querySelectorAll('svg')).toHaveLength(1)
  })

  it('should render MultiPropertyAnimation without crashing', () => {
    const { container } = render(<MultiPropertyAnimation />)
    expect(container.firstChild).toBeInTheDocument()
    // 6 property icons
    expect(container.querySelectorAll('svg')).toHaveLength(6)
  })

  it('should export all animations in the BentoAnimations object', () => {
    expect(BentoAnimations).toBeDefined()
    expect(BentoAnimations.sync).toBe(SyncAnimation)
    expect(BentoAnimations.email).toBe(EmailAnimation)
    expect(BentoAnimations.manualChaos).toBe(ManualChaosAnimation)
    expect(BentoAnimations.automated).toBe(AutomatedAnimation)
    expect(BentoAnimations.payment).toBe(PaymentAnimation)
    expect(BentoAnimations.multiProperty).toBe(MultiPropertyAnimation)
  })
})
