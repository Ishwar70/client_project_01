import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative min-h-[600px] lg:min-h-[85vh] w-full flex items-center overflow-hidden font-sans">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=2000')`,
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 py-12 lg:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Typography - Optimized for Mobile First */}
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
            <div className="pt-2 md:pt-4">
              <button className="w-full sm:w-auto bg-[#C4A036] hover:bg-[#b08f2e] text-white font-bold py-3.5 px-10 rounded-full transition-all shadow-xl active:scale-95 tracking-wide text-sm md:text-base">
                Plan Your Journey
              </button>
            </div>
          </div>

          {/* Right Column: Glassmorphism Enquiry Form */}
          <div className="flex justify-center lg:justify-end w-full">
            <div className="w-full max-w-[450px] bg-white/95 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl shadow-2xl border border-white/20">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1e293b] mb-6 md:mb-8 relative">
                Quick Enquiry
                <span className="absolute bottom-[-6px] left-0 w-10 h-1 bg-[#C4A036] rounded-full" />
              </h2>
              
              <form className="space-y-4 md:space-y-5">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C4A036] transition-all bg-gray-50/50 text-sm md:text-base"
                />
                <input 
                  type="text" 
                  placeholder="Phone Number" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C4A036] transition-all bg-gray-50/50 text-sm md:text-base"
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C4A036] transition-all bg-gray-50/50 text-sm md:text-base"
                />
                <div className="relative">
                  <label className="block text-[9px] uppercase tracking-widest text-gray-400 mb-1 font-bold">Departure Date</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C4A036] transition-all bg-gray-50/50 text-gray-600 text-sm"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-[#C4A036] hover:bg-[#b08f2e] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg uppercase tracking-widest text-xs md:text-sm mt-2"
                >
                  Submit Enquiry
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