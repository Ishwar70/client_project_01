import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDestinations } from "../services/destination.service";
import { XCircle, RefreshCw, ArrowRight, MapPin } from "lucide-react";

const GOLD = "#C9A84C";
const TEXT_DARK = "#1A1A1A";
const ITEMS_PER_PAGE = 6;

export default function DestinationGrid({ searchQuery, setSearchQuery }) {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);

  const fetchDestinations = useCallback(async (query = searchQuery) => {
    try {
      setLoading(true);
      const params = query?.trim() ? { search: query.trim() } : {};
      const res = await getAllDestinations(params);
      const fetchedData = res?.destinations || res?.data?.destinations || res?.data || [];
      setDestinations(Array.isArray(fetchedData) ? fetchedData : []);
      setVisibleCount(ITEMS_PER_PAGE);
    } catch (err) {
      console.error("Fetch Error:", err);
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  const handleReset = () => {
    setSearchQuery("");
    fetchDestinations("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white">
        <div className="relative">
          <RefreshCw className="animate-spin text-[#D4AF37]" size={28} />
          <div className="absolute inset-0 blur-sm bg-[#D4AF37]/20 animate-pulse rounded-full"></div>
        </div>
        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400">Refining Results...</p>
      </div>
    );
  }

  return (
    <section className="w-full bg-white px-6 md:px-12 py-10 min-h-[50vh]">
      <div className="max-w-7xl mx-auto">
        
        {destinations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-gray-100 rounded-3xl">
            <XCircle size={40} className="text-gray-200 mb-4" />
            <h3 className="text-2xl font-light mb-2 text-black" style={{ fontFamily: "'Georgia', serif" }}>
              No Sanctuaries Found
            </h3>
            <p className="text-gray-400 text-xs mb-6 max-w-xs">
              Your search for <span className="italic">"{searchQuery}"</span> didn't match any of our hidden gems.
            </p>
            <button 
              onClick={handleReset}
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-black text-white text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-[#D4AF37] transition-all active:scale-95"
            >
              <RefreshCw size={12} /> Reset Discovery
            </button>
          </div>
        ) : (
          <>
            {searchQuery && (
              <div className="mb-8 flex justify-between items-end border-b border-gray-50 pb-6">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">Discovery</span>
                  <h2 className="text-xl font-bold mt-1">Found in "{searchQuery}"</h2>
                </div>
                <button 
                  onClick={handleReset}
                  className="text-[9px] font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
                >
                  Clear <XCircle size={12} />
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.slice(0, visibleCount).map((d) => (
                <div 
                  key={d._id} 
                  className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] cursor-pointer"
                  onClick={() => navigate(`/destinations/${d._id}`)}
                >
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={d.image?.url} 
                      alt={d.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter text-white backdrop-blur-md bg-black/30 border border-white/20">
                      {d.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-1 text-[#D4AF37] mb-1">
                      <MapPin size={10} />
                      <span className="text-[9px] uppercase tracking-widest font-bold">{d.region}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1A1A1A] leading-tight mb-2 group-hover:text-[#D4AF37] transition-colors">
                      {d.name}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2 italic font-light mb-4 leading-relaxed">
                      "{d.description}"
                    </p>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                      <span className="text-[9px] font-bold text-gray-300 uppercase tracking-tighter">
                         {d.altitude}
                      </span>
                      <div className="text-[9px] font-black uppercase tracking-widest flex items-center gap-1 group-hover:gap-3 transition-all" style={{ color: GOLD }}>
                        Explore <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < destinations.length && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setVisibleCount(v => v + ITEMS_PER_PAGE)}
                  className="px-10 py-3 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] border border-gray-200 text-gray-400 hover:border-black hover:text-black transition-all active:scale-95"
                >
                  Load More Sanctuaries
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}