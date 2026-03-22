import { useNavigate } from "react-router-dom";
import {
  Landmark,
  Mountain,
  Hotel,
  Map,
  Users,
  Car,
} from "lucide-react";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";
const BG = "#FAFAF7";

const services = [
  {
    icon: Landmark,
    title: "Pilgrimage Tours",
    description:
      "Char Dham, Rishikesh, Haridwar — sacred journeys guided by experts who know every temple intimately.",
    price: "From ₹15,000",
    bgAccent: GOLD,
  },
  {
    icon: Mountain,
    title: "Adventure Treks",
    description:
      "River rafting, high-altitude trekking, camping and bonfire — for the thrill-seekers at heart.",
    price: "From ₹12,000",
    bgAccent: NAVY,
  },
  {
    icon: Hotel,
    title: "Hill Station Stays",
    description:
      "Luxury stays in Mussoorie, Nainital, Almora — serene escapes with breathtaking mountain views.",
    price: "From ₹18,000",
    bgAccent: GOLD,
  },
  {
    icon: Map,
    title: "Custom Itineraries",
    description:
      "Fully personalized trips built around your dates, budget, group size and travel preferences.",
    price: "Custom Pricing",
    bgAccent: NAVY,
  },
  {
    icon: Users,
    title: "Group Tours",
    description:
      "Organized group departures every month — meet fellow travelers and explore together affordably.",
    price: "From ₹8,000",
    bgAccent: GOLD,
  },
  {
    icon: Car,
    title: "Airport Transfers",
    description:
      "Safe, comfortable and punctual pick-up & drop services from all major airports and railway stations.",
    price: "From ₹2,500",
    bgAccent: NAVY,
  },
];

export default function ServicesGrid() {
  const navigate = useNavigate();

  return (
    <section style={{ background: BG }} className="w-full py-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="text-xs tracking-[3px] uppercase font-medium block mb-3"
            style={{ color: GOLD }}
          >
            Core Offerings
          </span>
          <h2
            className="text-4xl font-semibold"
            style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
          >
            Everything You <span style={{ color: GOLD }}>Need</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="bg-white rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 cursor-default"
                style={{
                  border: "0.5px solid #E5E0D5",
                  borderTop: `3px solid ${GOLD}`,
                }}
              >
                {/* Image placeholder */}
                <div
                  className="w-full h-36 flex items-center justify-center gap-2"
                  style={{ background: s.bgAccent }}
                >
                  <Icon
                    size={22}
                    color={s.bgAccent === GOLD ? "#F5E6C0" : "#aab5cc"}
                  />
                  <span
                    className="text-xs"
                    style={{
                      color: s.bgAccent === GOLD ? "#F5E6C0" : "#aab5cc",
                    }}
                  >
                    {s.title} Image
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: GOLD }}
                    >
                      <Icon size={14} color="#fff" />
                    </div>
                    <h3
                      className="text-sm font-semibold"
                      style={{ color: NAVY }}
                    >
                      {s.title}
                    </h3>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    {s.description}
                  </p>

                  <div
                    className="w-full mb-4"
                    style={{ height: "0.5px", background: "#E5E0D5" }}
                  />

                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-semibold"
                      style={{ color: GOLD }}
                    >
                      {s.price}
                    </span>
                    <button
                      onClick={() => navigate("/contact")}
                      className="text-xs px-3 py-1.5 rounded transition-colors hover:bg-gray-50"
                      style={{
                        border: `0.5px solid ${NAVY}`,
                        color: NAVY,
                      }}
                    >
                      Learn More →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}