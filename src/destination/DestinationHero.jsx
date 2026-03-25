import { useEffect, useRef, useState } from "react";
import { Search, MapPin } from "lucide-react";

const GOLD = "#C9A84C";

const popularTags = [
  "Kedarnath", "Nainital", "Rishikesh", "Valley of Flowers", "Jim Corbett",
];

export default function DestinationHero({ searchQuery, setSearchQuery }) {
  const ref = useRef(null);
  const [inputVal, setInputVal] = useState(searchQuery);

  useEffect(() => {
    const els = ref.current?.querySelectorAll("[data-animate]");
    els?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = `opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${i * 0.12}s, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${i * 0.12}s`;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 100);
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputVal);
  };

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[85vh] md:min-h-[75vh] flex items-center justify-center px-4 md:px-6 overflow-hidden"
    >
      {/* Background with Zoom */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://wallpapercat.com/w/full/0/8/2/32198-3840x2160-desktop-4k-himalayas-background.jpg"
          className="w-full h-full object-cover scale-110 md:scale-105"
          alt="Himalayas"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/20 backdrop-blur-[0.5px]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 py-10 md:py-12 w-full">
        
        {/* Responsive Heading: smaller on mobile, massive on desktop */}
        <h1
          data-animate
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] mb-4 text-white drop-shadow-lg"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Discover <span className="font-bold italic text-[#D4AF37]">Sacred</span> Places
        </h1>

        <p
          data-animate
          className="text-sm md:text-lg italic leading-relaxed mb-8 md:mb-10 max-w-xl mx-auto text-white/80 font-light px-4"
        >
          50+ breathtaking destinations — from Himalayan peaks to serene lakes
        </p>

        {/* Search Bar: Stacks on mobile for better thumb-reach */}
        <form
          data-animate
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white/10 sm:bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-full p-2 max-w-2xl mx-auto mb-8 border border-white/20 shadow-2xl transition-all focus-within:bg-white/20"
        >
          <div className="flex items-center flex-1 px-3 sm:px-0">
            <div className="pl-2 sm:pl-5">
              <MapPin size={18} className="text-[#D4AF37]" />
            </div>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Search destination..."
              className="flex-1 text-sm md:text-base outline-none bg-transparent placeholder:text-white/40 text-white py-3 px-3 font-light"
            />
          </div>
          
          <button
            type="submit"
            className="w-full sm:w-auto px-8 md:px-10 py-3.5 sm:py-3 rounded-xl sm:rounded-full text-[11px] font-bold uppercase tracking-widest text-white transition-all hover:brightness-110 active:scale-95 flex items-center justify-center gap-2"
            style={{ background: `linear-gradient(135deg, ${GOLD}, #B8962E)` }}
          >
            Search <Search size={14} />
          </button>
        </form>

        {/* Popular Tags: Horizontal scroll on mobile if they overflow */}
        <div data-animate className="flex flex-col items-center gap-3 px-2">
          <span className="text-[9px] font-bold uppercase tracking-[2px] text-white/40">
            Trending Destinations
          </span>
          <div className="flex flex-wrap justify-center gap-2 max-w-md">
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setInputVal(tag);
                  setSearchQuery(tag);
                }}
                className="px-4 py-1.5 rounded-full text-[10px] font-medium transition-all border border-white/10 text-white/70 bg-white/5 backdrop-blur-sm active:bg-white active:text-black whitespace-nowrap"
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