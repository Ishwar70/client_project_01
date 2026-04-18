import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Mountain, Calendar, ArrowRight, Gauge } from 'lucide-react';
import { getAllDestinations } from "../../services/destination.service";

const GOLD = "#C9A84C";

const ExploreDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const res = await getAllDestinations({ search: "South India", limit: 3 });
        let data = res?.destinations || res?.data || res || [];
        if (!Array.isArray(data)) data = [];
        setDestinations(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching destinations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  return (
    <section className="py-12 md:py-20 bg-[#FAFAF7] font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Simplified Header - Forced One Line */}
        <div className="text-center md:text-left mb-12 border-l-4 border-[#C9A84C] pl-6">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-none whitespace-nowrap overflow-hidden text-ellipsis">
            Discover Your Perfect <span className="text-[#C9A84C] italic">South India Journey</span>
          </h2>
          <p className="text-xs md:text-sm text-gray-400 mt-2 font-sans tracking-widest uppercase">Handpicked sanctuaries for the modern explorer</p>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="h-96 bg-gray-100 animate-pulse rounded-3xl" />
            ))
          ) : destinations.map((dest) => (
            <div 
              key={dest._id || Math.random()} 
              onClick={() => navigate(`/destinations/${dest._id}`)}
              className="group relative flex flex-col bg-white rounded-[3rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_40px_100px_-20px_rgba(201,168,76,0.15)] transition-all duration-700 cursor-pointer h-full"
            >
              {/* Visual masterpiece: Image Section */}
              <div className="relative h-64 w-full overflow-hidden">
                <img 
                  src={dest.image?.url || 'https://images.unsplash.com/photo-1590050752117-23a9d7f0b943?q=80&w=800'} 
                  alt={dest.name} 
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                />
                
                {/* Floating Glass Badges */}
                <div className="absolute top-6 left-6">
                  <span className="bg-black/30 backdrop-blur-md border border-white/20 text-white text-[9px] px-4 py-2 rounded-full uppercase font-black tracking-[0.2em] shadow-2xl">
                    {dest.category || "Discovery"}
                  </span>
                </div>

                <div className="absolute top-6 right-6 bg-white border border-gray-100 px-3 py-1.5 rounded-2xl flex items-center gap-2 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <Star size={12} fill={GOLD} color={GOLD} />
                  <span className="text-xs font-black text-gray-900">{dest.rating || "5.0"}</span>
                  <span className="text-[10px] text-gray-400 font-bold">({dest.numReviews || "120"})</span>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Narrative: Content Section */}
              <div className="p-10 flex flex-col flex-grow">
                <div className="mb-8">
                  <div className="flex items-center gap-2 text-[#C9A84C] text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                    <MapPin size={14} strokeWidth={3} />
                    {dest.city}, {dest.state}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 group-hover:text-[#C9A84C] transition-colors line-clamp-1 tracking-tight">
                    {dest.name}
                  </h3>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2 flex items-center gap-2 italic">
                    <span className="w-4 h-[1px] bg-gray-200" />
                    {dest.experience || "A unique heritage experience"}
                  </p>
                </div>

                <p className="text-xs text-gray-400 line-clamp-2 mb-10 leading-relaxed font-sans">
                  {dest.description}
                </p>

                {/* The Matrix: Info Bar */}
                <div className="grid grid-cols-3 gap-1 py-6 border-y border-gray-50 mb-10 font-sans">
                  <div className="flex flex-col items-center border-r border-gray-100 px-4">
                    <Mountain size={14} className="text-[#C9A84C] mb-2 opacity-50" />
                    <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest mb-1">Alt</p>
                    <p className="text-[10px] font-black text-gray-900">{dest.altitude || "N/A"}</p>
                  </div>
                  <div className="flex flex-col items-center border-r border-gray-100 px-4">
                    <Calendar size={14} className="text-[#C9A84C] mb-2 opacity-50" />
                    <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest mb-1">Season</p>
                    <p className="text-[10px] font-black text-gray-900">{dest.bestTime?.split(' ')[0] || "All Year"}</p>
                  </div>
                  <div className="flex flex-col items-center px-4">
                    <Gauge size={14} className="text-[#C9A84C] mb-2 opacity-50" />
                    <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest mb-1">Value</p>
                    <p className="text-[10px] font-black text-[#C9A84C]">₹{dest.budget?.toLocaleString()}</p>
                  </div>
                </div>

                {/* Refined Action */}
                <div className="mt-auto flex items-center justify-between group/link">
                  <span className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-900 group-hover/link:text-[#C9A84C] transition-colors font-sans">
                    Explore Sanctuary
                  </span>
                  <div className="w-12 h-12 rounded-full border border-gray-100 group-hover/link:bg-[#C9A84C] group-hover/link:border-[#C9A84C] flex items-center justify-center text-gray-900 group-hover/link:text-white transition-all transform group-hover/link:translate-x-2 shadow-sm">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreDestinations;
