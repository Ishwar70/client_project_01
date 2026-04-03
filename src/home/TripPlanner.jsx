import { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

const GOLD = "#C9A84C";
const tripTypes = ["All Types", "Adventure", "Pilgrimage", "Wildlife", "Hill Station", "Custom"];

export default function TripPlanner() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tripType, setTripType] = useState("All Types");
  const [travellers, setTravellers] = useState(1); // Default to 1

  const handleSearch = () => {
    const params = {
      destinationName: searchTerm,
      fromDate: startDate,
      toDate: endDate,
      tripType: tripType === "All Types" ? "" : tripType,
      travellers: travellers,
    };

    // Filter out empty values
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== "" && v !== null)
    );

    // Navigate to packages with search query
    navigate({
      pathname: "/packages",
      search: `?${createSearchParams(cleanParams)}`,
    });
  };

  const inputClass = "w-full bg-[#FAFAF7] rounded-md px-3 py-2.5 text-xs text-gray-700 border-[0.5px] border-[#E5E0D5] outline-none focus:border-[#C9A84C] transition-all";
  const labelClass = "text-[10px] uppercase font-bold text-gray-400 mb-1 block";

  return (
    <section className="w-full bg-[#FAFAF7] py-12 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-[#E5E0D5]">
        
        <h2 
          className="text-3xl font-serif mb-8 font-bold text-center" 
          style={{ color: GOLD }}
        >
          Find your Perfect Journey
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end">
          {/* Destination */}
          <div>
            <label className={labelClass}>Destination</label>
            <input 
              type="text" 
              placeholder="Where to?" 
              className={inputClass} 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>

          {/* From */}
          <div>
            <label className={labelClass}>From</label>
            <input 
              type="date" 
              className={inputClass} 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
            />
          </div>

          {/* To */}
          <div>
            <label className={labelClass}>To</label>
            <input 
              type="date" 
              className={inputClass} 
              value={endDate} 
              min={startDate} 
              onChange={(e) => setEndDate(e.target.value)} 
            />
          </div>

          {/* Travellers - CHANGED TO MANUAL INPUT */}
          <div>
            <label className={labelClass}>Travellers</label>
            <input 
              type="number" 
              min="1" 
              className={inputClass} 
              placeholder="No. of People"
              value={travellers} 
              onChange={(e) => setTravellers(e.target.value)} 
            />
          </div>

          {/* Trip Type */}
          <div>
            <label className={labelClass}>Trip Type</label>
            <select className={inputClass} value={tripType} onChange={(e) => setTripType(e.target.value)}>
              {tripTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Search Button */}
          <button 
            onClick={handleSearch} 
            className="w-full py-2.5 rounded-md text-[11px] font-bold text-white shadow-md transition-transform active:scale-95" 
            style={{ background: GOLD }}
          >
            FIND PACKAGES →
          </button>
        </div>
      </div>
    </section>
  );
}