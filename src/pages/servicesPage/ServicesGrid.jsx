import { useNavigate } from "react-router-dom";
import {
  Landmark,
  Mountain,
  Hotel,
  Map,
  Users,
  Car,
  ChevronRight,
} from "lucide-react";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";
const BG = "#FAFAF7";

const services = [
  {
    icon: Landmark,
    title: "Pilgrimage Tours",
    description: "Char Dham, Rishikesh, Haridwar — sacred journeys guided by experts.",
    price: "₹15,000",
    image: "https://tse4.mm.bing.net/th/id/OIP.5N7ZWpZZ1fBLCtFJjtRvEgHaFA?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    icon: Mountain,
    title: "Adventure Treks",
    description: "River rafting, high-altitude trekking, camping and bonfire thrills.",
    price: "₹12,000",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Hotel,
    title: "Hill Station Stays",
    description: "Luxury stays in Mussoorie and Nainital with breathtaking views.",
    price: "₹18,000",
    image: "https://tse3.mm.bing.net/th/id/OIP.APFM8IaeM7SQ8B9p3M8StQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    icon: Map,
    title: "Custom Itineraries",
    description: "Personalized trips built around your dates, budget, and group size.",
    price: "Custom",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Users,
    title: "Group Tours",
    description: "Organized group departures every month — meet fellow travelers.",
    price: "₹8,000",
    image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Car,
    title: "Airport Transfers",
    description: "Safe and punctual pick-up & drop services from all major hubs.",
    price: "₹2,500",
    image: "https://tse3.mm.bing.net/th/id/OIP.CPYhRIDT_ESrF2fz-BtyFAHaEQ?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
];

export default function ServicesGrid() {
  const navigate = useNavigate();

  return (
    <section style={{ background: BG }} className="w-full py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Compact Header */}
        <div className="text-center mb-10">
          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: NAVY, fontFamily: "'Playfair Display', serif" }}
          >
            Our <span style={{ color: GOLD }}>Services</span>
          </h2>
          <div className="w-12 h-1 mt-3 mx-auto" style={{ background: GOLD }} />
        </div>

        {/* Tightened Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg border border-gray-100 group"
              >
                {/* Reduced Height Image */}
                <div className="w-full h-40 relative overflow-hidden">
                  <img 
                    src={s.image} 
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 p-1.5 rounded-lg bg-white/90 backdrop-blur-sm shadow-sm">
                    <Icon size={16} style={{ color: GOLD }} />
                  </div>
                </div>

                {/* Reduced Padding Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-1.5" style={{ color: NAVY }}>
                    {s.title}
                  </h3>

                  <p className="text-xs text-gray-500 leading-snug mb-4 line-clamp-2">
                    {s.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div>
                      <p className="text-[9px] uppercase text-gray-400 font-bold tracking-tighter">Price</p>
                      <p className="text-sm font-bold" style={{ color: NAVY }}>
                        {s.price === "Custom" ? "Custom" : <span style={{ color: GOLD }}>{s.price}</span>}
                      </p>
                    </div>

                    <button
                      onClick={() => navigate("/contact")}
                      className="flex items-center gap-1 text-[10px] font-bold px-4 py-2 rounded-full transition-all duration-300 hover:brightness-110 active:scale-95 shadow-md"
                      style={{ backgroundColor: GOLD, color: "white" }}
                    >
                      BOOK NOW
                      <ChevronRight size={12} />
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