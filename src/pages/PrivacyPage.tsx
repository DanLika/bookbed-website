import { useTranslation } from 'react-i18next'
import { spacing, heroSpacing } from '../utils/spacing'
import { typography } from '../utils/typography'
import FadeContent from '../components/ui/animations/FadeContent'
import { usePageMeta } from '../hooks/usePageMeta'

const PrivacyPage = () => {
  const { t, i18n } = useTranslation()

  usePageMeta({
    title: i18n.language === 'hr'
      ? 'Politika Privatnosti - BookBed'
      : 'Privacy Policy - BookBed',
    description: i18n.language === 'hr'
      ? 'Saznajte kako BookBed prikuplja, koristi i štiti vaše osobne podatke. Naša politika privatnosti objašnjava vaša prava i naše obveze.'
      : 'Learn how BookBed collects, uses, and protects your personal data. Our privacy policy explains your rights and our obligations.'
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
              {t('privacy.title', 'Politika Privatnosti BookBed Platforme')}
            </h1>
          </FadeContent>

          <FadeContent duration={600} delay={100} direction="up" distance={20}>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-text-secondary dark:text-gray-400 mb-6">
                {t('privacy.lastUpdated', 'Zadnje ažurirano')}: 27. prosinca 2025.
              </p>

              <h2 className="text-xl font-semibold text-text-primary dark:text-white mt-8 mb-4">
                {t('privacy.section1.title', '1. Uvod')}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                {t('privacy.section1.content', 'BookBed ("mi", "naš" ili "nas") posvećen je zaštiti vaše privatnosti. Ova politika privatnosti objašnjava kako prikupljamo, koristimo i štitimo vaše osobne podatke kada koristite našu platformu za upravljanje rezervacijama.')}
              </p>

              <h2 className="text-xl font-semibold text-text-primary dark:text-white mt-8 mb-4">
                {t('privacy.section2.title', '2. Podaci koje prikupljamo')}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                {t('privacy.section2.content', 'Prikupljamo sljedeće vrste podataka:')}
              </p>
              <ul className="list-disc pl-6 text-text-secondary dark:text-gray-400 mb-4 space-y-2">
                <li>{t('privacy.section2.item1', 'Kontakt informacije (ime, email adresa)')}</li>
                <li>{t('privacy.section2.item2', 'Podaci o nekretninama i smještajnim jedinicama')}</li>
                <li>{t('privacy.section2.item3', 'Podaci o rezervacijama i gostima')}</li>
                <li>{t('privacy.section2.item4', 'Podaci o plaćanjima (procesira Stripe)')}</li>
              </ul>

              <h2 className="text-xl font-semibold text-text-primary dark:text-white mt-8 mb-4">
                {t('privacy.section3.title', '3. Kako koristimo vaše podatke')}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                {t('privacy.section3.content', 'Vaše podatke koristimo za:')}
              </p>
              <ul className="list-disc pl-6 text-text-secondary dark:text-gray-400 mb-4 space-y-2">
                <li>{t('privacy.section3.item1', 'Pružanje usluge upravljanja rezervacijama')}</li>
                <li>{t('privacy.section3.item2', 'Slanje obavijesti o rezervacijama')}</li>
                <li>{t('privacy.section3.item3', 'Obradu plaćanja')}</li>
                <li>{t('privacy.section3.item4', 'Poboljšanje naše usluge')}</li>
              </ul>

              <h2 className="text-xl font-semibold text-text-primary dark:text-white mt-8 mb-4">
                {t('privacy.section4.title', '4. Dijeljenje podataka')}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                {t('privacy.section4.content', 'Vaše podatke ne prodajemo trećim stranama. Podatke dijelimo samo s:')}
              </p>
              <ul className="list-disc pl-6 text-text-secondary dark:text-gray-400 mb-4 space-y-2">
                <li>{t('privacy.section4.item1', 'Stripe - za obradu plaćanja')}</li>
                <li>{t('privacy.section4.item2', 'Firebase - za hosting i bazu podataka')}</li>
                <li>{t('privacy.section4.item3', 'Resend - za slanje email obavijesti')}</li>
              </ul>

              <h2 className="text-xl font-semibold text-text-primary dark:text-white mt-8 mb-4">
                {t('privacy.section5.title', '5. Vaša prava')}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                {t('privacy.section5.content', 'Imate pravo:')}
              </p>
              <ul className="list-disc pl-6 text-text-secondary dark:text-gray-400 mb-4 space-y-2">
                <li>{t('privacy.section5.item1', 'Pristupiti svojim podacima')}</li>
                <li>{t('privacy.section5.item2', 'Ispraviti netočne podatke')}</li>
                <li>{t('privacy.section5.item3', 'Zatražiti brisanje podataka')}</li>
                <li>{t('privacy.section5.item4', 'Povući privolu za obradu')}</li>
              </ul>

              <h2 className="text-xl font-semibold text-text-primary dark:text-white mt-8 mb-4">
                {t('privacy.section6.title', '6. Kontakt')}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                {t('privacy.section6.content', 'Za sva pitanja o privatnosti, kontaktirajte nas na: info@bookbed.io')}
              </p>
            </div>
          </FadeContent>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPage
