import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  const baseStyles = 'bg-white dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700 transition-all duration-300'

  const hoverStyles = hover
    ? 'hover:border-primary dark:hover:border-primary-light hover:shadow-xl hover:shadow-purple/10 hover:-translate-y-1'
    : ''

  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  )
}
