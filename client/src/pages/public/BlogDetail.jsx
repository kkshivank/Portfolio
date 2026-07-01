import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Hash, Loader2, AlertCircle } from "lucide-react";
import api from "../../api/axiosinstance";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Helmet } from "react-helmet-async";

export default function BlogDetail() {
  const { id } = useParams();
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
      <div className="min-h-screen site-shell flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-teal-600 mb-4" />
        <p className="text-slate-500 font-medium animate-pulse">Loading article...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen site-shell flex flex-col items-center justify-center px-6">
        <AlertCircle className="h-16 w-16 text-slate-300 mb-6" />
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 text-center">Article Not Found</h2>
        <p className="text-slate-500 mb-8 text-center">{error}</p>
        <button
          onClick={() => navigate("/blogs")}
          className="btn-primary"
        >
          <ArrowLeft className="h-5 w-5 mr-2" /> Back to Articles
        </button>
      </div>
    );
  }

  return (
    <div className="site-shell pb-32">
      <Helmet>
        <title>{blog?.title || "Blog Article"} | Shivank Lavania</title>
        <meta name="description" content={blog?.summary || "Read this technical article by Shivank Lavania."} />
        <meta property="og:title" content={blog?.title || "Blog Article"} />
        <meta property="og:description" content={blog?.summary || "Read this technical article by Shivank Lavania."} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.shivanklavania.in/blogs/${id}`} />
        {blog?.thumbnail && <meta property="og:image" content={blog.thumbnail} />}
      </Helmet>

      <nav className="page-nav">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/blogs"
            className="flex items-center px-3 py-2 -ml-3 text-sm font-semibold text-slate-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-all group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to Articles
          </Link>
        </div>
      </nav>

      <main className="pt-10 md:pt-16">
        <article className="max-w-4xl mx-auto px-6 lg:px-8">
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="flex items-center text-sm font-medium text-teal-700 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-100">
                <Calendar className="h-4 w-4 mr-2" />
                {formatDate(blog.createdAt)}
              </div>

              {blog.tags && blog.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="flex items-center px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 text-xs font-mono tracking-wide uppercase"
                >
                  <Hash className="h-3 w-3 mr-1 text-slate-400" />
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
              {blog.title}
            </h1>

            {blog.thumbnail && (
              <div className="w-full h-[300px] md:h-[450px] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 mb-12 shadow-lg">
                <img
                  src={blog.thumbnail}
                  alt={`${blog.title} - featured image`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}

            {blog.summary && (
              <div className="text-xl md:text-2xl font-medium text-slate-600 leading-relaxed border-l-4 border-teal-500 pl-6 mb-12 bg-teal-50/50 py-4 rounded-r-xl">
                {blog.summary}
              </div>
            )}
          </header>

          <div className="prose-article">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {blog.content}
            </ReactMarkdown>
          </div>

          <div className="mt-20 pt-10 border-t border-slate-200 flex justify-center">
            <Link
              to="/blogs"
              className="inline-flex items-center px-8 py-4 bg-white border border-slate-200 hover:border-teal-300 hover:bg-teal-50 text-slate-700 rounded-xl font-semibold transition-all shadow-sm"
            >
              <ArrowLeft className="h-5 w-5 mr-3 text-teal-600" />
              Read More Articles
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
