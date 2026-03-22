import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

export default function PackagesCTA() {
  const navigate = useNavigate();

  return (
    <section
      className="w-full py-14 px-4 sm:px-8 md:px-16 lg:px-24"
      style={{ background: GOLD }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h2
            className="text-2xl md:text-3xl font-semibold text-white mb-2"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Can't find what you're looking for?
          </h2>
          <p className="text-sm italic" style={{ color: "#F5E6C0" }}>
            We build 100% custom packages — tell us your dream trip!
          </p>
        </div>

        <div className="flex gap-3 flex-wrap justify-center md:justify-end flex-shrink-0">
          <button
            onClick={() => navigate("/contact")}
            className="px-6 py-3 text-sm font-medium rounded text-white transition-opacity hover:opacity-90"
            style={{ background: NAVY }}
          >
            Build Custom Package →
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="px-6 py-3 text-sm font-medium rounded transition-colors hover:bg-white/10"
            style={{ border: "1.5px solid #fff", color: "#fff" }}
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}