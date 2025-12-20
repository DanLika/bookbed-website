interface LogoIconProps {
  size?: number
  isWhite?: boolean
  darkMode?: boolean
  className?: string
}

export function LogoIcon({ size = 32, isWhite = false, darkMode = false, className = '' }: LogoIconProps) {
  const bgColor = isWhite 
    ? 'bg-white' 
    : darkMode 
      ? 'bg-gradient-to-br from-purple-600 to-purple-400' 
      : 'bg-gradient-to-br from-purple-600 to-purple-400'
  
  const textColor = isWhite ? 'text-purple-600' : 'text-white'

  return (
    <div 
      className={`${bgColor} rounded-lg flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <span className={`${textColor} font-bold text-lg`} style={{ fontSize: `${size * 0.6}px` }}>
        B
      </span>
    </div>
  )
}

