import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import _ from "lodash";

const API_URL =
  "https://script.google.com/macros/s/AKfycbzME6ZuUPR1Og8-YatmoI8hXNc4Z5xuBGGGhmrueLoiFvhcCHe3nVJyIRTVhVqCOmhn/exec";

const validatePhone = (phone) =>
  /^[\d\s\-+()]+$/.test(phone) && phone.replace(/\D/g, "").length >= 8;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const BIRTH_DATE_FORMAT = "YYYY/MM/DD";
const BIRTH_DATE_MIN = "1920-01-01";

const getTodayISO = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const displayDateToISO = (value) => {
  const match = /^(\d{4})\/(\d{2})\/(\d{2})$/.exec(value);
  if (!match) return value;

  return `${match[1]}-${match[2]}-${match[3]}`;
};

function launchRealisticConfetti(originElement) {
  if (typeof window === "undefined" || !originElement) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReducedMotion) return;

  const rect = originElement.getBoundingClientRect();
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const colors = ["#009F79", "#FFFFFF", "#FFF9ED", "#D4A843"];
  const particleCount = window.innerWidth < 640 ? 46 : 72;
  const origin = {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height * 0.2,
  };
  const particles = Array.from({ length: particleCount }, (_, index) => {
    const angle = (-90 + (Math.random() - 0.5) * 92) * (Math.PI / 180);
    const speed = 7 + Math.random() * 8;
    const size = 5 + Math.random() * 8;
    const isRibbon = index % 4 === 0;

    return {
      x: origin.x + (Math.random() - 0.5) * rect.width * 0.55,
      y: origin.y + (Math.random() - 0.5) * 8,
      vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 1.8,
      vy: Math.sin(angle) * speed - Math.random() * 4,
      gravity: 0.18 + Math.random() * 0.08,
      drag: 0.986 + Math.random() * 0.006,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.08 + Math.random() * 0.12,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.34,
      width: isRibbon ? size * 0.55 : size,
      height: isRibbon ? size * 1.9 : size * 0.62,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 1,
      life: 0,
      decay: 0.013 + Math.random() * 0.009,
    };
  });
  let animationFrame = null;

  const resizeCanvas = () => {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  canvas.className = "confetti-canvas";
  canvas.setAttribute("aria-hidden", "true");
  resizeCanvas();
  document.body.appendChild(canvas);
  window.addEventListener("resize", resizeCanvas);

  const cleanup = () => {
    cancelAnimationFrame(animationFrame);
    window.removeEventListener("resize", resizeCanvas);
    canvas.remove();
  };

  const render = () => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach((particle) => {
      particle.life += 1;
      particle.vx *= particle.drag;
      particle.vy = particle.vy * particle.drag + particle.gravity;
      particle.x += particle.vx + Math.sin(particle.wobble) * 0.75;
      particle.y += particle.vy;
      particle.wobble += particle.wobbleSpeed;
      particle.rotation += particle.rotationSpeed;
      particle.opacity = Math.max(0, particle.opacity - particle.decay);

      context.save();
      context.globalAlpha = particle.opacity;
      context.translate(particle.x, particle.y);
      context.rotate(particle.rotation);
      context.fillStyle = particle.color;
      context.fillRect(
        -particle.width / 2,
        -particle.height / 2,
        particle.width,
        particle.height,
      );
      context.restore();
    });

    const activeParticles = particles.filter(
      (particle) =>
        particle.opacity > 0.02 &&
        particle.y < window.innerHeight + 80 &&
        particle.x > -80 &&
        particle.x < window.innerWidth + 80,
    );

    if (activeParticles.length > 0) {
      animationFrame = requestAnimationFrame(render);
    } else {
      cleanup();
    }
  };

  animationFrame = requestAnimationFrame(render);
  window.setTimeout(cleanup, 2800);
}

function UserIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function PhoneIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.95.37 1.88.7 2.78a2 2 0 0 1-.45 2.11L8.09 9.88a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.83.57 2.78.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function CalendarIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="3" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function CakeIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-8H4v8" />
      <path d="M4 16.5c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1" />
      <path d="M2 21h20M7 8h10v5H7zM9 8V5M12 8V4M15 8V5" />
    </svg>
  );
}

function InsightIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M8 16v-5" />
      <path d="M12 16V8" />
      <path d="M16 16v-7" />
      <path d="m18.5 5.5.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" />
    </svg>
  );
}

function RingIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 8h8l-2.5 3h-3z" />
      <circle cx="12" cy="16" r="5" />
      <path d="m8 8 2-4h4l2 4" />
    </svg>
  );
}

function GiftIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7" />
      <path d="M12 7H7.5A2.5 2.5 0 1 1 10 4.5C10 6 12 7 12 7zM12 7h4.5A2.5 2.5 0 1 0 14 4.5C14 6 12 7 12 7z" />
    </svg>
  );
}

function GraduationIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 10-10-5-10 5 10 5z" />
      <path d="M6 12v5c3 2 9 2 12 0v-5M22 10v6" />
    </svg>
  );
}

function SparkleIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />
      <path d="m19 17 .8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8z" />
    </svg>
  );
}

function PencilIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="m16.5 3.5 4 4L8 20l-5 1 1-5z" />
    </svg>
  );
}

function ChevronDownIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function LockIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <path d="M7 11V8a5 5 0 0 1 10 0v3" />
    </svg>
  );
}

function CheckCircleIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  );
}

function AlertCircleIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}

function SpinnerIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-80"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8V0C5.37 0 0 5.37 0 12h4z"
      />
    </svg>
  );
}

function SuccessCheckIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        className="success-check-path"
        d="M5 12.5 10 17 19 7"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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


function ThankYouPanel() {
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

function FieldError({ error, isRTL }) {
  if (!error) return null;

  return (
    <p
      role="alert"
      className={`mt-2 flex items-center gap-2 text-xs font-semibold text-red-600 ${isRTL ? "justify-end" : ""}`}
    >
      <AlertCircleIcon className="h-4 w-4 shrink-0" />
      <span>{error}</span>
    </p>
  );
}

function InputField({
  id,
  name,
  icon: Icon,
  type = "text",
  value,
  onChange,
  error,
  help,
  delay = 0,
  required = false,
  disabled = false,
}) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const fieldKey = `form.${name}`;
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;
  const describedBy =
    [help ? helpId : null, error ? errorId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div
      className="form-field animate-slide-up opacity-0"
      style={{ animationDelay: `${delay}ms` }}
    >
      <label htmlFor={id} className="form-label">
        {t(`${fieldKey}.label`)}
      </label>
      <div className="group relative">
        <Icon className={`field-icon ${isRTL ? "right-4" : "left-4"}`} />
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={t(`${fieldKey}.placeholder`)}
          required={required}
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={describedBy}
          className={`
            field-control
            ${isRTL ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left"}
            ${error ? "field-control-error" : "field-control-normal"}
            ${disabled ? "cursor-not-allowed opacity-60" : ""}
          `}
        />
      </div>
      {help && !error && (
        <p
          id={helpId}
          className={`mt-2 text-xs font-medium leading-5 text-slate-400 ${isRTL ? "text-right" : "text-left"}`}
        >
          {help}
        </p>
      )}
      <div id={errorId}>
        <FieldError error={error} isRTL={isRTL} />
      </div>
    </div>
  );
}

