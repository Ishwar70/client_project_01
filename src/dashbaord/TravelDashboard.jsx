import { useState } from "react";

// ── Icons ──────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const icons = {
  menu:    "M3 12h18M3 6h18M3 18h18",
  close:   "M18 6 6 18M6 6l12 12",
  add:     "M12 5v14M5 12h14",
  edit:    "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:   "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
  globe:   "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20",
  star:    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  package: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
  blog:    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  dash:    "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  map:     "M1 6l7-4 8 4 7-4v16l-7 4-8-4-7 4V6zM8 2v16M16 6v16",
  check:   "M20 6 9 17l-5-5",
  chevron: "M6 9l6 6 6-6",
  tag:     "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01",
};

// ── Seed Data ──────────────────────────────────────────────────────────────
const seed = {
  services: [
    { id: 1, title: "Guided Tours", desc: "Expert local guides for immersive experiences", price: "$49/person", icon: "🗺️" },
    { id: 2, title: "Luxury Transfers", desc: "Premium airport & city transfers worldwide", price: "$79/trip", icon: "🚘" },
    { id: 3, title: "Travel Insurance", desc: "Comprehensive coverage for peace of mind", price: "$19/day", icon: "🛡️" },
    { id: 4, title: "Visa Assistance", desc: "Fast-track visa processing & documentation", price: "$39/visa", icon: "📄" },
  ],
  packages: [
    { id: 1, title: "Explorer", nights: 5, destinations: 2, price: "$899", badge: "Popular", rating: 4.8, reviews: 312 },
    { id: 2, title: "Grand Tour", nights: 14, destinations: 5, price: "$2,499", badge: "Best Value", rating: 4.9, reviews: 187 },
    { id: 3, title: "Weekend Escape", nights: 2, destinations: 1, price: "$349", badge: "Quick Trip", rating: 4.6, reviews: 524 },
  ],
  blogs: [
    { id: 1, title: "Top 10 Hidden Gems in Southeast Asia", date: "Mar 18 2026", tag: "Asia", reads: "4.2k", img: "🏝️" },
    { id: 2, title: "How to Travel Europe on a Budget", date: "Mar 12 2026", tag: "Europe", reads: "7.8k", img: "🏰" },
    { id: 3, title: "Ultimate Guide to Solo Travel Safety", date: "Mar 5 2026", tag: "Tips", reads: "9.1k", img: "🧳" },
  ],
  destinations: [
    { id: 1, name: "Bali, Indonesia", category: "Beach", trips: 84, rating: 4.9, img: "🌴", color: "#10b981" },
    { id: 2, name: "Paris, France", category: "Culture", trips: 127, rating: 4.8, img: "🗼", color: "#6366f1" },
    { id: 3, name: "Machu Picchu, Peru", category: "Adventure", trips: 56, rating: 4.95, img: "⛰️", color: "#f59e0b" },
    { id: 4, name: "Tokyo, Japan", category: "Urban", trips: 93, rating: 4.7, img: "🌸", color: "#ec4899" },
  ],
};

// ── Modal ──────────────────────────────────────────────────────────────────
function Modal({ title, fields, data, onSave, onClose }) {
  const [form, setForm] = useState(data || {});
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, padding: "1rem", backdropFilter: "blur(4px)"
    }}>
      <div style={{
        background: "var(--card)", border: "1px solid var(--border)",
        borderRadius: "1.5rem", padding: "2rem", width: "100%", maxWidth: "480px",
        boxShadow: "0 25px 50px rgba(0,0,0,0.4)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h3 style={{ margin: 0, color: "var(--text)", fontSize: "1.125rem", fontFamily: "var(--font-display)" }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", padding: "4px" }}>
            <Icon d={icons.close} />
          </button>
        </div>
        {fields.map(f => (
          <div key={f.key} style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--muted)", marginBottom: "0.375rem", textTransform: "uppercase", letterSpacing: ".05em" }}>
              {f.label}
            </label>
            {f.type === "textarea" ? (
              <textarea value={form[f.key] || ""} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                rows={3} style={{
                  width: "100%", background: "var(--bg)", border: "1px solid var(--border)",
                  borderRadius: "0.75rem", padding: "0.625rem 0.875rem", color: "var(--text)",
                  fontSize: "0.875rem", resize: "none", boxSizing: "border-box", fontFamily: "inherit",
                  outline: "none"
                }} />
            ) : (
              <input type={f.type || "text"} value={form[f.key] || ""} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                style={{
                  width: "100%", background: "var(--bg)", border: "1px solid var(--border)",
                  borderRadius: "0.75rem", padding: "0.625rem 0.875rem", color: "var(--text)",
                  fontSize: "0.875rem", boxSizing: "border-box", fontFamily: "inherit", outline: "none"
                }} />
            )}
          </div>
        ))}
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "0.75rem", borderRadius: "0.875rem",
            border: "1px solid var(--border)", background: "none", color: "var(--muted)",
            cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.875rem"
          }}>Cancel</button>
          <button onClick={() => onSave(form)} style={{
            flex: 1, padding: "0.75rem", borderRadius: "0.875rem", border: "none",
            background: "var(--accent)", color: "#fff", cursor: "pointer",
            fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 600
          }}>Save</button>
        </div>
      </div>
    </div>
  );
}

