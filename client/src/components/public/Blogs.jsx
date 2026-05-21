import { useState, useEffect } from "react";
import { PenTool, ArrowRight, Hash, Image as ImageIcon } from "lucide-react";
import api from "../../api/axiosinstance";
import { useNavigate } from "react-router-dom";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get("/blogs");
        setBlogs(response.data || []);
      } catch (error) {
        console.error("Failed to fetch blogs");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (!isLoading && blogs.length === 0) return null;

  return (
    <section id="blogs" className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 flex items-center">
              <span className="text-teal-400 font-mono text-xl md:text-2xl mr-3">06.</span> 
              Technical Articles
            </h2>
          </div>
          
          <button 
            onClick={() => navigate("/blogs")}
            className="flex items-center text-teal-400 hover:text-teal-300 font-semibold group transition-colors whitespace-nowrap"
          >
            Read All Articles
            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Standard Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Skeleton Loader matches the new image grid
            [1, 2, 3].map((skeleton) => (
              <div key={skeleton} className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 animate-pulse flex flex-col h-full">
                {/* Image Skeleton */}
                <div className="h-48 w-full bg-slate-800 rounded-xl mb-6"></div>
                <div className="h-6 bg-slate-800 w-3/4 rounded mb-4"></div>
                <div className="h-16 bg-slate-800 w-full rounded mb-6"></div>
                <div className="mt-auto pt-5 flex gap-2 border-t border-slate-800/50">
                  <div className="h-6 w-16 bg-slate-800 rounded-md"></div>
                  <div className="h-6 w-20 bg-slate-800 rounded-md"></div>
                </div>
              </div>
            ))
          ) : (
            // Sliced to show a maximum of 5 blogs
            blogs.slice(0, 5).map((blog) => (
              <div 
                key={blog._id} 
                onClick={() => navigate(`/blogs/${blog._id}`)}
                className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-teal-400/40 hover:-translate-y-1 transition-all duration-300 flex flex-col group shadow-lg cursor-pointer h-full"
              >
                
                {/* Fixed Image Section */}
                <div className="w-full h-48 mb-6 rounded-xl overflow-hidden bg-slate-800 relative flex-shrink-0">
                  {blog.thumbnail ? (
                    <img 
                      src={blog.thumbnail} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    // Fallback if no thumbnail is provided
                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                      <ImageIcon className="h-10 w-10 opacity-50" />
                    </div>
                  )}
                  {/* Optional: Add a small overlay gradient for better aesthetics */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="flex-grow flex flex-col">
                  {/* Title with line-clamp to prevent overflowing height */}
                  <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-teal-400 transition-colors leading-tight line-clamp-2">
                    {blog.title}
                  </h3>
                  
                  {/* Summary with line-clamp-3 (Truncates with ... after 3 lines) */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {blog.summary}
                  </p>
                </div>

                {/* Footer: Tags - pushed to bottom via flex-grow above */}
                <div className="mt-auto pt-5 flex flex-wrap gap-2 border-t border-slate-800/50">
                  {blog.tags?.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="flex items-center text-[11px] uppercase tracking-wider text-slate-500 font-semibold bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                      <Hash className="h-3 w-3 mr-0.5 text-teal-400/70" /> {tag}
                    </span>
                  ))}
                  {blog.tags?.length > 3 && (
                    <span className="flex items-center text-[11px] uppercase tracking-wider text-slate-600 font-semibold bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                      +{blog.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
}