import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative min-h-[700px] lg:min-h-[90vh] w-full flex items-center overflow-hidden font-sans">
      {/* 1. Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=2000')`,
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* 2. Content Grid Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 py-12 lg:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT SIDE: Text Content */}
          <div className="text-left text-white space-y-4 md:space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight drop-shadow-md">
              Explore the <br className="hidden sm:block" />
              Beauty of <br />
              <span className="text-[#C4A036]">Uttarakhand</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-md leading-relaxed drop-shadow-sm">
              Discover pristine mountains, sacred temples, and unforgettable 
              adventures in the lap of the Himalayas.
            </p>
            <div className="hidden lg:flex items-center gap-4 pt-4">
               <div className="h-1 w-20 bg-[#C4A036] rounded-full"></div>
               <p className="text-sm uppercase tracking-widest font-bold">Best Travel Agency</p>
            </div>
          </div>

          {/* RIGHT SIDE: Integrated Enquiry Form */}
          <div className="flex justify-center lg:justify-end w-full">
            <div className="w-full max-w-[480px] bg-white rounded-[32px] p-6 sm:p-8 md:p-10 shadow-2xl border border-white/20 relative">
              
              {/* Form Header */}
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1e293b] mb-1">
                  Quick Enquiry
                </h2>
                <div className="h-1 w-12 bg-[#C4A036] rounded-full mb-3"></div>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Fill in the details to get a custom quote for your trip.
                </p>
              </div>

              {/* Form Fields */}
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="w-full px-5 py-3 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C4A036] transition-all bg-gray-50/50 text-sm"
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full px-5 py-3 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C4A036] transition-all bg-gray-50/50 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Phone Number" 
                    className="w-full px-5 py-3 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C4A036] transition-all bg-gray-50/50 text-sm"
                  />
                  <input 
                    type="text" 
                    placeholder="Destination" 
                    className="w-full px-5 py-3 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C4A036] transition-all bg-gray-50/50 text-sm"
                  />
                </div>

                <div className="relative">
                  <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1 ml-1 font-bold">Traveling Date</label>
                  <input 
                    type="date" 
                    className="w-full px-5 py-3 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C4A036] transition-all bg-gray-50/50 text-gray-500 text-sm"
                  />
                </div>

                <textarea 
                  rows="2"
                  placeholder="Special requirements (e.g. number of people)..." 
                  className="w-full px-5 py-3 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C4A036] transition-all bg-gray-50/50 text-sm resize-none"
                ></textarea>
                
                <button 
                  type="submit" 
                  className="w-full bg-[#C4A036] hover:bg-[#b08f2e] text-white font-bold py-4 rounded-2xl transition-all shadow-lg text-lg active:scale-95 uppercase tracking-widest"
                >
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;