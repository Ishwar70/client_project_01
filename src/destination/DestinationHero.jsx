import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";

const GOLD = "#C9A84C";
const TEXT_DARK = "#1A1A1A";
const OFF_WHITE = "#FAFAF7";

const popularTags = [
  "Kedarnath",
  "Nainital",
  "Rishikesh",
  "Valley of Flowers",
  "Jim Corbett",
];

export default function DestinationHero({ searchQuery, setSearchQuery }) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [inputVal, setInputVal] = useState(searchQuery);

  useEffect(() => {
    const els = ref.current?.querySelectorAll("[data-animate]");
    els?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = `opacity 0.8s ease ${i * 0.12}s, transform 0.8s ease ${i * 0.12}s`;
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
      className="relative w-full py-16 md:py-24 px-6 md:px-16 lg:px-24 text-center overflow-hidden border-b border-gray-100"
      style={{ background: "#FFFFFF" }}
    >
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-[0.03]">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full" style={{ background: GOLD, filter: 'blur(100px)' }}></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Breadcrumb - Clean Style */}
        <div data-animate className="flex gap-2 justify-center items-center mb-8">
          <span
            className="text-[10px] tracking-[2px] uppercase font-bold cursor-pointer hover:text-[#C9A84C] transition-colors"
            style={{ color: "#A0A0A0" }}
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <span className="text-[10px]" style={{ color: "#DDD" }}>/</span>
          <span className="text-[10px] tracking-[2px] uppercase font-bold" style={{ color: GOLD }}>
            Destinations
          </span>
        </div>

        <span
          data-animate
          className="text-[11px] tracking-[5px] uppercase font-bold block mb-4"
          style={{ color: GOLD }}
        >
          Explore Uttarakhand
        </span>

        <h1
          data-animate
          className="text-4xl md:text-7xl font-light leading-tight mb-6"
          style={{ fontFamily: "'Georgia', serif", color: TEXT_DARK }}
        >
          Discover <span className="font-bold italic" style={{ color: GOLD }}>Sacred</span> Places
        </h1>

        <p
          data-animate
          className="text-base md:text-lg italic leading-relaxed mb-10 max-w-2xl mx-auto"
          style={{ color: "#666" }}
        >
          "50+ breathtaking destinations — from Himalayan peaks to serene lakes"
        </p>

        {/* Search bar - Luxury Floating Style */}
        <form
          data-animate
          onSubmit={handleSearch}
          className="flex items-center gap-2 bg-white rounded-full p-2 max-w-2xl mx-auto mb-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-50 group transition-all focus-within:shadow-[0_20px_50px_rgba(201,168,76,0.15)]"
        >
          <div className="pl-4">
            <MapPin size={18} style={{ color: GOLD }} />
          </div>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Where do you want to go?"
            className="flex-1 text-sm md:text-base outline-none bg-transparent placeholder:text-gray-300 text-gray-700 py-3 px-2 font-medium"
          />
          <button
            type="submit"
            className="px-8 md:px-10 py-3.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest text-white flex-shrink-0 transition-all hover:shadow-lg active:scale-95"
            style={{ background: `linear-gradient(135deg, ${GOLD}, #B8962E)` }}
          >
            Search
          </button>
        </form>

        {/* Popular quick tags - Pill Style */}
        <div data-animate className="flex flex-wrap gap-3 justify-center items-center">
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#A0A0A0" }}>
            Popular:
          </span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setInputVal(tag);
                setSearchQuery(tag);
              }}
              className="px-4 py-2 rounded-full text-[11px] font-bold transition-all border border-gray-100 hover:border-[#C9A84C] hover:text-[#C9A84C]"
              style={{ background: OFF_WHITE, color: "#888" }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}