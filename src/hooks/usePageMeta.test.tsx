import { renderHook } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { usePageMeta } from './usePageMeta'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: { language: 'en' }
  })
}))

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
      <meta name="robots" content="index, follow" />
      <meta property="og:image" content="initial-og-image.jpg" />
      <meta name="twitter:image" content="initial-twitter-image.jpg" />
      <link rel="alternate" hreflang="en" href="https://bookbed.io/old-en" />
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

  it('should handle noindex prop correctly', () => {
    const { rerender } = renderHook((props: { noindex?: boolean }) => usePageMeta({ title: 'Title', description: 'Desc', noindex: props.noindex }), {
      wrapper: ({ children }) => <MemoryRouter initialEntries={['/path']}>{children}</MemoryRouter>,
      initialProps: { noindex: true }
    })

    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex, nofollow')

    rerender({ noindex: false })
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('index, follow')
  })

  it('should handle ogImage prop correctly with absolute and relative URLs', () => {
    const { rerender } = renderHook((props: { ogImage?: string }) => usePageMeta({ title: 'Title', description: 'Desc', ogImage: props.ogImage }), {
      wrapper: ({ children }) => <MemoryRouter initialEntries={['/path']}>{children}</MemoryRouter>,
      initialProps: { ogImage: '/relative-image.jpg' }
    })

    expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe('https://bookbed.io/relative-image.jpg')
    expect(document.querySelector('meta[name="twitter:image"]')?.getAttribute('content')).toBe('https://bookbed.io/relative-image.jpg')

    rerender({ ogImage: 'https://other-site.com/absolute-image.jpg' })
    expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe('https://other-site.com/absolute-image.jpg')
    expect(document.querySelector('meta[name="twitter:image"]')?.getAttribute('content')).toBe('https://other-site.com/absolute-image.jpg')
  })

  it('should update hreflang tags to match current page canonical URL', () => {
    renderHook(() => usePageMeta({ title: 'Title', description: 'Desc' }), {
      wrapper: ({ children }) => <MemoryRouter initialEntries={['/new-path']}>{children}</MemoryRouter>
    })

    const hreflangTag = document.querySelector('link[hreflang="en"]')
    expect(hreflangTag?.getAttribute('href')).toBe('https://bookbed.io/new-path/')
  })

  it('should restore previous values on unmount', () => {
    const { unmount } = renderHook(() => usePageMeta({ title: 'Temporary Title', description: 'Temporary Description', ogImage: 'temp.jpg', noindex: true }), {
      wrapper: ({ children }) => <MemoryRouter initialEntries={['/temp-path']}>{children}</MemoryRouter>
    })

    // Verify changed
    expect(document.title).toBe('Temporary Title')

    // Unmount
    unmount()

    // Verify restored
    expect(document.title).toBe('Initial Title')
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe('Initial description')
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('index, follow')
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://bookbed.io/initial/')
    expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe('Initial OG Title')
    expect(document.querySelector('meta[property="og:description"]')?.getAttribute('content')).toBe('Initial OG Description')
    expect(document.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe('https://bookbed.io/initial-og/')
    expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe('initial-og-image.jpg')
    expect(document.querySelector('meta[name="twitter:title"]')?.getAttribute('content')).toBe('Initial Twitter Title')
    expect(document.querySelector('meta[name="twitter:description"]')?.getAttribute('content')).toBe('Initial Twitter Description')
    expect(document.querySelector('meta[name="twitter:image"]')?.getAttribute('content')).toBe('initial-twitter-image.jpg')
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
