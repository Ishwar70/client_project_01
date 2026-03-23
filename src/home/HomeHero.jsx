import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const GOLD_DARK = "#A6832A";
const WHITE = "#FFFFFF";
const OFF_WHITE = "#FAFAF8";
const TEXT_PRIMARY = "#1A1208";
const TEXT_MUTED = "#9E8A5A";
const DIVIDER = "#EDD98A";

// Updated with image sources
const images = [
  { label: "Kedarnath", src: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=600" },
  { label: "Rishikesh", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCiDXfTZFWyYLm57FSOXMgkRvcolwUyS8sPw&s" },
  { label: "Nainital", src: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&q=80&w=600" },
  { label: "Valley of Flowers", src: "https://images.unsplash.com/photo-1587547131116-a0655a526190?auto=format&fit=crop&q=80&w=600" },
];

const stats = [
  { value: "4.9★", label: "Google Rating" },
  { value: "10K+", label: "Happy Travelers" },
  { value: "15+", label: "Years Experience" },
];

export default function HomeHero() {
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const els = ref.current?.querySelectorAll("[data-animate]");
    els?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(15px)";
      el.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 50);
    });
  }, []);

  return (
    <section
      ref={ref}
      style={{ background: WHITE, borderBottom: `1px solid ${DIVIDER}` }}
      className="w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-24">
        {/* Minimized top spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pt-6 pb-12 md:pt-10 md:pb-20 items-center">

          {/* Left — text */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h1
              data-animate
              className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.1] mb-3"
              style={{ fontFamily: "'Georgia', serif", color: TEXT_PRIMARY }}
            >
              Experience the<br />
              Soul of the<br />
              <span style={{ color: GOLD }}>Himalayas</span>
            </h1>

            <p
              data-animate
              className="text-sm md:text-base leading-relaxed mb-6 max-w-sm"
              style={{ color: TEXT_MUTED, fontFamily: "sans-serif" }}
            >
              Bespoke pilgrimages and serene hill escapes crafted exclusively by Uttarakhand's most trusted experts.
            </p>

            <div data-animate className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-8 justify-center lg:justify-start">
              <button
                onClick={() => navigate("/packages")}
                className="px-8 py-3 text-sm font-semibold rounded shadow-sm transition-all active:scale-95"
                style={{ background: GOLD, color: WHITE }}
              >
                Explore Packages →
              </button>
              <button
                onClick={() => navigate("/about")}
                className="px-8 py-3 text-sm font-semibold rounded transition-colors"
                style={{ border: `1.5px solid ${GOLD}`, color: GOLD_DARK }}
              >
                Watch Our Story
              </button>
            </div>

            {/* Trust stats */}
            <div
              data-animate
              className="flex justify-between sm:justify-start gap-4 sm:gap-10 pt-5 w-full sm:w-auto"
              style={{ borderTop: `1px solid ${DIVIDER}` }}
            >
              {stats.map((s, i) => (
                <div key={s.label} className="flex items-center gap-4 sm:gap-10">
                  <div className="text-center sm:text-left">
                    <p className="text-lg font-bold" style={{ color: GOLD }}>{s.value}</p>
                    <p className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: TEXT_MUTED }}>{s.label}</p>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="hidden sm:block h-6 w-px" style={{ background: DIVIDER }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Image Grid */}
          <div data-animate className="grid grid-cols-2 gap-3 h-auto">
            {images.map((img) => (
              <div
                key={img.label}
                className="group relative aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* Background Image */}
                <img 
                  src={img.src} 
                  alt={img.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Dark Overlay for Text Readability */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

                {/* Text Label */}
                <div className="absolute inset-0 flex items-center justify-center p-2">
                  <span className="text-white text-[11px] font-bold uppercase tracking-widest text-center drop-shadow-md">
                    {img.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="text-center py-2" style={{ borderTop: `1px solid ${DIVIDER}`, background: OFF_WHITE }}>
        <span className="text-[8px] font-bold uppercase tracking-[4px]" style={{ color: TEXT_MUTED }}>
          Scroll ↓
        </span>
      </div>
    </section>
  );
}