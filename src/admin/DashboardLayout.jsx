import { useState } from "react";
import { 
  FiHome, FiBarChart2, FiUsers, FiSettings, 
  FiLogOut, FiMenu, FiX, FiSearch, FiBell 
} from "react-icons/fi";
import DashboardContent from "./DashboardContent";

const GOLD = "#BFA13B";
const DARK = "#8e7421";

const DashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");

  const menuItems = [
    { icon: <FiHome />, label: "Overview" },
    { icon: <FiBarChart2 />, label: "Analytics" },
    { icon: <FiUsers />, label: "Customers" },
    { icon: <FiSettings />, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-[#F9F8F6] flex font-sans text-stone-800">
      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 bg-white border-r border-stone-200
          transition-all duration-300 ease-in-out group shadow-xl md:shadow-none
          ${isMobileOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full"} 
          md:w-20 md:translate-x-0 md:hover:w-64
        `}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo Area */}
          <div className="h-20 flex items-center px-5 border-b border-stone-100">
            <div className="min-w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg" 
                 style={{ background: `linear-gradient(135deg, ${GOLD}, ${DARK})` }}>
              <span className="font-bold text-lg">G</span>
            </div>
            {/* Show text if mobile is open OR if desktop is hovered */}
            <span className={`ml-4 font-bold text-xl tracking-tight whitespace-nowrap transition-opacity duration-300
              ${isMobileOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Gold Standard
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-8 space-y-2">
            {menuItems.map((item, idx) => {
              const isActive = activeTab === item.label;
              return (
                <div 
                  key={idx} 
                  onClick={() => { setActiveTab(item.label); setIsMobileOpen(false); }}
                  className={`flex items-center cursor-pointer p-3 rounded-xl transition-all relative group/item
                    ${isActive ? "bg-stone-50 text-[#BFA13B]" : "text-stone-400 hover:bg-stone-50 hover:text-stone-600"}`}
                >
                  {/* Active Indicator Line */}
                  {isActive && (
                    <div className="absolute left-0 w-1 h-6 rounded-r-full" style={{ backgroundColor: GOLD }} />
                  )}
                  
                  <div className={`text-xl transition-colors ${isActive ? "text-[#BFA13B]" : "group-hover/item:text-[#BFA13B]"}`}>
                    {item.icon}
                  </div>
                  
                  <span className={`ml-6 font-semibold text-sm whitespace-nowrap transition-all duration-300
                    ${isMobileOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"}`}>
                    {item.label}
                  </span>
                </div>
              );
            })}
          </nav>

          {/* Logout Section */}
          <div className="p-4 border-t border-stone-100">
            <div className="flex items-center p-3 cursor-pointer text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all group/logout">
              <FiLogOut className="text-xl min-w-6" />
              <span className={`ml-6 font-semibold text-sm whitespace-nowrap transition-all duration-300
                ${isMobileOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                Logout
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col md:pl-20 transition-all duration-300 w-full">
        {/* Header */}
        <header className="h-20 bg-white/70 backdrop-blur-md border-b border-stone-200 flex items-center justify-between px-6 md:px-10 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileOpen(!isMobileOpen)} 
              className="md:hidden text-2xl p-2 rounded-lg bg-stone-100 text-stone-600 active:scale-90 transition-transform"
            >
              {isMobileOpen ? <FiX /> : <FiMenu />}
            </button>
            
            <div className="hidden sm:flex items-center bg-stone-50 rounded-xl px-4 py-2 border border-stone-100 focus-within:border-[#BFA13B] transition-colors">
              <FiSearch className="text-stone-400" />
              <input 
                type="text" 
                placeholder="Search analytics..." 
                className="bg-transparent border-none outline-none text-sm ml-3 w-48 lg:w-80" 
              />
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="relative p-2.5 text-stone-400 hover:text-[#BFA13B] bg-stone-50 rounded-xl cursor-pointer transition-colors">
              <FiBell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
            
            <div className="flex items-center gap-3 pl-4 border-l border-stone-200">
              <div className="hidden md:block text-right">
                <p className="text-xs font-bold text-stone-800 leading-none">Admin User</p>
                <p className="text-[10px] text-stone-400 font-medium uppercase tracking-tighter">Premium Plan</p>
              </div>
              <div className="h-10 w-10 rounded-xl border-2 p-0.5 transition-transform hover:scale-105 cursor-pointer" style={{ borderColor: `${GOLD}40` }}>
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                  alt="Avatar" 
                  className="rounded-lg bg-stone-100"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content View */}
        <div className="p-5 md:p-10 max-w-400 mx-auto w-full">
          <DashboardContent />
        </div>
      </main>

      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-stone-900/40 backdrop-blur-[2px] z-40 md:hidden transition-opacity" 
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
    </div>
  );
};

export default DashboardLayout;