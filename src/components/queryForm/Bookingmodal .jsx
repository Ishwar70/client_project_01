import { useState, useEffect } from "react";
import { submitForm } from "../../services/form.service";

const GOLD = "#BFA13B";
const DARK = "#8e7421";
const LIGHT = "#fdf8ec";

const EMPTY = { name: "", email: "", phone: "", place: "", date: "", passengers: "1", message: "" };
const PASSENGER_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

/* ─── tiny helpers ─── */
const GradBtn = ({ children, className = "", loading, ...p }) => (
  <button
    className={`relative overflow-hidden group disabled:opacity-70 ${className}`}
    style={{ background: `linear-gradient(135deg, ${GOLD} 0%, ${DARK} 100%)` }}
    disabled={loading}
    {...p}
  >
    <span className="relative z-10 flex items-center justify-center gap-2">
      {loading ? (
        <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full" />
      ) : children}
    </span>
  </button>
);

const Field = ({ label, icon, error, children }) => (
  <div className="flex flex-col gap-0.5">
    {label && (
      <label className="flex items-center gap-1 text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-400">
        {icon && <span className="text-[11px] sm:text-[13px]">{icon}</span>}
        {label}
      </label>
    )}
    {children}
    {error && <p className="text-[9px] text-red-500 ml-0.5">{error}</p>}
  </div>
);

const inputCls =
  "w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-stone-200 bg-white/70 " +
  "focus:border-[#BFA13B] focus:ring-2 focus:ring-[#BFA13B]/20 focus:bg-white " +
  "outline-none transition-all duration-200 text-sm text-stone-800 placeholder:text-stone-400 " +
  "hover:border-stone-300";

export default function BookingModal({
  isOpen = false,
  onClose,
  title = "Plan Your Journey",
  subtitle = "Tell us where you dream of going.",
  submitLabel = "Send Inquiry",
  onSubmit,
}) {
  const [form, setForm] = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const change = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!form.phone.trim()) errs.phone = "Required";
    if (!form.place.trim()) errs.place = "Required";
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      onSubmit ? await onSubmit(form) : await submitForm(form);
      setSubmitted(true);
      setTimeout(() => { onClose?.(); setSubmitted(false); setForm(EMPTY); }, 2800);
    } catch (err) { setErrors({ submit: "Failed" }); }
    finally { setLoading(false); }
  };

  const Ornament = () => (
    <svg width="80" height="8" viewBox="0 0 120 12" fill="none" className="mx-auto opacity-40 mt-0.5">
      <line x1="0" y1="6" x2="45" y2="6" stroke={GOLD} strokeWidth="1" />
      <circle cx="60" cy="6" r="4" fill={GOLD} />
      <circle cx="60" cy="6" r="2" fill="white" />
      <line x1="75" y1="6" x2="120" y2="6" stroke={GOLD} strokeWidth="1" />
    </svg>
  );

  if (!isOpen) return null;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      
      <div 
        className="fixed inset-0 z-9999 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      >
        <div 
          className="w-full max-w-110 relative transition-transform duration-300 scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="bg-white flex flex-col w-full rounded-2xl relative overflow-hidden shadow-2xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {/* Design Elements Restored */}
            <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full blur-[60px] opacity-[0.08] pointer-events-none" style={{ background: GOLD }} />
            <div className="absolute bottom-1/4 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-[0.08] pointer-events-none" style={{ background: DARK }} />
            <div className="h-1 w-full shrink-0 z-10" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, ${DARK}, ${GOLD}, transparent)` }} />

            {/* Header - Optimized Padding */}
            <div className="px-5 pt-4 sm:pt-6 pb-2 text-center relative z-10" style={{ background: `linear-gradient(160deg, ${LIGHT} 0%, white 100%)` }}>
              <button onClick={onClose} className="absolute top-2 right-2 p-2 text-stone-400 hover:text-stone-800 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              <div className="inline-flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 rounded-lg mb-1 shadow-md" style={{ background: `linear-gradient(135deg, ${GOLD}, ${DARK})` }}>
                <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0022 5.5V3.935M12 15v6m0-6a9 9 0 110-18 9 9 0 010 18z" /></svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-800 leading-tight">{title}</h2>
              <Ornament />
              <p className="text-stone-500 text-[10px] sm:text-xs mt-0.5 font-sans">{subtitle}</p>
            </div>

            {/* Form Body - Tighter space-y */}
            <div className="px-5 sm:px-8 pb-5 sm:pb-7 pt-1 z-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-6 text-center gap-2">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-xl text-lg" style={{ background: `linear-gradient(135deg, ${GOLD}, ${DARK})` }}>✓</div>
                  <h3 className="text-lg font-bold text-stone-800">Inquiry Sent!</h3>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Full Name" icon="👤" error={errors.name}>
                      <input type="text" name="name" placeholder="Name" value={form.name} onChange={change} className={inputCls} />
                    </Field>
                    <Field label="Phone" icon="📞" error={errors.phone}>
                      <input type="tel" name="phone" placeholder="Phone" value={form.phone} onChange={change} className={inputCls} />
                    </Field>
                  </div>

                  <Field label="Email Address" icon="✉️">
                    <input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={change} className={inputCls} />
                  </Field>

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Destination" icon="📍" error={errors.place}>
                      <input type="text" name="place" placeholder="Where to?" value={form.place} onChange={change} className={inputCls} />
                    </Field>
                    <div className="grid grid-cols-2 gap-1.5">
                      <Field label="Date" icon="📅">
                        <input type="date" name="date" value={form.date} onChange={change} className={`${inputCls} text-[9px] px-1 sm:text-[10px]`} />
                      </Field>
                      <Field label="Guests" icon="👥">
                        <select name="passengers" value={form.passengers} onChange={change} className={`${inputCls} px-1 text-xs`}>
                          {PASSENGER_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </Field>
                    </div>
                  </div>

                  <Field label="Special Requests" icon="💬">
                    <textarea 
                        name="message" 
                        rows="1" 
                        placeholder="Tell us more..." 
                        value={form.message} 
                        onChange={change} 
                        className={`${inputCls} resize-none min-h-9 sm:min-h-12.5`} 
                    />
                  </Field>

                  <GradBtn type="submit" loading={loading} className="w-full py-3 rounded-xl text-white font-bold shadow-lg mt-0.5 uppercase tracking-wider text-xs sm:text-sm">
                    {submitLabel}
                  </GradBtn>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}