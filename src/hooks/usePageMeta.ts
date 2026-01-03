import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface PageMeta {
  title: string
  description: string
}

export function usePageMeta({ title, description }: PageMeta) {
  const location = useLocation()

  useEffect(() => {
    // Update document title
    const previousTitle = document.title
    document.title = title

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    const previousDescription = metaDescription?.getAttribute('content') || ''
    if (metaDescription) {
      metaDescription.setAttribute('content', description)
    }

    // Update canonical URL (always use trailing slash for consistency)
    const canonical = document.querySelector('link[rel="canonical"]')
    const previousCanonical = canonical?.getAttribute('href') || ''
    // Ensure trailing slash for all paths except root
    const pathWithSlash = location.pathname === '/' ? '/' : `${location.pathname.replace(/\/$/, '')}/`
    const newCanonical = `https://bookbed.io${pathWithSlash}`
    if (canonical) {
      canonical.setAttribute('href', newCanonical)
    }

    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    const ogDescription = document.querySelector('meta[property="og:description"]')
    const ogUrl = document.querySelector('meta[property="og:url"]')
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    const twitterDescription = document.querySelector('meta[name="twitter:description"]')

    const previousOgTitle = ogTitle?.getAttribute('content') || ''
    const previousOgDescription = ogDescription?.getAttribute('content') || ''
    const previousOgUrl = ogUrl?.getAttribute('content') || ''
    const previousTwitterTitle = twitterTitle?.getAttribute('content') || ''
    const previousTwitterDescription = twitterDescription?.getAttribute('content') || ''

    if (ogTitle) ogTitle.setAttribute('content', title)
    if (ogDescription) ogDescription.setAttribute('content', description)
    if (ogUrl) ogUrl.setAttribute('content', newCanonical)
    if (twitterTitle) twitterTitle.setAttribute('content', title)
    if (twitterDescription) twitterDescription.setAttribute('content', description)

    // Cleanup: restore previous values on unmount
    return () => {
      document.title = previousTitle
      if (metaDescription) metaDescription.setAttribute('content', previousDescription)
      if (canonical) canonical.setAttribute('href', previousCanonical)
      if (ogTitle) ogTitle.setAttribute('content', previousOgTitle)
      if (ogDescription) ogDescription.setAttribute('content', previousOgDescription)
      if (ogUrl) ogUrl.setAttribute('content', previousOgUrl)
      if (twitterTitle) twitterTitle.setAttribute('content', previousTwitterTitle)
      if (twitterDescription) twitterDescription.setAttribute('content', previousTwitterDescription)
    }
  }, [title, description, location.pathname])
}
