import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDestinations } from "../services/destination.service";

const GOLD = "#C9A84C";
const TEXT_DARK = "#1A1A1A";
const ITEMS_PER_PAGE = 6;

export default function DestinationGrid({ searchQuery }) {
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        setError("");

        const params = searchQuery ? { search: searchQuery } : {};
        const res = await getAllDestinations(params);
        
        // Ensure we handle both Axios response structures
        const data = res.destinations || res.data?.destinations || [];
        
        setDestinations(data);
        setVisibleCount(ITEMS_PER_PAGE); 
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.response?.data?.message || "Failed to load destinations");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [searchQuery]);

  const addDefaultSrc = (ev) => {
    ev.target.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800";
  };

  // 1. Identify the featured destination
  const featuredDest = destinations.find((d) => d.featured);

  // 2. UPDATED LOGIC: 
  // We no longer filter out the featured destination from the grid.
  // This ensures all 4 data points show up in the card section.
  const gridItems = destinations;

  const visibleGridItems = gridItems.slice(0, visibleCount);
  const hasMore = visibleCount < gridItems.length;

  if (loading) return <div className="text-center py-20 text-gray-500 text-lg">Loading destinations...</div>;
  if (error) return <div className="text-center py-20 text-red-500 text-lg">{error}</div>;

  return (
    <section className="w-full bg-white px-6 md:px-16 lg:px-24 py-16">
      <div className="max-w-7xl mx-auto">
        
        {/* ⭐ Featured Hero Section */}
        {featuredDest && !searchQuery && (
          <div className="bg-white rounded-3xl overflow-hidden mb-12 grid grid-cols-1 lg:grid-cols-2 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
            <div className="h-87.5 lg:h-auto overflow-hidden bg-gray-100">
              <img
                src={featuredDest.image?.url}
                onError={addDefaultSrc}
                alt={featuredDest.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
            <div className="p-8 md:p-14 flex flex-col justify-center">
              <span className="text-[10px] tracking-[5px] uppercase font-bold mb-4" style={{ color: GOLD }}>
                ⭐ Featured
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: TEXT_DARK, fontFamily: "'Georgia', serif" }}>
                {featuredDest.name}
              </h2>
              <p className="text-gray-500 leading-relaxed mb-10 text-lg italic">"{featuredDest.description}"</p>
              
              <div className="grid grid-cols-3 gap-6 mb-10">
                <div className="text-center border-r border-gray-100">
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Altitude</p>
                  <p className="font-bold text-sm" style={{ color: TEXT_DARK }}>{featuredDest.altitude || "N/A"}</p>
                </div>
                <div className="text-center border-r border-gray-100">
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Best Time</p>
                  <p className="font-bold text-sm" style={{ color: TEXT_DARK }}>{featuredDest.bestTime || "N/A"}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Rating</p>
                  <p className="font-bold text-sm" style={{ color: GOLD }}>★ {featuredDest.rating || "4.5"}</p>
                </div>
              </div>
              
              <button
                onClick={() => navigate("/contact")}
                className="px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest text-white self-start transition-all hover:shadow-2xl active:scale-95"
                style={{ background: GOLD }}
              >
                Plan My Trip
              </button>
            </div>
          </div>
        )}

        {/* 📦 Grid - Will now show all 4 items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {visibleGridItems.map((d) => (
            <div key={d._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50 group">
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={d.image?.url}
                  onError={addDefaultSrc}
                  alt={d.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[2px] text-white shadow-lg" style={{ background: GOLD }}>
                  {d.category}
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold" style={{ color: TEXT_DARK }}>{d.name}</h3>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold" style={{ color: GOLD }}>★</span>
                    <span className="text-sm font-bold" style={{ color: TEXT_DARK }}>{d.rating || "4.5"}</span>
                  </div>
                </div>
                <p className="text-[10px] uppercase tracking-[3px] font-bold text-gray-300 mb-4">{d.region}</p>
                <p className="text-sm text-gray-500 line-clamp-2 mb-8 leading-relaxed italic">"{d.description}"</p>
                <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Season: {d.bestTime || "N/A"}</p>
                  <button
                    onClick={() => navigate(`/destinations/${d._id}`)}
                    className="text-[11px] font-bold uppercase tracking-widest transition-colors hover:text-black"
                    style={{ color: GOLD }}
                  >
                    Explore →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 🔽 Load More Button */}
        {hasMore && (
          <div className="text-center mt-20">
            <button
              onClick={() => setVisibleCount((v) => v + ITEMS_PER_PAGE)}
              className="px-12 py-4 rounded-full text-xs font-bold uppercase tracking-widest border border-gray-200 hover:bg-black hover:text-white transition-all duration-300 shadow-lg"
              style={{ color: TEXT_DARK }}
            >
              Discover More Places
            </button>
          </div>
        )}
      </div>
    </section>
  );
}