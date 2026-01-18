import { useTranslation } from 'react-i18next'
import { spacing, heroSpacing } from '../utils/spacing'
import { typography } from '../utils/typography'
import FadeContent from '../components/ui/animations/FadeContent'
import { usePageMeta } from '../hooks/usePageMeta'

const AccountDeletionPage = () => {
  const { i18n } = useTranslation()

  usePageMeta({
    title: i18n.language === 'hr'
      ? 'Brisanje Računa - BookBed'
      : 'Account Deletion - BookBed',
    description: i18n.language === 'hr'
      ? 'Saznajte kako izbrisati svoj BookBed račun i povezane podatke. Koraci za brisanje računa i informacije o zadržavanju podataka.'
      : 'Learn how to delete your BookBed account and associated data. Steps for account deletion and data retention information.'
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
              {i18n.language === 'hr' ? 'Brisanje BookBed Računa' : 'Delete Your BookBed Account'}
            </h1>
          </FadeContent>

          <FadeContent duration={600} delay={100} direction="up" distance={20}>
            <div className="prose prose-lg dark:prose-invert max-w-none">

              {/* Method 1: In-App Deletion */}
              <h2 className="text-2xl font-semibold text-text-primary dark:text-white mt-8 mb-4">
                {i18n.language === 'hr' ? 'Metoda 1: Brisanje u Aplikaciji (Preporučeno)' : 'Method 1: In-App Deletion (Recommended)'}
              </h2>
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mb-8">
                <ol className="list-decimal pl-6 text-text-secondary dark:text-gray-300 space-y-3">
                  <li>
                    <strong className="text-text-primary dark:text-white">
                      {i18n.language === 'hr' ? 'Otvorite BookBed mobilnu aplikaciju' : 'Open the BookBed mobile app'}
                    </strong>
                  </li>
                  <li>
                    {i18n.language === 'hr'
                      ? 'Idite na Profil (Profil)'
                      : 'Navigate to Profile'}
                  </li>
                  <li>
                    {i18n.language === 'hr'
                      ? 'Skrolujte na dno → Danger Zone (Opasna Zona)'
                      : 'Scroll to the bottom → Danger Zone'}
                  </li>
                  <li>
                    {i18n.language === 'hr'
                      ? 'Kliknite Delete Account (Obriši račun)'
                      : 'Tap Delete Account'}
                  </li>
                  <li>
                    {i18n.language === 'hr'
                      ? 'Potvrdite brisanje'
                      : 'Confirm deletion'}
                  </li>
                </ol>
                <div className="mt-4 p-4 bg-white dark:bg-zinc-800 rounded-md border border-purple-200 dark:border-purple-700">
                  <p className="text-sm text-text-secondary dark:text-gray-400">
                    ⏱️ {i18n.language === 'hr'
                      ? 'Vaš račun i svi podaci bit će trajno izbrisani u roku od 48 sati.'
                      : 'Your account and all data will be permanently deleted within 48 hours.'}
                  </p>
                </div>
              </div>

              {/* Method 2: Email Request */}
              <h2 className="text-2xl font-semibold text-text-primary dark:text-white mt-12 mb-4">
                {i18n.language === 'hr' ? 'Metoda 2: Email Zahtjev' : 'Method 2: Email Request'}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                {i18n.language === 'hr'
                  ? 'Ako ne možete pristupiti aplikaciji, pošaljite email na:'
                  : 'If you cannot access the app, send an email to:'}
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
                    {i18n.language === 'hr' ? 'Zahtjev za Brisanje Računa' : 'Account Deletion Request'}
                  </div>
                  <div>
                    <span className="font-semibold text-text-primary dark:text-white">
                      {i18n.language === 'hr' ? 'Uključite:' : 'Include:'}
                    </span>{' '}
                    {i18n.language === 'hr'
                      ? 'Vašu registriranu email adresu'
                      : 'Your registered email address'}
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    ⏰ {i18n.language === 'hr'
                      ? 'Obradit ćemo vaš zahtjev u roku od 7 radnih dana.'
                      : 'We will process your request within 7 business days.'}
                  </p>
                </div>
              </div>

              {/* What Gets Deleted */}
              <h2 className="text-2xl font-semibold text-text-primary dark:text-white mt-12 mb-4">
                {i18n.language === 'hr' ? 'Što Se Briše' : 'What Gets Deleted'}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                {i18n.language === 'hr'
                  ? 'Kada izbrišete svoj račun, sljedeći podaci bit će trajno uklonjeni:'
                  : 'When you delete your account, the following data is permanently removed:'}
              </p>
              <ul className="list-none pl-0 text-text-secondary dark:text-gray-400 mb-6 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-3 text-xl">✓</span>
                  <span>{i18n.language === 'hr' ? 'Podaci o računu (email, ime, lozinka)' : 'Account information (email, name, password)'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-3 text-xl">✓</span>
                  <span>{i18n.language === 'hr' ? 'Informacije o profilu (ime, telefon)' : 'Profile information (name, phone)'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-3 text-xl">✓</span>
                  <span>{i18n.language === 'hr' ? 'Nekretnine i jedinice' : 'Properties and units'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-3 text-xl">✓</span>
                  <span>{i18n.language === 'hr' ? 'Povijest rezervacija' : 'Booking history'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-3 text-xl">✓</span>
                  <span>{i18n.language === 'hr' ? 'Podaci o plaćanjima' : 'Payment records'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-3 text-xl">✓</span>
                  <span>{i18n.language === 'hr' ? 'Analitički podaci' : 'Analytics data'}</span>
                </li>
              </ul>

              {/* Data Retention */}
              <h2 className="text-2xl font-semibold text-text-primary dark:text-white mt-12 mb-4">
                {i18n.language === 'hr' ? 'Razdoblje Zadržavanja Podataka' : 'Data Retention Period'}
              </h2>
              <p className="text-text-secondary dark:text-gray-400 mb-4">
                {i18n.language === 'hr'
                  ? 'Neki podaci mogu biti zadržani radi usklađenosti sa zakonom:'
                  : 'Some data may be retained for legal compliance:'}
              </p>
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 mb-8">
                <ul className="list-none pl-0 text-text-secondary dark:text-gray-300 space-y-3">
                  <li className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 mr-3 font-bold">📋</span>
                    <div>
                      <strong className="text-text-primary dark:text-white">
                        {i18n.language === 'hr' ? 'Porezni zapisi:' : 'Tax records:'}
                      </strong>{' '}
                      {i18n.language === 'hr' ? 'Do 7 godina (zakonski obavezno)' : 'Up to 7 years (legally required)'}
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 mr-3 font-bold">🔒</span>
                    <div>
                      <strong className="text-text-primary dark:text-white">
                        {i18n.language === 'hr' ? 'Logovi prevencije prijevare:' : 'Fraud prevention logs:'}
                      </strong>{' '}
                      {i18n.language === 'hr' ? 'Do 1 godine' : 'Up to 1 year'}
                    </div>
                  </li>
                </ul>
              </div>

              {/* Questions Section */}
              <h2 className="text-2xl font-semibold text-text-primary dark:text-white mt-12 mb-4">
                {i18n.language === 'hr' ? 'Pitanja?' : 'Questions?'}
              </h2>
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                <p className="text-text-secondary dark:text-gray-300 mb-3">
                  {i18n.language === 'hr'
                    ? 'Ako imate bilo kakvih pitanja o brisanju računa ili podataka, kontaktirajte nas:'
                    : 'If you have any questions about account or data deletion, contact us:'}
                </p>
                <div className="space-y-2">
                  <div>
                    <strong className="text-text-primary dark:text-white">
                      {i18n.language === 'hr' ? 'Kontakt:' : 'Contact:'}
                    </strong>{' '}
                    <a href="mailto:info@bookbed.io" className="text-purple-600 dark:text-purple-400 hover:underline">
                      info@bookbed.io
                    </a>
                  </div>
                  <div>
                    <strong className="text-text-primary dark:text-white">
                      {i18n.language === 'hr' ? 'Politika Privatnosti:' : 'Privacy Policy:'}
                    </strong>{' '}
                    <a href="/privacy" className="text-purple-600 dark:text-purple-400 hover:underline">
                      bookbed.io/privacy
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </FadeContent>
        </div>
      </section>
    </div>
  )
}

export default AccountDeletionPage
