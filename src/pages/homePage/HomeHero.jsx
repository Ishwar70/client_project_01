import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const images = [
  { label: "Kedarnath", bg: "#2d4270" },
  { label: "Rishikesh", bg: GOLD },
  { label: "Nainital", bg: GOLD },
  { label: "Valley of Flowers", bg: "#2d4270" },
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
      el.style.transform = "translateY(28px)";
      el.style.transition = `opacity 0.7s ease ${i * 0.13}s, transform 0.7s ease ${i * 0.13}s`;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 80);
    });
  }, []);

  return (
    <section
      ref={ref}
      style={{ background: NAVY }}
      className="w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 py-20 md:py-28 items-center">

          {/* Left — text */}
          <div>
            {/* Trust pill */}
            <div
              data-animate
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
              style={{
                background: "rgba(201,168,76,0.12)",
                border: "0.5px solid rgba(201,168,76,0.3)",
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: GOLD }}
              />
              <span
                className="text-[9px] uppercase tracking-[2px]"
                style={{ color: GOLD, fontFamily: "sans-serif" }}
              >
                Trusted Since 2009
              </span>
            </div>

            <h1
              data-animate
              className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight mb-5"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              <span className="text-white">Experience the</span>
              <br />
              <span className="text-white">Soul of the</span>
              <br />
              <span style={{ color: GOLD }}>Himalayas</span>
            </h1>

            <p
              data-animate
              className="text-sm leading-relaxed mb-8 max-w-sm"
              style={{ color: "#8a9bbf", fontFamily: "sans-serif" }}
            >
              Bespoke pilgrimages, thrilling adventures and serene hill escapes
              — crafted exclusively for you by Uttarakhand's most trusted travel
              experts.
            </p>

            <div data-animate className="flex gap-3 flex-wrap mb-10">
              <button
                onClick={() => navigate("/packages")}
                className="px-7 py-3 text-sm font-medium rounded text-white transition-opacity hover:opacity-90"
                style={{ background: GOLD }}
              >
                Explore Packages →
              </button>
              <button
                onClick={() => navigate("/about")}
                className="px-7 py-3 text-sm font-medium rounded transition-colors hover:bg-white/10"
                style={{ border: "1.5px solid #fff", color: "#fff" }}
              >
                Watch Our Story
              </button>
            </div>

            {/* Trust stats */}
            <div
              data-animate
              className="flex gap-6 pt-6"
              style={{ borderTop: "0.5px solid #2d4270" }}
            >
              {stats.map((s, i) => (
                <div key={s.label} className="flex items-center gap-4">
                  <div className="text-center">
                    <p
                      className="text-lg font-semibold"
                      style={{ color: GOLD, fontFamily: "sans-serif" }}
                    >
                      {s.value}
                    </p>
                    <p
                      className="text-[9px] mt-0.5"
                      style={{ color: "#8a9bbf", fontFamily: "sans-serif" }}
                    >
                      {s.label}
                    </p>
                  </div>
                  {i < stats.length - 1 && (
                    <div
                      className="h-7 w-px"
                      style={{ background: "#2d4270" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right — image collage */}
          <div
            data-animate
            className="grid grid-cols-2 gap-3 h-[280px] md:h-[360px]"
          >
            {images.map((img) => (
              <div
                key={img.label}
                className="rounded-xl flex items-center justify-center text-xs transition-transform duration-300 hover:scale-[1.02]"
                style={{
                  background: img.bg,
                  color: img.bg === GOLD ? "#F5E6C0" : "#aab5cc",
                  fontFamily: "sans-serif",
                }}
              >
                {img.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="text-center py-4"
        style={{ borderTop: "0.5px solid #2d4270" }}
      >
        <span
          className="text-[9px] uppercase tracking-[2.5px]"
          style={{ color: "#8a9bbf", fontFamily: "sans-serif" }}
        >
          Scroll to Explore ↓
        </span>
      </div>
    </section>
  );
}