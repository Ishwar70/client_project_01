import React from 'react';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import WhyChooseUs from './WhyChooseUs';
import FAQSection from './FAQSection';

const NorthEast = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <ServicesSection/>
      <WhyChooseUs/>
      <FAQSection/>
    </div>
  );
};

export default NorthEast;