import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enTranslation from '../../public/locales/en/translation.json'
import hrTranslation from '../../public/locales/hr/translation.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      hr: { translation: hrTranslation },
      en: { translation: enTranslation },
    },
    lng: 'hr', // Croatian as default/primary language
    fallbackLng: 'hr',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
