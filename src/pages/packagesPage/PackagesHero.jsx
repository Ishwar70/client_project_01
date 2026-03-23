import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const TEXT_DARK = "#1A1A1A";
const OFF_WHITE = "#FAFAF7";

const filters = ["All", "Pilgrimage", "Adventure", "Hill Station", "Custom"];

export default function PackagesHero({ activeFilter, setActiveFilter }) {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll("[data-animate]");
    els?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(15px)";
      el.style.transition = `opacity 0.7s ease ${i * 0.08}s, transform 0.7s ease ${i * 0.08}s`;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 50);
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full py-12 md:py-16 px-6 md:px-16 lg:px-24 text-center border-b border-gray-50"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb - Clean & Minimal */}
      

        <span
          data-animate
          className="text-[11px] tracking-[5px] uppercase font-bold block mb-4"
          style={{ color: GOLD }}
        >
          Exclusive Selection
        </span>

        <h1
          data-animate
          className="text-4xl md:text-6xl font-light leading-tight mb-6"
          style={{ fontFamily: "'Georgia', serif", color: TEXT_DARK }}
        >
          Premium <span className="font-bold italic" style={{ color: GOLD }}>Experiences</span>
        </h1>

        <div 
          data-animate 
          className="w-12 h-[1px] mx-auto mb-10" 
          style={{ background: GOLD }}
        ></div>

        {/* Filter pills - Modern Luxury Style */}
        <div
          data-animate
          className="flex flex-wrap gap-3 justify-center mb-4"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300"
              style={
                activeFilter === f
                  ? { 
                      background: GOLD, 
                      color: "#fff",
                      boxShadow: `0 10px 20px -5px rgba(201, 168, 76, 0.4)`,
                      transform: 'translateY(-2px)'
                    }
                  : { 
                      background: OFF_WHITE,
                      color: "#888",
                      border: "1px solid transparent"
                    }
              }
            >
              {f}
            </button>
          ))}
        </div>
        
        <p
          data-animate
          className="text-xs italic text-gray-400 mt-6"
        >
          Showing curated results for {activeFilter} category
        </p>
      </div>
    </section>
  );
}