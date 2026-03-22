import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const allPackages = [
  {
    rating: "4.9",
    duration: "7 Days / 6 Nights",
    title: "Adventure Seeker Trek",
    category: "Adventure",
    includes: ["River Rafting", "Camping", "Trekking", "Bonfire", "All Gear", "Instructors"],
    price: "₹32,000",
  },
  {
    rating: "4.7",
    duration: "5 Days / 4 Nights",
    title: "Hill Station Retreat",
    category: "Hill Station",
    includes: ["Nainital", "Mussoorie", "Luxury Stay", "Boating", "Cable Car", "Sightseeing"],
    price: "₹25,000",
  },
  {
    rating: "4.8",
    duration: "3 Days / 2 Nights",
    title: "Rishikesh Yoga Retreat",
    category: "Pilgrimage",
    includes: ["Yoga Sessions", "Ganga Aarti", "Meditation", "Ayurvedic Spa", "Ashram Stay", "All Meals"],
    price: "₹12,000",
  },
  {
    rating: "4.9",
    duration: "6 Days / 5 Nights",
    title: "Kedarnath Yatra Special",
    category: "Pilgrimage",
    includes: ["Helicopter Option", "VIP Darshan", "Luxury Camp", "Guide", "All Meals", "Transport"],
    price: "₹28,000",
  },
  {
    rating: "4.6",
    duration: "4 Days / 3 Nights",
    title: "Valley of Flowers Trek",
    category: "Adventure",
    includes: ["Trek Permit", "Camping", "All Meals", "Guide", "All Gear", "First Aid"],
    price: "₹18,000",
  },
  {
    rating: "4.8",
    duration: "Flexible",
    title: "Custom Family Package",
    category: "Custom",
    includes: ["Your Dates", "Your Budget", "Hotel Choice", "Private Car", "Guide", "24/7 Support"],
    price: "Custom",
  },
];

export default function PackagesGrid({ activeFilter }) {
  const navigate = useNavigate();

  const filtered =
    activeFilter === "All"
      ? allPackages
      : allPackages.filter((p) => p.category === activeFilter);

  return (
    <section className="w-full bg-[#FAFAF7] px-4 sm:px-8 md:px-16 lg:px-24 py-10 md:py-14">
      <div className="max-w-7xl mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            No packages found for this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((pkg) => (
              <div
                key={pkg.title}
                className="bg-white rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1"
                style={{ border: "0.5px solid #E5E0D5" }}
              >
                {/* Card header */}
                <div
                  className="px-4 py-4 relative"
                  style={{ background: GOLD }}
                >
                  <p
                    className="text-[10px] mb-1"
                    style={{ color: "#F5E6C0" }}
                  >
                    ★ {pkg.rating} · {pkg.duration}
                  </p>
                  <h3 className="text-sm font-semibold text-white pr-16">
                    {pkg.title}
                  </h3>
                  <span
                    className="absolute top-3 right-3 text-[9px] font-medium px-2 py-0.5 rounded"
                    style={{ background: NAVY, color: GOLD }}
                  >
                    {pkg.category}
                  </span>
                </div>

                {/* Card body */}
                <div className="p-4">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">
                    Includes
                  </p>
                  <div className="grid grid-cols-2 gap-y-1 mb-3">
                    {pkg.includes.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-1 text-[11px] text-gray-500"
                      >
                        <span style={{ color: GOLD }}>✓</span> {item}
                      </div>
                    ))}
                  </div>

                  <div
                    className="w-full my-3"
                    style={{ height: "0.5px", background: "#E5E0D5" }}
                  />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] text-gray-400">Package starts</p>
                      <p
                        className="text-lg font-semibold"
                        style={{ color: NAVY, fontFamily: "sans-serif" }}
                      >
                        {pkg.price}
                        {pkg.price !== "Custom" && (
                          <span className="text-[10px] font-normal text-gray-400">
                            {" "}/ guest
                          </span>
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => navigate("/contact")}
                      className="text-xs px-4 py-2 rounded font-medium text-white transition-opacity hover:opacity-90"
                      style={{ background: NAVY }}
                    >
                      Enquire →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}