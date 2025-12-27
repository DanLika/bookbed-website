import React, { useLayoutEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { GoArrowUpRight } from 'react-icons/go'

type CardNavLink = {
  label: string
  href: string
  ariaLabel: string
}

export type CardNavItem = {
  label: string
  bgColor: string
  textColor: string
  links: CardNavLink[]
}

export interface CardNavProps {
  logo: string
  logoAlt?: string
  items: CardNavItem[]
  className?: string
  ease?: string
  baseColor?: string
  menuColor?: string
  buttonBgColor?: string
  buttonTextColor?: string
  buttonText?: string
  onButtonClick?: () => void
  isDark?: boolean
  onToggleTheme?: () => void
  onToggleLanguage?: () => void
  currentLanguage?: string
}

const CardNav: React.FC<CardNavProps> = ({
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#6B4CE6',
  menuColor = '#FFFFFF',
  buttonBgColor = '#FFFFFF',
  buttonTextColor = '#2D3748',
  buttonText = 'Get Started',
  onButtonClick,
  isDark = false,
  onToggleTheme,
  onToggleLanguage,
  currentLanguage = 'en'
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const navRef = useRef<HTMLDivElement | null>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  // Cache calculated height to avoid repeated forced reflows
  const cachedHeightRef = useRef<number | null>(null)

  // Optimized height calculation - uses cached value when available
  // Only recalculates on resize (which is debounced)
  const calculateHeight = useCallback((forceRecalculate = false) => {
    // Return cached value if available and not forcing recalculation
    if (!forceRecalculate && cachedHeightRef.current !== null) {
      return cachedHeightRef.current
    }

    const navEl = navRef.current
    if (!navEl) return 260

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement
      if (contentEl) {
        // Batch all reads first (avoid read-write-read pattern)
        const wasVisible = contentEl.style.visibility
        const wasPointerEvents = contentEl.style.pointerEvents
        const wasPosition = contentEl.style.position
        const wasHeight = contentEl.style.height

        // Batch all writes together
        contentEl.style.cssText = `
          visibility: visible !important;
          pointer-events: auto !important;
          position: static !important;
          height: auto !important;
        `

        // Single layout read (still triggers reflow but only once)
        const topBar = 60
        const padding = 16
        const contentHeight = contentEl.scrollHeight
        const calculatedHeight = topBar + contentHeight + padding

        // Restore styles
        contentEl.style.visibility = wasVisible
        contentEl.style.pointerEvents = wasPointerEvents
        contentEl.style.position = wasPosition
        contentEl.style.height = wasHeight

        // Cache the result
        cachedHeightRef.current = calculatedHeight
        return calculatedHeight
      }
    }

    cachedHeightRef.current = 260
    return 260
  }, [])

  const createTimeline = () => {
    const navEl = navRef.current
    if (!navEl) return null

    gsap.set(navEl, { height: 60, overflow: 'hidden' })
    gsap.set(cardsRef.current, { y: 50, opacity: 0 })

    const tl = gsap.timeline({ paused: true })

    tl.to(navEl, {
      height: () => calculateHeight(),
      duration: 0.4,
      ease
    })

    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1')

    return tl
  }

  useLayoutEffect(() => {
    // Defer GSAP timeline creation to reduce main thread blocking during initial load
    // This improves TBT (Total Blocking Time) significantly
    const scheduleInit = typeof requestIdleCallback !== 'undefined'
      ? requestIdleCallback
      : (cb: () => void) => setTimeout(cb, 1)

    const cancelInit = typeof cancelIdleCallback !== 'undefined'
      ? cancelIdleCallback
      : clearTimeout

    let initId: number | ReturnType<typeof setTimeout>

    // Schedule timeline creation for when browser is idle
    initId = scheduleInit(() => {
      const tl = createTimeline()
      tlRef.current = tl

      // Defer accurate height calculation to after paint
      requestAnimationFrame(() => {
        cachedHeightRef.current = null // Invalidate default cache
        calculateHeight(true)
      })
    })

    return () => {
      cancelInit(initId as number)
      tlRef.current?.kill()
      tlRef.current = null
    }
  }, [ease, items, calculateHeight])

  useLayoutEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout> | null = null

    const handleResize = () => {
      // Debounce resize events to reduce main thread work
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        if (!tlRef.current) return

        // Invalidate cache on resize
        cachedHeightRef.current = null

        if (isExpanded) {
          const newHeight = calculateHeight(true) // Force recalculation
          gsap.set(navRef.current, { height: newHeight })

          tlRef.current.kill()
          const newTl = createTimeline()
          if (newTl) {
            newTl.progress(1)
            tlRef.current = newTl
          }
        } else {
          tlRef.current.kill()
          const newTl = createTimeline()
          if (newTl) {
            tlRef.current = newTl
          }
        }
      }, 150)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      if (resizeTimer) clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
    }
  }, [isExpanded])

  const toggleMenu = () => {
    let tl = tlRef.current

    // Recreate timeline if it was killed/nullified
    if (!tl) {
      tl = createTimeline()
      tlRef.current = tl
      if (!tl) return // Still null, nav ref not ready
    }

    if (!isExpanded) {
      setIsHamburgerOpen(true)
      setIsExpanded(true)
      tl.play(0)
    } else {
      setIsHamburgerOpen(false)
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false))
      tl.reverse()
    }
  }

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el
  }

  return (
    <div
      className={`card-nav-container fixed left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-50 top-2 sm:top-4 ${className}`}
    >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? 'open' : ''} block h-[60px] p-0 rounded-xl shadow-lg border relative overflow-hidden`}
        style={{
          backgroundColor: baseColor,
          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          willChange: isExpanded ? 'height' : 'auto', // Only hint when animating
          contain: 'layout style' // CSS containment for better performance
        }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between px-4 z-[2]">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] w-[40px] flex-shrink-0`}
            onClick={toggleMenu}
            onKeyDown={(e) => e.key === 'Enter' && toggleMenu()}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            aria-expanded={isExpanded}
            tabIndex={0}
            style={{ color: menuColor || '#000' }}
          >
            <div
              className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''
              } group-hover:opacity-75`}
            />
            <div
              className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''
              } group-hover:opacity-75`}
            />
          </div>

          <div className="logo-container flex items-center gap-3 flex-1 justify-center">
            <img
              src="/images/logo-light.avif"
              alt="BookBed"
              title="BookBed"
              width={84}
              height={100}
              loading="eager"
              className="h-[36px] w-[36px] object-contain dark:hidden"
            />
            <img
              src="/images/logo-light.avif"
              alt="BookBed"
              title="BookBed"
              width={84}
              height={100}
              loading="eager"
              className="h-[36px] w-[36px] object-contain hidden dark:block brightness-0 invert"
            />
            <span
              className="text-lg font-bold tracking-tight"
              style={{ color: menuColor }}
            >
              BookBed
            </span>
          </div>

          <div className="flex items-center gap-2.5 flex-shrink-0">
            {/* Language Toggle - Globe Icon */}
            {onToggleLanguage && (
              <button
                type="button"
                onClick={onToggleLanguage}
                className="p-2 rounded-lg border transition-all hover:opacity-75 active:scale-95"
                style={{
                  color: menuColor,
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
                  borderWidth: '1px'
                }}
                aria-label={currentLanguage === 'en' ? 'Switch to Croatian' : 'Switch to English'}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </button>
            )}

            {/* Theme Toggle */}
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className="p-2 rounded-lg border transition-all hover:opacity-75 active:scale-95"
                style={{
                  color: menuColor,
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
                  borderWidth: '1px'
                }}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            )}

            {/* CTA Button - Desktop only */}
            <button
              type="button"
              onClick={onButtonClick}
              className="hidden md:flex card-nav-cta-button border-0 rounded-[calc(0.75rem-0.2rem)] px-4 py-2 font-semibold cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95 text-sm items-center justify-center"
              style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
            >
              {buttonText}
            </button>
          </div>
        </div>

        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] ${
            isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          } md:flex-row md:items-end md:gap-[12px]`}
          aria-hidden={!isExpanded}
        >
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card select-none relative flex flex-col gap-2 p-[12px_16px] rounded-[calc(0.75rem-0.2rem)] min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%]"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label font-normal tracking-[-0.5px] text-[18px] md:text-[22px]">
                {item.label}
              </div>
              <div className="nav-card-links mt-auto flex flex-col gap-[2px]">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 text-[15px] md:text-[16px]"
                    href={lnk.href}
                    title={lnk.ariaLabel}
                    aria-label={lnk.ariaLabel}
                  >
                    <GoArrowUpRight className="nav-card-link-icon shrink-0" aria-hidden="true" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default CardNav
