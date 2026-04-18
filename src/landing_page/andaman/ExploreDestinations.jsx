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
        const res = await getAllDestinations({ search: "Andaman", limit: 3 });
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
            Discover Your Perfect <span className="text-[#C9A84C] italic">Andaman Journey</span>
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
              className="group flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:border-[#C9A84C]/20 transition-all duration-500 cursor-pointer"
            >
              {/* Image Section - Compact Height */}
              <div className="relative h-48 md:h-52 w-full overflow-hidden">
                <img 
                  src={dest.image?.url || 'https://images.unsplash.com/photo-1589136142550-c2d378000ad2?q=80&w=800'} 
                  alt={dest.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Overlay Badges */}
                <div className="absolute top-4 left-4">
                  <span className="bg-[#C9A84C] text-white text-[9px] px-3 py-1 rounded-full uppercase font-bold tracking-widest shadow-lg">
                    {dest.category || "Destinations"}
                  </span>
                </div>

                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <Star size={10} fill={GOLD} color={GOLD} />
                  <span className="font-bold">{dest.rating || "5.0"}</span>
                  <span className="text-white/60 font-medium">({dest.numReviews || "120"})</span>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content Section - Streamlined */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                  <div className="flex items-center gap-1.5 text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest mb-1.5">
                    <MapPin size={10} />
                    {dest.city}, {dest.state}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 group-hover:text-[#C9A84C] transition-colors line-clamp-1">
                    {dest.name}
                  </h3>
                  <p className="text-[10px] text-gray-400 font-medium italic mt-1">
                    {dest.experience || "A pristine island experience"}
                  </p>
                </div>

                <p className="text-xs text-gray-500 line-clamp-2 mb-6 leading-relaxed font-sans">
                  {dest.description}
                </p>

                {/* Info Bar - Compact */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-50 mb-6 font-sans">
                  <div className="flex flex-col items-center border-r border-gray-100">
                    <Mountain size={12} className="text-gray-300 mb-1" />
                    <p className="text-[9px] font-bold text-gray-900">{dest.altitude || "N/A"}</p>
                  </div>
                  <div className="flex flex-col items-center border-r border-gray-100">
                    <Calendar size={12} className="text-gray-300 mb-1" />
                    <p className="text-[9px] font-bold text-gray-900">{dest.bestTime?.split(' ')[0] || "All Year"}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Gauge size={12} className="text-gray-300 mb-1" />
                    <p className="text-[9px] font-black text-[#C9A84C]">₹{dest.budget?.toLocaleString()}</p>
                  </div>
                </div>

                {/* Action Link */}
                <div className="mt-auto flex items-center justify-between group/link">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 group-hover/link:text-[#C9A84C] transition-colors">
                    Explore Sanctuary
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gray-900 group-hover/link:bg-[#C9A84C] flex items-center justify-center text-white transition-all transform group-hover/link:translate-x-1">
                    <ArrowRight size={14} />
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
