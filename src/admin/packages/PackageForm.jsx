import { useState, useEffect, useRef } from "react";
import { Upload, X, Check } from "lucide-react";
import { createPackage, updatePackage } from "../../services/package.service";

// UI Theme Constants
const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const CATEGORIES = ["Adventure", "Hill Station", "Pilgrimage", "Custom"];

const inputStyle = {
  width: "100%",
  background: "#fff",
  border: "0.5px solid #e8e2d0",
  borderRadius: "9999px",
  padding: "10px 18px",
  fontSize: 13,
  color: NAVY,
  outline: "none",
  transition: "all 0.2s",
};

const labelStyle = {
  display: "block",
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  fontWeight: 700,
  color: "#9ca3af",
  marginBottom: 6,
  marginLeft: 4,
};

export default function PackageForm({ initialData, onSuccess }) {
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    category: "Adventure",
    duration: "",
    price: "",
    rating: "",
    includes: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Sync with initialData (Edit Mode)
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        category: initialData.category || "Adventure",
        duration: initialData.duration || "",
        price: initialData.price || "",
        rating: initialData.rating || "",
        includes: Array.isArray(initialData.includes) ? initialData.includes.join(", ") : "",
        image: initialData.image || null,
      });
      setPreview(initialData.image);
    }
  }, [initialData]);

  // Memory Cleanup for Blob URLs
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file) {
        setForm((prev) => ({ ...prev, image: file }));
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setPreview(null);
    // Explicitly set to null to tell backend to use DEFAULT_IMAGE
    setForm((prev) => ({ ...prev, image: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title: form.title,
        category: form.category,
        duration: form.duration || "Flexible",
        price: form.price || "Custom",
        rating: form.rating || 4.5,
        // Convert comma string to array
        includes: form.includes.split(",").map(i => i.trim()).filter(Boolean),
        image: form.image
      };

      if (initialData?._id) {
        await updatePackage(initialData._id, payload);
      } else {
        await createPackage(payload);
      }

      onSuccess();
    } catch (err) {
      console.error("Submission Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getFullPreviewUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("blob:") || url.startsWith("http")) return url;
    return `http://localhost:5000/${url}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-1">
      {/* Title */}
      <div>
        <label style={labelStyle}>Package Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Himalayan Adventure"
          required
          style={inputStyle}
          className="focus:border-[#C9A84C]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Duration</label>
          <input
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="e.g. 5 Days"
            style={inputStyle}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Price (₹)</label>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Amount or 'Custom'"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Rating</label>
          <input
            name="rating"
            type="number"
            step="0.1"
            max="5"
            value={form.rating}
            onChange={handleChange}
            placeholder="4.8"
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Includes (Comma Separated)</label>
        <textarea
          name="includes"
          value={form.includes}
          onChange={handleChange}
          placeholder="Hotel, Meals, Guide..."
          className="w-full px-5 py-3 rounded-2xl outline-none min-h-20 resize-none border border-[#e8e2d0] focus:border-[#C9A84C]"
          style={{ fontSize: 13, background: "#fff" }}
        />
      </div>

      <div>
        <label style={labelStyle}>Cover Image</label>
        <div
          onClick={() => fileInputRef.current.click()}
          className="group relative h-44 w-full cursor-pointer overflow-hidden rounded-2xl border border-dashed border-[#d4c9a8] bg-[#FAFAF7] transition-all hover:bg-white"
        >
          {preview ? (
            <div className="h-full w-full">
              <img 
                src={getFullPreviewUrl(preview)} 
                alt="Preview" 
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white">Click to Change Image</p>
              </div>
              <button 
                type="button"
                onClick={handleRemoveImage}
                className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 text-red-600 shadow-md hover:scale-110"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "#FBF5E8" }}>
                <Upload size={18} style={{ color: GOLD }} />
              </div>
              <p className="text-xs font-medium" style={{ color: NAVY }}>Upload Package Image</p>
              <p className="text-[9px] font-bold uppercase text-gray-400 italic">Leave empty for default beach image</p>
            </div>
          )}
        </div>
        <input 
          ref={fileInputRef}
          type="file" 
          name="image" 
          accept="image/*" 
          onChange={handleChange} 
          className="hidden" 
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-full py-3.5 text-[11px] font-bold uppercase tracking-widest transition-all active:scale-[0.98] shadow-lg shadow-navy/10"
        style={{ 
          background: loading ? "#cbd5e1" : NAVY, 
          color: loading ? "#64748b" : GOLD 
        }}
      >
        {loading ? (
          "Processing..."
        ) : (
          <>
            <Check size={16} />
            {initialData ? "Save Changes" : "Create Package"}
          </>
        )}
      </button>
    </form>
  );
}