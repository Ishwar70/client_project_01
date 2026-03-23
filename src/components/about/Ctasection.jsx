import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const TEXT_DARK = "#2A2A2A"; 
const SOFT_BG = "#FAFAF7"; 

// A beautiful atmospheric mountain shot for the background
const CTA_BG_IMG = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section 
      className="relative w-full py-28 px-6 md:px-16 lg:px-24 text-center overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      {/* Background Image with Low Opacity for "Clean" look */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url(${CTA_BG_IMG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%)'
        }}
      ></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <span
          className="text-xs tracking-[5px] uppercase font-bold block mb-6"
          style={{ color: GOLD }}
        >
          Start Your Journey
        </span>

        <h2
          className="text-4xl md:text-6xl font-light leading-tight mb-8"
          style={{ fontFamily: "'Georgia', serif", color: TEXT_DARK }}
        >
          Ready to Explore <br />
          <span className="font-bold italic" style={{ color: GOLD }}>Uttarakhand?</span>
        </h2>

        <div 
          className="w-16 h-[1px] mx-auto mb-8" 
          style={{ background: GOLD }}
        ></div>

        <p
          className="text-base md:text-lg leading-relaxed mb-12 max-w-2xl mx-auto"
          style={{ color: "#666" }}
        >
          Whether you seek spiritual peace at the Char Dham, adrenaline in Rishikesh, 
          or serenity in the hill stations—we are here to craft your perfect escape.
        </p>

        <div className="flex gap-6 justify-center flex-wrap">
          <button
            onClick={() => navigate("/packages")}
            className="px-10 py-4 text-xs font-bold uppercase tracking-widest rounded-full text-white transition-all hover:shadow-[0_20px_40px_-10px_rgba(201,168,76,0.4)] hover:-translate-y-1"
            style={{ background: GOLD }}
          >
            Explore Packages
          </button>
          
          <button
            onClick={() => navigate("/contact")}
            className="px-10 py-4 text-xs font-bold uppercase tracking-widest rounded-full transition-all border border-gray-200 hover:bg-gray-50 active:scale-95"
            style={{ color: TEXT_DARK }}
          >
            Get a Quote
          </button>
        </div>

        {/* Decorative elements */}
        <div className="mt-16 flex items-center justify-center gap-4 text-gray-300">
            <span className="text-[10px] tracking-widest uppercase font-bold">Safe Travels</span>
            <div className="w-1 h-1 rounded-full bg-gold" style={{ background: GOLD }}></div>
            <span className="text-[10px] tracking-widest uppercase font-bold">Local Experts</span>
            <div className="w-1 h-1 rounded-full bg-gold" style={{ background: GOLD }}></div>
            <span className="text-[10px] tracking-widest uppercase font-bold">24/7 Support</span>
        </div>
      </div>
    </section>
  );
}