import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, fireEvent, act } from '@testing-library/react'
import React from 'react'

// Mock three entirely for GridScan before import
vi.mock('three', () => {
  return {
    WebGLRenderer: class {
      setSize() {}
      setPixelRatio() {}
      getPixelRatio() { return 1 }
      getSize() { return { width: 100, height: 100 } }
      setAnimationLoop() {}
      render() {}
      dispose() {}
      setClearColor() {}
      domElement = document.createElement('canvas')
      forceContextLoss() {}
    },
    Scene: class {
      add() {}
    },
    OrthographicCamera: class {
      updateProjectionMatrix() {}
    },
    PlaneGeometry: class {
      dispose() {}
    },
    ShaderMaterial: class {
      dispose() {}
      uniforms = new Proxy({}, {
        get: (target, name) => {
          if (!target[name as string]) {
            target[name as string] = { value: null };
          }
          if (name === 'uLinesColor' || name === 'uScanColor' || name === 'uBackgroundColor') {
             target[name as string] = { value: { copy: vi.fn() } };
          }
          return target[name as string];
        }
      })
    },
    Mesh: class {},
    Vector2: class { set() {} },
    Vector3: class { set() {} },
    Vector4: class { set() {} },
    Color: class {
      set() {}
      convertSRGBToLinear() { return this }
      copy() { return this }
    },
    MathUtils: {
      clamp: vi.fn((val, min, max) => Math.max(min, Math.min(max, val))),
      lerp: vi.fn((x, y, t) => x + (y - x) * t)
    },
    NoToneMapping: 0,
    SRGBColorSpace: 'srgb'
  }
})

// Mock postprocessing
vi.mock('postprocessing', () => {
  return {
    EffectComposer: class {
      addPass() {}
      render() {}
      dispose() {}
    },
    RenderPass: class {},
    EffectPass: class {},
    BloomEffect: class {
      blendMode = {
        opacity: { value: 0 }
      }
    },
    ChromaticAberrationEffect: class {
      offset = { set: vi.fn() }
    }
  }
})

import GridScan from './GridScan'

describe('GridScan DeviceOrientationEvent handling', () => {
  let originalDeviceOrientationEvent: any

  beforeEach(() => {
    vi.clearAllMocks()
    originalDeviceOrientationEvent = window.DeviceOrientationEvent

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })

    // Mock Canvas context
    HTMLCanvasElement.prototype.getContext = vi.fn() as any
  })

  afterEach(() => {
    window.DeviceOrientationEvent = originalDeviceOrientationEvent
    vi.unstubAllGlobals()
  })

  it('silently ignores DeviceOrientationEvent.requestPermission errors when enableGyro is true', async () => {
    const mockRequestPermission = vi.fn().mockRejectedValue(new Error('Permission denied'))

    vi.stubGlobal('DeviceOrientationEvent', {
      requestPermission: mockRequestPermission
    })

    const { container } = render(<GridScan enableGyro={true} scanOnClick={true} />)

    const wrap = container.firstChild as HTMLElement
    expect(wrap).not.toBeNull()

    await act(async () => {
      fireEvent.click(wrap)
    })

    expect(mockRequestPermission).toHaveBeenCalled()
  })

  it('handles successful DeviceOrientationEvent.requestPermission', async () => {
    const mockRequestPermission = vi.fn().mockResolvedValue('granted')

    vi.stubGlobal('DeviceOrientationEvent', {
      requestPermission: mockRequestPermission
    })

    const { container } = render(<GridScan enableGyro={true} scanOnClick={true} />)
    const wrap = container.firstChild as HTMLElement

    await act(async () => {
      fireEvent.click(wrap)
    })

    expect(mockRequestPermission).toHaveBeenCalled()
  })

  it('does not call requestPermission if it is not a function', async () => {
    vi.stubGlobal('DeviceOrientationEvent', {})

    const { container } = render(<GridScan enableGyro={true} scanOnClick={true} />)
    const wrap = container.firstChild as HTMLElement

    await act(async () => {
      fireEvent.click(wrap)
    })
    // No error should be thrown
  })

  it('does not call requestPermission if enableGyro is false', async () => {
    const mockRequestPermission = vi.fn()

    vi.stubGlobal('DeviceOrientationEvent', {
      requestPermission: mockRequestPermission
    })

    const { container } = render(<GridScan enableGyro={false} scanOnClick={true} />)
    const wrap = container.firstChild as HTMLElement

    await act(async () => {
      fireEvent.click(wrap)
    })

    expect(mockRequestPermission).not.toHaveBeenCalled()
  })
})
