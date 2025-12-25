import { useState, useEffect, ElementType } from 'react';

interface ShinyTextProps {
  text: string;
  /** Disable animation */
  disabled?: boolean;
  /** Animation speed in seconds */
  speed?: number;
  /** Additional className */
  className?: string;
  /** Shine color (supports rgba or hex) */
  shineColor?: string;
  /** Shine opacity (0-1) */
  shineOpacity?: number;
  /** Shine angle in degrees */
  angle?: number;
  /** Only animate on hover */
  hoverOnly?: boolean;
  /** HTML element to render as */
  as?: ElementType;
  /** Delay before animation starts (for initial load) */
  delay?: number;
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className = '',
  shineColor = '255, 255, 255',
  shineOpacity = 0.8,
  angle = 120,
  hoverOnly = false,
  as: Component = 'span',
  delay = 0,
}: ShinyTextProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasDelayPassed, setHasDelayPassed] = useState(delay === 0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Handle initial delay
  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setHasDelayPassed(true), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  const shouldAnimate = !disabled && !prefersReducedMotion && hasDelayPassed;
  const isAnimating = hoverOnly ? (shouldAnimate && isHovered) : shouldAnimate;

  // Parse shine color - support both "r, g, b" and "#hex" formats
  const getShineRgba = () => {
    if (shineColor.startsWith('#')) {
      // Convert hex to rgb
      const hex = shineColor.slice(1);
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `${r}, ${g}, ${b}`;
    }
    return shineColor;
  };

  const rgbaColor = getShineRgba();
  const animationDuration = `${speed}s`;

  return (
    <Component
      className={`text-inherit bg-clip-text inline-block ${isAnimating ? 'animate-shine' : ''} ${className}`}
      style={{
        backgroundImage: `linear-gradient(${angle}deg, rgba(${rgbaColor}, 0) 40%, rgba(${rgbaColor}, ${shineOpacity}) 50%, rgba(${rgbaColor}, 0) 60%)`,
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animationDuration,
      }}
      onMouseEnter={hoverOnly ? () => setIsHovered(true) : undefined}
      onMouseLeave={hoverOnly ? () => setIsHovered(false) : undefined}
    >
      {text}
    </Component>
  );
}
