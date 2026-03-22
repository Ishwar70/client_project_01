import { Phone, Mail, MapPin, Instagram, Youtube, Facebook, Twitter } from "lucide-react";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const infoCards = [
  {
    icon: Phone,
    title: "Phone",
    primary: "+91 98765 43210",
    secondary: "Mon–Sat, 9am – 7pm IST",
  },
  {
    icon: Mail,
    title: "Email",
    primary: "info@uttaravista.com",
    secondary: "We reply within 2 hours",
  },
  {
    icon: MapPin,
    title: "Office Address",
    primary: "12, Rajpur Road, Dehradun",
    secondary: "Uttarakhand — 248001, India",
  },
];

const socials = [
  { icon: Instagram, bg: GOLD },
  { icon: Facebook, bg: NAVY },
  { icon: Youtube, bg: GOLD },
  { icon: Twitter, bg: NAVY },
];

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-4">
      {/* Info cards */}
      {infoCards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="bg-white rounded-xl p-4 flex items-start gap-3"
            style={{ border: "0.5px solid #E5E0D5" }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: GOLD }}
            >
              <Icon size={15} color="#fff" />
            </div>
            <div>
              <p
                className="text-xs font-semibold mb-0.5"
                style={{ color: NAVY }}
              >
                {card.title}
              </p>
              <p
                className="text-xs font-medium"
                style={{ color: GOLD }}
              >
                {card.primary}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">
                {card.secondary}
              </p>
            </div>
          </div>
        );
      })}

      {/* Social links */}
      <div
        className="bg-white rounded-xl p-4"
        style={{ border: "0.5px solid #E5E0D5" }}
      >
        <p
          className="text-xs font-semibold mb-3"
          style={{ color: NAVY }}
        >
          Follow Us
        </p>
        <div className="flex gap-2">
          {socials.map(({ icon: Icon, bg }, i) => (
            <button
              key={i}
              className="w-8 h-8 rounded-md flex items-center justify-center transition-opacity hover:opacity-80"
              style={{ background: bg }}
            >
              <Icon size={14} color="#fff" />
            </button>
          ))}
        </div>
      </div>

      {/* Map placeholder */}
      <div
        className="rounded-xl flex items-center justify-center h-28 text-xs text-gray-400"
        style={{
          background: "#E8E4DA",
          border: "0.5px solid #E5E0D5",
        }}
      >
        📍 Google Map Embed
      </div>
    </div>
  );
}