import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Star, MapPin, Clock, Users, Calendar,
  Thermometer, Shield, ChevronDown, ChevronUp, Check,
  Camera, Wind, Phone, MessageCircle
} from 'lucide-react';

// ─── Color Tokens ─────────────────────────────────────────────────────────────
const G = '#C9A84C';      // gold primary
const GD = '#A8882A';     // gold dark
const GL = 'rgba(201,168,76,0.12)'; // gold light bg
const GB = 'rgba(201,168,76,0.25)'; // gold border
const DARK = '#0D0D0D';
const CARD = '#161616';
const SURFACE = '#111111';
const BORDER = '#2a2a2a';

// ─── Destination Data ─────────────────────────────────────────────────────────
const destinationsData = {
  rishikesh: {
    title: "Rishikesh",
    location: "Uttarakhand, India",
    region: "Garhwal",
    category: "Adventure",
    rating: "4.9",
    reviews: 1284,
    price: "15,500",
    tagline: "The Yoga Capital of the World",
    description:
      "Nestled in the foothills of the Himalayas where the sacred Ganges flows swift and clear, Rishikesh is a destination that cleanses both body and soul. Renowned as the global capital of yoga and meditation, it offers a rare convergence of spiritual depth, adrenaline adventure, and Himalayan grandeur.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=600",
      "https://images.unsplash.com/photo-1561705048-c5084fe32cf8?q=80&w=600",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600",
    ],
    duration: "4 Days / 3 Nights",
    groupSize: "2–12 People",
    bestTime: "Oct – Mar",
    climate: "18°C – 30°C",
    altitude: "372m",
    highlights: ["White Water Rafting", "Yoga & Meditation", "Laxman Jhula", "Bungee Jumping", "Café Culture", "Ganga Aarti"],
    itinerary: [
      { day: 1, title: "Arrival & Sacred Ganga Aarti", desc: "Check-in to your riverside retreat. Evening witness the mesmerising Ganga Aarti at Triveni Ghat — a thousand lamps floating on the holy river." },
      { day: 2, title: "White Water Rafting", desc: "Tackle Grade III–IV rapids on a 16 km stretch. Afternoon free for yoga sessions or a visit to the Beatles Ashram." },
      { day: 3, title: "Himalayan Trek & Waterfall", desc: "Morning trek to Neer Garh Waterfall through lush forest trails. Evening bungee jumping or swing for the adventurous." },
      { day: 4, title: "Sunrise Yoga & Departure", desc: "Begin the day with a guided sunrise yoga session on the banks of the Ganges, then transfer to your onward journey." },
    ],
    includes: ["3-Night Accommodation", "Daily Breakfast", "Rafting Gear & Guide", "Airport Transfers", "GST Included"],
    excludes: ["Flights", "Personal Expenses", "Travel Insurance", "Meals not mentioned"],
  },
  mussoorie: {
    title: "Mussoorie",
    location: "Uttarakhand, India",
    region: "Garhwal",
    category: "Hill Station",
    rating: "4.8",
    reviews: 976,
    price: "12,000",
    tagline: "The Queen of Hills",
    description:
      "Perched at 2,000 metres above sea level, Mussoorie presides over the Doon Valley like a jewelled crown. Colonial-era architecture, swirling mist, pine-scented air, and panoramic Himalayan vistas make it the quintessential Indian hill escape.",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600",
    ],
    duration: "3 Days / 2 Nights",
    groupSize: "2–8 People",
    bestTime: "Mar – Jun",
    climate: "10°C – 25°C",
    altitude: "2,005m",
    highlights: ["Mall Road", "Kempty Falls", "Gun Hill Cable Car", "Camel's Back Road", "Landour Bakehouse", "Cloud's End"],
    itinerary: [
      { day: 1, title: "Arrival & Mall Road", desc: "Arrive and stroll the iconic Mall Road. Evening at Kulri Bazaar for local handicrafts and Tibetan momos." },
      { day: 2, title: "Kempty Falls & Gun Hill", desc: "Morning visit to the cascading Kempty Falls. Afternoon cable-car ride to Gun Hill for 360° Himalayan views." },
      { day: 3, title: "Camel's Back & Departure", desc: "Sunrise walk along Camel's Back Road. Visit Landour's colonial lanes before your afternoon departure." },
    ],
    includes: ["2-Night Accommodation", "Daily Breakfast", "Cable Car Tickets", "Local Guide", "GST Included"],
    excludes: ["Flights", "Personal Expenses", "Travel Insurance", "Meals not mentioned"],
  },
  auli: {
    title: "Auli",
    location: "Uttarakhand, India",
    region: "Chamoli",
    category: "Adventure",
    rating: "4.9",
    reviews: 743,
    price: "18,500",
    tagline: "India's Premier Skiing Destination",
    description:
      "At 2,519 metres, Auli's pristine ski slopes are draped in powder snow against a backdrop of Nanda Devi — India's second-highest peak. World-class ski infrastructure, a legendary gondola, and untouched oak forests make Auli an Olympian escape.",
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=600",
      "https://images.unsplash.com/photo-1548777123-e216912df7d8?q=80&w=600",
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=600",
    ],
    duration: "5 Days / 4 Nights",
    groupSize: "2–10 People",
    bestTime: "Jan – Mar",
    climate: "-5°C – 10°C",
    altitude: "2,519m",
    highlights: ["Skiing & Snowboarding", "Asia's Longest Gondola", "Nanda Devi Views", "Joshimath Visit", "Snow Trekking", "Artificial Lake"],
    itinerary: [
      { day: 1, title: "Arrival at Joshimath", desc: "Drive from Haridwar to Joshimath. Gondola ride up to Auli. Check-in at a snow-view resort." },
      { day: 2, title: "Beginner Ski Training", desc: "Full-day ski school on Auli's gentle slopes with certified instructors. Equipment provided." },
      { day: 3, title: "Advanced Slopes", desc: "Take on longer runs with your guide. Afternoon visit the artificial lake." },
      { day: 4, title: "Snow Trek to Gorson Bugyal", desc: "A scenic 4 km trek through oak and rhododendron forests blanketed in snow to Gorson meadow." },
      { day: 5, title: "Departure", desc: "Last gondola ride at sunrise for golden hour on the peaks, then transfer back to Haridwar." },
    ],
    includes: ["4-Night Accommodation", "Ski Equipment & Lessons", "Gondola Passes", "All Meals", "GST Included"],
    excludes: ["Flights", "Personal Expenses", "Travel Insurance", "Extra ski runs"],
  },
  nainital: {
    title: "Nainital",
    location: "Uttarakhand, India",
    region: "Kumaon",
    category: "Hill Station",
    rating: "4.7",
    reviews: 1102,
    price: "14,000",
    tagline: "The City of Lakes",
    description:
      "Cradled within the Kumaon hills, Nainital's emerald Naini Lake mirrors cloud-draped peaks in its still waters. This charming colonial town has enchanted travellers for over 150 years with its boat rides, misty promenades, and vibrant bazaars.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600",
    ],
    duration: "3 Days / 2 Nights",
    groupSize: "2–10 People",
    bestTime: "Mar – Jun, Sep – Nov",
    climate: "12°C – 27°C",
    altitude: "2,084m",
    highlights: ["Naini Lake Boating", "Naina Devi Temple", "Snow View Point", "Mall Road", "Tiffin Top Trek", "Eco Cave Gardens"],
    itinerary: [
      { day: 1, title: "Arrival & Naini Lake", desc: "Arrive and settle in. Evening row boat on the serene Naini Lake as the hills turn golden." },
      { day: 2, title: "Snow View & Tiffin Top", desc: "Ropeway to Snow View Point for Himalayan panoramas. Afternoon horse ride to Tiffin Top." },
      { day: 3, title: "Naina Devi & Departure", desc: "Morning prayers at the ancient Naina Devi Temple on the lake shore, then leisurely departure." },
    ],
    includes: ["2-Night Accommodation", "Daily Breakfast", "Ropeway Tickets", "Boat Ride", "GST Included"],
    excludes: ["Flights", "Personal Expenses", "Travel Insurance", "Meals not mentioned"],
  },
  "valley-of-flowers": {
    title: "Valley of Flowers",
    location: "Uttarakhand, India",
    region: "Chamoli",
    category: "Adventure",
    rating: "5.0",
    reviews: 589,
    price: "22,000",
    tagline: "A UNESCO World Heritage Site",
    description:
      "Hidden at 3,658 metres in the Zanskar range, this enchanted valley erupts each monsoon in a riotous tapestry of 500+ alpine flower species. Walking here feels like stepping inside a living painting — utterly otherworldly, fiercely protected, forever unforgettable.",
    image: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600",
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=600",
    ],
    duration: "6 Days / 5 Nights",
    groupSize: "2–8 People",
    bestTime: "Jul – Sep",
    climate: "7°C – 17°C",
    altitude: "3,658m",
    highlights: ["UNESCO World Heritage", "500+ Flower Species", "Hemkund Sahib", "Ghangaria Base Camp", "Bhyundar Village", "Snow Bridge Crossing"],
    itinerary: [
      { day: 1, title: "Haridwar to Joshimath", desc: "Scenic drive through the Alaknanda valley, overnight in Joshimath." },
      { day: 2, title: "Trek to Ghangaria", desc: "14 km trek from Govindghat through dense forest to the base camp of Ghangaria." },
      { day: 3, title: "Valley of Flowers", desc: "Full day in the valley. Walk 4 km through a living canvas of Brahmakamal, Blue Poppy, and Cobra Lily." },
      { day: 4, title: "Hemkund Sahib", desc: "Trek to the sacred Sikh shrine at 4,632 m beside a glacial lake — a profound spiritual experience." },
      { day: 5, title: "Leisurely Descent", desc: "Slow descent back to Govindghat, optional photography stops." },
      { day: 6, title: "Return Journey", desc: "Drive back to Haridwar with memories of a lifetime." },
    ],
    includes: ["5-Night Accommodation", "All Meals on Trek", "Forest Entry Permits", "Certified Trek Guide", "GST Included"],
    excludes: ["Flights", "Personal Expenses", "Travel Insurance", "Porter charges"],
  },
  "jim-corbett": {
    title: "Jim Corbett",
    location: "Uttarakhand, India",
    region: "Nainital",
    category: "Wildlife",
    rating: "4.6",
    reviews: 867,
    price: "19,000",
    tagline: "Wilderness at its Best",
    description:
      "India's oldest national park shelters the largest population of Bengal tigers in the country. Jeep safaris through dense sal forests, elephant grasslands, and the Ramganga river valley deliver raw, unscripted wildlife encounters.",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=600",
      "https://images.unsplash.com/photo-1561705048-c5084fe32cf8?q=80&w=600",
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=600",
    ],
    duration: "3 Days / 2 Nights",
    groupSize: "2–6 People",
    bestTime: "Nov – Jun",
    climate: "10°C – 30°C",
    altitude: "400m",
    highlights: ["Bengal Tiger Safaris", "Elephant & Leopard Sightings", "Ramganga River", "Bird Watching (600 Species)", "Dhikala Zone", "Corbett Museum"],
    itinerary: [
      { day: 1, title: "Arrival & Evening Safari", desc: "Check-in at jungle lodge. Evening jeep safari in Bijrani or Jhirna zone during golden hour." },
      { day: 2, title: "Dhikala Zone Full Day", desc: "Full-day permit in the famed Dhikala zone — highest tiger density. Packed lunch inside the park." },
      { day: 3, title: "Morning Safari & Departure", desc: "Dawn safari for misty river crossings and bird photography, then departure by noon." },
    ],
    includes: ["2-Night Jungle Lodge", "Daily Breakfast & Dinner", "Safari Permits & Jeep", "Naturalist Guide", "GST Included"],
    excludes: ["Flights", "Personal Expenses", "Travel Insurance", "Camera fees"],
  },
};

