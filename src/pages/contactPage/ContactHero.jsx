import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

export default function ContactHero() {
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const els = ref.current?.querySelectorAll("[data-animate]");
    els?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 60);
    });
  }, []);

  return (
    <section
      ref={ref}
      style={{ background: NAVY }}
      className="w-full py-20 md:py-24 px-4 sm:px-8 md:px-16 lg:px-24 text-center"
    >
      <div className="max-w-2xl mx-auto">
        <span
          data-animate
          className="text-xs tracking-[3px] uppercase font-medium block mb-4"
          style={{ color: GOLD }}
        >
          Get In Touch
        </span>

        <h1
          data-animate
          className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight mb-5"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          <span className="text-white">Contact </span>
          <span style={{ color: GOLD }}>Us</span>
        </h1>

        <p
          data-animate
          className="text-sm italic leading-relaxed mb-8"
          style={{ color: "#8a9bbf" }}
        >
          "We'd love to plan your perfect Uttarakhand journey — reach out anytime"
        </p>

        <div data-animate className="flex gap-2 justify-center items-center">
          <span
            className="text-xs cursor-pointer hover:underline"
            style={{ color: "#8a9bbf" }}
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <span className="text-xs" style={{ color: GOLD }}>›</span>
          <span className="text-xs" style={{ color: GOLD }}>Contact</span>
        </div>
      </div>
    </section>
  );
}