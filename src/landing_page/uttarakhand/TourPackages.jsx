import React, { useState, useEffect } from 'react';
import BookingModal from "../../components/queryForm/Bookingmodal ";
import { getAllPackages } from "../../services/package.service";

const TourPackages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await getAllPackages("?limit=3");
        let data = res?.packages || res?.data || res || [];
        if (!Array.isArray(data)) data = [];
        setPackages(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState("");

  const openForm = (pkgName) => {
    setSelectedPkg(pkgName);
    setIsOpen(true);
  };

  return (
    <section className="py-10 bg-white font-sans">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mt-3">
            Discover Your Perfect <span className="text-[#D4AF37]">Uttarakhand Journey</span>
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-6"></div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div key={pkg._id || pkg.id || Math.random()} className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#D4AF37]/30 transition-all duration-500">
              
              {/* Image & Duration Badge */}
              <div className="relative h-64 overflow-hidden">
                <img src={pkg.image?.url || pkg.image || "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800"} alt={pkg.title || pkg.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-lg">
                  <p className="text-[10px] font-black text-gray-900 uppercase tracking-tighter">{pkg.duration || "2N/3D"}</p>
                </div>
              </div>

              {/* Package Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#D4AF37] transition-colors">{pkg.title || pkg.name}</h3>
                
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-gray-500 text-xs font-medium uppercase">Starting at</span>
                  <span className="text-2xl font-black text-[#D4AF37]">₹{pkg.price || "Contact Us"}</span>
                  <span className="text-gray-400 text-[10px] uppercase font-bold">/ Person</span>
                </div>

                <button 
                  onClick={() => openForm(pkg.title || pkg.name)}
                  className="w-full py-4 bg-gray-900 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-[#D4AF37] transition-all transform active:scale-95"
                >
                  Book Now
                </button>

                <p className="mt-4 text-[9px] text-gray-400 text-center italic leading-tight">
                  “This price is applicable only for a group of four persons.”
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Centralized Booking Modal */}
      <BookingModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title="Book Tour Package"
        subtitle={`Inquiry for: ${selectedPkg}`}
      />
    </section>
  );
};

export default TourPackages;