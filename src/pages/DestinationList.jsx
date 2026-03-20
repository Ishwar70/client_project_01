import React, { useState } from 'react';
import { MapPin, Star, ArrowRight, Compass } from 'lucide-react';

const DestinationCard = ({ image, title, location, rating, price, tagline, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-0.5 rounded-[20px] transition-all duration-500 ease-out animate-fade-up"
      style={{
        background: hovered
          ? 'linear-gradient(135deg, #f59e0b, #d97706, #fbbf24, #92400e, #f59e0b)'
          : 'linear-gradient(135deg, rgba(245,158,11,0.3), rgba(217,119,6,0.1), rgba(251,191,36,0.2))',
        backgroundSize: '300% 300%',
        animation: hovered ? 'gradientShift 2s ease infinite' : 'none',
        boxShadow: hovered
          ? '0 0 30px rgba(245,158,11,0.5), 0 20px 40px rgba(0,0,0,0.15)'
          : '0 4px 20px rgba(0,0,0,0.06)',
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div className="bg-[#fffdf7] rounded-[18px] overflow-hidden h-full flex flex-col">
        {/* Image Section */}
        <div className="relative aspect-square overflow-hidden group">
          <img 
            src={image} 
            alt={title} 
            className={`w-full h-full object-cover transition-transform duration-700 ${hovered ? 'scale-110' : 'scale-100'}`}
          />
          <div className="absolute inset-0 bg-linear-to-t from-[rgba(15,10,0,0.75)] via-transparent to-transparent" />
          
          <div className="absolute top-3.5 left-3.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm text-[11px] font-semibold text-gray-900 font-sans">
            <Star size={12} className="fill-amber-500 text-amber-500" />
            {rating}
          </div>
          
          <h3 className="absolute bottom-4 left-4 right-4 font-serif text-3xl font-light text-white leading-tight">
            {title}
          </h3>
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col grow">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px w-7 bg-linear-to-r from-amber-500 to-transparent" />
            <span className="text-[9px] tracking-[3px] uppercase font-medium text-amber-700 font-sans">
              {location}
            </span>
            <div className="h-px w-7 bg-linear-to-l from-amber-500 to-transparent" />
          </div>

          <p className="font-serif italic text-sm text-gray-400 mb-4 grow leading-relaxed">
            "{tagline}"
          </p>

          <div className="pt-4 border-t border-amber-500/10 flex items-center justify-between">
            <div>
              <div className="text-[9px] uppercase tracking-widest text-gray-400 mb-0.5 font-sans">Starts from</div>
              <div className="font-serif text-2xl text-gray-900">₹{price}</div>
            </div>
            
            <button className="h-11 w-11 rounded-full border-1.5 border-amber-500/40 flex items-center justify-center text-amber-600 transition-all duration-300 hover:bg-linear-to-br hover:from-amber-500 hover:to-amber-600 hover:border-transparent hover:text-white hover:shadow-lg hover:shadow-amber-500/40 active:scale-95">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DestinationList = () => {
  const destinations = [
    { title: "Rishikesh", location: "Uttarakhand", rating: "4.9", price: "15,500", tagline: "The Yoga Capital of the World", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=600" },
    { title: "Mussoorie", location: "Uttarakhand", rating: "4.8", price: "12,000", tagline: "The Queen of Hills", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=600" },
    { title: "Auli", location: "Uttarakhand", rating: "4.9", price: "18,500", tagline: "India's Premier Skiing Destination", image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=600" },
    { title: "Nainital", location: "Uttarakhand", rating: "4.7", price: "14,000", tagline: "The City of Lakes", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTdaPErAqEuVkauRFdicYKTUr9qgkz7vNxMw&s" },
    { title: "Valley of Flowers", location: "Uttarakhand", rating: "5.0", price: "22,000", tagline: "A UNESCO World Heritage Site", image: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?q=80&w=600" },
    { title: "Jim Corbett", location: "Uttarakhand", rating: "4.6", price: "19,000", tagline: "Wilderness at its Best", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=600" },
  ];

  return (
    <div className="bg-linear-to-br from-[#fefdf8] via-[#fffbef] to-[#fef9f0] min-h-screen py-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-14 bg-linear-to-r from-transparent to-amber-500" />
            <Compass size={22} className="text-amber-500" />
            <div className="h-px w-14 bg-linear-to-l from-transparent to-amber-500" />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-gray-900 mb-4">
            Popular <span className="text-amber-600 italic">Destinations</span>
          </h1>
          <p className="text-gray-400 text-sm tracking-wider max-w-sm mx-auto leading-relaxed">
            Experience the divine beauty of Uttarakhand through our curated luxury escapes.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, i) => (
            <DestinationCard key={i} {...dest} index={i} />
          ))}
        </div>

        <div className="text-center mt-20">
          <button className="bg-linear-to-r from-amber-500 to-amber-700 text-white text-[11px] font-medium uppercase tracking-[3px] px-11 py-4 rounded-full shadow-xl shadow-amber-500/30 transition-transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/40 active:scale-95">
            View All Packages
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationList;