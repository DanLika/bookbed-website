import { useState, useEffect, useRef } from 'react'

const YOUTUBE_VIDEO_ID = 'oKLtvhWDrbc'
const YOUTUBE_THUMBNAIL_URL = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`
const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`

export default function LiveDemoSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false)
      }
    }

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  // Scroll animation
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

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <section ref={sectionRef} data-scroll-animate className="relative py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 md:px-8 lg:px-8 bg-white dark:bg-black overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/15 to-transparent dark:via-purple-900/5 pointer-events-none"></div>
        
        <div className="relative max-w-content mx-auto">
          {/* Split Layout: Lijevo tekst, Desno video */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-10 sm:gap-12 md:gap-14 lg:gap-16">
            {/* Lijevo - Tekst */}
            <div className="flex-1 lg:w-1/2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-[#E2E8F0] mb-5 sm:mb-6 md:mb-7 leading-[1.1] tracking-tight">
                Pogledajte BookBed u akciji
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-[#A0AEC0] leading-relaxed tracking-normal mb-8 sm:mb-10">
                Interaktivna demonstracija koja pokazuje kako BookBed funkcioniše u praksi. Vidite sve ključne funkcionalnosti naše platforme u akciji.
              </p>
            </div>

            {/* Desno - Video Thumbnail */}
            <div className="flex-1 lg:w-1/2 flex justify-center lg:justify-end">
              <div 
                className="relative w-full max-w-[700px] cursor-pointer group"
                onClick={openModal}
              >
                {/* Video Thumbnail Container */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-purple-glow dark:group-hover:shadow-purple-glow-dark border-[3px] sm:border-4 border-[#6B4CE6] dark:border-[#9B86F3] group-hover:border-[#7B5CF6] dark:group-hover:border-[#AB96F4] transition-all duration-500 group-hover:scale-[1.02]">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#6B4CE6] to-[#9B86F3] rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10"></div>
                  
                  {/* YouTube Thumbnail */}
                  <div className="aspect-video bg-gray-100 dark:bg-[#1E1E1E] relative overflow-hidden">
                    <img
                      src={YOUTUBE_THUMBNAIL_URL}
                      alt="BookBed Widget Demo Video"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`
                      }}
                    />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors duration-300">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-[#6B4CE6] dark:bg-[#9B86F3] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-[#5B3DD6] dark:group-hover:bg-[#7B5CF6] transition-all duration-300 group-hover:shadow-purple-glow dark:group-hover:shadow-purple-glow-dark animate-pulse-slow">
                        <svg 
                          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white ml-1 group-hover:scale-110 transition-transform duration-300" 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-5xl bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-[#6B4CE6] dark:bg-[#9B86F3] hover:bg-[#5B3DD6] dark:hover:bg-[#7B5CF6] text-white rounded-full transition-colors duration-200 shadow-lg"
              aria-label="Close video"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* YouTube Embed Player */}
            <div className="aspect-video w-full">
              <iframe
                src={YOUTUBE_EMBED_URL}
                title="BookBed Widget Demo Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
