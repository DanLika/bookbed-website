import { useEffect } from 'react'

interface HowToStep {
  name: string
  text: string
}

interface HowToSchemaOptions {
  name: string
  description: string
  steps: HowToStep[]
}

export function useHowToSchema({ name, description, steps }: HowToSchemaOptions) {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name,
      description,
      step: steps.map((step, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: step.name,
        text: step.text,
      })),
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'howto-schema'
    script.textContent = JSON.stringify(schema)

    document.getElementById('howto-schema')?.remove()
    document.head.appendChild(script)

    return () => {
      document.getElementById('howto-schema')?.remove()
    }
  }, [name, description, steps])
}
