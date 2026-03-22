import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, ArrowRight, Compass, Eye, CalendarCheck } from 'lucide-react';

const DestinationCard = ({ image, title, location, rating, price, tagline, index, slug }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-0.5 rounded-[20px] transition-all duration-500 ease-out"
      style={{
        background: hovered
          ? 'linear-gradient(135deg, #D4AF37, #F9F6EE, #FFD700, #FFFFFF, #D4AF37)'
          : 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(255,255,255,0.5), rgba(212,175,55,0.1))',
        backgroundSize: '300% 300%',
        animation: hovered ? 'gradientShift 2s ease infinite' : 'none',
        boxShadow: hovered
          ? '0 0 30px rgba(212,175,55,0.3), 0 20px 40px rgba(0,0,0,0.1)'
          : '0 4px 20px rgba(0,0,0,0.03)',
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div className="bg-white rounded-[18px] overflow-hidden h-full flex flex-col">
        {/* Image Section */}
        <div className="relative aspect-square overflow-hidden group">
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-700 ${hovered ? 'scale-110' : 'scale-100'}`}
          />
          <div className="absolute inset-0 bg-linear-to-t from-[rgba(0,0,0,0.6)] via-transparent to-transparent" />

          <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm text-[11px] font-semibold text-gray-900 font-sans">
            <Star size={12} className="fill-[#D4AF37] text-[#D4AF37]" />
            {rating}
          </div>

          <h3 className="absolute bottom-4 left-4 right-4 font-serif text-3xl font-light text-white leading-tight">
            {title}
          </h3>
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col grow bg-white">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px w-7 bg-linear-to-r from-[#D4AF37] to-transparent" />
            <span className="text-[9px] tracking-[3px] uppercase font-medium text-[#B8860B] font-sans">
              {location}
            </span>
            <div className="h-px w-7 bg-linear-to-l from-[#D4AF37] to-transparent" />
          </div>

          <p className="font-serif italic text-sm text-gray-500 mb-4 grow leading-relaxed">
            "{tagline}"
          </p>

          {/* Price Row */}
          <div className="pt-4 border-t border-[#D4AF37]/10 flex items-center justify-between mb-4">
            <div>
              <div className="text-[9px] uppercase tracking-widest text-gray-400 mb-0.5 font-sans">Starts from</div>
              <div className="font-serif text-2xl text-[#222]">₹{price}</div>
            </div>

            {/* Old arrow button kept as a subtle accent */}
            <div className="h-8 w-8 rounded-full border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]/40">
              <ArrowRight size={14} />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-2.5">
            {/* See More */}
            <button
              onClick={() => navigate(`/destinations`)}
              className="flex-1 flex items-center justify-center gap-1.5 h-10 rounded-full border border-[#D4AF37]/50 text-[#B8860B] text-[10px] font-semibold uppercase tracking-[1.5px] font-sans transition-all duration-300 hover:bg-[#FFFBEF] hover:border-[#D4AF37] hover:shadow-sm active:scale-95"
            >
              <Eye size={13} />
              See More
            </button>

            {/* Book Now */}
            <button
              onClick={() => navigate(`/destinations/${slug}`)}
              className="flex-1 flex items-center justify-center gap-1.5 h-10 rounded-full bg-[#D4AF37] text-white text-[10px] font-semibold uppercase tracking-[1.5px] font-sans shadow-md transition-all duration-300 hover:bg-[#B8860B] hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
            >
              <CalendarCheck size={13} />
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DestinationList = () => {
  const navigate = useNavigate();

  const destinations = [
    { title: "Rishikesh", location: "Uttarakhand", rating: "4.9", price: "15,500", tagline: "The Yoga Capital of the World", slug: "rishikesh", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=600" },
    { title: "Mussoorie", location: "Uttarakhand", rating: "4.8", price: "12,000", tagline: "The Queen of Hills", slug: "mussoorie", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=600" },
    { title: "Auli", location: "Uttarakhand", rating: "4.9", price: "18,500", tagline: "India's Premier Skiing Destination", slug: "auli", image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=600" },
    { title: "Nainital", location: "Uttarakhand", rating: "4.7", price: "14,000", tagline: "The City of Lakes", slug: "nainital", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTdaPErAqEuVkauRFdicYKTUr9qgkz7vNxMw&s" },
    { title: "Valley of Flowers", location: "Uttarakhand", rating: "5.0", price: "22,000", tagline: "A UNESCO World Heritage Site", slug: "valley-of-flowers", image: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?q=80&w=600" },
    { title: "Jim Corbett", location: "Uttarakhand", rating: "4.6", price: "19,000", tagline: "Wilderness at its Best", slug: "jim-corbett", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=600" },
  ];

  return (
    <div className="bg-[#FFFCF7] min-h-screen py-20 px-6 font-sans">
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-14 bg-linear-to-r from-transparent to-[#D4AF37]" />
            <Compass size={22} className="text-[#D4AF37]" />
            <div className="h-px w-14 bg-linear-to-l from-transparent to-[#D4AF37]" />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-gray-900 mb-4">
            Popular <span className="text-[#D4AF37] italic">Destinations</span>
          </h1>
          <p className="text-gray-500 text-sm tracking-wider max-w-sm mx-auto leading-relaxed uppercase">
            Curated Luxury Escapes
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, i) => (
            <DestinationCard key={i} {...dest} index={i} />
          ))}
        </div>

        <div className="text-center mt-20">
          <button
            onClick={() => navigate('/destinations')}
            className="bg-white border border-[#D4AF37] text-[#B8860B] text-[11px] font-medium uppercase tracking-[3px] px-11 py-4 rounded-full shadow-md transition-all hover:bg-[#D4AF37] hover:text-white hover:-translate-y-1 active:scale-95"
          >
            More Destinations
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationList;