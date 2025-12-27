import { useTranslation } from 'react-i18next'
import { spacing, heroSpacing } from '../utils/spacing'
import { typography } from '../utils/typography'
import FadeContent from '../components/ui/animations/FadeContent'
import { usePageMeta } from '../hooks/usePageMeta'

const TermsPage = () => {
  const { t, i18n } = useTranslation()

  usePageMeta({
    title: i18n.language === 'hr'
      ? 'Uvjeti Korištenja - BookBed'
      : 'Terms of Service - BookBed',
    description: i18n.language === 'hr'
      ? 'Pročitajte uvjete korištenja BookBed platforme. Saznajte o vašim pravima i obvezama kao korisnika naše usluge.'
      : 'Read BookBed platform terms of service. Learn about your rights and obligations as a user of our service.'
  })

  return (
    <div className="relative min-h-screen bg-white dark:bg-zinc-900 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <section className={`relative ${heroSpacing.paddingTop} pb-12 sm:pb-16 ${spacing.container.padding}`}>
        <div className="max-w-4xl mx-auto">
          <FadeContent duration={500} direction="up" distance={20}>
            <h1 className={`${typography.h1} font-bold text-text-primary dark:text-white mb-8`}>
              {t('terms.title', 'Uvjeti Korištenja BookBed Platforme')}
            </h1>
          </FadeContent>

          <FadeContent duration={600} delay={100} direction="up" distance={20}>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-text-secondary dark:text-gray-400 mb-6">
                {t('terms.lastUpdated', 'Zadnje ažurirano')}: 27. prosinca 2025.
              </p>

              <h2 className="text-xl font-semibold text-text-primary dark:text-white mt-8 mb-4">
                {t('terms.section1.title', '1. Prihvaćanje uvjeta')}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                {t('terms.section1.content', 'Korištenjem BookBed platforme prihvaćate ove uvjete korištenja. Ako se ne slažete s ovim uvjetima, molimo vas da ne koristite našu uslugu.')}
              </p>

              <h2 className="text-xl font-semibold text-text-primary dark:text-white mt-8 mb-4">
                {t('terms.section2.title', '2. Opis usluge')}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                {t('terms.section2.content', 'BookBed je SaaS platforma za upravljanje rezervacijama namijenjena vlasnicima smještaja. Usluga uključuje:')}
              </p>
              <ul className="list-disc pl-6 text-text-secondary dark:text-gray-400 mb-4 space-y-2">
                <li>{t('terms.section2.item1', 'Kalendar rezervacija')}</li>
                <li>{t('terms.section2.item2', 'Widget za online rezervacije')}</li>
                <li>{t('terms.section2.item3', 'Obradu plaćanja putem Stripe-a')}</li>
                <li>{t('terms.section2.item4', 'Automatske email obavijesti')}</li>
                <li>{t('terms.section2.item5', 'iCal sinkronizaciju')}</li>
              </ul>

              <h2 className="text-xl font-semibold text-text-primary dark:text-white mt-8 mb-4">
                {t('terms.section3.title', '3. Korisnički račun')}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                {t('terms.section3.content', 'Za korištenje usluge potrebno je kreirati korisnički račun. Odgovorni ste za:')}
              </p>
              <ul className="list-disc pl-6 text-text-secondary dark:text-gray-400 mb-4 space-y-2">
                <li>{t('terms.section3.item1', 'Održavanje sigurnosti svoje lozinke')}</li>
                <li>{t('terms.section3.item2', 'Sve aktivnosti na vašem računu')}</li>
                <li>{t('terms.section3.item3', 'Pružanje točnih informacija')}</li>
              </ul>

              <h2 className="text-xl font-semibold text-text-primary dark:text-white mt-8 mb-4">
                {t('terms.section4.title', '4. Plaćanja i pretplate')}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                {t('terms.section4.content', 'BookBed nudi različite planove pretplate. Plaćanja se obrađuju putem Stripe-a. Možete otkazati pretplatu u bilo kojem trenutku, a usluga će ostati aktivna do kraja obračunskog razdoblja.')}
              </p>

              <h2 className="text-xl font-semibold text-text-primary dark:text-white mt-8 mb-4">
                {t('terms.section5.title', '5. Zabranjena ponašanja')}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                {t('terms.section5.content', 'Zabranjeno je:')}
              </p>
              <ul className="list-disc pl-6 text-text-secondary dark:text-gray-400 mb-4 space-y-2">
                <li>{t('terms.section5.item1', 'Korištenje usluge za nezakonite aktivnosti')}</li>
                <li>{t('terms.section5.item2', 'Dijeljenje pristupnih podataka s trećim stranama')}</li>
                <li>{t('terms.section5.item3', 'Pokušaji narušavanja sigurnosti platforme')}</li>
                <li>{t('terms.section5.item4', 'Automatsko prikupljanje podataka bez dozvole')}</li>
              </ul>

              <h2 className="text-xl font-semibold text-text-primary dark:text-white mt-8 mb-4">
                {t('terms.section6.title', '6. Ograničenje odgovornosti')}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                {t('terms.section6.content', 'BookBed se pruža "kakav jest". Ne jamčimo neprekidan rad usluge. Nismo odgovorni za indirektne štete nastale korištenjem platforme.')}
              </p>

              <h2 className="text-xl font-semibold text-text-primary dark:text-white mt-8 mb-4">
                {t('terms.section7.title', '7. Prekid usluge')}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                {t('terms.section7.content', 'Zadržavamo pravo prekinuti pristup usluzi korisnicima koji krše ove uvjete korištenja.')}
              </p>

              <h2 className="text-xl font-semibold text-text-primary dark:text-white mt-8 mb-4">
                {t('terms.section8.title', '8. Kontakt')}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                {t('terms.section8.content', 'Za sva pitanja o uvjetima korištenja, kontaktirajte nas na: info@bookbed.io')}
              </p>
            </div>
          </FadeContent>
        </div>
      </section>
    </div>
  )
}

export default TermsPage
