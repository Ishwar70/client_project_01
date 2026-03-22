import { BadgeCheck, CalendarClock, UserCheck, ShieldPlus } from "lucide-react";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";
const BG = "#FAFAF7";

const features = [
  {
    icon: BadgeCheck,
    title: "No Hidden Charges",
    description: "100% transparent pricing, always.",
    iconBg: GOLD,
  },
  {
    icon: CalendarClock,
    title: "Flexible Booking",
    description: "Easy rescheduling with no penalties.",
    iconBg: NAVY,
  },
  {
    icon: UserCheck,
    title: "Certified Guides",
    description: "Licensed & experienced local experts.",
    iconBg: GOLD,
  },
  {
    icon: ShieldPlus,
    title: "Travel Insurance",
    description: "Comprehensive coverage on all trips.",
    iconBg: NAVY,
  },
];

export default function FeaturesStrip() {
  return (
    <section style={{ background: BG }} className="w-full py-14 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="flex items-start gap-4"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: f.iconBg }}
                >
                  <Icon size={16} color="#fff" />
                </div>
                <div>
                  <h3
                    className="text-sm font-semibold mb-1"
                    style={{ color: NAVY }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}