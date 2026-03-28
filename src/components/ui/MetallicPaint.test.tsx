import { render } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import MetallicPaint from './MetallicPaint'

describe('MetallicPaint', () => {
  let originalGetContext: any
  let originalConsoleError: any

  beforeEach(() => {
    originalGetContext = HTMLCanvasElement.prototype.getContext
    originalConsoleError = console.error
    console.error = vi.fn()

    // Polyfill ImageData for JSDOM
    if (typeof (globalThis as any).ImageData === 'undefined') {
      ;(globalThis as any).ImageData = class ImageData {
        data: Uint8ClampedArray
        width: number
        height: number
        colorSpace: PredefinedColorSpace
        constructor(data: Uint8ClampedArray, width: number, height?: number) {
          this.data = data
          this.width = width
          this.height = height || width
          this.colorSpace = 'srgb'
        }
      } as any
    }
  })

  afterEach(() => {
    HTMLCanvasElement.prototype.getContext = originalGetContext
    console.error = originalConsoleError
    vi.clearAllMocks()
  })

  it('handles GL texture loading error correctly', () => {
    // Create a mock WebGL context
    const mockGLContext = {
      VERTEX_SHADER: 35633,
      FRAGMENT_SHADER: 35632,
      COMPILE_STATUS: 35713,
      LINK_STATUS: 35714,
      ACTIVE_UNIFORMS: 35718,
      ARRAY_BUFFER: 34962,
      STATIC_DRAW: 35044,
      FLOAT: 5126,
      TRIANGLE_STRIP: 5,
      TEXTURE_2D: 3553,
      TEXTURE0: 33984,
      TEXTURE_MIN_FILTER: 10241,
      TEXTURE_MAG_FILTER: 10240,
      TEXTURE_WRAP_S: 10242,
      TEXTURE_WRAP_T: 10243,
      LINEAR: 9729,
      CLAMP_TO_EDGE: 33071,
      UNPACK_ALIGNMENT: 3317,
      RGBA: 6408,
      UNSIGNED_BYTE: 5121,

      createShader: vi.fn(() => ({})),
      shaderSource: vi.fn(),
      compileShader: vi.fn(),
      getShaderParameter: vi.fn(() => true),
      createProgram: vi.fn(() => ({})),
      attachShader: vi.fn(),
      linkProgram: vi.fn(),
      getProgramParameter: vi.fn(() => true),
      getActiveUniform: vi.fn(() => ({ name: 'u_test' })),
      getUniformLocation: vi.fn(() => ({})),
      createBuffer: vi.fn(() => ({})),
      bindBuffer: vi.fn(),
      bufferData: vi.fn(),
      useProgram: vi.fn(),
      getAttribLocation: vi.fn(() => 0),
      enableVertexAttribArray: vi.fn(),
      vertexAttribPointer: vi.fn(),
      viewport: vi.fn(),
      uniform1f: vi.fn(),
      drawArrays: vi.fn(),
      getParameter: vi.fn(() => null),
      createTexture: vi.fn(() => ({})),
      activeTexture: vi.fn(),
      bindTexture: vi.fn(),
      texParameteri: vi.fn(),
      pixelStorei: vi.fn(),
      uniform1i: vi.fn(),
      deleteTexture: vi.fn(),

      // Force texImage2D to throw
      texImage2D: vi.fn(() => {
        throw new Error('Simulated WebGL error')
      }),
    }

    // Mock getContext to return our mock context
    HTMLCanvasElement.prototype.getContext = vi.fn((contextId) => {
      if (contextId === 'webgl2' || contextId === 'webgl') {
        return mockGLContext
      }
      return null
    }) as any

    const dummyImageData = new ImageData(
      new Uint8ClampedArray(4 * 4 * 4),
      4,
      4
    )

    render(
      <MetallicPaint
        imageData={dummyImageData}
      />
    )

    // Verify texImage2D was called and threw an error, which was caught and logged
    expect(mockGLContext.texImage2D).toHaveBeenCalled()
    expect(console.error).toHaveBeenCalledWith('Error uploading texture:', expect.any(Error))
  })
})
