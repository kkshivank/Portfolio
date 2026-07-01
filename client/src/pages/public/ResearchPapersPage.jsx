import { useState, useEffect } from "react";
import { ArrowLeft, BookOpen, Users, Calendar, FileText, Library } from "lucide-react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../api/axiosinstance";
import { Helmet } from "react-helmet-async";

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

  const totalPapers = papers.length;
  const latestYear = papers.length > 0
    ? Math.max(...papers.map(p => parseInt(p.year) || 0))
    : new Date().getFullYear();

  return (
    <div className="site-shell pb-24">
      <Helmet>
        <title>Research Papers | Shivank Lavania</title>
        <meta name="description" content="Explore research papers by Shivank Lavania on technology, education and software development." />
        <meta property="og:title" content="Research Papers | Shivank Lavania" />
        <meta property="og:description" content="Explore research papers by Shivank Lavania on technology, education and software development." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.shivanklavania.in/research-papers" />
        <link rel="canonical" href="https://www.shivanklavania.in/research-papers" />
      </Helmet>

      <nav className="page-nav">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center px-3 py-2 -ml-3 text-sm font-semibold text-slate-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-all group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="hidden sm:flex items-center gap-3">
            <span className="text-sm font-mono text-teal-700 flex items-center font-semibold">
              <Library className="h-3.5 w-3.5 mr-1.5" /> Research Archive
            </span>
          </div>
        </div>
      </nav>

      <main className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <header className="mb-16 border-b border-slate-200 pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <div className="inline-flex items-center justify-center p-2.5 bg-teal-50 rounded-xl text-teal-600 mb-5 border border-teal-100">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-2">
                  Research Papers
                </h1>
                <p className="text-slate-600 text-sm md:text-base font-medium">
                  Peer-reviewed publications and technical contributions.
                </p>
              </div>

              {!isLoading && papers.length > 0 && (
                <div className="flex items-center gap-8 surface-card p-5">
                  <div className="flex flex-col">
                    <span className="text-3xl font-black text-teal-600">{totalPapers}</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">Publications</span>
                  </div>
                  <div className="w-px h-10 bg-slate-200"></div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-black text-slate-800">{latestYear > 0 ? latestYear : "—"}</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">Latest Year</span>
                  </div>
                </div>
              )}
            </div>
          </header>

          <div className="space-y-10">
            {isLoading ? (
              [1, 2, 3].map((skeleton) => (
                <div key={skeleton} className="animate-pulse surface-card p-8">
                  <div className="h-8 bg-slate-200 w-3/4 rounded mb-5"></div>
                  <div className="flex gap-4 mb-6">
                    <div className="h-4 bg-slate-200 w-1/4 rounded"></div>
                    <div className="h-4 bg-slate-200 w-1/4 rounded"></div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="h-3 bg-slate-200 w-full rounded"></div>
                    <div className="h-3 bg-slate-200 w-full rounded"></div>
                    <div className="h-3 bg-slate-200 w-5/6 rounded"></div>
                  </div>
                  <div className="h-10 bg-slate-200 w-32 rounded-lg"></div>
                </div>
              ))
            ) : papers.length === 0 ? (
              <div className="text-center py-20 text-slate-500 surface-card border-dashed">
                <Library className="h-12 w-12 mx-auto mb-4 opacity-30 text-teal-600" />
                <p className="text-lg font-medium">No research papers published yet.</p>
              </div>
            ) : (
              papers.map((paper) => (
                <article
                  key={paper._id}
                  className="group surface-card p-8 hover:border-teal-200 transition-all duration-300"
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5 leading-tight group-hover:text-teal-700 transition-colors">
                    {paper.title}
                  </h2>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-8 text-sm font-medium text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {paper.authors && (
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-teal-600" />
                        <span>{paper.authors}</span>
                      </div>
                    )}
                    {paper.authors && <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300"></div>}
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-teal-600" />
                      <span>{paper.venue} • {paper.year}</span>
                    </div>
                  </div>

                  <div className="mb-10">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center">
                      <span className="w-4 h-[1px] bg-teal-400 mr-2"></span> Abstract
                    </h3>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                      {paper.summary}
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-slate-100">
                    <div className="flex flex-wrap gap-2">
                      {paper.keywords?.map((keyword, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-teal-50 border border-teal-100 rounded-lg text-teal-700 text-xs font-mono tracking-wide"
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
                        className="inline-flex items-center justify-center px-5 py-2.5 bg-teal-600 text-white hover:bg-teal-700 rounded-xl text-sm font-bold transition-transform hover:-translate-y-0.5 shadow-md shadow-teal-600/20 flex-shrink-0"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Read Full Paper
                        <FaExternalLinkAlt className="w-3 h-3 ml-2.5 opacity-80" />
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
