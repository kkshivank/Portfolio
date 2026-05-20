import { useState, useEffect } from "react";
import { BookOpen, Users, Calendar, ArrowRight, FileText } from "lucide-react";
import { FaExternalLinkAlt } from "react-icons/fa";
import api from "../../api/axiosinstance";
import { useNavigate } from "react-router-dom";

export default function Research() {
  const [papers, setPapers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const response = await api.get("/research-papers");
        setPapers(response.data || []);
      } catch (error) {
        console.error("Failed to fetch research papers");
      } finally {
        setIsLoading(false);
      }
    };
    fetchResearch();
  }, []);

  if (!isLoading && papers.length === 0) return null;

  return (
    <section id="research" className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 flex items-center">
              <span className="text-teal-400 font-mono text-xl md:text-2xl mr-3">05.</span> 
              Academic Research
            </h2>
            <p className="text-slate-400 mt-3 max-w-2xl text-sm md:text-base">
              Peer-reviewed publications, technical papers, and academic contributions focusing on software architecture and computational algorithms.
            </p>
          </div>
          
          <button 
            onClick={() => navigate("/research-papers")}
            className="flex items-center text-teal-400 hover:text-teal-300 font-semibold group transition-colors whitespace-nowrap"
          >
            View All Research 
            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Standard Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {isLoading ? (
            // Skeleton Loader matches the grid
            [1, 2].map((skeleton) => (
              <div key={skeleton} className="bg-slate-800/20 p-6 md:p-8 rounded-2xl border border-slate-700/50 animate-pulse flex flex-col h-full">
                <div className="h-8 bg-slate-700 w-3/4 rounded mb-4"></div>
                <div className="h-4 bg-slate-700 w-1/2 rounded mb-6"></div>
                <div className="h-24 bg-slate-700 w-full rounded mb-6"></div>
                <div className="mt-auto pt-6 border-t border-slate-700/50 flex justify-between">
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-slate-700 rounded-md"></div>
                    <div className="h-6 w-20 bg-slate-700 rounded-md"></div>
                  </div>
                  <div className="h-8 w-24 bg-slate-700 rounded-lg"></div>
                </div>
              </div>
            ))
          ) : (
            // Sliced to show a maximum of 5 research papers
            papers.slice(0, 5).map((paper) => (
              <div 
                key={paper._id} 
                className="bg-slate-800/30 p-6 md:p-8 rounded-2xl border border-slate-700/50 hover:border-teal-400/50 hover:bg-slate-800/50 transition-all duration-300 flex flex-col shadow-lg group h-full"
              >
                {/* Content Container (flex-grow pushes footer down) */}
                <div className="relative z-10 flex-grow">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-4 group-hover:text-teal-400 transition-colors leading-snug">
                    {paper.title}
                  </h3>
                  
                  {/* Meta Information */}
                  <div className="space-y-2 mb-6 text-sm text-slate-400 font-medium">
                    {paper.authors && (
                      <div className="flex items-start">
                        <Users className="h-4 w-4 mr-2.5 mt-0.5 flex-shrink-0 text-slate-500" />
                        <span>{paper.authors}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2.5 flex-shrink-0 text-slate-500" />
                      <span>{paper.venue} • {paper.year}</span>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 whitespace-pre-wrap">
                    {paper.summary}
                  </p>
                </div>

                {/* Footer: Keywords & Link */}
                <div className="relative z-10 mt-auto pt-6 border-t border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex flex-wrap gap-2">
                    {paper.keywords?.map((keyword, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-slate-900/80 border border-slate-700 rounded-md text-slate-300 text-xs font-mono">
                        {keyword}
                      </span>
                    ))}
                  </div>
                  
                  {paper.pdfLink && (
                    <a 
                      href={paper.pdfLink} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center justify-center px-5 py-2.5 bg-teal-400/10 text-teal-400 hover:bg-teal-400 hover:text-slate-900 rounded-lg text-sm font-bold transition-colors flex-shrink-0 w-full sm:w-auto"
                    >
                      <FileText className="w-4 h-4 mr-2" /> View PDF
                      <FaExternalLinkAlt className="w-3 h-3 ml-2.5" />
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}