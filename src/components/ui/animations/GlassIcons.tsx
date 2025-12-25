import React, { useEffect, useState } from 'react'

export interface GlassIconsItem {
  icon: React.ReactElement
  color: string
  label: string
  customClass?: string
}

export interface GlassIconsProps {
  items: GlassIconsItem[]
  className?: string
}

const gradientMapping: Record<string, string> = {
  blue: 'linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))',
  purple: 'linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))',
  red: 'linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))',
  indigo: 'linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))',
  orange: 'linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))',
  green: 'linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))',
  emerald: 'linear-gradient(hsl(160, 84%, 39%), hsl(152, 76%, 36%))',
  violet: 'linear-gradient(hsl(263, 90%, 50%), hsl(250, 90%, 50%))',
  amber: 'linear-gradient(hsl(45, 93%, 47%), hsl(38, 92%, 50%))',
  cyan: 'linear-gradient(hsl(187, 85%, 43%), hsl(192, 91%, 36%))',
}

const GlassIcons: React.FC<GlassIconsProps> = ({ items, className }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const getBackgroundStyle = (color: string): React.CSSProperties => {
    if (gradientMapping[color]) {
      return { background: gradientMapping[color] }
    }
    return { background: color }
  }

  return (
    <div className={`grid gap-8 sm:gap-12 grid-cols-2 md:grid-cols-3 mx-auto py-8 overflow-visible ${className || ''}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col items-center ${item.customClass || ''}`}
        >
          <div
            className={`relative bg-transparent w-16 h-16 sm:w-20 sm:h-20 [perspective:24em] [transform-style:preserve-3d] group ${
              prefersReducedMotion ? '' : 'cursor-pointer'
            }`}
          >
            {/* Background colored layer */}
            <span
              className={`absolute top-0 left-0 w-full h-full rounded-2xl block origin-[100%_100%] rotate-[15deg] [will-change:transform] ${
                prefersReducedMotion
                  ? ''
                  : 'transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] group-hover:[transform:rotate(25deg)_translate3d(-0.5em,-0.5em,0.5em)]'
              }`}
              style={{
                ...getBackgroundStyle(item.color),
                boxShadow: '0.5em -0.5em 0.75em hsla(223, 10%, 10%, 0.15)',
              }}
            />

            {/* Glass layer with icon */}
            <span
              className={`absolute top-0 left-0 w-full h-full rounded-2xl bg-[hsla(0,0%,100%,0.15)] origin-[80%_50%] flex backdrop-blur-[0.75em] [will-change:transform] ${
                prefersReducedMotion
                  ? ''
                  : 'transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] group-hover:[transform:translate3d(0,0,2em)]'
              }`}
              style={{
                boxShadow: '0 0 0 0.1em hsla(0, 0%, 100%, 0.3) inset',
              }}
            >
              <span className="m-auto w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white" aria-hidden="true">
                {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, {
                  className: 'w-full h-full',
                })}
              </span>
            </span>
          </div>

          {/* Label */}
          <span
            className={`mt-4 text-sm sm:text-base font-medium text-text-primary dark:text-white text-center ${
              prefersReducedMotion
                ? 'opacity-100'
                : 'opacity-70 transition-opacity duration-300 group-hover:opacity-100'
            }`}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default GlassIcons
