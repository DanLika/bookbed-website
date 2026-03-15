import { render, screen } from '@testing-library/react';
import { LogoIcon } from './Logo';

describe('LogoIcon', () => {
  it('renders both light and dark theme logos', () => {
    render(<LogoIcon />);

    const logos = screen.getAllByAltText('BookBed');
    expect(logos).toHaveLength(2);

    // Check light theme logo
    expect(logos[0]).toHaveAttribute('src', '/images/logo-light.png');
    expect(logos[0]).toHaveClass('block dark:hidden');
    expect(logos[0]).not.toHaveClass('hidden dark:block');

    // Check dark theme logo
    expect(logos[1]).toHaveAttribute('src', '/images/logo-light.png');
    expect(logos[1]).toHaveClass('hidden dark:block brightness-0 invert');
  });

  it('applies custom className to both logos', () => {
    const customClass = 'test-custom-class';
    render(<LogoIcon className={customClass} />);

    const logos = screen.getAllByAltText('BookBed');

    expect(logos[0]).toHaveClass(customClass);
    expect(logos[1]).toHaveClass(customClass);
  });
});
