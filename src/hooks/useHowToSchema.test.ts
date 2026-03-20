/** @vitest-environment jsdom */
import { renderHook } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { useHowToSchema } from './useHowToSchema'

describe('useHowToSchema', () => {
  afterEach(() => {
    // Clean up head after each test just in case, though the hook cleans up itself on unmount
    document.head.innerHTML = ''
  })

  const defaultProps = {
    name: 'How to tie a tie',
    description: 'A simple guide to tying a tie.',
    steps: [
      { name: 'Step 1', text: 'Cross the wide end over the narrow end.' },
      { name: 'Step 2', text: 'Bring it under.' },
    ],
  }

  it('should inject HowTo schema into document head on mount', () => {
    renderHook(() => useHowToSchema(defaultProps))

    const script = document.getElementById('howto-schema')
    expect(script).not.toBeNull()
    expect(script?.tagName).toBe('SCRIPT')
    expect(script?.getAttribute('type')).toBe('application/ld+json')

    const schema = JSON.parse(script?.textContent || '{}')
    expect(schema).toEqual({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: defaultProps.name,
      description: defaultProps.description,
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Step 1',
          text: 'Cross the wide end over the narrow end.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Step 2',
          text: 'Bring it under.',
        },
      ],
    })
  })

  it('should update the schema when properties change', () => {
    const { rerender } = renderHook((props) => useHowToSchema(props), {
      initialProps: defaultProps,
    })

    const newProps = {
      name: 'How to bake a cake',
      description: 'A simple recipe.',
      steps: [{ name: 'Mix', text: 'Mix ingredients.' }],
    }

    rerender(newProps)

    const scripts = document.querySelectorAll('#howto-schema')
    expect(scripts.length).toBe(1) // Should replace, not duplicate

    const script = scripts[0]
    const schema = JSON.parse(script.textContent || '{}')
    expect(schema.name).toBe('How to bake a cake')
    expect(schema.description).toBe('A simple recipe.')
    expect(schema.step.length).toBe(1)
    expect(schema.step[0].name).toBe('Mix')
  })

  it('should remove the schema from document head on unmount', () => {
    const { unmount } = renderHook(() => useHowToSchema(defaultProps))

    expect(document.getElementById('howto-schema')).not.toBeNull()

    unmount()

    expect(document.getElementById('howto-schema')).toBeNull()
  })
})
