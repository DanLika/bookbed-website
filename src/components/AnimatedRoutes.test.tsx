import { render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { vi } from 'vitest';
import AnimatedRoutes from './AnimatedRoutes';
import { useEffect } from 'react';

// Mock all lazily loaded components so we can test the fallback and route rendering synchronously
vi.mock('../pages/HomePage', () => ({ default: () => <div data-testid="home-page" /> }));
vi.mock('../pages/NotFoundPage', () => ({ default: () => <div data-testid="not-found-page" /> }));
vi.mock('../pages/AboutPage', () => ({ default: () => <div data-testid="about-page" /> }));

beforeAll(() => {
  window.scrollTo = vi.fn();
});

afterEach(() => {
  vi.clearAllMocks();
  document.head.innerHTML = '';
});

describe('AnimatedRoutes', () => {
  it('renders HomePage on /', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AnimatedRoutes />
      </MemoryRouter>
    );

    expect(await screen.findByTestId('home-page')).toBeInTheDocument();
  });

  it('renders NotFoundPage and its fallback spinner on non-existent route', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/does-not-exist-1234']}>
        <AnimatedRoutes />
      </MemoryRouter>
    );

    // Initial render should show the spinner from PageFallback
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();

    // Eventually the lazy loaded page resolves
    expect(await screen.findByTestId('not-found-page')).toBeInTheDocument();
  });

  it('scrolls to top on route change', async () => {
    const TestNavigation = () => {
      const navigate = useNavigate();
      useEffect(() => {
        const timeout = setTimeout(() => {
          navigate('/about');
        }, 50);
        return () => clearTimeout(timeout);
      }, [navigate]);
      return null;
    };

    render(
      <MemoryRouter initialEntries={['/']}>
        <TestNavigation />
        <AnimatedRoutes />
      </MemoryRouter>
    );

    // Initial call on mount
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'instant' });
    expect(window.scrollTo).toHaveBeenCalledTimes(1);

    // Wait for route change to occur
    await screen.findByTestId('about-page');

    // Should be called again after navigation
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'instant' });
    expect(window.scrollTo).toHaveBeenCalledTimes(2);
  });
});
