import { useEffect, useRef } from "react";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

export default function HeroSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll("[data-animate]");
    els?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      el.style.transition = `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s`;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 80);
    });
  }, []);

  const stats = [
    { value: "15+", label: "Years Exp." },
    { value: "10K+", label: "Travelers" },
    { value: "50+", label: "Destinations" },
    { value: "100%", label: "Satisfaction" },
  ];

  return (
    <section
      ref={containerRef}
      style={{ background: NAVY }}
      className="w-full px-6 md:px-16 lg:px-24 py-20 md:py-28"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left */}
        <div>
          <span
            data-animate
            className="inline-block text-xs tracking-[3px] uppercase font-medium mb-5"
            style={{ color: GOLD, fontFamily: "sans-serif" }}
          >
            Our Story
          </span>

          <h1
            data-animate
            className="text-5xl md:text-6xl font-semibold leading-tight mb-6"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            <span className="text-white">Who </span>
            <span style={{ color: GOLD }}>We Are</span>
          </h1>

          <p
            data-animate
            className="text-base italic leading-relaxed mb-8"
            style={{ color: "#8a9bbf" }}
          >
            Passionate travel experts dedicated to crafting unforgettable journeys
            across the sacred mountains and valleys of Uttarakhand since 2009.
          </p>

          <div data-animate className="flex gap-4 flex-wrap mb-12">
            <button
              className="px-6 py-3 text-sm font-medium rounded text-white transition-opacity hover:opacity-90"
              style={{ background: GOLD }}
            >
              Our Journey
            </button>
            <button
              className="px-6 py-3 text-sm font-medium rounded transition-colors hover:bg-white/10"
              style={{ border: `1.5px solid ${GOLD}`, color: GOLD }}
            >
              Meet the Team
            </button>
          </div>

          {/* Mini stats */}
          <div
            data-animate
            className="grid grid-cols-4 gap-0 pt-8"
            style={{ borderTop: "0.5px solid #2d4270" }}
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center first:text-left">
                <div
                  className="text-2xl font-semibold"
                  style={{ color: GOLD, fontFamily: "sans-serif" }}
                >
                  {s.value}
                </div>
                <div
                  className="text-[10px] uppercase tracking-widest mt-1"
                  style={{ color: "#8a9bbf" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — image collage */}
        <div data-animate className="relative h-[340px] lg:h-[420px]">
          <div
            className="absolute inset-0 rounded-xl"
            style={{ background: "#2d4270" }}
          >
            <div className="w-full h-full flex items-center justify-center rounded-xl">
              <span className="text-sm" style={{ color: "#aab5cc" }}>
                Hero Photo — Mountains / Landscape
              </span>
            </div>
          </div>
          {/* Floating badge */}
          <div
            className="absolute -bottom-4 -left-4 rounded-xl px-4 py-3 z-10"
            style={{
              background: GOLD,
              border: `3px solid ${NAVY}`,
            }}
          >
            <div className="text-white font-semibold text-lg leading-none">Since 2009</div>
            <div className="text-[10px] mt-1" style={{ color: "#F5E6C0" }}>
              Trusted by Thousands
            </div>
          </div>
          {/* Small overlay card */}
          <div
            className="absolute -top-4 -right-4 rounded-xl px-4 py-3 z-10"
            style={{ background: "#fff" }}
          >
            <div
              className="text-xl font-semibold"
              style={{ color: NAVY, fontFamily: "sans-serif" }}
            >
              ★ 4.9
            </div>
            <div className="text-[10px] text-gray-400">Google Reviews</div>
          </div>
        </div>
      </div>
    </section>
  );
}