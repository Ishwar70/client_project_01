import { Phone, Mail, MapPin } from "lucide-react";

const GOLD = "#C9A84C";

const items = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 98765 43210",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "info@uttaravista.com",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Dehradun, Uttarakhand",
  },
];

export default function ContactStrip() {
  return (
    <section style={{ background: GOLD }} className="w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-center gap-3 px-6 sm:px-8 py-5"
              style={{
                borderBottom:
                  i < items.length - 1 ? "0.5px solid #B8962E" : "none",
                borderRight: "none",
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "#B8962E" }}
              >
                <Icon size={15} color="#fff" />
              </div>
              <div>
                <p
                  className="text-[9px] uppercase tracking-widest mb-0.5"
                  style={{ color: "#F5E6C0" }}
                >
                  {item.label}
                </p>
                <p
                  className="text-sm font-medium text-white"
                  style={{ fontFamily: "sans-serif" }}
                >
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @media (min-width: 640px) {
          .contact-strip-item:not(:last-child) {
            border-right: 0.5px solid #B8962E !important;
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  );
}