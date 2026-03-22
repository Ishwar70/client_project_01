import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Star, MapPin, Clock, Users, Calendar,
  Wind, Thermometer, Camera, Shield, ChevronDown, ChevronUp, Check
} from 'lucide-react';

// ─── Destination Data ────────────────────────────────────────────────────────
const destinationsData = {
  rishikesh: {
    title: "Rishikesh",
    location: "Uttarakhand, India",
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
    highlights: ["White Water Rafting", "Yoga & Meditation", "Laxman Jhula", "Bungee Jumping", "Café Culture", "Ganga Aarti"],
    itinerary: [
      { day: 1, title: "Arrival & Sacred Ganga Aarti", desc: "Check-in to your riverside retreat. Evening witness the mesmerising Ganga Aarti at Triveni Ghat — a thousand lamps floating on the holy river." },
      { day: 2, title: "White Water Rafting", desc: "Tackle Grade III–IV rapids on a 16 km stretch. Afternoon free for yoga sessions or a visit to the Beatles Ashram." },
      { day: 3, title: "Himalayan Trek & Waterfall", desc: "Morning trek to Neer Garh Waterfall through lush forest trails. Evening bungee jumping or swing for the adventurous." },
      { day: 4, title: "Sunrise Yoga & Departure", desc: "Begin the day with a guided sunrise yoga session on the banks of the Ganges, then transfer to your onward journey." },
    ],
    includes: ["3-Night Accommodation", "Daily Breakfast", "Rafting Gear & Guide", "Airport Transfers", "GST Included"],
  },
  mussoorie: {
    title: "Mussoorie",
    location: "Uttarakhand, India",
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
    highlights: ["Mall Road", "Kempty Falls", "Gun Hill Cable Car", "Camel's Back Road", "Landour Bakehouse", "Cloud's End"],
    itinerary: [
      { day: 1, title: "Arrival & Mall Road", desc: "Arrive and stroll the iconic Mall Road. Evening at Kulri Bazaar for local handicrafts and Tibetan momos." },
      { day: 2, title: "Kempty Falls & Gun Hill", desc: "Morning visit to the cascading Kempty Falls. Afternoon cable-car ride to Gun Hill for 360° Himalayan views." },
      { day: 3, title: "Camel's Back & Departure", desc: "Sunrise walk along Camel's Back Road. Visit Landour's colonial lanes before your afternoon departure." },
    ],
    includes: ["2-Night Accommodation", "Daily Breakfast", "Cable Car Tickets", "Local Guide", "GST Included"],
  },
  auli: {
    title: "Auli",
    location: "Uttarakhand, India",
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
    highlights: ["Skiing & Snowboarding", "Asia's Longest Gondola", "Nanda Devi Views", "Joshimath Visit", "Snow Trekking", "Artificial Lake"],
    itinerary: [
      { day: 1, title: "Arrival at Joshimath", desc: "Drive from Haridwar to Joshimath. Gondola ride up to Auli. Check-in at a snow-view resort." },
      { day: 2, title: "Beginner Ski Training", desc: "Full-day ski school on Auli's gentle slopes with certified instructors. Equipment provided." },
      { day: 3, title: "Advanced Slopes", desc: "Take on longer runs with your guide. Afternoon visit the artificial lake — world's highest man-made lake." },
      { day: 4, title: "Snow Trek to Gorson Bugyal", desc: "A scenic 4 km trek through oak and rhododendron forests blanketed in snow to Gorson meadow." },
      { day: 5, title: "Departure", desc: "Last gondola ride at sunrise for golden hour on the peaks, then transfer back to Haridwar/Dehradun." },
    ],
    includes: ["4-Night Accommodation", "Ski Equipment & Lessons", "Gondola Passes", "All Meals", "GST Included"],
  },
  nainital: {
    title: "Nainital",
    location: "Uttarakhand, India",
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
    highlights: ["Naini Lake Boating", "Naina Devi Temple", "Snow View Point", "Mall Road", "Tiffin Top Trek", "Eco Cave Gardens"],
    itinerary: [
      { day: 1, title: "Arrival & Naini Lake", desc: "Arrive and settle in. Evening row boat on the serene Naini Lake as the hills turn golden." },
      { day: 2, title: "Snow View & Tiffin Top", desc: "Ropeway to Snow View Point for Himalayan panoramas. Afternoon horse ride to Tiffin Top." },
      { day: 3, title: "Naina Devi & Departure", desc: "Morning prayers at the ancient Naina Devi Temple on the lake shore, then leisurely departure." },
    ],
    includes: ["2-Night Accommodation", "Daily Breakfast", "Ropeway Tickets", "Boat Ride", "GST Included"],
  },
  "valley-of-flowers": {
    title: "Valley of Flowers",
    location: "Uttarakhand, India",
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
  },
  "jim-corbett": {
    title: "Jim Corbett",
    location: "Uttarakhand, India",
    rating: "4.6",
    reviews: 867,
    price: "19,000",
    tagline: "Wilderness at its Best",
    description:
      "India's oldest national park, named after the legendary hunter-turned-conservationist Jim Corbett, shelters the largest population of Bengal tigers in the country. Jeep safaris through dense sal forests, elephant grasslands, and the Ramganga river valley deliver raw, unscripted wildlife encounters.",
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
    highlights: ["Bengal Tiger Safaris", "Elephant & Leopard Sightings", "Ramganga River", "Bird Watching (600 Species)", "Dhikala Zone", "Corbett Museum"],
    itinerary: [
      { day: 1, title: "Arrival & Evening Safari", desc: "Check-in at jungle lodge. Evening jeep safari in Bijrani or Jhirna zone during golden hour." },
      { day: 2, title: "Dhikala Zone Full Day", desc: "Full-day permit in the famed Dhikala zone — highest tiger density. Packed lunch inside the park." },
      { day: 3, title: "Morning Safari & Departure", desc: "Dawn safari for misty river crossings and bird photography, then departure by noon." },
    ],
    includes: ["2-Night Jungle Lodge", "Daily Breakfast & Dinner", "Safari Permits & Jeep", "Naturalist Guide", "GST Included"],
  },
};

