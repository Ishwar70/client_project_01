import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "about" },
  { label: "Services", href: "services" },
  { label: "Destination", href: "destination" },
  { label: "Packages", href: "packages" },
  { label: "Blog", href: "blog" },
  { label: "Contact", href: "contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    place: "",
    date: "",
    message: "",
  });

  const brandGold = "#BFA13B";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Submitted:", formData);
    setIsModalOpen(false);
    alert("Thank you! Our travel expert will contact you soon.");
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.05)]"
          : "bg-white/80 backdrop-blur-sm"
          }`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div
          className="h-0.5 w-full opacity-80"
          style={{ background: `linear-gradient(to right, #e2d194, ${brandGold}, #8e7421)` }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* LOGO */}
            <a
              href="/"
              className="flex items-center shrink-0"
              onClick={() => setActive("Home")}
            >
              <img
                src="/Logo.svg"
                alt="Logo"
                className="h-20 sm:h-20 md:h-18 lg:h-22 w-auto object-contain"
              />
            </a>

            {/* DESKTOP LINKS */}
            <ul className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={() => setActive(label)}
                    className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group"
                    style={{ color: active === label ? brandGold : "#57534e" }}
                  >
                    <span className="absolute inset-0 rounded-lg bg-stone-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="relative">{label}</span>
                    {active === label && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ backgroundColor: brandGold }} />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            {/* DESKTOP CTA */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group"
                style={{ background: `linear-gradient(to right, ${brandGold}, #8e7421)` }}
              >
                <span className="relative z-10">Book Now</span>
                <svg className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* MOBILE HAMBURGER */}
            <button
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-stone-100 transition-colors"
              onClick={() => setIsOpen((p) => !p)}
            >
              <span className={`block w-5 h-0.5 bg-stone-700 rounded-full transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-stone-700 rounded-full transition-all ${isOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-stone-700 rounded-full transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`lg:hidden overflow-hidden transition-all duration-400 ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="bg-white border-t border-stone-100 px-4 pt-3 pb-6">
            <ul className="space-y-1 mb-6">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={() => { setActive(label); setIsOpen(false); }}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium"
                    style={{ color: active === label ? brandGold : "#444" }}
                  >
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <button
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-white text-base font-semibold"
              style={{ background: `linear-gradient(to right, ${brandGold}, #8e7421)` }}
              onClick={() => { setIsModalOpen(true); setIsOpen(false); }}
            >
              Book Your Trip
            </button>
          </div>
        </div>
      </nav>

      {/* BOOKING MODAL — mobile-optimized */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-end sm:items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          {/* 
            Mobile:  slides up from bottom, full width, rounded top corners, 
                     max-height 92vh so it never covers the full screen,
                     scrollable content inside.
            Desktop: centered card, max-w-lg, fully rounded. 
          */}
          <div className="
            relative bg-white w-full shadow-2xl overflow-hidden
            rounded-t-3xl sm:rounded-3xl
            max-h-[92vh] sm:max-w-lg
            flex flex-col
          ">
            {/* Drag handle — visible on mobile only */}
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
                    Plan Your Journey
                  </h2>
                  <p className="text-stone-500 text-sm mt-1">Fill in the details to get a custom quote.</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-400 shrink-0 ml-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Name + Email — side by side on sm+, stacked on mobile */}
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
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="h-16 md:h-20" />
    </>
  );
}