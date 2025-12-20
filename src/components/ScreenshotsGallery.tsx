import { useEffect, useRef } from 'react'

export default function ScreenshotsGallery() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll')
          }
        })
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [])

  const screenshots = [
    { id: 1, title: 'Calendar Timeline View' },
    { id: 2, title: 'Dashboard Overview' },
    { id: 3, title: 'Bookings Screen' },
    { id: 4, title: 'Settings & Configuration' },
  ]

  return (
    <section ref={sectionRef} data-scroll-animate className="relative py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32 px-4 sm:px-6 md:px-8 lg:px-8 xl:px-8 2xl:px-8 bg-white dark:bg-black overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/10 to-transparent dark:via-purple-900/5 pointer-events-none"></div>
      
      <div className="relative max-w-content mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16 xl:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-[#E2E8F0] mb-3 sm:mb-4 md:mb-5 lg:mb-6 max-w-5xl mx-auto leading-[1.1] tracking-tight px-2">
            Pogledajte BookBed u akciji
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-[#A0AEC0] max-w-3xl mx-auto leading-relaxed tracking-normal px-2">
            Eksplorirajte različite ekrane i funkcionalnosti naše platforme
          </p>
        </div>

        {/* Screenshots Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
          {screenshots.map((screenshot, index) => (
            <div
              key={screenshot.id}
              className="group flex justify-center items-start animate-fadeInUp"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Phone Mockup Container */}
              <div className="relative w-full max-w-[200px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[260px] transition-all duration-500 hover:-translate-y-3">
                {/* 3D Shadow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-transparent rounded-[2.5rem] blur-2xl -z-10 transform translate-y-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Phone Frame */}
                <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-xl group-hover:shadow-3d dark:group-hover:shadow-3d-dark border-[3px] sm:border-4 border-[#6B4CE6] dark:border-[#9B86F3] group-hover:border-[#7B5CF6] dark:group-hover:border-[#AB96F4] transition-all duration-500 bg-gray-100 dark:bg-[#1E1E1E] group-hover:scale-105">
                  {/* Phone Frame - Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 sm:w-24 sm:h-5 bg-[#6B4CE6] dark:bg-[#9B86F3] rounded-b-2xl sm:rounded-b-3xl z-20"></div>
                  
                  {/* Placeholder content */}
                  <div className="aspect-[9/16] bg-gradient-to-br from-purple-50 to-purple-100 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center p-4 sm:p-5 md:p-6">
                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">
                        {screenshot.title}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
                        Screenshot {screenshot.id}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
