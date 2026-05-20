import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Loader2, Plus, Trash2, GraduationCap, School, Calendar } from "lucide-react";
import api from "../../api/axiosinstance";

export default function EducationManager() {
  const [educationList, setEducationList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    degree: "",
    institution: "",
    period: "",
    description: "",
  });

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const response = await api.get("/education");
      setEducationList(response.data);
    } catch (error) {
      toast.error("Failed to load educational history");
    } finally {
      setIsFetching(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddEducation = async (e) => {
    e.preventDefault();
    if (!formData.degree || !formData.institution || !formData.period) {
      return toast.error("Degree, Institution, and Period are required");
    }

    setIsAdding(true);
    const loadingToast = toast.loading("Adding education...");

    try {
      const response = await api.post("/education", formData);
      toast.success(response.data.message || "Education added!", { id: loadingToast });
      
      // Update UI state with new education entry
      setEducationList([response.data.education, ...educationList]);
      
      // Reset form
      setFormData({
        degree: "",
        institution: "",
        period: "",
        description: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding education", { id: loadingToast });
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteEducation = async (id) => {
    if (!window.confirm("Are you sure you want to delete this education entry?")) return;
    
    setDeletingId(id);
    const loadingToast = toast.loading("Deleting education...");

    try {
      const response = await api.delete(`/education/${id}`);
      toast.success(response.data.message || "Education deleted", { id: loadingToast });
      
      setEducationList(educationList.filter((edu) => edu._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting education", { id: loadingToast });
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
          <GraduationCap className="mr-3 text-teal-400" />
          Education Management
        </h2>
        <p className="text-slate-400 text-sm mt-1">Manage your academic background, degrees, and certifications.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ADD NEW EDUCATION FORM (Left Column) */}
        <div className="lg:col-span-5">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 sticky top-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center">
              <Plus className="h-5 w-5 mr-2 text-teal-400" />
              Add Education
            </h3>
            
            <form onSubmit={handleAddEducation} className="space-y-4">
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Degree / Certificate*</label>
                <input 
                  type="text" 
                  name="degree" 
                  value={formData.degree} 
                  onChange={handleChange} 
                  placeholder="e.g. B.Tech in Computer Science and Engineering"
                  required 
                  className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Institution Name*</label>
                <div className="relative">
                  <School className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input 
                    type="text" 
                    name="institution" 
                    value={formData.institution} 
                    onChange={handleChange} 
                    placeholder="e.g. Swami Keshvanand Institute of Technology"
                    required 
                    className="block w-full pl-9 pr-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Study Period*</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input 
                    type="text" 
                    name="period" 
                    value={formData.period} 
                    onChange={handleChange} 
                    placeholder="e.g. 2023 - 2027"
                    required 
                    className="block w-full pl-9 pr-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  placeholder="Relevant coursework, honors, or achievements..."
                  rows="4" 
                  className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none resize-none"
                ></textarea>
              </div>

              <button type="submit" disabled={isAdding} className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-slate-900 bg-teal-400 hover:bg-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:opacity-70 transition-colors glow-teal mt-4">
                {isAdding ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save Education"}
              </button>
            </form>
          </div>
        </div>

        {/* EXISTING EDUCATION DISPLAY (Right Column) */}
        <div className="lg:col-span-7 space-y-4">
          {educationList.length === 0 ? (
            <div className="bg-slate-800/30 p-8 rounded-xl border border-slate-700 text-center text-slate-400">
              No education entries added yet. Add your academic history on the left.
            </div>
          ) : (
            educationList.map((edu) => (
              <div key={edu._id} className="bg-slate-800/40 p-5 rounded-xl border border-slate-700 hover:border-slate-500 transition-colors relative group">
                
                {/* Delete Button (Shows on hover) */}
                <button
                  onClick={() => handleDeleteEducation(edu._id)}
                  disabled={deletingId === edu._id}
                  className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-md transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                  title="Delete Entry"
                >
                  {deletingId === edu._id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                </button>

                <div className="pr-8">
                  <h4 className="font-bold text-lg text-slate-100">{edu.degree}</h4>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1 text-sm">
                    <span className="flex items-center text-teal-400 font-medium">
                      <School className="h-4 w-4 mr-1.5" /> {edu.institution}
                    </span>
                    <span className="flex items-center text-slate-400">
                      <Calendar className="h-4 w-4 mr-1.5" /> {edu.period}
                    </span>
                  </div>
                  
                  {edu.description && (
                    <p className="text-slate-300 mt-4 text-sm leading-relaxed whitespace-pre-wrap">
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        
      </div>
    </div>
  );
}