// ─── Accordion Component ──────────────────────────────────────────────────────
const AccordionItem = ({ day, title, desc }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#D4AF37]/15 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <div className="flex items-center gap-4">
          <span className="font-serif text-[#D4AF37] text-lg w-8">D{day}</span>
          <span className="font-sans text-sm font-semibold text-gray-800 group-hover:text-[#B8860B] transition-colors">{title}</span>
        </div>
        {open ? <ChevronUp size={16} className="text-[#D4AF37]" /> : <ChevronDown size={16} className="text-[#D4AF37]/50" />}
      </button>
      {open && (
        <p className="pb-4 pl-12 text-sm text-gray-500 font-sans leading-relaxed">{desc}</p>
      )}
    </div>
  );
};

// ─── Main Detail Page ─────────────────────────────────────────────────────────
const DestinationDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dest = destinationsData[slug];

  if (!dest) {
    return (
      <div className="min-h-screen bg-[#FFFCF7] flex flex-col items-center justify-center gap-6">
        <p className="font-serif text-3xl text-gray-400">Destination not found</p>
        <button onClick={() => navigate('/destinations')} className="text-[#B8860B] text-sm underline">
          ← Back to Destinations
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFCF7] min-h-screen font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp { animation: fadeUp 0.7s ease forwards; }
      `}</style>

      {/* ── Hero ──────────────────────────────────────────── */}
      <div className="relative h-[70vh] overflow-hidden">
        <img src={dest.image} alt={dest.title} className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs uppercase tracking-widest px-4 py-2.5 rounded-full hover:bg-white/20 transition-all"
        >
          <ArrowLeft size={14} /> Back
        </button>

        {/* Hero Text */}
        <div className="absolute bottom-10 left-0 right-0 px-6 md:px-16 animate-fadeUp">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={14} className="text-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs uppercase tracking-[3px] font-sans">{dest.location}</span>
          </div>
          <h1 className="font-display text-6xl md:text-8xl font-light text-white leading-none mb-3">
            {dest.title}
          </h1>
          <p className="font-display italic text-white/70 text-xl md:text-2xl font-light">
            "{dest.tagline}"
          </p>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 text-center">
          <div className="flex items-center gap-1 justify-center mb-0.5">
            <Star size={14} className="fill-[#D4AF37] text-[#D4AF37]" />
            <span className="text-white font-semibold text-lg font-sans">{dest.rating}</span>
          </div>
          <div className="text-white/60 text-[10px] uppercase tracking-wider">{dest.reviews} reviews</div>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Left / Main Column */}
        <div className="lg:col-span-2 space-y-12">

          {/* Description */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#D4AF37]" />
              <span className="text-[10px] uppercase tracking-[3px] text-[#B8860B]">About</span>
            </div>
            <p className="font-display text-xl text-gray-700 leading-relaxed font-light">{dest.description}</p>
          </section>

          {/* Quick Stats */}
          <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Clock, label: "Duration", value: dest.duration },
              { icon: Users, label: "Group Size", value: dest.groupSize },
              { icon: Calendar, label: "Best Time", value: dest.bestTime },
              { icon: Thermometer, label: "Climate", value: dest.climate },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white border border-[#D4AF37]/15 rounded-2xl p-4 text-center shadow-sm">
                <Icon size={18} className="text-[#D4AF37] mx-auto mb-2" />
                <div className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">{label}</div>
                <div className="font-sans text-sm font-semibold text-gray-800 leading-tight">{value}</div>
              </div>
            ))}
          </section>

          {/* Gallery */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#D4AF37]" />
              <span className="text-[10px] uppercase tracking-[3px] text-[#B8860B]">Gallery</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {dest.gallery.map((img, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden">
                  <img src={img} alt={`gallery-${i}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </section>

          {/* Highlights */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#D4AF37]" />
              <span className="text-[10px] uppercase tracking-[3px] text-[#B8860B]">Highlights</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {dest.highlights.map((h) => (
                <span key={h} className="bg-white border border-[#D4AF37]/30 text-[#B8860B] text-xs font-medium px-4 py-1.5 rounded-full font-sans shadow-sm">
                  {h}
                </span>
              ))}
            </div>
          </section>

          {/* Itinerary */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#D4AF37]" />
              <span className="text-[10px] uppercase tracking-[3px] text-[#B8860B]">Itinerary</span>
            </div>
            <div className="bg-white border border-[#D4AF37]/15 rounded-2xl px-6 shadow-sm">
              {dest.itinerary.map((item) => (
                <AccordionItem key={item.day} {...item} />
              ))}
            </div>
          </section>
        </div>

        {/* ── Right Sticky Booking Card ──────────────────── */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="relative p-0.5 rounded-[22px]"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F9F6EE, #FFD700, #FFFFFF, #D4AF37)' }}>
              <div className="bg-white rounded-[20px] p-7">

                <div className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">Starting from</div>
                <div className="font-display text-5xl text-[#222] mb-1">₹{dest.price}</div>
                <div className="text-xs text-gray-400 mb-7">per person · taxes included</div>

                {/* Includes */}
                <div className="mb-7 space-y-2">
                  {dest.includes.map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <div className="h-4 w-4 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                        <Check size={9} className="text-[#D4AF37]" />
                      </div>
                      <span className="text-xs text-gray-600 font-sans">{item}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full bg-[#D4AF37] hover:bg-[#B8860B] text-white text-[11px] uppercase tracking-[2px] font-semibold py-4 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 mb-3">
                  Book This Trip
                </button>

                <button className="w-full border border-[#D4AF37]/50 text-[#B8860B] text-[11px] uppercase tracking-[2px] font-semibold py-3.5 rounded-full transition-all duration-300 hover:bg-[#FFFBEF] active:scale-95">
                  Enquire Now
                </button>

                <div className="mt-5 flex items-center justify-center gap-2 text-gray-400">
                  <Shield size={12} />
                  <span className="text-[10px]">Secure booking · Free cancellation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;