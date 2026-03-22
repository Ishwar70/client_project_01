import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

export default function ServicesHero() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll("[data-animate]");
    els?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = `opacity 0.65s ease ${i * 0.1}s, transform 0.65s ease ${i * 0.1}s`;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 60);
    });
  }, []);

  return (
    <section
      ref={containerRef}
      style={{ background: NAVY }}
      className="w-full py-24 px-6 md:px-16 lg:px-24 text-center"
    >
      <div className="max-w-3xl mx-auto">
        <span
          data-animate
          className="text-xs tracking-[3px] uppercase font-medium block mb-4"
          style={{ color: GOLD }}
        >
          What We Offer
        </span>

        <h1
          data-animate
          className="text-5xl md:text-6xl font-semibold leading-tight mb-5"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          <span className="text-white">Our </span>
          <span style={{ color: GOLD }}>Services</span>
        </h1>

        <p
          data-animate
          className="text-sm italic leading-relaxed mb-10"
          style={{ color: "#8a9bbf" }}
        >
          "From sacred pilgrimages to thrilling adventures — we craft every
          journey with love, expertise, and care"
        </p>

        <div data-animate className="flex gap-4 justify-center flex-wrap mb-8">
          <button
            onClick={() => navigate("/packages")}
            className="px-7 py-3 text-sm font-medium rounded text-white transition-opacity hover:opacity-90"
            style={{ background: GOLD }}
          >
            Explore All
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="px-7 py-3 text-sm font-medium rounded transition-colors hover:bg-white/10"
            style={{ border: `1.5px solid ${GOLD}`, color: GOLD }}
          >
            Get Custom Quote
          </button>
        </div>

        {/* Breadcrumb */}
        <div
          data-animate
          className="flex gap-2 justify-center items-center"
          style={{ fontFamily: "sans-serif" }}
        >
          <span
            className="text-xs cursor-pointer hover:underline"
            style={{ color: "#8a9bbf" }}
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <span className="text-xs" style={{ color: GOLD }}>›</span>
          <span className="text-xs" style={{ color: GOLD }}>Services</span>
        </div>
      </div>
    </section>
  );
}