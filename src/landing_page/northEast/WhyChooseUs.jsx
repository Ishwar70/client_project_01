import React from 'react';
import { ShieldCheck, Clock, MapPin, Wallet, Settings, Headphones } from 'lucide-react';

const WhyChooseUs = () => {
  const advantages = [
    {
      icon: <Settings size={32} />,
      title: "Tailor-Made Itineraries",
      desc: "Your trip, your pace. We customize every package to fit your specific budget and travel style perfectly."
    },
    {
      icon: <Wallet size={32} />,
      title: "Competitive Pricing",
      desc: "Get the most competitive prices on South India tours without compromising on quality or comfort."
    },
    {
      icon: <MapPin size={32} />,
      title: "Complete Management",
      desc: "We handle everything—from luxury houseboat bookings to temple permits and private transport."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Trusted Local Expertise",
      desc: "With years of expertise, we ensure every tour is well-planned and executed with local insight."
    },
    {
      icon: <Clock size={32} />,
      title: "Safe & Reliable Travel",
      desc: "Verified accommodations and professional drivers ensure a safe, smooth, and relaxing journey."
    },
    {
      icon: <Headphones size={32} />,
      title: "24/7 Concierge Support",
      desc: "Our dedicated team is always available to assist you before, during, and after your trip."
    }
  ];

  return (
    <section className="py-10 bg-gradient-to-b from-gray-50 to-white font-sans overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          
          {/* Left Side: Content */}
          <div className="lg:w-2/5 text-left relative">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
              Why Choose <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-[#D4AF37]">The Trip Trails</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-[#D4AF37]/10 -z-0"></span>
              </span>
              <br /> for Your Journey?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-md">
              We combine affordability, customization, and expert planning to deliver unforgettable travel experiences. Every detail is managed so you can focus on the memories.
            </p>
            <button className="group relative px-8 py-4 bg-gray-900 text-white font-bold rounded-xl overflow-hidden transition-all hover:pr-12">
              <span className="relative z-10 uppercase text-xs tracking-[0.2em]">Learn More</span>
              <div className="absolute right-0 top-0 h-full w-0 group-hover:w-full bg-[#D4AF37] transition-all duration-300"></div>
            </button>
          </div>

          {/* Right Side: Grid */}
          <div className="lg:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {advantages.map((item, index) => (
              <div 
                key={index} 
                className="p-8 bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(212,175,55,0.15)] hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="mb-6 w-14 h-14 flex items-center justify-center bg-gray-50 text-[#D4AF37] rounded-2xl group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-500 transform group-hover:rotate-[10deg]">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-600 transition-colors">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Trust Bar */}
        <div className="mt-12 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex flex-wrap justify-center gap-6 md:gap-8">
            {[
              { label: "Happy Travelers", value: "10k+" },
              { label: "Verified Hotels", value: "500+" },
              { label: "Years Experience", value: "15+" }
            ].map((stat, i) => (
              <div key={i} className="bg-white px-10 py-6 rounded-2xl border border-gray-100 shadow-sm min-w-[200px] text-center">
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;