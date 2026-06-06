import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Loader2, Save, Upload, User, Briefcase, Mail, Link as LinkIcon, FileText } from "lucide-react";
import api from "../../api/axiosinstance";

export default function ProfileManager() {
  const [isFetching, setIsFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    email: "",
    resumeLink: "",
    githubLink: "",
    linkedinLink: "",
    profilePicture: "", // This will hold the Base64 string for the new upload
  });

  // Fetch existing profile on load
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/profile");
      if (response.data) {
        setFormData({
          name: response.data.name || "",
          role: response.data.role || "",
          bio: response.data.bio || "",
          email: response.data.email || "",
          resumeLink: response.data.resumeLink || "",
          githubLink: response.data.githubLink || "",
          linkedinLink: response.data.linkedinLink || "",
          profilePicture: "", // Reset to empty, only send if user selects a new one
        });
        setCurrentImage(response.data.profilePicture || "");
      }
    } catch (error) {
      if (error.response?.status !== 404) {
        toast.error("Failed to fetch profile");
      }
    } finally {
      setIsFetching(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Convert image to Base64 to send in req.body
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      return toast.error("Image size must be less than 5MB");
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData({ ...formData, profilePicture: reader.result });
      setCurrentImage(reader.result); // Update preview instantly
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const loadingToast = toast.loading("Saving profile...");

    try {
      const response = await api.put("/profile", formData);
      toast.success(response.data.message || "Profile updated!", { id: loadingToast });
      
      // Clear the base64 string from form data after successful upload
      setFormData({ ...formData, profilePicture: "" }); 
      setCurrentImage(response.data.profile?.profilePicture || currentImage);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating profile", { id: loadingToast });
    } finally {
      setIsSaving(false);
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
    <div className="max-w-4xl animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-100">Profile Management</h2>
        <p className="text-slate-400 text-sm">Update your public portfolio details and resume.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-slate-800/50 p-6 rounded-xl border border-slate-700">
        
        {/* Profile Picture Upload */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-700">
          <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-slate-600 bg-slate-900 flex-shrink-0">
            {currentImage ? (
              <img src={currentImage} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <User className="h-full w-full p-4 text-slate-500" />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Profile Image</label>
            <label className="flex items-center justify-center px-4 py-2 border border-slate-600 rounded-lg text-sm text-slate-300 hover:bg-slate-700 hover:text-white cursor-pointer transition-colors w-fit">
              <Upload className="h-4 w-4 mr-2" />
              Upload New Image
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="block w-full pl-10 pr-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Professional Role</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
              <input type="text" name="role" value={formData.role} onChange={handleChange} required className="block w-full pl-10 pr-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Public Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="block w-full pl-10 pr-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" />
            </div>
          </div>

          {/* Resume Link */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Resume Link (PDF/Drive)</label>
            <div className="relative">
              <FileText className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
              <input type="url" name="resumeLink" value={formData.resumeLink} onChange={handleChange} className="block w-full pl-10 pr-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" />
            </div>
          </div>

          {/* GitHub Link */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">GitHub Profile URL</label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
              <input type="url" name="githubLink" value={formData.githubLink} onChange={handleChange} className="block w-full pl-10 pr-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" />
            </div>
          </div>

          {/* LinkedIn Link */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">LinkedIn Profile URL</label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
              <input type="url" name="linkedinLink" value={formData.linkedinLink} onChange={handleChange} className="block w-full pl-10 pr-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Bio / About Me</label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} required rows="4" className="block w-full p-3 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none resize-none"></textarea>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4">
          <button type="submit" disabled={isSaving} className="flex items-center py-2 px-6 border border-transparent rounded-lg text-sm font-medium text-slate-900 bg-teal-400 hover:bg-teal-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-teal-400 disabled:opacity-70 transition-colors glow-teal">
            {isSaving ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Save className="h-5 w-5 mr-2" />}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}