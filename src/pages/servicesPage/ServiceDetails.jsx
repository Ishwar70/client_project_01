import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getServiceById } from "../../services/services.service";

const GOLD = "#c8a96e";
const GOLD_DARK = "#b8944d";

export default function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 992);

  // Handle Responsive Resize
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 992);
    window.addEventListener("resize", handleResize);
    
    const fetchService = async () => {
      try {
        setLoading(true);
        const res = await getServiceBy8Id(id);
        const data = res?.service || res?.data?.service;
        if (data) setService(data);
        else setError("Service not found.");
      } catch (err) {
        setError("Failed to load details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchService();
    return () => window.removeEventListener("resize", handleResize);
  }, [id]);

  // Handle the redirect to /booking (Date logic removed)
  const handleBookingRedirect = () => {
    navigate("/booking", { 
      state: { 
        serviceId: id, 
        price: service.price,
        title: service.title 
      } 
    });
  };

  if (loading) return <div style={{ padding: "100px", textAlign: "center", color: GOLD }}>Loading...</div>;
  if (error || !service) return <div style={{ padding: "100px", textAlign: "center", color: "red" }}>{error}</div>;

  return (
    <div style={{ background: "#f8f7f4", minHeight: "100vh", fontFamily: "sans-serif" }}>
      
      {/* ── Hero Section (Mobile First) ── */}
      <div style={{ 
        position: "relative", 
        height: isDesktop ? "450px" : "300px", 
        width: "100%", 
        overflow: "hidden" 
      }}>
        {service.image?.url && (
          <img 
            src={service.image.url} 
            alt={service.title} 
            style={{ width: "100%", height: "100%", objectFit: "cover" }} 
          />
        )}
        <div style={{ 
          position: "absolute", 
          inset: 0, 
          background: "linear-gradient(to top, rgba(0,0,0,0.8) 10%, transparent 100%)" 
        }} />
        <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "20px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <span style={{ background: GOLD, color: "#fff", padding: "3px 8px", borderRadius: "4px", fontSize: "11px" }}>
              {service.category}
            </span>
            <h1 style={{ color: "#fff", fontSize: isDesktop ? "36px" : "24px", margin: "10px 0" }}>
              {service.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ 
        maxWidth: "1100px", 
        margin: "0 auto", 
        padding: isDesktop ? "40px 20px" : "20px",
        display: "flex",
        flexDirection: isDesktop ? "row" : "column",
        gap: "30px"
      }}>
        
        {/* Description Section */}
        <div style={{ flex: 1 }}>
          <div style={{ background: "#fff", padding: "20px", borderRadius: "15px", border: "1px solid #eee" }}>
            <div style={{ display: "flex", gap: "20px", borderBottom: "1px solid #eee", marginBottom: "15px" }}>
              <button 
                onClick={() => setActiveTab("overview")}
                style={{ 
                  padding: "10px 0", border: "none", background: "none", cursor: "pointer",
                  color: activeTab === "overview" ? GOLD : "#999",
                  borderBottom: activeTab === "overview" ? `2px solid ${GOLD}` : "none",
                  fontWeight: "600"
                }}
              >Overview</button>
              <button 
                onClick={() => setActiveTab("reviews")}
                style={{ 
                  padding: "10px 0", border: "none", background: "none", cursor: "pointer",
                  color: activeTab === "reviews" ? GOLD : "#999",
                  borderBottom: activeTab === "reviews" ? `2px solid ${GOLD}` : "none",
                  fontWeight: "600"
                }}
              >Reviews</button>
            </div>
            
            {activeTab === "overview" ? (
              <p style={{ color: "#555", lineHeight: "1.6" }}>{service.description}</p>
            ) : (
              <p style={{ textAlign: "center", color: "#999" }}>No reviews available.</p>
            )}
          </div>
        </div>

        {/* Sticky Booking Card */}
        <aside style={{ width: isDesktop ? "350px" : "100%" }}>
          <div style={{ 
            background: "#fff", 
            padding: "25px", 
            borderRadius: "15px", 
            border: "1px solid #eee",
            position: isDesktop ? "sticky" : "static",
            top: "20px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
          }}>
            <div style={{ marginBottom: "20px" }}>
              <span style={{ fontSize: "28px", fontWeight: "700" }}>₹{service.price?.toLocaleString()}</span>
              <span style={{ color: "#888", fontSize: "14px" }}> / person</span>
            </div>

            <button
              onClick={handleBookingRedirect}
              style={{
                width: "100%", padding: "15px", borderRadius: "10px", border: "none",
                background: GOLD, color: "#fff", fontWeight: "700", cursor: "pointer",
                fontSize: "16px", transition: "0.2s"
              }}
              onMouseOver={(e) => e.target.style.background = GOLD_DARK}
              onMouseOut={(e) => e.target.style.background = GOLD}
            >
              Book Now
            </button>
            
            <p style={{ fontSize: "11px", color: "#aaa", textAlign: "center", marginTop: "15px" }}>
              * You will be redirected to the secure booking page.
            </p>
          </div>
        </aside>

      </div>
    </div>
  );
}