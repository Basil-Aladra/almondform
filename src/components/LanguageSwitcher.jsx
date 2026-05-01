import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

function ChevronDownIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const currentLanguage = i18n.language
  const isRTL = currentLanguage === 'ar'

  const languages = [
    { code: 'ar', label: 'العربية' },
    { code: 'en', label: 'English' },
  ]

  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang)
    setIsOpen(false)
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.language-switcher')) setIsOpen(false)
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div className="language-switcher relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex h-11 items-center gap-2 rounded-full border border-brand-500/20 bg-white/85 px-4 text-sm font-semibold text-slate-700 shadow-[0_10px_28px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-200 hover:border-brand-500/40 hover:text-brand-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/20 focus-visible:ring-offset-2 ${isRTL ? 'flex-row-reverse' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{t('language.switch')}</span>
        <ChevronDownIcon className={`h-4 w-4 text-brand-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute top-full mt-2 w-36 overflow-hidden rounded-2xl border border-slate-100 bg-white/95 py-1 shadow-2xl backdrop-blur-xl ${isRTL ? 'right-0' : 'left-0'}`}>
          {languages.map((language) => (
            <button
              key={language.code}
              type="button"
              onClick={() => toggleLanguage(language.code)}
              className={`flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors duration-150 hover:bg-brand-50 focus:outline-none focus-visible:bg-brand-50 ${currentLanguage === language.code ? 'text-brand-700' : 'text-slate-600'} ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
              role="option"
              aria-selected={currentLanguage === language.code}
            >
              <span>{language.label}</span>
              {currentLanguage === language.code && <span className="h-2 w-2 rounded-full bg-brand-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
