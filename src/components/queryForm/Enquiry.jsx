import { useState } from "react";
import { submitEnquiry } from "../../services/form.service"; 

const GOLD = "#BFA13B";
const DARK = "#8e7421";
const LIGHT = "#fdf8ec";

const EMPTY = { name: "", email: "", phone: "", query: "" };

/* ─── UI Helpers ─── */
const GradBtn = ({ children, loading, ...p }) => (
  <button
    className="w-full py-3.5 sm:py-4 rounded-xl text-white font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[11px] sm:text-sm relative overflow-hidden group disabled:opacity-70 transition-all active:scale-[0.98] shadow-lg hover:shadow-xl mt-2 sm:mt-4"
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
  <div className="flex flex-col gap-1">
    {label && (
      <label className="flex items-center gap-1.5 text-[9px] sm:text-[11px] font-bold uppercase tracking-widest text-stone-400 ml-0.5">
        <span className="text-stone-500 opacity-70 text-[10px] sm:text-[12px]">{icon}</span>
        {label}
      </label>
    )}
    {children}
    {error && <p className="text-[10px] text-red-500 ml-1 font-sans font-medium">{error}</p>}
  </div>
);

const inputCls =
  "w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-stone-200 bg-white/70 " +
  "focus:border-[#BFA13B] focus:ring-4 focus:ring-[#BFA13B]/10 focus:bg-white " +
  "outline-none transition-all duration-300 text-[13px] sm:text-sm text-stone-800 placeholder:text-stone-300 " +
  "hover:border-stone-300 font-sans";

export default function EnquiryForm({
  title = "Send an Enquiry",
  subtitle = "Our concierge team is ready to assist you.",
  submitLabel = "Submit Message",
}) {
  const [form, setForm] = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const change = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!form.email.trim()) errs.email = "Required";
    if (!form.phone.trim()) errs.phone = "Required";
    if (!form.query.trim()) errs.query = "Required";

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      await submitEnquiry(form);
      setSubmitted(true);
      setForm(EMPTY);
      // Success auto-dismiss after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      // Handles custom error messages from backend
      setErrors({ submit: err.error || err.message || "Submission failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  const Ornament = () => (
    <svg width="80" height="8" viewBox="0 0 120 12" fill="none" className="mx-auto opacity-30 mt-1 sm:w-25 sm:h-2.5">
      <line x1="0" y1="6" x2="45" y2="6" stroke={GOLD} strokeWidth="1" />
      <circle cx="60" cy="6" r="4" fill={GOLD} />
      <circle cx="60" cy="6" r="2" fill="white" />
      <line x1="75" y1="6" x2="120" y2="6" stroke={GOLD} strokeWidth="1" />
    </svg>
  );

  return (
    <section className="w-full max-w-2xl mx-auto py-6 px-3 sm:py-10 sm:px-4">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />

      <div
        className="bg-white flex flex-col w-full rounded-3xl sm:rounded-[2.5rem] relative overflow-hidden shadow-2xl border border-stone-100"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-[#BFA13B] opacity-[0.05] rounded-full blur-3xl -mr-24 -mt-24 sm:-mr-32 sm:-mt-32" />
        <div className="h-1.5 sm:h-2 w-full z-10" style={{ background: `linear-gradient(to right, ${GOLD}, ${DARK}, ${GOLD})` }} />

        {/* Header */}
        <div className="px-4 pt-8 pb-4 sm:px-6 sm:pt-12 sm:pb-6 text-center relative z-10" style={{ background: `linear-gradient(160deg, ${LIGHT} 0%, white 100%)` }}>
          <h2 className="text-2xl sm:text-4xl font-bold text-stone-800 tracking-tight leading-tight">{title}</h2>
          <Ornament />
          <p className="text-stone-500 text-[11px] sm:text-sm mt-3 font-sans max-w-60 sm:max-w-sm mx-auto">{subtitle}</p>
        </div>

        {/* Form Body */}
        <div className="px-5 pb-8 pt-4 sm:px-14 sm:pb-14 sm:pt-6 z-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white shadow-xl text-3xl sm:text-4xl mb-4 sm:mb-6" style={{ background: `linear-gradient(135deg, ${GOLD}, ${DARK})` }}>
                ✓
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-stone-800 italic">Thank You</h3>
              <p className="text-stone-500 text-sm mt-2">Your enquiry was sent. We will review it shortly.</p>
              <button onClick={() => setSubmitted(false)} className="mt-6 text-xs uppercase tracking-widest text-[#BFA13B] font-bold border-b border-[#BFA13B]">Send Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              
              <Field label="Your Name" icon="👤" error={errors.name}>
                <input type="text" name="name" placeholder="Full name" value={form.name} onChange={change} className={inputCls} />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <Field label="Email" icon="✉️" error={errors.email}>
                  <input type="email" name="email" placeholder="Email" value={form.email} onChange={change} className={inputCls} />
                </Field>
                <Field label="Phone" icon="📞" error={errors.phone}>
                  <input type="tel" name="phone" placeholder="Phone number" value={form.phone} onChange={change} className={inputCls} />
                </Field>
              </div>

              <Field label="Message" icon="💬" error={errors.query}>
                <textarea 
                  name="query" 
                  rows="4" 
                  placeholder="How can we help?" 
                  value={form.query} 
                  onChange={change} 
                  className={`${inputCls} resize-none min-h-25`} 
                />
              </Field>

              {errors.submit && <p className="text-center text-red-500 text-xs font-bold animate-pulse">{errors.submit}</p>}

              <GradBtn type="submit" loading={loading}>
                {submitLabel}
              </GradBtn>
              
            </form>
          )}
        </div>
      </div>
    </section>
  );
}