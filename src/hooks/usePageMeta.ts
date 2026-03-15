import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface PageMeta {
  title: string
  description: string
  ogImage?: string
  noindex?: boolean
}

export function usePageMeta({ title, description, ogImage, noindex }: PageMeta) {
  const location = useLocation()
  const { i18n } = useTranslation()

  // Dynamic <html lang> attribute based on current language
  useEffect(() => {
    document.documentElement.lang = i18n.language === 'en' ? 'en' : 'hr'
  }, [i18n.language])

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

    // Update meta robots for noindex pages
    const robotsMeta = document.querySelector('meta[name="robots"]')
    const previousRobots = robotsMeta?.getAttribute('content') || ''
    if (robotsMeta) {
      robotsMeta.setAttribute('content', noindex ? 'noindex, nofollow' : 'index, follow')
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
    const ogImageTag = document.querySelector('meta[property="og:image"]')
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    const twitterDescription = document.querySelector('meta[name="twitter:description"]')
    const twitterImage = document.querySelector('meta[name="twitter:image"]')

    const previousOgTitle = ogTitle?.getAttribute('content') || ''
    const previousOgDescription = ogDescription?.getAttribute('content') || ''
    const previousOgUrl = ogUrl?.getAttribute('content') || ''
    const previousOgImage = ogImageTag?.getAttribute('content') || ''
    const previousTwitterTitle = twitterTitle?.getAttribute('content') || ''
    const previousTwitterDescription = twitterDescription?.getAttribute('content') || ''
    const previousTwitterImage = twitterImage?.getAttribute('content') || ''

    if (ogTitle) ogTitle.setAttribute('content', title)
    if (ogDescription) ogDescription.setAttribute('content', description)
    if (ogUrl) ogUrl.setAttribute('content', newCanonical)
    if (twitterTitle) twitterTitle.setAttribute('content', title)
    if (twitterDescription) twitterDescription.setAttribute('content', description)

    if (ogImage) {
      const fullImageUrl = ogImage.startsWith('http') ? ogImage : `https://bookbed.io${ogImage}`
      if (ogImageTag) ogImageTag.setAttribute('content', fullImageUrl)
      if (twitterImage) twitterImage.setAttribute('content', fullImageUrl)
    }

    // Update hreflang tags to match current page
    document.querySelectorAll('link[hreflang]').forEach((link) => {
      const currentHref = link.getAttribute('href')
      if (currentHref?.startsWith('https://bookbed.io')) {
        link.setAttribute('href', newCanonical)
      }
    })

    // Cleanup: restore previous values on unmount
    return () => {
      document.title = previousTitle
      if (metaDescription) metaDescription.setAttribute('content', previousDescription)
      if (robotsMeta) robotsMeta.setAttribute('content', previousRobots)
      if (canonical) canonical.setAttribute('href', previousCanonical)
      if (ogTitle) ogTitle.setAttribute('content', previousOgTitle)
      if (ogDescription) ogDescription.setAttribute('content', previousOgDescription)
      if (ogUrl) ogUrl.setAttribute('content', previousOgUrl)
      if (ogImageTag) ogImageTag.setAttribute('content', previousOgImage)
      if (twitterTitle) twitterTitle.setAttribute('content', previousTwitterTitle)
      if (twitterDescription) twitterDescription.setAttribute('content', previousTwitterDescription)
      if (twitterImage) twitterImage.setAttribute('content', previousTwitterImage)
    }
  }, [title, description, ogImage, noindex, location.pathname])
}
