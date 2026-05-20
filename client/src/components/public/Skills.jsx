import { useState, useEffect } from "react";
import { Layout, Server, Database, Wrench, Code } from "lucide-react";
import api from "../../api/axiosinstance";

export default function Skills() {
  const [skillsGrouped, setSkillsGrouped] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get("/skills");
        
        if (response.data && response.data.length > 0) {
          // Group skills by category dynamically from API
          const grouped = response.data.reduce((acc, skill) => {
            if (!acc[skill.category]) acc[skill.category] = [];
            acc[skill.category].push(skill);
            return acc;
          }, {});
          setSkillsGrouped(grouped);
        }
      } catch (error) {
        console.error("Failed to fetch skills");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // Helper to assign a specific icon based on category name
  const getCategoryIcon = (categoryName) => {
    const name = categoryName.toLowerCase();
    if (name.includes("front") || name.includes("ui") || name.includes("design")) return <Layout className="h-6 w-6 text-teal-400" />;
    if (name.includes("back") || name.includes("server")) return <Server className="h-6 w-6 text-teal-400" />;
    if (name.includes("data") || name.includes("base")) return <Database className="h-6 w-6 text-teal-400" />;
    if (name.includes("tool") || name.includes("devops")) return <Wrench className="h-6 w-6 text-teal-400" />;
    return <Code className="h-6 w-6 text-teal-400" />; // Default icon
  };

  // Do not render the section if there is no data and it has finished loading
  if (!isLoading && Object.keys(skillsGrouped).length === 0) return null;

  return (
    <section id="skills" className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 flex items-center">
            <span className="text-teal-400 font-mono text-xl md:text-2xl mr-3">02.</span> 
            Technical Stack
            <div className="hidden md:block h-px bg-slate-700 w-64 ml-6"></div>
          </h2>
        </div>

        {isLoading ? (
          // Restored original skeleton sizing
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {[1, 2, 3, 4].map((skeleton) => (
              <div key={skeleton} className="bg-slate-800/20 p-8 rounded-2xl border border-slate-700/50 animate-pulse">
                <div className="h-6 bg-slate-700 rounded w-1/3 mb-6"></div>
                <div className="flex flex-wrap gap-3">
                  <div className="h-10 bg-slate-700 rounded-lg w-24"></div>
                  <div className="h-10 bg-slate-700 rounded-lg w-32"></div>
                  <div className="h-10 bg-slate-700 rounded-lg w-20"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* items-start prevents unequal cards from stretching and creating empty vertical space */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {Object.keys(skillsGrouped).map((category) => (
              <div 
                key={category} 
                className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-colors duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="p-2 bg-slate-900 rounded-lg mr-4 border border-slate-700">
                    {getCategoryIcon(category)}
                  </div>
                  <h3 className="text-xl font-bold text-slate-200 tracking-wide">{category}</h3>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {skillsGrouped[category].map((skill) => (
                    <div 
                      key={skill._id} 
                      className="px-4 py-2 bg-slate-900/80 border border-slate-700 rounded-lg text-slate-300 text-sm font-medium hover:text-teal-400 hover:border-teal-400/50 transition-all duration-300 cursor-default"
                    >
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}