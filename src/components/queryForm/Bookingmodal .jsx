import { useState, useEffect, } from "react";
import { submitForm } from "../../services/form.service";

const GOLD = "#BFA13B";
const DARK = "#8e7421";
const LIGHT = "#fdf8ec";

const EMPTY = { name: "", email: "", phone: "", place: "", date: "", passengers: "1", message: "" };
const PASSENGER_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

/* ─── tiny helpers (Original UI) ─── */
const GradBtn = ({ children, className = "", loading, ...p }) => (
  <button
    className={`relative overflow-hidden group disabled:opacity-70 ${className}`}
    style={{ background: `linear-gradient(135deg, ${GOLD} 0%, ${DARK} 100%)` }}
    disabled={loading}
    {...p}
  >
    <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
    <span className="relative z-10 flex items-center justify-center gap-2">
      {loading ? (
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : children}
    </span>
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
  "w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-white/70 " +
  "focus:border-[#BFA13B] focus:ring-2 focus:ring-[#BFA13B]/20 focus:bg-white " +
  "outline-none transition-all duration-200 text-sm text-stone-800 placeholder:text-stone-400 " +
  "hover:border-stone-300";

export default function BookingModal({
  inline = false,
  isOpen = false,
  onClose,
  embedded = false,
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
    if (inline || embedded) return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [inline, embedded, isOpen]);

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
      if (!inline && !embedded) setTimeout(() => onClose?.(), 2800);
    } catch (err) { setErrors({ submit: "Submission failed." }); }
    finally { setLoading(false); }
  };

  const Ornament = () => (
    <svg width="120" height="12" viewBox="0 0 120 12" fill="none" className="mx-auto opacity-40">
      <line x1="0" y1="6" x2="45" y2="6" stroke={GOLD} strokeWidth="1" />
      <circle cx="60" cy="6" r="4" fill={GOLD} />
      <circle cx="60" cy="6" r="2" fill="white" />
      <line x1="75" y1="6" x2="120" y2="6" stroke={GOLD} strokeWidth="1" />
    </svg>
  );

  const formBody = (
    <div
      className="bg-white flex flex-col w-full rounded-2xl relative overflow-hidden"
      style={{
        boxShadow: "0 32px 80px -12px rgba(0,0,0,0.26), 0 0 0 1px rgba(191,161,59,0.1)",
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >
      {/* SIDEWISE RADIUS CIRCLES */}
      <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full blur-[60px] opacity-[0.08] pointer-events-none" style={{ background: GOLD }} />
      <div className="absolute bottom-1/4 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-[0.08] pointer-events-none" style={{ background: DARK }} />

      <div className="h-0.75 w-full shrink-0 rounded-t-2xl z-10" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, ${DARK}, ${GOLD}, transparent)` }} />

      <div className="px-6 pt-6 pb-4 text-center relative overflow-hidden z-10" style={{ background: `linear-gradient(160deg, ${LIGHT} 0%, white 100%)` }}>
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl mb-2 shadow-md" style={{ background: `linear-gradient(135deg, ${GOLD}, ${DARK})` }}>
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0022 5.5V3.935M12 15v6m0-6a9 9 0 110-18 9 9 0 010 18z" /></svg>
        </div>
        <h2 className="text-2xl font-bold text-stone-800 leading-tight">{title}</h2>
        <Ornament />
        <p className="text-stone-400 text-[12px] mt-1 font-sans">{subtitle}</p>
        {!inline && (
          <button onClick={() => onClose?.()} className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
        )}
      </div>

      <div className="px-6 pb-8 pt-2 z-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl" style={{ background: `linear-gradient(135deg, ${GOLD}, ${DARK})` }}>✓</div>
            <h3 className="text-xl font-bold text-stone-800">Inquiry Sent!</h3>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Full Name" icon="👤" error={errors.name}>
                <input type="text" name="name" placeholder="Name" value={form.name} onChange={change} className={inputCls} />
              </Field>
              <Field label="Phone Number" icon="📞" error={errors.phone}>
                <input type="tel" name="phone" placeholder="Phone" value={form.phone} onChange={change} className={inputCls} />
              </Field>
            </div>
            <Field label="Email Address" icon="✉️" error={errors.email}>
              <input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={change} className={inputCls} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Destination" icon="📍" error={errors.place}>
                <input type="text" name="place" placeholder="Where to?" value={form.place} onChange={change} className={inputCls} />
              </Field>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Date" icon="📅">
                  <input type="date" name="date" value={form.date} onChange={change} className={inputCls + " text-[11px] px-1"} />
                </Field>
                <Field label="Guests" icon="👥">
                  <select name="passengers" value={form.passengers} onChange={change} className={inputCls + " px-1"}>
                    {PASSENGER_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Field>
              </div>
            </div>
            <Field label="Special Requests (optional)" icon="💬">
              <textarea name="message" rows="1" placeholder="Requests..." value={form.message} onChange={change} className={inputCls + " resize-none"} />
            </Field>
            <GradBtn type="submit" loading={loading} className="w-full py-3.5 rounded-xl text-white font-semibold shadow-lg">
              {submitLabel}
            </GradBtn>
          </form>
        )}
      </div>
    </div>
  );

  if (!isOpen && !inline && !embedded) return null;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <div 
        className="fixed inset-0 z-999 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
      >
        <div className="w-full max-w-120 animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
          {formBody}
        </div>
      </div>
    </>
  );
}