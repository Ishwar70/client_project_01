import React from 'react';
import FeatureCard from './FeatureCard';
import StatCircle from './StatCircle';

const WhyTravelMagica = () => {
  const features = [
    { 
      title: "35000+ Worldwide Service Partners", 
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800", 
      icon: "https://cdn-icons-png.flaticon.com/512/814/814513.png" 
    },
    { 
      title: "100% Trusted Tour Agency", 
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800", 
      icon: "https://cdn-icons-png.flaticon.com/512/1162/1162951.png" 
    },
    { 
      title: "9+ Years of Travel Experience", 
      image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&q=80&w=800", 
      icon: "https://cdn-icons-png.flaticon.com/512/3125/3125848.png" 
    },
    { 
      title: "Friendly Yet Professional Staff", 
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800", 
      icon: "https://cdn-icons-png.flaticon.com/512/1256/1256650.png" 
    },
  ];

  const stats = [
    { value: "75000+", label: "Travel Customer Processed", colorClass: "text-cyan-400" },
    { value: "100+", label: "Destinations", colorClass: "text-purple-400" },
    { value: "11000+", label: "Guest Travelled", colorClass: "text-lime-400" },
    { value: "4.2+", label: "Ratings", colorClass: "text-blue-400" },
  ];

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto bg-white font-sans overflow-hidden">
      {/* Header Section */}
      <div className="text-center mb-10 sm:mb-16 relative">
        <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">Travel Specials</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0B1D48] mt-2 sm:mt-3 leading-tight">
          Why Uttarakhand Travel Magica?
        </h2>
        
        {/* Decorative dots grid (Hidden on mobile for cleaner look) */}
        <div className="absolute -top-4 right-0 hidden lg:grid grid-cols-5 gap-2 opacity-20">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-[#0B1D48] rounded-full" />
          ))}
        </div>
      </div>

      {/* Features Grid - 1 col on mobile, 2 on tablet, 4 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 sm:mb-20">
        {features.map((f, i) => (
          <FeatureCard key={i} {...f} />
        ))}
      </div>

      {/* Elegant Divider */}
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-12" />

      {/* Stats Grid - 2 cols on mobile, 4 on desktop with tighter gap on mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 md:gap-12">
        {stats.map((s, i) => (
          <StatCircle key={i} {...s} />
        ))}
      </div>
    </section>
  );
};

export default WhyTravelMagica;