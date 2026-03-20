import React, { useState } from 'react';
import {
  MapPin, Star, Clock, Calendar, Globe, ArrowLeft, Heart,
  Share2, ChevronRight, Wind, Thermometer, Droplets,
  Camera, Utensils, Mountain, Waves, Users, ShieldCheck,
  ArrowRight, Check, X
} from 'lucide-react';

const destination = {
  title: "Santorini",
  country: "Greece",
  district: "South Aegean",
  city: "Oia",
  continent: "Europe",
  rating: "4.9",
  reviews: 2847,
  price: 85000,
  days: "5-7",
  bestTime: "April – October",
  tagline: "Where sunsets are a religion",
  description:
    "Perched on the rim of an ancient volcanic caldera, Santorini is a dreamscape of whitewashed villages, azure-domed churches, and cliff-edge infinity pools overlooking the deep cobalt Aegean Sea. Every evening, the sky over Oia transforms into a canvas of amber, rose, and violet — a ritual that draws visitors from across the world.",
  highlights: [
    "Caldera views from Oia village",
    "Black sand beaches of Perissa",
    "Akrotiri prehistoric ruins",
    "Local wine tasting at Santo Wines",
    "Fira to Oia scenic hike",
    "Sunset boat cruise",
  ],
  weather: { temp: "24°C", wind: "14 km/h", humidity: "62%" },
  images: [
    "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200",
    "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=600",
    "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=600",
    "https://images.unsplash.com/photo-1561314081-da21a1e0e2ba?q=80&w=600",
    "https://images.unsplash.com/photo-1507501336603-6e31db2be093?q=80&w=600",
  ],
  itinerary: [
    { day: 1, title: "Arrival & Fira Exploration", desc: "Check in to your clifftop hotel, explore Fira's boutiques and tavernas, enjoy dinner with caldera views." },
    { day: 2, title: "Oia Village & Sunset", desc: "Wander the iconic blue-domed lanes of Oia, photograph the famous windmills, and witness the legendary sunset." },
    { day: 3, title: "Akrotiri & Black Beach", desc: "Morning at the prehistoric ruins of Akrotiri, afternoon on the volcanic black sands of Perissa." },
    { day: 4, title: "Caldera Boat Cruise", desc: "Full-day cruise to the volcanic islands, hot springs, Red Beach, and a farewell dinner in Ammoudi Bay." },
    { day: 5, title: "Wine & Departure", desc: "Morning wine tasting at Santo Wines with panoramic views, then transfer to Santorini airport." },
  ],
  packages: [
    { name: "Essential", price: 85000, features: ["5 Nights Hotel", "Airport Transfers", "Breakfast Daily", "City Tour"] },
    { name: "Luxury", price: 135000, features: ["7 Nights Clifftop Suite", "Private Transfers", "All Meals", "Boat Cruise", "Wine Tasting"], popular: true },
    { name: "Ultra", price: 195000, features: ["7 Nights Infinity Pool Villa", "Private Yacht", "Chef's Table", "Spa Access", "Butler Service"] },
  ],
  reviews_list: [
    { name: "Priya Sharma", avatar: "PS", rating: 5, comment: "Absolutely magical. The sunset from Oia is something I will never forget. Every detail was perfect.", date: "Jan 2025" },
    { name: "Rahul Mehta", avatar: "RM", rating: 5, comment: "The clifftop suite was breathtaking. Waking up to caldera views every morning felt surreal.", date: "Dec 2024" },
    { name: "Ananya Kapoor", avatar: "AK", rating: 4, comment: "Beautiful destination but quite crowded in peak season. Book early and opt for shoulder season.", date: "Nov 2024" },
  ],
};

