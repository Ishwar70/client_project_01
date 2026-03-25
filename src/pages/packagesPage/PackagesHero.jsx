import { useEffect, useRef } from "react";

const GOLD = "#C9A84C";
const filters = ["All", "Pilgrimage", "Adventure", "Hill Station", "Custom"];

export default function PackagesHero({ activeFilter, setActiveFilter }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll("[data-animate]");
    els?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(15px)";
      el.style.transition = `opacity 0.8s ease-out ${i * 0.1}s, transform 0.8s ease-out ${i * 0.1}s`;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 50);
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-12 md:py-24 px-4 md:px-6 overflow-hidden min-h-[420px] md:min-h-[550px] flex items-center"
    >
      {/* Background with Darker Mobile Gradient */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=2000" 
          alt="Himalayan Background"
          className="w-full h-full object-cover scale-110 md:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-white/95"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 w-full text-center">
        <span
          data-animate
          className="text-[8px] md:text-[10px] tracking-[5px] md:tracking-[10px] uppercase font-bold block mb-3 text-[#D4AF37]"
        >
          Signature Collections
        </span>

        <h1
          data-animate
          className="text-4xl md:text-7xl font-light leading-[1.1] mb-4 text-white"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Unveil <span className="font-bold italic text-[#D4AF37]">Uttarakhand</span>
        </h1>

        <p data-animate className="text-white/80 text-xs md:text-lg italic mb-10 max-w-sm md:max-w-xl mx-auto px-6">
          Handpicked itineraries designed for the soulful traveler.
        </p>

        {/* MOBILE SCROLLABLE TRACK 
            - 'no-scrollbar' class added (CSS below)
            - 'snap-x' for better touch feel 
        */}
        <div
          data-animate
          className="w-full overflow-x-auto overflow-y-hidden snap-x no-scrollbar flex flex-nowrap md:flex-wrap md:justify-center gap-3 px-4 pb-6"
        >
          {filters.map((f) => {
            const isActive = activeFilter === f;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`flex-shrink-0 snap-center px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border
                  ${isActive 
                    ? 'text-white shadow-[0_10px_20px_rgba(201,168,76,0.3)] border-transparent' 
                    : 'text-white/70 border-white/20 bg-black/30 backdrop-blur-md hover:text-white'}`}
                style={isActive ? { background: GOLD } : {}}
              >
                {f}
              </button>
            );
          })}
        </div>
        
        <div data-animate className="flex items-center justify-center gap-4 mt-2">
          <div className="h-[1px] w-10 bg-gray-300/30"></div>
          <p className="text-[9px] uppercase tracking-[3px] text-gray-400 font-bold">
            {activeFilter} Explorations
          </p>
          <div className="h-[1px] w-10 bg-gray-300/30"></div>
        </div>
      </div>

      {/* FIXED CSS BLOCK: Injecting styles without using the 'jsx' attribute */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}