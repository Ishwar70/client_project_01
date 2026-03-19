import React from 'react';
import PackageCard from './PackageCard';

const Packages = () => {
  const tourData = [
    {
      title: "Divine Char Dham Yatra",
      duration: "10 Days / 9 Nights",
      rating: "4.9",
      highlights: ["Kedarnath", "Badrinath", "Gangotri", "Yamunotri", "All Meals Included", "Expert Guides"],
      price: 45000
    },
    {
      title: "Adventure Seeker Package",
      duration: "7 Days / 6 Nights",
      rating: "4.8",
      highlights: ["River Rafting", "Bungee Jumping", "Trekking", "Camping", "All Equipment", "Certified Instructors"],
      price: 32000
    },
    {
      title: "Hill Station Retreat",
      duration: "5 Days / 4 Nights",
      rating: "4.7",
      highlights: ["Nainital", "Mussoorie", "Luxury Hotels", "Sightseeing", "Cable Car Rides", "Boating"],
      price: 25000
    }
  ];

  return (
    <section className="py-20 px-4 md:px-10 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1D48] mb-4">
            Premium <span className="text-[#C4A036]">Tour Packages</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Carefully curated experiences for every type of traveler
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {tourData.map((pkg, index) => (
            <PackageCard key={index} {...pkg} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;