import React, { useState, useEffect } from 'react';
import { getAllDestinations } from "../../services/destination.service";

const ExploreDestinations = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await getAllDestinations({ limit: 3 });
        let data = res?.destinations || res?.data || res || [];
        console.log(data)
        if (!Array.isArray(data)) data = [];
        setDestinations(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };
    fetchDestinations();
  }, []);

  return (
    <section className="py-10 bg-[#f8f8f8] font-sans">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-l-4 border-[#D4AF37] pl-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mt-1">
              Explore Popular <span className="text-[#D4AF37]">Destinations</span>
            </h2>
          </div>
          <button className="text-xs font-black uppercase tracking-widest border-b-2 border-[#D4AF37] pb-1 hover:bg-[#D4AF37] hover:text-white px-2 transition-all duration-300">
            View All Places →
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <div 
              key={dest._id || Math.random()} 
              className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:border-[#D4AF37]/50 hover:shadow-[0_10px_30px_-15px_rgba(212,175,55,0.3)] transition-all duration-500"
            >
              {/* Image Section */}
              <div className="relative h-56 w-full overflow-hidden">
                <img 
                  src={dest.image?.url || dest.image || 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800'} 
                  alt={dest.name || dest.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#D4AF37] text-white text-[10px] px-3 py-1 rounded-full uppercase font-black tracking-widest shadow-lg">
                    {dest.category || "Destinations"}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {dest.name || dest.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-6 leading-relaxed italic">
                    "{dest.description || dest.about || 'Experience the beauty of this amazing destination.'}"
                  </p>
                </div>

                {/* Stats Bar */}
                <div className="flex items-center justify-between py-4 border-y border-gray-50 bg-gray-50/50 px-2 rounded-lg">
                  <div className="text-center">
                    <p className="text-[10px] text-gray-400 uppercase font-black">Alt</p>
                    <p className="text-xs font-bold text-gray-800">{dest.altitude || "N/A"}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-gray-400 uppercase font-black">Season</p>
                    <p className="text-xs font-bold text-gray-800">{dest.bestTime || "Year Round"}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-gray-400 uppercase font-black">Starts At</p>
                    <p className="text-xs font-black text-[#D4AF37]">{dest.budget || dest.price || "₹5,000+"}</p>
                  </div>
                </div>

                <button className="mt-6 w-full py-3 bg-gray-900 group-hover:bg-[#D4AF37] text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-xl transition-all duration-300 transform group-hover:translate-y-[-2px]">
                  Check Itinerary
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreDestinations;