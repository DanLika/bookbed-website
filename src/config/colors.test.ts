import { describe, it, expect } from 'vitest'
import { colors } from './colors'

describe('colors configuration', () => {
  it('should export all expected top-level color categories', () => {
    const expectedKeys = [
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
      'shadowDark'
    ]

    expectedKeys.forEach(key => {
      expect(colors).toHaveProperty(key)
    })

    // Ensure no extra unexpected keys exist
    expect(Object.keys(colors).length).toBe(expectedKeys.length)
  })

  it('should define specific expected values for primary colors', () => {
    expect(colors.primary.DEFAULT).toBe('#6B4CE6')
    expect(colors.primary.dark).toBe('#5B3DD6')
    expect(colors.primary.light).toBe('#9B86F3')
    expect(colors.primary.hover).toBe('#7B5CF6')
    expect(colors.primary.disabled).toBe('rgba(155, 134, 243, 0.5)')
  })

  it('should define specific expected values for secondary colors', () => {
    expect(colors.secondary.DEFAULT).toBe('#FF6B6B')
    expect(colors.secondary.dark).toBe('#E63946')
    expect(colors.secondary.light).toBe('#FF8E8E')
    expect(colors.secondary.hover).toBe('#FF7B7B')
    expect(colors.secondary.disabled).toBe('rgba(255, 142, 142, 0.5)')
  })

  it('should define specific expected values for state colors', () => {
    expect(colors.state.success).toBe('#66BB6A')
    expect(colors.state.error).toBe('#EC4899')
    expect(colors.state.warning).toBe('#F59E0B')
    expect(colors.state.info).toBe('#999999')
  })
})
