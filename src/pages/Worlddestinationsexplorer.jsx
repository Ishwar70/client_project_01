import React, { useState, useMemo, useEffect } from 'react';
import { MapPin, Star, ArrowRight, Compass, SlidersHorizontal, X, ChevronDown, Globe, Clock, Calendar } from 'lucide-react';

const destinations = [
  { id: 1, title: "Santorini", country: "Greece", district: "South Aegean", city: "Oia", place: "Coastal", time: "Morning", days: "5-7", rating: "4.9", price: 85000, tagline: "Where sunsets are a religion", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=600", continent: "Europe" },
  { id: 2, title: "Kyoto", country: "Japan", district: "Kansai", city: "Kyoto", place: "Cultural", time: "Afternoon", days: "7-10", rating: "5.0", price: 110000, tagline: "Ancient temples meet modern serenity", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600", continent: "Asia" },
  { id: 3, title: "Machu Picchu", country: "Peru", district: "Cusco", city: "Aguas Calientes", place: "Mountain", time: "Morning", days: "3-5", rating: "4.9", price: 95000, tagline: "Lost city of the Inca Empire", image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=600", continent: "South America" },
  { id: 4, title: "Amalfi Coast", country: "Italy", district: "Campania", city: "Positano", place: "Coastal", time: "Evening", days: "5-7", rating: "4.8", price: 92000, tagline: "Cliffside villages draped in bougainvillea", image: "https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&w=600", continent: "Europe" },
  { id: 5, title: "Bali", country: "Indonesia", district: "Bali Province", city: "Ubud", place: "Forest", time: "Morning", days: "7-10", rating: "4.7", price: 45000, tagline: "Island of the Gods", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600", continent: "Asia" },
  { id: 6, title: "Patagonia", country: "Argentina", district: "Santa Cruz", city: "El Calafate", place: "Wilderness", time: "Afternoon", days: "10-14", rating: "4.9", price: 130000, tagline: "End of the world, beginning of wonder", image: "https://images.unsplash.com/photo-1531761535209-83bbc081d0a8?q=80&w=600", continent: "South America" },
  { id: 7, title: "Marrakech", country: "Morocco", district: "Souss-Massa", city: "Marrakech", place: "Desert", time: "Evening", days: "5-7", rating: "4.6", price: 58000, tagline: "A kaleidoscope of colors and spices", image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=600", continent: "Africa" },
  { id: 8, title: "Queenstown", country: "New Zealand", district: "Otago", city: "Queenstown", place: "Mountain", time: "Morning", days: "7-10", rating: "4.8", price: 115000, tagline: "Adventure capital of the world", image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=600", continent: "Oceania" },
  { id: 9, title: "Maldives", country: "Maldives", district: "Kaafu Atoll", city: "Malé", place: "Coastal", time: "Afternoon", days: "5-7", rating: "5.0", price: 145000, tagline: "Paradise found, reality left behind", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=600", continent: "Asia" },
  { id: 10, title: "Iceland", country: "Iceland", district: "Capital Region", city: "Reykjavik", place: "Wilderness", time: "Evening", days: "7-10", rating: "4.9", price: 120000, tagline: "Land of fire, ice, and northern lights", image: "https://images.unsplash.com/photo-1531956656798-56686eeef3d4?q=80&w=600", continent: "Europe" },
];

const continents = ["Asia", "Europe", "South America", "Africa", "Oceania"];
const countries = [...new Set(destinations.map(d => d.country))];
const placeTypes = [...new Set(destinations.map(d => d.place))];
const timings = [...new Set(destinations.map(d => d.time))];
const dayRanges = [...new Set(destinations.map(d => d.days))];

const CheckGroup = ({ label, icon: Icon, options, selected, onChange }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-5">
      <button onClick={() => setOpen(o => !o)} className="flex w-full items-center justify-between mb-3 group">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={13} className="text-amber-500" />}
          <span className="text-[10px] tracking-[2.5px] uppercase font-semibold text-gray-500">{label}</span>
        </div>
        <ChevronDown size={13} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
          {options.map(opt => {
            const checked = selected.includes(opt);
            return (
              <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                <span className={`h-4 w-4 rounded border flex items-center justify-center transition-all duration-200 shrink-0 ${checked ? 'bg-amber-500 border-amber-500' : 'border-gray-300 bg-white group-hover:border-amber-400'}`}
                  onClick={() => onChange(opt)}>
                  {checked && <svg width="8" height="7" viewBox="0 0 8 7" fill="none"><path d="M1 3.5L3 5.5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </span>
                <span className={`text-[11px] font-medium transition-colors ${checked ? 'text-amber-700' : 'text-gray-500 group-hover:text-gray-700'}`}>{opt}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

const DestinationCard = ({ dest, index }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-0.5 rounded-[20px] transition-all duration-500 ease-out h-full"
      style={{
        background: hovered
          ? 'linear-gradient(135deg, #f59e0b, #d97706, #fbbf24, #92400e, #f59e0b)'
          : 'linear-gradient(135deg, rgba(245,158,11,0.3), rgba(217,119,6,0.1), rgba(251,191,36,0.2))',
        boxShadow: hovered
          ? '0 10px 30px rgba(245,158,11,0.3)'
          : '0 4px 20px rgba(0,0,0,0.06)',
      }}
    >
      <div className="bg-[#fffdf7] rounded-[18px] overflow-hidden h-full flex flex-col">
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
          <img
            src={dest.image}
            alt={dest.title}
            className={`w-full h-full object-cover transition-transform duration-700 ${hovered ? 'scale-110' : 'scale-100'}`}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,10,0,0.7) 0%, transparent 60%)' }} />
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm text-[10px] font-bold text-gray-900">
            <Star size={10} className="fill-amber-500 text-amber-500" />
            {dest.rating}
          </div>
          <h3 className="absolute bottom-3 left-4 right-4 font-serif text-xl font-light text-white">
            {dest.title}
          </h3>
        </div>
        <div className="p-4 flex flex-col grow">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[9px] tracking-[2px] uppercase font-bold text-amber-600">{dest.country}</span>
          </div>
          <p className="font-serif italic text-[11px] text-gray-500 mb-4 grow line-clamp-2">"{dest.tagline}"</p>
          <div className="grid grid-cols-2 gap-y-2 mb-4">
             <span className="flex items-center gap-1.5 text-[10px] text-gray-400 uppercase tracking-wider">
               <Clock size={11} className="text-amber-500" /> {dest.time}
             </span>
             <span className="flex items-center gap-1.5 text-[10px] text-gray-400 uppercase tracking-wider">
               <Calendar size={11} className="text-amber-500" /> {dest.days} days
             </span>
          </div>
          <div className="pt-3 border-t border-amber-100 flex items-center justify-between">
            <div>
              <div className="text-[8px] uppercase tracking-widest text-gray-400">Starting at</div>
              <div className="font-serif text-lg text-gray-900">₹{dest.price.toLocaleString('en-IN')}</div>
            </div>
            <button className="h-9 w-9 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all">
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function WorldDestinationsExplorer() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Closed by default on mobile
  const [selectedContinents, setSelectedContinents] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [selectedTimings, setSelectedTimings] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 150000]);

  const toggle = (arr, setArr) => (val) => {
    setArr(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);
  };

  const activeFiltersCount = selectedContinents.length + selectedCountries.length + selectedPlaces.length + selectedTimings.length + selectedDays.length + (priceRange[0] > 0 || priceRange[1] < 150000 ? 1 : 0);

  const clearAll = () => {
    setSelectedContinents([]); setSelectedCountries([]); setSelectedPlaces([]);
    setSelectedTimings([]); setSelectedDays([]); setPriceRange([0, 150000]);
  };

  const filtered = useMemo(() => destinations.filter(d => {
    if (selectedContinents.length && !selectedContinents.includes(d.continent)) return false;
    if (selectedCountries.length && !selectedCountries.includes(d.country)) return false;
    if (selectedPlaces.length && !selectedPlaces.includes(d.place)) return false;
    if (selectedTimings.length && !selectedTimings.includes(d.time)) return false;
    if (selectedDays.length && !selectedDays.includes(d.days)) return false;
    if (d.price < priceRange[0] || d.price > priceRange[1]) return false;
    return true;
  }), [selectedContinents, selectedCountries, selectedPlaces, selectedTimings, selectedDays, priceRange]);

  return (
    <div className="min-h-screen bg-[#fefdf8] font-sans selection:bg-amber-100">
      {/* Header */}
      <header className="px-6 pt-12 pb-8 text-center max-w-4xl mx-auto">
        <Globe size={24} className="text-amber-500 mx-auto mb-4" />
        <h1 className="font-serif text-4xl md:text-6xl font-light text-gray-900 mb-3">
          World <span className="text-amber-600 italic">Escapes</span>
        </h1>
        <p className="text-gray-400 text-xs md:text-sm tracking-wide leading-relaxed">
          Premium hand-picked destinations for the modern traveler.
        </p>
      </header>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Toggle & Counter */}
          <div className="lg:hidden flex items-center justify-between sticky top-4 z-40 bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-amber-100 shadow-sm">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700"
            >
              <SlidersHorizontal size={16} /> Filters
              {activeFiltersCount > 0 && <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]">{activeFiltersCount}</span>}
            </button>
            <span className="text-[10px] text-gray-400 uppercase font-medium">{filtered.length} matches</span>
          </div>

          {/* Sidebar / Mobile Drawer */}
          <aside className={`
            fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity lg:relative lg:inset-auto lg:z-0 lg:bg-transparent lg:backdrop-blur-none
            ${sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible lg:visible lg:opacity-100'}
          `}>
            <div className={`
              absolute left-0 top-0 h-full w-[280px] bg-white p-6 shadow-2xl transition-transform lg:w-64 lg:p-0 lg:shadow-none lg:bg-transparent lg:sticky lg:top-8
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h2 className="font-bold text-gray-800">FILTERS</h2>
                <button onClick={() => setSidebarOpen(false)}><X size={20}/></button>
              </div>

              <div className="bg-white/50 lg:border lg:border-amber-100 rounded-3xl lg:p-6 overflow-y-auto max-h-[80vh] lg:max-h-none no-scrollbar">
                <div className="hidden lg:flex items-center justify-between mb-6">
                  <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Preferences</span>
                  {activeFiltersCount > 0 && <button onClick={clearAll} className="text-[10px] text-amber-600 font-bold">RESET</button>}
                </div>

                {/* Price Range Filter */}
                <div className="mb-8">
                  <label className="text-[10px] tracking-[2px] uppercase font-bold text-gray-400 block mb-4">Budget (INR)</label>
                  <div className="px-2">
                    <div className="flex justify-between text-[11px] font-bold text-amber-600 mb-4">
                      <span>₹{priceRange[0]/1000}k</span>
                      <span>₹{priceRange[1]/1000}k</span>
                    </div>
                    <div className="relative h-1 bg-amber-100 rounded-full">
                      <input type="range" min="0" max="150000" step="5000" value={priceRange[0]} 
                        onChange={e => setPriceRange([Math.min(+e.target.value, priceRange[1]-5000), priceRange[1]])}
                        className="absolute w-full h-1 appearance-none bg-transparent cursor-pointer pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500" />
                      <input type="range" min="0" max="150000" step="5000" value={priceRange[1]} 
                        onChange={e => setPriceRange([priceRange[0], Math.max(+e.target.value, priceRange[0]+5000)])}
                        className="absolute w-full h-1 appearance-none bg-transparent cursor-pointer pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-600" />
                    </div>
                  </div>
                </div>

                <CheckGroup label="Continents" options={continents} selected={selectedContinents} onChange={toggle(selectedContinents, setSelectedContinents)} />
                <CheckGroup label="Place Type" options={placeTypes} selected={selectedPlaces} onChange={toggle(selectedPlaces, setSelectedPlaces)} />
                <CheckGroup label="Duration" options={dayRanges} selected={selectedDays} onChange={toggle(selectedDays, setSelectedDays)} />
                
                {sidebarOpen && (
                  <button onClick={() => setSidebarOpen(false)} className="w-full py-4 mt-4 bg-amber-600 text-white rounded-xl font-bold lg:hidden">
                    Show {filtered.length} Results
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content Grid */}
          <main className="flex-1">
            <div className="hidden lg:flex items-center justify-between mb-8">
              <span className="text-sm text-gray-400 font-serif italic">Showing {filtered.length} curated destinations</span>
              <div className="flex gap-2">
                {activeFiltersCount > 0 && (
                  <button onClick={clearAll} className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    <X size={12}/> Clear All
                  </button>
                )}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-amber-200">
                <Compass size={48} className="mx-auto text-amber-200 mb-4 animate-pulse" />
                <h3 className="font-serif text-xl text-gray-800 mb-2">No matches found</h3>
                <p className="text-sm text-gray-400 mb-6">Try broadening your search criteria.</p>
                <button onClick={clearAll} className="text-amber-600 font-bold border-b border-amber-600 pb-1">Reset Filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {filtered.map((dest, i) => (
                  <DestinationCard key={dest.id} dest={dest} index={i} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}