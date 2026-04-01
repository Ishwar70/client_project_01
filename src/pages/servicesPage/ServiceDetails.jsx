import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CheckCircle2, Clock, Shield, ChevronLeft, ArrowRight,
  Mountain, Landmark, Hotel, Map, Users, Car, Star, Share2, Heart, MapPin
} from "lucide-react";
import { getServiceById } from "../../services/services.service";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const iconMap = { landmark: Landmark, mountain: Mountain, hotel: Hotel, map: Map, users: Users, car: Car };

export default function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await getServiceById(id);
        setService(res?.service || res?.data || res || null);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAFAF7" }}>
      <div className="w-10 h-10 rounded-full border-2 border-gray-200 border-t-[#C9A84C] animate-spin" />
    </div>
  );

  if (!service) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3" style={{ background: "#FAFAF7" }}>
      <p className="text-gray-400 text-sm">Service not found.</p>
      <button onClick={() => navigate(-1)} className="text-sm underline" style={{ color: GOLD }}>Go Back</button>
    </div>
  );

  const Icon = iconMap[service.icon] || Landmark;
  const imageUrl = typeof service.image === "string"
    ? (service.image.startsWith("http") ? service.image : `http://localhost:5000/${service.image}`)
    : (service.image?.url || "https://via.placeholder.com/800x400?text=No+Image");

  const features = ["Luxury Transport", "Personal Concierge", "VIP Fast-Track", "Travel Insurance"];

  return (
    <div className="min-h-screen pb-10" style={{ background: "#FAFAF7", fontFamily: "sans-serif", color: NAVY }}>

      {/* Nav */}
      <div className="bg-white flex items-center justify-between px-5 py-3.5"
        style={{ borderBottom: "0.5px solid #ede8da" }}>
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-medium" style={{ color: NAVY }}>
          <ChevronLeft size={18} /> Back to Services
        </button>
        <div className="flex gap-2.5">
          {[Share2, Heart].map((Ic, i) => (
            <button key={i} className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ border: "0.5px solid #e8e2d0", background: "#fff" }}>
              <Ic size={15} color={NAVY} />
            </button>
          ))}
        </div>
      </div>

      {/* Hero */}
      <div className="relative w-full h-[300px] sm:h-[380px] overflow-hidden">
        <img src={imageUrl} alt={service.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "rgba(27,43,75,0.52)" }} />

        {/* Top badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
            style={{ background: GOLD }}>
            {service.category || "Experience"}
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-semibold"
            style={{ background: "rgba(255,255,255,0.15)", border: "0.5px solid rgba(255,255,255,0.3)" }}>
            <Star size={12} fill={GOLD} color={GOLD} />
            {service.ratings > 0 ? service.ratings : "4.9"} · {service.numReviews > 0 ? `${service.numReviews} reviews` : "128 reviews"}
          </div>
        </div>

        {/* Bottom title */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
          <h1 className="text-white text-3xl sm:text-4xl font-medium leading-tight mb-1"
            style={{ fontFamily: "Georgia, serif" }}>
            {service.title}
          </h1>
          <p className="text-white/60 text-sm flex items-center gap-1">
            <MapPin size={12} /> {service.category || "Premium"} Experience
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 sm:px-6 pt-5">

        {/* Meta strip */}
        <div className="flex bg-white rounded-2xl overflow-hidden mb-5" style={{ border: "0.5px solid #e8e2d0" }}>
          {[
            { icon: <Clock size={15} color={GOLD} />, label: "Duration", val: "Flexible" },
            { icon: <Users size={15} color={GOLD} />, label: "Capacity", val: "6 guests" },
            { icon: <Shield size={15} color={GOLD} />, label: "Status", val: "Verified" },
          ].map(({ icon, label, val }, i, arr) => (
            <div key={label} className="flex-1 flex flex-col items-center py-4 gap-1"
              style={{ borderRight: i < arr.length - 1 ? "0.5px solid #e8e2d0" : "none" }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1"
                style={{ background: "#FBF5E8" }}>{icon}</div>
              <span className="text-[9px] uppercase tracking-widest font-semibold" style={{ color: "#aaa" }}>{label}</span>
              <span className="text-xs font-semibold" style={{ color: NAVY }}>{val}</span>
            </div>
          ))}
        </div>

        {/* About */}
        <p className="text-[9px] uppercase tracking-widest font-bold mb-2" style={{ color: GOLD }}>About this experience</p>
        <h2 className="text-lg font-medium mb-2" style={{ fontFamily: "Georgia,serif" }}>The Experience</h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-5">
          {service.description || "A curated journey designed for those who appreciate the finer things. Every detail has been refined to ensure a seamless and unforgettable experience."}
        </p>

        {/* Features */}
        <p className="text-[9px] uppercase tracking-widest font-bold mb-3" style={{ color: GOLD }}>What's included</p>
        <div className="grid grid-cols-2 gap-2.5 mb-6">
          {features.map((feat) => (
            <div key={feat} className="flex items-center gap-2.5 bg-white rounded-xl px-3.5 py-3"
              style={{ border: "0.5px solid #e8e2d0" }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "#F0FAF4" }}>
                <CheckCircle2 size={13} className="text-green-500" />
              </div>
              <span className="text-xs font-medium" style={{ color: NAVY }}>{feat}</span>
            </div>
          ))}
        </div>

        <hr style={{ border: "none", borderTop: "0.5px solid #e8e2d0", marginBottom: "20px" }} />

        {/* Pricing card */}
        <div className="rounded-2xl p-5" style={{ background: NAVY }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[9px] uppercase tracking-widest font-semibold mb-1.5"
                style={{ color: "rgba(255,255,255,0.4)" }}>Total Investment</p>
              <p className="text-white font-bold" style={{ fontSize: "1.9rem", lineHeight: 1 }}>
                {service.price === "Custom"
                  ? <span style={{ color: GOLD }}>Custom Quote</span>
                  : <><span style={{ color: GOLD, fontSize: "1.1rem", verticalAlign: "top", marginTop: 4, display: "inline-block" }}>₹</span>
                    {service.price?.toLocaleString("en-IN")}
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 400, marginLeft: 4 }}>/ trip</span>
                  </>
                }
              </p>
            </div>
            <div className="flex flex-col gap-1.5 items-end">
              {[
                { icon: <Star size={11} color={GOLD} />, text: "Verified" },
                { icon: <Icon size={11} color={GOLD} />, text: service.category || "Experience" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 px-3 py-1 rounded-full"
                  style={{ background: "rgba(201,168,76,0.12)", border: "0.5px solid rgba(201,168,76,0.3)" }}>
                  {icon}
                  <span style={{ fontSize: 10, color: GOLD, fontWeight: 600 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2.5 mb-5 pt-4" style={{ borderTop: "0.5px solid rgba(255,255,255,0.1)" }}>
            {[
              ["Service fee", "Included"],
              ["GST & taxes", "At checkout"],
              ["Cancellation", "Free · 48 hrs"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                <span>{k}</span><span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white text-xs font-bold uppercase tracking-widest border-none cursor-pointer"
            style={{ background: GOLD, letterSpacing: "0.1em" }}>
            Book this Experience <ArrowRight size={15} />
          </button>
          <p className="text-center mt-3" style={{ fontSize: 10, color: "rgba(255,255,255,0.28)" }}>
            No payment required to reserve · Confirm later
          </p>
        </div>

      </div>
    </div>
  );
}