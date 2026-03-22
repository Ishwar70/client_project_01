import { Target, Eye } from "lucide-react";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const cards = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To make Uttarakhand's hidden gems accessible to every traveler — through authentic, personalized, and responsibly managed travel experiences that respect the land and its communities.",
    accentColor: NAVY,
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To become the most trusted and celebrated travel brand for spiritual seekers and adventure lovers across India — synonymous with excellence, warmth, and the spirit of Uttarakhand.",
    accentColor: GOLD,
  },
];

export default function MissionVision() {
  return (
    <section className="w-full bg-white py-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="text-xs tracking-[3px] uppercase font-medium block mb-3"
            style={{ color: GOLD }}
          >
            Our Purpose
          </span>
          <h2
            className="text-4xl font-semibold"
            style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
          >
            Mission <span style={{ color: GOLD }}>&</span> Vision
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="rounded-r-xl p-7 transition-shadow hover:shadow-md"
                style={{
                  background: "#FAFAF7",
                  border: "0.5px solid #E5E0D5",
                  borderLeft: `4px solid ${card.accentColor}`,
                  borderRadius: "0 12px 12px 0",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                  style={{ background: card.accentColor }}
                >
                  <Icon size={18} color="#fff" />
                </div>
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
                >
                  {card.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}