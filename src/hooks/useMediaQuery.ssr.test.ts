/**
 * @vitest-environment node
 */
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import { useMediaQuery } from './useMediaQuery';
import { describe, it, expect } from 'vitest';

function TestComponent() {
  const matches = useMediaQuery('(min-width: 768px)');
  return React.createElement('div', null, matches.toString());
}

describe('useMediaQuery in SSR', () => {
  it('should return false if window is undefined (SSR environment)', () => {
    // In node environment, window is undefined
    const html = renderToStaticMarkup(React.createElement(TestComponent));
    expect(html).toBe('<div>false</div>');
  });
});
