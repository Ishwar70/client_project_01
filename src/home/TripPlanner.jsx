import { useState, useRef, useEffect } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { getAllDestinations } from "../services/destination.service"; 

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const tripTypes = ["All Types", "Adventure", "Pilgrimage", "Wildlife", "Hill Stations", "Custom"];
const budgetRanges = [
  { label: "Any Budget", min: 0, max: 1000000 },
  { label: "Under ₹10k", min: 0, max: 10000 },
  { label: "₹10k - ₹30k", min: 10000, max: 30000 },
  { label: "₹30k - ₹50k", min: 30000, max: 50000 },
  { label: "Luxury", min: 50000, max: 1000000 },
];

export default function TripPlanner() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [experience, setExperience] = useState("All Types");
  const [budgetIdx, setBudgetIdx] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Live Suggestions Logic
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.length > 1) {
        const res = await getAllDestinations({ search: searchTerm, limit: 5 });
        setSuggestions(res.destinations || []);
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // 🔥 THE FIX: Navigate to /search instead of /destinations
  const handleSearch = () => {
    const selectedBudget = budgetRanges[budgetIdx];
    const params = {
      search: searchTerm,
      experience: experience === "All Types" ? "" : experience,
      minBudget: selectedBudget.min,
      maxBudget: selectedBudget.max,
    };

    // Remove empty values for a clean URL
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== "" && v !== null)
    );

    navigate({
      pathname: "/search", 
      search: `?${createSearchParams(cleanParams)}`,
    });
  };

  const inputClass = "w-full bg-[#FAFAF7] rounded-md px-3 py-2.5 text-xs text-gray-700 border-[0.5px] border-[#E5E0D5] outline-none focus:border-[#C9A84C] transition-all";

  return (
    <section className="w-full bg-[#FAFAF7] py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-[#E5E0D5]">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="relative md:col-span-1" ref={dropdownRef}>
            <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Destination</label>
            <input type="text" placeholder="Where to?" className={inputClass} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            {showDropdown && suggestions.length > 0 && (
              <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden">
                {suggestions.map((loc) => (
                  <li key={loc._id} onClick={() => { setSearchTerm(loc.name); setShowDropdown(false); }} className="px-4 py-3 text-xs cursor-pointer hover:bg-amber-50 border-b border-gray-50 last:border-none">
                    <span className="font-bold">{loc.name}</span> <span className="text-gray-400 text-[10px] block">{loc.region}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Date</label>
            <input type="date" className={inputClass} />
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Experience</label>
            <select className={inputClass} value={experience} onChange={(e) => setExperience(e.target.value)}>
              {tripTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Budget</label>
            <select className={inputClass} value={budgetIdx} onChange={(e) => setBudgetIdx(e.target.value)}>
              {budgetRanges.map((b, i) => <option key={b.label} value={i}>{b.label}</option>)}
            </select>
          </div>
          <button onClick={handleSearch} className="w-full py-2.5 rounded-md text-sm font-bold text-white transition-all active:scale-95 shadow-md" style={{ background: GOLD }}>
            FIND PACKAGES →
          </button>
        </div>
      </div>
    </section>
  );
}