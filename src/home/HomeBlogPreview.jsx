import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const TEXT_DARK = "#2D2D2D";
const OFF_WHITE = "#FCFBFA";

const posts = [
  {
    category: "Pilgrimage",
    title: "Complete Guide to Char Dham Yatra 2025",
    author: "Rahul Sharma",
    date: "June 15, 2025",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800",
  },
  {
    category: "Adventure",
    title: "Top 5 Treks in Uttarakhand You Must Try",
    author: "Amit Rawat",
    date: "May 20, 2025",
    image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&q=80&w=800",
  },
  {
    category: "Tips & Guides",
    title: "Best Season to Visit Nainital & Mussoorie",
    author: "Priya Negi",
    date: "Apr 10, 2025",
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&q=80&w=800",
  },
];

export default function HomeBlogPreview() {
  const navigate = useNavigate();

  return (
    <section className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-16 md:py-20" style={{ background: OFF_WHITE }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs tracking-[3px] uppercase font-medium block mb-2" style={{ color: GOLD }}>
              Latest Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold" style={{ color: TEXT_DARK, fontFamily: "'Georgia', serif" }}>
              From Our <span style={{ color: GOLD }}>Blog</span>
            </h2>
          </div>
          <button
            onClick={() => navigate("/blog")}
            className="text-sm font-medium px-6 py-2.5 rounded transition-all hover:bg-[#C9A84C] hover:text-white shrink-0"
            style={{ border: `1px solid ${GOLD}`, color: GOLD }}
          >
            All Posts →
          </button>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.title}
              className="group bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl cursor-pointer"
              style={{ border: "1px solid #F0EBE3" }}
              onClick={() => navigate("/blog")}
            >
              {/* Image Container with Zoom Effect */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                
                {/* Category Badge on Image */}
                <span
                  className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded shadow-lg"
                  style={{ background: "white", color: GOLD }}
                >
                  {post.category}
                </span>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-lg font-semibold leading-snug mb-4 group-hover:text-[#C9A84C] transition-colors" style={{ color: TEXT_DARK, fontFamily: "'Georgia', serif" }}>
                  {post.title}
                </h3>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    {/* Tiny initial icon */}
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] text-white" style={{ background: GOLD }}>
                      {post.author.charAt(0)}
                    </div>
                    <span className="text-[11px] font-medium text-gray-500">{post.author}</span>
                  </div>
                  <span className="text-[11px] text-gray-400">{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}