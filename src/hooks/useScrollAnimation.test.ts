import { renderHook } from '@testing-library/react'
/**
 * @vitest-environment jsdom
 */

import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import useScrollAnimation from './useScrollAnimation'

describe('useScrollAnimation', () => {
  let mockObserve: ReturnType<typeof vi.fn>
  let mockUnobserve: ReturnType<typeof vi.fn>
  let mockDisconnect: ReturnType<typeof vi.fn>
  let intersectionCallback: IntersectionObserverCallback

  beforeEach(() => {
    mockObserve = vi.fn()
    mockUnobserve = vi.fn()
    mockDisconnect = vi.fn()

    // Mock IntersectionObserver
    const MockIntersectionObserver = vi.fn(function (
      this: IntersectionObserver,
      callback: IntersectionObserverCallback
    ) {
      intersectionCallback = callback
      this.observe = mockObserve
      this.unobserve = mockUnobserve
      this.disconnect = mockDisconnect
    })

    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    document.body.innerHTML = ''
    vi.clearAllMocks()
  })

  it('observes elements matching the selector on mount', () => {
    // Setup DOM
    const div1 = document.createElement('div')
    div1.className = 'test-class'
    const div2 = document.createElement('div')
    div2.className = 'test-class'
    document.body.appendChild(div1)
    document.body.appendChild(div2)

    renderHook(() => useScrollAnimation('.test-class'))

    expect(mockObserve).toHaveBeenCalledTimes(2)
    expect(mockObserve).toHaveBeenCalledWith(div1)
    expect(mockObserve).toHaveBeenCalledWith(div2)
  })

  it('unobserves elements on unmount', () => {
    const div = document.createElement('div')
    div.className = 'test-class'
    document.body.appendChild(div)

    const { unmount } = renderHook(() => useScrollAnimation('.test-class'))

    expect(mockUnobserve).not.toHaveBeenCalled()

    unmount()

    expect(mockUnobserve).toHaveBeenCalledTimes(1)
    expect(mockUnobserve).toHaveBeenCalledWith(div)
  })

  it('adds animate-on-scroll class when element is intersecting', () => {
    const div = document.createElement('div')
    div.className = 'test-class'
    document.body.appendChild(div)

    renderHook(() => useScrollAnimation('.test-class'))

    // Simulate intersection
    const entry = {
      isIntersecting: true,
      target: div,
    } as unknown as IntersectionObserverEntry

    intersectionCallback([entry], {} as IntersectionObserver)

    expect(div.classList.contains('animate-on-scroll')).toBe(true)
    expect(mockUnobserve).toHaveBeenCalledWith(div)
  })

  it('does not add class when element is not intersecting', () => {
    const div = document.createElement('div')
    div.className = 'test-class'
    document.body.appendChild(div)

    renderHook(() => useScrollAnimation('.test-class'))

    // Simulate non-intersection
    const entry = {
      isIntersecting: false,
      target: div,
    } as unknown as IntersectionObserverEntry

    intersectionCallback([entry], {} as IntersectionObserver)

    expect(div.classList.contains('animate-on-scroll')).toBe(false)
    expect(mockUnobserve).not.toHaveBeenCalled()
  })

  it('passes the correct threshold to IntersectionObserver', () => {
    renderHook(() => useScrollAnimation('.test-class', 0.5))

    expect(global.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: 0.5 }
    )
  })
})
