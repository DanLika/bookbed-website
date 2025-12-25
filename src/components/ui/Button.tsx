import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  // Use @media (hover: hover) via Tailwind's hover variant - only scale on devices that support true hover
  // Mobile gets active:scale-[0.98] for tap feedback, but no hover:scale (which feels weird on touch)
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 transform md:hover:scale-[1.02] active:scale-[0.98]'

  const variants = {
    primary: 'bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white shadow-purple hover:shadow-purple-dark',
    secondary: 'bg-secondary hover:bg-secondary-dark text-white',
    outline: 'bg-transparent border-2 border-gray-200 dark:border-zinc-700 text-text-primary dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-800',
    ghost: 'bg-transparent text-text-primary dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
