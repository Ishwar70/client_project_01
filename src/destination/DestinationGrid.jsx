import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const TEXT_DARK = "#1A1A1A";

const destinations = [
  {
    id: 1,
    name: "Kedarnath Temple",
    category: "Pilgrimage",
    region: "Garhwal",
    rating: "4.9",
    altitude: "3,583m",
    bestTime: "May–Jun",
    description: "One of the 12 Jyotirlingas, nestled in the Garhwal Himalayas. A pilgrimage that transforms the soul.",
    featured: true,
    img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 2,
    name: "Nainital Lake",
    category: "Hill Stations",
    region: "Kumaon",
    rating: "4.7",
    altitude: "2,084m",
    bestTime: "Mar–Jun",
    description: "The emerald lake city of Uttarakhand — perfect for boating, cable car rides & peaceful walks.",
    featured: false,
    img: "https://images.unsplash.com/photo-1610714176001-50e30f16f396?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Rishikesh",
    category: "Adventure",
    region: "Garhwal",
    rating: "4.8",
    altitude: "372m",
    bestTime: "Oct–Mar",
    description: "Yoga capital of the world — river rafting, bungee jumping & the iconic Laxman Jhula.",
    featured: false,
    img: "https://images.unsplash.com/photo-1598971861713-54ad16a7e71e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    name: "Mussoorie",
    category: "Hill Stations",
    region: "Garhwal",
    rating: "4.6",
    altitude: "2,005m",
    bestTime: "Apr–Jun",
    description: "Queen of Hills — stunning Himalayan views, Kempty Falls & Lal Tibba viewpoint.",
    featured: false,
    img: "https://images.unsplash.com/photo-1622308644391-e19c961e6074?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    name: "Valley of Flowers",
    category: "Adventure",
    region: "Chamoli",
    rating: "4.9",
    altitude: "3,658m",
    bestTime: "Jul–Aug",
    description: "UNESCO World Heritage site — a paradise of 300+ Himalayan wildflowers blooming.",
    featured: false,
    img: "https://images.unsplash.com/photo-1589710330043-e6691459a933?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    name: "Jim Corbett",
    category: "Wildlife",
    region: "Nainital",
    rating: "4.8",
    altitude: "400m",
    bestTime: "Nov–Jun",
    description: "India's oldest national park — home to Bengal tigers, leopards and 600+ bird species.",
    featured: false,
    img: "https://images.unsplash.com/photo-1581007871115-f14bc016e0a4?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 7,
    name: "Badrinath",
    category: "Pilgrimage",
    region: "Chamoli",
    rating: "4.9",
    altitude: "3,133m",
    bestTime: "May–Jun",
    description: "Sacred Char Dham shrine Lord Vishnu's holy abode surrounded by snow peaks.",
    featured: false,
    img: "https://images.unsplash.com/photo-1621685368453-248100806950?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 8,
    name: "Auli Skiing",
    category: "Adventure",
    region: "Chamoli",
    rating: "4.7",
    altitude: "2,519m",
    bestTime: "Dec–Mar",
    description: "India's premier ski destination — breathtaking slopes with panoramic views of Nanda Devi.",
    featured: false,
    img: "https://images.unsplash.com/photo-1616428751509-026639556819?auto=format&fit=crop&q=80&w=800",
  },
];

const ITEMS_PER_PAGE = 6;

export default function DestinationGrid({ searchQuery }) {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Simple handle for broken images
  const addDefaultSrc = (ev) => {
    ev.target.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800";
  };

  const filtered = destinations.filter((d) => {
    const matchSearch = !searchQuery || 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      d.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSearch;
  });

  const featuredDest = filtered.find((d) => d.featured);
  const rest = filtered.filter((d) => !d.featured);
  const visibleRest = rest.slice(0, visibleCount);
  const hasMore = visibleCount < rest.length;

  return (
    <section className="w-full bg-white px-6 md:px-16 lg:px-24 py-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Featured Wide Card */}
        {featuredDest && !searchQuery && (
          <div className="bg-white rounded-3xl overflow-hidden mb-12 grid grid-cols-1 lg:grid-cols-2 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
            <div className="h-[350px] lg:h-auto overflow-hidden bg-gray-100">
              <img 
                src={featuredDest.img} 
                onError={addDefaultSrc}
                alt={featuredDest.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" 
              />
            </div>
            <div className="p-8 md:p-14 flex flex-col justify-center">
              <span className="text-[10px] tracking-[5px] uppercase font-bold mb-4" style={{ color: GOLD }}>⭐ Featured</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: TEXT_DARK, fontFamily: "'Georgia', serif" }}>{featuredDest.name}</h2>
              <p className="text-gray-500 leading-relaxed mb-10 text-lg italic">"{featuredDest.description}"</p>
              
              <div className="grid grid-cols-3 gap-6 mb-10">
                <div className="text-center border-r border-gray-100">
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Altitude</p>
                  <p className="font-bold text-sm" style={{ color: TEXT_DARK }}>{featuredDest.altitude}</p>
                </div>
                <div className="text-center border-r border-gray-100">
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Best Time</p>
                  <p className="font-bold text-sm" style={{ color: TEXT_DARK }}>{featuredDest.bestTime}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Rating</p>
                  <p className="font-bold text-sm" style={{ color: GOLD }}>★ {featuredDest.rating}</p>
                </div>
              </div>

              <button 
                onClick={() => navigate("/contact")}
                className="px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest text-white self-start transition-all hover:shadow-2xl active:scale-95" 
                style={{ background: GOLD }}
              >
                Plan My Pilgrimage
              </button>
            </div>
          </div>
        )}

        {/* Grid View */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {visibleRest.map((d) => (
            <div key={d.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50 group">
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img 
                  src={d.img} 
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
                    <span className="text-sm font-bold" style={{ color: TEXT_DARK }}>{d.rating}</span>
                  </div>
                </div>
                <p className="text-[10px] uppercase tracking-[3px] font-bold text-gray-300 mb-4">{d.region}</p>
                <p className="text-sm text-gray-500 line-clamp-2 mb-8 leading-relaxed italic">"{d.description}"</p>
                
                <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Season: {d.bestTime}</p>
                   <button 
                    onClick={() => navigate("/packages")} 
                    className="text-[11px] font-bold uppercase tracking-widest transition-colors hover:text-black" 
                    style={{ color: GOLD }}
                   >
                    Explore Tours →
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="text-center mt-20">
            <button
              onClick={() => setVisibleCount((v) => v + ITEMS_PER_PAGE)}
              className="px-12 py-4 rounded-full text-xs font-bold uppercase tracking-widest border border-gray-200 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
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