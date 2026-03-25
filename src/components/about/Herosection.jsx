import { useEffect, useRef } from "react";

const GOLD = "#C9A84C";
const TEXT_MAIN = "#1A1A1A"; 

export default function HeroSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll("[data-animate]");
    els?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(10px)";
      el.style.transition = `all 0.6s ease-out ${i * 0.08}s`;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 50);
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white px-6 md:px-12 py-8 md:py-14 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left Content */}
        <div className="lg:col-span-6 z-10">
          <div data-animate className="flex items-center gap-2 mb-3">
            <div className="h-[1.5px] w-5" style={{ backgroundColor: GOLD }}></div>
            <span className="text-[9px] tracking-[0.4em] uppercase font-bold" style={{ color: GOLD }}>
              Luxury Travel
            </span>
          </div>

          <h1
            data-animate
            className="text-5xl md:text-8xl font-serif leading-[0.9] mb-4 tracking-tighter"
            style={{ color: TEXT_MAIN }}
          >
            Pure <br /> 
            <span style={{ color: GOLD }}>Elevation.</span>
          </h1>

          <p
            data-animate
            className="text-sm md:text-base leading-relaxed mb-6 max-w-sm text-gray-500 font-light"
          >
            Bespoke Uttarakhand expeditions. Discover the silent majesty 
            of the Himalayas with curated luxury and spiritual depth.
          </p>

          {/* Ultra-tight Stats */}
          <div data-animate className="flex gap-8 border-t border-gray-50 pt-6">
            {[
              { v: "15Y", l: "History" },
              { v: "50+", l: "Peaks" },
              { v: "10K", l: "Souls" }
            ].map((s, i) => (
              <div key={i}>
                <div className="text-lg font-medium" style={{ color: TEXT_MAIN }}>{s.v}</div>
                <div className="text-[8px] uppercase tracking-[0.2em] text-gray-400 font-bold">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content - Single Powerful Visual */}
        <div data-animate className="lg:col-span-6 relative mt-4 lg:mt-0">
          <div className="relative p-2 border border-gray-100">
            {/* The Image Container */}
            <div className="relative aspect-16/10 w-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200" 
                alt="Mountains" 
                className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000"
              />
            </div>
            
            {/* Gold Accent Corner */}
            <div 
              className="absolute -top-1 -right-1 w-12 h-12 border-t-2 border-r-2" 
              style={{ borderColor: GOLD }}
            ></div>
          </div>

          {/* Floating Rating - Minimalist */}
          <div className="absolute -bottom-4 right-8 bg-white p-4 shadow-sm border border-gray-50">
            <div className="text-[8px] uppercase tracking-widest text-gray-400 mb-1">Rating</div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-serif italic" style={{ color: TEXT_MAIN }}>4.9</span>
              <span className="text-[10px]" style={{ color: GOLD }}>★★★★★</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}