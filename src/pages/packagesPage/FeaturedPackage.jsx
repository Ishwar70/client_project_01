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

// High-quality image of Kedarnath/Himalayas for the Char Dham vibe
const PACKAGE_IMAGE = "https://th.bing.com/th/id/OIP.Eh8t1_Af6ydEVODEsZQw8wHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3";

export default function FeaturedPackage() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-[#FAFAF7] px-4 sm:px-8 md:px-16 lg:px-24 pt-12 pb-12">
      <div className="max-w-7xl mx-auto">
        <span
          className="text-xs tracking-[3px] uppercase font-medium block mb-4"
          style={{ color: GOLD }}
        >
          Featured Package
        </span>

        <div
          className="rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 group shadow-xl"
          style={{ border: "0.5px solid #E5E0D5", background: "#fff" }}
        >
          {/* Left — Image Section */}
          <div className="relative min-h-[300px] md:min-h-[400px] overflow-hidden">
            <img 
              src={PACKAGE_IMAGE} 
              alt="Char Dham Yatra - Kedarnath" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            {/* Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent md:hidden" />
            
            {/* Floating Label on Image */}
            <div 
              className="absolute top-6 left-6 px-4 py-2 rounded backdrop-blur-md border border-white/20"
              style={{ background: "rgba(27, 43, 75, 0.8)" }}
            >
              <span className="text-xs font-bold tracking-widest text-white uppercase">
                Limited Season
              </span>
            </div>
          </div>

          {/* Right — Details Section */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            {/* Badges */}
            <div className="flex gap-2 mb-4 flex-wrap">
              <span
                className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter"
                style={{ background: GOLD, color: "#fff" }}
              >
                Best Seller
              </span>
              <span
                className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter"
                style={{ background: "#F5F5F0", color: NAVY, border: `1px solid ${NAVY}` }}
              >
                10 Days Trip
              </span>
            </div>

            <h2
              className="text-2xl md:text-4xl font-semibold mb-2"
              style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
            >
              Divine Char Dham Yatra
            </h2>
            <p className="text-sm text-gray-400 mb-6 italic">
              Experience the spiritual heights of Kedarnath, Badrinath, Gangotri, & Yamunotri.
            </p>

            <div
              className="w-full mb-6"
              style={{ height: "1px", background: "#E5E0D5" }}
            />

            <p
              className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-4"
            >
              Exclusive Inclusions
            </p>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-8">
              {included.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-xs font-medium text-gray-600"
                >
                  <span className="flex items-center justify-center w-4 h-4 rounded-full text-[10px]" style={{ background: `${GOLD}20`, color: GOLD }}>
                    ✓
                  </span> 
                  {item}
                </div>
              ))}
            </div>

            <div
              className="w-full mb-6"
              style={{ height: "1px", background: "#E5E0D5" }}
            />

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Starting From</p>
                <p
                  className="text-3xl font-bold"
                  style={{ color: NAVY, fontFamily: "sans-serif" }}
                >
                  ₹45,000{" "}
                  <span className="text-xs font-normal text-gray-400">
                    / person
                  </span>
                </p>
              </div>
              <button
                onClick={() => navigate("/contact")}
                className="px-8 py-3.5 rounded-lg text-sm font-bold text-white transition-all hover:shadow-lg active:scale-95"
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