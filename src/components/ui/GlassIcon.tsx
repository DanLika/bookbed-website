import { ReactNode } from 'react'

interface GlassIconProps {
  children: ReactNode
  className?: string
  color?: 'primary' | 'emerald' | 'blue' | 'amber' | 'gray'
  size?: 'sm' | 'md' | 'lg'
}

const colorClasses = {
  primary: 'bg-primary/15 dark:bg-primary/25 border-primary/25 dark:border-primary/40 group-hover:bg-primary/25 dark:group-hover:bg-primary/35 text-primary dark:text-primary-light',
  emerald: 'bg-emerald-500/15 dark:bg-emerald-500/25 border-emerald-500/25 dark:border-emerald-500/40 group-hover:bg-emerald-500/25 dark:group-hover:bg-emerald-500/35 text-emerald-600 dark:text-emerald-400',
  blue: 'bg-blue-500/15 dark:bg-blue-500/25 border-blue-500/25 dark:border-blue-500/40 group-hover:bg-blue-500/25 dark:group-hover:bg-blue-500/35 text-blue-600 dark:text-blue-400',
  amber: 'bg-amber-500/15 dark:bg-amber-500/25 border-amber-500/25 dark:border-amber-500/40 group-hover:bg-amber-500/25 dark:group-hover:bg-amber-500/35 text-amber-600 dark:text-amber-400',
  gray: 'bg-gray-500/15 dark:bg-gray-500/25 border-gray-500/25 dark:border-gray-500/40 group-hover:bg-gray-500/25 dark:group-hover:bg-gray-500/35 text-gray-600 dark:text-gray-400',
}

const sizeClasses = {
  sm: 'w-8 h-8 rounded-lg',
  md: 'w-12 h-12 rounded-xl',
  lg: 'w-16 h-16 rounded-2xl',
}

export default function GlassIcon({ children, className = '', color = 'primary', size = 'md' }: GlassIconProps) {
  return (
    <div
      className={`flex-shrink-0 backdrop-blur-xl border flex items-center justify-center transition-all duration-300 ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
    >
      {children}
    </div>
  )
}
