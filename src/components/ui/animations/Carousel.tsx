import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { motion, PanInfo, useMotionValue, useTransform, MotionValue } from 'framer-motion'

export interface CarouselItem {
  title: string
  description: string
  id: number
  image: string
}

export interface CarouselProps {
  items?: CarouselItem[]
  baseWidth?: number
  autoplay?: boolean
  autoplayDelay?: number
  pauseOnHover?: boolean
  loop?: boolean
  round?: boolean
  /** Enable peek effect to show edges of adjacent items */
  peek?: boolean
  /** Amount of peek in pixels */
  peekAmount?: number
  /** Accessible label for the carousel */
  ariaLabel?: string
}

const DRAG_BUFFER = 0
const VELOCITY_THRESHOLD = 500
const GAP = 16
const SPRING_OPTIONS = { type: 'spring' as const, stiffness: 300, damping: 30 }

interface CarouselItemComponentProps {
  item: CarouselItem
  index: number
  itemWidth: number
  round: boolean
  trackItemOffset: number
  x: MotionValue<number>
  transition: typeof SPRING_OPTIONS | { duration: number }
}

function CarouselItemComponent({
  item,
  index,
  itemWidth,
  round,
  trackItemOffset,
  x,
  transition,
}: CarouselItemComponentProps) {
  const range = [
    -(index + 1) * trackItemOffset,
    -index * trackItemOffset,
    -(index - 1) * trackItemOffset,
  ]
  const outputRange = [90, 0, -90]
  const rotateY = useTransform(x, range, outputRange, { clamp: false })

  return (
    <motion.div
      className={`relative shrink-0 flex flex-col ${
        round
          ? 'items-center justify-center text-center bg-zinc-900 border-0'
          : 'items-start justify-between bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-[24px]'
      } overflow-hidden cursor-grab active:cursor-grabbing shadow-xl hover:shadow-2xl transition-shadow`}
      style={{
        width: itemWidth,
        height: round ? itemWidth : '100%',
        rotateY: rotateY,
        ...(round && { borderRadius: '50%' }),
      }}
      transition={transition}
    >
      {/* Screenshot Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 dark:from-zinc-800 dark:to-zinc-900">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover object-top"
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      {/* Title and description below */}
      <div className="p-4 text-center w-full">
        <div className="font-semibold text-base text-text-primary dark:text-white mb-1">
          {item.title}
        </div>
        <p className="text-sm text-text-secondary dark:text-gray-400 line-clamp-2">
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function Carousel({
  items = [],
  baseWidth = 280,
  autoplay = true,
  autoplayDelay = 3000,
  pauseOnHover = true,
  loop = true,
  round = false,
  peek = false,
  peekAmount = 40,
  ariaLabel = 'Image carousel',
}: CarouselProps) {
  const containerPadding = 16
  const peekPadding = peek ? peekAmount : 0
  const itemWidth = baseWidth - containerPadding * 2 - (peek ? peekAmount * 2 : 0)
  const trackItemOffset = itemWidth + GAP

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const itemsForRender = useMemo(() => {
    if (!loop) return items
    if (items.length === 0) return []
    return [items[items.length - 1], ...items, items[0]]
  }, [items, loop])

  const [position, setPosition] = useState<number>(loop ? 1 : 0)
  const x = useMotionValue(0)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [isJumping, setIsJumping] = useState<boolean>(false)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  const containerRef = useRef<HTMLDivElement>(null)

  // Keyboard navigation
  const goToNext = useCallback(() => {
    if (isAnimating) return
    setPosition((prev) => {
      const max = itemsForRender.length - 1
      return Math.min(prev + 1, max)
    })
  }, [isAnimating, itemsForRender.length])

  const goToPrev = useCallback(() => {
    if (isAnimating) return
    setPosition((prev) => Math.max(prev - 1, 0))
  }, [isAnimating])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      goToNext()
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      goToPrev()
    }
  }, [goToNext, goToPrev])

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current
      const handleMouseEnter = () => setIsHovered(true)
      const handleMouseLeave = () => setIsHovered(false)
      container.addEventListener('mouseenter', handleMouseEnter)
      container.addEventListener('mouseleave', handleMouseLeave)
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [pauseOnHover])

  useEffect(() => {
    if (!autoplay || prefersReducedMotion || itemsForRender.length <= 1) return undefined
    if (pauseOnHover && isHovered) return undefined

    const timer = setInterval(() => {
      setPosition((prev) => Math.min(prev + 1, itemsForRender.length - 1))
    }, autoplayDelay)

    return () => clearInterval(timer)
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length, prefersReducedMotion])

  useEffect(() => {
    const startingPosition = loop ? 1 : 0
    setPosition(startingPosition)
    x.set(-startingPosition * trackItemOffset)
  }, [items.length, loop, trackItemOffset, x])

  useEffect(() => {
    if (!loop && position > itemsForRender.length - 1) {
      setPosition(Math.max(0, itemsForRender.length - 1))
    }
  }, [itemsForRender.length, loop, position])

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS

  const handleAnimationStart = () => {
    setIsAnimating(true)
  }

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false)
      return
    }
    const lastCloneIndex = itemsForRender.length - 1

    if (position === lastCloneIndex) {
      setIsJumping(true)
      const target = 1
      setPosition(target)
      x.set(-target * trackItemOffset)
      requestAnimationFrame(() => {
        setIsJumping(false)
        setIsAnimating(false)
      })
      return
    }

    if (position === 0) {
      setIsJumping(true)
      const target = items.length
      setPosition(target)
      x.set(-target * trackItemOffset)
      requestAnimationFrame(() => {
        setIsJumping(false)
        setIsAnimating(false)
      })
      return
    }

    setIsAnimating(false)
  }

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    const { offset, velocity } = info
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0

    if (direction === 0) return

    setPosition((prev) => {
      const next = prev + direction
      const max = itemsForRender.length - 1
      return Math.max(0, Math.min(next, max))
    })
  }

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
          right: 0,
        },
      }

  const activeIndex =
    items.length === 0
      ? 0
      : loop
        ? (position - 1 + items.length) % items.length
        : Math.min(position, items.length - 1)

  if (items.length === 0) return null

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={`relative overflow-hidden p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
        round
          ? 'rounded-full border border-white'
          : 'rounded-[24px]'
      }`}
      style={{
        width: `${baseWidth}px`,
        paddingLeft: peek ? peekPadding + containerPadding : containerPadding,
        paddingRight: peek ? peekPadding + containerPadding : containerPadding,
        ...(round && { height: `${baseWidth}px` }),
      }}
    >
      <motion.div
        className="flex"
        drag={isAnimating || prefersReducedMotion ? false : 'x'}
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((item, index) => (
          <CarouselItemComponent
            key={`${item?.id ?? index}-${index}`}
            item={item}
            index={index}
            itemWidth={itemWidth}
            round={round}
            trackItemOffset={trackItemOffset}
            x={x}
            transition={effectiveTransition}
          />
        ))}
      </motion.div>

      {/* Dots indicator */}
      <div
        className={`flex w-full justify-center ${
          round ? 'absolute z-20 bottom-12 left-1/2 -translate-x-1/2' : ''
        }`}
        role="tablist"
        aria-label="Carousel navigation"
      >
        <div className="mt-4 flex gap-2">
          {items.map((item, index) => (
            <motion.button
              key={index}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`Go to slide ${index + 1}: ${item.title}`}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                activeIndex === index
                  ? 'bg-primary'
                  : 'bg-gray-300 dark:bg-zinc-600 hover:bg-gray-400 dark:hover:bg-zinc-500'
              }`}
              animate={{
                scale: activeIndex === index ? 1.2 : 1,
              }}
              onClick={() => setPosition(loop ? index + 1 : index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>

      {/* Screen reader live region for slide changes */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Slide ${activeIndex + 1} of ${items.length}: ${items[activeIndex]?.title}`}
      </div>
    </div>
  )
}
