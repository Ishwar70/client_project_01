import React, { useState, useEffect } from 'react';
import { Star, MapPin, Clock, Users, ArrowRight, Hotel, UtensilsCrossed, Bus, Compass } from 'lucide-react';
import BookingModal from "../../components/queryForm/Bookingmodal ";
import { getAllPackages } from "../../services/package.service";

const GOLD = "#C9A84C";

const TourPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState("");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const res = await getAllPackages("search=Goa&limit=3");
        let data = res?.packages || res?.data || res || [];
        if (!Array.isArray(data)) data = [];
        setPackages(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const openForm = (pkgName) => {
    setSelectedPkg(pkgName);
    setIsOpen(true);
  };

  const AmenityIcon = ({ name }) => {
    const lower = name.toLowerCase();
    if (lower.includes('hotel') || lower.includes('stay')) return <Hotel size={12} />;
    if (lower.includes('food') || lower.includes('meal') || lower.includes('breakfast')) return <UtensilsCrossed size={12} />;
    if (lower.includes('transfer') || lower.includes('travel') || lower.includes('cab')) return <Bus size={12} />;
    return <Compass size={12} />;
  };

  return (
    <section className="py-12 md:py-24 bg-[#FCFCFA] font-sans overflow-hidden relative">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C9A84C]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
            Curated <span className="text-[#C9A84C] italic">Goa</span> Experiences
          </h2>
          <div className="w-16 h-1 bg-[#C9A84C] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
             [1, 2, 3].map(i => <div key={i} className="h-80 bg-gray-50 animate-pulse rounded-[2.5rem]" />)
          ) : packages.map((pkg) => {
            const startDate = pkg.fromDate ? new Date(pkg.fromDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : "Dec 20";
            const duration = pkg.duration || "4N/5D";
            
            return (
              <div key={pkg._id || Math.random()} className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-[0_0_40px_-15px_rgba(201,168,76,0.1)] border border-white hover:shadow-[0_0_60px_-10px_rgba(201,168,76,0.25)] transition-all duration-700 flex flex-col h-full transform hover:-translate-y-2">
                
                {/* Compact Image Section */}
                <div className="relative h-44 overflow-hidden">
                  <img 
                    src={pkg.image?.url || pkg.image || "https://images.unsplash.com/photo-1512757776214-26d36777b513?q=80&w=800"} 
                    alt={pkg.title} 
                    className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" 
                  />
                  
                  {/* Floating Elements */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#C9A84C]/90 backdrop-blur-md text-white text-[8px] px-3 py-1 rounded-full uppercase font-black tracking-widest shadow-lg">
                      {pkg.tripType || "Beach"}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xl">
                    <Star size={10} fill={GOLD} color={GOLD} />
                    <span className="text-[10px] font-black text-white">{pkg.rating || "4.8"}</span>
                  </div>
                </div>

                {/* Content Section - Compact & Elegant */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-1.5 text-[#C9A84C] text-[9px] font-black uppercase tracking-[0.2em] mb-3">
                    <MapPin size={10} strokeWidth={3} />
                    {pkg.city}, {pkg.state || "Goa"}
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 group-hover:text-[#C9A84C] transition-colors leading-tight line-clamp-1">
                    {pkg.title}
                  </h3>

                  {/* Compact Info Badges */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100">
                      <Clock size={10} className="text-[#C9A84C]" />
                      <span className="text-[9px] font-black text-gray-600 uppercase">{duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100">
                      <Users size={10} className="text-[#C9A84C]" />
                      <span className="text-[9px] font-black text-gray-600 uppercase">Next: {startDate}</span>
                    </div>
                  </div>

                  {/* Bottom Strip: Pricing & CTA */}
                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div>
                      <p className="text-[8px] text-gray-400 font-black uppercase mb-1">Starting At</p>
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-xl font-black text-gray-900">₹{pkg.price?.toLocaleString()}</span>
                        <span className="text-[8px] text-gray-400 font-bold">/PP</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => openForm(pkg.title)}
                      className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-[#C9A84C] transition-all transform active:scale-90 shadow-lg shadow-gray-200"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BookingModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title="Reserve Your Journey"
        subtitle={`Enquiry for: ${selectedPkg}`}
      />
    </section>
  );
};

export default TourPackages;
