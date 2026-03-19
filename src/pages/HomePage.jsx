import PopularDestinations from "../pages/PopularDestinations";
import HeroSection from '../components/hero/HeroSection'
import Packages from "../components/package/Packages";


const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <PopularDestinations />

      <Packages />
    </div>
  );
};

export default HomePage;