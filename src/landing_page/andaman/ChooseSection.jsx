import React from 'react';

const ChooseSection = () => {
  const reasons = [
    {
      title: "Customized Travel Plans",
      desc: "Every traveler is different, so our Andaman Tour Packages are fully customizable based on your budget, preferences, and travel style."
    },
    {
      title: "Best Price Guarantee",
      desc: "Get the most value for your money with competitively priced Andaman Tour Packages without compromising on quality and experience."
    },
    {
      title: "Handpicked Hotels & Resorts",
      desc: "We select comfortable and well-rated hotels to ensure a relaxing stay during your Andaman Tour Packages."
    },
    {
      title: "Complete Travel Support",
      desc: "From booking to return, enjoy end-to-end assistance with smooth transfers, ferry tickets, and local coordination."
    },
    {
      title: "Perfect Itinerary Planning",
      desc: "Our Andaman Tour Packages are designed to cover top attractions while giving you enough time to relax and enjoy."
    },
    {
      title: "Ideal for Every Traveler",
      desc: "Whether it’s a honeymoon, family vacation, or group trip, our Andaman Tour Packages suit every type of traveler."
    }
  ];

  return (
    <section className="py-10 bg-[#fafafa] font-sans">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <div className="lg:w-1/3 lg:sticky lg:top-24">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6 leading-tight">
              Why Choose Us for <span className="text-[#D4AF37]">Andaman Tour Packages</span>
            </h2>
            <div className="w-24 h-1 bg-[#D4AF37] mb-6"></div>
            <p className="text-lg text-gray-600 mb-6 font-medium italic">
              ✨ Travel Smart. Travel Better. Experience More.
            </p>
            <p className="text-gray-500 leading-relaxed mb-6">
              Planning your island vacation should be exciting, not stressful. Our Andaman Tour Packages are designed to give you a seamless travel experience with the perfect balance of comfort, adventure, and value. From handpicked stays to well-planned itineraries, every detail is managed to ensure you enjoy a hassle-free and memorable trip.
            </p>
            <button className="hidden lg:block w-full py-4 bg-[#D4AF37] hover:bg-black text-white font-bold uppercase tracking-widest text-xs rounded-xl transition-colors shadow-lg">
              Talk to an Expert
            </button>
          </div>

          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reasons.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#D4AF37]/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition-colors">
                    <span className="font-black text-lg">0{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
            <button className="lg:hidden mt-8 w-full py-4 bg-[#D4AF37] hover:bg-black text-white font-bold uppercase tracking-widest text-xs rounded-xl transition-colors shadow-lg">
              Talk to an Expert
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ChooseSection;
