import { useEffect } from 'react'

const useScrollAnimation = (selector: string, threshold = 0.1) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    elements.forEach((element) => {
      observer.observe(element)
    })

    return () => {
      elements.forEach((element) => {
        observer.unobserve(element)
      })
    }
  }, [selector, threshold])
}

export default useScrollAnimation

