import { describe, it, expect } from 'vitest';
import {
  spacing,
  typography,
  sectionSpacing,
  container,
  borderRadius,
  shadows,
  transitions,
  zIndex,
  patterns,
  breakpoints,
} from './design-tokens';

describe('Design Tokens', () => {
  it('should export spacing tokens with expected values', () => {
    expect(spacing).toBeDefined();
    expect(spacing[0]).toBe('0');
    expect(spacing[4]).toBe('16px');
    expect(spacing[32]).toBe('128px');
  });

  it('should export typography scale with correct structure', () => {
    expect(typography).toBeDefined();
    expect(typography.h1.mobile).toBeDefined();
    expect(typography.body.desktop).toBeDefined();
    expect(typography.small).toBe('text-sm');
  });

  it('should export section spacing tokens', () => {
    expect(sectionSpacing).toBeDefined();
    expect(sectionSpacing.sm).toBeDefined();
    expect(sectionSpacing.md).toBeDefined();
    expect(sectionSpacing.lg).toBeDefined();
  });

  it('should export container configuration', () => {
    expect(container).toBeDefined();
    expect(container.padding).toBeDefined();
    expect(container.maxWidth.sm).toBe('max-w-2xl');
    expect(container.maxWidth.full).toBe('max-w-7xl');
  });

  it('should export border radius scale', () => {
    expect(borderRadius).toBeDefined();
    expect(borderRadius.sm).toBe('rounded-lg');
    expect(borderRadius.full).toBe('rounded-full');
  });

  it('should export shadows configuration', () => {
    expect(shadows).toBeDefined();
    expect(shadows.sm).toBe('shadow-sm');
    expect(shadows.purple).toBe('shadow-purple');
  });

  it('should export animation durations', () => {
    expect(transitions).toBeDefined();
    expect(transitions.fast).toBe('duration-150');
    expect(transitions.verySlow).toBe('duration-500');
  });

  it('should export z-index scale', () => {
    expect(zIndex).toBeDefined();
    expect(zIndex.dropdown).toBe('z-10');
    expect(zIndex.tooltip).toBe('z-[60]');
  });

  it('should export utility class patterns', () => {
    expect(patterns).toBeDefined();
    expect(patterns.sectionBg.light).toBeDefined();
    expect(patterns.card.base).toBeDefined();
    expect(patterns.button.primary).toBeDefined();
    expect(patterns.text.heading).toBeDefined();
    expect(patterns.dotPattern).toBeDefined();
    expect(patterns.dotPatternStyle).toBeDefined();
  });

  it('should export responsive breakpoints', () => {
    expect(breakpoints).toBeDefined();
    expect(breakpoints.sm).toBe('640px');
    expect(breakpoints.md).toBe('768px');
    expect(breakpoints.lg).toBe('1024px');
    expect(breakpoints.xl).toBe('1280px');
    expect(breakpoints['2xl']).toBe('1536px');
  });
});
