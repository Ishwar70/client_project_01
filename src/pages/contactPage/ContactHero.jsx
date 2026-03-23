import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const TEXT_DARK = "#1A1A1A";
const OFF_WHITE = "#FAFAF7";

// High-quality image for a serene "Contact" vibe
const CONTACT_HERO_IMG = "https://th.bing.com/th/id/OIP.-I3DsLr-5ZdgewtqcNbGewHaE8?w=236&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3";

export default function ContactHero() {
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const els = ref.current?.querySelectorAll("[data-animate]");
    els?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(25px)";
      el.style.transition = `all 0.9s cubic-bezier(0.19, 1, 0.22, 1) ${i * 0.12}s`;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 100);
    });
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full py-16 md:py-24 px-6 md:px-16 lg:px-24 overflow-hidden border-b border-gray-100"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Content (7 Columns) */}
        <div className="lg:col-span-7 z-10 text-left">
          {/* Minimal Breadcrumb */}
          <div data-animate className="flex items-center gap-3 mb-8">
            <span 
              onClick={() => navigate("/")}
              className="text-[10px] tracking-[3px] uppercase font-bold text-gray-400 hover:text-[#C9A84C] cursor-pointer transition-colors"
            >
              Home
            </span>
            <div className="w-1 h-1 rounded-full bg-gray-200"></div>
            <span className="text-[10px] tracking-[3px] uppercase font-bold" style={{ color: GOLD }}>
              Contact Us
            </span>
          </div>

          <span
            data-animate
            className="text-[11px] tracking-[5px] uppercase font-bold block mb-4"
            style={{ color: GOLD }}
          >
            Connect With Us
          </span>

          <h1
            data-animate
            className="text-5xl md:text-8xl font-bold leading-tight mb-8"
            style={{ fontFamily: "'Georgia', serif", color: TEXT_DARK }}
          >
            Start Your <br />
            <span className="italic font-light" style={{ color: GOLD }}>Journey</span>
          </h1>

          <div 
            data-animate 
            className="w-20 h-[1.5px] mb-10" 
            style={{ background: GOLD }}
          ></div>

          <p
            data-animate
            className="text-base md:text-xl text-gray-500 max-w-lg mb-0 leading-relaxed italic"
          >
            "Your Himalayan adventure begins with a simple conversation. 
            We are here to listen, plan, and guide."
          </p>
        </div>

        {/* Right Side: Editorial Image Card (5 Columns) */}
        <div data-animate className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-square group">
            <img 
              src={CONTACT_HERO_IMG} 
              alt="Himalayan Peace" 
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
            />
            {/* Subtle Golden Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"></div>
          </div>
          
          {/* Decorative Floating Label */}
          <div 
            className="absolute -bottom-6 -right-6 md:right-10 px-8 py-6 rounded-2xl shadow-2xl z-20 border border-gray-50 flex flex-col items-center justify-center"
            style={{ background: "#FFF" }}
          >
             <span className="text-xl font-bold" style={{ color: TEXT_DARK }}>24/7</span>
             <span className="text-[9px] tracking-widest uppercase font-bold text-gray-400">Support Available</span>
          </div>

          {/* Golden Circle Accent */}
          <div 
            className="absolute -top-10 -left-10 w-32 h-32 rounded-full opacity-10 pointer-events-none"
            style={{ border: `12px solid ${GOLD}` }}
          ></div>
        </div>

      </div>

      {/* Background Watermark (Subtle Detail) */}
      <div className="absolute bottom-[-5%] left-[-2%] pointer-events-none select-none">
          <span className="text-[120px] md:text-[180px] font-bold opacity-[0.03] uppercase tracking-tighter" style={{ color: GOLD }}>
            Uttarakhand
          </span>
      </div>
    </section>
  );
}