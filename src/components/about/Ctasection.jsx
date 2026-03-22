import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section
      className="w-full py-24 px-6 md:px-16 lg:px-24 text-center"
      style={{ background: NAVY }}
    >
      <div className="max-w-3xl mx-auto">
        <span
          className="text-xs tracking-[3px] uppercase font-medium block mb-5"
          style={{ color: GOLD }}
        >
          Start Your Journey
        </span>

        <h2
          className="text-4xl md:text-5xl font-semibold leading-tight mb-5"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          <span className="text-white">Ready to Explore</span>
          <br />
          <span style={{ color: GOLD }}>Uttarakhand?</span>
        </h2>

        <p
          className="text-sm italic leading-relaxed mb-10"
          style={{ color: "#8a9bbf" }}
        >
          Let us craft the perfect journey for you — spiritual, adventurous, or
          simply serene.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigate("/packages")}
            className="px-8 py-3.5 text-sm font-medium rounded text-white transition-opacity hover:opacity-90"
            style={{ background: GOLD }}
          >
            View Packages →
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="px-8 py-3.5 text-sm font-medium rounded transition-colors hover:bg-white/10"
            style={{ border: "1.5px solid #fff", color: "#fff" }}
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}