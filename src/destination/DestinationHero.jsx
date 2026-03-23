import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

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
      el.style.transform = "translateY(22px)";
      el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 60);
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputVal);
  };

  return (
    <section
      ref={ref}
      style={{ background: NAVY }}
      className="w-full py-20 md:py-24 px-4 sm:px-8 md:px-16 lg:px-24 text-center"
    >
      <div className="max-w-3xl mx-auto">
        <span
          data-animate
          className="text-xs tracking-[3px] uppercase font-medium block mb-4"
          style={{ color: GOLD }}
        >
          Explore Uttarakhand
        </span>

        <h1
          data-animate
          className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight mb-4"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          <span className="text-white">Discover </span>
          <span style={{ color: GOLD }}>Sacred Destinations</span>
        </h1>

        <p
          data-animate
          className="text-sm italic leading-relaxed mb-8"
          style={{ color: "#8a9bbf" }}
        >
          "50+ breathtaking places — from Himalayan peaks to serene lakes"
        </p>

        {/* Search bar */}
        <form
          data-animate
          onSubmit={handleSearch}
          className="flex items-center gap-2 bg-white rounded-lg p-1.5 max-w-xl mx-auto mb-5"
          style={{ border: "0.5px solid #E5E0D5" }}
        >
          <Search size={15} color="#C9A84C" className="ml-2 flex-shrink-0" />
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Search destinations, regions..."
            className="flex-1 text-sm outline-none bg-transparent placeholder:text-gray-400 text-gray-700 py-1.5"
          />
          <button
            type="submit"
            className="px-5 py-2 rounded text-sm font-medium text-white flex-shrink-0 transition-opacity hover:opacity-90"
            style={{ background: GOLD }}
          >
            Search
          </button>
        </form>

        {/* Popular quick tags */}
        <div data-animate className="flex flex-wrap gap-2 justify-center items-center">
          <span className="text-xs" style={{ color: "#8a9bbf" }}>
            Popular:
          </span>
          {popularTags.map((tag, i) => (
            <span key={tag} className="flex items-center gap-1">
              <button
                onClick={() => {
                  setInputVal(tag);
                  setSearchQuery(tag);
                }}
                className="text-xs transition-opacity hover:opacity-70"
                style={{ color: GOLD }}
              >
                {tag}
              </button>
              {i < popularTags.length - 1 && (
                <span className="text-xs" style={{ color: "#8a9bbf" }}>·</span>
              )}
            </span>
          ))}
        </div>

        {/* Breadcrumb */}
        <div data-animate className="flex gap-2 justify-center items-center mt-6">
          <span
            className="text-xs cursor-pointer hover:underline"
            style={{ color: "#8a9bbf" }}
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <span className="text-xs" style={{ color: GOLD }}>›</span>
          <span className="text-xs" style={{ color: GOLD }}>Destination</span>
        </div>
      </div>
    </section>
  );
}
