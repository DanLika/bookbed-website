import { useTranslation } from 'react-i18next'
import { getSectionSpacing, getContainerClasses } from '../utils/spacing'
import { typography } from '../utils/typography'
import FadeContent from './ui/animations/FadeContent'
import BlurText from './ui/animations/BlurText'

// Star rating component
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-zinc-500'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
)

// Testimonial data - static for now, could be moved to i18n if needed
const testimonials = [
  {
    id: 1,
    name: 'Marko P.',
    role: 'Villa Owner',
    location: 'Split, Croatia',
    avatar: 'MP',
    rating: 5,
    text: 'BookBed transformed how I manage my vacation rentals. The calendar sync with Airbnb saved me from double bookings.',
  },
  {
    id: 2,
    name: 'Ana K.',
    role: 'Property Manager',
    location: 'Dubrovnik, Croatia',
    avatar: 'AK',
    rating: 5,
    text: 'Finally a booking system that just works. The widget on my website looks professional and my guests love it.',
  },
  {
    id: 3,
    name: 'Ivan M.',
    role: 'Apartment Host',
    location: 'Zagreb, Croatia',
    avatar: 'IM',
    rating: 5,
    text: 'The automated emails are a game changer. I spend less time on admin and more time improving my properties.',
  },
]

export default function TestimonialsSection() {
  const { t } = useTranslation()

  return (
    <section className={`relative ${getSectionSpacing()} px-4 sm:px-6 md:px-8 lg:px-12 bg-white dark:bg-zinc-900`}>
      {/* Bottom fade towards purple CTA section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/10 via-primary/5 to-transparent dark:from-primary/15 dark:via-primary/8 pointer-events-none" />

      <div className={`relative ${getContainerClasses()}`}>
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <FadeContent
            duration={500}
            direction="none"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-6 shadow-emerald dark:shadow-emerald-dark">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {t('testimonials.title')}
            </div>
          </FadeContent>

          <div className="mb-4">
            <BlurText
              text={t('testimonials.title')}
              as="h2"
              delay={60}
              animateBy="words"
              direction="top"
              className={`${typography.h2} font-bold text-text-primary dark:text-white`}
            />
          </div>
          <FadeContent
            duration={600}
            delay={200}
            direction="up"
            distance={20}
          >
            <p className="text-lg sm:text-xl text-text-secondary dark:text-gray-400 max-w-2xl mx-auto">
              {t('testimonials.subtitle')}
            </p>
          </FadeContent>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <FadeContent
              key={testimonial.id}
              duration={500}
              delay={index * 150}
              direction="up"
              distance={40}
            >
              <div className="group h-full">
                <div className="relative h-full bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-700 p-6 sm:p-8 transition-all duration-300 hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-lg hover:-translate-y-1">
                  {/* Quote icon */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Rating */}
                  <div className="mb-4">
                    <StarRating rating={testimonial.rating} />
                  </div>

                  {/* Testimonial text */}
                  <p className="text-text-secondary dark:text-gray-400 leading-relaxed mb-6">
                    "{testimonial.text}"
                  </p>

                  {/* Author info */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Avatar */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-semibold text-xs sm:text-sm group-hover:scale-110 transition-transform duration-300">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary dark:text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-text-tertiary dark:text-gray-500">
                        {testimonial.role} • {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  )
}
