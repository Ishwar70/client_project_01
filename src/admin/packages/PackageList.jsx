import { useEffect, useState } from "react";
import { 
  Pencil, Trash2, Search, AlertTriangle, 
  Clock, Package, Star, Camera 
} from "lucide-react";
import { getAllPackages, deletePackage } from "../../services/package.service";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

// Fallback image if the database provides null or broken links
const PLACEHOLDER = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop";

export default function PackageList({ refresh, onEdit, onRefresh }) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const res = await getAllPackages();
      // Safely handle various response structures
      const data = res?.packages || res?.data || res || [];
      setPackages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching packages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPackages(); }, [refresh]);

  const handleDelete = async () => {
    if (!deleteModal) return;
    try {
      setDeleting(true);
      await deletePackage(deleteModal._id);
      setPackages((prev) => prev.filter((p) => p._id !== deleteModal._id));
      setDeleteModal(null);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(false);
    }
  };

  /**
   * Refined Image Logic:
   * Returns the correct URL or the PLACEHOLDER if the data is null/empty.
   */
  const getImageUrl = (image) => {
    if (!image) return PLACEHOLDER;
    if (typeof image === "string") {
      // Return placeholder if the string is actually "null" or empty
      if (image === "null" || image.trim() === "") return PLACEHOLDER;
      return image.startsWith("http") ? image : `http://localhost:5000/${image}`;
    }
    return image?.url || PLACEHOLDER;
  };

  const filtered = packages.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ color: NAVY }}>
      {/* ── Search Bar ── */}
      <div className="relative mb-8 max-w-sm">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search packages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-full outline-none transition-all focus:ring-1 focus:ring-[#C9A84C]"
          style={{ background: "#fff", border: "0.5px solid #e8e2d0", fontSize: 13 }}
        />
      </div>

      {/* ── Loading ── */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-gray-200 animate-spin" style={{ borderTopColor: GOLD }} />
        </div>
      )}

      {/* ── Empty State ── */}
      {!loading && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Package size={40} className="mb-2 opacity-20" />
          <p className="text-sm font-medium">No packages found matching your search.</p>
        </div>
      )}

      {/* ── Grid ── */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pkg) => {
            const imageUrl = getImageUrl(pkg.image);
            
            return (
              <div
                key={pkg._id}
                className="group bg-white rounded-2xl overflow-hidden flex flex-col transition-all hover:shadow-md"
                style={{ border: "0.5px solid #e8e2d0" }}
              >
                {/* Image Section */}
                <div 
                  className="relative h-48 overflow-hidden bg-gray-100 cursor-pointer"
                  onClick={() => onEdit(pkg)}
                >
                  <img
                    src={imageUrl}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    // Double safety: If the URL exists but the image fails to load (404), use placeholder
                    onError={(e) => { e.target.src = PLACEHOLDER; }}
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm z-10"
                       style={{ background: "rgba(255,255,255,0.9)", color: GOLD }}>
                    {pkg.category}
                  </div>

                  {/* Edit Overlay */}
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="bg-white/90 p-3 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Camera size={20} style={{ color: NAVY }} />
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 flex flex-col grow">
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <h3 className="font-semibold text-base leading-tight truncate pr-1">{pkg.title}</h3>
                    <div className="flex items-center gap-1 text-xs font-bold shrink-0" style={{ color: GOLD }}>
                      <Star size={12} className="fill-current" />
                      {pkg.rating || "5.0"}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400 text-[11px] mb-4">
                    <Clock size={12} /> {pkg.duration || "Flexible"}
                  </div>

                  {/* Pricing and Actions */}
                  <div className="mt-auto pt-4 flex flex-col gap-3" style={{ borderTop: "0.5px solid #f0ece2" }}>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Package Price</span>
                      <span className="font-bold text-sm">
                        {pkg.price === "Custom" || !pkg.price ? "On Request" : `₹${Number(pkg.price).toLocaleString("en-IN")}`}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(pkg)}
                        className="flex-1 py-2.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 hover:bg-[#fcf8ed] active:scale-[0.98]"
                        style={{ background: "#FBF5E8", color: "#9a7530", border: "0.5px solid #e8d9a0" }}
                      >
                        <Pencil size={14} /> Edit Package
                      </button>
                      <button
                        onClick={() => setDeleteModal(pkg)}
                        className="w-11 h-10 flex items-center justify-center rounded-full text-red-500 transition-all hover:bg-red-50 active:scale-[0.95]"
                        style={{ background: "#FEF2F2", border: "0.5px solid #fecaca" }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Delete Modal ── */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl scale-in-center" style={{ border: "0.5px solid #e8e2d0" }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#FEF2F2" }}>
              <AlertTriangle size={22} style={{ color: "#c0392b" }} />
            </div>
            <h3 className="text-center font-bold text-lg mb-2">Delete Package</h3>
            <p className="text-center text-sm text-gray-500 mb-6 px-4">
              Are you sure you want to delete <span className="font-semibold text-slate-700">"{deleteModal.title}"</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setDeleteModal(null)} 
                className="flex-1 py-2.5 rounded-full text-sm font-medium border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete} 
                disabled={deleting} 
                className="flex-1 py-2.5 rounded-full text-sm font-medium text-white transition-all hover:opacity-90 active:scale-95" 
                style={{ background: "#c0392b" }}
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}