import { useState, useEffect } from "react";
import { submitEnquiry } from "../../services/form.service";

const GOLD = "#BFA13B";
const DARK = "#8e7421";
const LIGHT = "#fdf8ec";

const EMPTY = { name: "", email: "", phone: "", query: "" };

/* ─── UI Helpers ─── */
const GradBtn = ({ children, loading, ...p }) => (
  <button
    className="w-full py-3 rounded-xl text-white font-bold uppercase tracking-[0.15em] text-[10px] relative overflow-hidden transition-all active:scale-[0.97] shadow-[0_8px_20px_-6px_rgba(191,161,59,0.4)] mt-2 group disabled:opacity-80"
    style={{ background: `linear-gradient(135deg, ${GOLD} 0%, ${DARK} 100%)` }}
    disabled={loading}
    {...p}
  >
    {/* Shimmer Effect using Tailwind animation */}
    <div className="absolute inset-0 w-full h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" 
         style={{ animation: loading ? 'none' : '' }} />
    
    <span className="relative z-10 flex items-center justify-center gap-2">
      {loading ? (
        <div className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
      ) : (
        children
      )}
    </span>

    {/* Global Style fix for the shimmer keyframe if not in tailwind.config */}
    <style>{`
      @keyframes shimmer {
        100% { transform: translateX(250%) skewX(-12deg); }
      }
    `}</style>
  </button>
);

const Field = ({ label, icon, error, children }) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center justify-between px-1">
      <label className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-widest text-stone-400">
        <span className="opacity-60">{icon}</span> {label}
      </label>
      {error && <span className="text-[8px] text-red-500 font-bold animate-pulse">Required</span>}
    </div>
    {children}
  </div>
);

const inputCls =
  "w-full px-3 py-2 rounded-lg border border-stone-100 bg-stone-50/40 " +
  "focus:border-[#BFA13B] focus:ring-0 focus:bg-white " +
  "outline-none transition-all duration-300 text-[12px] text-stone-800 placeholder:text-stone-300 " +
  "shadow-inner shadow-black/[0.01]";

export default function BookingModal({
  isOpen,
  onClose,
  title = "Private Inquiry",
  subtitle = "Refined bespoke service",
  submitLabel = "Send Request",
}) {
  const [form, setForm] = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  const change = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = true;
    if (!form.email.trim()) errs.email = true;
    if (!form.phone.trim()) errs.phone = true;

    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await submitEnquiry(form);
      setSubmitted(true);
      setTimeout(() => { onClose(); setSubmitted(false); setForm(EMPTY); }, 2500);
    } catch (err) { setErrors({ submit: "Error" }); }
    finally { setLoading(false); }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-md animate-in fade-in duration-500">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
      
      <div 
        className="w-full max-w-90 bg-white rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-white/20"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Artistic Accent */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#BFA13B]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Icon */}
        <button onClick={onClose} className="absolute top-5 right-6 z-50 text-stone-300 hover:text-stone-800 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="flex flex-col">
          {/* Header */}
          <div className="px-8 pt-7 pb-3 text-center">
            <h2 className="text-2xl font-bold text-stone-800 tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{title}</h2>
            <div className="h-px w-8 bg-[#BFA13B] mx-auto my-2 opacity-50" />
            <p className="text-stone-400 text-[9px] tracking-[0.2em] uppercase">{subtitle}</p>
          </div>

          <div className="px-7 pb-8 pt-1">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4 animate-in zoom-in duration-500">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl" style={{ background: `linear-gradient(135deg, ${GOLD}, ${DARK})` }}>✓</div>
                <div className="text-stone-800 font-bold text-sm tracking-widest uppercase">Confirmed</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <Field label="Full Name" icon="✧" error={errors.name}>
                  <input type="text" name="name" placeholder="E.g. Alexander Knight" value={form.name} onChange={change} className={inputCls} />
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Email" icon="✧" error={errors.email}>
                    <input type="email" name="email" placeholder="Email" value={form.email} onChange={change} className={inputCls} />
                  </Field>
                  <Field label="Phone" icon="✧" error={errors.phone}>
                    <input type="tel" name="phone" placeholder="Phone" value={form.phone} onChange={change} className={inputCls} />
                  </Field>
                </div>

                <Field label="Requirements" icon="✧">
                  <textarea 
                    name="query" 
                    rows="1" 
                    placeholder="Tell us more..." 
                    value={form.query} 
                    onChange={change} 
                    className={`${inputCls} resize-none min-h-11.25`} 
                  />
                </Field>

                <GradBtn type="submit" loading={loading}>
                  {submitLabel}
                </GradBtn>

                <div className="flex items-center justify-center gap-2 mt-4 opacity-40">
                   <div className="h-px w-4 bg-stone-400" />
                   <p className="text-[8px] text-stone-500 font-bold uppercase tracking-[0.2em]">Secure Request</p>
                   <div className="h-px w-4 bg-stone-400" />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}