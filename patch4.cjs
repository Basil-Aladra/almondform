const fs = require('fs');
const path = 'c:/Users/Yatta_Gamning/Desktop/almondform/src/components/ContactForm.jsx';
let content = fs.readFileSync(path, 'utf8');

const startIdx = content.indexOf('function ThankYouPanel() {');
const endIdx = content.indexOf('function FieldError({ error, isRTL }) {');

const newThankYou = `function ThankYouPanel() {
  const { t } = useTranslation();
  const [showReviewCta, setShowReviewCta] = useState(true);

  return (
    <div className="thank-you-panel animate-thank-you-in py-8 text-center sm:py-10">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-gold-400/40 bg-[linear-gradient(135deg,rgba(255,249,237,0.95),rgba(255,255,255,0.96))] text-gold-400 shadow-[0_18px_38px_rgba(212,168,67,0.16)]">
        <SparkleIcon className="h-8 w-8" />
      </div>
      <h2 className="font-luxury-ar text-[28px] font-bold leading-tight text-slate-950 sm:text-[32px]">
        {t("form.thankYou.title")}
      </h2>
      <p className="mx-auto mt-3 max-w-[350px] text-[15px] font-medium leading-7 text-slate-500">
        {t("form.thankYou.message")}
      </p>

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
    </div>
  );
}

`;

if (startIdx !== -1 && endIdx !== -1) {
    content = content.substring(0, startIdx) + newThankYou + content.substring(endIdx);
    fs.writeFileSync(path, content, 'utf8');
    console.log("Successfully patched!");
} else {
    console.log("Failed to find indices", startIdx, endIdx);
}
