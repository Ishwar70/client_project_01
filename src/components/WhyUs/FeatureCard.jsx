import React from 'react';

const FeatureCard = ({ image, icon, title }) => {
  return (
    <div className="flex flex-col items-center bg-white rounded-xl overflow-hidden shadow-sm">
      {/* Image Container */}
      <div className="relative w-full h-48">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        {/* Floating Icon */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center p-3 border border-gray-100">
          <img src={icon} alt="icon" className="w-full h-full object-contain" />
        </div>
      </div>
      
      {/* Text Content */}
      <div className="pt-12 pb-8 px-4 text-center">
        <h3 className="text-[#0B1D48] font-bold text-lg leading-tight max-w-[180px] mx-auto">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default FeatureCard;