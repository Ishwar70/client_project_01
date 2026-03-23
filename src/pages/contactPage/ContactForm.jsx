import { useState } from "react";

const GOLD = "#C9A84C";
const TEXT_DARK = "#1A1A1A";
const OFF_WHITE = "#FAFAF7";

const packages = [
  "Divine Char Dham Yatra",
  "Adventure Seeker Trek",
  "Hill Station Retreat",
  "Rishikesh Yoga Retreat",
  "Kedarnath Yatra Special",
  "Valley of Flowers Trek",
  "Custom Package",
];

// Refined Input Styling
const inputClass = 
  "w-full bg-white border border-gray-100 rounded-xl px-4 py-3.5 text-sm text-gray-700 outline-none transition-all duration-300 focus:border-[#C9A84C] focus:shadow-[0_0_15px_rgba(201,168,76,0.1)] placeholder:text-gray-300 shadow-sm";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    package: "",
    date: "",
    travelers: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handle = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="bg-white rounded-[2rem] p-10 flex flex-col items-center justify-center text-center h-full min-h-[500px] shadow-2xl border border-gray-50"
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6 text-3xl shadow-xl animate-bounce"
          style={{ background: `linear-gradient(135deg, ${GOLD}, #E5D296)` }}
        >
          <span className="text-white font-bold">✓</span>
        </div>
        <h3
          className="text-3xl font-bold mb-3"
          style={{ color: TEXT_DARK, fontFamily: "'Georgia', serif" }}
        >
          Success!
        </h3>
        <p className="text-sm text-gray-400 mb-8 max-w-xs mx-auto leading-relaxed">
          Your request is being processed. Our luxury travel concierge will contact you within <span className="font-bold" style={{ color: GOLD }}>2 hours</span>.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs font-bold tracking-[2px] uppercase px-8 py-4 rounded-full text-white transition-all hover:scale-105 active:scale-95"
          style={{ background: TEXT_DARK }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] border border-gray-50 relative overflow-hidden"
    >
      {/* Subtle Gold Corner Accent */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-5 pointer-events-none" 
           style={{ borderTop: `8px solid ${GOLD}`, borderRight: `8px solid ${GOLD}`, borderRadius: '0 2rem 0 0' }}></div>

      <div className="relative z-10">
        <span
          className="text-[10px] tracking-[4px] uppercase font-black block mb-3"
          style={{ color: GOLD }}
        >
          Reservations
        </span>
        <h2
          className="text-3xl font-semibold mb-8"
          style={{ color: TEXT_DARK, fontFamily: "'Georgia', serif" }}
        >
          Book Your <span className="italic font-light" style={{ color: GOLD }}>Escape</span>
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2 ml-1">
                Full Name
              </label>
              <input
                name="name"
                required
                value={form.name}
                onChange={handle}
                placeholder="Ex. Rahul Sharma"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2 ml-1">
                Phone Number
              </label>
              <input
                name="phone"
                required
                value={form.phone}
                onChange={handle}
                placeholder="+91"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2 ml-1">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handle}
              placeholder="rahul@example.com"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2 ml-1">
                Choose Journey
              </label>
              <select
                name="package"
                value={form.package}
                onChange={handle}
                className={`${inputClass} appearance-none cursor-pointer`}
              >
                <option value="">Select Package</option>
                {packages.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2 ml-1">
                Departure Date
              </label>
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handle}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2 ml-1">
              Group Size
            </label>
            <input
              name="travelers"
              value={form.travelers}
              onChange={handle}
              placeholder="e.g. 2 Adults, 1 Child"
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2 ml-1">
              Special Requests
            </label>
            <textarea
              name="message"
              rows={3}
              value={form.message}
              onChange={handle}
              placeholder="Share any specific preferences..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="group relative w-full py-4 rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
            style={{ background: GOLD }}
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <span className="relative z-10 text-white text-[11px] font-bold uppercase tracking-[3px]">
              Request Itinerary →
            </span>
          </button>

          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD }}></div>
            <p className="text-[9px] text-gray-400 uppercase tracking-widest">
              Instant Confirmation & Best Price Guaranteed
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}