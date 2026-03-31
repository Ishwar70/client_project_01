import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Landmark, Mountain, Hotel, Map, Users, Car 
} from "lucide-react";
import { getServiceById } from "../../services/services.service"; 

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";
const BG = "#FAFAF7";

const iconMap = {
  landmark: Landmark,
  mountain: Mountain,
  hotel: Hotel,
  map: Map,
  users: Users,
  car: Car,
};

export default function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await getServiceById(id);
        setService(res.data);
      } catch (err) {
        console.error("Error fetching service details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#FAFAF7]">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-t-gold rounded-full animate-spin mb-4" style={{ borderTopColor: GOLD }}></div>
        <p style={{ color: NAVY }}>Loading exquisite details...</p>
      </div>
    </div>
  );

  if (!service) return <div className="p-20 text-center">Service not found.</div>;

  const Icon = iconMap[service.icon] || Landmark;

  return (
    <div style={{ background: BG }} className="min-h-screen pb-20">
      {/* Navigation Header */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-70"
          style={{ color: NAVY }}
        >
          <ChevronLeft size={18} /> Back to Services
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Side: Premium Image Gallery/Hero */}
        <div className="relative group">
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
             <img
              src={service.image?.startsWith("http") ? service.image : `http://localhost:5000/${service.image}`}
              alt={service.title}
              className="w-full h-125 object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          {/* Floating Badge */}
          <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100 hidden md:block">
            <Icon size={32} style={{ color: GOLD }} />
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col">
          <span className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: GOLD }}>
            Premium Experience
          </span>
          <h1 className="text-4xl md:text-5xl font-semibold mb-6" style={{ color: NAVY, fontFamily: "'Playfair Display', serif" }}>
            {service.title}
          </h1>

          <div className="flex items-center gap-6 mb-8 text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <Clock size={16} style={{ color: GOLD }} /> 
              <span>Flexible Timing</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <ShieldCheck size={16} style={{ color: GOLD }} /> 
              <span>Verified Service</span>
            </div>
          </div>

          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            {service.description}
          </p>

          {/* Service Features (Dummy static data for visual polish) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {["Luxury Transport", "Personal Guide", "VIP Access", "Insurance Included"].map((feat) => (
              <div key={feat} className="flex items-center gap-3">
                <CheckCircle2 size={18} style={{ color: GOLD }} />
                <span className="text-sm font-medium" style={{ color: NAVY }}>{feat}</span>
              </div>
            ))}
          </div>

          <hr className="border-gray-200 mb-8" />

          {/* Pricing and Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div>
              <p className="text-xs uppercase text-gray-400 font-bold tracking-widest">Investment</p>
              <p className="text-3xl font-bold" style={{ color: NAVY }}>
                {service.price === "Custom" ? "Custom Quote" : <><span style={{ color: GOLD }}>$</span>{service.price}</>}
              </p>
            </div>
            
            <button 
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 rounded-full text-white font-bold transition-all hover:shadow-lg active:scale-95"
              style={{ backgroundColor: NAVY }}
            >
              CONFIRM BOOKING
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}