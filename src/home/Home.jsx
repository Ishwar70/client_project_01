import HomeHero from "../home/HomeHero";
import MarqueeStrip from "../home/MarqueeStrip";
import TripPlanner from "../home/TripPlanner";
import FeaturedDestinations from "../home/FeaturedDestinations";
import WhyChooseUs from "../home/WhyChooseUs";
import HomePremiumPackages from "../home/HomePremiumPackages";
import HomeTestimonials from "../home/HomeTestimonials";
import HomeBlogPreview from "../home/HomeBlogPreview";
import HomeCTA from "../home/HomeCTA";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <HomeHero />
      <MarqueeStrip />
      <TripPlanner />
      <FeaturedDestinations />
      <WhyChooseUs />
      <HomePremiumPackages />
      <HomeTestimonials />
      <HomeBlogPreview />
      <HomeCTA />
    </main>
  );
}