// ── Section Header ─────────────────────────────────────────────────────────
function SectionHeader({ icon, title, count, onAdd }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
        <span style={{
          background: "var(--accent-soft)", color: "var(--accent)",
          width: 36, height: 36, borderRadius: "0.75rem",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <Icon d={icons[icon]} size={16} />
        </span>
        <div>
          <h2 style={{ margin: 0, fontSize: "1rem", fontFamily: "var(--font-display)", color: "var(--text)", fontWeight: 700 }}>
            {title}
          </h2>
          <span style={{ fontSize: "0.7rem", color: "var(--muted)" }}>{count} items</span>
        </div>
      </div>
      <button onClick={onAdd} style={{
        display: "flex", alignItems: "center", gap: "0.375rem",
        background: "var(--accent)", color: "#fff", border: "none",
        borderRadius: "0.75rem", padding: "0.5rem 0.875rem", cursor: "pointer",
        fontSize: "0.8rem", fontWeight: 600, fontFamily: "var(--font-body)"
      }}>
        <Icon d={icons.add} size={14} /> Add
      </button>
    </div>
  );
}

// ── Action Buttons ─────────────────────────────────────────────────────────
function Actions({ onEdit, onDelete }) {
  return (
    <div style={{ display: "flex", gap: "0.375rem" }}>
      <button onClick={onEdit} style={{
        background: "var(--accent-soft)", color: "var(--accent)", border: "none",
        borderRadius: "0.625rem", padding: "0.375rem 0.625rem", cursor: "pointer",
        display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.75rem", fontWeight: 600
      }}>
        <Icon d={icons.edit} size={13} /> Edit
      </button>
      <button onClick={onDelete} style={{
        background: "#fee2e2", color: "#ef4444", border: "none",
        borderRadius: "0.625rem", padding: "0.375rem 0.625rem", cursor: "pointer",
        display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.75rem", fontWeight: 600
      }}>
        <Icon d={icons.trash} size={13} /> Del
      </button>
    </div>
  );
}

// ── Stats Bar ──────────────────────────────────────────────────────────────
function StatsBar({ data }) {
  const stats = [
    { label: "Services", value: data.services.length, icon: "🛎️" },
    { label: "Packages", value: data.packages.length, icon: "📦" },
    { label: "Blogs", value: data.blogs.length, icon: "✍️" },
    { label: "Destinations", value: data.destinations.length, icon: "📍" },
  ];
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
      gap: "0.75rem", marginBottom: "1.5rem"
    }}>
      {stats.map(s => (
        <div key={s.label} style={{
          background: "var(--card)", border: "1px solid var(--border)",
          borderRadius: "1.125rem", padding: "1rem",
          display: "flex", alignItems: "center", gap: "0.75rem"
        }}>
          <span style={{ fontSize: "1.5rem" }}>{s.icon}</span>
          <div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--accent)", fontFamily: "var(--font-display)", lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: "0.7rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".05em" }}>{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Services Section ───────────────────────────────────────────────────────
const serviceFields = [
  { key: "icon", label: "Emoji Icon" },
  { key: "title", label: "Service Title" },
  { key: "desc", label: "Description", type: "textarea" },
  { key: "price", label: "Price" },
];

function ServicesSection({ items, setItems }) {
  const [modal, setModal] = useState(null);
  const save = (form) => {
    if (form.id) setItems(items.map(i => i.id === form.id ? form : i));
    else setItems([...items, { ...form, id: Date.now() }]);
    setModal(null);
  };
  return (
    <section style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "1.5rem", padding: "1.5rem", marginBottom: "1.25rem" }}>
      <SectionHeader icon="globe" title="Our Services" count={items.length} onAdd={() => setModal({ data: {}, title: "Add Service" })} />
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {items.map(item => (
          <div key={item.id} style={{
            background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "1.125rem",
            padding: "0.875rem 1rem", display: "flex", alignItems: "center", gap: "0.875rem"
          }}>
            <span style={{ fontSize: "1.75rem", flexShrink: 0 }}>{item.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--text)", fontFamily: "var(--font-display)" }}>{item.title}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.125rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.desc}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--accent)", fontWeight: 700, marginTop: "0.25rem" }}>{item.price}</div>
            </div>
            <Actions onEdit={() => setModal({ data: item, title: "Edit Service" })} onDelete={() => setItems(items.filter(i => i.id !== item.id))} />
          </div>
        ))}
      </div>
      {modal && <Modal {...modal} fields={serviceFields} onSave={save} onClose={() => setModal(null)} />}
    </section>
  );
}

