const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

export default function DestinationMap() {
  return (
    <section className="w-full bg-white px-4 sm:px-8 md:px-16 lg:px-24 py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <span
            className="text-xs tracking-[3px] uppercase font-medium block mb-3"
            style={{ color: GOLD }}
          >
            Explore on Map
          </span>
          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
          >
            Uttarakhand{" "}
            <span style={{ color: GOLD }}>Destination Map</span>
          </h2>
        </div>

        {/* Map embed placeholder */}
        <div
          className="rounded-xl w-full flex flex-col items-center justify-center gap-2 py-20"
          style={{
            background: "#E8E4DA",
            border: "0.5px solid #E5E0D5",
            minHeight: "300px",
          }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
            style={{ background: GOLD }}
          >
            <span className="text-white text-lg">📍</span>
          </div>
          <p className="text-sm font-medium" style={{ color: NAVY }}>
            Interactive Google Map
          </p>
          <p className="text-xs text-gray-400">
            Replace this div with your Google Maps embed iframe
          </p>
          <code
            className="text-[10px] mt-3 px-4 py-2 rounded"
            style={{
              background: "#fff",
              color: "#888",
              border: "0.5px solid #E5E0D5",
            }}
          >
            {`<iframe src="https://maps.google.com/..." />`}
          </code>
        </div>
      </div>
    </section>
  );
}
