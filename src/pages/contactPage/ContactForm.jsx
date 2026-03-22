import { useState } from "react";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const packages = [
  "Divine Char Dham Yatra",
  "Adventure Seeker Trek",
  "Hill Station Retreat",
  "Rishikesh Yoga Retreat",
  "Kedarnath Yatra Special",
  "Valley of Flowers Trek",
  "Custom Package",
];

const inputClass =
  "w-full bg-[#F5F3EF] rounded-md px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 placeholder:text-gray-400";
const focusStyle = { focusRingColor: GOLD };

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
        className="bg-white rounded-xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[400px]"
        style={{ border: "0.5px solid #E5E0D5" }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-4 text-2xl"
          style={{ background: GOLD }}
        >
          <span className="text-white font-bold">✓</span>
        </div>
        <h3
          className="text-xl font-semibold mb-2"
          style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
        >
          Message Sent!
        </h3>
        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
          Thank you for reaching out. Our team will call you within 2 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm font-medium px-6 py-2.5 rounded text-white transition-opacity hover:opacity-90"
          style={{ background: GOLD }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-xl p-6 md:p-8"
      style={{ border: "0.5px solid #E5E0D5" }}
    >
      <span
        className="text-xs tracking-[3px] uppercase font-medium block mb-2"
        style={{ color: GOLD }}
      >
        Send a Message
      </span>
      <h2
        className="text-lg font-semibold mb-6"
        style={{ color: NAVY, fontFamily: "sans-serif" }}
      >
        We Reply Within{" "}
        <span style={{ color: GOLD }}>2 Hours</span>
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-400 block mb-1">
              Full Name *
            </label>
            <input
              name="name"
              required
              value={form.name}
              onChange={handle}
              placeholder="Rahul Sharma"
              className={inputClass}
              style={{ border: "0.5px solid #E5E0D5" }}
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">
              Phone Number *
            </label>
            <input
              name="phone"
              required
              value={form.phone}
              onChange={handle}
              placeholder="+91 98765 43210"
              className={inputClass}
              style={{ border: "0.5px solid #E5E0D5" }}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-xs text-gray-400 block mb-1">
            Email Address *
          </label>
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handle}
            placeholder="rahul@example.com"
            className={inputClass}
            style={{ border: "0.5px solid #E5E0D5" }}
          />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-400 block mb-1">
              Select Package
            </label>
            <select
              name="package"
              value={form.package}
              onChange={handle}
              className={inputClass}
              style={{ border: "0.5px solid #E5E0D5" }}
            >
              <option value="">Choose a package</option>
              {packages.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">
              Travel Date
            </label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handle}
              className={inputClass}
              style={{ border: "0.5px solid #E5E0D5" }}
            />
          </div>
        </div>

        {/* Travelers */}
        <div>
          <label className="text-xs text-gray-400 block mb-1">
            Number of Travelers
          </label>
          <input
            name="travelers"
            value={form.travelers}
            onChange={handle}
            placeholder="e.g. 2 Adults, 1 Child"
            className={inputClass}
            style={{ border: "0.5px solid #E5E0D5" }}
          />
        </div>

        {/* Message */}
        <div>
          <label className="text-xs text-gray-400 block mb-1">
            Your Message
          </label>
          <textarea
            name="message"
            rows={4}
            value={form.message}
            onChange={handle}
            placeholder="Tell us about your dream trip..."
            className={inputClass}
            style={{ border: "0.5px solid #E5E0D5", resize: "none" }}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 text-sm font-medium rounded text-white transition-opacity hover:opacity-90"
          style={{ background: GOLD }}
        >
          Send Message →
        </button>

        <p className="text-[10px] text-gray-400 text-center">
          We respect your privacy. No spam, ever.
        </p>
      </form>
    </div>
  );
}