import { renderHook } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { usePageMeta } from './usePageMeta'

describe('usePageMeta', () => {
  beforeEach(() => {
    // We must append to body because jsdom might not let us set document.title directly without a proper DOM elements
    // actually document.title sets the text of <title> in <head>.
    // Let's create a title element if it doesn't exist
    document.head.innerHTML = `
      <title>Initial Title</title>
      <meta name="description" content="Initial description" />
      <link rel="canonical" href="https://bookbed.io/initial/" />
      <meta property="og:title" content="Initial OG Title" />
      <meta property="og:description" content="Initial OG Description" />
      <meta property="og:url" content="https://bookbed.io/initial-og/" />
      <meta name="twitter:title" content="Initial Twitter Title" />
      <meta name="twitter:description" content="Initial Twitter Description" />
    `
  })

  afterEach(() => {
    document.head.innerHTML = ''
  })

  it('should update document title, meta tags, and canonical URL on mount', () => {
    renderHook(() => usePageMeta({ title: 'New Title', description: 'New Description' }), {
      wrapper: ({ children }) => <MemoryRouter initialEntries={['/test-path']}>{children}</MemoryRouter>
    })

    expect(document.title).toBe('New Title')

    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe('New Description')
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://bookbed.io/test-path/')

    expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe('New Title')
    expect(document.querySelector('meta[property="og:description"]')?.getAttribute('content')).toBe('New Description')
    expect(document.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe('https://bookbed.io/test-path/')

    expect(document.querySelector('meta[name="twitter:title"]')?.getAttribute('content')).toBe('New Title')
    expect(document.querySelector('meta[name="twitter:description"]')?.getAttribute('content')).toBe('New Description')
  })

  it('should handle root path canonical URL correctly', () => {
    renderHook(() => usePageMeta({ title: 'Home', description: 'Home Desc' }), {
      wrapper: ({ children }) => <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
    })

    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://bookbed.io/')
  })

  it('should restore previous values on unmount', () => {
    const { unmount } = renderHook(() => usePageMeta({ title: 'Temporary Title', description: 'Temporary Description' }), {
      wrapper: ({ children }) => <MemoryRouter initialEntries={['/temp-path']}>{children}</MemoryRouter>
    })

    // Verify changed
    expect(document.title).toBe('Temporary Title')

    // Unmount
    unmount()

    // Verify restored
    expect(document.title).toBe('Initial Title')
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe('Initial description')
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://bookbed.io/initial/')
    expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe('Initial OG Title')
    expect(document.querySelector('meta[property="og:description"]')?.getAttribute('content')).toBe('Initial OG Description')
    expect(document.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe('https://bookbed.io/initial-og/')
    expect(document.querySelector('meta[name="twitter:title"]')?.getAttribute('content')).toBe('Initial Twitter Title')
    expect(document.querySelector('meta[name="twitter:description"]')?.getAttribute('content')).toBe('Initial Twitter Description')
  })

  it('should not throw when meta tags are missing', () => {
    // Clear head entirely
    document.head.innerHTML = ''

    expect(() => {
      renderHook(() => usePageMeta({ title: 'Missing Tags', description: 'Desc' }), {
        wrapper: ({ children }) => <MemoryRouter initialEntries={['/missing']}>{children}</MemoryRouter>
      })
    }).not.toThrow()
  })
})
