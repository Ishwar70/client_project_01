import React, { useState, useEffect, useRef } from 'react';

const Stat1Circle = ({ value, label, colorClass }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  const numericValue = parseInt(value.replace(/[^0-9.]/g, ''), 10);
  const suffix = value.replace(/[0-9.]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHasStarted(true); },
      { threshold: 0.3 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const duration = 2000;
    const increment = numericValue / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setDisplayValue(numericValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [hasStarted, numericValue]);

  return (
    <div 
      ref={elementRef}
      // Responsive Container: Fixed size on desktop, fluid on mobile
      className="flex flex-col items-center justify-center text-center relative group cursor-default w-full max-w-[200px] sm:max-w-[240px] aspect-square mx-auto"
    >
      {/* Outer Rotating Border */}
      <div className={`absolute inset-0 rounded-full border-2 border-dashed opacity-30 animate-[spin_20s_linear_infinite] ${colorClass.replace('text', 'border')}`} />
      
      {/* Background Glow */}
      <div className={`absolute inset-4 sm:inset-8 rounded-full opacity-30 blur-2xl sm:blur-3xl transition-all duration-1000 group-hover:opacity-50 group-hover:scale-110 ${colorClass.replace('text', 'bg')}`} />
      
      {/* Glass Container */}
      <div className="absolute inset-2 sm:inset-4 rounded-full bg-white/30 backdrop-blur-md shadow-xl border border-white/50 flex items-center justify-center overflow-hidden">
        <div className="relative z-10 p-2 sm:p-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B1D48] tracking-tighter transition-transform duration-300 group-hover:scale-110">
            {displayValue.toLocaleString()}{suffix}
          </h2>
          <div className={`h-1 w-8 sm:w-12 rounded-full mt-1 mb-2 mx-auto ${colorClass.replace('text', 'bg')}`} />
          <p className="text-gray-500 text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-widest leading-tight px-2">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stat1Circle;