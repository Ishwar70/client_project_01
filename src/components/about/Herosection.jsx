import { useEffect, useRef } from "react";

const GOLD = "#C9A84C";
const TEXT_DARK = "#2A2A2A"; // Elegant off-black for readability
const SOFT_BG = "#FAFAF7";   // Very light sand/paper color for depth

const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2000&auto=format&fit=crop";

export default function HeroSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll("[data-animate]");
    els?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = `opacity 0.8s ease ${i * 0.1}s, transform 0.8s ease ${i * 0.1}s`;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 100);
    });
  }, []);

  const stats = [
    { value: "15+", label: "Years Exp." },
    { value: "10K+", label: "Travelers" },
    { value: "50+", label: "Destinations" },
    { value: "100%", label: "Satisfaction" },
  ];

  return (
    <section
      ref={containerRef}
      style={{ background: "#FFFFFF" }}
      className="w-full px-6 md:px-16 lg:px-24 py-16 md:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div>
          <div data-animate className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-8" style={{ background: GOLD }}></div>
            <span
              className="text-xs tracking-[4px] uppercase font-bold"
              style={{ color: GOLD }}
            >
              Since 2009
            </span>
          </div>

          <h1
            data-animate
            className="text-5xl md:text-7xl font-light leading-[1.1] mb-8"
            style={{ fontFamily: "'Georgia', serif", color: TEXT_DARK }}
          >
            Experience the <br />
            <span className="font-bold" style={{ color: GOLD }}>Divine Peaks</span>
          </h1>

          <p
            data-animate
            className="text-lg leading-relaxed mb-10 max-w-lg text-gray-500"
          >
            Discover the soul of Uttarakhand through curated journeys. 
            From sacred temples to untouched Himalayan trails, we bring 
            you closer to nature and spirit.
          </p>

          <div data-animate className="flex gap-4 flex-wrap mb-16">
            <button
              className="px-10 py-4 text-xs font-bold uppercase tracking-widest rounded-full text-white transition-all hover:shadow-2xl active:scale-95"
              style={{ background: GOLD }}
            >
              Explore Tours
            </button>
            <button
              className="px-10 py-4 text-xs font-bold uppercase tracking-widest rounded-full transition-all border border-gray-200 hover:bg-gray-50"
              style={{ color: TEXT_DARK }}
            >
              Our Story
            </button>
          </div>

          {/* Stats Section */}
          <div
            data-animate
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-gray-100"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div
                  className="text-2xl font-bold"
                  style={{ color: TEXT_DARK }}
                >
                  {s.value}
                </div>
                <div
                  className="text-[10px] uppercase tracking-widest mt-1 font-bold text-gray-400"
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content - Elegant Image Layout */}
        <div data-animate className="relative pl-0 lg:pl-10">
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border-[8px] border-white">
            <img 
              src={HERO_IMAGE_URL} 
              alt="Uttarakhand Mountains" 
              className="w-full h-[450px] md:h-[550px] object-cover"
            />
          </div>

          {/* Decorative Gold Element */}
          <div 
            className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-10 pointer-events-none"
            style={{ border: `15px solid ${GOLD}` }}
          ></div>

          {/* Floating Review Card */}
          <div
            className="absolute -bottom-6 -left-6 md:left-4 bg-white p-6 rounded-xl shadow-2xl z-20 border border-gray-50"
          >
            <div className="flex gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-sm" style={{ color: GOLD }}>★</span>
              ))}
            </div>
            <div className="text-lg font-bold" style={{ color: TEXT_DARK }}>4.9/5</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
              Trusted by 10k+ Travelers
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}