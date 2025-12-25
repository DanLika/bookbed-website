import { useState, useEffect } from 'react'
import MetallicPaint, { parseLogoImage } from './ui/MetallicPaint'

export default function MetallicLogo({ className = '' }: { className?: string }) {
  const [imageData, setImageData] = useState<ImageData | null>(null)

  useEffect(() => {
    async function loadLogo() {
      try {
        const response = await fetch('/images/logo-black.svg')
        const blob = await response.blob()
        const file = new File([blob], 'logo.svg', { type: 'image/svg+xml' })

        const parsedData = await parseLogoImage(file)
        setImageData(parsedData?.imageData ?? null)
      } catch (err) {
        console.error('Error loading logo:', err)
      }
    }

    loadLogo()
  }, [])

  if (!imageData) {
    return <div className={`${className} animate-pulse bg-gray-200 dark:bg-zinc-800 rounded-lg`} />
  }

  return (
    <div className={className}>
      <MetallicPaint
        imageData={imageData}
        params={{
          edge: 2,
          patternBlur: 0.005,
          patternScale: 2,
          refraction: 0.015,
          speed: 0.3,
          liquid: 0.07
        }}
      />
    </div>
  )
}
