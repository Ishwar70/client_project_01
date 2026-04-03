import { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  FiHome,
  FiLayers,
  FiBriefcase,
  FiFileText,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiSearch,
} from "react-icons/fi";

import { logoutUser } from "../services/auth.service";

const GOLD = "#BFA13B";
const DARK = "#8e7421";

const DashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;
    await logoutUser();
    navigate("/login");
  };

  const menuItems = [
    { icon: <FiHome />, label: "Destinations", path: "/admin/destinations" },
    { icon: <FiLayers />, label: "Packages", path: "/admin/packages" },
    { icon: <FiBriefcase />, label: "Services", path: "/admin/services" },
    { icon: <FiFileText />, label: "Blogs", path: "/admin/posts" },
    { icon: <FiUser />, label: "Profile", path: "/admin/profile" },
  ];

  // Helper to handle text visibility logic
  const textVisibility = isMobileOpen 
    ? "opacity-100 ml-6" 
    : "opacity-0 group-hover:opacity-100 ml-6";

  return (
    <div className="min-h-screen bg-[#F9F8F6] flex font-sans text-stone-800">
      
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-stone-200
        transition-all duration-300 ease-in-out group shadow-xl md:shadow-none
        ${isMobileOpen ? "w-72 translate-x-0" : "w-0 -translate-x-full"} 
        md:w-20 md:translate-x-0 md:hover:w-64`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          
          {/* Logo Section */}
          <div className="h-20 flex items-center px-5 border-b border-stone-100">
            <div
              className="min-w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg"
              style={{ background: `linear-gradient(135deg, ${GOLD}, ${DARK})` }}
            >
              G
            </div>
            <span className={`font-bold text-xl transition-all duration-300 whitespace-nowrap ml-4
              ${isMobileOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
              Gold Standard
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-3 py-8 space-y-2">
            {menuItems.map((item, idx) => {
              const isActive = location.pathname === item.path;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileOpen(false);
                  }}
                  className={`flex items-center cursor-pointer p-3 rounded-xl transition-all relative
                  ${isActive ? "bg-stone-50 text-[#BFA13B]" : "text-stone-400 hover:bg-stone-50 hover:text-stone-600"}`}
                >
                  {isActive && (
                    <div className="absolute left-0 w-1 h-6 rounded-r-full" style={{ backgroundColor: GOLD }} />
                  )}
                  <div className="text-xl min-w-6 flex justify-center">{item.icon}</div>
                  <span className={`font-semibold text-sm transition-all duration-300 whitespace-nowrap ${textVisibility}`}>
                    {item.label}
                  </span>
                </div>
              );
            })}
          </nav>

          {/* Logout Section */}
          <div className="p-4 border-t border-stone-100">
            <div
              onClick={handleLogout}
              className="flex items-center p-3 cursor-pointer text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            >
              <FiLogOut className="text-xl min-w-6" />
              <span className={`font-semibold text-sm transition-all duration-300 whitespace-nowrap ${textVisibility}`}>
                Logout
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col md:pl-20 w-full transition-all">
        
        {/* Header */}
        <header className="h-20 bg-white/70 backdrop-blur-md border-b flex items-center justify-between px-6 md:px-10 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden text-2xl p-2 bg-stone-100 rounded-lg text-stone-600"
            >
              {isMobileOpen ? <FiX /> : <FiMenu />}
            </button>

            <div className="hidden sm:flex items-center bg-stone-50 px-4 py-2 rounded-xl border border-stone-200">
              <FiSearch className="text-stone-400" />
              <input className="ml-2 bg-transparent outline-none text-sm w-48 lg:w-64" placeholder="Search..." />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <img
              onClick={() => navigate("/admin/profile")}
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="Profile"
              className="w-10 h-10 rounded-lg cursor-pointer hover:ring-2 hover:ring-[#BFA13B] transition-all"
            />
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 md:p-10">
          <Outlet /> 
        </div>
      </main>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm transition-all"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;