interface LogoIconProps {
  size?: number
  className?: string
}

export function LogoIcon({ size = 32, className = '' }: LogoIconProps) {
  return (
    <>
      {/* Light theme logo (shown when NOT in dark mode) */}
      <img
        src="/images/logo-light.avif"
        alt="BookBed"
        className={`block dark:hidden object-contain ${className}`}
      />
      {/* Dark theme logo (shown when in dark mode) - white version using CSS filter */}
      <img
        src="/images/logo-light.avif"
        alt="BookBed"
        className={`hidden dark:block object-contain brightness-0 invert ${className}`}
        style={{ filter: 'brightness(0) invert(1)' }}
      />
    </>
  )
}
