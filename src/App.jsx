import { useTranslation } from 'react-i18next'
import ContactForm from './components/ContactForm'
import LanguageSwitcher from './components/LanguageSwitcher'
import './i18n'

function StickerIcon({ type, className = '' }) {
  if (type === 'cake') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-8H4v8" />
        <path d="M4 16.5c1.4 0 1.4-1 2.8-1s1.4 1 2.8 1 1.4-1 2.8-1 1.4 1 2.8 1 1.4-1 2.8-1 1.4 1 2.8 1" />
        <path d="M2 21h20M7 8h10v5H7zM9 8V5M12 8V4M15 8V5" />
      </svg>
    )
  }

  if (type === 'heart') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 1 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z" />
      </svg>
    )
  }

  if (type === 'check') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 2.7 2.7L16.5 9" />
      </svg>
    )
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 2 2.1 6.8H21l-5.5 4 2.1 6.8L12 15.4l-5.6 4.2 2.1-6.8L3 8.8h6.9z" />
    </svg>
  )
}

function DigitalSticker({ className, variant, icon, label, sublabel }) {
  return (
    <div className={`digital-sticker digital-sticker-${variant} ${className}`}>
      <span className="digital-sticker-shine" />
      <span className="digital-sticker-icon">
        {icon === 'monogram' ? <span className="digital-sticker-monogram">AC</span> : <StickerIcon type={icon} className="h-5 w-5" />}
      </span>
      <span className="digital-sticker-text">
        <span>{label}</span>
        {sublabel && <small>{sublabel}</small>}
      </span>
    </div>
  )
}

function StickerCollage() {
  const { i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  const copy = {
    taste: isRTL ? ['ذوقك يهمنا', 'Your Taste Matters'] : ['Your Taste Matters', 'ذوقك يهمنا'],
    love: isRTL ? ['صُنع بحب', 'Made with Love'] : ['Made with Love', 'صُنع بحب'],
    excellence: isRTL ? ['تميز', 'Excellence'] : ['Excellence', 'تميز'],
    delight: isRTL ? ['لذة لا تُنسى', 'Unforgettable Delight'] : ['Unforgettable Delight', 'لذة لا تُنسى'],
    thanks: isRTL ? ['شكراً لمساهمتك', 'Thank You'] : ['Thank You', 'شكراً لمساهمتك'],
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[1]" aria-hidden="true">
      <DigitalSticker
        variant="green"
        icon="monogram"
        label={copy.taste[0]}
        sublabel={copy.taste[1]}
        className="left-[max(1rem,calc(50%_-_555px))] top-[14%] hidden w-[168px] -rotate-6 md:flex"
      />
      <DigitalSticker
        variant="cream"
        icon="cake"
        label={copy.love[0]}
        sublabel={copy.love[1]}
        className="right-[max(1rem,calc(50%_-_560px))] top-[18%] hidden w-[158px] rotate-7 lg:flex"
      />
      <DigitalSticker
        variant="gold"
        icon="star"
        label={copy.excellence[0]}
        sublabel={copy.excellence[1]}
        className="left-[max(1rem,calc(50%_-_535px))] bottom-[18%] hidden w-[150px] rotate-5 lg:flex"
      />
      <DigitalSticker
        variant="silver"
        icon="check"
        label={copy.thanks[0]}
        sublabel={copy.thanks[1]}
        className="right-[max(1rem,calc(50%_-_520px))] bottom-[13%] hidden w-[174px] -rotate-4 md:flex"
      />
      <DigitalSticker
        variant="brown"
        icon="heart"
        label={copy.delight[0]}
        sublabel={copy.delight[1]}
        className="left-3 bottom-4 flex w-[142px] rotate-[-5deg] scale-90 sm:hidden"
      />
      <DigitalSticker
        variant="green"
        icon="monogram"
        label="AC"
        sublabel={isRTL ? 'Almond Cakes' : 'Almond Cakes'}
        className="right-3 bottom-6 flex w-[116px] rotate-6 scale-90 sm:hidden"
      />
    </div>
  )
}

function App() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f8fbf9] px-4 py-16 font-body selection:bg-brand-100 selection:text-brand-800 sm:px-6 sm:py-20">
      <div className="pointer-events-none fixed inset-0">
        <img
          src="/decor/luxury-dessert-bg.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-55 blur-[2px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(249,252,251,0.96)_0%,rgba(255,255,255,0.78)_44%,rgba(0,159,121,0.22)_100%)]" />
        <div className="absolute left-[-12%] top-[-12%] h-[420px] w-[420px] rounded-full bg-brand-100/45 blur-3xl" />
        <div className="absolute bottom-[-18%] right-[-10%] h-[520px] w-[520px] rounded-full bg-brand-200/25 blur-3xl" />
        <div className="absolute right-[18%] top-[18%] h-64 w-64 rounded-full bg-white/60 blur-3xl" />
      </div>

      <div className="pointer-events-none fixed inset-0 z-[1] hidden opacity-45 lg:block">
        <img
          src="/decor/sticker-layer-cake.svg"
          alt=""
          aria-hidden="true"
          className="sticker-float absolute left-[max(2rem,calc(50%_-_500px))] top-[12%] w-24 opacity-[0.82] drop-shadow-2xl md:w-32 lg:w-40"
        />
        <img
          src="/decor/sticker-cupcake.svg"
          alt=""
          aria-hidden="true"
          className="sticker-float sticker-float-delay absolute right-[max(1.5rem,calc(50%_-_505px))] top-[20%] w-20 opacity-[0.82] drop-shadow-2xl md:w-28 lg:w-36"
        />
        <img
          src="/decor/sticker-macarons.svg"
          alt=""
          aria-hidden="true"
          className="sticker-float sticker-float-slow absolute bottom-[10%] right-[max(2rem,calc(50%_-_470px))] w-24 opacity-[0.82] drop-shadow-2xl md:w-32 lg:w-40"
        />
      </div>

      <StickerCollage />

      <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
        <LanguageSwitcher />
      </div>

      <ContactForm />
    </main>
  )
}

export default App
