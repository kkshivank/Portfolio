import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Hash, Loader2, AlertCircle } from "lucide-react";
import api from "../../api/axiosinstance";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogDetail() {
  const { id } = useParams(); // Extracts the ID from the URL (e.g., /blogs/12345)
  const navigate = useNavigate();
  
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/blogs/${id}`);
        setBlog(response.data);
      } catch (err) {
        console.error("Failed to fetch blog details");
        setError("We couldn't find the article you're looking for.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBlog();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-teal-400 mb-4" />
        <p className="text-slate-400 font-medium animate-pulse">Loading article...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6">
        <AlertCircle className="h-16 w-16 text-slate-700 mb-6" />
        <h2 className="text-2xl md:text-3xl font-bold text-slate-200 mb-4 text-center">Article Not Found</h2>
        <p className="text-slate-400 mb-8 text-center">{error}</p>
        <button 
          onClick={() => navigate("/blogs")}
          className="flex items-center px-6 py-3 bg-teal-400 text-slate-950 font-bold rounded-xl hover:bg-teal-300 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" /> Back to Articles
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-teal-400/30 selection:text-teal-200 font-sans pb-32">
      
      {/* Sticky Top Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            to="/blogs" 
            className="flex items-center px-3 py-2 -ml-3 text-sm font-semibold text-slate-300 hover:text-teal-400 hover:bg-slate-900 rounded-lg transition-all group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to Articles
          </Link>
          
          <div className="hidden sm:flex items-center gap-3 text-sm font-medium text-slate-400">
           
          </div>
        </div>
      </nav>

      <main className="pt-10 md:pt-16">
        <article className="max-w-4xl mx-auto px-6 lg:px-8">
          
          {/* Article Header */}
          <header className="mb-12">
            {/* Meta tags (Date & Tags) */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center text-sm font-medium text-teal-400 bg-teal-400/10 px-3 py-1.5 rounded-lg border border-teal-400/20">
                <Calendar className="h-4 w-4 mr-2" />
                {formatDate(blog.createdAt)}
              </div>
              
              {blog.tags && blog.tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="flex items-center px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 text-xs font-mono tracking-wide uppercase"
                >
                  <Hash className="h-3 w-3 mr-1 text-slate-500" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 tracking-tight leading-tight mb-8">
              {blog.title}
            </h1>
            
            {/* Hero Image */}
            {blog.thumbnail && (
              <div className="w-full h-[300px] md:h-[450px] rounded-[2rem] overflow-hidden bg-slate-900 border border-slate-800 mb-12 shadow-2xl">
                <img 
                  src={blog.thumbnail} 
                  alt={blog.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            {/* Summary Lead */}
            {blog.summary && (
              <div className="text-xl md:text-2xl font-medium text-slate-300 leading-relaxed border-l-4 border-teal-400 pl-6 mb-12">
                {blog.summary}
              </div>
            )}
          </header>

          {/* Main Markdown Content */}
          <div className="prose prose-invert prose-slate prose-lg md:prose-xl prose-a:text-teal-400 hover:prose-a:text-teal-300 prose-headings:text-slate-100 prose-img:rounded-2xl max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {blog.content}
            </ReactMarkdown>
          </div>

          {/* Bottom Call to Action */}
          <div className="mt-20 pt-10 border-t border-slate-800 flex justify-center">
            <Link 
              to="/blogs"
              className="inline-flex items-center px-8 py-4 bg-slate-900 border border-slate-700 hover:border-teal-400 hover:bg-slate-800 text-slate-200 rounded-xl font-semibold transition-all shadow-lg"
            >
              <ArrowLeft className="h-5 w-5 mr-3 text-teal-400" />
              Read More Articles
            </Link>
          </div>

        </article>
      </main>
    </div>
  );
}