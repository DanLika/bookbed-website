import { useTranslation } from 'react-i18next'
import { getCompactSpacing, getContainerClasses } from '../utils/spacing'
import FadeContent from './ui/animations/FadeContent'
import LogoLoop from './ui/animations/LogoLoop'
import type { LogoItem } from './ui/animations/LogoLoop'

// Custom SVG icons with original brand colors
const FlutterIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
    <path d="M14.314 0L3.293 11.021l3.128 3.128L19.314 1.277V0h-5z" fill="#02569B" />
    <path d="M14.314 11.724L9.429 16.61l3.129 3.128 7.756-7.756v-1.277l-6-1.982z" fill="#02569B" />
    <path d="M9.429 16.61l3.129 3.128L14.314 24v-5.277l-4.885-2.113z" fill="#54C5F8" />
  </svg>
)

const FirebaseIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
    <path d="M4.53 18.64l2.06-14.18a.36.36 0 01.68-.08l2.14 4 1.56-2.98a.36.36 0 01.64 0l6.86 13.24H4.53z" fill="#FFA000" />
    <path d="M13 10.57L10.9 6.71l-4.31 8.32L13 10.57z" fill="#F57C00" />
    <path d="M18.47 18.64L15.72 3.64a.36.36 0 00-.68-.08L4.53 18.64l6.45 3.73a1.08 1.08 0 001.08 0l6.41-3.73z" fill="#FFCA28" />
  </svg>
)

const StripeIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
    <path d="M13.479 9.883c0-1.09.898-1.507 2.397-1.507 2.137 0 4.847.653 6.985 1.812V4.347c-2.338-.929-4.654-1.347-6.985-1.347C11.297 3 8 5.047 8 9.143c0 6.432 8.847 5.407 8.847 8.185 0 1.29-1.123 1.705-2.695 1.705-2.334 0-5.315-.959-7.675-2.254v5.891c2.611 1.123 5.252 1.599 7.675 1.599 4.699 0 7.926-2.33 7.926-6.455 0-6.933-8.599-5.715-8.599-8.931z" fill="#635BFF" />
  </svg>
)

const ResendIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
    <path d="M6 4h7c2.76 0 5 2.24 5 5 0 2.1-1.3 3.9-3.14 4.64L18.5 20H15l-3.2-5.5H9V20H6V4zm3 3v4.5h4c1.24 0 2.25-1 2.25-2.25S14.24 7 13 7H9z" className="fill-black dark:fill-white" />
  </svg>
)

// Logo card component for LogoLoop
const LogoCard = ({ icon, name }: { icon: React.ReactNode; name: string }) => (
  <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700">
    {icon}
    <span className="text-sm font-medium text-text-primary dark:text-white whitespace-nowrap">
      {name}
    </span>
  </div>
)

export default function TrustSection() {
  const { t } = useTranslation()

  const techLogos: LogoItem[] = [
    { node: <LogoCard icon={<FlutterIcon />} name="Flutter" />, title: 'Flutter' },
    { node: <LogoCard icon={<FirebaseIcon />} name="Firebase" />, title: 'Firebase' },
    { node: <LogoCard icon={<StripeIcon />} name="Stripe" />, title: 'Stripe' },
    { node: <LogoCard icon={<ResendIcon />} name="Resend" />, title: 'Resend' },
  ]

  return (
    <section className={`relative max-w-[1920px] mx-auto ${getCompactSpacing()} bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-950`}>
      <div className={`relative ${getContainerClasses()}`}>
        {/* Title */}
        <FadeContent
          duration={500}
          direction="up"
          distance={20}
        >
          <p className="text-center text-lg font-semibold text-text-primary dark:text-white mb-6">
            {t('trust.title')}
          </p>
        </FadeContent>
      </div>

      {/* Tech Stack Logos - Full width LogoLoop with padding for hover scale */}
      <FadeContent
        duration={600}
        delay={200}
        direction="up"
        distance={20}
      >
        <div className="flex items-center justify-center">
          <LogoLoop
            logos={techLogos}
            speed={60}
            direction="left"
            logoHeight={52}
            gap={24}
            hoverSpeed={0}
            fadeOut
            ariaLabel="Technology stack"
          />
        </div>
      </FadeContent>
    </section>
  )
}
