import { describe, it, expect } from 'vitest'
import { srgbColor } from './color'

describe('color utils', () => {
  describe('srgbColor', () => {
    it('should convert hex to linear color', () => {
      const color = srgbColor('#ffffff')
      expect(color.r).toBeCloseTo(1)
      expect(color.g).toBeCloseTo(1)
      expect(color.b).toBeCloseTo(1)
    })
  })
})
