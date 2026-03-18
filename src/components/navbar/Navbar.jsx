import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Destination", href: "#destination" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");

  // Custom Brand Color from image: #BFA13B
  const brandGold = "#BFA13B"; 

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (!e.target.closest("#navbar")) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.05)]"
            : "bg-white/80 backdrop-blur-sm"
        }`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Top accent line */}
        <div 
          className="h-0.5 w-full opacity-80" 
          style={{ background: `linear-gradient(to right, #e2d194, ${brandGold}, #8e7421)` }} 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* ── LOGO ── */}
            <a
              href="#home"
              className="flex items-center gap-2.5 group shrink-0"
              onClick={() => setActive("Home")}
            >
              <div 
                className="relative w-9 h-9 rounded-xl flex items-center justify-center shadow-lg transition-shadow duration-300"
                style={{ background: `linear-gradient(135deg, ${brandGold}, #8e7421)` }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor" opacity="0.9" />
                  <circle cx="12" cy="9" r="2.5" fill="white" />
                </svg>
              </div>

              <div className="flex flex-col leading-none">
                <span
                  className="text-xl font-bold tracking-tight"
                  style={{ 
                    fontFamily: "'Playfair Display', serif",
                    color: brandGold 
                  }}
                >
                  Uttarakhand <span className="text-stone-800">Tours</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-medium">
                  Premium Travel Experience
                </span>
              </div>
            </a>

            {/* ── DESKTOP LINKS ── */}
            <ul className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={() => setActive(label)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group`}
                    style={{ color: active === label ? brandGold : "#57534e" }} // Using stone-600 hex
                  >
                    <span className="absolute inset-0 rounded-lg bg-stone-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="relative">{label}</span>
                    {active === label && (
                      <span 
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" 
                        style={{ backgroundColor: brandGold }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            {/* ── DESKTOP CTA ── */}
            <div className="hidden lg:flex items-center">
              <a
                href="#contact"
                className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group"
                style={{ background: `linear-gradient(to right, ${brandGold}, #8e7421)` }}
              >
                <span className="relative z-10">Book Now</span>
                <svg className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* ── MOBILE HAMBURGER ── */}
            <button
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-stone-100 transition-colors focus:outline-none"
              onClick={() => setIsOpen((p) => !p)}
            >
              <span className={`block w-5 h-0.5 bg-stone-700 rounded-full transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-stone-700 rounded-full transition-all ${isOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-stone-700 rounded-full transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        <div className={`lg:hidden overflow-hidden transition-all duration-400 ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="bg-white border-t border-stone-100 px-4 pt-3 pb-6">
            <ul className="space-y-1 mb-6">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={() => { setActive(label); setIsOpen(false); }}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium ${
                      active === label ? "bg-stone-50" : "text-stone-700"
                    }`}
                    style={{ color: active === label ? brandGold : "" }}
                  >
                    <span>{label}</span>
                    {active === label && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: brandGold }} />}
                  </a>
                </li>
              ))}
            </ul>
            {/* Full-width mobile CTA */}
            <div className="pt-3 border-t border-stone-100">
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-white text-base font-semibold shadow-md active:scale-[0.98] transition-all"
                style={{ background: `linear-gradient(to right, ${brandGold}, #8e7421)` }}
                onClick={() => setIsOpen(false)}
              >
                Book Your Trip
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-16 md:h-20" />
    </>
  );
}