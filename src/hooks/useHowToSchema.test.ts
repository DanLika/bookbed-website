import { renderHook } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { useHowToSchema } from './useHowToSchema'

describe('useHowToSchema', () => {
  beforeEach(() => {
    document.head.innerHTML = ''
  })

  afterEach(() => {
    document.head.innerHTML = ''
  })

  const defaultProps = {
    name: 'How to Tie a Tie',
    description: 'Learn how to tie a standard necktie.',
    steps: [
      { name: 'Step 1', text: 'Drape the tie around your neck.' },
      { name: 'Step 2', text: 'Cross the wide end over the narrow end.' },
    ],
  }

  it('should create and append a script element with the correct JSON-LD schema', () => {
    renderHook(() => useHowToSchema(defaultProps))

    const script = document.getElementById('howto-schema') as HTMLScriptElement
    expect(script).not.toBeNull()
    expect(script.type).toBe('application/ld+json')

    const schema = JSON.parse(script.textContent || '')
    expect(schema).toEqual({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Tie a Tie',
      description: 'Learn how to tie a standard necktie.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Step 1',
          text: 'Drape the tie around your neck.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Step 2',
          text: 'Cross the wide end over the narrow end.',
        },
      ],
    })
  })

  it('should update the schema when props change', () => {
    const { rerender } = renderHook(
      (props) => useHowToSchema(props),
      { initialProps: defaultProps }
    )

    let script = document.getElementById('howto-schema') as HTMLScriptElement
    let schema = JSON.parse(script.textContent || '')
    expect(schema.name).toBe('How to Tie a Tie')

    const updatedProps = {
      ...defaultProps,
      name: 'How to Tie a Bow Tie',
      description: 'Learn how to tie a bow tie.',
    }

    rerender(updatedProps)

    script = document.getElementById('howto-schema') as HTMLScriptElement
    schema = JSON.parse(script.textContent || '')

    expect(schema.name).toBe('How to Tie a Bow Tie')
    expect(schema.description).toBe('Learn how to tie a bow tie.')
    // Make sure it doesn't duplicate the script element
    const scripts = document.querySelectorAll('#howto-schema')
    expect(scripts.length).toBe(1)
  })

  it('should remove the script element on unmount', () => {
    const { unmount } = renderHook(() => useHowToSchema(defaultProps))

    let script = document.getElementById('howto-schema')
    expect(script).not.toBeNull()

    unmount()

    script = document.getElementById('howto-schema')
    expect(script).toBeNull()
  })
})
