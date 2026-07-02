import { useState, useEffect } from "react";
import { ArrowRight, Briefcase, Building, Layers, Hash, Image as ImageIcon } from "lucide-react";
import api from "../../api/axiosinstance";
import { useNavigate } from "react-router-dom";

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const response = await api.get("/casestudies");
        setCaseStudies(response.data || []);
      } catch (error) {
        console.error("Failed to fetch case studies");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCaseStudies();
  }, []);

  // Hide section completely if no case studies exist
  if (!isLoading && caseStudies.length === 0) return null;

  return (
    <section id="case-studies" className="section-block section-muted border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="section-heading">
              <span className="section-number">07.</span>
              Case Studies
            </h2>
          </div>

          <button
            onClick={() => navigate("/case-studies")}
            className="flex items-center text-teal-700 hover:text-teal-800 font-semibold group transition-colors whitespace-nowrap px-4 py-2 rounded-xl hover:bg-teal-50"
          >
            View All Case Studies
            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            [1, 2, 3].map((skeleton) => (
              <div key={skeleton} className="surface-card p-5 animate-pulse flex flex-col h-full">
                <div className="h-[180px] w-full bg-slate-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-slate-200 w-1/2 rounded mb-2"></div>
                <div className="h-6 bg-slate-200 w-3/4 rounded mb-3"></div>
                <div className="h-5 bg-slate-200 w-1/3 rounded mb-3"></div>
                <div className="mt-auto pt-4 flex gap-2 border-t border-slate-100">
                  <div className="h-5 w-16 bg-slate-200 rounded-md"></div>
                  <div className="h-5 w-20 bg-slate-200 rounded-md"></div>
                </div>
              </div>
            ))
          ) : (
            caseStudies.slice(0, 3).map((caseStudy, index) => (
              <div
                key={caseStudy._id}
                onClick={() => navigate(`/case-studies/${caseStudy._id}`)}
                className="surface-card-interactive p-5 flex flex-col group cursor-pointer h-full overflow-hidden"
              >
                <div className="w-full h-[180px] rounded-xl overflow-hidden bg-slate-100 relative flex-shrink-0 mb-4">
                  {caseStudy.thumbnail ? (
                    <img
                      src={caseStudy.thumbnail}
                      alt={`${caseStudy.title} - case study thumbnail`}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : undefined}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 bg-gradient-to-br from-slate-50 to-teal-50">
                      <Briefcase className="h-10 w-10 opacity-40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <Building className="h-3 w-3" />
                  <span>{caseStudy.client}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors leading-tight line-clamp-1">
                  {caseStudy.title}
                </h3>

                {caseStudy.category && (
                  <span className="inline-block px-2.5 py-1 bg-teal-100 text-teal-700 rounded-md text-xs font-semibold mb-3">
                    {caseStudy.category}
                  </span>
                )}

                <div className="mt-auto pt-4 flex flex-wrap gap-2 border-t border-slate-100">
                  {caseStudy.techStack?.slice(0, 2).map((tech, idx) => (
                    <span key={idx} className="flex items-center text-[11px] uppercase tracking-wider text-teal-700 font-semibold bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100">
                      <Hash className="h-3 w-3 mr-0.5" /> {tech}
                    </span>
                  ))}
                  {caseStudy.techStack?.length > 2 && (
                    <span className="flex items-center text-[11px] uppercase tracking-wider text-slate-500 font-semibold bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                      +{caseStudy.techStack.length - 2}
                    </span>
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