// ── Packages Section ───────────────────────────────────────────────────────
const pkgFields = [
  { key: "title", label: "Package Name" },
  { key: "nights", label: "Nights" },
  { key: "destinations", label: "Destinations" },
  { key: "price", label: "Price" },
  { key: "badge", label: "Badge" },
  { key: "rating", label: "Rating (0-5)" },
  { key: "reviews", label: "Reviews Count" },
];

function PackagesSection({ items, setItems }) {
  const [modal, setModal] = useState(null);
  const save = (form) => {
    if (form.id) setItems(items.map(i => i.id === form.id ? form : i));
    else setItems([...items, { ...form, id: Date.now() }]);
    setModal(null);
  };
  return (
    <section style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "1.5rem", padding: "1.5rem", marginBottom: "1.25rem" }}>
      <SectionHeader icon="package" title="Premium Packages" count={items.length} onAdd={() => setModal({ data: {}, title: "Add Package" })} />
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {items.map(item => (
          <div key={item.id} style={{
            background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "1.125rem", padding: "1rem",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 800, fontSize: "0.9rem", color: "var(--text)", fontFamily: "var(--font-display)" }}>{item.title}</span>
                  {item.badge && <span style={{ background: "var(--accent)", color: "#fff", fontSize: "0.65rem", fontWeight: 700, padding: "0.125rem 0.5rem", borderRadius: "999px" }}>{item.badge}</span>}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.25rem" }}>
                  {item.nights} nights · {item.destinations} destination{item.destinations > 1 ? "s" : ""}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "1rem", fontWeight: 800, color: "var(--accent)" }}>{item.price}</div>
                <div style={{ fontSize: "0.7rem", color: "var(--muted)" }}>⭐ {item.rating} ({item.reviews})</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Actions onEdit={() => setModal({ data: item, title: "Edit Package" })} onDelete={() => setItems(items.filter(i => i.id !== item.id))} />
            </div>
          </div>
        ))}
      </div>
      {modal && <Modal {...modal} fields={pkgFields} onSave={save} onClose={() => setModal(null)} />}
    </section>
  );
}

// ── Blog Section ───────────────────────────────────────────────────────────
const blogFields = [
  { key: "img", label: "Emoji" },
  { key: "title", label: "Post Title" },
  { key: "tag", label: "Tag" },
  { key: "date", label: "Date" },
  { key: "reads", label: "Read Count (e.g. 4.2k)" },
];

function BlogSection({ items, setItems }) {
  const [modal, setModal] = useState(null);
  const save = (form) => {
    if (form.id) setItems(items.map(i => i.id === form.id ? form : i));
    else setItems([...items, { ...form, id: Date.now() }]);
    setModal(null);
  };
  return (
    <section style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "1.5rem", padding: "1.5rem", marginBottom: "1.25rem" }}>
      <SectionHeader icon="blog" title="From Our Blog" count={items.length} onAdd={() => setModal({ data: {}, title: "Add Blog Post" })} />
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {items.map(item => (
          <div key={item.id} style={{
            background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "1.125rem",
            padding: "0.875rem 1rem", display: "flex", alignItems: "center", gap: "0.875rem"
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: "0.875rem", background: "var(--accent-soft)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0
            }}>{item.img}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: "0.8rem", color: "var(--text)", lineHeight: 1.3, fontFamily: "var(--font-display)" }}
                className="line-clamp">{item.title}</div>
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.375rem", alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ background: "var(--accent-soft)", color: "var(--accent)", fontSize: "0.65rem", fontWeight: 700, padding: "0.1rem 0.5rem", borderRadius: "999px" }}>{item.tag}</span>
                <span style={{ fontSize: "0.7rem", color: "var(--muted)" }}>{item.date}</span>
                <span style={{ fontSize: "0.7rem", color: "var(--muted)" }}>👁 {item.reads}</span>
              </div>
            </div>
            <Actions onEdit={() => setModal({ data: item, title: "Edit Blog Post" })} onDelete={() => setItems(items.filter(i => i.id !== item.id))} />
          </div>
        ))}
      </div>
      {modal && <Modal {...modal} fields={blogFields} onSave={save} onClose={() => setModal(null)} />}
    </section>
  );
}

