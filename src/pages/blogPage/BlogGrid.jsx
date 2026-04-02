import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { getAllPosts } from "../../services/post.service";

/* ================= THEME CONSTANTS ================= */
const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const categoryColors = {
  Adventure: { bg: NAVY, color: GOLD },
  "Tips & Guides": { bg: GOLD, color: "#fff" },
  Pilgrimage: { bg: NAVY, color: GOLD },
  "Hill Stations": { bg: GOLD, color: "#fff" },
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts({ page: 1, limit: 9 });
        setPosts(data.posts || data);
      } catch (err) {
        setError(err.msg || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-75">
        <div className="animate-pulse text-gray-400 font-medium tracking-widest uppercase text-[10px]">
          Loading...
        </div>
      </div>
    );
  }

  if (error) return <div className="p-8 text-center text-red-500 text-sm">{error}</div>;

  return (
    <section className="w-full bg-[#FAFAF7] px-4 py-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header - More Compact */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2" style={{ color: NAVY }}>Latest Stories</h2>
          <div className="w-12 h-1 mx-auto" style={{ backgroundColor: GOLD }}></div>
        </div>

        {/* Grid - Reduced Gap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const catStyle = categoryColors[post.category] || { bg: NAVY, color: GOLD };
            const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            });

            return (
              /* 2. Wrap the card in a Link using the post slug */
              <Link
                key={post._id}
                to={`/blog/${post.slug}`}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer"
              >
                {/* Square Image Container */}
                <div className="relative aspect-video sm:aspect-square lg:h-48 w-full overflow-hidden">
                  <img
                    src={post.image?.url || "https://via.placeholder.com/400"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category Badge - Smaller */}
                  <span
                    className="absolute top-3 left-3 text-[9px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider"
                    style={{ background: catStyle.bg, color: catStyle.color }}
                  >
                    {post.category}
                  </span>
                </div>

                {/* Content Area - Reduced Padding */}
                <div className="p-4 flex flex-col grow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                      {post.readTime || "5m read"}
                    </span>
                    <span className="text-[9px] text-gray-400 font-medium">
                      {formattedDate}
                    </span>
                  </div>

                  <h3
                    className="text-md font-bold leading-snug mb-2 group-hover:text-[#C9A84C] transition-colors line-clamp-2"
                    style={{ color: NAVY }}
                  >
                    {post.title}
                  </h3>

                  <p className="text-[13px] text-gray-500 leading-snug mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Footer - Tighter Space */}
                  <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shadow-inner"
                        style={{ background: NAVY }}
                      >
                        {post.author?.charAt(0) || post.title?.charAt(0) || "A"}
                      </div>
                      <span className="text-[10px] font-bold text-gray-600">
                        {post.author || "Admin"}
                      </span>
                    </div>
                    
                    <span
                      className="text-[10px] font-bold group-hover:translate-x-1 transition-transform"
                      style={{ color: GOLD }}
                    >
                      Read →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Blog;