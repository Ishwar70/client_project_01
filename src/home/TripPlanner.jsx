import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const indianLocations = [
  { name: "Mumbai", state: "Maharashtra", type: "City" },
  { name: "New Delhi", state: "Delhi", type: "Metro" },
  { name: "Manali", state: "Himachal Pradesh", type: "Hill Station" },
  { name: "Munnar", state: "Kerala", type: "Hill Station" },
  { name: "Goa", state: "Goa", type: "Beach" },
  { name: "Jaipur", state: "Rajasthan", type: "Heritage" },
  { name: "Varanasi", state: "Uttar Pradesh", type: "Pilgrimage" },
  { name: "Rishikesh", state: "Uttarakhand", type: "Adventure" },
];

const tripTypes = ["All Types", "Pilgrimage", "Adventure", "Leisure", "Honeymoon", "Family"];
const budgetRanges = ["Any Budget", "Under ₹10k", "₹10k - ₹30k", "₹30k - ₹50k", "Luxury"];

export default function TripPlanner() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownRef = useRef(null);

  // Filter Logic
  const handleTyping = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      const filtered = indianLocations.filter(
        (loc) =>
          loc.name.toLowerCase().includes(value.toLowerCase()) ||
          loc.state.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowDropdown(true);
      setActiveIndex(-1);
    } else {
      setShowDropdown(false);
    }
  };

  // Keyboard Navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      selectLocation(suggestions[activeIndex]);
    }
  };

  const selectLocation = (loc) => {
    setSearchTerm(`${loc.name}, ${loc.state}`);
    setShowDropdown(false);
  };

  const inputClass = "w-full bg-[#FAFAF7] rounded-md px-3 py-2.5 text-xs text-gray-700 border-[0.5px] border-[#E5E0D5] outline-none focus:border-[#C9A84C] transition-all hover:bg-white";

  return (
    <section className="w-full bg-[#FAFAF7] py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl p-8 shadow-sm border-[0.5px] border-[#E5E0D5]">
        
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-2" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>
            Tailor Your <span style={{ color: GOLD }}>Indian Odyssey</span>
          </h2>
          <p className="text-gray-500 text-sm">Discover curated packages for your next destination.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          
          {/* Destination */}
          <div className="relative md:col-span-1" ref={dropdownRef}>
            <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Destination</label>
            <input
              type="text"
              placeholder="e.g. Kerala or Manali"
              className={inputClass}
              value={searchTerm}
              onChange={handleTyping}
              onKeyDown={handleKeyDown}
              onFocus={() => searchTerm && setShowDropdown(true)}
            />

            {showDropdown && suggestions.length > 0 && (
              <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-2xl max-h-60 overflow-y-auto">
                {suggestions.map((loc, index) => (
                  <li
                    key={index}
                    onClick={() => selectLocation(loc)}
                    className={`px-4 py-3 text-xs cursor-pointer border-b border-gray-50 flex justify-between items-center ${
                      activeIndex === index ? "bg-amber-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <div>
                      <span className="font-bold text-gray-800">{loc.name}</span>
                      <span className="text-gray-400 block text-[10px]">{loc.state}</span>
                    </div>
                    <span className="text-[9px] bg-gray-100 px-2 py-0.5 rounded text-gray-500">{loc.type}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Date Picker */}
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Travel Date</label>
            <input type="date" className={inputClass} min={new Date().toISOString().split("T")[0]} />
          </div>

          {/* Trip Type */}
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Experience</label>
            <select className={inputClass}>
              {tripTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Budget Filter - NEW FEATURE */}
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Budget (Per Person)</label>
            <select className={inputClass}>
              {budgetRanges.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          <button
            onClick={() => navigate("/search-results")}
            className="w-full py-2.5 rounded-md text-sm font-bold text-white transition-all hover:brightness-110 active:scale-95 shadow-md"
            style={{ background: GOLD }}
          >
            FIND PACKAGES →
          </button>
        </div>

        {/* Quick Filters / Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="text-[10px] text-gray-400 self-center mr-2">POPULAR:</span>
          {["Char Dham", "Kerala Backwaters", "Goa Beaches", "Ladakh Bike Trip"].map(tag => (
            <button key={tag} className="text-[10px] px-3 py-1 border border-gray-200 rounded-full hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors">
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}