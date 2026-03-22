import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const included = [
  "VIP Darshan Pass",
  "Local Meals",
  "Luxury Hotels",
  "AC Transport",
  "Expert Guide",
  "Travel Insurance",
];

export default function FeaturedPackage() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-[#FAFAF7] px-4 sm:px-8 md:px-16 lg:px-24 pt-12 pb-0">
      <div className="max-w-7xl mx-auto">
        <span
          className="text-xs tracking-[3px] uppercase font-medium block mb-4"
          style={{ color: GOLD }}
        >
          Featured Package
        </span>

        <div
          className="rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
          style={{ border: "0.5px solid #E5E0D5", background: "#fff" }}
        >
          {/* Left — image */}
          <div
            className="min-h-[200px] md:min-h-[280px] flex flex-col items-center justify-center gap-2 p-8"
            style={{ background: NAVY }}
          >
            <span className="text-xs" style={{ color: "#aab5cc" }}>
              Featured Hero Image
            </span>
            <span
              className="text-sm font-medium"
              style={{ color: GOLD }}
            >
              Char Dham Yatra
            </span>
          </div>

          {/* Right — details */}
          <div className="p-6 md:p-8">
            {/* Badges */}
            <div className="flex gap-2 mb-3 flex-wrap">
              <span
                className="text-[10px] font-medium px-2 py-0.5 rounded"
                style={{ background: GOLD, color: "#fff" }}
              >
                Best Seller
              </span>
              <span
                className="text-[10px] font-medium px-2 py-0.5 rounded"
                style={{ background: NAVY, color: GOLD }}
              >
                Pilgrimage
              </span>
            </div>

            <h2
              className="text-xl md:text-2xl font-semibold mb-1"
              style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
            >
              Divine Char Dham Yatra
            </h2>
            <p className="text-xs text-gray-400 mb-4">
              10 Days / 9 Nights · Kedarnath, Badrinath, Gangotri, Yamunotri
            </p>

            <div
              className="w-full mb-4"
              style={{ height: "0.5px", background: "#E5E0D5" }}
            />

            <p
              className="text-[10px] uppercase tracking-widest text-gray-400 mb-3"
            >
              What's Included
            </p>
            <div className="grid grid-cols-2 gap-y-1.5 gap-x-3 mb-4">
              {included.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1.5 text-xs text-gray-500"
                >
                  <span style={{ color: GOLD }}>✓</span> {item}
                </div>
              ))}
            </div>

            <div
              className="w-full mb-4"
              style={{ height: "0.5px", background: "#E5E0D5" }}
            />

            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-[10px] text-gray-400">Package starts</p>
                <p
                  className="text-2xl font-semibold"
                  style={{ color: NAVY, fontFamily: "sans-serif" }}
                >
                  ₹45,000{" "}
                  <span className="text-xs font-normal text-gray-400">
                    / guest
                  </span>
                </p>
              </div>
              <button
                onClick={() => navigate("/contact")}
                className="px-6 py-2.5 rounded text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{ background: GOLD }}
              >
                Send Enquiry →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}