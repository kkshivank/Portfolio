import { useState, useEffect } from "react";
import { ArrowLeft, PenTool, Hash, Calendar, BookText, ArrowRight, Image as ImageIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axiosinstance";
import { Helmet } from "react-helmet-async";

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchBlogs = async () => {
      try {
        const response = await api.get("/blogs");
        // Sort ascending — oldest blog first so visitors read in sequence
        const sorted = [...(response.data || [])].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setBlogs(sorted);
      } catch (error) {
        console.error("Failed to fetch blogs");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const totalBlogs = blogs.length;
  const latestYear = blogs.length > 0
    ? new Date(blogs[blogs.length - 1].createdAt).getFullYear()
    : new Date().getFullYear();

  const formatDate = (dateString) => {
    if (!dateString) return "Recently Published";
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="site-shell pb-24">

      <Helmet>
        <title>Blogs | Shivank Lavania - Salesforce & React Articles</title>
        <meta name="description" content="Read technical blogs on Salesforce, React, Cloud and DevOps by Shivank Lavania." />
        <meta name="keywords" content="Shivank Lavania Blogs, Salesforce Blogs, React Blogs, AI Blogs, Full Stack Development, Cloud Computing" />
        <meta property="og:title" content="Blogs | Shivank Lavania - Salesforce & React Articles" />
        <meta property="og:description" content="Read technical blogs on Salesforce, React, Cloud and DevOps by Shivank Lavania." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.shivanklavania.in/blogs" />
        <link rel="canonical" href="https://www.shivanklavania.in/blogs" />
      </Helmet>

      <nav className="page-nav">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center px-3 py-2 -ml-3 text-sm font-semibold text-slate-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-all group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="hidden sm:flex items-center gap-3">
            <span className="h-4 w-px bg-slate-200"></span>
            <span className="text-sm font-mono text-teal-700 flex items-center font-semibold">
              <PenTool className="h-3.5 w-3.5 mr-1.5" /> All Articles
            </span>
          </div>
        </div>
      </nav>

      <main className="pt-12 md:pt-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <header className="mb-16 border-b border-slate-200 pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <div className="inline-flex items-center justify-center p-2.5 bg-teal-50 rounded-xl text-teal-600 mb-5 border border-teal-100">
                  <BookText className="h-6 w-6" />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-2">
                  Technical Articles
                </h1>
                <p className="text-slate-600 text-sm md:text-base font-medium">
                  Deep dives into full-stack development, architecture, and algorithms.
                </p>
              </div>

              {!isLoading && blogs.length > 0 && (
                <div className="flex items-center gap-8 surface-card p-5 shrink-0">
                  <div className="flex flex-col">
                    <span className="text-3xl font-black text-teal-600">{totalBlogs}</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">Articles Published</span>
                  </div>
                  <div className="w-px h-10 bg-slate-200"></div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-black text-slate-800">{latestYear > 0 ? latestYear : "—"}</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">Latest Post</span>
                  </div>
                </div>
              )}
            </div>
          </header>

          <div className="space-y-8">
            {isLoading ? (
              [1, 2, 3].map((skeleton) => (
                <div key={skeleton} className="animate-pulse surface-card p-6 md:p-8 flex flex-col md:flex-row gap-8">
                  <div className="h-48 md:h-full md:w-1/3 bg-slate-200 rounded-2xl shrink-0"></div>
                  <div className="w-full py-2">
                    <div className="h-8 bg-slate-200 w-3/4 rounded mb-4"></div>
                    <div className="h-4 bg-slate-200 w-1/4 rounded mb-6"></div>
                    <div className="space-y-3 mb-6">
                      <div className="h-4 bg-slate-200 w-full rounded"></div>
                      <div className="h-4 bg-slate-200 w-full rounded"></div>
                      <div className="h-4 bg-slate-200 w-5/6 rounded"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : blogs.length === 0 ? (
              <div className="text-center py-20 text-slate-500 surface-card border-dashed">
                <PenTool className="h-12 w-12 mx-auto mb-4 opacity-30 text-teal-600" />
                <p className="text-lg font-medium">No articles published yet.</p>
              </div>
            ) : (
              blogs.map((blog, index) => (
                <article
                  key={blog._id}
                  onClick={() => navigate(`/blogs/${blog._id}`)}
                  className="group cursor-pointer surface-card-interactive p-5 md:p-6 flex flex-col md:flex-row gap-6 md:gap-8 items-center"
                >
                  <div className="w-full md:w-2/5 lg:w-1/3 h-56 md:h-64 rounded-2xl overflow-hidden bg-slate-100 relative shrink-0">
                    {blog.thumbnail ? (
                      <img
                        src={blog.thumbnail}
                        alt={`${blog.title} - blog thumbnail`}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 bg-gradient-to-br from-slate-50 to-teal-50">
                        <ImageIcon className="h-12 w-12 opacity-40" />
                      </div>
                    )}
                    {/* Series number badge */}
                    <div className="absolute top-3 left-3 bg-slate-900/80 text-teal-400 text-xs font-bold px-2.5 py-1 rounded-lg font-mono">
                      #{index + 1}
                    </div>
                  </div>

                  <div className="w-full md:w-3/5 lg:w-2/3 flex flex-col h-full py-2">
                    <div className="flex items-center gap-3 text-xs md:text-sm font-medium text-slate-500 mb-3 md:mb-4">
                      <div className="flex items-center bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                        <Calendar className="h-3.5 w-3.5 mr-2 text-teal-600" />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 md:mb-4 leading-tight group-hover:text-teal-700 transition-colors line-clamp-2">
                      {blog.title}
                    </h2>

                    {blog.summary && (
                      <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
                        {blog.summary}
                      </p>
                    )}

                    <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
                      <div className="flex flex-wrap gap-2">
                        {blog.tags?.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="flex items-center px-2.5 py-1 bg-teal-50 border border-teal-100 rounded-md text-teal-700 text-xs font-mono tracking-wide uppercase"
                          >
                            <Hash className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                        {blog.tags?.length > 3 && (
                          <span className="flex items-center px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-slate-500 text-xs font-mono tracking-wide uppercase">
                            +{blog.tags.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center text-teal-700 font-semibold text-sm group-hover:text-teal-800 transition-colors whitespace-nowrap">
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
