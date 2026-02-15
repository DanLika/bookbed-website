export const spacing = {
  section: {
    hero: 'pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-8 sm:pb-12 md:pb-16 lg:pb-20',
    regular: 'py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28',
    compact: 'py-8 sm:py-10 md:py-12 lg:py-16',
  },
  container: {
    // Mobile: 16px, Tablet: 24px, Desktop: 32-48px
    padding: 'px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16',
    hero: 'max-w-[95%] sm:max-w-[90%] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl',
    section: 'max-w-7xl',
  },
  card: 'p-4 sm:p-5 md:p-6 lg:p-8',
}

// Hero-specific spacing utilities
export const heroSpacing = {
  // Top padding (accounts for fixed header) - matched with HeroSection
  paddingTop: 'pt-24 sm:pt-28 md:pt-32 lg:pt-28 xl:pt-32',
  // Bottom padding
  paddingBottom: 'pb-4 sm:pb-6 md:pb-8 lg:pb-10 xl:pb-12',
  // Gap between title and subtitle
  titleGap: 'mb-3 sm:mb-4 md:mb-5 lg:mb-6',
  // Gap between text content and mockup
  contentGap: 'mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-14',
  // Gap between mockup and button
  buttonGap: 'mt-6 sm:mt-8 md:mt-10 lg:mt-12',
}

// Utility functions
export const getHeroSpacing = () => spacing.section.hero

export const getSectionSpacing = () => spacing.section.regular

export const getCompactSpacing = () => spacing.section.compact

export const getContainerClasses = () =>
  `${spacing.container.section} mx-auto ${spacing.container.padding}`

export const getHeroContainerClasses = () =>
  `${spacing.container.hero} mx-auto ${spacing.container.padding}`

export const getCardPadding = () => spacing.card
