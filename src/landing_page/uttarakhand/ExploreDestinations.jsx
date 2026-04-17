import React from 'react';

const destinations = [
  {
    _id: "1",
    name: "Kedarnath",
    altitude: "3,583 m",
    bestTime: "May - Oct",
    budget: "₹15,000+",
    category: "Pilgrimage",
    image: { url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800' },
    description: "Experience the divine energy at one of the holiest Himalayan shrines.",
  },
  {
    _id: "2",
    name: "Nainital",
    altitude: "2,084 m",
    bestTime: "March - June",
    budget: "₹8,000+",
    category: "Lakeside",
    image: { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdx-1RmdlV5WIurdAQJq7-6rXupNCnKJmcxA&s' },
    description: "The pearly lake of the Himalayas surrounded by lush green mountains.",
  },
  {
    _id: "3",
    name: "Rishikesh",
    altitude: "340 m",
    bestTime: "Sept - April",
    budget: "₹6,000+",
    category: "Adventure",
    image: { url: 'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?q=80&w=800' },
    description: "The world capital of Yoga and the ultimate hub for river rafting.",
  }
];

const ExploreDestinations = () => {
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
              key={dest._id} 
              className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:border-[#D4AF37]/50 hover:shadow-[0_10px_30px_-15px_rgba(212,175,55,0.3)] transition-all duration-500"
            >
              {/* Image Section */}
              <div className="relative h-56 w-full overflow-hidden">
                <img 
                  src={dest.image.url} 
                  alt={dest.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#D4AF37] text-white text-[10px] px-3 py-1 rounded-full uppercase font-black tracking-widest shadow-lg">
                    {dest.category}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-6 leading-relaxed italic">
                    "{dest.description}"
                  </p>
                </div>

                {/* Stats Bar */}
                <div className="flex items-center justify-between py-4 border-y border-gray-50 bg-gray-50/50 px-2 rounded-lg">
                  <div className="text-center">
                    <p className="text-[10px] text-gray-400 uppercase font-black">Alt</p>
                    <p className="text-xs font-bold text-gray-800">{dest.altitude}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-gray-400 uppercase font-black">Season</p>
                    <p className="text-xs font-bold text-gray-800">{dest.bestTime}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-gray-400 uppercase font-black">Starts At</p>
                    <p className="text-xs font-black text-[#D4AF37]">{dest.budget}</p>
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