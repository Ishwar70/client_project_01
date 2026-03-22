import { ShieldCheck, MapPin, SlidersHorizontal, Headphones } from "lucide-react";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";
const BG = "#FAFAF7";

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted Partner",
    description:
      "Over 15 years of excellence creating memorable and safe Uttarakhand journeys for thousands of travelers.",
  },
  {
    icon: MapPin,
    title: "Expert Local Guides",
    description:
      "Certified guides who know every trail, temple, and hidden gem intimately — your safety is always first.",
  },
  {
    icon: SlidersHorizontal,
    title: "Custom Itineraries",
    description:
      "Tailor-made tours designed entirely around your preferences, budget, and travel style.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Round-the-clock dedicated assistance to ensure a seamless and stress-free experience.",
  },
];

export default function WhyChooseUs() {
  return (
    <section style={{ background: BG }} className="w-full py-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="text-xs tracking-[3px] uppercase font-medium block mb-3"
            style={{ color: GOLD }}
          >
            Experience Excellence
          </span>
          <h2
            className="text-4xl font-semibold mb-3"
            style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
          >
            Why Choose <span style={{ color: GOLD }}>Us</span>
          </h2>
          <p className="text-sm italic text-gray-400">
            "Your perfect travel companion for unforgettable Uttarakhand experiences"
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group bg-white rounded-xl p-6 text-center transition-all duration-300 hover:-translate-y-1 cursor-default"
                style={{
                  border: "0.5px solid #E5E0D5",
                  borderTop: `3px solid ${GOLD}`,
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-5 transition-colors duration-300"
                  style={{ background: GOLD }}
                >
                  <Icon size={18} color="#fff" />
                </div>
                <h3
                  className="text-sm font-semibold mb-2"
                  style={{ color: NAVY }}
                >
                  {f.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}