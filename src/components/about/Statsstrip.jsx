import { useEffect, useRef } from "react";

const GOLD = "#C9A84C";
const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "10K+", label: "Happy Travelers" },
  { value: "50+", label: "Destinations" },
  { value: "100%", label: "Satisfaction" },
];

export default function StatsStrip() {
  const stripRef = useRef(null);

  useEffect(() => {
    const els = stripRef.current?.querySelectorAll(".stat-item");
    els?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(10px)";
      el.style.transition = `all 0.6s cubic-bezier(0.2, 1, 0.3, 1) ${i * 0.1}s`;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 100);
    });
  }, []);

  return (
    <section 
      ref={stripRef}
      className="w-full py-8 md:py-10 relative overflow-hidden"
      style={{ background: `linear-gradient(to right, ${GOLD}, #B8962E)` }}
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 relative z-10 px-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="stat-item group flex flex-col items-center justify-center py-4 text-center transition-transform duration-300 hover:scale-105"
          >
            {/* Divider Logic: Only show between items, hidden on mobile for the 2nd column */}
            {i !== 0 && (
              <div className={`absolute left-0 h-10 w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent ${i === 2 ? 'md:block hidden' : 'hidden md:block'}`} />
            )}

            <span
              className="text-3xl md:text-5xl font-light text-white tracking-tighter tabular-nums drop-shadow-sm"
              style={{ fontFamily: "serif" }} // Using serif here matches your Hero sections
            >
              {s.value}
            </span>
            
            <span
              className="text-[9px] md:text-[11px] uppercase tracking-[3px] mt-2 font-bold text-white/70 group-hover:text-white transition-colors"
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}