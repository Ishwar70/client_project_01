import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDestinations } from "../services/destination.service";
import { XCircle, RefreshCw, ArrowRight, MapPin, Search } from "lucide-react";

const GOLD = "#C9A84C";
const ITEMS_PER_PAGE = 6;

export default function DestinationGrid({ searchQuery, setSearchQuery }) {
  const navigate = useNavigate();
  const [allDestinations, setAllDestinations] = useState([]); // Store master list
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);

  // 1. Fetch All Data Once (or whenever master refresh is needed)
  const fetchDestinations = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllDestinations();
      const fetchedData = res?.destinations || res?.data?.destinations || res?.data || [];
      setAllDestinations(Array.isArray(fetchedData) ? fetchedData : []);
    } catch (err) {
      console.error("Fetch Error:", err);
      setAllDestinations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  // 2. Client-side Filter Logic (Name, Description, Category)
  const filteredDestinations = useMemo(() => {
    if (!searchQuery?.trim()) return allDestinations;
    
    const query = searchQuery.toLowerCase().trim();
    return allDestinations.filter((d) => 
      d.name?.toLowerCase().includes(query) || 
      d.description?.toLowerCase().includes(query) ||
      d.category?.toLowerCase().includes(query) ||
      d.region?.toLowerCase().includes(query)
    );
  }, [searchQuery, allDestinations]);

  // Reset search and scroll to top
  const handleReset = () => {
    setSearchQuery("");
    setVisibleCount(ITEMS_PER_PAGE);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white">
        <RefreshCw className="animate-spin text-[#D4AF37]" size={28} />
        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400">Curating Experiences...</p>
      </div>
    );
  }

  return (
    <section className="w-full bg-white px-6 md:px-12 py-10 min-h-[60vh]">
      <div className="max-w-7xl mx-auto">
        
        {/* NO DATA FOUND STATE */}
        {filteredDestinations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-50 rounded-[40px] bg-gray-50/30">
            <div className="bg-white p-6 rounded-full shadow-sm mb-6">
               <Search size={40} className="text-gray-200" />
            </div>
            <h3 className="text-3xl font-light mb-3 text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
              No Results for "{searchQuery}"
            </h3>
            <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
              We couldn't find any sanctuaries matching your criteria. Try adjusting your search or explore our entire collection.
            </p>
            <button 
              onClick={handleReset}
              className="flex items-center gap-3 px-10 py-4 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#D4AF37] transition-all hover:shadow-lg active:scale-95"
            >
              <RefreshCw size={14} /> View All Destinations
            </button>
          </div>
        ) : (
          <>
            {/* ACTIVE FILTER HEADER */}
            {searchQuery && (
              <div className="mb-10 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-100 pb-8">
                <div className="text-center sm:text-left">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">Search Results</span>
                  <h2 className="text-2xl font-bold mt-1 text-gray-900">Showing destinations for "{searchQuery}"</h2>
                </div>
                <button 
                  onClick={handleReset}
                  className="group text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-all flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full"
                >
                  Clear Filter <XCircle size={14} className="group-hover:rotate-90 transition-transform" />
                </button>
              </div>
            )}

            {/* GRID LAYOUT */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.slice(0, visibleCount).map((d) => (
                <div 
                  key={d._id} 
                  className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] cursor-pointer"
                  onClick={() => navigate(`/destinations/${d._id}`)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={d.image?.url} 
                      alt={d.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                    <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-white backdrop-blur-md bg-white/20 border border-white/30">
                      {d.category}
                    </div>
                  </div>

                  <div className="p-7">
                    <div className="flex items-center gap-2 text-[#D4AF37] mb-2">
                      <MapPin size={12} />
                      <span className="text-[10px] uppercase tracking-[0.2em] font-black">{d.region}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#D4AF37] transition-colors leading-tight">
                      {d.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 font-light mb-6 leading-relaxed">
                      {d.description}
                    </p>
                    
                    <div className="flex justify-between items-center pt-5 border-t border-gray-50">
                      <div className="flex flex-col">
                        <span className="text-[8px] uppercase text-gray-400 tracking-tighter">Altitude</span>
                        <span className="text-xs font-bold text-gray-900">{d.altitude || 'N/A'}</span>
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all" style={{ color: GOLD }}>
                        Explore <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* LOAD MORE */}
            {visibleCount < filteredDestinations.length && (
              <div className="text-center mt-16">
                <button
                  onClick={() => setVisibleCount(v => v + ITEMS_PER_PAGE)}
                  className="px-12 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] border border-gray-200 text-gray-500 hover:border-black hover:text-black transition-all hover:bg-gray-50 active:scale-95"
                >
                  Load More Discoveries
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}