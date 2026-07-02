import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Loader2, Plus, Trash2, FileText, PenTool, Hash, Image as ImageIcon, X, Pencil, Check } from "lucide-react";
import api from "../../api/axiosinstance";

export default function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Edit states
  const [editingId, setEditingId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editData, setEditData] = useState({
    title: "",
    summary: "",
    content: "",
    category: "",
    tags: "",
    thumbnail: "",
  });
  const [editImagePreview, setEditImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    category: "",
    tags: "",
    thumbnail: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

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

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) return toast.error("Image must be less than 5MB");
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, thumbnail: reader.result });
      };
      reader.onerror = () => toast.error("Error reading file");
    }
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) return toast.error("Image must be less than 5MB");
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setEditImagePreview(reader.result);
        setEditData({ ...editData, thumbnail: reader.result });
      };
      reader.onerror = () => toast.error("Error reading file");
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData({ ...formData, thumbnail: "" });
  };

  const removeEditImage = () => {
    setEditImagePreview(null);
    setEditData({ ...editData, thumbnail: "" });
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.summary || !formData.content || !formData.category || !formData.tags || !formData.thumbnail) {
      return toast.error("All fields are mandatory, including the cover image and tags.");
    }
    setIsAdding(true);
    const loadingToast = toast.loading("Publishing blog...");
    try {
      const tagsArray = formData.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag !== "");
      if (tagsArray.length === 0) {
        toast.dismiss(loadingToast);
        setIsAdding(false);
        return toast.error("Please add at least one valid tag.");
      }
      const payload = { ...formData, tags: tagsArray };
      const response = await api.post("/blogs", payload);
      toast.success(response.data.message || "Blog published!", { id: loadingToast });
      setBlogs([response.data.blog, ...blogs]);
      setFormData({ title: "", summary: "", content: "", category: "", tags: "", thumbnail: "" });
      setImagePreview(null);
      const fileInput = document.getElementById("thumbnail-upload");
      if (fileInput) fileInput.value = "";
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

  // Start editing — prefill edit form with blog data
  const handleStartEdit = (blog) => {
    setEditingId(blog._id);
    setEditData({
      title: blog.title || "",
      summary: blog.summary || "",
      content: blog.content || "",
      category: blog.category || "",
      tags: blog.tags?.join(", ") || "",
      thumbnail: blog.thumbnail || "",
    });
    setEditImagePreview(blog.thumbnail || null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({ title: "", summary: "", content: "", category: "", tags: "", thumbnail: "" });
    setEditImagePreview(null);
  };

  const handleUpdateBlog = async (id) => {
    if (!editData.title || !editData.summary || !editData.content || !editData.category || !editData.tags || !editData.thumbnail) {
      return toast.error("All fields are mandatory.");
    }
    setIsUpdating(true);
    const loadingToast = toast.loading("Updating blog...");
    try {
      const tagsArray = editData.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag !== "");
      if (tagsArray.length === 0) {
        toast.dismiss(loadingToast);
        setIsUpdating(false);
        return toast.error("Please add at least one valid tag.");
      }
      const payload = { ...editData, tags: tagsArray };
      const response = await api.put(`/blogs/${id}`, payload);
      toast.success(response.data.message || "Blog updated!", { id: loadingToast });
      setBlogs(blogs.map((blog) => blog._id === id ? { ...blog, ...payload } : blog));
      handleCancelEdit();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating blog", { id: loadingToast });
    } finally {
      setIsUpdating(false);
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
        <p className="text-slate-400 text-sm mt-1">Publish Markdown articles with cover images to share with your audience.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* ADD NEW BLOG FORM */}
        <div className="lg:col-span-5">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 sticky top-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center">
              <Plus className="h-5 w-5 mr-2 text-teal-400" />
              Write New Blog
            </h3>

            <form onSubmit={handleAddBlog} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Cover Image (Thumbnail)*</label>
                {imagePreview ? (
                  <div className="relative rounded-lg overflow-hidden border border-slate-600 mb-2">
                    <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover" />
                    <button type="button" onClick={removeImage} className="absolute top-2 right-2 p-1 bg-slate-900/80 text-white rounded-md hover:bg-red-500 transition-colors">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer bg-slate-900/50 hover:bg-slate-800 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ImageIcon className="w-8 h-8 mb-2 text-slate-400" />
                      <p className="text-sm text-slate-400"><span className="font-semibold text-teal-400">Click to upload</span> cover image</p>
                    </div>
                    <input id="thumbnail-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} required={!formData.thumbnail} />
                  </label>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Blog Title*</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Short Summary*</label>
                <textarea name="summary" value={formData.summary} onChange={handleChange} required rows="2" className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none resize-none"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Category*</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} required placeholder="e.g. DevOps, Salesforce, Git, Cloud" className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Tags (Comma separated)*</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input type="text" name="tags" value={formData.tags} onChange={handleChange} required placeholder="e.g. React, Web Dev, Tutorial" className="block w-full pl-9 pr-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-1">
                  <label className="block text-sm font-medium text-slate-300">Full Content*</label>
                  <span className="text-xs text-teal-400 font-mono bg-teal-400/10 px-2 py-0.5 rounded">Markdown Supported</span>
                </div>
                <textarea name="content" value={formData.content} onChange={handleChange} required placeholder="# Heading 1&#10;Write your content in Markdown format..." rows="10" className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none resize-none font-mono text-sm leading-relaxed"></textarea>
              </div>

              <button type="submit" disabled={isAdding} className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-slate-900 bg-teal-400 hover:bg-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:opacity-70 transition-colors glow-teal mt-4">
                {isAdding ? <Loader2 className="h-5 w-5 animate-spin" /> : "Publish Blog"}
              </button>
            </form>
          </div>
        </div>

        {/* EXISTING BLOGS DISPLAY */}
        <div className="lg:col-span-7 space-y-4">
          {blogs.length === 0 ? (
            <div className="bg-slate-800/30 p-8 rounded-xl border border-slate-700 text-center text-slate-400">
              No blogs published yet. Start writing on the left.
            </div>
          ) : (
            blogs.map((blog) => (
              <div key={blog._id} className="bg-slate-800/40 p-5 rounded-xl border border-slate-700 hover:border-slate-500 transition-colors relative group flex flex-col gap-4">

                {/* Edit / Delete buttons */}
                <div className="absolute top-4 right-4 flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-10">
                  {editingId !== blog._id && (
                    <button
                      onClick={() => handleStartEdit(blog)}
                      className="p-1.5 text-slate-400 hover:text-teal-400 hover:bg-slate-700 rounded-md transition-colors"
                      title="Edit Blog"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteBlog(blog._id)}
                    disabled={deletingId === blog._id}
                    className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-md transition-colors"
                    title="Delete Blog"
                  >
                    {deletingId === blog._id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  </button>
                </div>

                {/* EDIT MODE */}
                {editingId === blog._id ? (
                  <div className="space-y-4 pr-8">
                    <p className="text-teal-400 text-sm font-semibold">Editing Blog</p>

                    {/* Edit thumbnail */}
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Cover Image*</label>
                      {editImagePreview ? (
                        <div className="relative rounded-lg overflow-hidden border border-slate-600 mb-2">
                          <img src={editImagePreview} alt="Preview" className="w-full h-28 object-cover" />
                          <button type="button" onClick={removeEditImage} className="absolute top-2 right-2 p-1 bg-slate-900/80 text-white rounded-md hover:bg-red-500 transition-colors">
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex items-center justify-center w-full h-20 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer bg-slate-900/50 hover:bg-slate-800 transition-colors">
                          <p className="text-xs text-slate-400"><span className="text-teal-400 font-semibold">Click to upload</span> new image</p>
                          <input type="file" accept="image/*" className="hidden" onChange={handleEditImageChange} />
                        </label>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Title*</label>
                      <input type="text" name="title" value={editData.title} onChange={handleEditChange} className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none text-sm" />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Summary*</label>
                      <textarea name="summary" value={editData.summary} onChange={handleEditChange} rows="2" className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none resize-none text-sm"></textarea>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Category*</label>
                      <input type="text" name="category" value={editData.category} onChange={handleEditChange} className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none text-sm" />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Tags (comma separated)*</label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
                        <input type="text" name="tags" value={editData.tags} onChange={handleEditChange} className="block w-full pl-8 pr-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none text-sm" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-end mb-1">
                        <label className="block text-xs font-medium text-slate-400">Full Content*</label>
                        <span className="text-xs text-teal-400 font-mono bg-teal-400/10 px-2 py-0.5 rounded">Markdown Supported</span>
                      </div>
                      <textarea name="content" value={editData.content} onChange={handleEditChange} rows="10" className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none resize-none font-mono text-sm leading-relaxed"></textarea>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleUpdateBlog(blog._id)}
                        disabled={isUpdating}
                        className="flex-1 flex justify-center items-center py-2 px-4 rounded-lg text-sm font-medium text-slate-900 bg-teal-400 hover:bg-teal-300 disabled:opacity-70 transition-colors"
                      >
                        {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Check className="h-4 w-4 mr-1.5" /> Save Changes</>}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex-1 flex justify-center items-center py-2 px-4 rounded-lg text-sm font-medium text-slate-300 bg-slate-700 hover:bg-slate-600 transition-colors"
                      >
                        <X className="h-4 w-4 mr-1.5" /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* VIEW MODE */
                  <div className="flex flex-col sm:flex-row gap-4 pr-16">
                    {blog.thumbnail && (
                      <div className="sm:w-32 flex-shrink-0">
                        <img src={blog.thumbnail} alt={blog.title} className="w-full h-24 sm:h-full object-cover rounded-lg border border-slate-700" />
                      </div>
                    )}
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-teal-400 flex-shrink-0" />
                        <h4 className="font-bold text-lg text-slate-100 line-clamp-1">{blog.title}</h4>
                      </div>
                      {blog.summary && (
                        <p className="text-slate-300 text-sm leading-relaxed mb-3 line-clamp-2">{blog.summary}</p>
                      )}
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {blog.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="text-xs font-medium bg-slate-900 text-slate-300 border border-slate-700 px-2.5 py-0.5 rounded-full flex items-center">
                              <Hash className="h-3 w-3 mr-1 text-slate-500" />{tag}
                            </span>
                          ))}
                          {blog.tags.length > 3 && (
                            <span className="text-xs font-medium bg-slate-900 text-slate-500 border border-slate-700 px-2 py-0.5 rounded-full">+{blog.tags.length - 3}</span>
                          )}
                        </div>
                      )}
                      <div className="mt-4 pt-3 border-t border-slate-700/50 flex justify-between items-center text-xs text-slate-500">
                        <span>Markdown Content</span>
                        {blog.createdAt && <span>{new Date(blog.createdAt).toLocaleDateString()}</span>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
