import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Loader2, Plus, Trash2, FileText, PenTool, Hash } from "lucide-react";
import api from "../../api/axiosinstance";

export default function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    tags: "", // Handled as comma-separated string in UI
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await api.get("/blogs");
      setBlogs(response.data);
    } catch (error) {
      toast.error("Failed to load blogs");
    } finally {
      setIsFetching(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      return toast.error("Title and Content are required");
    }

    setIsAdding(true);
    const loadingToast = toast.loading("Publishing blog...");

    try {
      // Convert comma-separated tags to an array
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      const payload = {
        ...formData,
        tags: tagsArray,
      };

      const response = await api.post("/blogs", payload);
      toast.success(response.data.message || "Blog published!", { id: loadingToast });
      
      // Update UI state with new blog
      setBlogs([response.data.blog, ...blogs]);
      
      // Reset form
      setFormData({
        title: "",
        summary: "",
        content: "",
        tags: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding blog", { id: loadingToast });
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    
    setDeletingId(id);
    const loadingToast = toast.loading("Deleting blog...");

    try {
      const response = await api.delete(`/blogs/${id}`);
      toast.success(response.data.message || "Blog deleted", { id: loadingToast });
      
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting blog", { id: loadingToast });
    } finally {
      setDeletingId(null);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-teal-400" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl animate-fade-in">
      <div className="mb-6 border-b border-slate-700 pb-4">
        <h2 className="text-2xl font-bold text-slate-100 flex items-center">
          <PenTool className="mr-3 text-teal-400" />
          Blogs Management
        </h2>
        <p className="text-slate-400 text-sm mt-1">Publish articles, tutorials, and thoughts to share with your audience.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ADD NEW BLOG FORM (Left Column) */}
        <div className="lg:col-span-5">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 sticky top-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center">
              <Plus className="h-5 w-5 mr-2 text-teal-400" />
              Write New Blog
            </h3>
            
            <form onSubmit={handleAddBlog} className="space-y-4">
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Blog Title*</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  required 
                  className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Short Summary*</label>
                <textarea 
                  name="summary" 
                  value={formData.summary} 
                  onChange={handleChange} 
                  required 
                  rows="2" 
                  className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Tags (Comma separated)</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input 
                    type="text" 
                    name="tags" 
                    value={formData.tags} 
                    onChange={handleChange} 
                    placeholder="e.g. React, Web Dev, Tutorial"
                    className="block w-full pl-9 pr-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Full Content*</label>
                <textarea 
                  name="content" 
                  value={formData.content} 
                  onChange={handleChange} 
                  required 
                  placeholder="Write your blog content here..."
                  rows="10" 
                  className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none resize-none font-mono text-sm"
                ></textarea>
              </div>

              <button type="submit" disabled={isAdding} className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-slate-900 bg-teal-400 hover:bg-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:opacity-70 transition-colors glow-teal mt-4">
                {isAdding ? <Loader2 className="h-5 w-5 animate-spin" /> : "Publish Blog"}
              </button>
            </form>
          </div>
        </div>

        {/* EXISTING BLOGS DISPLAY (Right Column) */}
        <div className="lg:col-span-7 space-y-4">
          {blogs.length === 0 ? (
            <div className="bg-slate-800/30 p-8 rounded-xl border border-slate-700 text-center text-slate-400">
              No blogs published yet. Start writing on the left.
            </div>
          ) : (
            blogs.map((blog) => (
              <div key={blog._id} className="bg-slate-800/40 p-5 rounded-xl border border-slate-700 hover:border-slate-500 transition-colors relative group">
                
                {/* Delete Button (Shows on hover) */}
                <button
                  onClick={() => handleDeleteBlog(blog._id)}
                  disabled={deletingId === blog._id}
                  className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-md transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                  title="Delete Blog"
                >
                  {deletingId === blog._id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                </button>

                <div className="pr-8">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-teal-400" />
                    <h4 className="font-bold text-lg text-slate-100">{blog.title}</h4>
                  </div>
                  
                  {blog.summary && (
                    <p className="text-slate-300 text-sm leading-relaxed mb-3">
                      {blog.summary}
                    </p>
                  )}

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {blog.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs font-medium bg-slate-900 text-slate-300 border border-slate-700 px-2.5 py-0.5 rounded-full flex items-center">
                          <Hash className="h-3 w-3 mr-1 text-slate-500" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 pt-3 border-t border-slate-700/50 flex justify-between items-center text-xs text-slate-500">
                    <span>Content length: {blog.content?.length || 0} characters</span>
                    {blog.createdAt && (
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
      </div>
    </div>
  );
}