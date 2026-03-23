import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// 1. CONSTANTS FIRST (To avoid "Initialization" error)
const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";
const TEXT_MUTED = "#6B5A2E";

// 2. DATA SECOND (Using the constants defined above)
const destinations = [
  {
    id: "kedarnath",
    category: "Pilgrimage",
    tag: "Best Seller",
    rating: "4.9",
    accent: GOLD,
    title: "Kedarnath Temple Expedition",
    location: "Rudraprayag, Uttarakhand",
    meta: "3,583m · May–Jun · 16km Trek",
    description: "Embark on a spiritual journey to one of the holiest Hindu shrines. Perched at 3,583m, Kedarnath offers a profound sense of peace amidst the majestic snow-capped peaks of the Garhwal Himalayas.",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800",
    fullImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200",
    price: "₹28,000",
    duration: "5 Days / 4 Nights",
    difficulty: "Moderate to Hard",
    highlights: ["VIP Darshan Access", "Helicopter Booking Assistance", "Expert Mountain Guides", "Premium Basecamp Stay"],
  },
  {
    id: "rishikesh",
    category: "Adventure",
    tag: null,
    rating: "4.8",
    accent: NAVY,
    title: "Rishikesh White Water Rafting",
    location: "Rishikesh, Uttarakhand",
    meta: "Grade 3–4 · Oct–Mar · 2 Days",
    description: "Experience the adrenaline rush of tackling the Ganges' famous rapids. From 'Roller Coaster' to 'Golf Course', this expedition combines high-octane adventure with serene riverside camping.",
    image: "https://images.unsplash.com/photo-1590523741491-345ad1f4b36f?auto=format&fit=crop&q=80&w=800",
    fullImage: "https://images.unsplash.com/photo-1590523741491-345ad1f4b36f?auto=format&fit=crop&q=80&w=1200",
    price: "₹12,000",
    duration: "2 Days / 1 Night",
    difficulty: "Moderate",
    highlights: ["Grade 3 & 4 Rapids", "Riverside Jungle Camping", "Cliff Jumping Sessions", "Evening Ganga Aarti Visit"],
  },
  {
    id: "nainital",
    category: "Hill Station",
    tag: null,
    rating: "4.7",
    accent: GOLD,
    title: "Nainital Lake Retreat",
    location: "Nainital, Uttarakhand",
    meta: "2,084m · Mar–Jun · 4 Days",
    description: "Relax by the pear-shaped Naini Lake, surrounded by seven lush mountains. Perfect for families and couples, this retreat offers boat rides, cable car views, and heritage walks through colonial-era architecture.",
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&q=80&w=800",
    fullImage: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&q=80&w=1200",
    price: "₹18,000",
    duration: "4 Days / 3 Nights",
    difficulty: "Easy",
    highlights: ["Yachting at Boat Club", "Snow View Point Cable Car", "Kilbury Bird Sanctuary", "Heritage Mall Road Walk"],
  },
  {
    id: "corbett",
    category: "Wildlife",
    tag: "Popular",
    rating: "4.8",
    accent: NAVY,
    title: "Jim Corbett Tiger Safari",
    location: "Ramnagar, Uttarakhand",
    meta: "Nov–Jun · 3 Days",
    description: "Venture into India's oldest national park. Home to the Royal Bengal Tiger, this safari takes you through dense Sal forests and sprawling grasslands in search of exotic wildlife and birds.",
    image: "https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?auto=format&fit=crop&q=80&w=800",
    fullImage: "https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?auto=format&fit=crop&q=80&w=1200",
    price: "₹22,000",
    duration: "3 Days / 2 Nights",
    difficulty: "Easy",
    highlights: ["Open Jeep Tiger Safari", "Dhikala Forest Lodge Stay", "Elephant Sightings", "Crocodile Point Trek"],
  },
  {
    id: "badrinath",
    category: "Pilgrimage",
    tag: null,
    rating: "4.9",
    accent: GOLD,
    title: "Badrinath Spiritual Darshan",
    location: "Chamoli, Uttarakhand",
    meta: "3,133m · May–Jun · 5 Days",
    description: "Visit the sacred abode of Lord Vishnu. Surrounded by the Nar and Narayan mountain ranges, Badrinath offers a divine atmosphere and a chance to take a holy dip in the natural thermal Tapt Kund.",
    image: "https://images.unsplash.com/photo-1621609764095-b32bbe35cf3a?auto=format&fit=crop&q=80&w=800",
    fullImage: "https://images.unsplash.com/photo-1621609764095-b32bbe35cf3a?auto=format&fit=crop&q=80&w=1200",
    price: "₹20,000",
    duration: "5 Days / 4 Nights",
    difficulty: "Moderate",
    highlights: ["Tapt Kund Holy Dip", "Mana Village (India's Last Village)", "Brahma Kapal Rituals", "Vyas Gufa Visit"],
  },
  {
    id: "valley-of-flowers",
    category: "Trek",
    tag: "Seasonal",
    rating: "4.8",
    accent: NAVY,
    title: "Valley of Flowers Trek",
    location: "Joshimath, Uttarakhand",
    meta: "3,658m · Jul–Sep · 6 Days",
    description: "A UNESCO World Heritage site, this valley turns into a floral paradise during the monsoon. Walk through meadows of endemic alpine flowers and breathe in the purest mountain air in the world.",
    image: "https://images.unsplash.com/photo-1587547131116-a0655a526190?auto=format&fit=crop&q=80&w=800",
    fullImage: "https://images.unsplash.com/photo-1587547131116-a0655a526190?auto=format&fit=crop&q=80&w=1200",
    price: "₹24,000",
    duration: "6 Days / 5 Nights",
    difficulty: "Moderate",
    highlights: ["Rare Flora Sightings", "Hemkund Sahib Visit", "Eco-friendly Basecamp", "Professional Naturalist Guide"],
  },
];

