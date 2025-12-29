import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import useScrollAnimation from '../hooks/useScrollAnimation'

export default function ContactPage() {
  useScrollAnimation('.contact-section-animate')

  const [searchParams] = useSearchParams()
  const subjectParam = searchParams.get('subject')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: subjectParam || '',
    message: '',
  })

  // Map URL params to form values
  const mapSubjectParam = (param: string | null): string => {
    if (!param) return ''
    const mapping: Record<string, string> = {
      'demo': 'Zakaži demo',
      'sales': 'Prodaja',
      'support': 'Tehnička podrška',
      'general': 'Opće pitanje',
      'partnership': 'Partnerstvo',
      'other': 'Ostalo',
    }
    return mapping[param] || ''
  }

  // Update subject when URL param changes
  useEffect(() => {
    if (subjectParam) {
      const mappedSubject = mapSubjectParam(subjectParam)
      if (mappedSubject) {
        setFormData(prev => ({ ...prev, subject: mappedSubject }))
      }
    }
  }, [subjectParam])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Simulacija slanja forme
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Reset status nakon 5 sekundi
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    }, 1000)
  }

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email',
      content: 'info@bookbed.com',
      link: 'mailto:info@bookbed.com',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Telefon',
      content: '+385 1 234 5678',
      link: 'tel:+38512345678',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Adresa',
      content: 'Zagreb, Hrvatska',
      link: null,
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Radno vrijeme',
      content: 'Pon - Pet: 9:00 - 17:00',
      link: null,
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section data-scroll-animate className="contact-section-animate pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-16 sm:pb-20 md:pb-24 lg:pb-28 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-[#E2E8F0] mb-4 sm:mb-6 leading-[1.1] tracking-tight">
              Kontaktirajte nas
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-[#A0AEC0] max-w-2xl mx-auto leading-relaxed tracking-normal">
              Imate pitanja? Javite nam se i odgovorit ćemo vam u najkraćem mogućem roku.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section data-scroll-animate className="contact-section-animate py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-8 bg-white dark:bg-black">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-white dark:bg-[#121212] rounded-2xl shadow-lg border border-gray-200 dark:border-[#2D3748] p-6 sm:p-8 md:p-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-[#E2E8F0] mb-6 sm:mb-8 leading-[1.1] tracking-tight">
                  Pošaljite nam poruku
                </h2>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-green-800 dark:text-green-200 text-sm sm:text-base leading-relaxed tracking-normal">
                      Hvala vam! Vaša poruka je uspješno poslana. Odgovorit ćemo vam uskoro.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-800 dark:text-red-200 text-sm sm:text-base leading-relaxed tracking-normal">
                      Došlo je do greške. Molimo pokušajte ponovno.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-[#E2E8F0] mb-2 tracking-normal">
                      Ime i prezime *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-[#2D3748] rounded-lg bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-[#E2E8F0] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      placeholder="Vaše ime i prezime"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-[#E2E8F0] mb-2 tracking-normal">
                      Email adresa *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-[#2D3748] rounded-lg bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-[#E2E8F0] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      placeholder="vas@email.com"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-[#E2E8F0] mb-2 tracking-normal">
                      Predmet *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-[#2D3748] rounded-lg bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Odaberite predmet</option>
                      <option value="Opće pitanje">Opće pitanje</option>
                      <option value="Zakaži demo">Zakaži demo</option>
                      <option value="Tehnička podrška">Tehnička podrška</option>
                      <option value="Prodaja">Prodaja</option>
                      <option value="Partnerstvo">Partnerstvo</option>
                      <option value="Ostalo">Ostalo</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-[#E2E8F0] mb-2 tracking-normal">
                      Poruka *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-[#2D3748] rounded-lg bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-[#E2E8F0] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Vaša poruka..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden group active:scale-95"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Šalje se...</span>
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">Pošalji poruku</span>
                        <svg className="w-5 h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        {/* Shimmer effect */}
                        <span className="absolute inset-0 w-full h-full block bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer"></span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="order-1 lg:order-2">
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-[#E2E8F0] mb-4 sm:mb-6 leading-[1.1] tracking-tight">
                    Kontakt informacije
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-[#A0AEC0] leading-relaxed tracking-normal">
                    Javite nam se putem emaila, telefona ili posjetite našu adresu. Radimo od ponedjeljka do petka od 9:00 do 17:00.
                  </p>
                </div>

                {/* Contact Info Cards */}
                <div className="space-y-4 sm:space-y-5">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className={`p-5 sm:p-6 rounded-xl border border-gray-200 dark:border-[#2D3748] bg-white dark:bg-[#121212] hover:shadow-md transition-all duration-200 group ${
                        info.link ? 'cursor-pointer hover:border-primary dark:hover:border-primary' : ''
                      }`}
                      onClick={() => info.link && window.open(info.link)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-200">
                          {info.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-[#E2E8F0] mb-1 leading-[1.1] tracking-tight">
                            {info.title}
                          </h3>
                          <p className="text-gray-600 dark:text-[#A0AEC0] tracking-normal">
                            {info.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Info */}
                <div className="mt-8 sm:mt-10 p-6 sm:p-8 bg-gray-50 dark:bg-[#121212]/50 rounded-xl border border-gray-200 dark:border-[#2D3748]">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-[#E2E8F0] mb-3 sm:mb-4 leading-[1.1] tracking-tight">
                    Potrebna vam je pomoć?
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-[#A0AEC0] mb-4 sm:mb-5 leading-relaxed tracking-normal">
                    Ako imate tehničke probleme ili pitanja o korištenju BookBed platforme, možete također posjetiti našu dokumentaciju ili FAQ sekciju.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="#"
                      className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-all duration-200 text-center text-sm sm:text-base relative overflow-hidden group active:scale-95"
                    >
                      <span className="relative z-10">Pregledaj dokumentaciju</span>
                      <span className="absolute inset-0 w-full h-full block bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer"></span>
                    </a>
                    <a
                      href="#"
                      className="px-4 py-2 border border-gray-300 dark:border-[#2D3748] text-gray-900 dark:text-[#E2E8F0] font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-[#1E1E1E] transition-all duration-200 text-center text-sm sm:text-base active:scale-95"
                    >
                      FAQ
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section data-scroll-animate className="contact-section-animate py-6 px-4 sm:py-8 sm:px-6 md:py-12 md:px-8 bg-gray-50 dark:bg-[#121212]/50">
        <div className="max-w-content mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-[#E2E8F0] mb-6 sm:mb-8 text-center leading-[1.1] tracking-tight">
            Pronađite nas
          </h2>
          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-[#2D3748] bg-gray-200 dark:bg-[#1E1E1E] h-64 sm:h-80 md:h-96 flex items-center justify-center">
            <p className="text-gray-500 dark:text-[#A0AEC0] text-sm sm:text-base tracking-normal">
              Map placeholder - Google Maps ili OpenStreetMap će biti integriran ovdje
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
