import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllPackages } from "../../services/package.service";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

export default function PackagesGrid({ activeFilter }) {
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await getAllPackages();
        setPackages(res.data || []);
      } catch (err) {
        console.error("Error fetching packages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  /* ================= FILTER ================= */
  const filtered =
    activeFilter === "All"
      ? packages
      : packages.filter((p) => p.category === activeFilter);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400">
        Loading packages...
      </div>
    );
  }

  return (
    <section className="w-full bg-[#FAFAF7] px-4 sm:px-8 md:px-16 lg:px-24 py-12">
      <div className="max-w-7xl mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400 font-medium italic">
            No packages found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((pkg) => (
              <div
                key={pkg._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
              >
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="backdrop-blur-md bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-md border border-white/30">
                      ★ {pkg.rating || 4.5}
                    </span>
                    <span className="backdrop-blur-md bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-md border border-white/30">
                      {pkg.duration || "Flexible"}
                    </span>
                  </div>

                  {/* Category */}
                  <span
                    className="absolute bottom-4 left-4 text-[10px] font-bold px-3 py-1 rounded-full shadow-lg"
                    style={{ background: GOLD, color: "#fff" }}
                  >
                    {pkg.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 grow flex flex-col">
                  <h3
                    className="text-xl font-bold mb-4 group-hover:text-[#C9A84C] transition-colors"
                    style={{ color: NAVY }}
                  >
                    {pkg.title}
                  </h3>

                  {/* Includes */}
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-6">
                    {(pkg.includes || []).slice(0, 4).map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-[12px] text-gray-500 font-medium"
                      >
                        <span style={{ color: GOLD }}>●</span> {item}
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">
                        Price per person
                      </p>
                      <p className="text-xl font-bold" style={{ color: NAVY }}>
                        {pkg.price === "Custom"
                          ? "Contact Us"
                          : `₹${pkg.price}`}
                      </p>
                    </div>

                    <button
                      onClick={() => navigate("/contact")}
                      className="flex items-center gap-2 text-xs font-bold px-5 py-3 rounded-xl hover:gap-3"
                      style={{ background: NAVY, color: "#fff" }}
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