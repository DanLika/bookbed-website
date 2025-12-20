import type { ReactNode } from 'react'

interface FloatingCardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'pill'
}

export default function FloatingCard({
  children,
  className = '',
  variant = 'default',
}: FloatingCardProps) {
  const baseClasses = 'bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 animate-float'
  
  const variantClasses = {
    default: 'rounded-xl p-4',
    pill: 'rounded-full',
  }

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  )
}