// ─── Accordion ────────────────────────────────────────────────────────────────
const AccordionItem = ({ day, title, desc, isLast }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: isLast ? 'none' : `0.5px solid ${BORDER}` }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <div className="flex items-center gap-4">
          <span
            className="text-xs font-semibold w-8 flex-shrink-0 font-mono"
            style={{ color: G }}
          >
            D{String(day).padStart(2, '0')}
          </span>
          <span
            className="text-sm font-medium transition-colors duration-200"
            style={{ color: open ? G : '#ccc', fontFamily: 'sans-serif' }}
          >
            {title}
          </span>
        </div>
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
          style={{ background: open ? G : BORDER }}
        >
          {open
            ? <ChevronUp size={12} color="#0D0D0D" />
            : <ChevronDown size={12} color="#666" />
          }
        </div>
      </button>
      {open && (
        <p
          className="pb-4 pl-12 text-xs leading-relaxed"
          style={{ color: '#666', fontFamily: 'sans-serif' }}
        >
          {desc}
        </p>
      )}
    </div>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value }) => (
  <div
    className="rounded-xl p-4 text-center"
    style={{ background: CARD, border: `0.5px solid ${BORDER}` }}
  >
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2"
      style={{ background: GL, border: `0.5px solid ${GB}` }}
    >
      <Icon size={14} color={G} />
    </div>
    <div
      className="text-[9px] uppercase tracking-[2px] mb-1"
      style={{ color: '#555', fontFamily: 'sans-serif' }}
    >
      {label}
    </div>
    <div
      className="text-xs font-semibold leading-tight"
      style={{ color: '#fff', fontFamily: 'sans-serif' }}
    >
      {value}
    </div>
  </div>
);

