const GOLD = "#C9A84C";

const stats = [
  { value: "50+", label: "Destinations" },
  { value: "4", label: "Char Dham Sites" },
  { value: "13", label: "Districts" },
  { value: "7500m+", label: "Highest Peak" },
];

export default function DestinationStats() {
  return (
    <section style={{ background: GOLD }} className="w-full py-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="flex flex-col items-center justify-center py-3 text-center"
            style={{
              borderRight:
                i < stats.length - 1 ? "0.5px solid #B8962E" : "none",
            }}
          >
            <span
              className="text-xl md:text-2xl font-semibold text-white"
              style={{ fontFamily: "sans-serif" }}
            >
              {s.value}
            </span>
            <span
              className="text-[9px] uppercase tracking-[2px] mt-1"
              style={{ color: "#F5E6C0" }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