function BirthDateField({
  id,
  name,
  icon: Icon,
  value,
  onChange,
  error,
  delay = 0,
}) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const fieldKey = `form.${name}`;
  const errorId = `${id}-error`;
  const inputRef = useRef(null);
  const pickerRef = useRef(null);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return undefined;

    input.value = value || "";
  }, [value]);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return undefined;

    input.value = value || "";
    let isMounted = true;

    const handleDateChange = () => {
      onChange({ target: { name, value: input.value } });
    };

    const initDatepicker = async () => {
      globalThis._ = _;
      globalThis.$hsSelectCollection = globalThis.$hsSelectCollection || [];
      globalThis.$hsDatepickerCollection =
        globalThis.$hsDatepickerCollection || [];
      const { default: HSDatepicker } = await import("@preline/datepicker");

      if (!isMounted || !input.isConnected) return;

      const picker = new HSDatepicker(input, {
        type: "default",
        mode: "default",
        inputMode: true,
        openOnFocus: true,
        positionToInput: "auto",
        dateMin: BIRTH_DATE_MIN,
        dateMax: getTodayISO(),
        dateFormat: BIRTH_DATE_FORMAT,
        dateLocale: isRTL ? "ar" : "en-US",
        locale: isRTL ? "ar" : "en-US",
        selectedDates: value ? [displayDateToISO(value)] : [],
        settings: {
          selection: {
            year: true,
            month: true,
          },
        },
        styles: {
          calendar: "almond-datepicker-panel",
          arrowPrev: "almond-datepicker-arrow",
          arrowNext: "almond-datepicker-arrow",
        },
        templates: {
          arrowPrev:
            '<button type="button" data-vc-arrow="prev" aria-label="Previous month"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg></button>',
          arrowNext:
            '<button type="button" data-vc-arrow="next" aria-label="Next month"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg></button>',
        },
      });

      pickerRef.current = picker;
      input.addEventListener("change.hs.datepicker", handleDateChange);
    };

    initDatepicker();

    return () => {
      isMounted = false;
      input.removeEventListener("change.hs.datepicker", handleDateChange);
      pickerRef.current?.destroy();
      pickerRef.current = null;
    };
  }, [i18n.language]);

  const clearDate = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    onChange({ target: { name, value: "" } });
  };

  return (
    <div
      className="form-field almond-datepicker-field animate-slide-up opacity-0"
      style={{ animationDelay: `${delay}ms` }}
    >
      <label htmlFor={id} className="form-label">
        {t(`${fieldKey}.label`)}
      </label>
      <div className="group relative">
        <Icon className={`field-icon ${isRTL ? "right-4" : "left-4"}`} />
        <input
          ref={inputRef}
          type="text"
          id={id}
          name={name}
          defaultValue={value}
          placeholder={t(`${fieldKey}.placeholder`)}
          readOnly
          inputMode="none"
          autoComplete="bday"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : undefined}
          className={`
            hs-datepicker field-control cursor-pointer
            ${isRTL ? "pr-12 pl-12 text-right" : "pl-12 pr-12 text-left"}
            ${error ? "field-control-error" : "field-control-normal"}
          `}
        />
        {value && (
          <button
            type="button"
            onClick={clearDate}
            aria-label={t("form.birthDate.clear", {
              defaultValue: "Clear birth date",
            })}
            className={`datepicker-clear-button ${isRTL ? "left-4" : "right-4"}`}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        )}
      </div>
      <div id={errorId}>
        <FieldError error={error} isRTL={isRTL} />
      </div>
    </div>
  );
}

