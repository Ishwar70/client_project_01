import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Landmark,
  Mountain,
  Hotel,
  Map,
  Users,
  Car,
  ChevronRight,
} from "lucide-react";

import { getAllServices } from "../../services/services.service";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";
const BG = "#FAFAF7";

// 🧠 Map backend icon string → lucide icon
const iconMap = {
  landmark: Landmark,
  mountain: Mountain,
  hotel: Hotel,
  map: Map,
  users: Users,
  car: Car,
};

export default function ServicesGrid() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await getAllServices();
        setServices(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section style={{ background: BG }} className="w-full py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: NAVY, fontFamily: "'Playfair Display', serif" }}
          >
            Our <span style={{ color: GOLD }}>Services</span>
          </h2>
          <div className="w-12 h-1 mt-3 mx-auto" style={{ background: GOLD }} />
        </div>

        {/* 🔄 Loading State */}
        {loading ? (
          <p className="text-center text-gray-500">Loading services...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => {
              const Icon = iconMap[s.icon] || Landmark;

              return (
                <div
                  key={s._id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg border border-gray-100 group"
                >
                  {/* Image */}
                  <div className="w-full h-40 relative overflow-hidden">
                    <img
                      src={
                        s.image?.startsWith("http")
                          ? s.image
                          : `http://localhost:5000/${s.image}`
                      }
                      alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 p-1.5 rounded-lg bg-white/90 backdrop-blur-sm shadow-sm">
                      <Icon size={16} style={{ color: GOLD }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3
                      className="text-lg font-bold mb-1.5"
                      style={{ color: NAVY }}
                    >
                      {s.title}
                    </h3>

                    <p className="text-xs text-gray-500 leading-snug mb-4 line-clamp-2">
                      {s.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <div>
                        <p className="text-[9px] uppercase text-gray-400 font-bold tracking-tighter">
                          Price
                        </p>
                        <p
                          className="text-sm font-bold"
                          style={{ color: NAVY }}
                        >
                          {s.price === "Custom" ? (
                            "Custom"
                          ) : (
                            <span style={{ color: GOLD }}>{s.price}</span>
                          )}
                        </p>
                      </div>

                      <button
                        onClick={() => navigate(`/booking/${s._id}`)}
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
        )}
      </div>
    </section>
  );
}