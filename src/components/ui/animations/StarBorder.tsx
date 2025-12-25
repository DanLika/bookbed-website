import React, { useEffect, useState, useCallback } from 'react'

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  /** HTML element to render as */
  as?: T
  /** Additional className */
  className?: string
  /** Content inside the border */
  children?: React.ReactNode
  /** Primary border color */
  color?: string
  /** Secondary color for gradient effect */
  colorSecondary?: string
  /** Animation speed (CSS duration value) */
  speed?: React.CSSProperties['animationDuration']
  /** Border thickness in pixels */
  thickness?: number
  /** Border radius in pixels */
  borderRadius?: number
  /** Inner background color (light theme) */
  innerBg?: string
  /** Inner background color (dark theme) */
  innerBgDark?: string
  /** Disable animation */
  disabled?: boolean
  /** Reverse animation direction */
  reverse?: boolean
  /** Pause animation on hover */
  pauseOnHover?: boolean
  /** Gradient spread (how much of the circle is visible, 0-1) */
  gradientSpread?: number
}

const StarBorder = <T extends React.ElementType = 'button'>({
  as,
  className = '',
  color = '#6B4CE6',
  colorSecondary,
  speed = '4s',
  thickness = 2,
  borderRadius = 12,
  innerBg,
  innerBgDark,
  disabled = false,
  reverse = false,
  pauseOnHover = false,
  gradientSpread = 0.2,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || 'button'
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsHovered(true)
  }, [pauseOnHover])

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsHovered(false)
  }, [pauseOnHover])

  const shouldAnimate = !disabled && !prefersReducedMotion
  const isPaused = pauseOnHover && isHovered

  // Build conic gradient with optional secondary color
  const buildGradient = () => {
    const spread = Math.max(0, Math.min(1, gradientSpread))
    const colorStops = colorSecondary
      ? `transparent, ${color}, ${colorSecondary}, ${color}, transparent`
      : `transparent, ${color}, transparent, transparent, transparent`

    // Adjust gradient based on spread
    if (spread !== 0.2) {
      const spreadPercent = spread * 100
      return colorSecondary
        ? `conic-gradient(from 0deg, transparent 0%, ${color} ${spreadPercent / 2}%, ${colorSecondary} ${spreadPercent}%, ${color} ${spreadPercent * 1.5}%, transparent ${spreadPercent * 2}%, transparent 100%)`
        : `conic-gradient(from 0deg, transparent 0%, ${color} ${spreadPercent}%, transparent ${spreadPercent * 2}%, transparent 100%)`
    }

    return `conic-gradient(from 0deg, ${colorStops})`
  }

  // Inner border radius is outer minus thickness
  const innerRadius = Math.max(0, borderRadius - thickness)

  return (
    <Component
      className={`relative inline-block ${className}`}
      {...(rest as React.ComponentPropsWithoutRef<T>)}
      style={{
        padding: `${thickness}px`,
        borderRadius: `${borderRadius}px`,
        ...(rest as { style?: React.CSSProperties }).style
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated rotating gradient border */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          borderRadius: `${borderRadius}px`,
          background: !shouldAnimate
            ? `linear-gradient(90deg, ${color}30, ${color}, ${color}30)`
            : undefined,
        }}
        aria-hidden="true"
      >
        {shouldAnimate && (
          <div
            className="absolute inset-[-100%]"
            style={{
              background: buildGradient(),
              animation: `spin ${speed} linear infinite`,
              animationDirection: reverse ? 'reverse' : 'normal',
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          />
        )}
      </div>
      {/* Inner background to create border effect */}
      <div
        className={innerBg ? '' : 'bg-white dark:bg-zinc-800'}
        style={{
          position: 'absolute',
          inset: `${thickness}px`,
          borderRadius: `${innerRadius}px`,
          ...(innerBg && { backgroundColor: innerBg }),
          ...(innerBgDark && { ['--inner-bg-dark' as string]: innerBgDark }),
        }}
        aria-hidden="true"
      />
      {/* Content */}
      <div className="relative z-[1]">
        {children}
      </div>
    </Component>
  )
}

export default StarBorder
