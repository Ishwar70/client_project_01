const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";
const OFF_WHITE = "#FAFAF7";

// Reliable working URL for a majestic Himalayan landscape
const FEATURED_IMG = "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1400&auto=format&fit=crop";

export default function FeaturedPost() {
  return (
    <section className="w-full bg-white px-4 sm:px-8 md:px-16 lg:px-24 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
          <div>
            <span
              className="text-xs tracking-[4px] uppercase font-bold block mb-3"
              style={{ color: GOLD }}
            >
              Editor's Choice
            </span>
            <h2 
              className="text-3xl md:text-5xl font-bold italic"
              style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
            >
              Featured Story
            </h2>
          </div>
          <div className="h-[1px] flex-grow bg-gray-100 mb-2 hidden md:block mx-8"></div>
        </div>

        <div
          className="rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-sm group border border-gray-100"
          style={{ background: OFF_WHITE }}
        >
          {/* Left — Image Section (Taking 7 columns) */}
          <div className="relative min-h-[350px] lg:col-span-7 overflow-hidden">
            <img 
              src={FEATURED_IMG} 
              alt="Majestic Uttarakhand Mountains" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Subtle light overlay */}
            <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors duration-500" />
            
            <div className="absolute top-6 left-6">
              <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                Travel Guide
              </span>
            </div>
          </div>

          {/* Right — Content Section (Taking 5 columns) */}
          <div className="p-8 md:p-12 lg:col-span-5 flex flex-col justify-center bg-[#FDFDFB]">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-gold" style={{ background: GOLD }}></span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                10 Minute Read
              </span>
            </div>

            <h3
              className="text-2xl md:text-3xl font-semibold leading-tight mb-5"
              style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
            >
              The Essential Guide to <br />
              <span style={{ color: GOLD }}>Char Dham Yatra</span> 2025
            </h3>

            <p className="text-sm leading-relaxed text-gray-500 mb-8">
              Preparation is the key to a soulful pilgrimage. We break down the new 2025 registration process, physical fitness requirements, and the best-kept secrets of the high-altitude shrines.
            </p>

            <div className="flex items-center justify-between mt-auto pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: NAVY }}
                >
                  RS
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ color: NAVY }}>Rahul Sharma</p>
                  <p className="text-[10px] text-gray-400">Expert Guide</p>
                </div>
              </div>

              <button
                className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all"
                style={{ color: GOLD }}
              >
                Read More 
                <span className="transition-transform group-hover:translate-x-2">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}