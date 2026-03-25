import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const GOLD = "#C9A84C";
const TEXT_DARK = "#1A1A1A"; 

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full py-16 px-6 overflow-hidden bg-white">
      {/* Subtle Depth Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FAF9F6] via-white to-white"></div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        {/* Tightened Header Group */}
        <div className="space-y-2 mb-6">
  
          <h2
            className="text-4xl md:text-6xl font-light leading-[1.1] tracking-tighter"
            style={{ fontFamily: "'Georgia', serif", color: TEXT_DARK }}
          >
            Ready to Explore <br />
            <span className="italic text-[#D4AF37]">Uttarakhand?</span>
          </h2>
        </div>

        {/* Minimalist Divider */}
        <div className="flex justify-center mb-6">
          <div className="h-[1px] w-12 bg-black/10"></div>
        </div>

        <p className="text-sm md:text-base leading-relaxed mb-8 max-w-lg mx-auto text-black/50 font-medium">
          From the heights of the Himalayas to the banks of the Ganges, 
          let us curate your next signature escape.
        </p>
      </div>
    </section>
  );
}