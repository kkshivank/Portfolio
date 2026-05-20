import { useState, useEffect } from "react";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import api from "../../api/axiosinstance";

export default function ExperienceEducation() {
  const [activeTab, setActiveTab] = useState("experience"); // 'experience' or 'education'
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

  // Hides the entire section gracefully if your backend database collections are entirely unpopulated
  if (!isLoading && experiences.length === 0 && education.length === 0) return null;

  return (
    <section id="experience" className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 flex items-center">
            <span className="text-teal-400 font-mono text-xl md:text-2xl mr-3">04.</span> 
            Where I've Been
            <div className="hidden md:block h-px bg-slate-700 flex-grow ml-6"></div>
          </h2>
        </div>

        {/* Custom Tab Selectors */}
        <div className="flex space-x-4 mb-12 border-b border-slate-800">
          <button
            onClick={() => setActiveTab("experience")}
            className={`pb-4 px-2 md:px-4 flex items-center gap-2 font-semibold text-sm md:text-base transition-colors relative ${
              activeTab === "experience" ? "text-teal-400" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Briefcase className="w-4 h-4 md:w-5 md:h-5" />
            Experience
            {activeTab === "experience" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-400 rounded-t-md"></span>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab("education")}
            className={`pb-4 px-2 md:px-4 flex items-center gap-2 font-semibold text-sm md:text-base transition-colors relative ${
              activeTab === "education" ? "text-teal-400" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <GraduationCap className="w-4 h-4 md:w-5 md:h-5" />
            Education
            {activeTab === "education" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-400 rounded-t-md"></span>
            )}
          </button>
        </div>

        {/* Timeline Dynamic Track */}
        <div className="relative border-l-2 border-slate-800 ml-2 md:ml-4">
          {isLoading ? (
            <div className="pl-6 md:pl-10 mb-8 animate-pulse">
              <div className="h-6 bg-slate-800 w-1/3 rounded mb-2"></div>
              <div className="h-4 bg-slate-800 w-1/4 rounded mb-4"></div>
              <div className="h-24 bg-slate-800 w-full rounded-xl"></div>
            </div>
          ) : activeData.length === 0 ? (
            // Empty State view parameters
            <div className="pl-6 md:pl-10 py-6 text-slate-500 font-mono text-sm">
              No entries found for this category.
            </div>
          ) : (
            activeData.map((item) => (
              <div key={item._id} className="mb-10 relative pl-6 md:pl-10 group">
                
                {/* Micro Node Anchor */}
                <div className="absolute -left-[7px] md:-left-[9px] top-1.5 h-3 w-3 md:h-4 md:w-4 rounded-full bg-slate-900 border-2 border-slate-700 group-hover:border-teal-400 transition-colors duration-300 z-10"></div>

                {/* Information Card Container */}
                <div className="bg-slate-800/20 p-5 md:p-7 rounded-xl border border-slate-800/80 hover:border-slate-700/60 hover:bg-slate-800/30 transition-all duration-300 shadow-md">
                  <h3 className="text-lg md:text-xl font-bold text-slate-100 mb-1.5 tracking-tight">
                    {activeTab === "experience" ? item.role : item.degree}
                  </h3>
                  
                  {/* Dynamic Metadata Alignment Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 mb-4 text-xs md:text-sm font-medium">
                    <span className="text-teal-400 tracking-wide">
                      {activeTab === "experience" ? item.company : item.institution}
                    </span>
                    <span className="hidden sm:inline text-slate-700">•</span>
                    <span className="text-slate-400 flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                      {item.period}
                    </span>
                  </div>
                  
                  {item.description && (
                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed whitespace-pre-wrap">
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