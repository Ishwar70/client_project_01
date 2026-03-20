/**
 * BookingModal — Reusable booking form. Two modes:
 *
 * 1. INLINE  →  <BookingModal inline />
 *              Renders form card directly in parent layout. No state needed.
 *
 * 2. MODAL   →  <BookingModal isOpen={open} onClose={() => setOpen(false)} />
 *              Floating overlay popup — centered on ALL screen sizes.
 *
 * Props:
 *  inline       {boolean}  - Embed inline (default: false = modal mode)
 *  isOpen       {boolean}  - Modal mode: controls visibility
 *  onClose      {function} - Modal mode: close handler
 *  title        {string}   - Heading           (default: "Plan Your Journey")
 *  subtitle     {string}   - Helper text
 *  submitLabel  {string}   - Button text       (default: "Send Inquiry")
 *  onSubmit     {function} - Custom submit handler (receives formData object)
 *  embedded     {boolean}  - Skip backdrop/overlay (parent owns it)
 */

import { useState, useEffect, useCallback, useRef } from "react";

const GOLD   = "#BFA13B";
const DARK   = "#8e7421";
const LIGHT  = "#fdf8ec";

const EMPTY = { name: "", email: "", phone: "", place: "", date: "", passengers: "1", message: "" };

const PASSENGER_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

/* ─── tiny helpers ─── */
const GradBtn = ({ children, className = "", ...p }) => (
  <button
    className={`relative overflow-hidden group ${className}`}
    style={{ background: `linear-gradient(135deg, ${GOLD} 0%, ${DARK} 100%)` }}
    {...p}
  >
    <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
    <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
  </button>
);

const Field = ({ label, icon, error, children }) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-stone-400">
        {icon && <span className="text-[13px]">{icon}</span>}
        {label}
      </label>
    )}
    {children}
    {error && <p className="text-[11px] text-red-500 ml-0.5">{error}</p>}
  </div>
);

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-stone-200 bg-white/70 " +
  "focus:border-[#BFA13B] focus:ring-2 focus:ring-[#BFA13B]/20 focus:bg-white " +
  "outline-none transition-all duration-200 text-sm text-stone-800 placeholder:text-stone-400 " +
  "hover:border-stone-300";

