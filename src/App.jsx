import ContactForm from './components/ContactForm'
import LanguageSwitcher from './components/LanguageSwitcher'
import './i18n'

function App() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f8fbf9] px-4 py-20 font-body selection:bg-brand-100 selection:text-brand-800 sm:px-6">
      <div className="pointer-events-none fixed inset-0">
        <img
          src="/decor/luxury-dessert-bg.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-70 blur-[2px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(248,251,249,0.92)_0%,rgba(255,255,255,0.72)_42%,rgba(0,159,121,0.26)_100%)]" />
        <div className="absolute left-[-12%] top-[-12%] h-[420px] w-[420px] rounded-full bg-brand-100/60 blur-3xl" />
        <div className="absolute bottom-[-18%] right-[-10%] h-[520px] w-[520px] rounded-full bg-brand-200/35 blur-3xl" />
        <div className="absolute right-[18%] top-[18%] h-64 w-64 rounded-full bg-white/70 blur-3xl" />
      </div>

      <div className="pointer-events-none fixed inset-0 z-[1] hidden sm:block">
        <img
          src="/decor/sticker-layer-cake.svg"
          alt=""
          aria-hidden="true"
          className="sticker-float absolute left-[max(2rem,calc(50%_-_470px))] top-[10%] w-28 drop-shadow-2xl md:w-36 lg:w-44"
        />
        <img
          src="/decor/sticker-cupcake.svg"
          alt=""
          aria-hidden="true"
          className="sticker-float sticker-float-delay absolute right-[max(1.5rem,calc(50%_-_480px))] top-[18%] w-24 drop-shadow-2xl md:w-32 lg:w-40"
        />
        <img
          src="/decor/sticker-macarons.svg"
          alt=""
          aria-hidden="true"
          className="sticker-float sticker-float-slow absolute bottom-[9%] right-[max(2rem,calc(50%_-_440px))] w-28 drop-shadow-2xl md:w-36 lg:w-44"
        />
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-3 z-[1] flex justify-between px-3 sm:hidden">
        <img src="/decor/sticker-layer-cake.svg" alt="" aria-hidden="true" className="sticker-float w-20 opacity-90" />
        <img src="/decor/sticker-macarons.svg" alt="" aria-hidden="true" className="sticker-float sticker-float-delay w-20 opacity-90" />
      </div>

      <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
        <LanguageSwitcher />
      </div>

      <ContactForm />
    </main>
  )
}

export default App
