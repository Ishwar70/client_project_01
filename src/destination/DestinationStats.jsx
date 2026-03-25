import React, { useState, useEffect, useRef } from "react";

const GOLD = "#C9A84C";
const stats = [
  { value: 50, suffix: "+", label: "Destinations" },
  { value: 4, suffix: "", label: "Char Dham Sites" },
  { value: 13, suffix: "", label: "Districts" },
  { value: 7500, suffix: "m+", label: "Highest Peak" },
];

function Counter({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHasStarted(true); },
      { threshold: 0.5 }
    );
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [hasStarted, end, duration]);

  return <span ref={countRef}>{count}</span>;
}

export default function DestinationStats() {
  return (
    <section 
      style={{ background: `linear-gradient(to right, ${GOLD}, #B8962E)` }} 
      className="w-full py-8 md:py-12 shadow-inner"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x-[0.5px] divide-[#B8962E]/50">
          {stats.map((s) => (
            <div
              key={s.label}
              className="group flex flex-col items-center justify-center py-4 px-2 text-center transition-all duration-300 hover:scale-105"
            >
              <div className="relative mb-1">
                <span className="text-3xl md:text-5xl font-bold text-white tracking-tight flex items-baseline">
                  <Counter end={s.value} />
                  <span className="text-xl md:text-2xl ml-0.5">{s.suffix}</span>
                </span>
                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
              </div>
              
              <span
                className="text-[10px] md:text-xs uppercase tracking-[3px] font-medium transition-colors group-hover:text-white"
                style={{ color: "#F5E6C0" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}