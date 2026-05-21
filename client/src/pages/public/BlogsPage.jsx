import { useState, useEffect } from "react";
import { ArrowLeft, PenTool, Hash, Calendar, BookText, ArrowRight, Image as ImageIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axiosinstance"; 

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
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

  // Calculate dynamic stats for the header
  const totalBlogs = blogs.length;
  
  // Get the year of the most recent post
  const latestYear = blogs.length > 0 && blogs[0].createdAt 
    ? new Date(blogs[0].createdAt).getFullYear() 
    : new Date().getFullYear();

  // Helper to format dates nicely
  const formatDate = (dateString) => {
    if (!dateString) return "Recently Published";
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-teal-400/30 selection:text-teal-200 font-sans pb-24">
      
      {/* Sticky Top Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center px-3 py-2 -ml-3 text-sm font-semibold text-slate-300 hover:text-teal-400 hover:bg-slate-900 rounded-lg transition-all group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="hidden sm:flex items-center gap-3">
            <span className="h-4 w-px bg-slate-700"></span>
            <span className="text-sm font-mono text-teal-400 flex items-center">
              <PenTool className="h-3.5 w-3.5 mr-1.5" /> All Articles
            </span>
          </div>
        </div>
      </nav>

      <main className="pt-12 md:pt-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          
          {/* Data-Driven Page Header */}
          <header className="mb-16 border-b border-slate-800 pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              
              <div>
                <div className="inline-flex items-center justify-center p-2.5 bg-teal-400/10 rounded-xl text-teal-400 mb-5 border border-teal-400/20 shadow-[0_0_15px_rgba(45,212,191,0.1)]">
                  <BookText className="h-6 w-6" />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 tracking-tight mb-2">
                  Technical Articles
                </h1>
                <p className="text-slate-400 text-sm md:text-base font-medium">
                  Deep dives into full-stack development, architecture, and algorithms.
                </p>
              </div>

              {/* Dynamic Stats Row */}
              {!isLoading && blogs.length > 0 && (
                <div className="flex items-center gap-8 bg-slate-900/50 p-5 rounded-2xl border border-slate-800 shrink-0">
                  <div className="flex flex-col">
                    <span className="text-3xl font-black text-teal-400">{totalBlogs}</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Articles Published</span>
                  </div>
                  <div className="w-px h-10 bg-slate-700"></div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-black text-slate-200">{latestYear > 0 ? latestYear : "—"}</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Latest Post</span>
                  </div>
                </div>
              )}
            </div>
          </header>

          {/* Blogs Vertical List */}
          <div className="space-y-10">
            {isLoading ? (
              // Skeleton Loader
              [1, 2, 3].map((skeleton) => (
                <div key={skeleton} className="animate-pulse bg-slate-900/20 p-6 md:p-8 rounded-[2rem] border border-slate-800/80 flex flex-col md:flex-row gap-8">
                  <div className="h-48 md:h-full md:w-1/3 bg-slate-800 rounded-2xl shrink-0"></div>
                  <div className="w-full py-2">
                    <div className="h-8 bg-slate-800 w-3/4 rounded mb-4"></div>
                    <div className="h-4 bg-slate-800 w-1/4 rounded mb-6"></div>
                    <div className="space-y-3 mb-6">
                      <div className="h-4 bg-slate-800 w-full rounded"></div>
                      <div className="h-4 bg-slate-800 w-full rounded"></div>
                      <div className="h-4 bg-slate-800 w-5/6 rounded"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : blogs.length === 0 ? (
              // Empty State
              <div className="text-center py-20 text-slate-500 bg-slate-900/30 rounded-3xl border border-slate-800/50 border-dashed">
                <PenTool className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p className="text-lg font-medium">No articles published yet.</p>
              </div>
            ) : (
              blogs.map((blog) => (
                <article 
                  key={blog._id} 
                  onClick={() => navigate(`/blogs/${blog._id}`)}
                  className="group cursor-pointer bg-slate-900/20 p-5 md:p-6 rounded-[2rem] border border-slate-800/80 hover:bg-slate-900/40 hover:border-teal-400/30 transition-all duration-500 shadow-lg flex flex-col md:flex-row gap-6 md:gap-8 items-center"
                >
                  
                  {/* Thumbnail Image (Left side on Desktop, Top on Mobile) */}
                  <div className="w-full md:w-2/5 lg:w-1/3 h-56 md:h-64 rounded-2xl overflow-hidden bg-slate-900 relative shrink-0">
                    {blog.thumbnail ? (
                      <img 
                        src={blog.thumbnail} 
                        alt={blog.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-700">
                        <ImageIcon className="h-12 w-12 opacity-50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content (Right side on Desktop, Bottom on Mobile) */}
                  <div className="w-full md:w-3/5 lg:w-2/3 flex flex-col h-full py-2">
                    
                    {/* Meta Data */}
                    <div className="flex items-center gap-3 text-xs md:text-sm font-medium text-slate-400 mb-3 md:mb-4">
                      <div className="flex items-center bg-slate-950/50 px-3 py-1.5 rounded-lg border border-slate-800/50">
                        <Calendar className="h-3.5 w-3.5 mr-2 text-teal-400/70" />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>
                    </div>

                    {/* Article Title */}
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-3 md:mb-4 leading-tight group-hover:text-teal-400 transition-colors line-clamp-2">
                      {blog.title}
                    </h2>

                    {/* Summary */}
                    {blog.summary && (
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
                        {blog.summary}
                      </p>
                    )}

                    {/* Footer: Tags & Read More Button */}
                    <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800/50">
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {blog.tags?.slice(0, 3).map((tag, idx) => (
                          <span 
                            key={idx} 
                            className="flex items-center px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-md text-slate-400 text-xs font-mono tracking-wide uppercase"
                          >
                            <Hash className="h-3 w-3 mr-1 text-teal-400/50" />
                            {tag}
                          </span>
                        ))}
                        {blog.tags?.length > 3 && (
                          <span className="flex items-center px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-md text-slate-500 text-xs font-mono tracking-wide uppercase">
                            +{blog.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Read More Indicator */}
                      <div className="flex items-center text-teal-400 font-semibold text-sm group-hover:text-teal-300 transition-colors whitespace-nowrap">
                        Read Article 
                        <ArrowRight className="ml-1.5 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>

                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

        </div>
      </main>
    </div>
  );
}