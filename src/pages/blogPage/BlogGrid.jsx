import { useState } from "react";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const allPosts = [
  {
    category: "Adventure",
    readTime: "5 min read",
    title: "Top 5 Treks in Uttarakhand You Must Try",
    excerpt:
      "From Valley of Flowers to Kedarkantha — the most breathtaking trails waiting for you.",
    author: "Amit Rawat",
    date: "May 20, 2025",
    authorBg: GOLD,
  },
  {
    category: "Tips & Guides",
    readTime: "4 min read",
    title: "Best Season to Visit Nainital & Mussoorie",
    excerpt:
      "Month-by-month weather guide to help you plan the perfect hill station escape.",
    author: "Priya Negi",
    date: "Apr 10, 2025",
    authorBg: NAVY,
  },
  {
    category: "Pilgrimage",
    readTime: "6 min read",
    title: "Kedarnath: A Spiritual Journey to Remember",
    excerpt:
      "What to expect on the Kedarnath trek — the sights, the soul and the sacred temple.",
    author: "Rahul Sharma",
    date: "Mar 5, 2025",
    authorBg: GOLD,
  },
  {
    category: "Hill Stations",
    readTime: "3 min read",
    title: "Hidden Gems of Uttarakhand Nobody Talks About",
    excerpt:
      "Beyond Nainital — discover Munsiyari, Chakrata and Lansdowne.",
    author: "Sunita Bisht",
    date: "Feb 18, 2025",
    authorBg: NAVY,
  },
  {
    category: "Adventure",
    readTime: "7 min read",
    title: "River Rafting in Rishikesh: Everything You Need",
    excerpt:
      "Grade rapids, best operators, safety tips and what to wear for your rafting adventure.",
    author: "Amit Rawat",
    date: "Jan 22, 2025",
    authorBg: GOLD,
  },
  {
    category: "Tips & Guides",
    readTime: "5 min read",
    title: "Packing List for a 10-Day Uttarakhand Trip",
    excerpt:
      "Clothes, gear, medicines and documents — the ultimate checklist for your mountain trip.",
    author: "Priya Negi",
    date: "Jan 5, 2025",
    authorBg: NAVY,
  },
  {
    category: "Pilgrimage",
    readTime: "8 min read",
    title: "Badrinath Temple: History, Timings & Travel Tips",
    excerpt:
      "The sacred Char Dham shrine — everything you need to know before your visit.",
    author: "Rahul Sharma",
    date: "Dec 20, 2024",
    authorBg: GOLD,
  },
  {
    category: "Hill Stations",
    readTime: "4 min read",
    title: "Almora: The Quiet Gem of Kumaon Hills",
    excerpt:
      "A peaceful retreat with stunning Himalayan views — why Almora deserves more attention.",
    author: "Sunita Bisht",
    date: "Dec 5, 2024",
    authorBg: NAVY,
  },
  {
    category: "Adventure",
    readTime: "6 min read",
    title: "Camping Under the Stars in Chopta",
    excerpt:
      "India's mini Switzerland — the ultimate camping experience with panoramic Himalayan views.",
    author: "Amit Rawat",
    date: "Nov 18, 2024",
    authorBg: GOLD,
  },
];

const POSTS_PER_PAGE = 6;

const categoryColors = {
  Adventure: { bg: NAVY, color: GOLD },
  "Tips & Guides": { bg: GOLD, color: "#fff" },
  Pilgrimage: { bg: NAVY, color: GOLD },
  "Hill Stations": { bg: GOLD, color: "#fff" },
};

const imgBg = [GOLD, NAVY, GOLD, NAVY, GOLD, NAVY, GOLD, NAVY, GOLD];

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

  const handleFilter = () => setPage(1);

  return (
    <section className="w-full bg-[#FAFAF7] px-4 sm:px-8 md:px-16 lg:px-24 py-10 md:py-12">
      <div className="max-w-7xl mx-auto">
        {paginated.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            No posts found for this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginated.map((post, i) => {
              const catStyle =
                categoryColors[post.category] || { bg: NAVY, color: GOLD };
              return (
                <div
                  key={post.title}
                  className="bg-white rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
                  style={{ border: "0.5px solid #E5E0D5" }}
                >
                  {/* Image placeholder */}
                  <div
                    className="w-full h-36 flex items-center justify-center"
                    style={{ background: imgBg[i % imgBg.length] }}
                  >
                    <span
                      className="text-xs"
                      style={{
                        color:
                          imgBg[i % imgBg.length] === GOLD
                            ? "#F5E6C0"
                            : "#aab5cc",
                      }}
                    >
                      Blog Image
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-[9px] font-medium px-2 py-0.5 rounded"
                        style={{
                          background: catStyle.bg,
                          color: catStyle.color,
                        }}
                      >
                        {post.category}
                      </span>
                      <span className="text-[9px] text-gray-400">
                        {post.readTime}
                      </span>
                    </div>

                    <h3
                      className="text-sm font-semibold leading-snug mb-2"
                      style={{ color: NAVY }}
                    >
                      {post.title}
                    </h3>

                    <p className="text-xs text-gray-400 leading-relaxed mb-3">
                      {post.excerpt}
                    </p>

                    <div
                      className="w-full mb-3"
                      style={{ height: "0.5px", background: "#E5E0D5" }}
                    />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-5 h-5 rounded-full flex-shrink-0"
                          style={{ background: post.authorBg }}
                        />
                        <span className="text-[10px] text-gray-400">
                          {post.author} · {post.date}
                        </span>
                      </div>
                      <span
                        className="text-[10px] font-medium"
                        style={{ color: GOLD }}
                      >
                        Read →
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
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className="w-8 h-8 rounded text-xs font-medium transition-all"
                style={
                  page === p
                    ? { background: GOLD, color: "#fff" }
                    : {
                        background: "#fff",
                        border: "0.5px solid #E5E0D5",
                        color: "#888",
                      }
                }
              >
                {p}
              </button>
            ))}
            {page < totalPages && (
              <button
                onClick={() => setPage((p) => p + 1)}
                className="w-8 h-8 rounded text-xs font-medium transition-all"
                style={{
                  background: "#fff",
                  border: "0.5px solid #E5E0D5",
                  color: "#888",
                }}
              >
                →
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}