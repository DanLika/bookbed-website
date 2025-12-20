import useScrollAnimation from '../hooks/useScrollAnimation'

export default function AboutPage() {
  useScrollAnimation('.about-section-animate')

  const blogPosts = [
    { id: 1, title: 'Kako optimizovati rezervacije smještaja', date: '15. Maj 2024.', excerpt: 'Savjeti i trikovi za povećanje broja rezervacija i poboljšanje iskustva gostiju.' },
    { id: 2, title: 'Početak rada sa BookBed platformom', date: '01. April 2024.', excerpt: 'Kompletan vodič kroz sve funkcionalnosti i kako ih koristiti za maksimalnu efikasnost.' },
    { id: 3, title: 'Najbolje prakse za upravljanje smještajem', date: '10. Mart 2024.', excerpt: 'Iskustva vlasnika smještaja koji koriste BookBed za upravljanje svojim poslovanjem.' },
  ]

  const jobOpenings = [
    { id: 1, title: 'Frontend Developer', location: 'Full-time • Remote', description: 'Tražimo iskusnog frontend developera koji će raditi na razvoju BookBed platforme koristeći React i TypeScript.' },
    { id: 2, title: 'Product Designer', location: 'Full-time • Hybrid', description: 'Tražimo kreativnog product designera koji će dizajnirati korisničko iskustvo za BookBed platformu.' },
    { id: 3, title: 'Backend Developer', location: 'Full-time • Remote', description: 'Tražimo backend developera koji će raditi na razvoju API-ja i infrastrukture BookBed platforme.' },
    { id: 4, title: 'Customer Success Manager', location: 'Full-time • On-site', description: 'Tražimo Customer Success Manager-a koji će pomoći našim klijentima da maksimalno iskoriste BookBed platformu.' },
  ]

  return (
    <main className="pt-20 sm:pt-24">
      {/* Hero Section */}
      <section data-scroll-animate className="about-section-animate py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
        <div className="max-w-content mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-[#E2E8F0] mb-6 sm:mb-8 leading-[1.1] tracking-tight">
            O nama
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-[#A0AEC0] leading-relaxed tracking-normal max-w-3xl mx-auto">
            BookBed je platforma za upravljanje rezervacijama smještaja koja pomaže vlasnicima nekretnina da efikasno upravljaju svojim poslovanjem.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section data-scroll-animate className="about-section-animate py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#F7FAFC] dark:bg-[#121212]">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-[#E2E8F0] mb-4 sm:mb-6 leading-[1.1] tracking-tight">
                Naša misija
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-[#A0AEC0] leading-relaxed tracking-normal mb-4">
                Naša misija je olakšati upravljanje rezervacijama smještaja i pomoći vlasnicima nekretnina da fokusiraju svoje vrijeme na ono što je najvažnije - pružanje izvrsnog iskustva svojim gostima.
              </p>
              <p className="text-base sm:text-lg text-gray-600 dark:text-[#A0AEC0] leading-relaxed tracking-normal">
                Kroz inovativne tehnologije i jednostavno korisničko iskustvo, BookBed transformiše način na koji vlasnici smještaja upravljaju svojim rezervacijama.
              </p>
            </div>
            <div className="bg-white dark:bg-[#121212] rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg">
              <div className="space-y-4 sm:space-y-6">
                {/* Feature Card 1 */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-[#6B4CE6] dark:bg-[#9B86F3] flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-[#E2E8F0] mb-2 group-hover:text-[#6B4CE6] dark:group-hover:text-[#9B86F3] transition-colors duration-300">Brzo i jednostavno</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-[#A0AEC0]">Intuitivno korisničko iskustvo koje štedi vrijeme</p>
                  </div>
                </div>
                {/* Feature Card 2 */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-[#6B4CE6] dark:bg-[#9B86F3] flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-[#E2E8F0] mb-2 group-hover:text-[#6B4CE6] dark:group-hover:text-[#9B86F3] transition-colors duration-300">Sigurno i pouzdano</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-[#A0AEC0]">Vaši podaci su zaštićeni i sigurni</p>
                  </div>
                </div>
                {/* Feature Card 3 */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-[#6B4CE6] dark:bg-[#9B86F3] flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-[#E2E8F0] mb-2 group-hover:text-[#6B4CE6] dark:group-hover:text-[#9B86F3] transition-colors duration-300">Timski pristup</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-[#A0AEC0]">Radimo zajedno sa vama na uspjehu</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" data-scroll-animate className="about-section-animate py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-[#E2E8F0] mb-4 sm:mb-6 leading-[1.1] tracking-tight">
              Blog
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-[#A0AEC0] max-w-2xl mx-auto leading-relaxed tracking-normal">
              Saznajte više o upravljanju rezervacijama, najboljim praksama i novostima iz industrije
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogPosts.map(post => (
              <article key={post.id} className="group bg-white dark:bg-[#121212] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-purple/20 dark:hover:shadow-purple-dark/30 transition-all duration-300 border border-gray-200 dark:border-[#2D3748] hover:border-[#6B4CE6] dark:hover:border-[#9B86F3] hover:-translate-y-1">
                <div className="h-48 bg-gradient-to-br from-[#6B4CE6] to-[#9B86F3] dark:from-[#5B3DD6] dark:to-[#6B4CE6] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/10 group-hover:to-transparent transition-all duration-300"></div>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="text-sm text-[#6B4CE6] dark:text-[#9B86F3] font-semibold mb-2">Najnovije</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-[#E2E8F0] mb-3 group-hover:text-[#6B4CE6] dark:group-hover:text-[#9B86F3] transition-colors duration-300 leading-[1.1] tracking-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-[#A0AEC0] mb-4 leading-relaxed tracking-normal">
                    {post.excerpt}
                  </p>
                  <a href="#" className="inline-flex items-center gap-2 text-[#6B4CE6] dark:text-[#9B86F3] font-semibold hover:gap-3 transition-all duration-300">
                    Pročitaj više <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" data-scroll-animate className="about-section-animate py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#F7FAFC] dark:bg-[#121212]">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-[#E2E8F0] mb-4 sm:mb-6 leading-[1.1] tracking-tight">
              Karijere
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-[#A0AEC0] max-w-2xl mx-auto leading-relaxed tracking-normal">
              Pridružite se našem timu i pomozite nam da gradimo budućnost upravljanja rezervacijama
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {jobOpenings.map(job => (
              <div key={job.id} className="group bg-white dark:bg-[#121212] rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl hover:shadow-purple/20 dark:hover:shadow-purple-dark/30 border border-gray-200 dark:border-[#2D3748] hover:border-[#6B4CE6] dark:hover:border-[#9B86F3] transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-[#E2E8F0] mb-2 group-hover:text-[#6B4CE6] dark:group-hover:text-[#9B86F3] transition-colors duration-300 leading-[1.1] tracking-tight">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 dark:text-[#A0AEC0] tracking-normal">{job.location}</p>
                  </div>
                  {job.id === 1 && (
                    <div className="px-3 py-1 bg-[#6B4CE6] dark:bg-[#9B86F3] text-white text-xs sm:text-sm font-semibold rounded-full">
                      Novi
                    </div>
                  )}
                </div>
                <p className="text-gray-600 dark:text-[#A0AEC0] mb-4 leading-relaxed tracking-normal">
                  {job.description}
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-[#6B4CE6] dark:text-[#9B86F3] font-semibold hover:gap-3 transition-all duration-300">
                  Prijavi se <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
