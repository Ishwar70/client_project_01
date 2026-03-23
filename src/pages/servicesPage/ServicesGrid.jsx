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
    description: "Char Dham, Rishikesh, Haridwar — sacred journeys guided by experts who know every temple intimately.",
    price: "From ₹15,000",
    image: "https://tse4.mm.bing.net/th/id/OIP.5N7ZWpZZ1fBLCtFJjtRvEgHaFA?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    icon: Mountain,
    title: "Adventure Treks",
    description: "River rafting, high-altitude trekking, camping and bonfire — for the thrill-seekers at heart.",
    price: "From ₹12,000",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Hotel,
    title: "Hill Station Stays",
    description: "Luxury stays in Mussoorie, Nainital, Almora — serene escapes with breathtaking mountain views.",
    price: "From ₹18,000",
    image: "https://tse3.mm.bing.net/th/id/OIP.APFM8IaeM7SQ8B9p3M8StQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    icon: Map,
    title: "Custom Itineraries",
    description: "Fully personalized trips built around your dates, budget, group size and travel preferences.",
    price: "Custom Pricing",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Users,
    title: "Group Tours",
    description: "Organized group departures every month — meet fellow travelers and explore together affordably.",
    price: "From ₹8,000",
    image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Car,
    title: "Airport Transfers",
    description: "Safe, comfortable and punctual pick-up & drop services from all major airports and railway stations.",
    price: "From ₹2,500",
    image: "https://tse3.mm.bing.net/th/id/OIP.CPYhRIDT_ESrF2fz-BtyFAHaEQ?rs=1&pid=ImgDetMain&o=7&rm=3",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
                style={{
                  border: "0.5px solid #E5E0D5",
                  borderTop: `3px solid ${GOLD}`,
                }}
              >
                {/* Image Section */}
                <div className="w-full h-48 relative overflow-hidden">
                  <img 
                    src={s.image} 
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Subtle Dark Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  
                  {/* Floating Icon Badge */}
                  <div 
                    className="absolute bottom-3 right-3 p-2 rounded-lg backdrop-blur-md shadow-lg"
                    style={{ background: "rgba(255, 255, 255, 0.9)" }}
                  >
                    <Icon size={18} style={{ color: NAVY }} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <h3
                      className="text-lg font-bold"
                      style={{ color: NAVY, fontFamily: "sans-serif" }}
                    >
                      {s.title}
                    </h3>
                  </div>

                  <p className="text-sm text-gray-500 leading-relaxed mb-6 h-12 overflow-hidden">
                    {s.description}
                  </p>

                  <div
                    className="w-full mb-5"
                    style={{ height: "1px", background: "#f0ede7" }}
                  />

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] uppercase text-gray-400 font-bold tracking-wider">Starting at</span>
                      <span
                        className="text-sm font-bold"
                        style={{ color: GOLD }}
                      >
                        {s.price}
                      </span>
                    </div>
                    <button
                      onClick={() => navigate("/contact")}
                      className="text-xs font-bold px-4 py-2 rounded-full transition-all hover:bg-navy-900 group-hover:bg-[#1B2B4B] group-hover:text-white"
                      style={{
                        border: `1.5px solid ${NAVY}`,
                        color: NAVY,
                      }}
                    >
                      Book Now
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