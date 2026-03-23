import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DestinationFilters from "./DestinationFilters";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const destinations = [
  {
    id: 1,
    name: "Kedarnath Temple",
    category: "Pilgrimage",
    region: "Garhwal",
    rating: "4.9",
    altitude: "3,583m",
    bestTime: "May–Jun",
    trek: "16 km",
    description:
      "One of the 12 Jyotirlingas, nestled at 3,583m in the Garhwal Himalayas. A pilgrimage that transforms the soul.",
    featured: true,
    imgBg: NAVY,
  },
  {
    id: 2,
    name: "Nainital",
    category: "Hill Stations",
    region: "Kumaon",
    rating: "4.7",
    altitude: "2,084m",
    bestTime: "Mar–Jun",
    trek: null,
    description:
      "The lake city of Uttarakhand — perfect for boating, cable car rides & peaceful mall road walks.",
    featured: false,
    imgBg: GOLD,
  },
  {
    id: 3,
    name: "Rishikesh",
    category: "Adventure",
    region: "Garhwal",
    rating: "4.8",
    altitude: "372m",
    bestTime: "Oct–Mar",
    trek: null,
    description:
      "Yoga capital of the world — river rafting, bungee jumping & the iconic Laxman Jhula awaits.",
    featured: false,
    imgBg: NAVY,
  },
  {
    id: 4,
    name: "Mussoorie",
    category: "Hill Stations",
    region: "Garhwal",
    rating: "4.6",
    altitude: "2,005m",
    bestTime: "Apr–Jun",
    trek: null,
    description:
      "Queen of Hills — stunning Himalayan views, Kempty Falls & Lal Tibba viewpoint.",
    featured: false,
    imgBg: GOLD,
  },
  {
    id: 5,
    name: "Valley of Flowers",
    category: "Adventure",
    region: "Chamoli",
    rating: "4.9",
    altitude: "3,658m",
    bestTime: "Jul–Aug",
    trek: "17 km",
    description:
      "UNESCO World Heritage site — a paradise of 300+ Himalayan wildflowers blooming each monsoon.",
    featured: false,
    imgBg: NAVY,
  },
  {
    id: 6,
    name: "Jim Corbett",
    category: "Wildlife",
    region: "Nainital",
    rating: "4.8",
    altitude: "400m",
    bestTime: "Nov–Jun",
    trek: null,
    description:
      "India's oldest national park — home to Bengal tigers, leopards and 600+ bird species.",
    featured: false,
    imgBg: GOLD,
  },
  {
    id: 7,
    name: "Badrinath",
    category: "Pilgrimage",
    region: "Chamoli",
    rating: "4.9",
    altitude: "3,133m",
    bestTime: "May–Jun",
    trek: null,
    description:
      "Sacred Char Dham shrine at 3,133m — Lord Vishnu's holy abode surrounded by snow peaks.",
    featured: false,
    imgBg: NAVY,
  },
  {
    id: 8,
    name: "Gangotri",
    category: "Pilgrimage",
    region: "Uttarkashi",
    rating: "4.8",
    altitude: "3,415m",
    bestTime: "May–Jun",
    trek: "19 km",
    description:
      "Origin of the sacred Ganges river — a spiritual journey to the source of life itself.",
    featured: false,
    imgBg: GOLD,
  },
  {
    id: 9,
    name: "Auli",
    category: "Adventure",
    region: "Chamoli",
    rating: "4.7",
    altitude: "2,519m",
    bestTime: "Dec–Mar",
    trek: "8 km",
    description:
      "India's premier ski destination — breathtaking slopes with panoramic views of Nanda Devi.",
    featured: false,
    imgBg: NAVY,
  },
  {
    id: 10,
    name: "Almora",
    category: "Hill Stations",
    region: "Kumaon",
    rating: "4.5",
    altitude: "1,638m",
    bestTime: "Mar–Jun",
    trek: null,
    description:
      "Quiet gem of Kumaon hills — rich cultural heritage, Kasar Devi temple & 360° Himalayan views.",
    featured: false,
    imgBg: GOLD,
  },
  {
    id: 11,
    name: "Rajaji National Park",
    category: "Wildlife",
    region: "Haridwar",
    rating: "4.4",
    altitude: "302m",
    bestTime: "Nov–Jun",
    trek: null,
    description:
      "Home to wild elephants, tigers and 400+ bird species — a paradise for wildlife lovers.",
    featured: false,
    imgBg: NAVY,
  },
  {
    id: 12,
    name: "Yamunotri",
    category: "Pilgrimage",
    region: "Uttarkashi",
    rating: "4.7",
    altitude: "3,293m",
    bestTime: "May–Jun",
    trek: "13 km",
    description:
      "The first stop of Char Dham Yatra — source of the Yamuna river nestled in pristine Himalayas.",
    featured: false,
    imgBg: GOLD,
  },
];

