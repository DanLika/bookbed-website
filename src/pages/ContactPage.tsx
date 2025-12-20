import { useState, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const ContactPage = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // Create mailto link
    const subject = encodeURIComponent(`BookBed Contact: ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )
    window.location.href = `mailto:dusko@bookbed.io?subject=${subject}&body=${body}`

    setStatus('success')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-black dark:to-zinc-900">
      {/* Hero */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-text-primary dark:text-white mb-6"
          >
            {t('contact.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-text-secondary dark:text-gray-400"
          >
            {t('contact.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-text-primary dark:text-white mb-2"
              >
                {t('contact.name')}
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-border dark:border-zinc-700 text-text-primary dark:text-white placeholder-text-tertiary focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-primary dark:text-white mb-2"
              >
                {t('contact.email')}
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-border dark:border-zinc-700 text-text-primary dark:text-white placeholder-text-tertiary focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-text-primary dark:text-white mb-2"
              >
                {t('contact.message')}
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-border dark:border-zinc-700 text-text-primary dark:text-white placeholder-text-tertiary focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-semibold rounded-xl shadow-purple hover:shadow-purple-dark transition-all transform hover:scale-[1.02]"
            >
              {t('contact.send')}
            </button>

            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-state-success"
              >
                {t('contact.success')}
              </motion.p>
            )}
          </form>

          {/* Email Direct */}
          <div className="mt-12 text-center">
            <p className="text-text-secondary dark:text-gray-400 mb-2">
              Or email us directly at:
            </p>
            <a
              href="mailto:dusko@bookbed.io"
              className="text-primary hover:text-primary-dark font-medium text-lg"
            >
              dusko@bookbed.io
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default ContactPage
