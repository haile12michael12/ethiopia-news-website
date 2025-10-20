import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export default function Header() {
  const { t, i18n } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'am', name: 'አማርኛ' },
    { code: 'om', name: 'Oromoo' },
    { code: 'ti', name: 'ትግርኛ' },
  ]

  return (
    <header className="bg-primary-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
            {t('app_name')}
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-primary-200 transition">
              {t('home')}
            </Link>
            <Link to="/submit" className="hover:text-primary-200 transition">
              {t('submit_article')}
            </Link>
            
            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="bg-primary-600 text-white px-3 py-1 rounded border border-primary-500 hover:bg-primary-500 transition"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block hover:text-primary-200 transition py-2">
              {t('home')}
            </Link>
            <Link to="/submit" className="block hover:text-primary-200 transition py-2">
              {t('submit_article')}
            </Link>
            <div className="pt-2">
              <select
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className="bg-primary-600 text-white px-3 py-2 rounded border border-primary-500 w-full"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