function SelectField({
  id,
  name,
  icon: Icon,
  value,
  onChange,
  error,
  delay = 0,
}) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const fieldKey = `form.${name}`;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;
  const help = t(`${fieldKey}.help`, { defaultValue: "" });
  const occasions = [
    { value: "Wedding", label: t("form.occasions.wedding"), icon: RingIcon },
    { value: "Birthday", label: t("form.occasions.birthday"), icon: CakeIcon },
    {
      value: "Engagement",
      label: t("form.occasions.engagement"),
      icon: GiftIcon,
    },
    {
      value: "Graduation",
      label: t("form.occasions.graduation"),
      icon: GraduationIcon,
    },
    { value: "Other", label: t("form.occasions.other"), icon: SparkleIcon },
  ];
  const selectedOption = occasions.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectOption = (option) => {
    onChange({ target: { name, value: option.value } });
    setIsOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen((prev) => !prev);
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setIsOpen(true);
      const currentIndex = Math.max(
        0,
        occasions.findIndex((option) => option.value === value),
      );
      const direction = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex =
        (currentIndex + direction + occasions.length) % occasions.length;
      selectOption(occasions[nextIndex]);
    }
  };

  return (
    <div
      className={`form-field animate-slide-up opacity-0 ${isOpen ? "relative z-[1000]" : "relative z-20"}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <label htmlFor={id} className="form-label">
        {t(`${fieldKey}.label`)}
      </label>
      <div className="group relative" ref={dropdownRef}>
        <Icon className={`field-icon ${isRTL ? "right-4" : "left-4"}`} />
        <button
          type="button"
          id={id}
          onClick={() => setIsOpen((prev) => !prev)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={`${id}-options`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            [help ? helpId : null, error ? errorId : null]
              .filter(Boolean)
              .join(" ") || undefined
          }
          className={`
            field-control flex items-center
            ${isRTL ? "pr-12 pl-12 text-right" : "pl-12 pr-12 text-left"}
            ${value ? "text-slate-900" : "text-slate-400"}
            ${error ? "field-control-error" : "field-control-normal"}
          `}
        >
          <span className="truncate">
            {selectedOption
              ? selectedOption.label
              : t(`${fieldKey}.placeholder`)}
          </span>
        </button>
        <ChevronDownIcon
          className={`pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 text-brand-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""} ${isRTL ? "left-4" : "right-4"}`}
        />

        <div
          id={`${id}-options`}
          role="listbox"
          aria-label={t(`${fieldKey}.label`)}
          className={`dropdown-panel ${isOpen ? "dropdown-panel-open" : "dropdown-panel-closed"} ${isRTL ? "right-0" : "left-0"}`}
        >
          {occasions.map((option) => {
            const OptionIcon = option.icon;
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                tabIndex={isOpen ? 0 : -1}
                aria-selected={isSelected}
                onClick={() => selectOption(option)}
                className={`
                  dropdown-option
                  ${isRTL ? "flex-row-reverse text-right" : "text-left"}
                  ${
                    isSelected
                      ? "dropdown-option-selected"
                      : "dropdown-option-idle"
                  }
                `}
              >
                <OptionIcon
                  className={`h-5 w-5 shrink-0 ${isSelected ? "text-white" : "text-brand-600"}`}
                />
                <span className="flex-1">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      {help && !error && (
        <p
          id={helpId}
          className={`mt-2 text-xs font-medium leading-5 text-slate-400 ${isRTL ? "text-right" : "text-left"}`}
        >
          {help}
        </p>
      )}
      <div id={errorId}>
        <FieldError error={error} isRTL={isRTL} />
      </div>
    </div>
  );
}

function Toast({ show, type, message, onClose }) {
  const timerRef = useRef(null);

  useEffect(() => {
    if (show) timerRef.current = setTimeout(onClose, 4500);
    return () => clearTimeout(timerRef.current);
  }, [show, onClose]);

  if (!show) return null;

  const variant =
    type === "success"
      ? "bg-brand-600 text-white shadow-brand-500/25"
      : "bg-red-600 text-white shadow-red-500/25";

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-toast-in">
      <div
        className={`flex items-center gap-3 rounded-2xl px-5 py-4 text-sm font-semibold shadow-2xl ${variant}`}
      >
        {type === "success" ? (
          <CheckCircleIcon className="h-5 w-5" />
        ) : (
          <AlertCircleIcon className="h-5 w-5" />
        )}
        <span>{message}</span>
      </div>
    </div>
  );
}

export default function ContactForm() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    birthDate: "",
    occasion: "",
    otherOccasion: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitPhase, setSubmitPhase] = useState("idle");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [showThankYou, setShowThankYou] = useState(false);
  const submitButtonRef = useRef(null);
  const buttonResetTimerRef = useRef(null);
  const thankYouTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(buttonResetTimerRef.current);
      clearTimeout(thankYouTimerRef.current);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "occasion" && value !== "Other"
        ? { otherOccasion: "" }
        : {}),
    }));
    if (errors[name] || (name === "occasion" && errors.otherOccasion)) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
        ...(name === "occasion" ? { otherOccasion: "" } : {}),
      }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.fullName.trim())
      nextErrors.fullName = t("form.fullName.error");
    if (!formData.phoneNumber.trim())
      nextErrors.phoneNumber = t("form.phoneNumber.error");
    else if (!validatePhone(formData.phoneNumber))
      nextErrors.phoneNumber = t("form.validation.invalidPhone");
    if (!formData.birthDate) nextErrors.birthDate = t("form.birthDate.error");
    if (!formData.occasion) nextErrors.occasion = t("form.occasion.error");
    if (formData.occasion === "Other" && !formData.otherOccasion.trim()) {
      nextErrors.otherOccasion = t("form.otherOccasion.error");
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast(t("form.validation.required"), "error");
      return;
    }

    setLoading(true);
    setSubmitPhase("processing");
    setShowThankYou(false);
    try {
      await Promise.all([
        fetch(API_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: formData.fullName.trim(),
            phoneNumber: formData.phoneNumber.trim(),
            birthDate: formData.birthDate,
            occasion: formData.occasion,
            otherOccasionDetails:
              formData.occasion === "Other"
                ? formData.otherOccasion.trim()
                : "",
          }),
        }),
        wait(750),
      ]);

      setSubmitPhase("success");
      window.setTimeout(
        () => launchRealisticConfetti(submitButtonRef.current),
        90,
      );
      showToast(t("form.submit.success"), "success");
      setFormData({
        fullName: "",
        phoneNumber: "",
        birthDate: "",
        occasion: "",
        otherOccasion: "",
      });
      setErrors({});
      clearTimeout(thankYouTimerRef.current);
      thankYouTimerRef.current = setTimeout(() => setShowThankYou(true), 1150);
      clearTimeout(buttonResetTimerRef.current);
      buttonResetTimerRef.current = setTimeout(() => {
        setSubmitPhase("idle");
        setLoading(false);
      }, 1700);
    } catch (err) {
      console.error(err);
      setSubmitPhase("idle");
      showToast(t("form.submit.error"), "error");
      setLoading(false);
    } finally {
      if (submitPhase === "idle") setLoading(false);
    }
  };

  return (
    <>
      <section
        className="relative z-10 w-full max-w-[520px] animate-fade-in"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="absolute -inset-6 rounded-[42px] bg-[radial-gradient(circle_at_20%_20%,rgba(0,159,121,0.14),transparent_38%),radial-gradient(circle_at_85%_10%,rgba(212,168,67,0.10),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(0,159,121,0.08),transparent_42%)] blur-2xl sm:-inset-8" />

        <div className="relative overflow-visible rounded-[28px] border border-white/80 bg-white/[0.96] shadow-[0_30px_90px_rgba(15,23,42,0.13),0_10px_28px_rgba(0,159,121,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl sm:rounded-[32px]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 rounded-t-[28px] bg-[radial-gradient(ellipse_at_top,rgba(0,159,121,0.09),transparent_70%)] sm:rounded-t-[32px]" />
          <div className="relative px-5 py-7 sm:px-9 sm:py-9 lg:px-10">
            <header className="text-center">
              <div className="mx-auto mb-4 flex h-[88px] w-[88px] items-center justify-center rounded-full bg-white shadow-[0_16px_38px_rgba(15,23,42,0.10),0_0_0_8px_rgba(0,159,121,0.045)] sm:h-24 sm:w-24">
                <img
                  src="/logo.jpg"
                  alt="Almond Cakes"
                  className="h-[76px] w-[76px] object-contain sm:h-20 sm:w-20"
                />
              </div>
              <div className="mx-auto mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-brand-500/15 bg-brand-50/80 px-4 py-2 text-xs font-bold text-brand-700 shadow-[0_10px_28px_rgba(0,159,121,0.08)]">
                <InsightIcon className="h-4 w-4 shrink-0 text-gold-400" />
                <span>{t("form.valueBadge")}</span>
              </div>
            </header>

            <div className="my-6 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent sm:my-7" />

            <div className="relative">
              <div
                className={`transition-all duration-500 ease-out ${showThankYou ? "pointer-events-none max-h-0 -translate-y-2 overflow-hidden opacity-0" : "max-h-[720px] translate-y-0 opacity-100"}`}
              >
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-4 sm:space-y-[18px]"
                >
                  <InputField
                    id="fullName"
                    name="fullName"
                    icon={UserIcon}
                    value={formData.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                    delay={80}
                  />
                  <InputField
                    id="phoneNumber"
                    name="phoneNumber"
                    icon={PhoneIcon}
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    error={errors.phoneNumber}
                    help={t("form.phoneNumber.help", { defaultValue: "" })}
                    delay={150}
                  />
                  <BirthDateField
                    id="birthDate"
                    name="birthDate"
                    icon={CalendarIcon}
                    value={formData.birthDate}
                    onChange={handleChange}
                    error={errors.birthDate}
                    delay={220}
                  />
                  <SelectField
                    id="occasion"
                    name="occasion"
                    icon={CakeIcon}
                    value={formData.occasion}
                    onChange={handleChange}
                    error={errors.occasion}
                    delay={290}
                  />
                  <div
                    aria-live="polite"
                    aria-hidden={formData.occasion !== "Other"}
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      formData.occasion === "Other"
                        ? "max-h-36 translate-y-0 opacity-100"
                        : "max-h-0 -translate-y-1 opacity-0"
                    }`}
                  >
                    <InputField
                      id="otherOccasion"
                      name="otherOccasion"
                      icon={PencilIcon}
                      value={formData.otherOccasion}
                      onChange={handleChange}
                      error={errors.otherOccasion}
                      delay={0}
                      required={formData.occasion === "Other"}
                      disabled={formData.occasion !== "Other"}
                    />
                  </div>

                  <div
                    className="pt-1 animate-slide-up opacity-0 sm:pt-2"
                    style={{ animationDelay: "360ms" }}
                  >
                    <button
                      ref={submitButtonRef}
                      type="submit"
                      disabled={loading || submitPhase !== "idle"}
                      className={`realistic-submit-button group relative flex h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-2xl px-6 text-base font-bold text-white shadow-[0_14px_28px_rgba(0,159,121,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(0,159,121,0.34)] focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:translate-y-0 disabled:cursor-not-allowed disabled:hover:translate-y-0 ${
                        submitPhase === "processing"
                          ? "is-processing bg-brand-700"
                          : submitPhase === "success"
                            ? "is-success bg-brand-500"
                            : "bg-brand-500 hover:bg-brand-600"
                      }`}
                    >
                      <span className="submit-label">
                        {t("form.submit.button")}
                      </span>
                      <span
                        className="submit-center-icon submit-processing-icon"
                        aria-label={t("form.submit.sending")}
                      >
                        <span className="realistic-spinner" />
                      </span>
                      <span
                        className="submit-center-icon submit-success-icon"
                        aria-label={t("form.submit.success")}
                      >
                        <SuccessCheckIcon className="h-7 w-7 text-white" />
                      </span>
                    </button>
                  </div>
                </form>
              </div>

              {showThankYou && <ThankYouPanel />}
            </div>

            <footer className="mt-6 flex items-center justify-center gap-2 text-xs font-medium text-slate-400 sm:mt-7">
              <LockIcon className="h-4 w-4 text-brand-500/80" />
              <span>{t("form.secure")}</span>
            </footer>
          </div>
        </div>
      </section>

      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
    </>
  );
}
