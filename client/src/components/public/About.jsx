import { useState, useEffect } from "react";
import { GraduationCap, Code2, Briefcase } from "lucide-react";
import api from "../../api/axiosinstance";

export default function About() {
  const [profile, setProfile] = useState(null);
  const [latestEducation, setLatestEducation] = useState(null);
  const [latestExperience, setLatestExperience] = useState(null);
  const [topSkills, setTopSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        // Fetch all necessary data in parallel for maximum performance
        const [profileRes, eduRes, expRes, skillsRes] = await Promise.all([
          api.get("/profile").catch(() => ({ data: {} })),
          api.get("/education").catch(() => ({ data: [] })),
          api.get("/experiences").catch(() => ({ data: [] })),
          api.get("/skills").catch(() => ({ data: [] }))
        ]);

        setProfile(profileRes.data);
        
        // Grab the first (most recent) item from arrays
        if (eduRes.data?.length > 0) setLatestEducation(eduRes.data[0]);
        if (expRes.data?.length > 0) setLatestExperience(expRes.data[0]);
        
        // Grab up to 4 skills to display dynamically
        if (skillsRes.data?.length > 0) setTopSkills(skillsRes.data.slice(0, 4));

      } catch (error) {
        console.error("Failed to fetch data for About section");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAboutData();
  }, []);

  return (
    <section id="about" className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 flex items-center">
            <span className="text-teal-400 font-mono text-xl md:text-2xl mr-3">01.</span> 
            About Me
            <div className="hidden md:block h-px bg-slate-700 w-64 ml-6"></div>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: The Story (Dynamic Bio) */}
          <div className="lg:col-span-7">
            <div className="prose prose-invert max-w-none text-slate-400 text-lg leading-relaxed space-y-6">
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-slate-800 rounded w-full"></div>
                  <div className="h-4 bg-slate-800 rounded w-5/6"></div>
                  <div className="h-4 bg-slate-800 rounded w-full"></div>
                  <div className="h-4 bg-slate-800 rounded w-4/6"></div>
                </div>
              ) : (
                <p className="whitespace-pre-wrap">
                  {profile?.bio || "Bio information is currently unavailable."}
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Dynamic Highlights from APIs */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Dynamic Education Card */}
            {latestEducation && (
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 hover:border-teal-400/30 transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-teal-400/10 rounded-lg text-teal-400 flex-shrink-0">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-slate-200 font-semibold text-lg mb-2">Current Education</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Pursuing <span className="text-teal-400">{latestEducation.degree}</span> at {latestEducation.institution}.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Dynamic Experience Card */}
            {latestExperience && (
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 hover:border-teal-400/30 transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-teal-400/10 rounded-lg text-teal-400 flex-shrink-0">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-slate-200 font-semibold text-lg mb-2">Current Focus</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Working as a <span className="text-teal-400">{latestExperience.role}</span> at {latestExperience.company}.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Dynamic Tech Stack Card */}
            {topSkills.length > 0 && (
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 hover:border-teal-400/30 transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-teal-400/10 rounded-lg text-teal-400 flex-shrink-0">
                    <Code2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-slate-200 font-semibold text-lg mb-2">Core Tech Stack</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Actively building with <span className="text-teal-400">{topSkills.map(s => s.name).join(", ")}</span>.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}