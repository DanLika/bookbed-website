/** @vitest-environment jsdom */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { parseLogoImage } from './MetallicPaint'

describe('parseLogoImage', () => {
  let originalCreateElement: typeof document.createElement;
  let originalCreateObjectURL: typeof URL.createObjectURL;

  beforeEach(() => {
    originalCreateElement = document.createElement;
    originalCreateObjectURL = URL.createObjectURL;
    URL.createObjectURL = vi.fn(() => 'blob:test-url');
  })

  afterEach(() => {
    document.createElement = originalCreateElement;
    URL.createObjectURL = originalCreateObjectURL;
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  })

  it('rejects if file is not provided', async () => {
    await expect(parseLogoImage(null as unknown as File)).rejects.toThrow('Invalid file or context')
  })

  it('rejects if canvas context cannot be created', async () => {
    const mockCanvas = {
      getContext: vi.fn(() => null)
    };
    vi.spyOn(document, 'createElement').mockImplementation((tag) => {
      if (tag === 'canvas') return mockCanvas as any;
      return originalCreateElement.call(document, tag);
    });

    const file = new File([''], 'test.png', { type: 'image/png' });
    await expect(parseLogoImage(file)).rejects.toThrow('Invalid file or context')
  })

  it('rejects if image fails to load', async () => {
    const file = new File([''], 'test.png', { type: 'image/png' });

    let imageInstance: any;

    class MockImage {
      onload: any = null;
      onerror: any = null;
      src: string = '';
      crossOrigin: string = '';
      constructor() {
        imageInstance = this;
      }
    }

    vi.stubGlobal('Image', MockImage);

    // Provide a valid canvas context
    const mockCanvas = {
      getContext: vi.fn(() => ({})),
    };
    vi.spyOn(document, 'createElement').mockImplementation((tag) => {
      if (tag === 'canvas') return mockCanvas as any;
      return originalCreateElement.call(document, tag);
    });

    const promise = parseLogoImage(file);

    setTimeout(() => {
      if (imageInstance && imageInstance.onerror) {
        imageInstance.onerror(new Error('Image load failed'));
      }
    }, 10);

    await expect(promise).rejects.toThrow('Failed to load image');
  })

  it('rejects if canvas.toBlob fails', async () => {
    const file = new File([''], 'test.png', { type: 'image/png' });

    let imageInstance: any;

    class MockImage {
      onload: any = null;
      onerror: any = null;
      src: string = '';
      crossOrigin: string = '';
      naturalWidth: number = 10;
      naturalHeight: number = 10;
      width: number = 10;
      height: number = 10;
      constructor() {
        imageInstance = this;
      }
    }

    vi.stubGlobal('Image', MockImage);

    const mockCtx = {
      drawImage: vi.fn(),
      getImageData: vi.fn(() => ({ data: new Uint8ClampedArray(4 * 10 * 10) })),
      createImageData: vi.fn(() => ({ data: new Uint8ClampedArray(4 * 10 * 10) })),
      putImageData: vi.fn(),
    };

    const mockCanvas = {
      getContext: vi.fn(() => mockCtx),
      toBlob: vi.fn((cb) => cb(null)), // simulate blob failure
      width: 10,
      height: 10,
    };

    vi.spyOn(document, 'createElement').mockImplementation((tag) => {
      if (tag === 'canvas') return mockCanvas as any;
      return originalCreateElement.call(document, tag);
    });

    const promise = parseLogoImage(file);

    setTimeout(() => {
      if (imageInstance && imageInstance.onload) {
        imageInstance.onload();
      }
    }, 10);

    await expect(promise).rejects.toThrow('Failed to create PNG blob');
  })

  it('catches and rejects if an error is thrown during processing', async () => {
    const file = new File([''], 'test.png', { type: 'image/png' });

    let imageInstance: any;

    class MockImage {
      onload: any = null;
      onerror: any = null;
      src: string = '';
      crossOrigin: string = '';
      naturalWidth: number = 10;
      naturalHeight: number = 10;
      width: number = 10;
      height: number = 10;
      constructor() {
        imageInstance = this;
      }
    }

    vi.stubGlobal('Image', MockImage);

    const mockCtx = {
      drawImage: vi.fn(),
      getImageData: vi.fn(() => {
        throw new Error('Processing failed');
      }),
      createImageData: vi.fn(),
      putImageData: vi.fn(),
    };

    const mockCanvas = {
      getContext: vi.fn(() => mockCtx),
      toBlob: vi.fn(),
      width: 10,
      height: 10,
    };

    vi.spyOn(document, 'createElement').mockImplementation((tag) => {
      if (tag === 'canvas') return mockCanvas as any;
      return originalCreateElement.call(document, tag);
    });

    const promise = parseLogoImage(file);

    setTimeout(() => {
      if (imageInstance && imageInstance.onload) {
        imageInstance.onload();
      }
    }, 10);

    await expect(promise).rejects.toThrow('Processing failed');
  })
})