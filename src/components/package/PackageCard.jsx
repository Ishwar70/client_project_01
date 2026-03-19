import React from 'react';

const PackageCard = ({ title, duration, rating, highlights, price }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-full border border-gray-100 transition-transform duration-300 hover:-translate-y-2">
      {/* Top Header Section */}
      <div className="bg-[#C4A036] p-6 text-white relative">
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold">
          <span className="text-yellow-300 text-sm">★</span> {rating}
        </div>
        <h3 className="text-2xl font-serif font-bold mb-2 leading-tight pr-12">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-sm opacity-90">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {duration}
        </div>
      </div>

      {/* Highlights Section */}
      <div className="p-6 flex-grow">
        <h4 className="text-[#0B1D48] font-bold text-sm uppercase tracking-widest mb-4 border-l-4 border-[#C4A036] pl-3">
          Package Highlights
        </h4>
        <ul className="space-y-2">
          {highlights.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
              <span className="text-[#C4A036] mt-1">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Pricing Section */}
      <div className="p-6 pt-0 mt-auto">
        <div className="border-t border-gray-100 pt-4 mb-4 flex justify-between items-end">
          <div>
            <p className="text-gray-400 text-xs uppercase font-bold tracking-tighter">Starting from</p>
            <p className="text-3xl font-black text-[#C4A036]">₹{price.toLocaleString()}</p>
            <p className="text-gray-400 text-[10px]">per person</p>
          </div>
          <div className="text-gray-300">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
             </svg>
          </div>
        </div>
        
        <button className="w-full bg-[#C4A036] hover:bg-[#b08f2e] text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          Send Enquiry
        </button>
      </div>
    </div>
  );
};

export default PackageCard;