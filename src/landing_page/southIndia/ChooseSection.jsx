import React from 'react';
import { CheckCircle } from 'lucide-react';

const ChooseSection = () => {
  const benefits = [
    {
      title: "Well-Planned Itineraries",
      desc: "Our South India tour packages are carefully planned to cover major attractions, ensuring you enjoy every destination without feeling rushed."
    },
    {
      title: "Customized Travel Options",
      desc: "Every traveler is different, so our South India tour packages come with flexible options to match your budget, travel duration, and preferences."
    },
    {
      title: "Comfortable Hotels & Stays",
      desc: "We include verified and comfortable accommodations in all our South India tour packages, ensuring a relaxing stay after every travel day."
    },
    {
      title: "Complete Travel Management",
      desc: "From transport to sightseeing, our South India tour packages include everything needed for a hassle-free and organized journey."
    },
    {
      title: "Ideal for All Travelers",
      desc: "Our South India tour packages are perfect for families, couples, honeymooners, and group travelers looking for a safe and enjoyable trip."
    },
    {
      title: "Coverage of Top Destinations",
      desc: "Explore popular places like Munnar, Alleppey, Ooty, Coorg, and temple cities with our well-designed South India tour packages."
    },
    {
      title: "Affordable & Transparent Pricing",
      desc: "Our South India tour packages are priced competitively with clear details, so you always know what you are paying for."
    },
    {
      title: "Dedicated Support Team",
      desc: "We provide continuous support throughout your trip, making our South India tour packages reliable and stress-free from start to finish."
    }
  ];

  return (
    <section className="py-10 bg-[#fafafa] font-sans">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sticky Left Header Area */}
          <div className="lg:w-1/3 lg:sticky lg:top-24">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6 leading-tight">
              Why Choose <span className="text-[#D4AF37]">The Trip Trails</span> Tour & Travels
            </h2>
            <div className="w-20 h-1.5 bg-[#D4AF37] mb-8"></div>
            <p className="text-gray-600 leading-relaxed text-lg">
              Experience well-planned journeys with our South India tour packages, designed for comfort, affordability, and convenience. We offer customized itineraries, quality stays, and smooth travel arrangements across Kerala, Tamil Nadu, and Karnataka for a memorable trip.
            </p>
          </div>

          {/* Right Grid Area */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((item, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl border-l-4 border-transparent hover:border-[#D4AF37] shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <CheckCircle className="text-[#D4AF37] w-6 h-6 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ChooseSection;