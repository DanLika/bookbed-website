import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  }

  const [matches, setMatches] = useState<boolean>(getMatches(query))

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
      return;
    }
    const matchMedia = window.matchMedia(query)

    const handleChange = () => {
      setMatches(getMatches(query))
    }

    // Listen for changes
    matchMedia.addEventListener('change', handleChange)

    // Set initial value
    handleChange();

    return () => {
      matchMedia.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}
