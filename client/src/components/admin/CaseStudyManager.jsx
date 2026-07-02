import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Loader2, Plus, Trash2, Briefcase, PenTool, Hash, Image as ImageIcon, X, Pencil, Check, Building, Layers, Target, Lightbulb, Award } from "lucide-react";
import api from "../../api/axiosinstance";

export default function CaseStudyManager() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Edit states
  const [editingId, setEditingId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editData, setEditData] = useState({
    title: "",
    client: "",
    industry: "",
    category: "",
    problem: "",
    solution: "",
    result: "",
    techStack: "",
    thumbnail: "",
    isPublished: false,
  });
  const [editImagePreview, setEditImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    client: "",
    industry: "",
    category: "",
    problem: "",
    solution: "",
    result: "",
    techStack: "",
    thumbnail: "",
    isPublished: false,
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const response = await api.get("/casestudies/admin");
      setCaseStudies(response.data);
    } catch (error) {
      toast.error("Failed to load case studies");
    } finally {
      setIsFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData({ ...editData, [name]: type === "checkbox" ? checked : value });
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

  const handleAddCaseStudy = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.client || !formData.industry || !formData.category || !formData.problem || !formData.solution || !formData.result || !formData.techStack || !formData.thumbnail) {
      return toast.error("All fields are mandatory, including the cover image.");
    }
    setIsAdding(true);
    const loadingToast = toast.loading("Publishing case study...");
    try {
      const techStackArray = formData.techStack.split(",").map((tag) => tag.trim()).filter((tag) => tag !== "");
      if (techStackArray.length === 0) {
        toast.dismiss(loadingToast);
        setIsAdding(false);
        return toast.error("Please add at least one valid technology.");
      }
      const payload = { ...formData, techStack: techStackArray };
      const response = await api.post("/casestudies", payload);
      toast.success(response.data.message || "Case study published!", { id: loadingToast });
      setCaseStudies([response.data.caseStudy, ...caseStudies]);
      setFormData({ title: "", client: "", industry: "", category: "", problem: "", solution: "", result: "", techStack: "", thumbnail: "", isPublished: false });
      setImagePreview(null);
      const fileInput = document.getElementById("thumbnail-upload");
      if (fileInput) fileInput.value = "";
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding case study", { id: loadingToast });
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteCaseStudy = async (id) => {
    if (!window.confirm("Are you sure you want to delete this case study?")) return;
    setDeletingId(id);
    const loadingToast = toast.loading("Deleting case study...");
    try {
      const response = await api.delete(`/casestudies/${id}`);
      toast.success(response.data.message || "Case study deleted", { id: loadingToast });
      setCaseStudies(caseStudies.filter((cs) => cs._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting case study", { id: loadingToast });
    } finally {
      setDeletingId(null);
    }
  };

  const handleStartEdit = (caseStudy) => {
    setEditingId(caseStudy._id);
    setEditData({
      title: caseStudy.title || "",
      client: caseStudy.client || "",
      industry: caseStudy.industry || "",
      category: caseStudy.category || "",
      problem: caseStudy.problem || "",
      solution: caseStudy.solution || "",
      result: caseStudy.result || "",
      techStack: caseStudy.techStack?.join(", ") || "",
      thumbnail: caseStudy.thumbnail || "",
      isPublished: caseStudy.isPublished || false,
    });
    setEditImagePreview(caseStudy.thumbnail || null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({ title: "", client: "", industry: "", category: "", problem: "", solution: "", result: "", techStack: "", thumbnail: "", isPublished: false });
    setEditImagePreview(null);
  };

  const handleUpdateCaseStudy = async (id) => {
    if (!editData.title || !editData.client || !editData.industry || !editData.category || !editData.problem || !editData.solution || !editData.result || !editData.techStack || !editData.thumbnail) {
      return toast.error("All fields are mandatory.");
    }
    setIsUpdating(true);
    const loadingToast = toast.loading("Updating case study...");
    try {
      const techStackArray = editData.techStack.split(",").map((tag) => tag.trim()).filter((tag) => tag !== "");
      if (techStackArray.length === 0) {
        toast.dismiss(loadingToast);
        setIsUpdating(false);
        return toast.error("Please add at least one valid technology.");
      }
      const payload = { ...editData, techStack: techStackArray };
      const response = await api.put(`/casestudies/${id}`, payload);
      toast.success(response.data.message || "Case study updated!", { id: loadingToast });
      setCaseStudies(caseStudies.map((cs) => cs._id === id ? { ...cs, ...payload } : cs));
      handleCancelEdit();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating case study", { id: loadingToast });
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
          <Briefcase className="mr-3 text-teal-400" />
          Case Studies Management
        </h2>
        <p className="text-slate-400 text-sm mt-1">Manage your client case studies and project showcases.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* ADD NEW CASE STUDY FORM */}
        <div className="lg:col-span-5">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 sticky top-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center">
              <Plus className="h-5 w-5 mr-2 text-teal-400" />
              Add New Case Study
            </h3>

            <form onSubmit={handleAddCaseStudy} className="space-y-4">
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
                <label className="block text-sm font-medium text-slate-300 mb-1">Title*</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Client*</label>
                  <input type="text" name="client" value={formData.client} onChange={handleChange} required className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Industry*</label>
                  <input type="text" name="industry" value={formData.industry} onChange={handleChange} required className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Category*</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} required placeholder="e.g. Salesforce, DevOps, React, AI/ML" className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Problem*</label>
                <textarea name="problem" value={formData.problem} onChange={handleChange} required rows="3" className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none resize-none" placeholder="Describe the problem or challenge..."></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Solution*</label>
                <textarea name="solution" value={formData.solution} onChange={handleChange} required rows="3" className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none resize-none" placeholder="Describe the solution implemented..."></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Result*</label>
                <textarea name="result" value={formData.result} onChange={handleChange} required rows="2" className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none resize-none" placeholder="Describe the outcome and impact..."></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Tech Stack (Comma separated)*</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input type="text" name="techStack" value={formData.techStack} onChange={handleChange} required placeholder="e.g. React, Node.js, MongoDB" className="block w-full pl-9 pr-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" name="isPublished" id="isPublished" checked={formData.isPublished} onChange={handleChange} className="w-4 h-4 text-teal-400 bg-slate-700 border-slate-600 rounded focus:ring-teal-400" />
                <label htmlFor="isPublished" className="text-sm font-medium text-slate-300">Publish immediately</label>
              </div>

              <button type="submit" disabled={isAdding} className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-slate-900 bg-teal-400 hover:bg-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:opacity-70 transition-colors glow-teal mt-4">
                {isAdding ? <Loader2 className="h-5 w-5 animate-spin" /> : "Add Case Study"}
              </button>
            </form>
          </div>
        </div>

        {/* EXISTING CASE STUDIES DISPLAY */}
        <div className="lg:col-span-7 space-y-4">
          {caseStudies.length === 0 ? (
            <div className="bg-slate-800/30 p-8 rounded-xl border border-slate-700 text-center text-slate-400">
              No case studies yet. Start adding on the left.
            </div>
          ) : (
            caseStudies.map((caseStudy) => (
              <div key={caseStudy._id} className="bg-slate-800/40 p-5 rounded-xl border border-slate-700 hover:border-slate-500 transition-colors relative group flex flex-col gap-4">

                {/* Edit / Delete buttons */}
                <div className="absolute top-4 right-4 flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-10">
                  {editingId !== caseStudy._id && (
                    <button
                      onClick={() => handleStartEdit(caseStudy)}
                      className="p-1.5 text-slate-400 hover:text-teal-400 hover:bg-slate-700 rounded-md transition-colors"
                      title="Edit Case Study"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteCaseStudy(caseStudy._id)}
                    disabled={deletingId === caseStudy._id}
                    className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-md transition-colors"
                    title="Delete Case Study"
                  >
                    {deletingId === caseStudy._id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  </button>
                </div>

                {/* EDIT MODE */}
                {editingId === caseStudy._id ? (
                  <div className="space-y-4 pr-8">
                    <p className="text-teal-400 text-sm font-semibold">Editing Case Study</p>

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

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Client*</label>
                        <input type="text" name="client" value={editData.client} onChange={handleEditChange} className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Industry*</label>
                        <input type="text" name="industry" value={editData.industry} onChange={handleEditChange} className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none text-sm" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Category*</label>
                      <input type="text" name="category" value={editData.category} onChange={handleEditChange} className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none text-sm" />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Problem*</label>
                      <textarea name="problem" value={editData.problem} onChange={handleEditChange} rows="2" className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none resize-none text-sm"></textarea>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Solution*</label>
                      <textarea name="solution" value={editData.solution} onChange={handleEditChange} rows="2" className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none resize-none text-sm"></textarea>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Result*</label>
                      <textarea name="result" value={editData.result} onChange={handleEditChange} rows="2" className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none resize-none text-sm"></textarea>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Tech Stack (comma separated)*</label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
                        <input type="text" name="techStack" value={editData.techStack} onChange={handleEditChange} className="block w-full pl-8 pr-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none text-sm" />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input type="checkbox" name="isPublished" id="editIsPublished" checked={editData.isPublished} onChange={handleEditChange} className="w-4 h-4 text-teal-400 bg-slate-700 border-slate-600 rounded focus:ring-teal-400" />
                      <label htmlFor="editIsPublished" className="text-xs font-medium text-slate-400">Published</label>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleUpdateCaseStudy(caseStudy._id)}
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
                    {caseStudy.thumbnail && (
                      <div className="sm:w-32 flex-shrink-0">
                        <img src={caseStudy.thumbnail} alt={caseStudy.title} className="w-full h-24 sm:h-full object-cover rounded-lg border border-slate-700" />
                      </div>
                    )}
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="h-4 w-4 text-teal-400 flex-shrink-0" />
                        <h4 className="font-bold text-lg text-slate-100 line-clamp-1">{caseStudy.title}</h4>
                        {!caseStudy.isPublished && (
                          <span className="px-2 py-0.5 bg-slate-700 text-slate-400 text-xs rounded">Draft</span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-400 mb-2">
                        <span className="flex items-center gap-1"><Building className="h-3 w-3" /> {caseStudy.client}</span>
                        <span className="flex items-center gap-1"><Layers className="h-3 w-3" /> {caseStudy.industry}</span>
                      </div>
                      {caseStudy.category && (
                        <span className="inline-block px-2 py-0.5 bg-teal-900/50 text-teal-400 text-xs rounded mb-2">{caseStudy.category}</span>
                      )}
                      <p className="text-slate-300 text-sm leading-relaxed mb-3 line-clamp-2">{caseStudy.problem}</p>
                      {caseStudy.techStack && caseStudy.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {caseStudy.techStack.slice(0, 3).map((tech, idx) => (
                            <span key={idx} className="text-xs font-medium bg-slate-900 text-slate-300 border border-slate-700 px-2.5 py-0.5 rounded-full flex items-center">
                              <Hash className="h-3 w-3 mr-1 text-slate-500" />{tech}
                            </span>
                          ))}
                          {caseStudy.techStack.length > 3 && (
                            <span className="text-xs font-medium bg-slate-900 text-slate-500 border border-slate-700 px-2 py-0.5 rounded-full">+{caseStudy.techStack.length - 3}</span>
                          )}
                        </div>
                      )}
                      <div className="mt-4 pt-3 border-t border-slate-700/50 flex justify-between items-center text-xs text-slate-500">
                        <span>Case Study</span>
                        {caseStudy.createdAt && <span>{new Date(caseStudy.createdAt).toLocaleDateString()}</span>}
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
