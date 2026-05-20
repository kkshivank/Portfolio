import { useState, useEffect } from "react";
import { PenTool, ArrowRight, Hash } from "lucide-react";
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
            <p className="text-slate-400 mt-3 max-w-2xl text-sm md:text-base">
              Thoughts, tutorials, and deep dives into full-stack development, database architecture, and algorithms.
            </p>
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
            // Skeleton Loader matches the grid
            [1, 2, 3].map((skeleton) => (
              <div key={skeleton} className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 animate-pulse flex flex-col h-full">
                <div className="h-10 w-10 bg-slate-800 rounded-lg mb-6"></div>
                <div className="h-6 bg-slate-800 w-3/4 rounded mb-4"></div>
                <div className="h-20 bg-slate-800 w-full rounded mb-6"></div>
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
                className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 hover:border-teal-400/40 hover:-translate-y-1 transition-all duration-300 flex flex-col group shadow-lg cursor-pointer h-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-teal-400/10 rounded-lg text-teal-400">
                    <PenTool className="h-6 w-6" />
                  </div>
                </div>

                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-slate-100 mb-4 group-hover:text-teal-400 transition-colors leading-tight">
                    {blog.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 whitespace-pre-wrap">
                    {blog.summary}
                  </p>
                </div>

                {/* Footer: Tags - pushed to bottom via flex-grow above */}
                <div className="mt-auto pt-6 flex flex-wrap gap-2 border-t border-slate-800/50">
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