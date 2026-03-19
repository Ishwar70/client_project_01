import PopularDestinations from "../pages/PopularDestinations";
import HeroSection from '../components/hero/HeroSection'
import Packages from "../components/package/Packages";
import WhyChooseUs from "../components/whyChooseUs/WhyChooseUs";
import Gallery from "../components/gallery/Gallery";
import ContactSection from "../components/contact/ContactSection";
import Testimonials from "../components/testonomials/Testimonials";


const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <PopularDestinations />
      <Packages />
      <WhyChooseUs />
      <Gallery />
      <Testimonials />
      <ContactSection />
    </div>
  );
};

export default HomePage;