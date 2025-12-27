interface LogoIconProps {
  className?: string
}

export function LogoIcon({ className = '' }: LogoIconProps) {
  return (
    <>
      {/* Light theme logo (shown when NOT in dark mode) */}
      <img
        src="/images/logo-light.avif"
        alt="BookBed"
        title="BookBed"
        width={84}
        height={100}
        loading="eager"
        className={`block dark:hidden object-contain ${className}`}
      />
      {/* Dark theme logo (shown when in dark mode) - white version using CSS filter */}
      <img
        src="/images/logo-light.avif"
        alt="BookBed"
        title="BookBed"
        width={84}
        height={100}
        loading="eager"
        className={`hidden dark:block object-contain brightness-0 invert ${className}`}
        style={{ filter: 'brightness(0) invert(1)' }}
      />
    </>
  )
}