export default function BookingModal({
  inline      = false,
  isOpen      = false,
  onClose,
  embedded    = false,
  title       = "Plan Your Journey",
  subtitle    = "Tell us where you dream of going.",
  submitLabel = "Send Inquiry",
  onSubmit,
}) {
  const [form, setForm]         = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors]     = useState({});
  const [step, setStep]         = useState(1); // 2-step form on mobile
  const [animating, setAnimating] = useState(false);
  const scrollRef = useRef(null);

  /* ── scroll lock ── */
  useEffect(() => {
    if (inline || embedded) return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [inline, embedded, isOpen]);

  /* ── reset on close ── */
  useEffect(() => {
    if (inline || embedded || isOpen) return;
    const t = setTimeout(() => { setForm(EMPTY); setSubmitted(false); setStep(1); setErrors({}); }, 350);
    return () => clearTimeout(t);
  }, [inline, embedded, isOpen]);

  /* ── escape key ── */
  const onEsc = useCallback((e) => { if (e.key === "Escape") onClose?.(); }, [onClose]);
  useEffect(() => {
    if (inline || embedded || !isOpen) return;
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [inline, embedded, isOpen, onEsc]);

  if (!inline && !embedded && !isOpen) return null;

  /* ── handlers ── */
  const change = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone is required";
    return e;
  };
  const validateStep2 = () => {
    const e = {};
    if (!form.place.trim()) e.place = "Destination is required";
    if (!form.date)         e.date  = "Travel date is required";
    return e;
  };

  const goStep2 = () => {
    const e = validateStep1();
    if (Object.keys(e).length) { setErrors(e); return; }
    setAnimating(true);
    setTimeout(() => { setStep(2); setAnimating(false); scrollRef.current?.scrollTo(0,0); }, 180);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validateStep2();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    onSubmit ? onSubmit(form) : console.log("Booking:", form);
    setSubmitted(true);
    if (!inline && !embedded) setTimeout(() => onClose?.(), 2800);
  };

  /* ── decoration ── */
  const Ornament = () => (
    <svg width="120" height="12" viewBox="0 0 120 12" fill="none" className="mx-auto opacity-40">
      <line x1="0" y1="6" x2="45" y2="6" stroke={GOLD} strokeWidth="1"/>
      <circle cx="60" cy="6" r="4" fill={GOLD}/>
      <circle cx="60" cy="6" r="2" fill="white"/>
      <line x1="75" y1="6" x2="120" y2="6" stroke={GOLD} strokeWidth="1"/>
    </svg>
  );

  /* ── step indicator ── */
  const StepPills = () => (
    <div className="flex items-center gap-2 justify-center mb-5">
      {[1, 2].map((s) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className="flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold transition-all duration-300"
            style={{
              background: step >= s ? `linear-gradient(135deg, ${GOLD}, ${DARK})` : "#e7e5e4",
              color: step >= s ? "white" : "#a8a29e",
              boxShadow: step === s ? `0 0 0 3px ${GOLD}22` : "none",
            }}
          >
            {step > s ? (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
              </svg>
            ) : s}
          </div>
          <span className="text-[11px] font-medium text-stone-400">
            {s === 1 ? "Your Details" : "Trip Info"}
          </span>
          {s < 2 && <div className="w-8 h-px bg-stone-200 mx-1" />}
        </div>
      ))}
    </div>
  );

  /* ── form body ── */
  const formBody = (
    <div
      ref={scrollRef}
      className={[
        "bg-white flex flex-col",
        inline
          ? "w-full rounded-[1.75rem]"
          : "relative w-full rounded-2xl",
        !inline && !embedded ? "max-h-[90dvh] overflow-y-auto" : "overflow-y-auto max-h-[85dvh]",
      ].join(" ")}
      style={{
        boxShadow: inline
          ? "0 20px 60px -8px rgba(0,0,0,0.14), 0 0 0 1px rgba(191,161,59,0.12)"
          : "0 32px 80px -12px rgba(0,0,0,0.26), 0 0 0 1px rgba(191,161,59,0.1)",
        fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
      }}
    >
      {/* ── gold cap bar ── */}
      <div
        className="h-0.75 w-full shrink-0 rounded-t-2xl"
        style={{ background: `linear-gradient(to right, transparent, ${GOLD}, ${DARK}, ${GOLD}, transparent)` }}
      />

      {/* ── ambient header ── */}
      <div
        className="shrink-0 px-6 sm:px-8 pt-7 pb-5 text-center relative overflow-hidden"
        style={{ background: `linear-gradient(160deg, ${LIGHT} 0%, white 100%)` }}
      >
        {/* decorative dots */}
        <div className="absolute top-3 right-6 w-20 h-20 rounded-full opacity-[0.06]"
          style={{ background: `radial-gradient(circle, ${GOLD}, transparent)` }} />
        <div className="absolute bottom-0 left-4 w-14 h-14 rounded-full opacity-[0.05]"
          style={{ background: `radial-gradient(circle, ${DARK}, transparent)` }} />

        <div
          className="inline-flex items-center justify-center w-11 h-11 rounded-2xl mb-3 shadow-md"
          style={{ background: `linear-gradient(135deg, ${GOLD}, ${DARK})` }}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0022 5.5V3.935M12 15v6m0-6a9 9 0 110-18 9 9 0 010 18z"/>
          </svg>
        </div>

        <h2
          className="text-2xl sm:text-[1.7rem] font-bold text-stone-800 leading-tight"
        >
          {title}
        </h2>
        <Ornament />
        <p className="text-stone-400 text-[13px] mt-2.5 font-sans" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {subtitle}
        </p>

        {/* close btn */}
        {!inline && (
          <button
            onClick={() => onClose?.()}
            aria-label="Close"
            className="absolute top-4 right-4 p-2 rounded-xl text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-all duration-150"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        )}
      </div>

      {/* ── scrollable form area ── */}
      <div className="flex-1 px-6 sm:px-8 pt-5 pb-8 overflow-y-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {submitted ? (
          /* ── Success ── */
          <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl"
              style={{ background: `linear-gradient(135deg, ${GOLD}, ${DARK})` }}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-stone-800 mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Inquiry Sent!
              </h3>
              <p className="text-stone-500 text-sm mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Our travel expert will reach out within 24 hours.
              </p>
              {(inline || embedded) && (
                <button
                  onClick={() => { setForm(EMPTY); setSubmitted(false); setStep(1); }}
                  className="text-sm font-semibold underline underline-offset-4"
                  style={{ color: GOLD, fontFamily: "'DM Sans', sans-serif" }}
                >
                  Submit another enquiry
                </button>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <StepPills />

            {/* ── Step 1: Personal Details ── */}
            <div
              className="space-y-4 transition-all duration-200"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating ? "translateX(-12px)" : "none",
                display: step === 1 ? "block" : "none",
              }}
            >
              <Field label="Full Name" icon="👤" error={errors.name}>
                <input type="text" name="name" placeholder="e.g. Ravi Sharma"
                  required value={form.name} onChange={change} className={inputCls} />
              </Field>

              <Field label="Email Address" icon="✉️" error={errors.email}>
                <input type="email" name="email" placeholder="you@example.com"
                  required value={form.email} onChange={change} className={inputCls} />
              </Field>

              <Field label="Phone Number" icon="📞" error={errors.phone}>
                <input type="tel" name="phone" placeholder="+91 98765 43210"
                  required value={form.phone} onChange={change} className={inputCls} />
              </Field>

              <GradBtn
                type="button"
                onClick={goStep2}
                className="w-full py-4 rounded-xl text-white font-semibold text-[15px] tracking-wide shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 mt-2"
              >
                Continue
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </GradBtn>
            </div>

            {/* ── Step 2: Trip Details ── */}
            <div
              className="space-y-4 transition-all duration-200"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating ? "translateX(12px)" : "none",
                display: step === 2 ? "block" : "none",
              }}
            >
              <Field label="Destination" icon="📍" error={errors.place}>
                <input type="text" name="place" placeholder="e.g. Kedarnath, Manali, Bali…"
                  required value={form.place} onChange={change} className={inputCls} />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Travel Date" icon="📅" error={errors.date}>
                  <input type="date" name="date"
                    required value={form.date} onChange={change}
                    className={inputCls + " text-stone-600"}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </Field>

                <Field label="Passengers" icon="👥">
                  <select name="passengers" value={form.passengers} onChange={change} className={inputCls}>
                    {PASSENGER_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o} {o === "1" ? "person" : "people"}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Special Requests (optional)" icon="💬">
                <textarea
                  name="message" rows="3"
                  placeholder="Group type, dietary needs, accessibility, budget range…"
                  value={form.message} onChange={change}
                  className={inputCls + " resize-none"}
                />
              </Field>

              {/* trust badges */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                {[
                  { icon: "🔒", text: "100% Secure" },
                  { icon: "⚡", text: "24hr Reply" },
                  { icon: "✨", text: "Custom Plan" },
                ].map(({ icon, text }) => (
                  <div key={text}
                    className="flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl text-center"
                    style={{ background: LIGHT }}>
                    <span className="text-base leading-none">{icon}</span>
                    <span className="text-[10px] font-semibold text-stone-500 leading-tight">{text}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 rounded-xl border-2 border-stone-200 text-stone-600 font-semibold text-sm hover:border-stone-300 hover:bg-stone-50 active:scale-[0.98] transition-all duration-150"
                >
                  ← Back
                </button>
                <GradBtn
                  type="submit"
                  className="flex-2 py-4 rounded-xl text-white font-semibold text-[15px] tracking-wide shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
                >
                  {submitLabel}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </GradBtn>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );

  /* ── fonts + animations ── */
  const assets = (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes bmFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes bmSlideUp {
          from { opacity: 0; transform: translateY(28px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        .bm-overlay { animation: bmFadeIn 0.25s ease forwards; }
        .bm-card    { animation: bmSlideUp 0.35s cubic-bezier(0.34,1.4,0.64,1) forwards; }
      `}</style>
    </>
  );

  /* ── inline mode ── */
  if (inline) return <>{assets}{formBody}</>;

  /* ── embedded mode (parent owns backdrop) ── */
  if (embedded) return <>{assets}{formBody}</>;

  /* ── full modal mode ── */
  return (
    <>
      {assets}
      {/* Backdrop — always centered, no bottom-sheet on mobile */}
      <div
        className="bm-overlay fixed inset-0 z-200 flex items-center justify-center p-4 sm:p-6"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          backgroundColor: "rgba(28,25,23,0.62)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
      >
        {/* Card — max-w capped, overflow scrolls inside */}
        <div
          className="bm-card w-full"
          style={{ maxWidth: "480px" }}
          onClick={(e) => e.stopPropagation()}
        >
          {formBody}
        </div>
      </div>
    </>
  );
}