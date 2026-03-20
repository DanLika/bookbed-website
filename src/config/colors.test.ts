import { describe, it, expect } from 'vitest'
import { colors } from './colors'

describe('colors configuration', () => {
  it('should contain all required color categories', () => {
    const requiredCategories = [
      'primary',
      'secondary',
      'tertiary',
      'bg',
      'bgDark',
      'surface',
      'surfaceDark',
      'text',
      'textDark',
      'border',
      'borderDark',
      'state',
      'shadow',
      'shadowDark',
    ]

    requiredCategories.forEach((category) => {
      expect(colors).toHaveProperty(category)
    })
  })

  it('should have correct primary color defaults', () => {
    expect(colors.primary.DEFAULT).toBe('#6B4CE6')
    expect(colors.primary.dark).toBe('#5B3DD6')
    expect(colors.primary.light).toBe('#9B86F3')
  })

  it('should have correct secondary color defaults', () => {
    expect(colors.secondary.DEFAULT).toBe('#FF6B6B')
  })

  it('should have correct tertiary color defaults', () => {
    expect(colors.tertiary.DEFAULT).toBe('#FFB84D')
  })

  it('should have correct state colors', () => {
    expect(colors.state).toEqual({
      success: '#66BB6A',
      error: '#EC4899',
      warning: '#F59E0B',
      info: '#999999',
    })
  })

  it('should have correct shadow colors', () => {
    expect(colors.shadow).toEqual({
      light: 'rgba(0, 0, 0, 0.05)',
      medium: 'rgba(0, 0, 0, 0.1)',
      strong: 'rgba(0, 0, 0, 0.15)',
      purple: 'rgba(107, 76, 230, 0.2)',
    })
  })
})
