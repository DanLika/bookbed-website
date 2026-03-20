/** @vitest-environment jsdom */
import { renderHook } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { useBreadcrumbSchema } from './useBreadcrumbSchema'

describe('useBreadcrumbSchema', () => {
  beforeEach(() => {
    document.head.innerHTML = ''
  })

  afterEach(() => {
    document.head.innerHTML = ''
  })

  it('should append the JSON-LD script to document head with correct schema', () => {
    const items = [
      { name: 'Home', url: 'https://example.com' },
      { name: 'About', url: 'https://example.com/about' },
    ]

    renderHook(() => useBreadcrumbSchema(items))

    const script = document.getElementById('breadcrumb-schema') as HTMLScriptElement
    expect(script).not.toBeNull()
    expect(script.type).toBe('application/ld+json')

    const schema = JSON.parse(script.textContent || '{}')
    expect(schema).toEqual({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://example.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'About',
          item: 'https://example.com/about',
        },
      ],
    })
  })

  it('should update the script when items change', () => {
    const initialItems = [{ name: 'Home', url: 'https://example.com' }]
    const updatedItems = [
      { name: 'Home', url: 'https://example.com' },
      { name: 'Blog', url: 'https://example.com/blog' },
    ]

    const { rerender } = renderHook(({ items }) => useBreadcrumbSchema(items), {
      initialProps: { items: initialItems },
    })

    let script = document.getElementById('breadcrumb-schema') as HTMLScriptElement
    let schema = JSON.parse(script.textContent || '{}')
    expect(schema.itemListElement).toHaveLength(1)

    rerender({ items: updatedItems })

    script = document.getElementById('breadcrumb-schema') as HTMLScriptElement
    schema = JSON.parse(script.textContent || '{}')
    expect(schema.itemListElement).toHaveLength(2)
    expect(schema.itemListElement[1].name).toBe('Blog')

    const scripts = document.querySelectorAll('#breadcrumb-schema')
    expect(scripts).toHaveLength(1)
  })

  it('should remove the script on unmount', () => {
    const items = [{ name: 'Home', url: 'https://example.com' }]
    const { unmount } = renderHook(() => useBreadcrumbSchema(items))

    expect(document.getElementById('breadcrumb-schema')).not.toBeNull()

    unmount()

    expect(document.getElementById('breadcrumb-schema')).toBeNull()
  })

  it('should remove existing script on mount to avoid duplicates', () => {
    const existingScript = document.createElement('script')
    existingScript.type = 'application/ld+json'
    existingScript.id = 'breadcrumb-schema'
    existingScript.textContent = '{"old": "schema"}'
    document.head.appendChild(existingScript)

    const items = [{ name: 'Home', url: 'https://example.com' }]
    renderHook(() => useBreadcrumbSchema(items))

    const scripts = document.querySelectorAll('#breadcrumb-schema')
    expect(scripts).toHaveLength(1)

    const script = document.getElementById('breadcrumb-schema') as HTMLScriptElement
    const schema = JSON.parse(script.textContent || '{}')
    expect(schema['@type']).toBe('BreadcrumbList')
  })
})
