import React from 'react';
import { ShieldCheck, MapPin, Settings2, Headphones } from 'lucide-react';
// Reusable Stat Component for the bottom bar
const StatCount = ({ number, label }) => (
  <div className="text-center px-4">
    <div className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
      {number}
    </div>
    <p className="text-gray-100 text-[11px] md:text-xs font-bold uppercase tracking-widest leading-tight mt-1 px-1">
      {label}
    </p>
  </div>
);

// Child component for each feature card
const FeatureCard = ({ Icon, title, description, animationDelay }) => {
  return (
    <div 
      className="relative group perspective-1000 w-full animate-fade-up"
      style={{ animationDelay: `${animationDelay}s`, animationFillMode: 'both' }}
    >
      {/* Subtle Radial Glow (Behind the card) - on hover */}
      <div className="absolute -inset-10 bg-gradient-to-r from-cyan-400/30 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-10 transition duration-1000 group-hover:duration-200 blur-2xl"></div>
      
      {/* Main Glass Container - Lift and Shadow on hover */}
      <div className="relative h-full flex flex-col p-8 bg-white border border-gray-100 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_20px_60px_-10px_rgba(198,158,61,0.25)] hover:border-[#A6883F]/30 hover:scale-[1.02] overflow-hidden">
        
        {/* Border Beam Animation Layer - Subtle Gold */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-[#A6883F]/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-border-beam transition duration-500" />

        {/* 3. The Icon and Floating Orbit */}
        <div className="relative z-10 w-20 h-20 mb-8 mx-auto flex items-center justify-center">
            {/* Spinning background orbit (on hover) */}
            <div className={`absolute inset-0 rounded-full border border-dashed border-[#9A7B2C]/30 opacity-0 group-hover:opacity-100 group-hover:animate-[spin_10s_linear_infinite]`}></div>
            
            {/* Solid Gold Icon Backing - Pulsing Ring */}
            <div className="relative w-16 h-16 rounded-2xl bg-[#C69E3D] flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 shadow-[0_10px_30px_rgba(198,158,61,0.3)]">
                {Icon}
            </div>
        </div>

        {/* 4. Text Content Section */}
        <div className="relative z-10 text-center flex-grow flex flex-col items-center">
          <h4 className="text-xl font-serif font-bold text-[#0B1D48] tracking-tight mb-3 group-hover:text-cyan-950 transition duration-300">
            {title}
          </h4>
          <p className="text-gray-600 text-[13px] font-medium leading-relaxed max-w-[280px]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const WhyChooseUs = () => {
  const chooseData = [
    {
      Icon: <ShieldCheck className="w-8 h-8 text-white" />,
      title: "Trusted Travel Partner",
      description: "Over 15 years of excellence in creating memorable journeys across Uttarakhand.",
      animationDelay: 0 // No delay for first card
    },
    {
      Icon: <MapPin className="w-8 h-8 text-white" />,
      title: "Expert Local Guides",
      description: "Experienced and certified guides who know every trail and temple intimately.",
      animationDelay: 0.2 // Slightly delay second card
    },
    {
      Icon: <Settings2 className="w-8 h-8 text-white" />,
      title: "Customized Itineraries",
      description: "Tailor-made tours designed to match your preferences and travel style.",
      animationDelay: 0.4
    },
    {
      Icon: <Headphones className="w-8 h-8 text-white" />,
      title: "24/7 Priority Support",
      description: "Round-the-clock assistance from a dedicated team to ensure a seamless experience.",
      animationDelay: 0.6
    }
  ];

  return (
    <section className="py-24 px-6 md:px-10 bg-white relative overflow-hidden flex flex-col items-center">
      {/* Backdrop Accent (Optional, for premium depth) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#A6883F]/5 blur-[150px] opacity-40"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header - Staggered Fade Up */}
        <div className="text-center mb-20">
          <span className="text-gray-400 font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-3 block animate-fade-up animation-delay-0">
            Your journey, perfected
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-black text-[#0B1D48] leading-tight drop-shadow-sm animate-fade-up animation-delay-100">
            Why Choose <span className="text-[#C69E3D] relative inline-block">
              Us
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#C69E3D]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
              </svg>
            </span>
          </h2>
          <div className="w-24 h-1.5 bg-[#A6883F] mx-auto mt-6 rounded-full opacity-40 animate-fade-up animation-delay-200" />
          <p className="text-gray-500 text-sm md:text-lg max-w-xl mx-auto mt-8 leading-relaxed font-medium font-sans drop-shadow-sm animate-fade-up animation-delay-300">
            Your perfect travel companion for unforgettable Uttarakhand experiences
          </p>
        </div>

        {/* Top Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20 pt-10 px-2 lg:px-0">
          {chooseData.map((item, index) => (
            <div key={index}>
              <FeatureCard {...item} />
            </div>
          ))}
        </div>

        {/* Bottom Gold Stats Bar */}
        <div className="relative z-20 mt-24 flex items-center justify-center">
           {/* Shadow base layer */}
           <div className="absolute inset-x-8 top-1/2 h-[72px] bg-[#A6883F]/80 rounded-full blur-[40px] opacity-40 animate-pulse"></div>

           <div className="relative flex items-center justify-around gap-y-4 md:gap-x-1 py-8 px-10 md:px-16 w-full max-w-[1000px] bg-gradient-to-r from-[#A6883F] to-[#C69E3D] rounded-full shadow-[0_20px_80px_rgba(166,136,63,0.35)] animate-fade-up animation-delay-800">
              <StatCount number="15+" label="Years Experience" />
              <div className="h-10 w-0 border-r border-white/20 hidden md:block" />
              <StatCount number="10K+" label="Happy Travelers" />
              <div className="h-10 w-0 border-r border-white/20 hidden md:block" />
              <StatCount number="50+" label="Destinations" />
              <div className="h-10 w-0 border-r border-white/20 hidden md:block" />
              <StatCount number="100%" label="Satisfaction" />
           </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;