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

describe('spacing constants', () => {
  it('spacing has correct section values', () => {
    expect(spacing.section.hero).toBe('pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-8 sm:pb-12 md:pb-16 lg:pb-20')
    expect(spacing.section.regular).toBe('py-8 sm:py-10 md:py-14 lg:py-18 xl:py-20')
    expect(spacing.section.compact).toBe('py-6 sm:py-8 md:py-10 lg:py-12')
  })

  it('spacing has correct container values', () => {
    expect(spacing.container.padding).toBe('px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16')
    expect(spacing.container.hero).toBe('max-w-[95%] sm:max-w-[90%] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl')
    expect(spacing.container.section).toBe('max-w-7xl')
  })

  it('spacing has correct card value', () => {
    expect(spacing.card).toBe('p-4 sm:p-5 md:p-6 lg:p-8')
  })
})

describe('heroSpacing constants', () => {
  it('heroSpacing has correct values', () => {
    expect(heroSpacing.paddingTop).toBe('pt-24 sm:pt-28 md:pt-32 lg:pt-28 xl:pt-32')
    expect(heroSpacing.paddingBottom).toBe('pb-4 sm:pb-6 md:pb-8 lg:pb-10 xl:pb-12')
    expect(heroSpacing.titleGap).toBe('mb-3 sm:mb-4 md:mb-5 lg:mb-6')
    expect(heroSpacing.contentGap).toBe('mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-14')
    expect(heroSpacing.buttonGap).toBe('mt-6 sm:mt-8 md:mt-10 lg:mt-12')
  })
})

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
