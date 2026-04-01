import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllServices } from "../../services/services.service";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

export default function ServicesGrid() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await getAllServices();
        const servicesData = res?.services || res?.data || res || [];
        setServices(Array.isArray(servicesData) ? servicesData : []);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="w-full py-10 px-4 md:px-10" style={{ background: "#FAFAF7" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h2
            className="text-2xl md:text-4xl font-medium"
            style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
          >
            Our <span style={{ color: GOLD }}>Services</span>
          </h2>
          <div className="w-10 h-0.75 mt-3 mx-auto rounded-full" style={{ background: GOLD }} />
        </div>

        {/* States */}
        {loading ? (
          <p className="text-center text-gray-400 animate-pulse text-sm">Loading services...</p>
        ) : services.length === 0 ? (
          <p className="text-center text-gray-400 text-sm">No services available right now.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => {
              const imageUrl =
                typeof s.image === "string"
                  ? s.image.startsWith("http") ? s.image : `http://localhost:5000/${s.image}`
                  : s.image?.url || "https://via.placeholder.com/400x200?text=No+Image";

              return (
                <div
                  key={s._id}
                  className="bg-white rounded-2xl overflow-hidden flex flex-col group"
                  style={{ border: "0.5px solid #e8e2d0" }}
                >
                  {/* Image */}
                  <div className="relative w-full h-48 overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gold strip at bottom of image */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1"
                      style={{ background: `linear-gradient(90deg, ${GOLD}, #e8c872, ${GOLD})` }}
                    />
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-5">
                    {/* Category tag */}
                    {s.category && (
                      <p
                        className="text-[10px] font-semibold uppercase tracking-widest mb-1"
                        style={{ color: GOLD }}
                      >
                        {s.category}
                      </p>
                    )}

                    <h3
                      className="text-base font-medium mb-2"
                      style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
                    >
                      {s.title}
                    </h3>

                    <p className="text-[13px] text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-2">
                      {s.description}
                    </p>

                    {/* Footer */}
                    <div
                      className="flex items-center justify-between pt-4"
                      style={{ borderTop: "0.5px solid #f0ece2" }}
                    >
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-0.5">
                          {s.price === "Custom" ? "Price" : "Starting from"}
                        </p>
                        <p
                          className="text-base font-medium"
                          style={{ color: s.price === "Custom" ? NAVY : GOLD }}
                        >
                          {s.price === "Custom" ? "Custom" : `₹${s.price}`}
                        </p>
                      </div>

                      <button
                        onClick={() => navigate(`/booking/${s._id}`)}
                        className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-300"
                        style={{ background: NAVY, color: GOLD }}
                        onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = NAVY; e.currentTarget.style.color = GOLD; }}
                      >
                        Book Now
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
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