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
    price: "32,000",
    image: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?q=80&w=800&auto=format&fit=crop"
  },
  {
    rating: "4.7",
    duration: "5 Days / 4 Nights",
    title: "Hill Station Retreat",
    category: "Hill Station",
    includes: ["Nainital", "Mussoorie", "Luxury Stay", "Boating", "Cable Car", "Sightseeing"],
    price: "25,000",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop"
  },
  {
    rating: "4.8",
    duration: "3 Days / 2 Nights",
    title: "Rishikesh Yoga Retreat",
    category: "Pilgrimage",
    includes: ["Yoga Sessions", "Ganga Aarti", "Meditation", "Ayurvedic Spa", "Ashram Stay", "All Meals"],
    price: "12,000",
    image: "https://th.bing.com/th/id/R.e4ded95a9659d5f04b0ad1498ed46f12?rik=h08GQM%2fHgIsYFw&riu=http%3a%2f%2fwww.delhibushire.com%2fuploads%2fpilgrimage-tours-pilgrimage-tour-kanyakumari-india%2b1152_12863353282-tpfil02aw-26766.jpg&ehk=VcMdU1gTSJvSh%2fd1k%2f1JWt9WwZ4n8bnMBwk2LGBMIYU%3d&risl=&pid=ImgRaw&r=0"
  },
  {
    rating: "4.9",
    duration: "6 Days / 5 Nights",
    title: "Kedarnath Yatra Special",
    category: "Pilgrimage",
    includes: ["Helicopter Option", "VIP Darshan", "Luxury Camp", "Guide", "All Meals", "Transport"],
    price: "28,000",
    image: "https://images.unsplash.com/photo-1624314138470-5a2f24623f10?q=80&w=800&auto=format&fit=crop"
  },
  {
    rating: "4.6",
    duration: "4 Days / 3 Nights",
    title: "Valley of Flowers Trek",
    category: "Adventure",
    includes: ["Trek Permit", "Camping", "All Meals", "Guide", "All Gear", "First Aid"],
    price: "18,000",
    image: "https://th.bing.com/th/id/OIP.JByXJ29612d3HVNAOsjNDwHaE1?w=288&h=188&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
  },
  {
    rating: "4.8",
    duration: "Flexible",
    title: "Custom Family Package",
    category: "Custom",
    includes: ["Your Dates", "Your Budget", "Hotel Choice", "Private Car", "Guide", "24/7 Support"],
    price: "Custom",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop"
  },
];

export default function PackagesGrid({ activeFilter }) {
  const navigate = useNavigate();

  const filtered =
    activeFilter === "All"
      ? allPackages
      : allPackages.filter((p) => p.category === activeFilter);

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
                key={pkg.title}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
              >
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="backdrop-blur-md bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-md border border-white/30 uppercase tracking-tighter">
                      ★ {pkg.rating}
                    </span>
                    <span className="backdrop-blur-md bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-md border border-white/30 uppercase tracking-tighter">
                      {pkg.duration}
                    </span>
                  </div>

                  <span
                    className="absolute bottom-4 left-4 text-[10px] font-bold px-3 py-1 rounded-full shadow-lg"
                    style={{ background: GOLD, color: "#fff" }}
                  >
                    {pkg.category}
                  </span>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 
                    className="text-xl font-bold mb-4 group-hover:text-[#C9A84C] transition-colors"
                    style={{ color: NAVY, fontFamily: "sans-serif" }}
                  >
                    {pkg.title}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-6">
                    {pkg.includes.slice(0, 4).map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-[12px] text-gray-500 font-medium"
                      >
                        <span className="text-[10px]" style={{ color: GOLD }}>●</span> {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none mb-1">Price per person</p>
                      <p
                        className="text-xl font-bold"
                        style={{ color: NAVY }}
                      >
                        {pkg.price === "Custom" ? "Contact Us" : `₹${pkg.price}`}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => navigate("/contact")}
                      className="flex items-center gap-2 text-xs font-bold px-5 py-3 rounded-xl transition-all hover:gap-3"
                      style={{ 
                        background: NAVY, 
                        color: "#fff" 
                      }}
                    >
                      Enquire <span className="transition-transform group-hover:translate-x-1">→</span>
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