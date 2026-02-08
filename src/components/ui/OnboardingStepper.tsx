import { useTranslation } from 'react-i18next'
import FadeContent from './animations/FadeContent'

export default function OnboardingStepper() {
    const { t } = useTranslation()

    // Original steps data
    const stepsData = [
        {
            id: 'step1',
            image: '/images/onboarding/step1-register.png',
            title: t('features.bento.step1.title'),
            desc: t('features.bento.step1.desc'),
            number: 1
        },
        {
            id: 'step2',
            image: '/images/onboarding/step2-property.png',
            title: t('features.bento.step2.title'),
            desc: t('features.bento.step2.desc'),
            number: 2
        },
        {
            id: 'step3',
            image: '/images/onboarding/step3-widget.png',
            title: t('features.bento.step3.title'),
            desc: t('features.bento.step3.desc'),
            number: 3
        },
        {
            id: 'step4',
            image: '/images/onboarding/step4-embed.png',
            title: t('features.bento.step4.title'),
            desc: t('features.bento.step4.desc'),
            number: 4
        },
        {
            id: 'step5',
            image: '/images/onboarding/step5-bookings.png',
            title: t('features.bento.step5.title'),
            desc: t('features.bento.step5.desc'),
            number: 5
        },
        {
            id: 'step6',
            image: '/images/onboarding/step6-sync.png',
            title: t('features.bento.step6.title'),
            desc: t('features.bento.step6.desc'),
            number: 6
        }
    ]

    // Reordering logic for visual Snake Layout on Desktop (3 columns):
    // Row 1: 1 -> 2 -> 3
    // Row 2: 6 <- 5 <- 4
    // We keep the DOM order as 1, 2, 3, 4, 5, 6 for mobile/tablet consistency.
    // CSS 'order' property will handle the desktop snake effect.

    const steps = stepsData.map((step) => {
        let arrow: 'right' | 'left' | 'down-left' | 'none' = 'none'
        let orderClass = ''

        // Logic for 3-column snake
        if (step.number === 1) {
            arrow = 'right'
            orderClass = 'lg:order-1'
        } else if (step.number === 2) {
            arrow = 'right'
            orderClass = 'lg:order-2'
        } else if (step.number === 3) {
            arrow = 'down-left'
            orderClass = 'lg:order-3'
        } else if (step.number === 4) {
            arrow = 'left'
            orderClass = 'lg:order-6' // Row 2, Col 3
        } else if (step.number === 5) {
            arrow = 'left'
            orderClass = 'lg:order-5' // Row 2, Col 2
        } else if (step.number === 6) {
            arrow = 'none'
            orderClass = 'lg:order-4' // Row 2, Col 1
        }

        return { ...step, arrow, orderClass }
    })

    return (
        <div className="w-full max-w-[80rem] mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24 relative">
                {steps.map((step, index) => (
                    <FadeContent
                        key={step.id}
                        delay={index * 100}
                        direction="up"
                        className={`relative z-10 flex flex-col items-center text-center group ${step.orderClass}`}
                    >
                        {/* Step Number Badge */}
                        <div className="absolute -top-6 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-light text-white flex items-center justify-center font-bold text-xl shadow-[0_0_20px_rgba(107,76,230,0.3)] z-20 border-[3px] border-white dark:border-zinc-900 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(107,76,230,0.5)]">
                            {step.number}
                        </div>

                        {/* Illustration Card */}
                        <div className="w-full aspect-[4/3.55] rounded-[2rem] bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm shadow-xl border border-white/60 dark:border-zinc-700/60 flex items-center justify-center transition-all duration-500 transform group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(107,76,230,0.2)] group-hover:border-primary/20 cursor-pointer overflow-hidden relative">
                            {/* Inner Glow Blob */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <img
                                src={step.image}
                                alt={step.title}
                                className="w-full h-full object-cover drop-shadow-sm transition-transform duration-500 group-hover:scale-110 relative z-10"
                            />
                        </div>

                        {/* Content */}
                        <div className="mt-8">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors duration-300">
                                {step.title}
                            </h3>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed max-w-[280px] mx-auto">
                                {step.desc}
                            </p>
                        </div>

                        {/* CONNECTING ARROWS (Desktop Only) */}
                        <div className="hidden lg:block absolute pointer-events-none text-primary/20 z-0 mix-blend-multiply dark:mix-blend-screen transition-opacity duration-300 group-hover:text-primary/40">
                            {/* Right Arrow (1->2, 2->3) */}
                            {step.arrow === 'right' && (
                                <svg className="absolute top-[40%] -right-[60%] w-[120%] h-16" viewBox="0 0 120 40" fill="none" preserveAspectRatio="none">
                                    <path d="M0 20 H115" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 6" className="animate-pulse" style={{ animationDuration: '3s' }} />
                                    <path d="M110 15 L118 20 L110 25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}

                            {/* Left Arrow (4->5, 5->6) */}
                            {step.arrow === 'left' && (
                                <svg className="absolute top-[40%] -left-[60%] w-[120%] h-16" viewBox="0 0 120 40" fill="none" preserveAspectRatio="none">
                                    <path d="M120 20 H5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 6" className="animate-pulse" style={{ animationDuration: '3s' }} />
                                    <path d="M10 15 L2 20 L10 25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}

                            {/* Curved Down Arrow (3->4) */}
                            {step.arrow === 'down-left' && (
                                <div className="absolute top-[50%] -right-[20%] w-[100px] h-[250px]">
                                    <svg width="100%" height="100%" viewBox="0 0 60 150" fill="none" preserveAspectRatio="none">
                                        <path d="M0 10 C 50 10 50 140 0 140" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 6" fill="none" className="animate-pulse" style={{ animationDuration: '3s' }} />
                                        <path d="M5 130 L-5 140 L5 150" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </FadeContent>
                ))}
            </div>
        </div>
    )
}
