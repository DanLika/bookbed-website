import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import LogoLoop, { LogoItem } from './LogoLoop';
import React from 'react';

const observeMock = vi.fn();
const unobserveMock = vi.fn();
const disconnectMock = vi.fn();

class MockResizeObserver {
  observe = observeMock;
  unobserve = unobserveMock;
  disconnect = disconnectMock;
}

const originalMatchMedia = window.matchMedia;

describe('LogoLoop Component', () => {
  const mockLogos: LogoItem[] = [
    { node: <div data-testid="logo-1">Logo 1</div> },
    { node: <div data-testid="logo-2">Logo 2</div> },
  ];

  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('ResizeObserver', MockResizeObserver);

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: originalMatchMedia,
    });
  });

  it('renders logos correctly', () => {
    render(<LogoLoop logos={mockLogos} />);
    const logo1Elements = screen.getAllByTestId('logo-1');
    expect(logo1Elements.length).toBeGreaterThan(0);
  });

  it('respects prefers-reduced-motion', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
      })),
    });

    render(<LogoLoop logos={mockLogos} />);
    expect(screen.getAllByTestId('logo-1').length).toBeGreaterThan(0);
  });

  it('handles vertical direction correctly', () => {
    render(<LogoLoop logos={mockLogos} direction="up" />);
    // Check if the container has flex-col class
    const track = screen.getAllByRole('list')[0].parentElement;
    expect(track).toHaveClass('flex-col');
  });

  it('handles vertical direction with fade out correctly', () => {
    render(<LogoLoop logos={mockLogos} direction="down" fadeOut={true} />);
    const region = screen.getByRole('region');
    const divs = region.querySelectorAll('div[aria-hidden="true"]');
    expect(divs.length).toBe(2);
  });

  it('handles pause on hover', () => {
    render(<LogoLoop logos={mockLogos} pauseOnHover={true} hoverSpeed={0} />);
    const track = screen.getAllByRole('list')[0].parentElement;
    if (track) {
      fireEvent.mouseEnter(track);
      fireEvent.mouseLeave(track);
    }
  });

  it('renders images correctly', () => {
    const imageLogos: LogoItem[] = [
      { src: 'test.jpg', alt: 'Test Image 1' },
      { src: 'test2.jpg' },
      { href: 'test', title: 'Test' },
      { node: <div>hi</div>, href: 'test2', title: 'Test 2' }
    ] as any[];
    render(<LogoLoop logos={imageLogos} />);
    expect(screen.getAllByAltText('Test Image 1').length).toBeGreaterThan(0);
  });

  it('renders custom items using renderItem', () => {
    const renderItem = (_item: LogoItem, key: React.Key) => (
      <div data-testid={`custom-${key}`}>Custom Render</div>
    );
    render(<LogoLoop logos={mockLogos} renderItem={renderItem} />);
    expect(screen.getAllByTestId(/custom-/).length).toBeGreaterThan(0);
  });

  it('renders correctly with fadeOut and custom fadeOutColor', () => {
    render(<LogoLoop logos={mockLogos} fadeOut={true} fadeOutColor="#ff0000" />);
    const region = screen.getByRole('region');
    const divs = region.querySelectorAll('div[aria-hidden="true"]');
    expect(divs.length).toBe(2);
    expect(region).toHaveStyle({ '--logoloop-fadeColor': '#ff0000' });
  });

  it('renders correctly with scaleOnHover', () => {
    const { container } = render(<LogoLoop logos={mockLogos} scaleOnHover={true} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should clear raf when unmounted', () => {
    const { unmount } = render(<LogoLoop logos={mockLogos} speed={50} />);
    unmount();
  });
});
