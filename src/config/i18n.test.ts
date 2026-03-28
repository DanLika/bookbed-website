import i18n from './i18n';
import { describe, it, expect } from 'vitest';

describe('i18n configuration', () => {
  it('should have escapeValue set to true to prevent XSS vulnerabilities', () => {
    // Assert that escapeValue is set to true in the initialized config
    expect(i18n.options.interpolation?.escapeValue).toBe(true);
  });
});
