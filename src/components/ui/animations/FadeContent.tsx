import * as React from 'react';
import { useRef, useEffect, useState, ElementType } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FadeContentProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  /** Custom scroll container element or selector */
  container?: Element | string | null;
  /** Enable blur effect during fade */
  blur?: boolean;
  /** Blur amount in pixels */
  blurAmount?: number;
  /** Animation duration in milliseconds */
  duration?: number;
  /** GSAP easing function */
  ease?: string;
  /** Delay before animation starts (ms) */
  delay?: number;
  /** Viewport threshold (0-1) to trigger animation */
  threshold?: number;
  /** Starting opacity value */
  initialOpacity?: number;
  /** Time in ms before element disappears (0 = never) */
  disappearAfter?: number;
  /** Duration of disappear animation */
  disappearDuration?: number;
  /** Easing for disappear animation */
  disappearEase?: string;
  /** Callback when fade-in completes */
  onComplete?: () => void;
  /** Callback when disappear completes */
  onDisappearanceComplete?: () => void;
  /** Direction of fade: 'up' | 'down' | 'left' | 'right' | 'none' */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** Distance to travel during fade (in pixels) */
  distance?: number;
  /** HTML element to render as */
  as?: ElementType;
  /** Enable scale effect */
  scale?: boolean;
  /** Starting scale value */
  scaleStart?: number;
}

const FadeContent: React.FC<FadeContentProps> = ({
  children,
  container,
  blur = false,
  blurAmount = 10,
  duration = 1000,
  ease = 'power2.out',
  delay = 0,
  threshold = 0.1,
  initialOpacity = 0,
  disappearAfter = 0,
  disappearDuration = 500,
  disappearEase = 'power2.in',
  onComplete,
  onDisappearanceComplete,
  direction = 'up',
  distance = 30,
  as: Component = 'div',
  scale = false,
  scaleStart = 0.95,
  className = '',
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If user prefers reduced motion, show content immediately
    if (prefersReducedMotion) {
      gsap.set(el, { autoAlpha: 1, filter: 'blur(0px)', x: 0, y: 0, scale: 1 });
      onComplete?.();
      return;
    }

    let scrollerTarget: Element | string | null =
      container || document.getElementById('snap-main-container') || null;

    if (typeof scrollerTarget === 'string') {
      scrollerTarget = document.querySelector(scrollerTarget);
    }

    const startPct = (1 - threshold) * 100;
    const getSeconds = (val: number) => (val > 10 ? val / 1000 : val);

    // Calculate initial position based on direction
    const getInitialPosition = () => {
      switch (direction) {
        case 'up': return { x: 0, y: distance };
        case 'down': return { x: 0, y: -distance };
        case 'left': return { x: distance, y: 0 };
        case 'right': return { x: -distance, y: 0 };
        case 'none': return { x: 0, y: 0 };
        default: return { x: 0, y: distance };
      }
    };

    const initialPos = getInitialPosition();

    gsap.set(el, {
      autoAlpha: initialOpacity,
      filter: blur ? `blur(${blurAmount}px)` : 'blur(0px)',
      x: initialPos.x,
      y: initialPos.y,
      scale: scale ? scaleStart : 1,
      willChange: 'opacity, filter, transform'
    });

    const tl = gsap.timeline({
      paused: true,
      delay: getSeconds(delay),
      onComplete: () => {
        // Delay willChange cleanup to prevent black flash on scroll-back
        setTimeout(() => {
          gsap.set(el, { willChange: 'auto' });
        }, 100); // Wait 100ms for animation to fully settle

        if (onComplete) onComplete();

        if (disappearAfter > 0) {
          gsap.to(el, {
            autoAlpha: initialOpacity,
            filter: blur ? `blur(${blurAmount}px)` : 'blur(0px)',
            x: initialPos.x,
            y: initialPos.y,
            scale: scale ? scaleStart : 1,
            delay: getSeconds(disappearAfter),
            duration: getSeconds(disappearDuration),
            ease: disappearEase,
            onComplete: () => onDisappearanceComplete?.()
          });
        }
      }
    });

    tl.to(el, {
      autoAlpha: 1,
      filter: 'blur(0px)',
      x: 0,
      y: 0,
      scale: 1,
      duration: getSeconds(duration),
      ease: ease
    });

    const st = ScrollTrigger.create({
      trigger: el,
      scroller: scrollerTarget || window,
      start: `top ${startPct}%`,
      once: true,
      onEnter: () => tl.play()
    });

    return () => {
      st.kill();
      tl.kill();
      gsap.killTweensOf(el);
    };
  }, [
    blur,
    blurAmount,
    duration,
    ease,
    delay,
    threshold,
    initialOpacity,
    disappearAfter,
    disappearDuration,
    disappearEase,
    direction,
    distance,
    scale,
    scaleStart,
    container,
    onComplete,
    onDisappearanceComplete,
    prefersReducedMotion
  ]);

  return (
    <Component ref={ref} className={className} {...props}>
      {children}
    </Component>
  );
};

export default FadeContent;
