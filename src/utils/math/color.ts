import * as THREE from 'three'

export function srgbColor(hex: string) {
  const c = new THREE.Color(hex)
  return c.convertSRGBToLinear()
}
