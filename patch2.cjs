const fs = require('fs');

const path = 'c:\\Users\\Yatta_Gamning\\Desktop\\almondform\\src\\components\\ContactForm.jsx';
let content = fs.readFileSync(path, 'utf8');

const starIconCode = `
function StarIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
`;

const ctaCode = `
      {showReviewCta && (
        <div 
          className="mx-auto mt-8 max-w-[400px] animate-slide-up rounded-2xl border border-gold-400/20 bg-[linear-gradient(135deg,rgba(255,249,237,0.4),rgba(255,255,255,0.6))] p-6 shadow-[0_8px_24px_rgba(212,168,67,0.06)] opacity-0" 
          style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
        >
          <div className="mb-4 flex justify-center gap-1 text-gold-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon key={star} className="h-5 w-5 drop-shadow-sm" />
            ))}
          </div>
          <p className="mb-5 text-[15px] font-semibold leading-relaxed text-slate-700">
            {t("form.thankYou.googleReviewText")}
          </p>
          <div className="flex flex-col items-center gap-3">
            <a
              href="https://g.page/r/CQ_PcautRl-UEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#009F79] px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_4px_14px_rgba(0,159,121,0.3)] transition-all duration-200 hover:bg-[#007d60] hover:shadow-[0_6px_20px_rgba(0,159,121,0.4)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
              <span>{t("form.thankYou.googleReviewButton")}</span>
            </a>
            <button
              type="button"
              className="mt-1 text-[13px] font-semibold text-slate-400 transition-colors duration-200 hover:text-slate-600"
              onClick={() => setShowReviewCta(false)}
            >
              {t("form.thankYou.googleReviewNoThanks")}
            </button>
          </div>
        </div>
      )}
`;

if (!content.includes('StarIcon')) {
  content = content.replace(/function ThankYouPanel\(\) \{/, starIconCode + '\\nfunction ThankYouPanel() {');
}

if (!content.includes('showReviewCta')) {
  content = content.replace(/const \{ t \} = useTranslation\(\);/, 'const { t } = useTranslation();\\n  const [showReviewCta, setShowReviewCta] = useState(true);');
  content = content.replace(/\{t\("form\.thankYou\.message"\)\}\s*<\/p>/, '{t("form.thankYou.message")}\\n      </p>\\n' + ctaCode);
}

fs.writeFileSync(path, content, 'utf8');
