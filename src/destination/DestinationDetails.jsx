import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  ArrowLeft, Star, MapPin, Clock, Zap, Shield,
  Check, Phone, MessageCircle, ChevronDown, ChevronUp,
  Download, Calendar, Mountain, Users
} from "lucide-react";

// ─── Tokens ───────────────────────────────────────────────────────────────────
const G  = "#B8860B";          // darker gold (readable on white)
const GD = "#9A7009";          // deep gold
const GL = "rgba(184,134,11,0.08)";   // gold tint bg
const GB = "rgba(184,134,11,0.20)";   // gold border

const BG      = "#FAFAF7";     // warm off-white page bg
const CARD    = "#FFFFFF";     // pure white cards
const SURFACE = "#F4F2EC";     // slightly warm surface
const BORDER  = "#E8E4D8";     // warm light border
const TEXT    = "#1A1A1A";     // near-black primary text
const MUTED   = "#6B6559";     // warm muted text
const SUBTLE  = "#9E9789";     // even more muted

// ─── Data ────────────────────────────────────────────────────────────────────
const destinations = [
  {
    id: "kedarnath",
    category: "Pilgrimage",
    tag: "Best Seller",
    rating: "4.9",
    reviews: 1284,
    title: "Kedarnath Temple Expedition",
    location: "Rudraprayag, Uttarakhand",
    meta: "3,583m · May–Jun · 16km Trek",
    altitude: "3,583m",
    bestTime: "May – June",
    difficulty: "Moderate to Hard",
    duration: "5 Days / 4 Nights",
    groupSize: "2–12 People",
    description:
      "Embark on a spiritual journey to one of the holiest Hindu shrines. Perched at 3,583m, Kedarnath offers a profound sense of peace amidst the majestic snow-capped peaks of the Garhwal Himalayas.",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&q=80&w=600",
    ],
    price: "₹28,000",
    highlights: ["VIP Darshan Access", "Helicopter Booking Assistance", "Expert Mountain Guides", "Premium Basecamp Stay"],
    itinerary: [
      { day: 1, title: "Arrival at Haridwar", desc: "Arrive and meet your team. Evening briefing, equipment check, and welcome dinner." },
      { day: 2, title: "Drive to Gaurikund", desc: "Scenic drive along the Mandakini river to Gaurikund base (1,982m). Check-in at camp." },
      { day: 3, title: "Trek to Kedarnath", desc: "16 km trek through pine forests and glacial terrain. Arrive at Kedarnath and attend evening aarti." },
      { day: 4, title: "VIP Darshan & Descent", desc: "Early morning VIP darshan. Absorb the spiritual energy before beginning descent." },
      { day: 5, title: "Return to Haridwar", desc: "Drive back with memories of a lifetime. Farewell dinner and drop-off." },
    ],
    includes: ["4-Night Accommodation", "VIP Darshan Pass", "Expert Guide", "All Meals", "GST Included"],
    excludes: ["Flights / Train Tickets", "Personal Expenses", "Travel Insurance", "Pony / Palki charges"],
  },
  {
    id: "rishikesh",
    category: "Adventure",
    tag: null,
    rating: "4.8",
    reviews: 987,
    title: "Rishikesh White Water Rafting",
    location: "Rishikesh, Uttarakhand",
    meta: "Grade 3–4 · Oct–Mar · 2 Days",
    altitude: "372m",
    bestTime: "Oct – March",
    difficulty: "Moderate",
    duration: "2 Days / 1 Night",
    groupSize: "4–12 People",
    description:
      "Experience the adrenaline rush of tackling the Ganges' famous rapids. From 'Roller Coaster' to 'Golf Course', this expedition combines high-octane adventure with serene riverside camping.",
    image: "https://images.unsplash.com/photo-1590523741491-auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1561705048-c5084fe32cf8?auto=format&fit=crop&q=80&w=600",
    ],
    price: "₹12,000",
    highlights: ["Grade 3 & 4 Rapids", "Riverside Jungle Camping", "Cliff Jumping Sessions", "Evening Ganga Aarti Visit"],
    itinerary: [
      { day: 1, title: "Arrival & Briefing", desc: "Arrive in Rishikesh, safety briefing, gear up. First half-day on Grade 2–3 rapids." },
      { day: 2, title: "Full Rafting Expedition", desc: "Tackle the full 26 km stretch including Grade 4 'Golf Course' and 'Three Blind Mice' rapids." },
    ],
    includes: ["1-Night River Camp", "All Safety Gear", "Certified Instructor", "Meals Included", "GST Included"],
    excludes: ["Transport to Rishikesh", "Personal Expenses", "Travel Insurance", "Alcohol"],
  },
  {
    id: "nainital",
    category: "Hill Station",
    tag: null,
    rating: "4.7",
    reviews: 1102,
    title: "Nainital Lake Retreat",
    location: "Nainital, Uttarakhand",
    meta: "2,084m · Mar–Jun · 4 Days",
    altitude: "2,084m",
    bestTime: "Mar – June",
    difficulty: "Easy",
    duration: "4 Days / 3 Nights",
    groupSize: "2–10 People",
    description:
      "Relax by the pear-shaped Naini Lake, surrounded by seven lush mountains. Perfect for families and couples, this retreat offers boat rides, cable car views, and heritage walks through colonial-era architecture.",
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600",
    ],
    price: "₹18,000",
    highlights: ["Yachting at Boat Club", "Snow View Point Cable Car", "Kilbury Bird Sanctuary", "Heritage Mall Road Walk"],
    itinerary: [
      { day: 1, title: "Arrival & Naini Lake", desc: "Settle in. Evening boating on the serene Naini Lake as the hills glow golden." },
      { day: 2, title: "Snow View & Tiffin Top", desc: "Ropeway to Snow View Point. Afternoon horse ride to Tiffin Top viewpoint." },
      { day: 3, title: "Bird Sanctuary & Bazaar", desc: "Morning at Kilbury Bird Sanctuary. Afternoon shopping at Mall Road for local handicrafts." },
      { day: 4, title: "Temple Visit & Departure", desc: "Prayers at Naina Devi temple, then relaxed departure after breakfast." },
    ],
    includes: ["3-Night Hotel", "Daily Breakfast", "Ropeway + Boat Tickets", "Local Guide", "GST Included"],
    excludes: ["Flights", "Personal Expenses", "Lunch & Dinner", "Travel Insurance"],
  },
  {
    id: "corbett",
    category: "Wildlife",
    tag: "Popular",
    rating: "4.8",
    reviews: 867,
    title: "Jim Corbett Tiger Safari",
    location: "Ramnagar, Uttarakhand",
    meta: "Nov–Jun · 3 Days",
    altitude: "400m",
    bestTime: "Nov – June",
    difficulty: "Easy",
    duration: "3 Days / 2 Nights",
    groupSize: "2–6 People",
    description:
      "Venture into India's oldest national park. Home to the Royal Bengal Tiger, this safari takes you through dense Sal forests and sprawling grasslands in search of exotic wildlife and birds.",
    image: "https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1561705048-c5084fe32cf8?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80&w=600",
    ],
    price: "₹22,000",
    highlights: ["Open Jeep Tiger Safari", "Dhikala Forest Lodge", "Elephant Sightings", "Crocodile Point Trek"],
    itinerary: [
      { day: 1, title: "Arrival & Evening Safari", desc: "Check-in at jungle lodge. Evening safari in Bijrani zone — golden hour wildlife sightings." },
      { day: 2, title: "Dhikala Full Day", desc: "Full-day permit in Dhikala — highest tiger density zone. Packed lunch inside the park." },
      { day: 3, title: "Dawn Safari & Departure", desc: "Misty river crossing at sunrise, bird photography, then departure by noon." },
    ],
    includes: ["2-Night Jungle Lodge", "Breakfast & Dinner", "Safari Jeep + Permits", "Naturalist Guide", "GST Included"],
    excludes: ["Flights", "Personal Expenses", "Lunch", "Camera fees"],
  },
  {
    id: "badrinath",
    category: "Pilgrimage",
    tag: null,
    rating: "4.9",
    reviews: 743,
    title: "Badrinath Spiritual Darshan",
    location: "Chamoli, Uttarakhand",
    meta: "3,133m · May–Jun · 5 Days",
    altitude: "3,133m",
    bestTime: "May – June",
    difficulty: "Moderate",
    duration: "5 Days / 4 Nights",
    groupSize: "2–12 People",
    description:
      "Visit the sacred abode of Lord Vishnu. Surrounded by the Nar and Narayan mountain ranges, Badrinath offers a divine atmosphere and a chance to take a holy dip in the natural thermal Tapt Kund.",
    image: "https://images.unsplash.com/photo-1621609764095-b32bbe35cf3a?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600",
    ],
    price: "₹20,000",
    highlights: ["Tapt Kund Holy Dip", "Mana Village Visit", "Brahma Kapal Rituals", "Vyas Gufa Darshan"],
    itinerary: [
      { day: 1, title: "Haridwar to Rudraprayag", desc: "Scenic drive through the Alaknanda valley. Overnight at Rudraprayag." },
      { day: 2, title: "Rudraprayag to Badrinath", desc: "Continue drive to Badrinath via Joshimath. Check-in and rest." },
      { day: 3, title: "Badrinath Darshan", desc: "Early morning darshan at the temple. Dip in Tapt Kund. Visit Mana village." },
      { day: 4, title: "Brahma Kapal & Vyas Gufa", desc: "Spiritual rituals at Brahma Kapal. Explore the ancient Vyas Gufa cave." },
      { day: 5, title: "Return to Haridwar", desc: "Drive back with blessings and beautiful memories." },
    ],
    includes: ["4-Night Accommodation", "All Meals", "Expert Pandit Guide", "AC Transport", "GST Included"],
    excludes: ["Flights", "Personal Expenses", "Travel Insurance", "Puja samagri"],
  },
  {
    id: "valley-of-flowers",
    category: "Trek",
    tag: "Seasonal",
    rating: "4.8",
    reviews: 589,
    title: "Valley of Flowers Trek",
    location: "Joshimath, Uttarakhand",
    meta: "3,658m · Jul–Sep · 6 Days",
    altitude: "3,658m",
    bestTime: "July – September",
    difficulty: "Moderate",
    duration: "6 Days / 5 Nights",
    groupSize: "2–8 People",
    description:
      "A UNESCO World Heritage site, this valley turns into a floral paradise during the monsoon. Walk through meadows of endemic alpine flowers and breathe in the purest mountain air in the world.",
    image: "https://images.unsplash.com/photo-1587547131116-a0655a526190?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&q=80&w=600",
    ],
    price: "₹24,000",
    highlights: ["Rare Flora Sightings", "Hemkund Sahib Visit", "Eco-friendly Basecamp", "Professional Naturalist"],
    itinerary: [
      { day: 1, title: "Haridwar to Joshimath", desc: "Drive through the Alaknanda valley. Overnight in Joshimath." },
      { day: 2, title: "Trek to Ghangaria", desc: "14 km trek from Govindghat to base camp Ghangaria through dense forest." },
      { day: 3, title: "Valley of Flowers", desc: "4 km inside the valley — 500+ species of Himalayan wildflowers in full bloom." },
      { day: 4, title: "Hemkund Sahib", desc: "Trek to the Sikh shrine at 4,632m beside a glacial lake." },
      { day: 5, title: "Descent & Rest", desc: "Slow descent back to Govindghat with photography stops." },
      { day: 6, title: "Return Journey", desc: "Drive back to Haridwar with lifelong memories." },
    ],
    includes: ["5-Night Tented Camp", "All Meals on Trek", "Forest Permits", "Certified Guide", "GST Included"],
    excludes: ["Flights", "Personal Expenses", "Porter charges", "Travel Insurance"],
  },
];

