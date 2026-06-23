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

  <title>
    {blog?.title
      ? `${blog.title} | Shivank Lavania`
      : "Blog | Shivank Lavania"}
  </title>

  <meta
    name="description"
    content={
      blog?.summary ||
      "Technical blogs by Shivank Lavania on Salesforce, AI, React, Cloud Computing and Software Engineering."
    }
  />

  <meta
    name="keywords"
    content={
      blog?.tags?.join(", ") ||
      "Salesforce, React, AI, Cloud Computing, Software Engineering"
    }
  />

  <meta
    property="og:title"
    content={
      blog?.title || "Shivank Lavania Blog"
    }
  />

  <meta
    property="og:description"
    content={
      blog?.summary ||
      "Technical blog by Shivank Lavania"
    }
  />

  <meta
    property="og:type"
    content="article"
  />

  <meta
    property="og:url"
    content={`https://www.shivanklavania.in/blogs/${id}`}
  />

  {blog?.thumbnail && (
    <meta
      property="og:image"
      content={blog.thumbnail}
    />
  )}

  <link
    rel="canonical"
    href={`https://www.shivanklavania.in/blogs/${id}`}
  />

</Helmet>
    </div>
  );
}
