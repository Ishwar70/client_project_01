import { useParams, useNavigate } from "react-router-dom";
import { destinations } from "../data/destinations";

const DestinationDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dest = destinations.find((d) => d.slug === slug);

  if (!dest) {
    return (
      <div style={styles.notFound}>
        <h2>Destination not found</h2>
        <button style={styles.backBtn} onClick={() => navigate("/destinations")}>
          ← Back to Destinations
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Hero */}
      <div style={styles.hero}>
        <img src={dest.image} alt={dest.name} style={styles.heroImage} />
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <button
            style={styles.backBtn}
            onClick={() => navigate("/destinations")}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.3)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
          >
            ← Back
          </button>
          <span style={styles.badge}>{dest.category}</span>
          <h1 style={styles.heroTitle}>{dest.name}</h1>
          <p style={styles.heroTagline}>{dest.tagline}</p>
          <div style={styles.heroStats}>
            <div style={styles.stat}>
              <span style={styles.statLabel}>Rating</span>
              <span style={styles.statValue}>⭐ {dest.rating}</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.stat}>
              <span style={styles.statLabel}>Altitude</span>
              <span style={styles.statValue}>{dest.altitude}</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.stat}>
              <span style={styles.statLabel}>Weather</span>
              <span style={styles.statValue}>{dest.weather}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={styles.body}>
        <div style={styles.container}>
          {/* Two-column layout */}
          <div style={styles.twoCol}>
            {/* Left: Description + Highlights */}
            <div style={styles.leftCol}>
              <section style={styles.section}>
                <h2 style={styles.sectionTitle}>About {dest.name}</h2>
                <p style={styles.description}>{dest.description}</p>
              </section>

              <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Top Highlights</h2>
                <div style={styles.highlightGrid}>
                  {dest.highlights.map((h, i) => (
                    <div key={i} style={styles.highlightCard}>
                      <span style={styles.highlightIcon}>✦</span>
                      <span style={styles.highlightText}>{h}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right: Info Card */}
            <div style={styles.rightCol}>
              <div style={styles.infoCard}>
                <h3 style={styles.infoCardTitle}>Trip Details</h3>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>📍 Distance</span>
                  <span style={styles.infoValue}>{dest.distance}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>📅 Best Time</span>
                  <span style={styles.infoValue}>{dest.bestTime}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>🌡 Weather</span>
                  <span style={styles.infoValue}>{dest.weather}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>🏷 Category</span>
                  <span style={styles.infoValue}>{dest.category}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>🏔 Altitude</span>
                  <span style={styles.infoValue}>{dest.altitude}</span>
                </div>
                <button
                  style={styles.planBtn}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#b8912a")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#c9a84c")}
                >
                  Plan My Trip
                </button>
              </div>

              {/* More Destinations */}
              <div style={styles.moreCard}>
                <h3 style={styles.infoCardTitle}>More Destinations</h3>
                {destinations
                  .filter((d) => d.slug !== slug)
                  .slice(0, 4)
                  .map((d) => (
                    <div
                      key={d.id}
                      style={styles.moreItem}
                      onClick={() => navigate(`/destinations/${d.slug}`)}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f0e8")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <img src={d.image} alt={d.name} style={styles.moreThumb} />
                      <div>
                        <div style={styles.moreName}>{d.name}</div>
                        <div style={styles.moreCategory}>{d.category}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { background: "#f5f0e8", minHeight: "100vh", fontFamily: "sans-serif" },
  notFound: { padding: "80px", textAlign: "center" },
  hero: { position: "relative", height: "500px", overflow: "hidden" },
  heroImage: { width: "100%", height: "100%", objectFit: "cover" },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.80) 35%, rgba(0,0,0,0.20) 100%)",
  },
  heroContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "32px 40px",
    color: "#fff",
  },
  backBtn: {
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.4)",
    color: "#fff",
    padding: "8px 18px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "13px",
    fontFamily: "sans-serif",
    marginBottom: "16px",
    display: "inline-block",
    transition: "background 0.2s",
  },
  badge: {
    display: "block",
    background: "rgba(201,168,76,0.90)",
    color: "#fff",
    fontSize: "11px",
    fontWeight: "700",
    padding: "4px 12px",
    borderRadius: "20px",
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    width: "fit-content",
    marginBottom: "10px",
  },
  heroTitle: {
    fontSize: "clamp(32px, 5vw, 52px)",
    fontWeight: "800",
    fontFamily: "'Georgia', serif",
    margin: "0 0 8px",
  },
  heroTagline: { fontSize: "15px", opacity: 0.85, margin: "0 0 20px" },
  heroStats: { display: "flex", gap: "0", alignItems: "center" },
  stat: { display: "flex", flexDirection: "column", gap: "2px" },
  statLabel: { fontSize: "11px", opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.5px" },
  statValue: { fontSize: "14px", fontWeight: "600" },
  statDivider: { width: "1px", height: "32px", background: "rgba(255,255,255,0.3)", margin: "0 20px" },
  body: { padding: "40px 0 60px" },
  container: { maxWidth: "1100px", margin: "0 auto", padding: "0 24px" },
  twoCol: { display: "grid", gridTemplateColumns: "1fr 340px", gap: "32px", alignItems: "start" },
  leftCol: {},
  rightCol: { display: "flex", flexDirection: "column", gap: "20px" },
  section: { marginBottom: "32px" },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#1a1a2e",
    fontFamily: "'Georgia', serif",
    margin: "0 0 14px",
    paddingBottom: "10px",
    borderBottom: "2px solid #c9a84c",
    display: "inline-block",
  },
  description: { fontSize: "15px", color: "#444", lineHeight: "1.8", margin: 0 },
  highlightGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" },
  highlightCard: {
    background: "#fff",
    borderRadius: "10px",
    padding: "12px 14px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  highlightIcon: { color: "#c9a84c", fontSize: "12px" },
  highlightText: { fontSize: "13px", color: "#333", fontWeight: "500" },
  infoCard: {
    background: "#fff",
    borderRadius: "16px",
    padding: "22px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  },
  infoCardTitle: {
    fontSize: "17px",
    fontWeight: "700",
    color: "#1a1a2e",
    fontFamily: "'Georgia', serif",
    margin: "0 0 16px",
    paddingBottom: "10px",
    borderBottom: "1px solid #eee",
  },
  infoItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #f0ebe0",
    gap: "12px",
  },
  infoLabel: { fontSize: "13px", color: "#888" },
  infoValue: { fontSize: "13px", color: "#333", fontWeight: "600", textAlign: "right", flex: 1 },
  planBtn: {
    width: "100%",
    background: "#c9a84c",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "13px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "18px",
    transition: "background 0.2s",
    fontFamily: "sans-serif",
  },
  moreCard: {
    background: "#fff",
    borderRadius: "16px",
    padding: "22px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  },
  moreItem: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    padding: "10px 6px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  moreThumb: { width: "48px", height: "48px", borderRadius: "8px", objectFit: "cover" },
  moreName: { fontSize: "14px", fontWeight: "600", color: "#1a1a2e" },
  moreCategory: { fontSize: "11px", color: "#888", marginTop: "2px" },
};

export default DestinationDetail;