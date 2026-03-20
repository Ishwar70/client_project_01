import { useState, useEffect } from "react";

const brandGold = "#BFA13B";

/**
 * BookingModal — Reusable booking form modal
 *
 * Props:
 * @param {boolean}  isOpen        - Modal open/close state (controlled from parent)
 * @param {function} onClose       - Callback to close the modal
 * @param {string}   title         - Modal heading (default: "Plan Your Journey")
 * @param {string}   subtitle      - Subtitle below heading (default: "Fill in the details to get a custom quote.")
 * @param {string}   submitLabel   - Submit button text (default: "Send Inquiry")
 * @param {function} onSubmit      - Optional custom submit handler; receives formData object.
 *                                   If not provided, shows default alert.
 *
 * Usage examples:
 *
 * // Basic (default labels)
 * <BookingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
 *
 * // Custom title & subtitle (won't affect other instances)
 * <BookingModal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Book a Char Dham Package"
 *   subtitle="Our expert will call you within 24 hours."
 *   submitLabel="Request Callback"
 *   onSubmit={(data) => console.log(data)}
 * />
 */
export default function BookingModal({
  isOpen,
  onClose,
  title = "Plan Your Journey",
  subtitle = "Fill in the details to get a custom quote.",
  submitLabel = "Send Inquiry",
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    place: "",
    date: "",
    message: "",
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: "", email: "", phone: "", place: "", date: "", message: "" });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log("Booking Submitted:", formData);
      alert("Thank you! Our travel expert will contact you soon.");
    }
    onClose();
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* BOOKING MODAL — mobile-first, then desktop */}
      <div
        className="fixed inset-0 z-100 flex items-end sm:items-center justify-center"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/*
          Mobile:  slides up from bottom, full width, rounded top corners,
                   max-height 92vh — scrollable content inside.
          Desktop: centered card, max-w-lg, fully rounded.
        */}
        <div className="
          relative bg-white w-full shadow-2xl overflow-hidden
          rounded-t-3xl sm:rounded-3xl
          max-h-[92vh] sm:max-w-lg
          flex flex-col
        ">
          {/* Drag handle — mobile only */}
          <div className="flex justify-center pt-3 pb-1 sm:hidden">
            <div className="w-10 h-1 rounded-full bg-stone-200" />
          </div>

          {/* Scrollable form area */}
          <div className="overflow-y-auto flex-1 px-5 sm:px-8 pt-4 sm:pt-8 pb-6 sm:pb-8">
            <div className="flex justify-between items-start mb-5">
              <div>
                <h2
                  className="text-xl sm:text-2xl font-bold text-stone-800"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {title}
                </h2>
                <p className="text-stone-500 text-sm mt-1">{subtitle}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-400 shrink-0 ml-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#BFA13B] focus:ring-2 focus:ring-[#BFA13B]/20 outline-none transition-all text-sm"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#BFA13B] focus:ring-2 focus:ring-[#BFA13B]/20 outline-none transition-all text-sm"
                />
              </div>

              {/* Phone + Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#BFA13B] focus:ring-2 focus:ring-[#BFA13B]/20 outline-none transition-all text-sm"
                />
                <input
                  type="text"
                  name="place"
                  placeholder="Destination (e.g. Kedarnath)"
                  required
                  value={formData.place}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#BFA13B] focus:ring-2 focus:ring-[#BFA13B]/20 outline-none transition-all text-sm"
                />
              </div>

              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#BFA13B] focus:ring-2 focus:ring-[#BFA13B]/20 outline-none transition-all text-sm text-stone-500"
              />

              <textarea
                name="message"
                placeholder="Special requirements or questions..."
                rows="3"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#BFA13B] focus:ring-2 focus:ring-[#BFA13B]/20 outline-none transition-all text-sm resize-none"
              />

              <button
                type="submit"
                className="w-full py-4 mt-1 rounded-xl text-white font-bold shadow-lg hover:shadow-[#BFA13B]/30 hover:-translate-y-0.5 transition-all duration-300"
                style={{ background: `linear-gradient(to right, ${brandGold}, #8e7421)` }}
              >
                {submitLabel}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}