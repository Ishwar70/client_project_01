import React from "react";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Destinations", href: "#destination" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const DESTINATIONS = [
  { label: "Nainital", href: "#" },
  { label: "Rishikesh", href: "#" },
  { label: "Mussoorie", href: "#" },
  { label: "Auli", href: "#" },
  { label: "Kedarnath", href: "#" },
  { label: "Jim Corbett", href: "#" },
];

const SERVICES = [
  { label: "Flight Booking", href: "#" },
  { label: "Hotel Reservations", href: "#" },
  { label: "Tour Packages", href: "#" },
  { label: "Travel Insurance", href: "#" },
  { label: "Visa Assistance", href: "#" },
  { label: "Airport Transfers", href: "#" },
];

const SOCIALS = [
  { label: "Facebook", href: "#", icon: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /> },
  { label: "Instagram", href: "#", icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></> },
  { label: "Twitter", href: "#", icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /> },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const brandGold = "#BFA13B";
  const brandDark = "#1c1917"; // Stone-900/950 for warmth

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />

      <footer className="relative text-stone-300 overflow-hidden" style={{ backgroundColor: brandDark, fontFamily: "'DM Sans', sans-serif" }}>
        
        {/* ── NEWSLETTER SECTION (Mobile Optimized) ── */}
        <div className="relative border-b border-stone-800">
          <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
              <div className="max-w-md">
                <h3 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Plan Your Next Journey
                </h3>
                <p className="text-stone-400 text-sm">
                  Join our newsletter for exclusive Uttarakhand travel guides and seasonal tour offers.
                </p>
              </div>
              <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 min-w-0 md:min-w-100">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-5 py-4 rounded-xl bg-stone-800/50 border border-stone-700 text-white focus:outline-none focus:ring-1 transition-all"
                  style={{ focusBorderColor: brandGold }}
                />
                <button 
                  className="px-8 py-4 rounded-xl text-white font-bold shadow-lg transition-all active:scale-95 whitespace-nowrap"
                  style={{ background: `linear-gradient(to right, ${brandGold}, #8e7421)` }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN GRID (Mobile First) ── */}
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            
            {/* Brand Col */}
            <div className="space-y-6">
              <a href="#home" className="inline-block group">
                <span className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Uttarakhand <span style={{ color: brandGold }}>Tours</span>
                </span>
                <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-semibold mt-1">Authentic Experiences</p>
              </a>
              <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
                Specializing in spiritual journeys, Himalayan treks, and luxury escapes across the Land of Gods since 2010.
              </p>
              <div className="flex gap-4">
                {SOCIALS.map((soc) => (
                  <a key={soc.label} href={soc.href} className="p-3 rounded-full bg-stone-800/50 border border-stone-700 hover:text-white transition-all" style={{ '--hover-bg': brandGold }}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">{soc.icon}</svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            {[
              { title: "Explore", links: QUICK_LINKS },
              { title: "Popular Places", links: DESTINATIONS },
              { title: "Services", links: SERVICES }
            ].map((section) => (
              <div key={section.title}>
                <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
                  <span className="w-6 h-0.5 rounded-full" style={{ backgroundColor: brandGold }} />
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-stone-400 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                         <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-xs" style={{ color: brandGold }}>→</span>
                         {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="border-t border-stone-800 bg-stone-950/50">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-xs text-stone-500">
              <p className="text-center lg:text-left">
                © {currentYear} <span style={{ color: brandGold }} className="font-semibold">Uttarakhand Tours</span>. 
                Designed for the Himalayan Explorer.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Support</a>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Brand Accent */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(to right, #e2d194, ${brandGold}, #8e7421)` }} />
      </footer>
    </>
  );
}