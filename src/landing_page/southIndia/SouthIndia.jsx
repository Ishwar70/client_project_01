import React from 'react';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import ChooseSection from './ChooseSection';
import FAQSection from './FAQSection';

const SouthIndia = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <ServicesSection/>
      <ChooseSection/>
      <FAQSection/>
    </div>
  );
};

export default SouthIndia;