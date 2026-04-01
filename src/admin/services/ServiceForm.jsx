import { useState, useEffect, useRef } from "react";
import {
  Mountain, Landmark, Hotel, Map, Users, Car, Upload, Check
} from "lucide-react";
import { createService, updateService } from "../../services/services.service";

// UI Theme Constants
const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const ICONS = [
  { key: "mountain", label: "Mountain", Icon: Mountain },
  { key: "landmark", label: "Landmark", Icon: Landmark },
  { key: "hotel", label: "Hotel", Icon: Hotel },
  { key: "map", label: "Map", Icon: Map },
  { key: "users", label: "Users", Icon: Users },
  { key: "car", label: "Car", Icon: Car },
];

const CATEGORIES = [
  "Adventure", "Cultural", "Hospitality",
  "Transport", "Guided Tour", "Custom",
];

const inputStyle = {
  width: "100%",
  background: "#FAFAF7",
  border: "0.5px solid #e8e2d0",
  borderRadius: 10,
  padding: "10px 12px",
  fontSize: 13,
  color: NAVY,
  outline: "none",
  fontFamily: "sans-serif",
  transition: "border-color 0.2s, background 0.2s",
};

const labelStyle = {
  display: "block",
  fontSize: 9,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  fontWeight: 700,
  color: "#aaa",
  marginBottom: 5,
};

export default function ServiceForm({ initialData, onSuccess }) {
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    icon: "mountain",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Sync with initialData (Edit Mode)
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        price: initialData.price || "",
        category: initialData.category || "",
        icon: initialData.icon || "mountain",
        image: null,
      });
      const img = initialData.image;
      setPreview(typeof img === "string" ? img : img?.url || null);
    } else {
      resetForm();
    }
  }, [initialData]);

  const set = (key, val) => setFormData((p) => ({ ...p, [key]: val }));

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      category: "",
      icon: "mountain",
      image: null,
    });
    setPreview(null);
    setError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB");
      return;
    }

    setError("");
    set("image", file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!formData.title || !formData.price || !formData.category) {
      return setError("Please fill all required fields");
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("icon", formData.icon);
      if (formData.image) data.append("image", formData.image);

      if (initialData?._id) {
        await updateService(initialData._id, data);
      } else {
        await createService(data);
      }

      resetForm();
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("SUBMIT_ERROR:", err);
      setError(err?.response?.data?.error || err?.msg || "Failed to save service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      
      {/* Title */}
      <div>
        <label style={labelStyle}>Service Title</label>
        <input
          style={inputStyle}
          type="text"
          placeholder="e.g. Luxury Desert Safari"
          value={formData.title}
          onChange={(e) => set("title", e.target.value)}
          required
          onFocus={(e) => { e.target.style.borderColor = GOLD; e.target.style.background = "#fff"; }}
          onBlur={(e) => { e.target.style.borderColor = "#e8e2d0"; e.target.style.background = "#FAFAF7"; }}
        />
      </div>

      {/* Price + Category */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={labelStyle}>Price (₹)</label>
          <input
            style={inputStyle}
            type="number"
            placeholder="0"
            value={formData.price}
            onChange={(e) => set("price", e.target.value)}
            required
            onFocus={(e) => { e.target.style.borderColor = GOLD; e.target.style.background = "#fff"; }}
            onBlur={(e) => { e.target.style.borderColor = "#e8e2d0"; e.target.style.background = "#FAFAF7"; }}
          />
        </div>
        <div>
          <label style={labelStyle}>Category</label>
          <div style={{ position: "relative" }}>
            <select
              style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
              value={formData.category}
              onChange={(e) => set("category", e.target.value)}
              required
              onFocus={(e) => { e.target.style.borderColor = GOLD; e.target.style.background = "#fff"; }}
              onBlur={(e) => { e.target.style.borderColor = "#e8e2d0"; e.target.style.background = "#FAFAF7"; }}
            >
              <option value="">Select...</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
               <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label style={labelStyle}>Description</label>
        <textarea
          style={{ ...inputStyle, height: 80, resize: "none", lineHeight: 1.5 }}
          placeholder="What's included in this service?"
          value={formData.description}
          onChange={(e) => set("description", e.target.value)}
          required
          onFocus={(e) => { e.target.style.borderColor = GOLD; e.target.style.background = "#fff"; }}
          onBlur={(e) => { e.target.style.borderColor = "#e8e2d0"; e.target.style.background = "#FAFAF7"; }}
        />
      </div>

      {/* Icon Selector */}
      <div>
        <label style={labelStyle}>Service Icon</label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 6 }}>
          {ICONS.map(({ key, label, Icon }) => {
            const isActive = formData.icon === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => set("icon", key)}
                style={{
                  border: `0.5px solid ${isActive ? GOLD : "#e8e2d0"}`,
                  borderRadius: 8,
                  padding: "8px 4px",
                  background: isActive ? "#FBF5E8" : "#FAFAF7",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  transition: "all 0.2s",
                }}
              >
                <Icon size={16} color={isActive ? GOLD : "#888"} />
                <span style={{ fontSize: 7, fontWeight: 800, color: isActive ? "#9a7530" : "#aaa", textTransform: "uppercase" }}>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Image Upload Area */}
      <div>
        <label style={labelStyle}>Cover Image</label>
        <div
          onClick={() => fileInputRef.current.click()}
          style={{
            border: "0.5px dashed #d4c9a8",
            borderRadius: 12,
            background: "#FAFAF7",
            minHeight: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {preview ? (
            <div style={{ width: "100%", position: "relative" }}>
              <img src={preview} alt="Preview" style={{ width: "100%", height: 120, objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>Click to Change</span>
              </div>
            </div>
          ) : (
            <>
              <Upload size={20} color={GOLD} style={{ marginBottom: 4 }} />
              <p style={{ fontSize: 11, color: "#888", margin: 0 }}>Upload Image</p>
            </>
          )}
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleImageChange} />
      </div>

      {/* Error Alert */}
      {error && (
        <div style={{ background: "#FEF2F2", color: "#c0392b", padding: "10px", borderRadius: 8, fontSize: 12, fontWeight: 500, border: "0.5px solid #fecaca" }}>
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: 12,
          border: "none",
          background: loading ? "#d4cfc6" : NAVY,
          color: loading ? "#999" : GOLD,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          cursor: loading ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        {loading ? (
          <>
            <div className="spinner" />
            Processing...
          </>
        ) : (
          <>
            <Check size={16} />
            {initialData ? "Update Service" : "Publish Service"}
          </>
        )}
      </button>

      <style>{`
        .spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(201, 168, 76, 0.3);
          border-top-color: ${GOLD};
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </form>
  );
}