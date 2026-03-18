import { useNavigate } from "react-router-dom";
import { destinations } from "../data/destinations";

const DestinationsPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      {/* Hero Banner */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Explore <span style={styles.accent}>Uttarakhand</span>
        </h1>
        <p style={styles.heroSub}>
          Devbhoomi — the Land of Gods. Discover all our handpicked destinations.
        </p>
      </div>

      {/* Grid */}
      <div style={styles.container}>
        <div style={styles.grid}>
          {destinations.map((dest) => (
            <div
              key={dest.id}
              style={styles.card}
              onClick={() => navigate(`/destinations/${dest.slug}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.10)";
              }}
            >
              <div style={styles.imageWrap}>
                <img src={dest.image} alt={dest.name} style={styles.cardImage} />
                <span style={styles.badge}>{dest.category}</span>
              </div>
              <div style={styles.cardBody}>
                <div style={styles.cardTop}>
                  <h3 style={styles.cardName}>{dest.name}</h3>
                  <span style={styles.rating}>⭐ {dest.rating}</span>
                </div>
                <p style={styles.cardTagline}>{dest.tagline}</p>
                <div style={styles.cardMeta}>
                  <span style={styles.metaItem}>🏔 {dest.altitude}</span>
                  <span style={styles.metaItem}>📅 {dest.bestTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    background: "#f5f0e8",
    minHeight: "100vh",
    fontFamily: "sans-serif",
  },
  hero: {
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
    padding: "80px 24px 60px",
    textAlign: "center",
    color: "#fff",
  },
  heroTitle: {
    fontSize: "clamp(32px, 5vw, 52px)",
    fontWeight: "800",
    fontFamily: "'Georgia', serif",
    margin: "0 0 16px",
    letterSpacing: "-1px",
  },
  accent: {
    color: "#c9a84c",
  },
  heroSub: {
    fontSize: "17px",
    opacity: 0.8,
    margin: 0,
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "48px 24px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
  },
  imageWrap: {
    position: "relative",
    height: "200px",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  badge: {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "rgba(201,168,76,0.92)",
    color: "#fff",
    fontSize: "11px",
    fontWeight: "700",
    padding: "4px 10px",
    borderRadius: "20px",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  cardBody: {
    padding: "16px 18px 18px",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  cardName: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1a1a2e",
    margin: 0,
    fontFamily: "'Georgia', serif",
  },
  rating: {
    fontSize: "13px",
    color: "#6b6b6b",
    fontWeight: "600",
  },
  cardTagline: {
    fontSize: "13px",
    color: "#666",
    lineHeight: "1.5",
    margin: "0 0 12px",
  },
  cardMeta: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  metaItem: {
    fontSize: "12px",
    color: "#888",
    background: "#f5f0e8",
    padding: "4px 10px",
    borderRadius: "20px",
  },
};

export default DestinationsPage;