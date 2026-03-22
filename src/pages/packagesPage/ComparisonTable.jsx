const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const rows = [
  { feature: "Hotel Category", basic: "3 Star", premium: "4 Star", luxury: "5 Star" },
  { feature: "Meals Included", basic: "Breakfast", premium: "All Meals", luxury: "All + Fine Dining" },
  { feature: "Private Guide", basic: "—", premium: "✓", luxury: "✓" },
  { feature: "24/7 Support", basic: "—", premium: "✓", luxury: "✓" },
  { feature: "Travel Insurance", basic: "Basic", premium: "Comprehensive", luxury: "Premium" },
  { feature: "Starting Price", basic: "₹8,000", premium: "₹25,000", luxury: "₹55,000", isPrice: true },
];

export default function ComparisonTable() {
  return (
    <section className="w-full bg-white px-4 sm:px-8 md:px-16 lg:px-24 py-16 md:py-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span
            className="text-xs tracking-[3px] uppercase font-medium block mb-3"
            style={{ color: GOLD }}
          >
            Compare Plans
          </span>
          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
          >
            Package <span style={{ color: GOLD }}>Comparison</span>
          </h2>
        </div>

        {/* Table — scrollable on mobile */}
        <div className="overflow-x-auto rounded-xl" style={{ border: "0.5px solid #E5E0D5" }}>
          <table className="w-full min-w-[480px]" style={{ tableLayout: "fixed" }}>
            <thead>
              <tr style={{ background: NAVY }}>
                <th className="text-left px-4 py-3 text-xs font-medium w-2/5" style={{ color: GOLD }}>
                  Feature
                </th>
                <th className="text-center px-4 py-3 text-xs font-medium" style={{ color: GOLD }}>
                  Basic
                </th>
                <th className="text-center px-4 py-3 text-xs font-medium" style={{ color: GOLD, background: "#2d4270" }}>
                  Premium
                </th>
                <th className="text-center px-4 py-3 text-xs font-medium" style={{ color: GOLD }}>
                  Luxury
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.feature}
                  style={{ background: i % 2 === 0 ? "#FAFAF7" : "#fff", borderBottom: "0.5px solid #E5E0D5" }}
                >
                  <td className="px-4 py-3 text-xs text-gray-500">{row.feature}</td>
                  <td
                    className="px-4 py-3 text-xs text-center"
                    style={{ color: row.isPrice ? "#888" : row.basic === "—" ? "#ccc" : "#888" }}
                  >
                    {row.basic}
                  </td>
                  <td
                    className="px-4 py-3 text-xs text-center font-medium"
                    style={{
                      color: row.premium === "✓" || row.isPrice ? GOLD : NAVY,
                      background: i % 2 === 0 ? "#fff" : "#FAFAF7",
                    }}
                  >
                    {row.premium}
                  </td>
                  <td
                    className="px-4 py-3 text-xs text-center"
                    style={{
                      color: row.luxury === "✓" ? GOLD : row.isPrice ? "#888" : "#888",
                    }}
                  >
                    {row.luxury}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}