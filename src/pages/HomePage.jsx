import PopularDestinations from "../pages/PopularDestinations";
import HeroSection from '../components/hero/HeroSection'
import Packages from "../components/package/Packages";
import WhyChooseUs from "../components/whyChooseUs/WhyChooseUs";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <PopularDestinations />
      <Packages />
      <WhyChooseUs />
    </div>
  );
};

export default HomePage;