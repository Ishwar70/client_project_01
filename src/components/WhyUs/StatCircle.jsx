import React, { useState, useEffect, useRef } from 'react';

const StatCircle = ({ value, label, colorClass }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  const numericValue = parseInt(value.replace(/[^0-9.]/g, ''), 10);
  const suffix = value.replace(/[0-9.]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHasStarted(true); },
      { threshold: 0.1 }
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
      className="flex flex-col items-center justify-center text-center relative group cursor-default w-full max-w-[150px] xs:max-w-[180px] sm:max-w-[220px] md:max-w-[240px] aspect-square mx-auto"
    >
      {/* 1. Outer Rotating Border - Opacity increased to 60% for darker look */}
      <div className={`absolute inset-0 rounded-full border-[1.5px] sm:border-2 border-dashed opacity-60 animate-[spin_20s_linear_infinite] ${colorClass.replace('text', 'border')}`} />
      
      {/* 2. Deep Background Glow - Increased opacity and darker color flow */}
      <div className={`absolute inset-2 sm:inset-8 rounded-full opacity-40 blur-xl sm:blur-3xl transition-all duration-1000 group-hover:opacity-60 ${colorClass.replace('text', 'bg')}`} />
      
      {/* 3. The Glass Container */}
      <div className="absolute inset-2 sm:inset-6 rounded-full bg-white/40 backdrop-blur-md shadow-2xl border border-white/60 flex items-center justify-center overflow-hidden">
        {/* Darker Inner Gradient */}
        <div className={`absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-current ${colorClass}`} />
        
        <div className="relative z-10 p-1 sm:p-4 w-full">
          <div className="flex flex-col items-center">
            {/* Value: Navy remains for contrast, added slight shadow */}
            <h2 className="text-lg xs:text-xl sm:text-3xl md:text-4xl font-black text-[#0B1D48] tracking-tighter drop-shadow-md transition-transform duration-300 group-hover:scale-110">
              {displayValue.toLocaleString()}{suffix}
            </h2>
            
            {/* Color Accent Line - Full Opacity */}
            <div className={`h-0.5 w-6 sm:h-1.5 sm:w-12 rounded-full mt-0.5 mb-1 sm:mb-3 shadow-sm ${colorClass.replace('text', 'bg')}`} />
            
            {/* Label: Changed to text-slate-800 for more 'Dark' feel */}
            <p className="text-slate-800 text-[8px] xs:text-[9px] sm:text-[10px] md:text-[12px] font-extrabold uppercase tracking-tight sm:tracking-[0.2em] leading-tight max-w-[80px] xs:max-w-[100px] sm:max-w-[130px] mx-auto">
              {label}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Floating Satellite Dot */}
      <div className={`absolute top-3 right-3 sm:top-8 sm:right-8 h-2 w-2 sm:h-4 sm:w-4 rounded-full shadow-lg animate-bounce ${colorClass.replace('text', 'bg')}`} />
    </div>
  );
};

export default StatCircle;