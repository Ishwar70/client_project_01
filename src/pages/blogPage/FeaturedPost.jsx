const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

export default function FeaturedPost() {
  return (
    <section className="w-full bg-[#FAFAF7] px-4 sm:px-8 md:px-16 lg:px-24 pt-12 pb-0">
      <div className="max-w-7xl mx-auto">
        <span
          className="text-xs tracking-[3px] uppercase font-medium block mb-4"
          style={{ color: GOLD }}
        >
          Featured Article
        </span>

        <div
          className="rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
          style={{ background: NAVY }}
        >
          {/* Left — image */}
          <div className="min-h-[200px] md:min-h-[260px] flex flex-col items-center justify-center gap-2 p-8">
            <span className="text-xs" style={{ color: "#aab5cc" }}>
              Featured Blog Image
            </span>
            <span className="text-sm font-medium" style={{ color: GOLD }}>
              Char Dham 2025
            </span>
          </div>

          {/* Right — content */}
          <div className="p-6 md:p-8" style={{ background: NAVY }}>
            <div className="flex gap-2 mb-4 flex-wrap">
              <span
                className="text-[9px] font-medium px-2 py-0.5 rounded"
                style={{ background: GOLD, color: "#fff" }}
              >
                Pilgrimage
              </span>
              <span
                className="text-[9px] font-medium px-2 py-0.5 rounded"
                style={{ background: "#2d4270", color: "#aab5cc" }}
              >
                10 min read
              </span>
            </div>

            <h2
              className="text-xl md:text-2xl font-semibold leading-snug mb-3"
              style={{ color: "#fff", fontFamily: "'Georgia', serif" }}
            >
              Complete Guide to Char Dham Yatra 2025
            </h2>

            <p
              className="text-xs leading-relaxed mb-5"
              style={{ color: "#8a9bbf" }}
            >
              Everything you need to know — best season, route planning, packing
              list, cost breakdown and pro tips for a smooth pilgrimage.
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-8 h-8 rounded-full flex-shrink-0"
                style={{ background: GOLD }}
              />
              <div>
                <p
                  className="text-xs font-medium text-white"
                  style={{ fontFamily: "sans-serif" }}
                >
                  Rahul Sharma
                </p>
                <p className="text-[10px]" style={{ color: "#8a9bbf" }}>
                  June 15, 2025
                </p>
              </div>
            </div>

            <button
              className="text-sm font-medium px-5 py-2.5 rounded text-white transition-opacity hover:opacity-90"
              style={{ background: GOLD }}
            >
              Read Article →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}