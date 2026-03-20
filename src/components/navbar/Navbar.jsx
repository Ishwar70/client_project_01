import { useState, useEffect } from "react";
import BookingModal from "../queryForm/Bookingmodal "; // adjust path as needed

const NAV_LINKS = [
  { label: "Home",        href: "/"            },
  { label: "About",       href: "about"        },
  { label: "Services",    href: "services"     },
  { label: "Destination", href: "destinations" },
  { label: "Packages",    href: "packages"     },
  { label: "Blog",        href: "blog"         },
  { label: "Contact",     href: "contact"      },
];

const BRAND_GOLD = "#BFA13B";
const BRAND_DARK = "#8e7421";

export default function Navbar() {
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  const openModal  = () => { setModalOpen(true);  setMenuOpen(false); };
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* ── Navbar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/96 backdrop-blur-md shadow-[0_2px_24px_rgba(0,0,0,0.07)]"
            : "bg-white/85 backdrop-blur-sm"
        }`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div
          className="h-0.75 w-full"
          style={{ background: `linear-gradient(to right, transparent, ${BRAND_GOLD}, ${BRAND_DARK}, ${BRAND_GOLD}, transparent)` }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* Logo */}
            <a href="/" className="flex items-center shrink-0 group" onClick={() => setActive("Home")}>
              <img
                src="/Logo.svg"
                alt="Logo"
                className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-opacity duration-200 group-hover:opacity-85"
              />
            </a>

            {/* Desktop links */}
            <ul className="hidden lg:flex items-center gap-0.5" role="list">
              {NAV_LINKS.map(({ label, href }) => {
                const isActive = active === label;
                return (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={() => setActive(label)}
                      className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group flex items-center gap-1"
                      style={{ color: isActive ? BRAND_GOLD : "#57534e" }}
                    >
                      <span className="absolute inset-0 rounded-lg bg-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      <span className="relative">{label}</span>
                      {isActive && (
                        <span className="relative w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: BRAND_GOLD }} />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={openModal}
                className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold shadow-md hover:shadow-[0_4px_20px_rgba(191,161,59,0.4)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 overflow-hidden group"
                style={{ background: `linear-gradient(135deg, ${BRAND_GOLD}, ${BRAND_DARK})` }}
              >
                <span className="absolute inset-0 bg-white/10 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                <span className="relative z-10">Book Now</span>
                <svg className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.25 rounded-xl hover:bg-stone-100 transition-colors"
              onClick={() => setMenuOpen((p) => !p)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span className={`block w-5 h-0.5 bg-stone-700 rounded-full transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-1.75" : ""}`} />
              <span className={`block w-5 h-0.5 bg-stone-700 rounded-full transition-all duration-200 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-stone-700 rounded-full transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-1.75" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${menuOpen ? "max-h-150 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="bg-white border-t border-stone-100 px-4 py-4 shadow-lg">
            <ul className="space-y-0.5 mb-5" role="list">
              {NAV_LINKS.map(({ label, href }) => {
                const isActive = active === label;
                return (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={() => { setActive(label); setMenuOpen(false); }}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-150"
                      style={{ color: isActive ? BRAND_GOLD : "#44403c", backgroundColor: isActive ? "#fdf8ec" : "transparent" }}
                    >
                      <span>{label}</span>
                      {isActive && (
                        <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
            <button
              onClick={openModal}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-white text-base font-semibold shadow-md active:scale-[0.98] transition-all duration-150"
              style={{ background: `linear-gradient(to right, ${BRAND_GOLD}, ${BRAND_DARK})` }}
            >
              Book Your Trip
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div className="h-16 md:h-18" />

      {/* ── Modal overlay ──
          BookingModal in `embedded` mode renders its OWN close button inside the header.
          The Navbar must NOT add any extra close button — doing so causes the double-× bug.
          Backdrop click (on the outer div) still dismisses the modal.
      ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-999 flex items-center justify-center p-4 sm:p-6"
          style={{
            backgroundColor: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          {/* Width cap + click-stop. No close button here — BookingModal owns it. */}
          <div
            className="w-full"
            style={{ maxWidth: "480px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <BookingModal
              isOpen={modalOpen}
              onClose={closeModal}
              embedded
            />
          </div>
        </div>
      )}
    </>
  );
}