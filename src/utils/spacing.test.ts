import { describe, it, expect } from 'vitest'
import {
  spacing,
  getHeroSpacing,
  getSectionSpacing,
  getCompactSpacing,
  getContainerClasses,
  getHeroContainerClasses,
  getCardPadding,
} from './spacing'

describe('spacing utilities', () => {
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
