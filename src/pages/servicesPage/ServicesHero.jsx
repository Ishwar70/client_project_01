import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const TEXT_DARK = "#1A1A1A";

const IMG_MAIN = "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200";

export default function ServicesHero() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll("[data-animate]");
    els?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px) scale(0.98)";
      el.style.transition = `all 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0) scale(1)";
      }, 100);
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white py-12 md:py-16 px-6 overflow-hidden flex flex-col items-center"
    >
      {/* 1. Subtle Background Texture / Watermark */}
      <div className="absolute top-0 right-0 text-[20vw] font-serif italic text-gray-50 opacity-40 select-none pointer-events-none leading-none -mr-10 -mt-10">
        Gold
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
        
        {/* LEFT: Text Content (Span 5) */}
        <div className="lg:col-span-5 z-20">
          <h1
            data-animate
            className="text-6xl md:text-[5.5rem] font-serif leading-[0.85] tracking-tighter mb-6"
            style={{ color: TEXT_DARK }}
          >
            Divine <br />
            <span style={{ color: GOLD }} className="italic font-light">Elegance.</span>
          </h1>

          <p
            data-animate
            className="text-sm text-gray-400 font-light max-w-xs leading-relaxed mb-8 border-l border-gray-100 pl-6"
          >
            Experience Uttarakhand through a lens of absolute luxury. 
            Where every detail is gold-standard.
          </p>

          <div data-animate>
             <button 
               onClick={() => navigate('/services')}
               className="group flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] font-bold"
             >
                <span className="group-hover:text-[#C9A84C] transition-colors duration-300">View Services</span>
                <div className="h-px w-10 bg-gray-200 group-hover:w-16 group-hover:bg-[#C9A84C] transition-all duration-500"></div>
             </button>
          </div>
        </div>

        {/* RIGHT: The Visual (Span 7) */}
        <div data-animate className="lg:col-span-7 mt-12 lg:mt-0 relative">
          <div className="relative group">
            {/* The Main Image Frame */}
            <div className="aspect-video overflow-hidden rounded-sm border border-gray-50">
              <img 
                src={IMG_MAIN} 
                alt="Premium View" 
                className="w-full h-full object-cover grayscale-30 group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
              />
            </div>

            {/* Floating Glass Card */}
            <div className="absolute -bottom-6 -left-6 md:-left-12 bg-white/80 backdrop-blur-md p-6 border border-white shadow-2xl z-30 max-w-50">
               <div className="text-[9px] uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Heritage</div>
               <p className="text-[11px] leading-tight text-gray-600 italic">
                 "A journey that redefines the meaning of peaks."
               </p>
            </div>

            {/* Decorative Gold Elements */}
            <div className="absolute top-0 right-0 w-24 h-24 border-t border-r -mt-2 -mr-2" style={{ borderColor: GOLD }}></div>
            <div className="absolute bottom-0 left-1/2 w-px h-12 bg-linear-to-t from-[#C9A84C] to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}