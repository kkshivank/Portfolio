import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Loader2, Plus, Trash2, BookOpen, Users, Calendar, Link as LinkIcon, FileText, Hash } from "lucide-react";
import api from "../../api/axiosinstance";

export default function ResearchPaperManager() {
  const [papers, setPapers] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    authors: "", // Comma-separated string
    venue: "",
    year: "",
    summary: "",
    pdfLink: "",
    keywords: "", // Comma-separated string
  });

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      const response = await api.get("/research-papers");
      setPapers(response.data);
    } catch (error) {
      toast.error("Failed to load research papers");
    } finally {
      setIsFetching(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddPaper = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.venue || !formData.year) {
      return toast.error("Title, Venue, and Year are required");
    }

    setIsAdding(true);
    const loadingToast = toast.loading("Adding research paper...");

    try {
      // Convert comma-separated strings to arrays
      const authorsArray = formData.authors
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");

      const keywordsArray = formData.keywords
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");

      const payload = {
        ...formData,
        authors: authorsArray,
        keywords: keywordsArray,
      };

      const response = await api.post("/research-papers", payload);
      toast.success(response.data.message || "Research paper added!", { id: loadingToast });
      
      // Update UI state with new paper
      const newPaper = response.data.researchPaper || response.data;
      setPapers([newPaper, ...papers]);
      
      // Reset form
      setFormData({
        title: "",
        authors: "",
        venue: "",
        year: "",
        summary: "",
        pdfLink: "",
        keywords: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding paper", { id: loadingToast });
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeletePaper = async (id) => {
    if (!window.confirm("Are you sure you want to delete this research paper?")) return;
    
    setDeletingId(id);
    const loadingToast = toast.loading("Deleting research paper...");

    try {
      const response = await api.delete(`/research-papers/${id}`);
      toast.success(response.data.message || "Research paper deleted", { id: loadingToast });
      
      setPapers(papers.filter((paper) => paper._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting paper", { id: loadingToast });
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
          <BookOpen className="mr-3 text-teal-400" />
          Research Papers
        </h2>
        <p className="text-slate-400 text-sm mt-1">Manage your academic publications, journals, and conference papers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ADD NEW PAPER FORM (Left Column) */}
        <div className="lg:col-span-5">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 sticky top-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center">
              <Plus className="h-5 w-5 mr-2 text-teal-400" />
              Add Publication
            </h3>
            
            <form onSubmit={handleAddPaper} className="space-y-4">
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Paper Title*</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Authors (Comma separated)</label>
                <div className="relative">
                  <Users className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input type="text" name="authors" value={formData.authors} onChange={handleChange} placeholder="G.S. Rawat, J. Doe" className="block w-full pl-9 pr-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Venue*</label>
                  <input type="text" name="venue" value={formData.venue} onChange={handleChange} required placeholder="e.g. IEEE, Springer" className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Publication Year*</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <input type="number" name="year" value={formData.year} onChange={handleChange} required placeholder="2024" className="block w-full pl-9 pr-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">PDF Link</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input type="url" name="pdfLink" value={formData.pdfLink} onChange={handleChange} placeholder="https://..." className="block w-full pl-9 pr-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Keywords (Comma separated)</label>
                <input type="text" name="keywords" value={formData.keywords} onChange={handleChange} placeholder="AI, Machine Learning, Data Science" className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Abstract / Summary</label>
                <textarea name="summary" value={formData.summary} onChange={handleChange} rows="4" className="block w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-teal-400 focus:outline-none resize-none"></textarea>
              </div>

              <button type="submit" disabled={isAdding} className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-slate-900 bg-teal-400 hover:bg-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:opacity-70 transition-colors glow-teal mt-4">
                {isAdding ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save Paper"}
              </button>
            </form>
          </div>
        </div>

        {/* EXISTING PAPERS DISPLAY (Right Column) */}
        <div className="lg:col-span-7 space-y-4">
          {papers.length === 0 ? (
            <div className="bg-slate-800/30 p-8 rounded-xl border border-slate-700 text-center text-slate-400">
              No research papers added yet. Add your first publication on the left.
            </div>
          ) : (
            papers.map((paper) => (
              <div key={paper._id} className="bg-slate-800/40 p-5 rounded-xl border border-slate-700 hover:border-slate-500 transition-colors relative group">
                
                {/* Delete Button */}
                <button
                  onClick={() => handleDeletePaper(paper._id)}
                  disabled={deletingId === paper._id}
                  className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-md transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                  title="Delete Paper"
                >
                  {deletingId === paper._id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                </button>

                <div className="pr-8">
                  <h4 className="font-bold text-lg text-slate-100 leading-tight mb-2">{paper.title}</h4>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3 text-sm">
                    {paper.authors && paper.authors.length > 0 && (
                      <span className="flex items-center text-slate-300">
                        <Users className="h-4 w-4 mr-1.5 text-teal-400" /> 
                        {paper.authors.join(", ")}
                      </span>
                    )}
                    <span className="px-2 py-0.5 bg-slate-700 text-teal-300 rounded font-medium text-xs">
                      {paper.venue} {paper.year}
                    </span>
                  </div>
                  
                  {paper.summary && (
                    <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {paper.summary}
                    </p>
                  )}

                  {paper.keywords && paper.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {paper.keywords.map((kw, idx) => (
                        <span key={idx} className="text-xs font-medium text-slate-400 flex items-center">
                          <Hash className="h-3 w-3 mr-0.5 text-slate-500" />
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}

                  {paper.pdfLink && (
                    <div className="pt-3 border-t border-slate-700/50">
                      <a href={paper.pdfLink} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors">
                        <FileText className="h-4 w-4 mr-1.5" /> Read PDF
                      </a>
                    </div>
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