import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import DocsLayout from '../../components/DocsLayout'
import { usePageMeta } from '../../hooks/usePageMeta'
import { FiArrowRight, FiArrowLeft, FiCheckCircle } from 'react-icons/fi'

interface GenericDocsPageProps {
  sectionKey: string
  prevPath?: string
  prevLabelKey?: string
  nextPath?: string
  nextLabelKey?: string
}

const GenericDocsPage = ({ sectionKey, prevPath, prevLabelKey, nextPath, nextLabelKey }: GenericDocsPageProps) => {
  const { t, i18n } = useTranslation()

  const title = t(`docs.${sectionKey}.title`)

  usePageMeta({
    title: `${title} - BookBed ${i18n.language === 'hr' ? 'Dokumentacija' : 'Documentation'}`,
    description: t(`docs.${sectionKey}.intro`)
  })

  // Get content sections dynamically
  const intro = t(`docs.${sectionKey}.intro`, { defaultValue: '' })
  const sections = t(`docs.${sectionKey}.sections`, { returnObjects: true, defaultValue: [] }) as Array<{
    title: string
    content: string
    items?: string[]
  }>

  return (
    <DocsLayout>
      <h1 className="text-text-primary dark:text-white">{title}</h1>
      {intro && <p className="lead text-text-secondary dark:text-gray-300">{intro}</p>}

      <div className="not-prose space-y-6 mt-8">
        {Array.isArray(sections) && sections.map((section, index) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-6 border border-gray-100 dark:border-zinc-700"
          >
            <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-3 flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary dark:text-primary-light text-sm font-bold">
                {index + 1}
              </span>
              {section.title}
            </h3>
            <p className="text-text-secondary dark:text-gray-400 mb-4 leading-relaxed">
              {section.content}
            </p>
            {section.items && section.items.length > 0 && (
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-text-secondary dark:text-gray-400">
                    <FiCheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="not-prose mt-10 pt-8 border-t border-gray-200 dark:border-zinc-700 flex flex-wrap gap-4">
        {prevPath && (
          <Link
            to={prevPath}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-zinc-600 hover:bg-gray-50 dark:hover:bg-zinc-800 text-text-primary dark:text-white font-medium rounded-lg transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" /> {prevLabelKey ? t(prevLabelKey) : t('docs.previous')}
          </Link>
        )}
        {nextPath && (
          <Link
            to={nextPath}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors shadow-purple"
          >
            {nextLabelKey ? t(nextLabelKey) : t('docs.next')} <FiArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </DocsLayout>
  )
}

export default GenericDocsPage
