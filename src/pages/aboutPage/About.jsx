
import HeroSection from "../../components/about/Herosection";
import StatsStrip from "../../components/about/Statsstrip";
import OurStory from "../../components/about/Ourstory";
import MissionVision from "../../components/about/Missionvision";
import WhyChooseUs from "../../components/about/Whychooseus";
import TeamSection from "../../components/about/Teamsection";
import Testimonials from "../../components/about/Testimonials";
import CTASection from "../../components/about/Ctasection";

export default function About() {
  return (
    <main className="w-full overflow-x-hidden">
      <HeroSection />
      < StatsStrip/>
      <OurStory />
      <MissionVision />
      <WhyChooseUs />
      <TeamSection />
      <Testimonials />
      <CTASection />
    </main>
  );
}