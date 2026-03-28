import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import WidgetEmbedPage from './WidgetEmbedPage'

vi.mock('../../components/DocsLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="docs-layout">{children}</div>
}))

vi.mock('../../hooks/usePageMeta', () => ({
  usePageMeta: vi.fn()
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      if (options?.returnObjects) {
        if (key.includes('getCode.steps')) return ['Step 1']
        if (key.includes('platforms.wordpress.steps')) return ['WP Step 1']
        if (key.includes('platforms.wix.steps')) return ['Wix Step 1']
        if (key.includes('platforms.squarespace.steps')) return ['SQ Step 1']
        if (key.includes('troubleshooting.issues')) return [{ problem: 'P', solution: 'S' }]
        return []
      }
      return key
    },
    i18n: {
      language: 'en'
    }
  })
}))

describe('WidgetEmbedPage', () => {
  let originalClipboard: any;
  let originalConsoleError: any;

  beforeEach(() => {
    originalClipboard = global.navigator.clipboard;
    originalConsoleError = console.error;

    // Mock clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(),
      },
    });

    // Mock console.error
    console.error = vi.fn();
  })

  afterEach(() => {
    Object.assign(navigator, {
      clipboard: originalClipboard,
    });
    console.error = originalConsoleError;
    vi.clearAllMocks();
  })

  it('handles clipboard copy error gracefully', async () => {
    const mockError = new Error('Clipboard error');
    navigator.clipboard.writeText = vi.fn().mockRejectedValueOnce(mockError);

    render(
      <MemoryRouter>
        <WidgetEmbedPage />
      </MemoryRouter>
    );

    const copyButton = screen.getByRole('button', { name: /docs\.widgetEmbed\.copyCode/i });
    await act(async () => {
      fireEvent.click(copyButton);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Failed to copy:', mockError);
  })

  it('handles successful clipboard copy', async () => {
    navigator.clipboard.writeText = vi.fn().mockResolvedValueOnce(undefined);
    vi.useFakeTimers()

    render(
      <MemoryRouter>
        <WidgetEmbedPage />
      </MemoryRouter>
    );

    const copyButton = screen.getByRole('button', { name: /docs\.widgetEmbed\.copyCode/i });
    await act(async () => {
      fireEvent.click(copyButton);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalled();

    // Check if the state changed to Copied
    expect(screen.getByText('Copied!')).toBeInTheDocument();

    await act(async () => {
      vi.runAllTimers();
    });

    expect(screen.queryByText('Copied!')).not.toBeInTheDocument();

    vi.useRealTimers()
  })
})
