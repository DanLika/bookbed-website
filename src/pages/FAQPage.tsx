import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { spacing, heroSpacing, getSectionSpacing } from '../utils/spacing'
import { typography } from '../utils/typography'
import FadeContent from '../components/ui/animations/FadeContent'
import GradientText from '../components/ui/animations/GradientText'

interface FAQItem {
    question: string
    answer: string
    links?: { text: string; href: string }[]
}

interface FAQCategory {
    key: string
    icon: React.ReactNode
    items: FAQItem[]
}

function AccordionItem({
    question,
    answer,
    links,
    isOpen,
    onToggle,
    index
}: {
    question: string
    answer: string
    links?: { text: string; href: string }[]
    isOpen: boolean
    onToggle: () => void
    index: number
}) {
    return (
        <FadeContent
            duration={400}
            delay={100 + index * 50}
            direction="up"
            distance={15}
        >
            <div className="border border-gray-200 dark:border-zinc-700 rounded-xl overflow-hidden bg-white dark:bg-zinc-800/50 hover:border-primary/30 dark:hover:border-primary-light/30 transition-colors duration-200">
                <button
                    onClick={onToggle}
                    className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between text-left gap-4"
                    aria-expanded={isOpen}
                >
                    <span className="text-base sm:text-lg font-medium text-text-primary dark:text-white pr-4">
                        {question}
                    </span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0"
                    >
                        <svg
                            className="w-5 h-5 text-primary dark:text-primary-light"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </motion.div>
                </button>
                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                        >
                            <div className="px-5 pb-4 sm:px-6 sm:pb-5 text-text-secondary dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                                <p>{answer}</p>
                                {links && links.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {links.map((link, idx) => (
                                            <Link
                                                key={idx}
                                                to={link.href}
                                                className="inline-flex items-center gap-1 text-primary dark:text-primary-light hover:underline text-sm font-medium"
                                            >
                                                {link.text}
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </FadeContent>
    )
}

function FAQCategorySection({
    category,
    categoryIndex,
    t
}: {
    category: FAQCategory
    categoryIndex: number
    t: (key: string, options?: Record<string, unknown>) => string
}) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const title = t(`faqPage.categories.${category.key}.title`)
    const items: FAQItem[] = []

    // Get items from translations
    let itemIndex = 0
    while (true) {
        const question = t(`faqPage.categories.${category.key}.items.${itemIndex}.question`, { defaultValue: '' })
        if (!question) break
        const answer = t(`faqPage.categories.${category.key}.items.${itemIndex}.answer`, { defaultValue: '' })
        items.push({ question, answer })
        itemIndex++
    }

    return (
        <FadeContent
            duration={500}
            delay={categoryIndex * 100}
            direction="up"
            distance={30}
        >
            <div className="mb-10 sm:mb-12">
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 dark:bg-primary-light/10 flex items-center justify-center flex-shrink-0">
                        {category.icon}
                    </div>
                    <h2 className={`${typography.h3} font-bold text-text-primary dark:text-white`}>
                        {title}
                    </h2>
                </div>
                <div className="space-y-3">
                    {items.map((item, index) => (
                        <AccordionItem
                            key={index}
                            question={item.question}
                            answer={item.answer}
                            links={item.links}
                            isOpen={openIndex === index}
                            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </FadeContent>
    )
}

import { usePageMeta } from '../hooks/usePageMeta'

export default function FAQPage() {
    const { t } = useTranslation()

    // Page-specific SEO meta tags
    usePageMeta({
        title: t('faqPage.meta.title'),
        description: t('faqPage.meta.description')
    })

    const categories: FAQCategory[] = [
        {
            key: 'about',
            icon: (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary dark:text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            items: []
        },
        {
            key: 'pricing',
            icon: (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary dark:text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            items: []
        },
        {
            key: 'gettingStarted',
            icon: (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary dark:text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            items: []
        },
        {
            key: 'features',
            icon: (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary dark:text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
            ),
            items: []
        },
        {
            key: 'security',
            icon: (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary dark:text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            items: []
        },
        {
            key: 'support',
            icon: (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary dark:text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            items: []
        }
    ]

    return (
        <div className="relative min-h-screen bg-white dark:bg-zinc-900 overflow-hidden">
            {/* Subtle dot pattern background */}
            <div
                className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                }}
            />

            {/* Hero Section */}
            <section className={`relative ${heroSpacing.paddingTop} pb-10 sm:pb-14 ${spacing.container.padding}`}>
                <div className="max-w-4xl mx-auto text-center">
                    <FadeContent
                        duration={500}
                        direction="none"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary dark:text-primary-light text-sm font-medium mb-6">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {t('faqPage.badge')}
                        </div>
                    </FadeContent>

                    <FadeContent
                        blur
                        duration={600}
                        delay={100}
                        direction="up"
                        distance={20}
                    >
                        <h1 className={`${typography.h1} font-bold text-text-primary dark:text-white mb-6`}>
                            <GradientText
                                colors={['#6B4CE6', '#9B86F3', '#6B4CE6', '#9B86F3', '#6B4CE6']}
                                animationSpeed={6}
                                className={typography.h1}
                            >
                                {t('faqPage.title')}
                            </GradientText>
                        </h1>
                    </FadeContent>

                    <FadeContent
                        duration={600}
                        delay={200}
                        direction="up"
                        distance={20}
                    >
                        <p className={`${typography.subtitle} text-text-secondary dark:text-gray-400 max-w-3xl mx-auto leading-relaxed`}>
                            {t('faqPage.subtitle')}
                        </p>
                    </FadeContent>
                </div>
            </section>

            {/* FAQ Categories */}
            <section className={`relative ${getSectionSpacing()} ${spacing.container.padding} bg-gray-50 dark:bg-zinc-800/30`}>
                <div className="max-w-3xl mx-auto">
                    {categories.map((category, index) => (
                        <FAQCategorySection
                            key={category.key}
                            category={category}
                            categoryIndex={index}
                            t={t}
                        />
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className={`relative ${getSectionSpacing()} ${spacing.container.padding}`}>
                <FadeContent
                    duration={600}
                    direction="up"
                    distance={30}
                >
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className={`${typography.h2} font-bold text-text-primary dark:text-white mb-4`}>
                            {t('faqPage.cta.title')}
                        </h2>
                        <p className="text-text-secondary dark:text-gray-400 mb-8">
                            {t('faqPage.cta.subtitle')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://app.bookbed.io"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors duration-200"
                            >
                                {t('faqPage.cta.getStarted')}
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-text-primary dark:text-white font-semibold rounded-xl transition-colors duration-200"
                            >
                                {t('faqPage.cta.contact')}
                            </Link>
                        </div>
                    </div>
                </FadeContent>
            </section>
        </div>
    )
}