// ─── Animated Section Wrapper ─────────────────────────────────────────────────
const FadeSection = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

// ─── Section Label ────────────────────────────────────────────────────────────
const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="h-px w-8" style={{ background: G }} />
    <span
      className="text-[10px] uppercase tracking-[3px] font-semibold"
      style={{ color: G, fontFamily: 'sans-serif' }}
    >
      {children}
    </span>
    <div className="h-px flex-1" style={{ background: BORDER }} />
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const DestinationDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dest = destinationsData[slug];
  const [activeGallery, setActiveGallery] = useState(null);
  const [tab, setTab] = useState('includes');

  if (!dest) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-6"
        style={{ background: DARK }}
      >
        <p className="text-3xl font-light" style={{ color: '#555', fontFamily: 'Georgia, serif' }}>
          Destination not found
        </p>
        <button
          onClick={() => navigate('/destination')}
          className="text-sm underline"
          style={{ color: G }}
        >
          ← Back to Destinations
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: DARK, minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        @keyframes heroFade {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-animate { animation: heroFade 0.9s ease forwards; }
        .hero-animate-2 { animation: heroFade 0.9s ease 0.15s both; }
        .hero-animate-3 { animation: heroFade 0.9s ease 0.3s both; }
        .gallery-img:hover { transform: scale(1.05); }
        .gallery-img { transition: transform 0.5s ease; }
        .highlight-pill:hover { background: rgba(201,168,76,0.2) !important; border-color: #C9A84C !important; }
        .highlight-pill { transition: all 0.2s ease; }
        .book-btn:hover { background: #A8882A !important; transform: translateY(-1px); }
        .book-btn { transition: all 0.25s ease; }
        .enquire-btn:hover { background: rgba(201,168,76,0.1) !important; }
        .enquire-btn { transition: all 0.25s ease; }
        .back-btn:hover { background: rgba(255,255,255,0.15) !important; }
        .back-btn { transition: all 0.2s ease; }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ height: '75vh', minHeight: '500px' }}>
        <img
          src={dest.image}
          alt={dest.title}
          className="w-full h-full object-cover"
          style={{ transform: 'scale(1.04)', transition: 'transform 8s ease' }}
        />
        {/* Dark overlay layers */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.4) 50%, rgba(13,13,13,0.2) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,13,13,0.3) 0%, transparent 60%)' }} />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="back-btn absolute top-6 left-6 z-10 flex items-center gap-2 text-xs uppercase tracking-widest px-4 py-2.5 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            border: '0.5px solid rgba(255,255,255,0.15)',
            color: '#fff',
            fontFamily: 'sans-serif',
          }}
        >
          <ArrowLeft size={13} /> Back
        </button>

        {/* Category + Rating top right */}
        <div className="absolute top-6 right-6 z-10 flex gap-2">
          <div
            className="text-[9px] uppercase tracking-[2px] px-3 py-1.5 rounded-full font-semibold"
            style={{ background: GL, border: `0.5px solid ${GB}`, color: G, backdropFilter: 'blur(12px)', fontFamily: 'sans-serif' }}
          >
            {dest.category}
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.08)', border: '0.5px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}
          >
            <Star size={11} fill={G} color={G} />
            <span className="text-white text-xs font-semibold" style={{ fontFamily: 'sans-serif' }}>{dest.rating}</span>
            <span className="text-xs" style={{ color: '#888', fontFamily: 'sans-serif' }}>({dest.reviews})</span>
          </div>
        </div>

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 lg:px-24 pb-14">
          <div className="hero-animate flex items-center gap-2 mb-3">
            <MapPin size={12} color={G} />
            <span
              className="text-xs uppercase tracking-[3px]"
              style={{ color: G, fontFamily: 'sans-serif' }}
            >
              {dest.location} · {dest.region}
            </span>
          </div>
          <h1
            className="font-display hero-animate-2 text-white leading-none mb-3"
            style={{ fontSize: 'clamp(52px, 10vw, 96px)', fontWeight: 300 }}
          >
            {dest.title}
          </h1>
          <p
            className="font-display hero-animate-3 italic"
            style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(16px, 2.5vw, 22px)', fontWeight: 300 }}
          >
            "{dest.tagline}"
          </p>

          {/* Quick badges row */}
          <div className="hero-animate-3 flex flex-wrap gap-3 mt-5">
            {[
              { icon: Clock, val: dest.duration },
              { icon: Calendar, val: dest.bestTime },
              { icon: Thermometer, val: dest.altitude },
              { icon: Users, val: dest.groupSize },
            ].map(({ icon: Icon, val }) => (
              <div
                key={val}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(13,13,13,0.6)', border: `0.5px solid ${BORDER}`, backdropFilter: 'blur(8px)' }}
              >
                <Icon size={11} color={G} />
                <span className="text-xs" style={{ color: '#ccc', fontFamily: 'sans-serif' }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">

          {/* ── LEFT COLUMN ──────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-14">

            {/* Description */}
            <FadeSection>
              <SectionLabel>About</SectionLabel>
              <p
                className="font-display text-xl leading-relaxed font-light"
                style={{ color: '#aaa', lineHeight: 1.85 }}
              >
                {dest.description}
              </p>
            </FadeSection>

            {/* Stats grid */}
            <FadeSection delay={0.05}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <StatCard icon={Clock} label="Duration" value={dest.duration} />
                <StatCard icon={Users} label="Group Size" value={dest.groupSize} />
                <StatCard icon={Calendar} label="Best Time" value={dest.bestTime} />
                <StatCard icon={Thermometer} label="Climate" value={dest.climate} />
              </div>
            </FadeSection>

            {/* Gallery */}
            <FadeSection delay={0.08}>
              <SectionLabel>Gallery</SectionLabel>
              <div className="grid grid-cols-3 gap-3">
                {dest.gallery.map((img, i) => (
                  <div
                    key={i}
                    className="relative rounded-xl overflow-hidden cursor-pointer"
                    style={{ aspectRatio: '4/3', border: `0.5px solid ${BORDER}` }}
                    onClick={() => setActiveGallery(activeGallery === i ? null : i)}
                  >
                    <img
                      src={img}
                      alt={`gallery-${i}`}
                      className="gallery-img w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'rgba(13,13,13,0.5)' }}
                    >
                      <Camera size={20} color={G} />
                    </div>
                  </div>
                ))}
              </div>
            </FadeSection>

            {/* Highlights */}
            <FadeSection delay={0.1}>
              <SectionLabel>Highlights</SectionLabel>
              <div className="flex flex-wrap gap-2.5">
                {dest.highlights.map((h) => (
                  <span
                    key={h}
                    className="highlight-pill text-xs px-4 py-2 rounded-full cursor-default"
                    style={{
                      background: GL,
                      border: `0.5px solid ${GB}`,
                      color: G,
                      fontFamily: 'sans-serif',
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>
            </FadeSection>

            {/* Itinerary */}
            <FadeSection delay={0.12}>
              <SectionLabel>Day-by-Day Itinerary</SectionLabel>
              <div
                className="rounded-2xl overflow-hidden px-5"
                style={{ background: CARD, border: `0.5px solid ${BORDER}` }}
              >
                {dest.itinerary.map((item, i) => (
                  <AccordionItem
                    key={item.day}
                    {...item}
                    isLast={i === dest.itinerary.length - 1}
                  />
                ))}
              </div>
            </FadeSection>

            {/* Includes / Excludes tabs */}
            <FadeSection delay={0.14}>
              <SectionLabel>What's Covered</SectionLabel>
              {/* Tab toggle */}
              <div
                className="flex rounded-lg p-0.5 mb-5 w-fit"
                style={{ background: SURFACE, border: `0.5px solid ${BORDER}` }}
              >
                {['includes', 'excludes'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className="px-5 py-2 rounded-md text-xs font-medium capitalize transition-all duration-200"
                    style={{
                      background: tab === t ? G : 'transparent',
                      color: tab === t ? '#0D0D0D' : '#666',
                      fontFamily: 'sans-serif',
                    }}
                  >
                    {t === 'includes' ? '✓ Included' : '✗ Excluded'}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(tab === 'includes' ? dest.includes : dest.excludes).map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{
                      background: tab === 'includes' ? GL : 'rgba(255,100,100,0.05)',
                      border: `0.5px solid ${tab === 'includes' ? GB : 'rgba(255,100,100,0.15)'}`,
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: tab === 'includes' ? G : 'rgba(255,100,100,0.2)' }}
                    >
                      <Check size={10} color={tab === 'includes' ? '#0D0D0D' : '#ff6464'} />
                    </div>
                    <span
                      className="text-xs"
                      style={{ color: tab === 'includes' ? '#ccc' : '#888', fontFamily: 'sans-serif' }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </FadeSection>
          </div>

          {/* ── RIGHT STICKY CARD ────────────────────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-4">

              {/* Booking card */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ background: CARD, border: `0.5px solid ${BORDER}` }}
              >
                {/* Gold top bar */}
                <div
                  className="px-6 py-4"
                  style={{ background: `linear-gradient(135deg, ${G} 0%, ${GD} 100%)` }}
                >
                  <p
                    className="text-[9px] uppercase tracking-[2px] mb-0.5"
                    style={{ color: 'rgba(13,13,13,0.6)', fontFamily: 'sans-serif' }}
                  >
                    Starting from
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="font-display text-4xl font-light"
                      style={{ color: '#0D0D0D' }}
                    >
                      ₹{dest.price}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: 'rgba(13,13,13,0.55)', fontFamily: 'sans-serif' }}
                    >
                      / person
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Includes preview */}
                  <div className="mb-5 space-y-2.5">
                    {dest.includes.map((item) => (
                      <div key={item} className="flex items-center gap-2.5">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: GL, border: `0.5px solid ${GB}` }}
                        >
                          <Check size={8} color={G} />
                        </div>
                        <span className="text-xs" style={{ color: '#888', fontFamily: 'sans-serif' }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="w-full mb-4" style={{ height: '0.5px', background: BORDER }} />

                  {/* CTA buttons */}
                  <button
                    className="book-btn w-full py-3.5 rounded-xl text-xs font-semibold uppercase tracking-[2px] mb-3"
                    style={{ background: G, color: '#0D0D0D', fontFamily: 'sans-serif' }}
                  >
                    Book This Trip
                  </button>
                  <button
                    className="enquire-btn w-full py-3 rounded-xl text-xs font-semibold uppercase tracking-[2px]"
                    style={{
                      border: `0.5px solid ${GB}`,
                      color: G,
                      background: 'transparent',
                      fontFamily: 'sans-serif',
                    }}
                  >
                    Enquire Now
                  </button>

                  {/* Trust badge */}
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <Shield size={11} color="#555" />
                    <span className="text-[10px]" style={{ color: '#555', fontFamily: 'sans-serif' }}>
                      Secure booking · Free cancellation
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick contact card */}
              <div
                className="rounded-2xl p-5"
                style={{ background: CARD, border: `0.5px solid ${BORDER}` }}
              >
                <p
                  className="text-xs font-semibold mb-3"
                  style={{ color: '#fff', fontFamily: 'sans-serif' }}
                >
                  Need Help Planning?
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors hover:opacity-80"
                    style={{ background: GL, border: `0.5px solid ${GB}` }}
                  >
                    <Phone size={13} color={G} />
                    <span className="text-xs" style={{ color: G, fontFamily: 'sans-serif' }}>
                      +91 98765 43210
                    </span>
                  </a>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors hover:opacity-80"
                    style={{ background: 'rgba(37,211,102,0.08)', border: '0.5px solid rgba(37,211,102,0.2)' }}
                  >
                    <MessageCircle size={13} color="#25D366" />
                    <span className="text-xs" style={{ color: '#25D366', fontFamily: 'sans-serif' }}>
                      Chat on WhatsApp
                    </span>
                  </a>
                </div>
              </div>

              {/* Rating summary card */}
              <div
                className="rounded-2xl p-5"
                style={{ background: CARD, border: `0.5px solid ${BORDER}` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span
                      className="text-3xl font-semibold"
                      style={{ color: G, fontFamily: 'sans-serif' }}
                    >
                      {dest.rating}
                    </span>
                    <span className="text-xs ml-1" style={{ color: '#555', fontFamily: 'sans-serif' }}>/ 5.0</span>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        fill={i < Math.floor(parseFloat(dest.rating)) ? G : 'transparent'}
                        color={G}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-[10px]" style={{ color: '#555', fontFamily: 'sans-serif' }}>
                  Based on {dest.reviews.toLocaleString()} verified reviews
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;