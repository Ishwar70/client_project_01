import { useEffect, useRef, useState } from "react";
import { Search, MapPin, Compass, Loader2 } from "lucide-react";

const GOLD = "#C9A84C";

export default function DestinationHero({ searchQuery, setSearchQuery }) {
  const ref = useRef(null);
  const dropdownRef = useRef(null); // Ref to detect clicks outside
  const [inputVal, setInputVal] = useState(searchQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Sync with global state (e.g., when clearing search)
  useEffect(() => {
    setInputVal(searchQuery);
  }, [searchQuery]);

  // Handle clicks outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Entrance Animations
  useEffect(() => {
    const els = ref.current?.querySelectorAll("[data-animate]");
    els?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(10px)";
      el.style.transition = `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s`;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 50);
    });
  }, []);

  // API Fetch with Debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (inputVal.length > 2) {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${inputVal}&limit=5`
          );
          const data = await response.json();
          setSuggestions(data);
          setShowDropdown(true);
        } catch (error) {
          console.error("Geocoding error:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [inputVal]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setSearchQuery(inputVal);
    setShowDropdown(false);
  };

  const selectSuggestion = (display_name) => {
    setInputVal(display_name);
    setSearchQuery(display_name);
    setShowDropdown(false);
  };

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[50vh] md:min-h-[60vh] flex items-center justify-center px-6 overflow-visible bg-[#050505]"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://wallpapercat.com/w/full/0/8/2/32198-3840x2160-desktop-4k-himalayas-background.jpg"
          className="w-full h-full object-cover scale-105 opacity-60"
          alt="Himalayas"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/20 to-[#050505]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-20 w-full text-center">
        <div data-animate className="flex items-center justify-center gap-2 mb-4">
          <Compass size={14} className="text-[#D4AF37] animate-pulse" />
          <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#D4AF37]/90">
            The Great Escape
          </span>
        </div>

        <h1
          data-animate
          className="text-5xl md:text-7xl font-light leading-[1.1] mb-8 text-white tracking-tight"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Seek <span className="italic font-normal text-[#D4AF37]">Solitude.</span>
        </h1>

        {/* Search Wrapper */}
        <div className="relative max-w-xl mx-auto w-full" data-animate ref={dropdownRef}>
          <form
            onSubmit={handleSearch}
            className="group relative z-30 flex flex-col sm:flex-row items-center gap-2 bg-white/5 backdrop-blur-2xl rounded-2xl sm:rounded-full p-1.5 border border-white/10 shadow-2xl transition-all focus-within:border-[#D4AF37]/50"
          >
            <div className="flex items-center flex-1 w-full">
              <div className="pl-4">
                {isLoading ? (
                  <Loader2 size={16} className="text-[#D4AF37] animate-spin" />
                ) : (
                  <MapPin size={16} className="text-white/40" />
                )}
              </div>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onFocus={() => inputVal.length > 2 && setShowDropdown(true)}
                placeholder="Where does your soul lead?..."
                className="flex-1 text-sm outline-none bg-transparent placeholder:text-white/20 text-white py-3 px-4 font-light"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-10 py-3 rounded-xl sm:rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all active:scale-95 flex items-center justify-center gap-2"
              style={{ background: `linear-gradient(135deg, ${GOLD}, #B8962E)` }}
            >
              Find <Search size={14} />
            </button>
          </form>

          {/* Suggestions Dropdown - Positioned Downwards */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#111] border border-white/10 rounded-2xl overflow-hidden z-100 text-left shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-top-2 duration-200">
              {suggestions.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => selectSuggestion(item.display_name)}
                  className="w-full px-5 py-4 text-xs text-white/70 hover:text-white hover:bg-white/5 flex items-start gap-3 transition-colors border-b border-white/5 last:border-0"
                >
                  <MapPin size={14} className="text-[#D4AF37] mt-0.5 shrink-0" />
                  <span className="truncate leading-tight">
                    {item.display_name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}