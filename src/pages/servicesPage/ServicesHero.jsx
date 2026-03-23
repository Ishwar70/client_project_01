import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const TEXT_DARK = "#1A1A1A";
const LIGHT_GOLD = "#F4EBD0";

const IMG_LEFT = "https://th.bing.com/th/id/OIP.s0AZqlI4Mi5JIcDJQTmDIAHaER?w=277&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3";
const IMG_RIGHT = "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=600&auto=format&fit=crop";

export default function ServicesHero() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll("[data-animate]");
    els?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "scale(0.95) translateY(10px)";
      el.style.transition = `all 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) ${i * 0.1}s`;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "scale(1) translateY(0)";
      }, 100);
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white pt-16 pb-12 md:pt-24 md:pb-20 px-6 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
         <div className="absolute top-10 left-10 w-40 h-40 rounded-full blur-[100px] opacity-20" style={{ background: GOLD }}></div>
         <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full blur-[120px] opacity-10" style={{ background: GOLD }}></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Editorial Image (Hidden on Mobile) */}
        <div data-animate className="hidden lg:block lg:col-span-3">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl rotate-[-3deg] border-[6px] border-white">
            <img src={IMG_LEFT} alt="Trek" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Center: Content (6 Columns) */}
        <div className="lg:col-span-6 text-center z-10">
          <div data-animate className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-6 bg-gray-200"></div>
            <span className="text-[10px] tracking-[4px] uppercase font-extrabold" style={{ color: GOLD }}>
              Premium Offerings
            </span>
            <div className="h-[1px] w-6 bg-gray-200"></div>
          </div>

          <h1
            data-animate
            className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6"
            style={{ fontFamily: "'Georgia', serif", color: TEXT_DARK }}
          >
            Curated <br />
            <span className="italic font-light" style={{ color: GOLD }}>Journeys</span>
          </h1>

          <p
            data-animate
            className="text-sm md:text-base text-gray-500 leading-relaxed mb-10 max-w-md mx-auto"
          >
            Expertly crafted itineraries that blend soul-stirring spirituality 
            with the raw, untamed beauty of the Himalayas.
          </p>

          <div data-animate className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate("/packages")}
              className="group relative px-8 py-4 bg-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 text-[10px] font-bold uppercase tracking-widest text-white">
                Explore Packages
              </span>
              <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300" style={{ background: GOLD }}></div>
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest rounded-full border border-gray-200 transition-all hover:bg-gray-50"
              style={{ color: TEXT_DARK }}
            >
              Custom Inquiry
            </button>
          </div>
        </div>

        {/* Right Side: Editorial Image (Hidden on Mobile) */}
        <div data-animate className="hidden lg:block lg:col-span-3">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl rotate-[3deg] border-[6px] border-white mt-12">
            <img src={IMG_RIGHT} alt="Mountain" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Mobile-only breadcrumb at bottom to save top space */}
      <div data-animate className="mt-12 flex justify-center lg:hidden">
         <p className="text-[9px] tracking-widest text-gray-400 uppercase">
           Home <span className="mx-2 text-gold" style={{ color: GOLD }}>/</span> Services
         </p>
      </div>
    </section>
  );
}