import { useState, useEffect } from "react";
import { ArrowRight, Hash, Image as ImageIcon, FolderOpen } from "lucide-react";
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

  // Dynamically extract unique categories and count blogs per category
  const categoriesWithCount = blogs.reduce((acc, blog) => {
    if (blog.category) {
      if (!acc[blog.category]) {
        acc[blog.category] = 0;
      }
      acc[blog.category]++;
    }
    return acc;
  }, {});

  const uniqueCategories = Object.entries(categoriesWithCount);

  if (!isLoading && blogs.length === 0) return null;

  return (
    <section id="blogs" className="section-block section-muted border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="section-heading">
              <span className="section-number">06.</span>
              Technical Articles
            </h2>
          </div>

          <button
            onClick={() => navigate("/blogs")}
            className="flex items-center text-teal-700 hover:text-teal-800 font-semibold group transition-colors whitespace-nowrap px-4 py-2 rounded-xl hover:bg-teal-50"
          >
            Read All Articles
            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            [1, 2, 3].map((skeleton) => (
              <div key={skeleton} className="surface-card p-6 animate-pulse">
                <div className="h-8 bg-slate-200 w-3/4 rounded mb-4"></div>
                <div className="h-16 bg-slate-200 w-1/2 rounded mb-6"></div>
                <div className="h-10 bg-slate-200 w-full rounded"></div>
              </div>
            ))
          ) : uniqueCategories.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-500">
              <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-30 text-teal-600" />
              <p className="text-lg font-medium">No categories yet.</p>
            </div>
          ) : (
            uniqueCategories.map(([category, count]) => (
              <div
                key={category}
                className="surface-card-interactive p-6 flex flex-col justify-between h-full group cursor-pointer"
                onClick={() => navigate(`/blogs?category=${category}`)}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <FolderOpen className="h-8 w-8 text-teal-600" />
                    <span className="text-3xl font-black text-teal-600">{count}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">
                    {category}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {count} {count === 1 ? 'article' : 'articles'}
                  </p>
                </div>
                <button className="mt-6 flex items-center text-teal-700 font-semibold group-hover:text-teal-800 transition-colors">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
