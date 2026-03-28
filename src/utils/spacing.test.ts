import { describe, it, expect } from 'vitest'
import {
  spacing,
  heroSpacing,
  getHeroSpacing,
  getSectionSpacing,
  getCompactSpacing,
  getContainerClasses,
  getHeroContainerClasses,
  getCardPadding,
} from './spacing'

describe('spacing utilities', () => {
  describe('exported constant objects', () => {
    it('spacing object has expected structure and values', () => {
      expect(spacing).toHaveProperty('section')
      expect(spacing.section).toHaveProperty('hero')
      expect(spacing.section).toHaveProperty('regular')
      expect(spacing.section).toHaveProperty('compact')

      expect(spacing).toHaveProperty('container')
      expect(spacing.container).toHaveProperty('padding')
      expect(spacing.container).toHaveProperty('hero')
      expect(spacing.container).toHaveProperty('section')

      expect(spacing).toHaveProperty('card')
      expect(typeof spacing.card).toBe('string')
    })

    it('heroSpacing object has expected structure and values', () => {
      expect(heroSpacing).toHaveProperty('paddingTop')
      expect(heroSpacing).toHaveProperty('paddingBottom')
      expect(heroSpacing).toHaveProperty('titleGap')
      expect(heroSpacing).toHaveProperty('contentGap')
      expect(heroSpacing).toHaveProperty('buttonGap')

      expect(typeof heroSpacing.paddingTop).toBe('string')
      expect(typeof heroSpacing.paddingBottom).toBe('string')
      expect(typeof heroSpacing.titleGap).toBe('string')
      expect(typeof heroSpacing.contentGap).toBe('string')
      expect(typeof heroSpacing.buttonGap).toBe('string')
    })
  })

  describe('helper functions', () => {
    it('getHeroSpacing returns correct classes', () => {
      expect(getHeroSpacing()).toBe(spacing.section.hero)
    })

    it('getSectionSpacing returns correct classes', () => {
      expect(getSectionSpacing()).toBe(spacing.section.regular)
    })

    it('getCompactSpacing returns correct classes', () => {
      expect(getCompactSpacing()).toBe(spacing.section.compact)
    })

    it('getContainerClasses returns correct classes', () => {
      expect(getContainerClasses()).toBe(
        `${spacing.container.section} mx-auto ${spacing.container.padding}`
      )
    })

    it('getHeroContainerClasses returns correct classes', () => {
      expect(getHeroContainerClasses()).toBe(
        `${spacing.container.hero} mx-auto ${spacing.container.padding}`
      )
    })

    it('getCardPadding returns correct classes', () => {
      expect(getCardPadding()).toBe(spacing.card)
    })
  })
})
