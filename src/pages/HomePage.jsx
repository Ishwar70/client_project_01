import PopularDestinations from "../pages/PopularDestinations";
import HeroSection from '../components/hero/HeroSection'
import WhyTravelMagica from '../components/WhyUs/WhyUs'
import Testimonials from '../components/testonamials/Testimonials'

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <WhyTravelMagica />
      <Testimonials />
      <PopularDestinations />
    </div>
  );
};

export default HomePage;