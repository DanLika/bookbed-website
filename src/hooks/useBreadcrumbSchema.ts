import { useEffect } from 'react'

interface BreadcrumbItem {
  name: string
  url: string
}

export function useBreadcrumbSchema(items: BreadcrumbItem[]) {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: item.url,
      })),
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'breadcrumb-schema'
    script.textContent = JSON.stringify(schema)

    document.getElementById('breadcrumb-schema')?.remove()
    document.head.appendChild(script)

    return () => {
      document.getElementById('breadcrumb-schema')?.remove()
    }
  }, [items])
}
