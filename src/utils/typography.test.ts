import { describe, it, expect } from 'vitest'
import { typography, containers } from './typography'

describe('typography utilities', () => {
  describe('typography object', () => {
    it('contains exactly the expected keys', () => {
      const expectedKeys = ['h1', 'h2', 'h3', 'subtitle', 'body']
      expect(Object.keys(typography)).toEqual(expect.arrayContaining(expectedKeys))
      expect(Object.keys(typography).length).toBe(expectedKeys.length)
    })

    it('has the correct values for headings', () => {
      expect(typography.h1).toBe('text-[clamp(2rem,6vw,4.5rem)]')
      expect(typography.h2).toBe('text-[clamp(1.75rem,5vw,3.5rem)]')
      expect(typography.h3).toBe('text-[clamp(1.25rem,3vw,2rem)]')
    })

    it('has the correct values for body and subtitle text', () => {
      expect(typography.subtitle).toBe('text-[clamp(1rem,2.5vw,1.5rem)]')
      expect(typography.body).toBe('text-[clamp(0.9375rem,1.5vw,1.125rem)]')
    })
  })

  describe('containers object', () => {
    it('contains exactly the expected keys', () => {
      const expectedKeys = ['hero', 'section']
      expect(Object.keys(containers)).toEqual(expect.arrayContaining(expectedKeys))
      expect(Object.keys(containers).length).toBe(expectedKeys.length)
    })

    it('has the correct responsive classes for hero container', () => {
      expect(containers.hero).toBe(
        'max-w-[95%] sm:max-w-[90%] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl'
      )
    })

    it('has the correct max-width class for standard section container', () => {
      expect(containers.section).toBe('max-w-7xl')
    })
  })
})
