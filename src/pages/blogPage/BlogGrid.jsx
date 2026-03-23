import { useState } from "react";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const allPosts = [
  {
    category: "Adventure",
    readTime: "5 min read",
    title: "Top 5 Treks in Uttarakhand You Must Try",
    excerpt: "From Valley of Flowers to Kedarkantha — the most breathtaking trails waiting for you.",
    author: "Amit Rawat",
    date: "May 20, 2025",
    image: "https://th.bing.com/th/id/OIP.Bmi0xHHApRMsDElvGGT0xgHaEc?w=241&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
  },
  {
    category: "Tips & Guides",
    readTime: "4 min read",
    title: "Best Season to Visit Nainital & Mussoorie",
    excerpt: "Month-by-month weather guide to help you plan the perfect hill station escape.",
    author: "Priya Negi",
    date: "Apr 10, 2025",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop"
  },
  {
    category: "Pilgrimage",
    readTime: "6 min read",
    title: "Kedarnath: A Spiritual Journey to Remember",
    excerpt: "What to expect on the Kedarnath trek — the sights, the soul and the sacred temple.",
    author: "Rahul Sharma",
    date: "Mar 5, 2025",
    image: "https://images.unsplash.com/photo-1624314138470-5a2f24623f10?q=80&w=800&auto=format&fit=crop"
  },
  {
    category: "Hill Stations",
    readTime: "3 min read",
    title: "Hidden Gems of Uttarakhand Nobody Talks About",
    excerpt: "Beyond Nainital — discover Munsiyari, Chakrata and Lansdowne.",
    author: "Sunita Bisht",
    date: "Feb 18, 2025",
    image: "data:image/webp;base64,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"
  },
  {
    category: "Adventure",
    readTime: "7 min read",
    title: "River Rafting in Rishikesh: Everything You Need",
    excerpt: "Grade rapids, best operators, safety tips and what to wear for your rafting adventure.",
    author: "Amit Rawat",
    date: "Jan 22, 2025",
    image: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?q=80&w=800&auto=format&fit=crop"
  },
  {
    category: "Tips & Guides",
    readTime: "5 min read",
    title: "Packing List for a 10-Day Uttarakhand Trip",
    excerpt: "Clothes, gear, medicines and documents — the ultimate checklist for your mountain trip.",
    author: "Priya Negi",
    date: "Jan 5, 2025",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop"
  },
  {
    category: "Pilgrimage",
    readTime: "8 min read",
    title: "Badrinath Temple: History, Timings & Travel Tips",
    excerpt: "The sacred Char Dham shrine — everything you need to know before your visit.",
    author: "Rahul Sharma",
    date: "Dec 20, 2024",
    image: "https://images.unsplash.com/photo-1621530277322-87063167be68?q=80&w=800&auto=format&fit=crop"
  },
  {
    category: "Hill Stations",
    readTime: "4 min read",
    title: "Almora: The Quiet Gem of Kumaon Hills",
    excerpt: "A peaceful retreat with stunning Himalayan views — why Almora deserves more attention.",
    author: "Sunita Bisht",
    date: "Dec 5, 2024",
    image: "https://images.unsplash.com/photo-1620188461153-0669865cc65a?q=80&w=800&auto=format&fit=crop"
  },
  {
    category: "Adventure",
    readTime: "6 min read",
    title: "Camping Under the Stars in Chopta",
    excerpt: "India's mini Switzerland — the ultimate camping experience with panoramic Himalayan views.",
    author: "Amit Rawat",
    date: "Nov 18, 2024",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=800&auto=format&fit=crop"
  },
];

const POSTS_PER_PAGE = 6;

const categoryColors = {
  Adventure: { bg: NAVY, color: GOLD },
  "Tips & Guides": { bg: GOLD, color: "#fff" },
  Pilgrimage: { bg: NAVY, color: GOLD },
  "Hill Stations": { bg: GOLD, color: "#fff" },
};

export default function BlogGrid({ activeFilter }) {
  const [page, setPage] = useState(1);

  const filtered =
    activeFilter === "All"
      ? allPosts
      : allPosts.filter((p) => p.category === activeFilter);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  return (
    <section className="w-full bg-[#FAFAF7] px-4 sm:px-8 md:px-16 lg:px-24 py-12">
      <div className="max-w-7xl mx-auto">
        {paginated.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-sm italic font-medium">
            No posts found for this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginated.map((post) => {
              const catStyle = categoryColors[post.category] || { bg: NAVY, color: GOLD };
              return (
                <div
                  key={post.title}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative h-52 w-full overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                    
                    {/* Floating Category Badge */}
                    <span
                      className="absolute bottom-4 left-4 text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                      style={{ background: catStyle.bg, color: catStyle.color }}
                    >
                      {post.category}
                    </span>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        {post.readTime}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium italic">
                        {post.date}
                      </span>
                    </div>

                    <h3
                      className="text-lg font-bold leading-tight mb-3 group-hover:text-[#C9A84C] transition-colors duration-300"
                      style={{ color: NAVY, fontFamily: "sans-serif" }}
                    >
                      {post.title}
                    </h3>

                    <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-inner"
                          style={{ background: post.category === "Adventure" ? GOLD : NAVY }}
                        >
                          {post.author.charAt(0)}
                        </div>
                        <span className="text-[11px] font-bold text-gray-600">
                          {post.author}
                        </span>
                      </div>
                      <span
                        className="text-[11px] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                        style={{ color: GOLD }}
                      >
                        Read Post →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-12">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className="w-10 h-10 rounded-full text-xs font-bold transition-all flex items-center justify-center shadow-sm"
                style={
                  page === p
                    ? { background: GOLD, color: "#fff", transform: "scale(1.1)" }
                    : { background: "#fff", border: "1px solid #E5E0D5", color: NAVY }
                }
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}