// ── Destinations Section ───────────────────────────────────────────────────
const destFields = [
  { key: "img", label: "Emoji" },
  { key: "name", label: "Destination Name" },
  { key: "category", label: "Category" },
  { key: "trips", label: "Trips Count" },
  { key: "rating", label: "Rating (0-5)" },
  { key: "color", label: "Accent Color (hex)" },
];

function DestinationsSection({ items, setItems }) {
  const [modal, setModal] = useState(null);
  const save = (form) => {
    if (form.id) setItems(items.map(i => i.id === form.id ? form : i));
    else setItems([...items, { ...form, id: Date.now() }]);
    setModal(null);
  };
  return (
    <section style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "1.5rem", padding: "1.5rem", marginBottom: "1.25rem" }}>
      <SectionHeader icon="map" title="Destination" count={items.length} onAdd={() => setModal({ data: {}, title: "Add Destination" })} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        {items.map(item => (
          <div key={item.id} style={{
            background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "1.125rem",
            padding: "1rem", position: "relative", overflow: "hidden"
          }}>
            <div style={{
              position: "absolute", top: 0, right: 0, width: 60, height: 60,
              background: item.color + "22", borderRadius: "0 1.125rem 0 60px",
              display: "flex", alignItems: "flex-start", justifyContent: "flex-end",
              padding: "0.5rem 0.5rem 0 0", fontSize: "1.25rem"
            }}>{item.img}</div>
            <div style={{ fontWeight: 800, fontSize: "0.8rem", color: "var(--text)", fontFamily: "var(--font-display)", paddingRight: "2rem", lineHeight: 1.3 }}>{item.name}</div>
            <div style={{ fontSize: "0.65rem", color: item.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", marginTop: "0.25rem" }}>{item.category}</div>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem", fontSize: "0.7rem", color: "var(--muted)" }}>
              <span>✈️ {item.trips}</span>
              <span>⭐ {item.rating}</span>
            </div>
            <div style={{ display: "flex", gap: "0.375rem", marginTop: "0.625rem" }}>
              <Actions onEdit={() => setModal({ data: item, title: "Edit Destination" })} onDelete={() => setItems(items.filter(i => i.id !== item.id))} />
            </div>
          </div>
        ))}
      </div>
      {modal && <Modal {...modal} fields={destFields} onSave={save} onClose={() => setModal(null)} />}
    </section>
  );
}

// ── Nav ────────────────────────────────────────────────────────────────────
const navItems = [
  { id: "services", label: "Services", icon: "globe" },
  { id: "packages", label: "Packages", icon: "package" },
  { id: "blogs", label: "Blog", icon: "blog" },
  { id: "destinations", label: "Destinations", icon: "map" },
];

