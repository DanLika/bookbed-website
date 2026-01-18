import { useTranslation } from 'react-i18next'
import { spacing, heroSpacing } from '../utils/spacing'
import { typography } from '../utils/typography'
import FadeContent from '../components/ui/animations/FadeContent'
import { usePageMeta } from '../hooks/usePageMeta'

const DataDeletionPage = () => {
  const { i18n } = useTranslation()

  usePageMeta({
    title: i18n.language === 'hr'
      ? 'Brisanje Podataka - BookBed'
      : 'Data Deletion - BookBed',
    description: i18n.language === 'hr'
      ? 'Naučite kako izbrisati određene podatke iz svog BookBed računa bez brisanja cijelog računa.'
      : 'Learn how to delete specific data from your BookBed account without deleting your entire account.'
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
              {i18n.language === 'hr' ? 'Brisanje Podataka Bez Brisanja Računa' : 'Delete Specific Data'}
            </h1>
          </FadeContent>

          <FadeContent duration={600} delay={100} direction="up" distance={20}>
            <div className="prose prose-lg dark:prose-invert max-w-none">

              <p className="text-lg text-text-secondary dark:text-gray-400 mb-8">
                {i18n.language === 'hr'
                  ? 'Možete selektivno izbrisati određene podatke iz svog BookBed računa bez brisanja cijelog računa:'
                  : 'You can selectively delete specific data from your BookBed account without deleting your entire account:'}
              </p>

              {/* In the BookBed App */}
              <h2 className="text-2xl font-semibold text-text-primary dark:text-white mt-8 mb-4">
                {i18n.language === 'hr' ? 'U BookBed Aplikaciji' : 'In the BookBed App'}
              </h2>

              {/* Delete Properties */}
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-medium text-text-primary dark:text-white mb-3">
                  🏠 {i18n.language === 'hr' ? 'Brisanje Nekretnina' : 'Delete Properties'}
                </h3>
                <ol className="list-decimal pl-6 text-text-secondary dark:text-gray-300 space-y-2">
                  <li>{i18n.language === 'hr' ? 'Idite na Nekretnine (Properties)' : 'Go to Properties'}</li>
                  <li>{i18n.language === 'hr' ? 'Odaberite nekretninu' : 'Select the property'}</li>
                  <li>{i18n.language === 'hr' ? 'Kliknite ⋮ meni → Obriši (Delete)' : 'Tap the ⋮ menu → Delete'}</li>
                </ol>
              </div>

              {/* Delete Units */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-medium text-text-primary dark:text-white mb-3">
                  🏘️ {i18n.language === 'hr' ? 'Brisanje Jedinica' : 'Delete Units'}
                </h3>
                <ol className="list-decimal pl-6 text-text-secondary dark:text-gray-300 space-y-2">
                  <li>{i18n.language === 'hr' ? 'Idite na Nekretnine → Odaberite nekretninu' : 'Go to Properties → Select property'}</li>
                  <li>{i18n.language === 'hr' ? 'Kliknite na jedinicu' : 'Tap on the unit'}</li>
                  <li>{i18n.language === 'hr' ? 'Kliknite ⋮ meni → Obriši jedinicu (Delete Unit)' : 'Tap ⋮ menu → Delete Unit'}</li>
                </ol>
              </div>

              {/* Delete Bookings */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-medium text-text-primary dark:text-white mb-3">
                  📅 {i18n.language === 'hr' ? 'Brisanje Rezervacija' : 'Delete Bookings'}
                </h3>
                <ol className="list-decimal pl-6 text-text-secondary dark:text-gray-300 space-y-2">
                  <li>{i18n.language === 'hr' ? 'Idite na Rezervacije (Bookings)' : 'Go to Bookings'}</li>
                  <li>{i18n.language === 'hr' ? 'Odaberite rezervaciju' : 'Select the booking'}</li>
                  <li>{i18n.language === 'hr' ? 'Kliknite Otkaži rezervaciju (Cancel Booking) ili Obriši (Delete)' : 'Tap Cancel Booking or Delete'}</li>
                </ol>
              </div>

              {/* Delete Profile Data */}
              <h2 className="text-2xl font-semibold text-text-primary dark:text-white mt-12 mb-4">
                {i18n.language === 'hr' ? 'Brisanje Podataka Profila' : 'Delete Profile Data'}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                {i18n.language === 'hr'
                  ? 'Za brisanje određenih osobnih informacija (broj telefona, ime) bez brisanja cijelog računa:'
                  : 'To delete specific personal information (phone number, name) without deleting your entire account:'}
              </p>
              <div className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6 mb-8">
                <div className="space-y-3 text-text-secondary dark:text-gray-300">
                  <div>
                    <span className="font-semibold text-text-primary dark:text-white">Email:</span>{' '}
                    <a href="mailto:info@bookbed.io" className="text-purple-600 dark:text-purple-400 hover:underline">
                      info@bookbed.io
                    </a>
                  </div>
                  <div>
                    <span className="font-semibold text-text-primary dark:text-white">
                      {i18n.language === 'hr' ? 'Naslov:' : 'Subject:'}
                    </span>{' '}
                    {i18n.language === 'hr' ? 'Zahtjev za Brisanje Podataka' : 'Data Deletion Request'}
                  </div>
                  <div>
                    <span className="font-semibold text-text-primary dark:text-white">
                      {i18n.language === 'hr' ? 'Navedite:' : 'Specify:'}
                    </span>{' '}
                    {i18n.language === 'hr'
                      ? 'Koje osobne podatke želite izbrisati'
                      : 'Which personal data you want to delete'}
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    ⏰ {i18n.language === 'hr'
                      ? 'Odgovorit ćemo u roku od 7 radnih dana.'
                      : 'We will respond within 7 business days.'}
                  </p>
                </div>
              </div>

              {/* Important Note */}
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-3 flex items-center">
                  <span className="mr-2">⚠️</span>
                  {i18n.language === 'hr' ? 'Važna Napomena' : 'Important Note'}
                </h3>
                <p className="text-text-secondary dark:text-gray-300">
                  {i18n.language === 'hr'
                    ? 'Neki podaci (kao što su dovršene transakcije) mogu biti zadržani radi usklađenosti sa zakonom i poreznim obvezama.'
                    : 'Some data (like completed transactions) may be retained for legal/tax compliance purposes.'}
                </p>
              </div>

              {/* Full Account Deletion */}
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-3">
                  {i18n.language === 'hr' ? '🗑️ Želite izbrisati cijeli račun?' : '🗑️ Want to delete your entire account?'}
                </h3>
                <p className="text-text-secondary dark:text-gray-300 mb-3">
                  {i18n.language === 'hr'
                    ? 'Ako želite izbrisati svoj cijeli BookBed račun (zajedno sa svim podacima), posjetite stranicu za brisanje računa:'
                    : 'If you want to delete your entire BookBed account (along with all data), visit the account deletion page:'}
                </p>
                <a
                  href="/account-deletion"
                  className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                >
                  {i18n.language === 'hr' ? 'Obriši Cijeli Račun' : 'Delete Entire Account'}
                </a>
              </div>

            </div>
          </FadeContent>
        </div>
      </section>
    </div>
  )
}

export default DataDeletionPage
