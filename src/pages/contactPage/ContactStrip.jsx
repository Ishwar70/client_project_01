import { Phone, Mail, MapPin } from "lucide-react";

const GOLD = "#C9A84C";
const GOLD_GRADIENT = "linear-gradient(135deg, #C9A84C 0%, #E5D296 50%, #B8962E 100%)";
const TEXT_DARK = "#1A1A1A";

const items = [
  {
    icon: Phone,
    label: "Speak with us",
    value: "+91 98765 43210",
  },
  {
    icon: Mail,
    label: "General Inquiry",
    value: "info@uttaravista.com",
  },
  {
    icon: MapPin,
    label: "Local Office",
    value: "Dehradun, Uttarakhand",
  },
];

export default function ContactStrip() {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* The Golden Outer Frame */}
        <div 
          className="p-[1px] rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(201,168,76,0.2)]"
          style={{ background: GOLD_GRADIENT }}
        >
          <div 
            className="grid grid-cols-1 md:grid-cols-3 rounded-[2.5rem] overflow-hidden"
            style={{ background: "#FFFFFF" }}
          >
            {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="group relative flex items-center gap-6 px-10 py-12 transition-all duration-500 hover:bg-[#FFFDF7]"
                  style={{
                    borderRight: i < items.length - 1 ? "1px solid #F5F1E6" : "none",
                  }}
                >
                  {/* Premium Metallic Golden Icon Container */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-700 group-hover:rotate-[360deg] shadow-[0_10px_20px_-5px_rgba(201,168,76,0.3)]"
                    style={{ 
                      background: GOLD_GRADIENT,
                    }}
                  >
                    <Icon size={22} color="#FFF" strokeWidth={2.5} />
                  </div>

                  <div className="z-10">
                    <p
                      className="text-[10px] uppercase tracking-[4px] font-black mb-1.5 transition-colors"
                      style={{ color: GOLD }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="text-base font-bold tracking-tight"
                      style={{ color: TEXT_DARK, fontFamily: "sans-serif" }}
                    >
                      {item.value}
                    </p>
                  </div>

                  {/* Golden Reflection Effect on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: "linear-gradient(45deg, transparent 0%, rgba(201,168,76,0.05) 50%, transparent 100%)"
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .grid > div {
            border-right: none !important;
            border-bottom: 1px solid #F5F1E6 !important;
          }
          .grid > div:last-child {
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  );
}