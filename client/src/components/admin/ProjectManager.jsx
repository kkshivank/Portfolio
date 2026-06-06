import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  Loader2,
  Plus,
  Trash2,
  FolderGit2,
  ExternalLink,
  Code,
} from "lucide-react";
import api from "../../api/axiosinstance";

export default function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    tech: "", // Handled as comma-separated string in UI, converted to array on submit
    liveLink: "",
    githubLink: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects");
      setProjects(response.data);
    } catch (error) {
      toast.error("Failed to load projects");
    } finally {
      setIsFetching(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.summary) {
      return toast.error("Title and Summary are required");
    }

    setIsAdding(true);
    const loadingToast = toast.loading("Adding project...");

    try {
      // Convert comma-separated string to array, removing empty spaces
      const techArray = formData.tech
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");

      const payload = {
        ...formData,
        tech: techArray,
      };

      const response = await api.post("/projects", payload);
      toast.success(response.data.message || "Project added!", {
        id: loadingToast,
      });

      // Update UI state with new project
      setProjects([response.data.project, ...projects]);

      // Reset form
      setFormData({
        title: "",
        summary: "",
        tech: "",
        liveLink: "",
        githubLink: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding project", {
        id: loadingToast,
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    setDeletingId(id);
    const loadingToast = toast.loading("Deleting project...");

    try {
      const response = await api.delete(`/projects/${id}`);
      toast.success(response.data.message || "Project deleted", {
        id: loadingToast,
      });

      setProjects(projects.filter((project) => project._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting project", {
        id: loadingToast,
      });
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
          <FolderGit2 className="mr-3 text-teal-400" />
          Projects Management
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Showcase your best work, applications, and open-source contributions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ADD NEW PROJECT FORM (Left Column) */}
        <div className="lg:col-span-5">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 sticky top-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center">
              <Plus className="h-5 w-5 mr-2 text-teal-400" />
              Add New Project
            </h3>

            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Project Title*
                </label>
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
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Summary*
                </label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Technologies (Comma separated)
                </label>
                <input
                  type="text"
                  name="tech"
                  value={formData.tech}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB"
                  className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Live URL
                  </label>
                  <input
                    type="url"
                    name="liveLink"
                    value={formData.liveLink}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isAdding}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-slate-900 bg-teal-400 hover:bg-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:opacity-70 transition-colors glow-teal mt-4"
              >
                {isAdding ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Save Project"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* EXISTING PROJECTS DISPLAY (Right Column) */}
        <div className="lg:col-span-7 space-y-6">
          {projects.length === 0 ? (
            <div className="bg-slate-800/30 p-8 rounded-xl border border-slate-700 text-center text-slate-400">
              No projects added yet. Add your first project on the left.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-slate-800/40 rounded-xl border border-slate-700 overflow-hidden flex flex-col sm:flex-row hover:border-slate-500 transition-colors"
                >
                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-lg text-slate-100">
                          {project.title}
                        </h4>
                        <button
                          onClick={() => handleDeleteProject(project._id)}
                          disabled={deletingId === project._id}
                          className="text-slate-400 hover:text-red-400 p-1 rounded-md hover:bg-slate-700 transition-colors"
                        >
                          {deletingId === project._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <p className="text-sm text-slate-400 mt-1 line-clamp-2">
                        {project.summary}
                      </p>

                      {/* Tech Pills */}
                      {project.tech && project.tech.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {project.tech.map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] uppercase tracking-wider font-semibold bg-slate-900 text-teal-400 px-2 py-1 rounded"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 mt-4 pt-3 border-t border-slate-700/50">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm flex items-center text-slate-300 hover:text-teal-400 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4 mr-1.5" /> Live Demo
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm flex items-center text-slate-300 hover:text-teal-400 transition-colors"
                        >
                          <Code className="h-4 w-4 mr-1.5" /> Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}