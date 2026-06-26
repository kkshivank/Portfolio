import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Loader2, Plus, Trash2, Code2, Layers, Pencil, Check, X } from "lucide-react";
import api from "../../api/axiosinstance";

export default function SkillManager() {
  const [skills, setSkills] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editData, setEditData] = useState({ category: "", name: "" });

  const [formData, setFormData] = useState({ category: "", name: "" });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await api.get("/skills");
      setSkills(response.data);
    } catch (error) {
      toast.error("Failed to load skills");
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

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!formData.category || !formData.name) {
      return toast.error("Category and Name are required");
    }
    setIsAdding(true);
    const loadingToast = toast.loading("Adding skill...");
    try {
      const response = await api.post("/skills", formData);
      toast.success(response.data.message || "Skill added!", { id: loadingToast });
      setSkills([...skills, response.data.skill]);
      setFormData({ ...formData, name: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding skill", { id: loadingToast });
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    setDeletingId(id);
    const loadingToast = toast.loading("Deleting skill...");
    try {
      const response = await api.delete(`/skills/${id}`);
      toast.success(response.data.message || "Skill deleted", { id: loadingToast });
      setSkills(skills.filter((skill) => skill._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting skill", { id: loadingToast });
    } finally {
      setDeletingId(null);
    }
  };

  const handleStartEdit = (skill) => {
    setEditingId(skill._id);
    setEditData({ category: skill.category, name: skill.name });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({ category: "", name: "" });
  };

  const handleUpdateSkill = async (id) => {
    if (!editData.category || !editData.name) {
      return toast.error("Category and Name are required");
    }
    setIsUpdating(true);
    const loadingToast = toast.loading("Updating skill...");
    try {
      const response = await api.put(`/skills/${id}`, editData);
      toast.success(response.data.message || "Skill updated!", { id: loadingToast });
      setSkills(skills.map((skill) => skill._id === id ? { ...skill, ...editData } : skill));
      handleCancelEdit();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating skill", { id: loadingToast });
    } finally {
      setIsUpdating(false);
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-teal-400" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl animate-fade-in">
      <div className="mb-6 border-b border-slate-700 pb-4">
        <h2 className="text-2xl font-bold text-slate-100 flex items-center">
          <Code2 className="mr-3 text-teal-400" />
          Skills Management
        </h2>
        <p className="text-slate-400 text-sm mt-1">Add your technical skills and group them by category.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ADD NEW SKILL FORM */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 sticky top-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center">
              <Plus className="h-5 w-5 mr-2 text-teal-400" />
              Add New Skill
            </h3>
            <form onSubmit={handleAddSkill} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Category</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="e.g., Frontend, Backend" className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Skill Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., React, Node.js" className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" />
              </div>
              <button type="submit" disabled={isAdding} className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-slate-900 bg-teal-400 hover:bg-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:opacity-70 transition-colors glow-teal mt-2">
                {isAdding ? <Loader2 className="h-5 w-5 animate-spin" /> : "Add Skill"}
              </button>
            </form>
          </div>
        </div>

        {/* EXISTING SKILLS DISPLAY */}
        <div className="lg:col-span-2 space-y-6">
          {Object.keys(groupedSkills).length === 0 ? (
            <div className="bg-slate-800/30 p-8 rounded-xl border border-slate-700 text-center text-slate-400">
              No skills added yet. Create your first skill on the left.
            </div>
          ) : (
            Object.keys(groupedSkills).map((category) => (
              <div key={category} className="bg-slate-800/40 rounded-xl border border-slate-700 overflow-hidden">
                <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700 flex items-center">
                  <Layers className="h-4 w-4 mr-2 text-teal-400" />
                  <h4 className="font-semibold text-slate-200">{category}</h4>
                  <span className="ml-auto bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded-full">
                    {groupedSkills[category].length}
                  </span>
                </div>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {groupedSkills[category].map((skill) => (
                    <div key={skill._id} className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 hover:border-slate-500 transition-colors">
                      {editingId === skill._id ? (
                        <div className="space-y-2">
                          <input type="text" name="category" value={editData.category} onChange={handleEditChange} placeholder="Category" className="block w-full px-2 py-1.5 border border-slate-600 rounded-md bg-slate-900 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none text-sm" />
                          <input type="text" name="name" value={editData.name} onChange={handleEditChange} placeholder="Skill name" className="block w-full px-2 py-1.5 border border-slate-600 rounded-md bg-slate-900 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none text-sm" />
                          <div className="flex gap-2">
                            <button onClick={() => handleUpdateSkill(skill._id)} disabled={isUpdating} className="flex-1 flex justify-center items-center py-1.5 rounded-md text-xs font-medium text-slate-900 bg-teal-400 hover:bg-teal-300 disabled:opacity-70 transition-colors">
                              {isUpdating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <><Check className="h-3.5 w-3.5 mr-1" />Save</>}
                            </button>
                            <button onClick={handleCancelEdit} className="flex-1 flex justify-center items-center py-1.5 rounded-md text-xs font-medium text-slate-300 bg-slate-700 hover:bg-slate-600 transition-colors">
                              <X className="h-3.5 w-3.5 mr-1" />Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-200 font-medium">{skill.name}</span>
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleStartEdit(skill)} className="p-1.5 text-slate-400 hover:text-teal-400 hover:bg-teal-400/10 rounded-md transition-colors" title="Edit Skill">
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button onClick={() => handleDeleteSkill(skill._id)} disabled={deletingId === skill._id} className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors disabled:opacity-50" title="Delete Skill">
                              {deletingId === skill._id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
