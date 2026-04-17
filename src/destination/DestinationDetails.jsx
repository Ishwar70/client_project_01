import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDestinationById } from "../services/destination.service"; 
import { 
  Calendar, 
  Mountain, 
  Star, 
  Home, 
  Search, 
  BookOpen, 
  User, 
  Heart,
  MapPin,
  Share2,
  ChevronRight
} from 'lucide-react';

const GOLD = "#c8a96e";

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        setLoading(true);
        const res = await getDestinationById(id);
        const data = res?.destination || res?.data?.destination || res?.data;
        if (data) {
          setDestination(data);
        } else {
          setError("Destination details not found.");
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to load destination details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDestination();
  }, [id]);

  const handleBookingRedirect = () => {
    navigate("/booking", { 
      state: { 
        destinationId: id, 
        price: destination.price,
        title: destination.title 
      } 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c8a96e]"></div>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F6] p-4 text-center">
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
          <h2 className="text-xl font-bold text-red-600 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => navigate(-1)} 
            className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-12 font-sans">
      
      {/* --- HERO SECTION --- */}
      <div className="relative h-87.5 md:h-137.5 w-full overflow-hidden">
        <img 
          src={destination.image?.url || "https://images.unsplash.com/photo-1590050752117-23a9d7f0b943?auto=format&fit=crop&q=80&w=1000"} 
          alt={destination.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-12">
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-[#c8a96e] text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                {destination.category || "Top Rated"}
              </span>
              {destination.isFeatured && (
                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/30">
                  Featured
                </span>
              )}
            </div>
            <div className="flex justify-between items-end gap-4">
              <h1 className="text-3xl md:text-6xl font-bold text-white flex items-center gap-3">
                <MapPin className="text-[#c8a96e] w-6 h-6 md:w-10 md:h-10 shrink-0" />
                {destination.title}
              </h1>
              <button className="hidden md:flex p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all">
                <Share2 size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Details & Tabs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Custom Tabs Navigation */}
            <div className="flex border-b border-gray-100 bg-gray-50/50">
              {["overview", "itinerary", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 md:px-8 py-4 text-xs md:text-sm font-bold uppercase tracking-wider transition-all relative ${
                    activeTab === tab 
                    ? "text-[#c8a96e]" 
                    : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c8a96e]" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content Body */}
            <div className="p-6 md:p-8">
              {activeTab === "overview" && (
                <div className="animate-fadeIn">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 font-serif">About this Destination</h3>
                  <p className="text-gray-600 leading-relaxed text-lg italic md:not-italic">
                    {destination.description}
                  </p>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-50">
                    <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-xl">
                      <div className="p-2.5 bg-white rounded-lg shadow-sm text-[#c8a96e]">
                        <Mountain size={22} />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Elevation</p>
                        <p className="text-sm font-bold text-gray-800">{destination.altitude || "Varies"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-xl">
                      <div className="p-2.5 bg-white rounded-lg shadow-sm text-[#c8a96e]">
                        <Calendar size={22} />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Best Visit</p>
                        <p className="text-sm font-bold text-gray-800">{destination.bestTime || "Year Round"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "itinerary" && (
                <div className="py-8 text-center animate-fadeIn">
                  <BookOpen className="mx-auto text-gray-200 mb-4" size={48} />
                  <p className="text-gray-500">Detailed itinerary coming soon...</p>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="py-12 text-center animate-fadeIn">
                  <div className="flex justify-center text-yellow-400 gap-1 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={24} />)}
                  </div>
                  <p className="text-gray-400 font-medium">Be the first to share your experience!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Pricing/Booking Card */}
        <aside className="lg:col-span-1">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100 lg:sticky lg:top-8">
            <div className="mb-6">
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Estimated Cost</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-gray-900">
                  {destination.budget || `₹${destination.price?.toLocaleString()}`}
                </span>
                <span className="text-gray-400 font-medium text-sm">/ pax</span>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-between p-3.5 bg-green-50/50 rounded-xl border border-green-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-bold text-green-700">Available Now</span>
                </div>
                <ChevronRight size={16} className="text-green-300" />
              </div>
            </div>

            <button
              onClick={handleBookingRedirect}
              className="w-full bg-[#c8a96e] hover:bg-[#b8944d] text-white py-4 rounded-xl font-black text-lg shadow-lg shadow-[#c8a96e]/30 transition-all transform active:scale-95 flex items-center justify-center gap-3"
            >
              Secure My Spot <ChevronRight size={20} />
            </button>

            <div className="mt-6 flex items-center justify-center gap-4 text-gray-400">
               <div className="h-px bg-gray-100 flex-1" />
               <span className="text-[10px] font-bold uppercase tracking-widest">Trust & Safety</span>
               <div className="h-px bg-gray-100 flex-1" />
            </div>
            
            <p className="text-center text-[10px] text-gray-400 mt-4 leading-relaxed">
              * Official prices may vary based on travel dates and specific group requirements.
            </p>
          </div>
        </aside>
      </div>

      {/* --- MOBILE ACTION BAR --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-100 px-8 py-4 flex justify-between items-center md:hidden z-50">
        <div className="flex flex-col">
           <span className="text-[10px] font-bold text-gray-400 uppercase">Total</span>
           <span className="text-lg font-black text-gray-900">{destination.budget || 'Flexible'}</span>
        </div>
        <button 
          onClick={handleBookingRedirect}
          className="bg-[#c8a96e] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-[#c8a96e]/20"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DestinationDetails;