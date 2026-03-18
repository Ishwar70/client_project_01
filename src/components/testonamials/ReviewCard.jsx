import React from 'react';

const ReviewCard = ({ review, name, location, avatar }) => {
  return (
    <div className="relative flex flex-col items-center p-8 bg-white border border-gray-100 rounded-2xl shadow-lg h-full">
      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-xl">★</span>
        ))}
      </div>

      {/* Quote Mark */}
      <div className="absolute top-20 text-8xl font-serif text-gray-100 opacity-50 select-none">“</div>

      {/* Review Text */}
      <p className="relative z-10 text-gray-600 italic text-center mb-8 text-sm leading-relaxed">
        {review}
      </p>

      {/* Name Section */}
      <div className="mt-auto text-center pb-8">
        <h4 className="text-[#0B1D48] font-bold text-lg">{name}</h4>
        <p className="text-cyan-600 text-[10px] font-bold uppercase tracking-widest">{location}</p>
      </div>

      {/* Avatar */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-white rounded-full shadow-xl p-1 border">
        <img 
          src={avatar} 
          alt={name} 
          className="w-full h-full rounded-full object-cover" 
          onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=" + name }}
        />
      </div>
    </div>
  );
};

export default ReviewCard;