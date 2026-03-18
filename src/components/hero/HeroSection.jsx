import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen w-full font-sans overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.4), transparent), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
         

        <button className="bg-white/20 p-2 rounded-full backdrop-blur-sm text-white hover:bg-white/30 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-32 pb-48">
        <div className="max-w-2xl">
          <h1 className="text-white text-6xl md:text-7xl font-serif font-bold leading-tight mb-6">
            You Love to Travel <br />
            We Make it Better
          </h1>
          <p className="text-white text-xl font-medium mb-10 tracking-wide">
            Exceptional Offers & Trusted Partners
          </p>
          <button className="bg-[#78C2C4] hover:bg-[#66b1b3] text-white font-bold py-4 px-10 rounded-lg shadow-xl transition transform hover:scale-105 tracking-widest uppercase text-sm">
            Plan Your Trips
          </button>
        </div>
      </main>

      {/* Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-24 text-white fill-current">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.43,147.3,126,221.33,112.48,273.65,102.9,303.8,76.58,321.39,56.44Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;