const ITEMS_PER_PAGE = 6;

const categoryBadge = {
  Pilgrimage: { bg: GOLD, color: "#fff" },
  Adventure: { bg: GOLD, color: "#fff" },
  "Hill Stations": { bg: NAVY, color: GOLD },
  Wildlife: { bg: NAVY, color: GOLD },
};

export default function DestinationGrid({ searchQuery }) {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Popular");
  const [viewMode, setViewMode] = useState("grid");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filtered = destinations
    .filter((d) => {
      const matchCat =
        activeCategory === "All" || d.category === activeCategory;
      const matchSearch =
        !searchQuery ||
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "Rating: High to Low")
        return parseFloat(b.rating) - parseFloat(a.rating);
      if (sortBy === "A to Z") return a.name.localeCompare(b.name);
      return b.featured - a.featured;
    });

  const featured = filtered.find((d) => d.featured);
  const rest = filtered.filter((d) => !d.featured);
  const visibleRest = rest.slice(0, visibleCount);
  const hasMore = visibleCount < rest.length;

  return (
    <section className="w-full bg-[#FAFAF7] px-4 sm:px-8 md:px-16 lg:px-24 py-10 md:py-14">
      <div className="max-w-7xl mx-auto">
        <DestinationFilters
          activeCategory={activeCategory}
          setActiveCategory={(cat) => {
            setActiveCategory(cat);
            setVisibleCount(ITEMS_PER_PAGE);
          }}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          totalResults={filtered.length}
        />

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-sm mb-3">
              No destinations found for "{searchQuery}"
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="text-xs font-medium px-5 py-2.5 rounded text-white"
              style={{ background: GOLD }}
            >
              Ask Our Experts
            </button>
          </div>
        ) : (
          <>
            {/* Featured wide card */}
            {featured && (
              <div
                className="bg-white rounded-xl overflow-hidden mb-5 grid grid-cols-1 md:grid-cols-2"
                style={{ border: "0.5px solid #E5E0D5" }}
              >
                <div
                  className="min-h-[200px] md:min-h-[240px] flex flex-col items-center justify-center gap-2 relative p-8"
                  style={{ background: featured.imgBg }}
                >
                  <span className="text-xs" style={{ color: "#aab5cc" }}>
                    Destination Image
                  </span>
                  <span className="text-sm font-medium" style={{ color: GOLD }}>
                    {featured.name}
                  </span>
                  <div
                    className="absolute top-3 left-3 text-[9px] font-medium px-2 py-0.5 rounded"
                    style={{ background: GOLD, color: "#fff" }}
                  >
                    ⭐ Featured
                  </div>
                  <div
                    className="absolute top-3 right-3 text-[9px] px-2 py-0.5 rounded"
                    style={{ background: "rgba(0,0,0,0.4)", color: "#fff" }}
                  >
                    ★ {featured.rating}
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex gap-2 mb-3 flex-wrap">
                    <span
                      className="text-[9px] font-medium px-2 py-0.5 rounded"
                      style={categoryBadge[featured.category]}
                    >
                      {featured.category}
                    </span>
                    <span
                      className="text-[9px] px-2 py-0.5 rounded"
                      style={{
                        background: "#FAFAF7",
                        color: "#888",
                        border: "0.5px solid #E5E0D5",
                      }}
                    >
                      {featured.region}
                    </span>
                  </div>
                  <h2
                    className="text-xl font-semibold mb-2"
                    style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
                  >
                    {featured.name}
                  </h2>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    {featured.description}
                  </p>
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { label: "Altitude", val: featured.altitude },
                      { label: "Best Time", val: featured.bestTime },
                      { label: "Trek", val: featured.trek || "N/A" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="rounded-lg p-2 text-center"
                        style={{ background: "#FAFAF7" }}
                      >
                        <p className="text-[9px] text-gray-400">{s.label}</p>
                        <p
                          className="text-xs font-semibold mt-0.5"
                          style={{ color: NAVY }}
                        >
                          {s.val}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    <button
                      className="text-xs font-medium px-4 py-2 rounded text-white transition-opacity hover:opacity-90"
                      style={{ background: GOLD }}
                    >
                      View Details →
                    </button>
                    <button
                      onClick={() => navigate("/packages")}
                      className="text-xs font-medium px-4 py-2 rounded transition-colors hover:bg-gray-50"
                      style={{
                        border: `0.5px solid ${NAVY}`,
                        color: NAVY,
                      }}
                    >
                      Book Package
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Grid / List view */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {visibleRest.map((d) => (
                  <GridCard key={d.id} dest={d} navigate={navigate} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {visibleRest.map((d) => (
                  <ListCard key={d.id} dest={d} navigate={navigate} />
                ))}
              </div>
            )}

            {/* Load more */}
            {hasMore && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setVisibleCount((v) => v + ITEMS_PER_PAGE)}
                  className="text-sm font-medium px-8 py-3 rounded transition-colors hover:bg-amber-50"
                  style={{ border: `1px solid ${GOLD}`, color: GOLD }}
                >
                  Load More Destinations
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function GridCard({ dest, navigate }) {
  const badge = categoryBadge[dest.category] || {
    bg: GOLD,
    color: "#fff",
  };
  return (
    <div
      className="bg-white rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 cursor-default"
      style={{ border: "0.5px solid #E5E0D5" }}
    >
      <div
        className="w-full h-36 flex items-center justify-center relative"
        style={{ background: dest.imgBg }}
      >
        <span
          className="text-xs"
          style={{ color: dest.imgBg === GOLD ? "#F5E6C0" : "#aab5cc" }}
        >
          {dest.name}
        </span>
        <div
          className="absolute top-2 right-2 text-[9px] px-1.5 py-0.5 rounded"
          style={{ background: "rgba(0,0,0,0.4)", color: "#fff" }}
        >
          ★ {dest.rating}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-[9px] font-medium px-2 py-0.5 rounded"
            style={badge}
          >
            {dest.category}
          </span>
          <span className="text-[9px] text-gray-400">{dest.region}</span>
        </div>
        <h3
          className="text-sm font-semibold mb-1.5"
          style={{ color: NAVY }}
        >
          {dest.name}
        </h3>
        <p className="text-xs text-gray-400 leading-relaxed mb-3 line-clamp-2">
          {dest.description}
        </p>
        <div
          className="w-full mb-3"
          style={{ height: "0.5px", background: "#E5E0D5" }}
        />
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-400">
            Best: {dest.bestTime}
          </span>
          <button
            className="text-[10px] font-medium transition-opacity hover:opacity-70"
            style={{ color: GOLD }}
            onClick={() => navigate("/packages")}
          >
            Explore →
          </button>
        </div>
      </div>
    </div>
  );
}

function ListCard({ dest, navigate }) {
  const badge = categoryBadge[dest.category] || { bg: GOLD, color: "#fff" };
  return (
    <div
      className="bg-white rounded-xl overflow-hidden grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr] transition-transform duration-200 hover:-translate-y-0.5"
      style={{ border: "0.5px solid #E5E0D5" }}
    >
      <div
        className="flex items-center justify-center relative"
        style={{ background: dest.imgBg, minHeight: "100px" }}
      >
        <span
          className="text-[10px] text-center px-2"
          style={{ color: dest.imgBg === GOLD ? "#F5E6C0" : "#aab5cc" }}
        >
          {dest.name}
        </span>
        <div
          className="absolute top-2 right-2 text-[9px] px-1.5 py-0.5 rounded"
          style={{ background: "rgba(0,0,0,0.4)", color: "#fff" }}
        >
          ★ {dest.rating}
        </div>
      </div>
      <div className="p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="text-[9px] font-medium px-2 py-0.5 rounded"
              style={badge}
            >
              {dest.category}
            </span>
            <span className="text-[9px] text-gray-400">{dest.region}</span>
          </div>
          <h3 className="text-sm font-semibold mb-1" style={{ color: NAVY }}>
            {dest.name}
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
            {dest.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-3">
            <span className="text-[10px] text-gray-400">
              Alt: {dest.altitude}
            </span>
            <span className="text-[10px] text-gray-400">
              Best: {dest.bestTime}
            </span>
            {dest.trek && (
              <span className="text-[10px] text-gray-400">
                Trek: {dest.trek}
              </span>
            )}
          </div>
          <button
            className="text-[10px] font-medium"
            style={{ color: GOLD }}
            onClick={() => navigate("/packages")}
          >
            Explore →
          </button>
        </div>
      </div>
    </div>
  );
}
