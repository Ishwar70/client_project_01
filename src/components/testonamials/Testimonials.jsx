import React from 'react';
import ReviewCard from './ReviewCard';

const Testimonials = () => {
  const reviews = [
    {
      name: "Subhalaxmi Behera",
      location: "Google Review",
      review: "The natural beauty of Kerala touched my heart. The team arranged all things properly for me. We have a small child, they properly take care of him as well.",
      avatar: "https://i.pravatar.cc/150?u=subha"
    },
    {
      name: "Happy Khuntia",
      location: "TripAdvisor",
      review: "I contacted 5 travel companies for our Rajasthan Trip but out of those I became comfortable with Travel Magica’s booking packages. So glad!",
      avatar: "https://i.pravatar.cc/150?u=happy"
    },
    {
      name: "Mihira Nayak",
      location: "Google Review",
      review: "The overall arrangements during our memorable Kashmir tour was very good. They provided us foods similar to our home state. Thanks team!",
      avatar: "https://i.pravatar.cc/150?u=mihira"
    }
  ];

  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-cyan-600 font-bold tracking-[0.3em] uppercase text-xs">Review & Testimonials</span>
          <h2 className="text-4xl md:text-6xl font-serif font-black text-[#0B1D48] mt-4">
            Top Reviews for Travel
          </h2>
          <div className="w-24 h-1.5 bg-cyan-500 mx-auto mt-6 rounded-full opacity-40" />
        </div>

        {/* The Grid - Ensure this is not hidden */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-8">
          {reviews.map((item, index) => {
            console.log("Rendering card for:", item.name); // Check console for this!
            return <ReviewCard key={index} {...item} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;