// ── Main App ───────────────────────────────────────────────────────────────
export default function TravelDashboard() {
  const [services, setServices] = useState(seed.services);
  const [packages, setPackages] = useState(seed.packages);
  const [blogs, setBlogs] = useState(seed.blogs);
  const [destinations, setDestinations] = useState(seed.destinations);
  const [activeSection, setActiveSection] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const allData = { services, packages, blogs, destinations };

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
    :root {
      --font-display: 'Fraunces', serif;
      --font-body: 'DM Sans', sans-serif;
      --bg: #0f1117;
      --card: #16181f;
      --border: #242630;
      --text: #f0f2f8;
      --muted: #6b7280;
      --accent: #6366f1;
      --accent-soft: rgba(99,102,241,0.12);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: var(--font-body); background: var(--bg); color: var(--text); }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
    input, textarea { outline: none; }
    input:focus, textarea:focus { border-color: var(--accent) !important; }
    @media (min-width: 768px) {
      .sidebar { transform: translateX(0) !important; }
      .overlay { display: none !important; }
      .hamburger { display: none !important; }
      .layout { margin-left: 240px !important; }
    }
  `;

  const sidebarStyle = {
    position: "fixed", top: 0, left: 0, bottom: 0, width: 240,
    background: "var(--card)", borderRight: "1px solid var(--border)",
    display: "flex", flexDirection: "column", zIndex: 500, padding: "1.5rem 1rem",
    transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
    transition: "transform 0.3s ease",
  };

  return (
    <>
      <style>{styles}</style>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 499,
          backdropFilter: "blur(2px)"
        }} />
      )}

      {/* Sidebar */}
      <aside className="sidebar" style={sidebarStyle}>
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <span style={{ fontSize: "1.5rem" }}>✈️</span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", fontWeight: 800, color: "var(--text)" }}>TravelCMS</span>
          </div>
          <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginTop: "0.25rem", marginLeft: "2.125rem" }}>Dashboard v2.0</div>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "0.375rem", flex: 1 }}>
          <button onClick={() => { setActiveSection("all"); setSidebarOpen(false); }}
            style={{
              display: "flex", alignItems: "center", gap: "0.625rem",
              background: activeSection === "all" ? "var(--accent-soft)" : "none",
              color: activeSection === "all" ? "var(--accent)" : "var(--muted)",
              border: activeSection === "all" ? "1px solid rgba(99,102,241,0.3)" : "1px solid transparent",
              borderRadius: "0.875rem", padding: "0.625rem 0.875rem", cursor: "pointer",
              fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 600, textAlign: "left"
            }}>
            <Icon d={icons.dash} size={16} /> All Sections
          </button>
          {navItems.map(n => (
            <button key={n.id} onClick={() => { setActiveSection(n.id); setSidebarOpen(false); }}
              style={{
                display: "flex", alignItems: "center", gap: "0.625rem",
                background: activeSection === n.id ? "var(--accent-soft)" : "none",
                color: activeSection === n.id ? "var(--accent)" : "var(--muted)",
                border: activeSection === n.id ? "1px solid rgba(99,102,241,0.3)" : "1px solid transparent",
                borderRadius: "0.875rem", padding: "0.625rem 0.875rem", cursor: "pointer",
                fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 600, textAlign: "left"
              }}>
              <Icon d={icons[n.icon]} size={16} /> {n.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "0.875rem", background: "var(--accent-soft)", borderRadius: "1rem", border: "1px solid rgba(99,102,241,0.2)" }}>
          <div style={{ fontSize: "0.7rem", color: "var(--accent)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em" }}>Total Content</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text)", fontFamily: "var(--font-display)" }}>
            {services.length + packages.length + blogs.length + destinations.length}
          </div>
          <div style={{ fontSize: "0.7rem", color: "var(--muted)" }}>items managed</div>
        </div>
      </aside>

      {/* Main Layout */}
      <div className="layout" style={{ minHeight: "100vh", transition: "margin-left 0.3s ease" }}>
        {/* Top Bar */}
        <header style={{
          position: "sticky", top: 0, zIndex: 200,
          background: "rgba(15,17,23,0.9)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
          padding: "1rem 1.25rem",
          display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
            <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)} style={{
              background: "var(--card)", border: "1px solid var(--border)",
              borderRadius: "0.75rem", padding: "0.5rem", cursor: "pointer", color: "var(--text)",
              display: "flex", alignItems: "center"
            }}>
              <Icon d={sidebarOpen ? icons.close : icons.menu} size={20} />
            </button>
            <div>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", fontWeight: 800, color: "var(--text)", lineHeight: 1 }}>
                Travel Dashboard
              </h1>
              <p style={{ fontSize: "0.7rem", color: "var(--muted)", marginTop: "0.125rem" }}>Manage your travel content</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
            <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>Live</span>
          </div>
        </header>

        {/* Content */}
        <main style={{ padding: "1.25rem", maxWidth: 900, margin: "0 auto" }}>
          {activeSection === "all" && <StatsBar data={allData} />}

          {(activeSection === "all" || activeSection === "services") && (
            <ServicesSection items={services} setItems={setServices} />
          )}
          {(activeSection === "all" || activeSection === "packages") && (
            <PackagesSection items={packages} setItems={setPackages} />
          )}
          {(activeSection === "all" || activeSection === "blogs") && (
            <BlogSection items={blogs} setItems={setBlogs} />
          )}
          {(activeSection === "all" || activeSection === "destinations") && (
            <DestinationsSection items={destinations} setItems={setDestinations} />
          )}
        </main>
      </div>
    </>
  );
}
