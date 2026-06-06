import { useState, useEffect } from "react";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import api from "../../api/axiosinstance";

export default function ExperienceEducation() {
  const [activeTab, setActiveTab] = useState("experience");
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const [expRes, eduRes] = await Promise.all([
          api.get("/experiences").catch(() => ({ data: [] })),
          api.get("/education").catch(() => ({ data: [] }))
        ]);

        setExperiences(expRes.data || []);
        setEducation(eduRes.data || []);
      } catch (error) {
        console.error("Failed to fetch history datasets");
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const activeData = activeTab === "experience" ? experiences : education;

  if (!isLoading && experiences.length === 0 && education.length === 0) return null;

  return (
    <section id="experience" className="section-block section-muted border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="section-heading">
            <span className="section-number">04.</span>
            Where I've Been
            <div className="section-divider flex-grow max-w-none"></div>
          </h2>
        </div>

        <div className="flex space-x-2 mb-12 p-1.5 bg-white rounded-xl border border-slate-200 shadow-sm w-fit">
          <button
            onClick={() => setActiveTab("experience")}
            className={`px-4 md:px-6 py-2.5 flex items-center gap-2 font-semibold text-sm md:text-base rounded-lg transition-all ${
              activeTab === "experience"
                ? "bg-teal-600 text-white shadow-md"
                : "text-slate-600 hover:text-teal-700 hover:bg-teal-50"
            }`}
          >
            <Briefcase className="w-4 h-4 md:w-5 md:h-5" />
            Experience
          </button>

          <button
            onClick={() => setActiveTab("education")}
            className={`px-4 md:px-6 py-2.5 flex items-center gap-2 font-semibold text-sm md:text-base rounded-lg transition-all ${
              activeTab === "education"
                ? "bg-teal-600 text-white shadow-md"
                : "text-slate-600 hover:text-teal-700 hover:bg-teal-50"
            }`}
          >
            <GraduationCap className="w-4 h-4 md:w-5 md:h-5" />
            Education
          </button>
        </div>

        <div className="relative border-l-2 border-teal-200 ml-2 md:ml-4">
          {isLoading ? (
            <div className="pl-6 md:pl-10 mb-8 animate-pulse">
              <div className="h-6 bg-slate-200 w-1/3 rounded mb-2"></div>
              <div className="h-4 bg-slate-200 w-1/4 rounded mb-4"></div>
              <div className="h-24 bg-slate-200 w-full rounded-xl"></div>
            </div>
          ) : activeData.length === 0 ? (
            <div className="pl-6 md:pl-10 py-6 text-slate-500 font-mono text-sm">
              No entries found for this category.
            </div>
          ) : (
            activeData.map((item) => (
              <div key={item._id} className="mb-10 relative pl-6 md:pl-10 group">
                <div className="absolute -left-[7px] md:-left-[9px] top-1.5 h-3 w-3 md:h-4 md:w-4 rounded-full bg-white border-[3px] border-teal-400 group-hover:border-teal-600 group-hover:scale-110 transition-all duration-300 z-10 shadow-sm"></div>

                <div className="surface-card p-5 md:p-7 hover:border-teal-200">
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1.5 tracking-tight">
                    {activeTab === "experience" ? item.role : item.degree}
                  </h3>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 mb-4 text-xs md:text-sm font-medium">
                    <span className="text-teal-700 tracking-wide font-semibold">
                      {activeTab === "experience" ? item.company : item.institution}
                    </span>

                    {activeTab === "education" && (
                      <>
                        <span className="hidden sm:inline text-slate-300">•</span>
                        <span className="text-slate-500 flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                          {item.period}
                        </span>
                      </>
                    )}
                  </div>

                  {item.description && (
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed whitespace-pre-wrap">
                      {item.description}
                    </p>
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
