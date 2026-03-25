import { useState } from "react";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";

const GOLD = "#C9A84C";
const packages = [
  "Divine Char Dham Yatra", "Adventure Seeker Trek", "Hill Station Retreat",
  "Rishikesh Yoga", "Kedarnath Special", "Custom Package",
];

// Refined Glassmorphism Input Styling
const inputClass = 
  "w-full bg-black/[0.03] border-b border-black/10 px-0 py-3 text-sm text-black outline-none transition-all duration-500 focus:border-[#C9A84C] focus:bg-transparent placeholder:text-black/20";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", package: "", date: "", travelers: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handle = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  if (submitted) {
    return (
      <div className="bg-white rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center min-h-[450px] shadow-2xl animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mb-6">
          <CheckCircle size={32} color={GOLD} className="animate-bounce" />
        </div>
        <h3 className="text-2xl font-light mb-2 text-black" style={{ fontFamily: "'Georgia', serif" }}>
          Request <span className="italic">Received</span>
        </h3>
        <p className="text-[11px] uppercase tracking-[2px] text-black/40 mb-8 max-w-[200px]">
          Our concierge will contact you within 2 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-[10px] font-bold tracking-[3px] uppercase px-10 py-4 rounded-full border border-black/10 hover:bg-black hover:text-white transition-all"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-black/[0.02] relative overflow-hidden">
      
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={14} color={GOLD} />
        <span className="text-[9px] tracking-[0.4em] uppercase font-bold text-[#C9A84C]">
          Private Concierge
        </span>
      </div>

      <h2 className="text-3xl md:text-5xl font-light mb-8 text-black" style={{ fontFamily: "'Georgia', serif" }}>
        Book Your <span className="italic text-[#C9A84C]">Experience</span>
      </h2>

      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
        
        {/* Row 1: Mobile Stacked, Desktop Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="group">
            <label className="text-[9px] font-black uppercase tracking-widest text-black/30 group-focus-within:text-[#C9A84C] transition-colors">
              Full Name
            </label>
            <input name="name" required value={form.name} onChange={handle} placeholder="John Doe" className={inputClass} />
          </div>
          <div className="group">
            <label className="text-[9px] font-black uppercase tracking-widest text-black/30 group-focus-within:text-[#C9A84C] transition-colors">
              Phone
            </label>
            <input name="phone" required value={form.phone} onChange={handle} placeholder="+91" className={inputClass} />
          </div>
        </div>

        {/* Row 2: Always Full */}
        <div className="group">
          <label className="text-[9px] font-black uppercase tracking-widest text-black/30 group-focus-within:text-[#C9A84C] transition-colors">
            Email
          </label>
          <input name="email" type="email" required value={form.email} onChange={handle} placeholder="hello@luxury.com" className={inputClass} />
        </div>

        {/* Row 3: Mobile Stacked */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="group">
            <label className="text-[9px] font-black uppercase tracking-widest text-black/30 group-focus-within:text-[#C9A84C] transition-colors">
              Journey
            </label>
            <select name="package" value={form.package} onChange={handle} className={inputClass + " cursor-pointer"}>
              <option value="">Select Package</option>
              {packages.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="group">
            <label className="text-[9px] font-black uppercase tracking-widest text-black/30 group-focus-within:text-[#C9A84C] transition-colors">
              Date
            </label>
            <input name="date" type="date" value={form.date} onChange={handle} className={inputClass} />
          </div>
        </div>

        <div className="group">
          <label className="text-[9px] font-black uppercase tracking-widest text-black/30 group-focus-within:text-[#C9A84C] transition-colors">
            Special Requests
          </label>
          <input name="message" value={form.message} onChange={handle} placeholder="Any specific dietary or travel needs?" className={inputClass} />
        </div>

        {/* The Action Button */}
        <button
          type="submit"
          className="group relative w-full py-5 bg-[#1A1A1A] rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 mt-4"
        >
          <div className="absolute inset-0 bg-[#C9A84C] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          <span className="relative z-10 text-white text-[11px] font-bold uppercase tracking-[0.4em] flex items-center justify-center gap-3">
            Request Itinerary <ArrowRight size={14} />
          </span>
        </button>

        <p className="text-center text-[8px] text-black/20 uppercase tracking-[0.3em] mt-4">
          Verified Private Collection & Best Price Guaranteed
        </p>
      </form>
    </div>
  );
}