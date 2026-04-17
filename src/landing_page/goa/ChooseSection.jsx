import React from 'react';

const ChooseSection = () => {
  const reasons = [
    {
      title: "12+ Years in Goa Tourism",
      desc: "Deep local expertise and trusted relationships with the best hotels, guides, and transport partners across Goa."
    },
    {
      title: "Guaranteed Best Price",
      desc: "We match or beat any comparable Goa package. No hidden charges — transparent pricing, every time."
    },
    {
      title: "Custom Itineraries",
      desc: "Every trip is tailored to your group size, budget, and interests — not a copy-paste package."
    },
    {
      title: "24/7 Trip Support",
      desc: "Our team is reachable round the clock during your trip — whether it's a last-minute change or any emergency."
    },
    {
      title: "4.9★ Google Rating",
      desc: "Thousands of verified happy travellers trust The Trip Trails for their Goa holidays year after year."
    },
    {
      title: "100% Safe Travel",
      desc: "Fully vetted drivers, licensed guides, and 24/7 on-trip support so you travel with complete peace of mind."
    }
  ];

  return (
    <section className="py-10 bg-[#fafafa] font-sans">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <div className="lg:w-1/3 lg:sticky lg:top-24">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6 leading-tight">
              Why Choose Us <br/><span className="text-[#D4AF37]">The Trip Trails Advantage</span>
            </h2>
            <div className="w-24 h-1 bg-[#D4AF37] mb-6"></div>
            <p className="text-gray-500 leading-relaxed mb-6">
              When booking your Goa vacation, you want a trusted partner who knows every hidden gem along the coastline. Over the past decade, we have built trusted relationships to ensure you get the perfect beach getaway.
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
