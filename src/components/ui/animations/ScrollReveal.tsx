import { useEffect, useRef, useState, useMemo, ElementType } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type RevealDirection = 'up' | 'down' | 'left' | 'right'
type AnimateBy = 'words' | 'characters' | 'lines'

interface ScrollRevealProps {
  children: string
  /** Enable blur effect during reveal */
  blur?: boolean
  /** Blur amount in pixels */
  blurAmount?: number
  /** Stagger delay between elements (seconds) */
  stagger?: number
  /** Animation duration per element (seconds) */
  duration?: number
  /** GSAP easing function */
  ease?: string
  /** Viewport threshold (0-1) to trigger animation */
  threshold?: number
  /** Starting rotation on X axis (degrees) */
  rotateX?: number
  /** Additional className */
  className?: string
  /** Text color class */
  textClassName?: string
  /** Animation direction */
  direction?: RevealDirection
  /** Animate by words, characters, or lines */
  animateBy?: AnimateBy
  /** Enable scale effect */
  scale?: boolean
  /** Starting scale value */
  scaleStart?: number
  /** Scrub animation with scroll */
  scrub?: boolean | number
  /** HTML element to render as */
  as?: ElementType
  /** Delay before animation starts */
  delay?: number
}

export default function ScrollReveal({
  children,
  blur = true,
  blurAmount = 6,
  stagger = 0.04,
  duration = 0.6,
  ease = 'power3.out',
  threshold = 0.2,
  rotateX = 20,
  className = '',
  textClassName = '',
  direction = 'up',
  animateBy = 'words',
  scale = true,
  scaleStart = 0.9,
  scrub = false,
  as: Component = 'span',
  delay = 0,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Split text based on animateBy option
  const elements = useMemo(() => {
    if (animateBy === 'characters') {
      return children.split('').map((char, i) => ({
        content: char === ' ' ? '\u00A0' : char,
        key: i,
        isSpace: char === ' ',
      }))
    }
    // Default: words
    return children.split(' ').map((word, i) => ({
      content: word,
      key: i,
      isSpace: false,
    }))
  }, [children, animateBy])

  // Calculate initial position based on direction
  const getInitialPosition = () => {
    const distance = 30
    switch (direction) {
      case 'up': return { x: 0, y: distance }
      case 'down': return { x: 0, y: -distance }
      case 'left': return { x: distance, y: 0 }
      case 'right': return { x: -distance, y: 0 }
      default: return { x: 0, y: distance }
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container || prefersReducedMotion) return

    const revealElements = container.querySelectorAll('.scroll-reveal-element')
    const initialPos = getInitialPosition()

    gsap.set(revealElements, {
      opacity: 0,
      x: initialPos.x,
      y: initialPos.y,
      scale: scale ? scaleStart : 1,
      rotateX: direction === 'up' || direction === 'down' ? rotateX : 0,
      rotateY: direction === 'left' || direction === 'right' ? rotateX : 0,
      filter: blur ? `blur(${blurAmount}px)` : 'blur(0px)',
      willChange: 'opacity, transform, filter',
    })

    const tl = gsap.timeline({
      paused: !scrub,
      delay: scrub ? 0 : delay,
      onComplete: () => {
        gsap.set(revealElements, { willChange: 'auto' })
      },
    })

    tl.to(revealElements, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      filter: 'blur(0px)',
      duration: scrub ? 1 : duration,
      ease,
      stagger,
    })

    let st: ScrollTrigger

    if (scrub) {
      st = ScrollTrigger.create({
        trigger: container,
        start: `top ${(1 - threshold) * 100}%`,
        end: 'top 30%',
        scrub: typeof scrub === 'number' ? scrub : 0.5,
        animation: tl,
      })
    } else {
      st = ScrollTrigger.create({
        trigger: container,
        start: `top ${(1 - threshold) * 100}%`,
        once: true,
        onEnter: () => tl.play(),
      })
    }

    return () => {
      st.kill()
      tl.kill()
    }
  }, [blur, blurAmount, stagger, duration, ease, threshold, rotateX, prefersReducedMotion, direction, scale, scaleStart, scrub, delay])

  if (prefersReducedMotion) {
    return (
      <Component className={className}>
        {children}
      </Component>
    )
  }

  return (
    <Component
      ref={containerRef}
      className={`inline-block [perspective:1000px] ${className}`}
    >
      {elements.map((element) => (
        <span
          key={element.key}
          className={`scroll-reveal-element inline-block [transform-style:preserve-3d] ${
            animateBy === 'words' ? 'mr-[0.25em] last:mr-0' : ''
          } ${textClassName}`}
        >
          {element.content}
        </span>
      ))}
    </Component>
  )
}
