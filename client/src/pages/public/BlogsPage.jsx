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
        setBlogs(response.data || []);
      } catch (error) {
        console.error("Failed to fetch blogs");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const totalBlogs = blogs.length;
  const latestYear = blogs.length > 0 && blogs[0].createdAt
    ? new Date(blogs[0].createdAt).getFullYear()
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

      <title>
        Blogs | Shivank Lavania
      </title>

      <meta
        name="description"
        content="Technical blogs by Shivank Lavania covering Salesforce, React, Full Stack Development, Cloud Computing, AI, Research and Software Engineering."
      />

      <meta
        name="keywords"
        content="Shivank Lavania Blogs, Salesforce Blogs, React Blogs, AI Blogs, Full Stack Development, Research, Software Engineering"
      />

      <meta
        property="og:title"
        content="Blogs | Shivank Lavania"
      />

      <meta
        property="og:description"
        content="Technical blogs by Shivank Lavania."
      />

      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:url"
        content="https://www.shivanklavania.in/blogs"
      />

      <link
        rel="canonical"
        href="https://www.shivanklavania.in/blogs"
      />

    </Helmet>

    <nav className="page-nav">

      {/* baaki tumhara existing code same rahega */}

    </nav>

  </div>
  );
}
