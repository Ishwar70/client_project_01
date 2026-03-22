import ServicesHero from "./ServicesHero";
import ServicesGrid from "./ServicesGrid";
import HowItWorks from "./HowItWorks";
import FeaturesStrip from "./FeaturesStrip";
import ServicesCTA from "./ServicesCTA";

export default function Services() {
  return (
    <main className="w-full overflow-x-hidden">
      <ServicesHero />
      <ServicesGrid />
      <HowItWorks />
      <FeaturesStrip />
      <ServicesCTA />
    </main>
  );
}