const Gallery = ({ images }) => {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="relative w-full overflow-hidden rounded-2xl mb-3" style={{ height: 420 }}>
        <img src={images[active]} alt="destination" className="w-full h-full object-cover transition-all duration-700" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,5,0,0.6) 0%, transparent 50%)' }} />
        <div className="absolute bottom-5 left-6 text-white">
          <div className="flex items-center gap-2 text-xs mb-1" style={{ letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.75 }}>
            <MapPin size={11} /> {destination.city}, {destination.country}
          </div>
          <h1 className="font-serif text-5xl font-light">{destination.title}</h1>
        </div>
        <div className="absolute top-5 right-5 flex gap-2">
          <button className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-all">
            <Heart size={16} />
          </button>
          <button className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-all">
            <Share2 size={16} />
          </button>
        </div>
        <div className="absolute top-5 left-5">
          <button className="flex items-center gap-1.5 text-white text-xs bg-black/30 backdrop-blur-md px-4 py-2 rounded-full hover:bg-black/40 transition-all">
            <ArrowLeft size={13} /> Back
          </button>
        </div>
        <div className="absolute bottom-5 right-5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs">
          <Camera size={11} className="inline mr-1" />{active + 1} / {images.length}
        </div>
      </div>
      <div className="flex gap-2">
        {images.map((img, i) => (
          <button key={i} onClick={() => setActive(i)}
            className="flex-1 rounded-xl overflow-hidden transition-all duration-300"
            style={{ height: 70, border: i === active ? '2.5px solid #f59e0b' : '2.5px solid transparent', opacity: i === active ? 1 : 0.6 }}>
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

const StatPill = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl" style={{ background: '#fef3c7', border: '1px solid rgba(245,158,11,0.2)' }}>
    <Icon size={15} className="text-amber-500" />
    <div>
      <div className="text-amber-800 font-semibold text-sm">{value}</div>
      <div className="text-amber-600 text-[10px] uppercase tracking-wider">{label}</div>
    </div>
  </div>
);

const PackageCard = ({ pkg }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="relative p-0.5 rounded-2xl transition-all duration-500"
      style={{
        background: pkg.popular
          ? 'linear-gradient(135deg, #f59e0b, #d97706, #fbbf24)'
          : hovered
          ? 'linear-gradient(135deg, rgba(245,158,11,0.5), rgba(217,119,6,0.3))'
          : 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(217,119,6,0.05))',
        boxShadow: pkg.popular ? '0 8px 30px rgba(245,158,11,0.35)' : hovered ? '0 4px 20px rgba(245,158,11,0.2)' : 'none',
      }}>
      {pkg.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[9px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full shadow-lg">
          Most Popular
        </div>
      )}
      <div className="bg-[#fffdf7] rounded-[14px] p-5 h-full">
        <div className="font-serif text-xl text-gray-800 mb-1">{pkg.name}</div>
        <div className="text-[10px] text-amber-600 uppercase tracking-widest mb-4">Package</div>
        <div className="font-serif text-3xl text-gray-900 mb-5">₹{pkg.price.toLocaleString('en-IN')}<span className="text-sm text-gray-400 font-sans">/person</span></div>
        <div className="space-y-2.5 mb-6">
          {pkg.features.map((f, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm text-gray-600">
              <Check size={13} className="text-amber-500 shrink-0" />
              {f}
            </div>
          ))}
        </div>
        <button className="w-full py-3 rounded-xl text-xs font-medium uppercase tracking-widest transition-all duration-300"
          style={pkg.popular
            ? { background: 'linear-gradient(to right, #f59e0b, #b45309)', color: '#fff', boxShadow: '0 4px 15px rgba(245,158,11,0.4)' }
            : { background: 'transparent', border: '1.5px solid rgba(245,158,11,0.4)', color: '#b45309' }}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default function DestinationDetailPage() {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <div style={{ background: 'linear-gradient(160deg, #fefdf8 0%, #fffbef 60%, #fef9f0 100%)', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* GALLERY */}
        <Gallery images={destination.images} />

        {/* QUICK STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 mb-10">
          <StatPill icon={Star} label="Rating" value={`${destination.rating} (${destination.reviews.toLocaleString()})`} />
          <StatPill icon={Calendar} label="Duration" value={`${destination.days} Days`} />
          <StatPill icon={Clock} label="Best Time" value={destination.bestTime} />
          <StatPill icon={Globe} label="Continent" value={destination.continent} />
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-12">

            {/* ABOUT */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-amber-500" />
                <span className="text-[10px] tracking-[3px] uppercase font-semibold text-amber-600">About</span>
              </div>
              <h2 className="font-serif text-3xl font-light text-gray-900 mb-3 italic">"{destination.tagline}"</h2>
              <p className="text-gray-500 leading-relaxed text-sm">{destination.description}</p>
            </section>

            {/* HIGHLIGHTS */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-amber-500" />
                <span className="text-[10px] tracking-[3px] uppercase font-semibold text-amber-600">Highlights</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destination.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl" style={{ background: '#fffbef', border: '1px solid rgba(245,158,11,0.15)' }}>
                    <div className="h-5 w-5 rounded-full bg-amber-500/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={11} className="text-amber-600" />
                    </div>
                    <span className="text-sm text-gray-600">{h}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* WEATHER */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-amber-500" />
                <span className="text-[10px] tracking-[3px] uppercase font-semibold text-amber-600">Weather</span>
              </div>
              <div className="flex gap-4">
                {[
                  { icon: Thermometer, label: "Avg Temp", value: destination.weather.temp },
                  { icon: Wind, label: "Wind", value: destination.weather.wind },
                  { icon: Droplets, label: "Humidity", value: destination.weather.humidity },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex-1 flex flex-col items-center justify-center py-5 rounded-2xl text-center gap-2"
                    style={{ background: '#fffbef', border: '1px solid rgba(245,158,11,0.15)' }}>
                    <Icon size={20} className="text-amber-500" />
                    <div className="font-serif text-2xl text-gray-800">{value}</div>
                    <div className="text-[10px] uppercase tracking-wider text-amber-600">{label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* ITINERARY */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-amber-500" />
                <span className="text-[10px] tracking-[3px] uppercase font-semibold text-amber-600">Itinerary</span>
              </div>
              <div className="flex gap-2 mb-5 flex-wrap">
                {destination.itinerary.map((item, i) => (
                  <button key={i} onClick={() => setActiveDay(i)}
                    className="text-[10px] uppercase tracking-wider px-4 py-2 rounded-full font-semibold transition-all duration-200"
                    style={activeDay === i
                      ? { background: 'linear-gradient(to right, #f59e0b, #b45309)', color: '#fff', boxShadow: '0 4px 12px rgba(245,158,11,0.35)' }
                      : { background: 'rgba(245,158,11,0.08)', color: '#92400e', border: '1px solid rgba(245,158,11,0.2)' }}>
                    Day {item.day}
                  </button>
                ))}
              </div>
              <div className="p-5 rounded-2xl" style={{ background: '#fffbef', border: '1px solid rgba(245,158,11,0.2)' }}>
                <div className="font-serif text-xl text-gray-800 mb-2">{destination.itinerary[activeDay].title}</div>
                <div className="text-sm text-gray-500 leading-relaxed">{destination.itinerary[activeDay].desc}</div>
              </div>
              <div className="mt-4 space-y-2">
                {destination.itinerary.map((item, i) => (
                  <button key={i} onClick={() => setActiveDay(i)}
                    className="w-full flex items-center gap-4 p-3.5 rounded-xl text-left transition-all duration-200"
                    style={activeDay === i
                      ? { background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)' }
                      : { background: 'transparent', border: '1px solid transparent' }}>
                    <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={activeDay === i
                        ? { background: 'linear-gradient(to br, #f59e0b, #b45309)', color: '#fff' }
                        : { background: 'rgba(245,158,11,0.1)', color: '#b45309' }}>
                      {item.day}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700">{item.title}</div>
                      <div className="text-xs text-gray-400 line-clamp-1">{item.desc}</div>
                    </div>
                    <ChevronRight size={14} className="ml-auto text-amber-400" />
                  </button>
                ))}
              </div>
            </section>

            {/* REVIEWS */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-amber-500" />
                <span className="text-[10px] tracking-[3px] uppercase font-semibold text-amber-600">Reviews</span>
              </div>
              <div className="space-y-4">
                {destination.reviews_list.map((r, i) => (
                  <div key={i} className="p-5 rounded-2xl" style={{ background: '#fffbef', border: '1px solid rgba(245,158,11,0.15)' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-9 w-9 rounded-full bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-700">
                        {r.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-700">{r.name}</div>
                        <div className="text-[10px] text-gray-400">{r.date}</div>
                      </div>
                      <div className="ml-auto flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} size={11} className={j < r.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-200 fill-gray-200'} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">"{r.comment}"</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">
            {/* Sticky booking card */}
            <div className="sticky top-6">
              <div className="p-6 rounded-2xl mb-6" style={{ background: '#fffdf7', border: '1px solid rgba(245,158,11,0.2)', boxShadow: '0 8px 40px rgba(245,158,11,0.1)' }}>
                <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Starts from</div>
                <div className="font-serif text-4xl text-gray-900 mb-1">₹{destination.price.toLocaleString('en-IN')}</div>
                <div className="text-xs text-gray-400 mb-5">per person · {destination.days} days</div>
                <div className="space-y-3 mb-5">
                  {[
                    { icon: Users, text: "Group & Private tours available" },
                    { icon: ShieldCheck, text: "Fully insured & licensed" },
                    { icon: Mountain, text: "Expert local guides" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2.5 text-xs text-gray-500">
                      <Icon size={13} className="text-amber-500 shrink-0" />
                      {text}
                    </div>
                  ))}
                </div>
                <button className="w-full py-4 rounded-xl text-sm font-medium uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl mb-3"
                  style={{ background: 'linear-gradient(to right, #f59e0b, #b45309)', boxShadow: '0 6px 20px rgba(245,158,11,0.4)' }}>
                  Book This Package
                </button>
                <button className="w-full py-3.5 rounded-xl text-sm font-medium uppercase tracking-widest text-amber-700 transition-all duration-200 hover:bg-amber-50"
                  style={{ border: '1.5px solid rgba(245,158,11,0.35)' }}>
                  Request Custom Trip
                </button>
              </div>

              {/* Quick facts */}
              <div className="p-5 rounded-2xl" style={{ background: '#fffdf7', border: '1px solid rgba(245,158,11,0.15)' }}>
                <div className="text-[10px] tracking-[3px] uppercase font-semibold text-amber-600 mb-4">Quick Facts</div>
                {[
                  { label: "Destination", value: `${destination.city}, ${destination.country}` },
                  { label: "Continent", value: destination.continent },
                  { label: "Duration", value: `${destination.days} days` },
                  { label: "Best Season", value: destination.bestTime },
                  { label: "Category", value: "Coastal Escape" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between py-2.5" style={{ borderBottom: '1px solid rgba(245,158,11,0.1)' }}>
                    <span className="text-xs text-gray-400">{label}</span>
                    <span className="text-xs font-medium text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PACKAGES */}
        <section className="mt-16">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #f59e0b)' }} />
              <span className="text-[10px] tracking-[3px] uppercase font-semibold text-amber-600">Choose Your</span>
              <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, #f59e0b)' }} />
            </div>
            <h2 className="font-serif text-4xl font-light text-gray-900">Travel <span className="text-amber-600 italic">Packages</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {destination.packages.map((pkg, i) => <PackageCard key={i} pkg={pkg} />)}
          </div>
        </section>

        {/* CTA BANNER */}
        <div className="mt-16 rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #92400e 0%, #b45309 40%, #d97706 80%, #f59e0b 100%)' }}>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-10 py-10">
            <div>
              <div className="text-amber-200 text-xs uppercase tracking-widest mb-2">Ready to explore?</div>
              <h3 className="font-serif text-3xl font-light text-white">Start your <span className="italic">Santorini</span> journey</h3>
              <p className="text-amber-100 text-sm mt-1 opacity-80">Our travel experts are ready to craft your perfect escape.</p>
            </div>
            <button className="shrink-0 bg-white text-amber-800 text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5 flex items-center gap-2">
              Talk to an Expert <ArrowRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}