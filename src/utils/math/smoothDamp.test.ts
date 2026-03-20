import * as THREE from 'three'
import { describe, it, expect } from 'vitest'
import { smoothDampVec2, smoothDampFloat } from './smoothDamp'

describe('smoothDamp', () => {
  describe('smoothDampVec2', () => {
    it('should approach target', () => {
      const current = new THREE.Vector2(0, 0)
      const target = new THREE.Vector2(10, 10)
      const currentVelocity = new THREE.Vector2(0, 0)

      const out = smoothDampVec2(current, target, currentVelocity, 0.1, Infinity, 0.016)

      expect(out.x).toBeGreaterThan(0)
      expect(out.y).toBeGreaterThan(0)
      expect(out.x).toBeLessThan(10)
      expect(out.y).toBeLessThan(10)
    })
  })

  describe('smoothDampFloat', () => {
    it('should approach target', () => {
      const current = 0
      const target = 10
      const velRef = { v: 0 }

      const out = smoothDampFloat(current, target, velRef, 0.1, Infinity, 0.016)

      expect(out.value).toBeGreaterThan(0)
      expect(out.value).toBeLessThan(10)
    })
  })
})