// ─── Accordion ────────────────────────────────────────────────────────────────
function AccordionItem({ day, title, desc, isLast }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: isLast ? "none" : `0.5px solid ${BORDER}` }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
        style={{ background: "transparent", border: "none", cursor: "pointer" }}
      >
        <div className="flex items-center gap-4">
          <span
            className="text-xs font-mono font-semibold w-8 flex-shrink-0"
            style={{ color: G }}
          >
            D{String(day).padStart(2, "0")}
          </span>
          <span
            className="text-sm font-medium"
            style={{
              color: open ? G : TEXT,
              fontFamily: "sans-serif",
              transition: "color 0.2s",
            }}
          >
            {title}
          </span>
        </div>
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: open ? G : SURFACE,
            border: `0.5px solid ${open ? G : BORDER}`,
            transition: "background 0.2s",
            flexShrink: 0,
          }}
        >
          {open
            ? <ChevronUp size={12} color="#fff" />
            : <ChevronDown size={12} color={MUTED} />}
        </div>
      </button>
      {open && (
        <p
          className="pb-4 pl-12 text-xs leading-relaxed"
          style={{ color: MUTED, fontFamily: "sans-serif" }}
        >
          {desc}
        </p>
      )}
    </div>
  );
}

// ─── FadeIn on scroll ─────────────────────────────────────────────────────────
function FadeSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────
function SLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div style={{ height: "1px", width: "28px", background: G }} />
      <span
        style={{
          fontSize: "10px",
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: G,
          fontFamily: "sans-serif",
          fontWeight: 700,
        }}
      >
        {children}
      </span>
      <div style={{ height: "1px", flex: 1, background: BORDER }} />
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value }) {
  return (
    <div
      className="rounded-xl p-4 text-center"
      style={{
        background: CARD,
        border: `1px solid ${BORDER}`,
        boxShadow: "0 1px 8px rgba(184,134,11,0.06)",
      }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2"
        style={{ background: GL, border: `1px solid ${GB}` }}
      >
        <Icon size={14} color={G} />
      </div>
      <div
        style={{
          fontSize: "9px",
          textTransform: "uppercase",
          letterSpacing: "2px",
          color: SUBTLE,
          fontFamily: "sans-serif",
          marginBottom: "4px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "12px",
          fontWeight: 600,
          color: TEXT,
          fontFamily: "sans-serif",
          lineHeight: 1.3,
        }}
      >
        {value}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DestinationDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("includes");
  const [activeImg, setActiveImg] = useState(0);

  const d = destinations.find((item) => item.id === slug);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!d) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-6"
        style={{ background: BG }}
      >
        <p style={{ fontFamily: "Georgia,serif", fontSize: "28px", color: MUTED }}>
          Destination not found
        </p>
        <button
          onClick={() => navigate("/")}
          style={{
            background: G,
            color: "#fff",
            border: "none",
            padding: "10px 24px",
            borderRadius: "6px",
            fontFamily: "sans-serif",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500;600&display=swap');
        .fd { font-family: 'Cormorant Garamond', Georgia, serif; }
        @keyframes hf { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        .ha  { animation: hf 0.85s ease forwards; }
        .ha2 { animation: hf 0.85s ease 0.15s both; }
        .ha3 { animation: hf 0.85s ease 0.28s both; }
        .gal-thumb { transition: all 0.25s; cursor: pointer; opacity: 0.6; }
        .gal-thumb:hover, .gal-thumb.active { opacity: 1; }
        .book-btn { transition: all 0.25s; }
        .book-btn:hover { background: #9A7009 !important; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(184,134,11,0.3) !important; }
        .enq-btn { transition: all 0.25s; }
        .enq-btn:hover { background: rgba(184,134,11,0.08) !important; }
        .back-btn { transition: all 0.2s; }
        .back-btn:hover { background: rgba(255,255,255,0.95) !important; }
        .hl-pill { transition: all 0.2s; }
        .hl-pill:hover { background: rgba(184,134,11,0.15) !important; border-color: ${G} !important; }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div style={{ position: "relative", height: "72vh", minHeight: 480, overflow: "hidden" }}>
        <img
          src={d.image}
          alt={d.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.03)" }}
        />
        {/* Overlays — lighter, let image breathe, bottom fades to white bg */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(250,250,247,1) 0%, rgba(250,250,247,0.3) 45%, rgba(250,250,247,0.05) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(250,250,247,0.15), transparent 60%)" }} />

        {/* Back */}
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
          style={{
            position: "absolute", top: 24, left: 24, zIndex: 10,
            display: "flex", alignItems: "center", gap: 7,
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(12px)",
            border: `1px solid ${BORDER}`,
            color: TEXT, fontSize: 11, letterSpacing: "2px",
            textTransform: "uppercase", padding: "9px 18px",
            borderRadius: "999px", cursor: "pointer", fontFamily: "sans-serif",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          }}
        >
          <ArrowLeft size={13} /> Back
        </button>

        {/* Top-right badges */}
        <div style={{ position: "absolute", top: 24, right: 24, zIndex: 10, display: "flex", gap: 8 }}>
          {d.tag && (
            <div style={{
              fontSize: 9, letterSpacing: "2px", textTransform: "uppercase",
              padding: "6px 14px", borderRadius: "999px", fontWeight: 700,
              background: G, color: "#fff", fontFamily: "sans-serif",
              boxShadow: "0 2px 10px rgba(184,134,11,0.35)",
            }}>
              {d.tag}
            </div>
          )}
          <div style={{
            display: "flex", alignItems: "center", gap: 5,
            padding: "6px 14px", borderRadius: "999px",
            background: "rgba(255,255,255,0.88)",
            border: `1px solid ${BORDER}`,
            backdropFilter: "blur(12px)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          }}>
            <Star size={11} fill={G} color={G} />
            <span style={{ color: TEXT, fontSize: 12, fontWeight: 600, fontFamily: "sans-serif" }}>{d.rating}</span>
            <span style={{ color: MUTED, fontSize: 10, fontFamily: "sans-serif" }}>({d.reviews})</span>
          </div>
        </div>

        {/* Hero text */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 5% 52px" }}>
          <div className="ha" style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
            <MapPin size={12} color={G} />
            <span style={{ color: G, fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", fontFamily: "sans-serif", fontWeight: 600 }}>
              {d.location}
            </span>
            <span style={{ color: SUBTLE, fontSize: 10, fontFamily: "sans-serif" }}>·</span>
            <span style={{
              fontSize: 9, padding: "2px 10px", borderRadius: "999px",
              background: GL, border: `1px solid ${GB}`, color: G, fontFamily: "sans-serif", fontWeight: 600,
            }}>
              {d.category}
            </span>
          </div>

          <h1
            className="ha2 fd"
            style={{ color: TEXT, fontWeight: 300, lineHeight: 1.1, margin: "0 0 10px 0", fontSize: "clamp(44px,8vw,88px)" }}
          >
            {d.title}
          </h1>

          {/* Quick stat pills */}
          <div className="ha3" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
            {[
              { icon: Mountain, val: d.altitude },
              { icon: Calendar, val: d.bestTime },
              { icon: Clock, val: d.duration },
              { icon: Users, val: d.groupSize },
            ].map(({ icon: Icon, val }) => (
              <div
                key={val}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "6px 14px", borderRadius: "999px",
                  background: "rgba(255,255,255,0.82)",
                  border: `1px solid ${BORDER}`,
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                }}
              >
                <Icon size={11} color={G} />
                <span style={{ color: TEXT, fontSize: 11, fontFamily: "sans-serif" }}>{val}</span>
              </div>
            ))}

            {/* Difficulty */}
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "6px 14px", borderRadius: "999px",
              background: GL, border: `1px solid ${GB}`,
              backdropFilter: "blur(8px)",
            }}>
              <Zap size={11} color={G} />
              <span style={{ color: G, fontSize: 11, fontFamily: "sans-serif", fontWeight: 600 }}>{d.difficulty}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 5% 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 48, alignItems: "start" }}>

          {/* ── LEFT ─────────────────────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 52 }}>

            {/* Description */}
            <FadeSection>
              <SLabel>Overview</SLabel>
              <p className="fd" style={{ fontSize: 20, color: MUTED, lineHeight: 1.85, fontWeight: 300 }}>
                {d.description}
              </p>
            </FadeSection>

            {/* Stats */}
            <FadeSection delay={0.05}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
                <StatCard icon={Clock} label="Duration" value={d.duration} />
                <StatCard icon={Users} label="Group Size" value={d.groupSize} />
                <StatCard icon={Calendar} label="Best Time" value={d.bestTime} />
                <StatCard icon={Mountain} label="Altitude" value={d.altitude} />
              </div>
            </FadeSection>

            {/* Gallery */}
            <FadeSection delay={0.08}>
              <SLabel>Gallery</SLabel>
              <div style={{
                borderRadius: 14, overflow: "hidden", marginBottom: 10,
                border: `1px solid ${BORDER}`,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                aspectRatio: "16/7",
              }}>
                <img
                  src={d.gallery[activeImg]}
                  alt="main"
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.3s" }}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                {d.gallery.map((img, i) => (
                  <div
                    key={i}
                    className={`gal-thumb ${activeImg === i ? "active" : ""}`}
                    onClick={() => setActiveImg(i)}
                    style={{
                      borderRadius: 8, overflow: "hidden", aspectRatio: "4/3",
                      border: activeImg === i ? `2px solid ${G}` : `1px solid ${BORDER}`,
                      boxShadow: activeImg === i ? `0 2px 12px rgba(184,134,11,0.2)` : "none",
                    }}
                  >
                    <img src={img} alt={`g${i}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ))}
              </div>
            </FadeSection>

            {/* Highlights */}
            <FadeSection delay={0.1}>
              <SLabel>Journey Highlights</SLabel>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {d.highlights.map((h) => (
                  <span
                    key={h}
                    className="hl-pill"
                    style={{
                      fontSize: 12, padding: "8px 18px", borderRadius: "999px",
                      background: GL, border: `1px solid ${GB}`,
                      color: GD, fontFamily: "sans-serif", cursor: "default", fontWeight: 500,
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>
            </FadeSection>

            {/* Itinerary */}
            <FadeSection delay={0.12}>
              <SLabel>Day-by-Day Itinerary</SLabel>
              <div style={{
                background: CARD,
                border: `1px solid ${BORDER}`,
                borderRadius: 16,
                padding: "0 20px",
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
              }}>
                {d.itinerary.map((item, i) => (
                  <AccordionItem key={item.day} {...item} isLast={i === d.itinerary.length - 1} />
                ))}
              </div>
            </FadeSection>

            {/* Includes / Excludes */}
            <FadeSection delay={0.14}>
              <SLabel>What's Covered</SLabel>

              <div
                style={{
                  display: "inline-flex", background: SURFACE,
                  border: `1px solid ${BORDER}`, borderRadius: 10,
                  padding: 3, marginBottom: 18,
                }}
              >
                {["includes", "excludes"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    style={{
                      padding: "7px 20px", borderRadius: 8, fontSize: 11,
                      fontFamily: "sans-serif", fontWeight: 600, border: "none",
                      cursor: "pointer", transition: "all 0.2s",
                      background: tab === t ? G : "transparent",
                      color: tab === t ? "#fff" : MUTED,
                      letterSpacing: "1px",
                      boxShadow: tab === t ? "0 2px 8px rgba(184,134,11,0.25)" : "none",
                    }}
                  >
                    {t === "includes" ? "✓  Included" : "✗  Excluded"}
                  </button>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {(tab === "includes" ? d.includes : d.excludes).map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "12px 16px", borderRadius: 12,
                      background: tab === "includes" ? GL : "rgba(220,50,50,0.04)",
                      border: `1px solid ${tab === "includes" ? GB : "rgba(220,50,50,0.14)"}`,
                    }}
                  >
                    <div style={{
                      width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                      background: tab === "includes" ? G : "rgba(220,50,50,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Check size={10} color={tab === "includes" ? "#fff" : "#cc3333"} />
                    </div>
                    <span style={{ fontSize: 12, color: tab === "includes" ? TEXT : MUTED, fontFamily: "sans-serif" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </FadeSection>
          </div>

          {/* ── RIGHT STICKY ──────────────────────────────────────────── */}
          <div style={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Booking card */}
            <div style={{
              background: CARD,
              border: `1px solid ${BORDER}`,
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 4px 30px rgba(184,134,11,0.10)",
            }}>
              {/* Gold header */}
              <div style={{ background: `linear-gradient(135deg, ${G}, ${GD})`, padding: "20px 24px" }}>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.65)", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 4 }}>
                  Starting from
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span className="fd" style={{ fontSize: 42, fontWeight: 300, color: "#fff", lineHeight: 1 }}>
                    {d.price}
                  </span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "sans-serif" }}>/ person</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={11} fill={i < Math.floor(parseFloat(d.rating)) ? "#fff" : "transparent"} color="#fff" />
                  ))}
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", fontFamily: "sans-serif", marginLeft: 4 }}>
                    {d.rating} ({d.reviews} reviews)
                  </span>
                </div>
              </div>

              <div style={{ padding: "20px 24px" }}>
                <div style={{ marginBottom: 18 }}>
                  {d.includes.map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <div style={{
                        width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
                        background: GL, border: `1px solid ${GB}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Check size={8} color={G} />
                      </div>
                      <span style={{ fontSize: 11, color: MUTED, fontFamily: "sans-serif" }}>{item}</span>
                    </div>
                  ))}
                </div>

                <div style={{ height: "1px", background: BORDER, marginBottom: 16 }} />

                <button
                  className="book-btn"
                  style={{
                    width: "100%", background: G, color: "#fff",
                    border: "none", padding: "14px", borderRadius: 12,
                    fontSize: 11, fontWeight: 700, letterSpacing: "2px",
                    textTransform: "uppercase", cursor: "pointer",
                    fontFamily: "sans-serif", marginBottom: 10,
                    boxShadow: "0 4px 16px rgba(184,134,11,0.25)",
                  }}
                >
                  Reserve My Spot
                </button>

                <button
                  className="enq-btn"
                  style={{
                    width: "100%", background: "transparent",
                    border: `1px solid ${GB}`, color: G,
                    padding: "12px", borderRadius: 12,
                    fontSize: 11, fontWeight: 600, letterSpacing: "2px",
                    textTransform: "uppercase", cursor: "pointer",
                    fontFamily: "sans-serif", marginBottom: 10,
                  }}
                >
                  Enquire Now
                </button>

                <button
                  style={{
                    width: "100%", background: "transparent",
                    border: `1px solid ${BORDER}`, color: MUTED,
                    padding: "11px", borderRadius: 12,
                    fontSize: 11, letterSpacing: "1px",
                    cursor: "pointer", fontFamily: "sans-serif",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  }}
                >
                  <Download size={12} /> Download Itinerary
                </button>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 14 }}>
                  <Shield size={11} color={SUBTLE} />
                  <span style={{ fontSize: 10, color: SUBTLE, fontFamily: "sans-serif" }}>
                    Secure booking · Free cancellation
                  </span>
                </div>
              </div>
            </div>

            {/* Contact card */}
            <div style={{
              background: CARD,
              border: `1px solid ${BORDER}`,
              borderRadius: 16,
              padding: "18px 20px",
              boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
            }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: TEXT, fontFamily: "sans-serif", marginBottom: 12 }}>
                Need Help Planning?
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <a href="tel:+919876543210" style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 14px", borderRadius: 10, textDecoration: "none",
                  background: GL, border: `1px solid ${GB}`,
                }}>
                  <Phone size={13} color={G} />
                  <span style={{ fontSize: 12, color: GD, fontFamily: "sans-serif", fontWeight: 500 }}>+91 98765 43210</span>
                </a>
                <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 14px", borderRadius: 10, textDecoration: "none",
                  background: "rgba(37,211,102,0.06)", border: "1px solid rgba(37,211,102,0.18)",
                }}>
                  <MessageCircle size={13} color="#1da851" />
                  <span style={{ fontSize: 12, color: "#1da851", fontFamily: "sans-serif", fontWeight: 500 }}>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Meta note */}
            <p style={{ fontSize: 10, color: SUBTLE, fontFamily: "sans-serif", textAlign: "center", lineHeight: 1.6 }}>
              * Price includes accommodation, permits & meals as mentioned above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}