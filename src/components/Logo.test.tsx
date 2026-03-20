import { render, screen } from '@testing-library/react';
import { LogoIcon } from './Logo';

describe('LogoIcon', () => {
  it('renders both light and dark theme logos', () => {
    render(<LogoIcon />);

    const logos = screen.getAllByAltText('BookBed');
    expect(logos).toHaveLength(2);

    // Check light theme logo
    expect(logos[0]).toHaveAttribute('src', '/images/logo-light.png');
    expect(logos[0]).toHaveAttribute('alt', 'BookBed');
    expect(logos[0]).toHaveAttribute('title', 'BookBed');
    expect(logos[0]).toHaveAttribute('width', '84');
    expect(logos[0]).toHaveAttribute('height', '100');
    expect(logos[0]).toHaveAttribute('loading', 'eager');
    expect(logos[0]).toHaveClass('block dark:hidden object-contain');
    expect(logos[0]).not.toHaveClass('hidden dark:block');

    // Check dark theme logo
    expect(logos[1]).toHaveAttribute('src', '/images/logo-light.png');
    expect(logos[1]).toHaveAttribute('alt', 'BookBed');
    expect(logos[1]).toHaveAttribute('title', 'BookBed');
    expect(logos[1]).toHaveAttribute('width', '84');
    expect(logos[1]).toHaveAttribute('height', '100');
    expect(logos[1]).toHaveAttribute('loading', 'eager');
    expect(logos[1]).toHaveClass('hidden dark:block object-contain brightness-0 invert');
  });

  it('renders with default props correctly', () => {
    render(<LogoIcon />);

    const logos = screen.getAllByAltText('BookBed');

    // The default className should contain 'object-contain' and not contain 'undefined' or a trailing space
    // Let's assert exact class strings for default rendering
    expect(logos[0]).toHaveAttribute('class', 'block dark:hidden object-contain ');
    expect(logos[1]).toHaveAttribute('class', 'hidden dark:block object-contain brightness-0 invert ');
    expect(logos[1]).toHaveAttribute('style', 'filter: brightness(0) invert(1);');
  });

  it('applies custom className to both logos', () => {
    const customClass = 'test-custom-class';
    render(<LogoIcon className={customClass} />);

    const logos = screen.getAllByAltText('BookBed');

    expect(logos[0]).toHaveClass(customClass);
    expect(logos[1]).toHaveClass(customClass);
  });
});
