import { useEffect, useRef, useState } from "react";
import { Search, MapPin, Compass } from "lucide-react";

const GOLD = "#C9A84C";
const popularTags = ["Kedarnath", "Nainital", "Rishikesh", "Valley of Flowers", "Jim Corbett"];

export default function DestinationHero({ searchQuery, setSearchQuery }) {
  const ref = useRef(null);
  const [inputVal, setInputVal] = useState(searchQuery);

  useEffect(() => {
    const els = ref.current?.querySelectorAll("[data-animate]");
    els?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(10px)"; // Smaller movement for "tighter" feel
      el.style.transition = `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s`;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 50);
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputVal);
  };

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center px-6 overflow-hidden bg-[#050505]"
    >
      {/* Background with subtle Ken Burns effect */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://wallpapercat.com/w/full/0/8/2/32198-3840x2160-desktop-4k-himalayas-background.jpg"
          className="w-full h-full object-cover scale-105 opacity-70"
          alt="Himalayas"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-[#050505]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 w-full text-center">
        
        <div data-animate className="flex items-center justify-center gap-2 mb-4">
            <Compass size={14} className="text-[#D4AF37] animate-pulse" />
            <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#D4AF37]/90">
                The Great Escape
            </span>
        </div>

        <h1
          data-animate
          className="text-5xl md:text-8xl font-light leading-[1] mb-4 text-white tracking-tight"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Seek <span className="italic font-normal text-[#D4AF37]">Solitude.</span>
        </h1>

        <p
          data-animate
          className="text-xs md:text-base leading-relaxed mb-8 max-w-lg mx-auto text-white/60 font-light"
        >
          Explore fifty-two curated sanctuaries nestled within the 
          <span className="text-white"> Eternal Himalayas.</span>
        </p>

        {/* Ultra-Slim Search Bar */}
        <form
          data-animate
          onSubmit={handleSearch}
          className="group flex flex-col sm:flex-row items-center gap-2 bg-white/[0.03] backdrop-blur-2xl rounded-2xl sm:rounded-full p-1.5 max-w-xl mx-auto mb-8 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all focus-within:border-[#D4AF37]/50 focus-within:bg-white/[0.08]"
        >
          <div className="flex items-center flex-1 w-full sm:w-auto">
            <div className="pl-4">
              <MapPin size={16} className="text-white/40 group-focus-within:text-[#D4AF37] transition-colors" />
            </div>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Where does your soul lead?..."
              className="flex-1 text-sm outline-none bg-transparent placeholder:text-white/20 text-white py-3 px-4 font-light"
            />
          </div>
          
          <button
            type="submit"
            className="w-full sm:w-auto px-10 py-3 rounded-xl sm:rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] active:scale-95 flex items-center justify-center gap-2"
            style={{ background: `linear-gradient(135deg, ${GOLD}, #B8962E)` }}
          >
            Find <Search size={14} />
          </button>
        </form>

        {/* Minimalist Tags */}
        <div data-animate className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 max-w-2xl">
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setInputVal(tag);
                  setSearchQuery(tag);
                }}
                className="text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-[#D4AF37] transition-all relative after:content-[''] after:absolute after:w-0 after:h-[1px] after:bg-[#D4AF37] after:left-0 after:-bottom-1 hover:after:w-full after:transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}