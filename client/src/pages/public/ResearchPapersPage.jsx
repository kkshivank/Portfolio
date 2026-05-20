import { useState, useEffect } from "react";
import { ArrowLeft, BookOpen, Users, Calendar, FileText, Library } from "lucide-react";
import { FaExternalLinkAlt } from "react-icons/fa";
import api from "../../api/axiosinstance";

export default function ResearchPapersPage() {
  const [papers, setPapers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
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

  // Calculate dynamic stats for the header
  const totalPapers = papers.length;
  const latestYear = papers.length > 0 
    ? Math.max(...papers.map(p => parseInt(p.year) || 0)) 
    : new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-teal-400/30 selection:text-teal-200 font-sans">
      
      {/* Enhanced Sticky Top Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a 
            href="/" 
            className="flex items-center px-3 py-2 -ml-3 text-sm font-semibold text-slate-300 hover:text-teal-400 hover:bg-slate-900 rounded-lg transition-all group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </a>
          
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-sm font-medium text-slate-400">Gauri Shankar Rawat</span>
            <span className="h-4 w-px bg-slate-700"></span>
            <span className="text-sm font-mono text-teal-400 flex items-center">
              <Library className="h-3.5 w-3.5 mr-1.5" /> Archive
            </span>
          </div>
        </div>
      </nav>

      <main className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          
          {/* Data-Driven Page Header */}
          <header className="mb-16 border-b border-slate-800 pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              
              <div>
                <div className="inline-flex items-center justify-center p-2.5 bg-teal-400/10 rounded-xl text-teal-400 mb-5 border border-teal-400/20 shadow-[0_0_15px_rgba(45,212,191,0.1)]">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 tracking-tight mb-2">
                  Research Papers
                </h1>
                <p className="text-slate-400 text-sm md:text-base font-medium">
                  Peer-reviewed publications and technical contributions.
                </p>
              </div>

              {/* Dynamic Stats Row */}
              {!isLoading && papers.length > 0 && (
                <div className="flex items-center gap-8 bg-slate-900/50 p-5 rounded-2xl border border-slate-800">
                  <div className="flex flex-col">
                    <span className="text-3xl font-black text-teal-400">{totalPapers}</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Publications</span>
                  </div>
                  <div className="w-px h-10 bg-slate-700"></div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-black text-slate-200">{latestYear > 0 ? latestYear : "—"}</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Latest Year</span>
                  </div>
                </div>
              )}
            </div>
          </header>

          {/* Research Papers Vertical List */}
          <div className="space-y-16">
            {isLoading ? (
              [1, 2, 3].map((skeleton) => (
                <div key={skeleton} className="animate-pulse">
                  <div className="h-8 bg-slate-800 w-3/4 rounded mb-5"></div>
                  <div className="flex gap-4 mb-6">
                    <div className="h-4 bg-slate-800 w-1/4 rounded"></div>
                    <div className="h-4 bg-slate-800 w-1/4 rounded"></div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="h-3 bg-slate-800 w-full rounded"></div>
                    <div className="h-3 bg-slate-800 w-full rounded"></div>
                    <div className="h-3 bg-slate-800 w-5/6 rounded"></div>
                  </div>
                  <div className="h-10 bg-slate-800 w-32 rounded-lg"></div>
                </div>
              ))
            ) : papers.length === 0 ? (
              <div className="text-center py-20 text-slate-500 bg-slate-900/30 rounded-3xl border border-slate-800/50 border-dashed">
                <Library className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p className="text-lg font-medium">No research papers published yet.</p>
              </div>
            ) : (
              papers.map((paper) => (
                <article 
                  key={paper._id} 
                  className="group relative bg-slate-900/20 p-8 rounded-3xl border border-slate-800 hover:bg-slate-900/40 hover:border-slate-700 transition-all duration-300"
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-5 leading-tight group-hover:text-teal-400 transition-colors">
                    {paper.title}
                  </h2>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-8 text-sm font-medium text-slate-400 bg-slate-950/50 p-3 rounded-lg border border-slate-800/50 inline-flex">
                    {paper.authors && (
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-teal-400/70" />
                        <span>{paper.authors}</span>
                      </div>
                    )}
                    {paper.authors && <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-700"></div>}
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-teal-400/70" />
                      <span>{paper.venue} • {paper.year}</span>
                    </div>
                  </div>

                  <div className="prose prose-invert prose-slate max-w-none mb-10">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center">
                      <span className="w-4 h-[1px] bg-slate-600 mr-2"></span> Abstract
                    </h3>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                      {paper.summary}
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-slate-800">
                    <div className="flex flex-wrap gap-2">
                      {paper.keywords?.map((keyword, idx) => (
                        <span 
                          key={idx} 
                          className="px-2.5 py-1 bg-slate-950 border border-slate-700/60 rounded text-slate-400 text-xs font-mono tracking-wide"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                    
                    {paper.pdfLink && (
                      <a 
                        href={paper.pdfLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center justify-center px-5 py-2.5 bg-teal-400 text-slate-950 hover:bg-teal-300 rounded-lg text-sm font-bold transition-transform hover:-translate-y-0.5 shadow-[0_0_20px_rgba(45,212,191,0.2)] flex-shrink-0"
                      >
                        <FileText className="w-4 h-4 mr-2" /> 
                        Read Full Paper
                        <FaExternalLinkAlt className="w-3 h-3 ml-2.5 opacity-70" />
                      </a>
                    )}
                  </div>
                </article>
              ))
            )}
          </div>

        </div>
      </main>
    </div>
  );
}