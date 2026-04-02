import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDestinationById } from "../services/destination.service"; 

const GOLD = "#C9A84C";
const TEXT_DARK = "#1A1A1A";

export default function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        // Assuming your service takes the ID
        const res = await getDestinationById(id);
        // Adapt based on your API response structure (res.data or res.destination)
        setDestination(res.destination || res.data || res);
      } catch (err) {
        console.error(err);
        setError("Could not find the destination details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div className="text-center py-40 text-gray-400 animate-pulse">Loading Sanctuary...</div>;
  if (error) return <div className="text-center py-40 text-red-500">{error}</div>;
  if (!destination) return null;

  return (
    <main className="min-h-screen bg-white">
      {/* 🏔️ Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <img
          src={destination.image?.url}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" /> {/* Overlay for text readability */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <span className="text-[12px] tracking-[6px] uppercase font-bold mb-4 drop-shadow-md">
            {destination.region} • {destination.category}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-xl" style={{ fontFamily: "'Georgia', serif" }}>
            {destination.name}
          </h1>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
            <span style={{ color: GOLD }}>★</span>
            <span className="font-bold">{destination.rating || "4.9"} / 5.0</span>
          </div>
        </div>
      </section>

      {/* 📜 Content Section */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Left: Description & Details */}
          <div className="lg:col-span-2">
            <button 
              onClick={() => navigate(-1)}
              className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-8 inline-block"
            >
              ← Back to Destinations
            </button>
            
            <h2 className="text-3xl font-bold mb-8" style={{ color: TEXT_DARK, fontFamily: "'Georgia', serif" }}>
              Experience the Spiritual Majesty
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-10 first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left">
              {destination.description}
            </p>

            {/* Technical Specs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-gray-100">
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-2">Altitude</p>
                <p className="font-bold text-lg" style={{ color: TEXT_DARK }}>{destination.altitude || "N/A"}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-2">Best Time</p>
                <p className="font-bold text-lg" style={{ color: TEXT_DARK }}>{destination.bestTime || "N/A"}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-2">Budget</p>
                <p className="font-bold text-lg" style={{ color: TEXT_DARK }}>₹{destination.budget?.toLocaleString() || "12,000"}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-2">Travel Date</p>
                <p className="font-bold text-lg" style={{ color: TEXT_DARK }}>{destination.travelDate || "Flexible"}</p>
              </div>
            </div>
          </div>

          {/* Right: Sticky Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold mb-2" style={{ color: TEXT_DARK }}>Plan Your Pilgrimage</h3>
              <p className="text-sm text-gray-500 mb-8">Personalized itineraries curated for the Garhwal Himalayas.</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Duration</span>
                  <span className="font-bold">4 Days / 3 Nights</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Difficulty</span>
                  <span className="font-bold">Moderate</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/contact")}
                className="w-full py-5 rounded-full text-xs font-bold uppercase tracking-widest text-white transition-all hover:shadow-xl active:scale-95 mb-4"
                style={{ background: GOLD }}
              >
                Inquire Now
              </button>
              <p className="text-[10px] text-center text-gray-400 uppercase tracking-tighter">
                Limited slots available for {destination.bestTime}
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}