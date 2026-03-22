import { useState } from "react";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <section
      style={{ background: NAVY }}
      className="w-full py-20 px-4 sm:px-8 md:px-16 lg:px-24 text-center"
    >
      <div className="max-w-2xl mx-auto">
        <span
          className="text-xs tracking-[3px] uppercase font-medium block mb-4"
          style={{ color: GOLD }}
        >
          Stay Updated
        </span>

        <h2
          className="text-3xl md:text-4xl font-semibold mb-3"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          <span className="text-white">Subscribe to Our </span>
          <span style={{ color: GOLD }}>Newsletter</span>
        </h2>

        <p
          className="text-sm italic leading-relaxed mb-8"
          style={{ color: "#8a9bbf" }}
        >
          Get travel tips, destination guides and exclusive deals straight to
          your inbox.
        </p>

        {subscribed ? (
          <div
            className="rounded-xl px-6 py-5 text-center mx-auto max-w-sm"
            style={{ background: "#2d4270" }}
          >
            <div
              className="text-2xl font-bold mb-2"
              style={{ color: GOLD }}
            >
              ✓
            </div>
            <p className="text-sm font-medium text-white mb-1">
              You're subscribed!
            </p>
            <p className="text-xs" style={{ color: "#8a9bbf" }}>
              Welcome aboard. Expect great content in your inbox soon.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto rounded-lg overflow-hidden"
            style={{ border: "0.5px solid #2d4270" }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 text-sm outline-none placeholder:text-gray-500"
              style={{ background: "#2d4270", color: "#fff" }}
            />
            <button
              type="submit"
              className="px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 flex-shrink-0"
              style={{ background: GOLD }}
            >
              Subscribe →
            </button>
          </form>
        )}

        <p
          className="text-[10px] mt-4"
          style={{ color: "#8a9bbf" }}
        >
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}