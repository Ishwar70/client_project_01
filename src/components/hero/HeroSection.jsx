import React from 'react';

const HeroSection = () => {
  return (
    // 'min-h-screen' ko badal kar 'min-h-[70vh]' ya 'h-[600px]' kar diya hai
    <div className="relative min-h-[70vh] md:min-h-[80vh] w-full font-sans overflow-hidden flex flex-col">
      
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000')`,
        }}
      >
        <div className="absolute inset-0 bg-black/20 lg:bg-transparent"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
           {/* Logo placeholder if needed */}
        </div>
        
        <button className="bg-white/20 p-2.5 rounded-full backdrop-blur-md text-white hover:bg-white/40 transition-all border border-white/10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </nav>

      {/* Hero Content - Padding kam kar di gayi hai height adjust karne ke liye */}
      <main className="relative z-10 flex-grow flex items-center max-w-7xl mx-auto px-6 md:px-12 w-full py-12 md:py-20">
        <div className="max-w-3xl text-left">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.1] mb-4 drop-shadow-lg">
            You Love to Travel <br className="hidden sm:block" />
            <span className="text-[#78C2C4]">We Make it Better</span>
          </h1>
          
          <p className="text-gray-100 text-lg md:text-xl font-medium mb-8 tracking-wide max-w-lg">
            Exceptional Offers & Trusted Partners for your next Uttarakhand adventure.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[#78C2C4] hover:bg-[#62b4b6] text-white font-bold py-3 px-8 rounded-xl shadow-2xl transition-all transform hover:scale-105 active:scale-95 tracking-widest uppercase text-sm text-center">
              Plan Your Trips
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HeroSection;