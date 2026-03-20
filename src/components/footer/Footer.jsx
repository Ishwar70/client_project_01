import React from "react";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, ChevronRight } from "lucide-react";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "destination" },
  { label: "Tour Packages", href: "packages" },
  { label: "About Us", href: "about" },
  { label: "Gallery", href: "gallery" },
  { label: "Contact Us", href: "contact", active: true },
];

const DESTINATIONS = [
  { label: "Kedarnath", href: "#" },
  { label: "Badrinath", href: "#" },
  { label: "Nainital", href: "#" },
  { label: "Rishikesh", href: "#" },
  { label: "Mussoorie", href: "#" },
  { label: "Jim Corbett", href: "#" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const brandGold = "#C69E3D";
  const brandLight = "#FCFBF7";

  return (
    <footer className="w-full border-t border-gray-100 font-sans" style={{ backgroundColor: brandLight }}>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">

        {/* Responsive Grid System */}
        {/* Mobile: 1 col for Brand, 2 col for Links, 1 col for Contact */}
        {/* Tablet/Desktop: 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">

          {/* Column 1: Brand Info (Full width on mobile) */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-6">
            <img
              src="/Logo.svg"
              alt="Logo"
              className="h-45 sm:h-35 md:h-35 w-auto object-contain"
            />
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              Your premium travel partner for exploring the divine beauty of Uttarakhand.
              Creating unforgettable journeys since 2009.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 shadow-sm"
                  style={{ backgroundColor: brandGold }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (Parallel on mobile) */}
          <div className="col-span-1">
            <h4 className="text-[#0B1D48] font-bold text-base md:text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full" style={{ backgroundColor: brandGold }} />
              Quick Links
            </h4>
            <ul className="space-y-3.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`text-[13px] font-medium transition-colors flex items-center gap-2 ${link.active ? 'text-[#C69E3D]' : 'text-gray-500 hover:text-[#0B1D48]'}`}
                  >
                    {link.active ? <span className="w-1.5 h-1.5 rounded-full bg-[#C69E3D]" /> : <ChevronRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Destinations (Parallel on mobile) */}
          <div className="col-span-1">
            <h4 className="text-[#0B1D48] font-bold text-base md:text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full" style={{ backgroundColor: brandGold }} />
              Destinations
            </h4>
            <ul className="space-y-3.5">
              {DESTINATIONS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-500 hover:text-[#0B1D48] text-[13px] font-medium transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us (Full width on mobile/tablet) */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 pt-4 lg:pt-0 border-t border-gray-100 lg:border-none">
            <h4 className="text-[#0B1D48] font-bold text-base md:text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full" style={{ backgroundColor: brandGold }} />
              Contact Us
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <MapPin className="shrink-0 mt-1" size={18} style={{ color: brandGold }} />
                <span className="text-gray-500 text-[13px] leading-snug">
                  123 Mall Road, Dehradun, Uttarakhand 248001, India
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="shrink-0" size={18} style={{ color: brandGold }} />
                <a href="tel:+919876543210" className="text-gray-500 text-[13px] hover:text-[#0B1D48] transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="shrink-0" size={18} style={{ color: brandGold }} />
                <a href="mailto:info@uttarakhandtours.com" className="text-gray-500 text-[13px] hover:text-[#0B1D48] transition-colors truncate">
                  info@uttarakhandtours.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── COPYRIGHT BAR ── */}
      <div className="border-t border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[11px] text-gray-400 text-center md:text-left font-medium uppercase tracking-wider">
              © {currentYear} <span className="text-gray-600 font-bold">Uttarakhand Tours</span>.
              Crafted with <span className="text-red-400 animate-pulse">❤</span> for travelers.
            </p>
            <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              <a href="#" className="hover:text-[#C69E3D] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#C69E3D] transition-colors">Terms</a>
              <a href="#" className="hover:text-[#C69E3D] transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}