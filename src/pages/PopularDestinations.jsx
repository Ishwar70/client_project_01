import { useNavigate } from "react-router-dom";
import { destinations } from "../data/destinations";

const PopularDestinations = () => {
  const navigate = useNavigate();
  const preview = destinations.slice(0, 6);

  return (
    <section style={styles.section}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>
          Popular <span style={styles.titleAccent}>Destinations</span>
        </h2>
        <p style={styles.subtitle}>
          Discover the most sought-after locations in Uttarakhand
        </p>
      </div>

      {/* Grid */}
      <div style={styles.grid}>
        {preview.map((dest) => (
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
            <img src={dest.image} alt={dest.name} style={styles.cardImage} />
            <div style={styles.cardOverlay} />
            <div style={styles.cardContent}>
              <div style={styles.cardLocation}>
                <span style={styles.pinIcon}>📍</span>
                <span style={styles.cardName}>{dest.name}</span>
              </div>
              <p style={styles.cardTagline}>{dest.tagline}</p>
            </div>
          </div>
        ))}
      </div>

      {/* See More Button */}
      <div style={styles.btnWrapper}>
        <button
          style={styles.seeMoreBtn}
          onClick={() => navigate("/destinations")}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#b8912a";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#c9a84c";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          See All Destinations →
        </button>
      </div>
    </section>
  );
};

const styles = {
  section: {
    background: "#f5f0e8",
    padding: "64px 24px",
    fontFamily: "'Georgia', serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "48px",
  },
  title: {
    fontSize: "clamp(28px, 4vw, 42px)",
    fontWeight: "800",
    color: "#1a1a2e",
    margin: "0 0 12px",
    letterSpacing: "-0.5px",
  },
  titleAccent: {
    color: "#c9a84c",
  },
  subtitle: {
    fontSize: "16px",
    color: "#6b6b6b",
    margin: 0,
    fontFamily: "sans-serif",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  card: {
    position: "relative",
    borderRadius: "16px",
    overflow: "hidden",
    cursor: "pointer",
    height: "220px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  cardOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.05) 100%)",
  },
  cardContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "20px 16px 16px",
    color: "#fff",
  },
  cardLocation: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "6px",
  },
  pinIcon: {
    fontSize: "13px",
  },
  cardName: {
    fontWeight: "700",
    fontSize: "18px",
    fontFamily: "'Georgia', serif",
  },
  cardTagline: {
    fontSize: "13px",
    margin: 0,
    opacity: 0.88,
    lineHeight: "1.4",
    fontFamily: "sans-serif",
  },
  btnWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
  },
  seeMoreBtn: {
    background: "#c9a84c",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    padding: "14px 36px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s, transform 0.2s",
    fontFamily: "sans-serif",
    letterSpacing: "0.3px",
  },
};

export default PopularDestinations;