import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LetterSwapForwardProps {
  text: string
  className?: string
  staggerDelay?: number
  reverse?: boolean
}

export default function LetterSwapForward({
  text,
  className = '',
  staggerDelay = 0.03,
  reverse = false,
}: LetterSwapForwardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const letters = text.split('')

  // If reduced motion, just render static text
  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>
  }

  return (
    <span
      ref={containerRef}
      className={`relative inline-block overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ verticalAlign: 'baseline' }}
    >
      {/* Original text for layout measurement */}
      <span className="invisible">{text}</span>

      {/* Animated letters container */}
      <span className="absolute inset-0 flex">
        {letters.map((letter, index) => {
          const delay = reverse
            ? (letters.length - 1 - index) * staggerDelay
            : index * staggerDelay

          return (
            <span
              key={`${letter}-${index}`}
              className="relative inline-block overflow-hidden"
              style={{ width: letter === ' ' ? '0.25em' : 'auto' }}
            >
              <AnimatePresence mode="popLayout">
                {!isHovered ? (
                  <motion.span
                    key="original"
                    initial={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{
                      duration: 0.2,
                      delay,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="inline-block"
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ) : (
                  <motion.span
                    key="hovered"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{
                      duration: 0.2,
                      delay,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="inline-block"
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          )
        })}
      </span>
    </span>
  )
}