// 3. COMPONENT
export default function DestinationDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const d = destinations.find((item) => item.id === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!d) {
    return (
      <div style={{ padding: "100px", textAlign: "center", fontFamily: "sans-serif" }}>
        <h2>Destination not found.</h2>
        <button 
          onClick={() => navigate('/')}
          style={{ padding: "10px 20px", marginTop: "20px", cursor: "pointer", background: GOLD, color: "white", border: "none", borderRadius: "5px" }}
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: "#FCFAF5", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* Hero Banner */}
      <div style={{ position: "relative", height: "60vh", width: "100%", overflow: "hidden" }}>
        <img 
          src={d.fullImage} 
          alt={d.title} 
          style={{ width: "100%", height: "100%", objectFit: "cover" }} 
        />
        <div style={{ 
          position: "absolute", inset: 0, 
          background: "linear-gradient(to top, rgba(27,43,75,0.8) 0%, transparent 60%)" 
        }} />
        
        <div style={{ 
          position: "absolute", bottom: "40px", left: "5%", right: "5%",
          maxWidth: "1200px", margin: "0 auto", color: "white" 
        }}>
          <button 
            onClick={() => navigate(-1)}
            style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "white", padding: "8px 16px", borderRadius: "20px", marginBottom: "20px", cursor: "pointer" }}
          >
            ← Back to Explore
          </button>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(32px, 5vw, 56px)", margin: "0 0 10px 0" }}>{d.title}</h1>
          <p style={{ fontSize: "18px", opacity: 0.9 }}>{d.location}</p>
        </div>
      </div>

      {/* Content Grid */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px", display: "grid", gridTemplateColumns: "1fr 350px", gap: "40px" }}>
        
        {/* Left Column: Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <section>
            <h2 style={{ color: NAVY, borderBottom: `2px solid ${GOLD}`, display: "inline-block", paddingBottom: "5px" }}>Overview</h2>
            <p style={{ lineHeight: "1.8", color: "#444", fontSize: "16px" }}>{d.description}</p>
          </section>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #eee" }}>
            <div>
              <small style={{ color: TEXT_MUTED, textTransform: "uppercase", fontWeight: "bold" }}>Duration</small>
              <p style={{ margin: "5px 0", fontWeight: "600", color: NAVY }}>{d.duration}</p>
            </div>
            <div>
              <small style={{ color: TEXT_MUTED, textTransform: "uppercase", fontWeight: "bold" }}>Difficulty</small>
              <p style={{ margin: "5px 0", fontWeight: "600", color: NAVY }}>{d.difficulty}</p>
            </div>
          </div>

          <section>
            <h2 style={{ color: NAVY }}>Journey Highlights</h2>
            <ul style={{ padding: 0, listStyle: "none", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              {d.highlights.map(h => (
                <li key={h} style={{ display: "flex", alignItems: "center", gap: "10px", color: "#555" }}>
                  <span style={{ color: GOLD, fontWeight: "bold" }}>✓</span> {h}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column: Sticky Booking Card */}
        <aside>
          <div style={{ 
            position: "sticky", top: "20px", background: "white", 
            padding: "30px", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            border: `1px solid ${GOLD}44`
          }}>
            <p style={{ color: TEXT_MUTED, marginBottom: "5px" }}>Starting from</p>
            <h3 style={{ fontSize: "32px", color: NAVY, margin: "0 0 20px 0" }}>{d.price} <span style={{ fontSize: "14px", fontWeight: "normal" }}>/ person</span></h3>
            
            <button style={{ 
              width: "100%", background: GOLD, color: "white", border: "none", 
              padding: "16px", borderRadius: "8px", fontSize: "16px", fontWeight: "bold",
              cursor: "pointer", marginBottom: "15px"
            }}>
              Reserve My Spot
            </button>
            
            <button style={{ 
              width: "100%", background: "transparent", color: NAVY, border: `1px solid ${NAVY}`, 
              padding: "16px", borderRadius: "8px", fontSize: "14px", fontWeight: "600",
              cursor: "pointer"
            }}>
              Download Itinerary (PDF)
            </button>
            
            <p style={{ textAlign: "center", fontSize: "12px", color: TEXT_MUTED, marginTop: "20px" }}>
              *Price includes accommodation, permits, and meals.
            </p>
          </div>
        </aside>

      </div>
    </div>
  );
}