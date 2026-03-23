const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";
const BG = "#FAFAF7";

export default function OurStory() {
  return (
    <section style={{ background: BG }} className="w-full py-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left — text */}
        <div>
          <span
            className="text-xs tracking-[3px] uppercase font-medium block mb-4"
            style={{ color: GOLD }}
          >
            Our Journey
          </span>
          <h2
            className="text-4xl md:text-5xl font-semibold leading-tight mb-6"
            style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
          >
            A Passion for{" "}
            <span style={{ color: GOLD }}>Uttarakhand</span>
          </h2>
          <p className="text-sm leading-relaxed text-gray-500 mb-4">
            Founded in 2009 by a group of Uttarakhand natives, our company was born
            from a deep love for the land — its mountains, rivers, temples, and
            people. What started as weekend treks with friends quickly grew into a
            mission to share these experiences with the world.
          </p>
          <p className="text-sm leading-relaxed text-gray-500 mb-8">
            Over 15 years, we have guided more than 10,000 travelers through the
            sacred trails of Kedarnath, the serene lakes of Nainital, and the
            thrilling rapids of Rishikesh — always with authenticity, safety, and
            joy at our core.
          </p>
          
          {/* Blockquote — Duplicate key fixed here */}
          <blockquote
            className="px-5 py-4"
            style={{
              background: "#fff",
              border: `0.5px solid #E5E0D5`,
              borderLeft: `4px solid ${GOLD}`, // Kept the gold accent
              borderRadius: "0 8px 8px 0",
            }}
          >
            <p
              className="text-sm italic leading-relaxed"
              style={{ color: NAVY }}
            >
              "Uttarakhand is not just our workplace — it is our home, our pride,
              and our purpose."
            </p>
            <cite
              className="block text-[10px] uppercase tracking-widest mt-3 not-italic font-medium"
              style={{ color: GOLD }}
            >
              — Rahul Sharma, Founder
            </cite>
          </blockquote>
        </div>

        {/* Right — image collage */}
        <div className="grid grid-rows-2 gap-4 h-[340px]">
          <div
            className="rounded-xl w-full flex items-center justify-center"
            style={{ background: "#d6d0c4" }}
          >
            <span className="text-xs text-gray-500">Story Image — Mountains / Valley</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div
              className="rounded-xl flex items-center justify-center"
              style={{ background: "#c8c2b6" }}
            >
              <span className="text-xs text-gray-500">Temple</span>
            </div>
            <div
              className="rounded-xl flex items-center justify-center"
              style={{ background: "#dbd5c9" }}
            >
              <span className="text-xs text-gray-500">Trek</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}