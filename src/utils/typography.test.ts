import { describe, it, expect } from 'vitest'
import { typography, containers } from './typography'

describe('typography system', () => {
  describe('typography classes', () => {
    it('has the correct fluid scaling for h1', () => {
      expect(typography.h1).toBe('text-[clamp(2rem,6vw,4.5rem)]')
    })

    it('has the correct fluid scaling for h2', () => {
      expect(typography.h2).toBe('text-[clamp(1.75rem,5vw,3.5rem)]')
    })

    it('has the correct fluid scaling for h3', () => {
      expect(typography.h3).toBe('text-[clamp(1.25rem,3vw,2rem)]')
    })

    it('has the correct fluid scaling for subtitle', () => {
      expect(typography.subtitle).toBe('text-[clamp(1rem,2.5vw,1.5rem)]')
    })

    it('has the correct fluid scaling for body text', () => {
      expect(typography.body).toBe('text-[clamp(0.9375rem,1.5vw,1.125rem)]')
    })
  })

  describe('container classes', () => {
    it('has the correct progressive scaling for hero container', () => {
      expect(containers.hero).toBe(
        'max-w-[95%] sm:max-w-[90%] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl'
      )
    })

    it('has the correct static max width for section container', () => {
      expect(containers.section).toBe('max-w-7xl')
    })
  })
})
