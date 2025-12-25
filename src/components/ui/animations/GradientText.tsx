import { ReactNode, useState, useEffect, ElementType } from 'react';

type GradientDirection = 'right' | 'left' | 'top' | 'bottom' | 'diagonal' | 'diagonal-reverse';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  /** Gradient direction */
  direction?: GradientDirection;
  /** Enable hover animation speed boost */
  hoverEffect?: boolean;
  /** HTML element to render as */
  as?: ElementType;
}

const directionMap: Record<GradientDirection, string> = {
  'right': 'to right',
  'left': 'to left',
  'top': 'to top',
  'bottom': 'to bottom',
  'diagonal': 'to bottom right',
  'diagonal-reverse': 'to top left',
};

export default function GradientText({
  children,
  className = '',
  colors = ['#6B4CE6', '#9B86F3', '#6B4CE6'],
  animationSpeed = 8,
  showBorder = false,
  direction = 'right',
  hoverEffect = false,
  as: Component = 'span',
}: GradientTextProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const effectiveSpeed = hoverEffect && isHovered ? animationSpeed / 2 : animationSpeed;
  const shouldAnimate = !prefersReducedMotion;

  const gradientStyle = {
    backgroundImage: `linear-gradient(${directionMap[direction]}, ${colors.join(', ')})`,
    animationDuration: `${effectiveSpeed}s`,
  };

  return (
    <Component
      className={`relative inline-flex max-w-fit flex-row items-center justify-center font-medium transition-shadow duration-500 overflow-hidden ${className}`}
      onMouseEnter={hoverEffect ? () => setIsHovered(true) : undefined}
      onMouseLeave={hoverEffect ? () => setIsHovered(false) : undefined}
    >
      {showBorder && (
        <span
          className={`absolute inset-0 bg-cover z-0 pointer-events-none ${shouldAnimate ? 'animate-gradient' : ''}`}
          style={{
            ...gradientStyle,
            backgroundSize: shouldAnimate ? '300% 100%' : '100% 100%',
          }}
          aria-hidden="true"
        >
          <span
            className="absolute inset-0 bg-black rounded-[1.25rem] z-[-1]"
            style={{
              width: 'calc(100% - 2px)',
              height: 'calc(100% - 2px)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </span>
      )}
      <span
        className={`inline-block relative z-2 text-transparent bg-cover ${shouldAnimate ? 'animate-gradient' : ''}`}
        style={{
          ...gradientStyle,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          backgroundSize: shouldAnimate ? '300% 100%' : '100% 100%',
        }}
      >
        {children}
      </span>
    </Component>
  );
}
