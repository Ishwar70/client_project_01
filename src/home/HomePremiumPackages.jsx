import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingModal from "../components/queryForm/Bookingmodal "; 

const GOLD = "#C9A84C";
const WHITE = "#FFFFFF";
const TEXT_DARK = "#2D2D2D";
const OFF_WHITE = "#FCFBFA";

const packages = [
  {
    rating: "4.9",
    duration: "10 Days",
    title: "Divine Char Dham Yatra",
    includes: ["Kedarnath", "Badrinath", "VIP Darshan", "All Meals"],
    price: "₹45,000",
  },
  {
    rating: "4.8",
    duration: "7 Days",
    title: "Adventure Seeker Trek",
    includes: ["River Rafting", "Camping", "All Gear", "Instructors"],
    price: "₹32,000",
  },
  {
    rating: "4.7",
    duration: "5 Days",
    title: "Hill Station Retreat",
    includes: ["Nainital", "Mussoorie", "Luxury Stay", "Boating"],
    price: "₹25,000",
  },
];

export default function HomePremiumPackages() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleEnquire = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  return (
    <section className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-16 md:py-20" style={{ background: OFF_WHITE }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs tracking-[3px] uppercase font-medium block mb-2" style={{ color: GOLD }}>
              Exclusive Selection
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold" style={{ color: TEXT_DARK, fontFamily: "'Georgia', serif" }}>
              Premium <span style={{ color: GOLD }}>Packages</span>
            </h2>
          </div>
          <button
            onClick={() => navigate("/packages")}
            className="text-sm font-medium px-5 py-2.5 rounded self-start sm:self-auto transition-all hover:opacity-80 shrink-0"
            style={{ border: `1.5px solid ${GOLD}`, color: GOLD }}
          >
            View All →
          </button>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.title}
              className="bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              style={{ border: "0.5px solid #E5E0D5" }}
            >
              {/* Card Top: Gold Banner */}
              <div className="px-5 py-5" style={{ background: GOLD }}>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-[10px] font-bold text-white/90 tracking-wider">
                    ★ {pkg.rating} RATING
                  </p>
                  <p className="text-[10px] font-bold text-white/90 tracking-wider">
                    {pkg.duration}
                  </p>
                </div>
                <h3 className="text-lg font-semibold text-white leading-tight">{pkg.title}</h3>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>
                  What's Included
                </p>
                <div className="grid grid-cols-2 gap-y-2 mb-5">
                  {pkg.includes.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="text-[10px]" style={{ color: GOLD }}>✔</span> {item}
                    </div>
                  ))}
                </div>
                
                <div className="w-full mb-5" style={{ height: "1px", background: "#F0EBE3" }} />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-medium">Starts from</p>
                    <p className="text-xl font-bold" style={{ color: TEXT_DARK }}>
                      {pkg.price}
                    </p>
                  </div>
                  <button
                    onClick={() => handleEnquire(pkg)}
                    className="text-xs font-bold px-5 py-2.5 rounded text-white transition-transform active:scale-95 shadow-md"
                    style={{ 
                      background: GOLD,
                      boxShadow: `0 4px 10px -2px ${GOLD}66` 
                    }}
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal Component */}
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        packageData={selectedPackage}
        title="Custom Package Inquiry"
        submitLabel="Request Details"
      />
    </section>
  );
}