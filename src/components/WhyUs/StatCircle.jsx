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
      className="flex flex-col items-center justify-center text-center relative group cursor-default h-64 w-64 mx-auto"
    >
      {/* 1. Outer Rotating Border - Darker & More Visible */}
      <div className={`absolute inset-0 rounded-full border-2 border-dashed opacity-40 animate-[spin_20s_linear_infinite] ${colorClass.replace('text', 'border')}`} />
      
      {/* 2. Deep Background Glow - Increased Opacity for "Darker" look */}
      <div className={`absolute inset-8 rounded-full opacity-40 blur-3xl transition-all duration-1000 group-hover:opacity-60 group-hover:scale-125 animate-pulse ${colorClass.replace('text', 'bg')}`} />
      
      {/* 3. The Glass Container */}
      <div className="absolute inset-6 rounded-full bg-white/30 backdrop-blur-lg shadow-2xl border border-white/50 transition-all duration-500 group-hover:bg-white/20 flex items-center justify-center overflow-hidden">
        
        {/* 4. Vivid Inner Radial Gradient (Makes the circle feel 'full' of color) */}
        <div className={`absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-current ${colorClass}`} />
        
        {/* Content Section */}
        <div className="relative z-10 p-4">
          <div className="flex flex-col items-center">
            {/* Dark Navy Text for Contrast */}
            <h2 className="text-4xl md:text-5xl font-black text-[#0B1D48] tracking-tighter drop-shadow-sm transition-transform duration-300 group-hover:scale-110">
              {displayValue.toLocaleString()}{suffix}
            </h2>
            
            {/* Thicker Colored Accent Line */}
            <div className={`h-1.5 w-12 rounded-full mt-2 mb-3 shadow-sm transition-all duration-500 group-hover:w-20 ${colorClass.replace('text', 'bg')}`} />
            
            {/* Label - Darker Gray for Premium Feel */}
            <p className="text-slate-600 text-[11px] md:text-[12px] font-extrabold uppercase tracking-[0.25em] leading-tight max-w-[130px] mx-auto">
              {label}
            </p>
          </div>
        </div>
      </div>

      {/* 5. Floating Satellite Dot */}
      <div className={`absolute top-8 right-8 h-4 w-4 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)] animate-bounce ${colorClass.replace('text', 'bg')}`} />
    </div>
  );
};

export default StatCircle;