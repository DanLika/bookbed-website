import { useEffect, useRef, useState, ReactNode, ElementType } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollFloatProps {
  children: ReactNode
  /** Float direction: 'up' | 'down' | 'left' | 'right' */
  direction?: 'up' | 'down' | 'left' | 'right'
  /** Distance to float (pixels) */
  distance?: number
  /** Enable scale effect */
  scale?: boolean
  /** Scale start value (0-1) */
  scaleStart?: number
  /** Enable rotation effect */
  rotate?: boolean
  /** Rotation amount (degrees) */
  rotateAmount?: number
  /** Enable blur effect */
  blur?: boolean
  /** Blur amount (pixels) */
  blurAmount?: number
  /** Animation duration (seconds) */
  duration?: number
  /** GSAP easing */
  ease?: string
  /** Scrub animation with scroll (true = smooth follow, number = scrub duration) */
  scrub?: boolean | number
  /** Viewport threshold (0-1) */
  threshold?: number
  /** Additional className */
  className?: string
  /** Delay before animation starts (seconds) */
  delay?: number
  /** Animate back when scrolling out of view */
  reverse?: boolean
  /** Stagger child elements (selector or true for direct children) */
  stagger?: boolean | string
  /** Stagger delay between each child (seconds) */
  staggerAmount?: number
  /** HTML element to render as */
  as?: ElementType
  /** Show debug markers (development only) */
  markers?: boolean
}

export default function ScrollFloat({
  children,
  direction = 'up',
  distance = 50,
  scale = false,
  scaleStart = 0.9,
  rotate = false,
  rotateAmount = 5,
  blur = false,
  blurAmount = 8,
  duration = 0.8,
  ease = 'power2.out',
  scrub = false,
  threshold = 0.2,
  className = '',
  delay = 0,
  reverse = false,
  stagger = false,
  staggerAmount = 0.1,
  as: Component = 'div',
  markers = false,
}: ScrollFloatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion) return

    // Calculate initial position based on direction
    const getInitialTransform = () => {
      switch (direction) {
        case 'up': return { x: 0, y: distance }
        case 'down': return { x: 0, y: -distance }
        case 'left': return { x: distance, y: 0 }
        case 'right': return { x: -distance, y: 0 }
        default: return { x: 0, y: distance }
      }
    }

    const initial = getInitialTransform()

    // Determine target elements (stagger mode or single element)
    const targets = stagger
      ? typeof stagger === 'string'
        ? el.querySelectorAll(stagger)
        : el.children
      : el

    const initialProps = {
      opacity: 0,
      x: initial.x,
      y: initial.y,
      scale: scale ? scaleStart : 1,
      rotation: rotate ? rotateAmount : 0,
      filter: blur ? `blur(${blurAmount}px)` : 'blur(0px)',
      willChange: 'opacity, transform, filter',
    }

    gsap.set(targets, initialProps)

    const animation = {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      filter: 'blur(0px)',
      duration: scrub ? 1 : duration,
      ease,
      delay: stagger ? 0 : delay,
      stagger: stagger ? staggerAmount : 0,
    }

    let st: ScrollTrigger

    if (scrub) {
      // Scrub mode - animation follows scroll position
      const tl = gsap.timeline()
      tl.to(targets, animation)

      st = ScrollTrigger.create({
        trigger: el,
        start: `top ${(1 - threshold) * 100}%`,
        end: 'top 30%',
        scrub: typeof scrub === 'number' ? scrub : 0.5,
        animation: tl,
        markers: markers && import.meta.env.DEV,
        onLeave: () => {
          gsap.set(targets, { willChange: 'auto' })
        },
      })
    } else if (reverse) {
      // Reverse mode - animate in and out based on scroll direction
      const tl = gsap.timeline({ paused: true })
      tl.to(targets, animation)

      st = ScrollTrigger.create({
        trigger: el,
        start: `top ${(1 - threshold) * 100}%`,
        end: 'bottom 20%',
        markers: markers && import.meta.env.DEV,
        onEnter: () => tl.play(),
        onLeave: () => tl.reverse(),
        onEnterBack: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
      })
    } else {
      // One-time trigger mode
      const tl = gsap.timeline({
        paused: true,
        delay,
        onComplete: () => {
          gsap.set(targets, { willChange: 'auto' })
        },
      })
      tl.to(targets, animation)

      st = ScrollTrigger.create({
        trigger: el,
        start: `top ${(1 - threshold) * 100}%`,
        once: true,
        markers: markers && import.meta.env.DEV,
        onEnter: () => tl.play(),
      })
    }

    return () => {
      st.kill()
      gsap.killTweensOf(targets)
    }
  }, [
    direction,
    distance,
    scale,
    scaleStart,
    rotate,
    rotateAmount,
    blur,
    blurAmount,
    duration,
    ease,
    scrub,
    threshold,
    prefersReducedMotion,
    delay,
    reverse,
    stagger,
    staggerAmount,
    markers,
  ])

  if (prefersReducedMotion) {
    return <Component className={className}>{children}</Component>
  }

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  )
}
