interface LogoIconProps {
  size?: number
  className?: string
}

export function LogoIcon({ size = 32, className = '' }: LogoIconProps) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Light theme logo (shown when NOT in dark mode) */}
      <img
        src="/images/logo-light.avif"
        alt="BookBed"
        className="block dark:hidden w-full h-full object-contain"
      />
      {/* Dark theme logo (shown when in dark mode) - white version using CSS filter */}
      <img
        src="/images/logo-light.avif"
        alt="BookBed"
        className="hidden dark:block w-full h-full object-contain brightness-0 invert"
        style={{ filter: 'brightness(0) invert(1)' }}
      />
    </div>
  )
}
