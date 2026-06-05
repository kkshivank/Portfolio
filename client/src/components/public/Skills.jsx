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

  const getCategoryIcon = (categoryName) => {
    const name = categoryName.toLowerCase();
    if (name.includes("front") || name.includes("ui") || name.includes("design")) return <Layout className="h-6 w-6 text-teal-600" />;
    if (name.includes("back") || name.includes("server")) return <Server className="h-6 w-6 text-teal-600" />;
    if (name.includes("data") || name.includes("base")) return <Database className="h-6 w-6 text-teal-600" />;
    if (name.includes("tool") || name.includes("devops")) return <Wrench className="h-6 w-6 text-teal-600" />;
    return <Code className="h-6 w-6 text-teal-600" />;
  };

  if (!isLoading && Object.keys(skillsGrouped).length === 0) return null;

  return (
    <section id="skills" className="section-block section-muted border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12 md:mb-16">
          <h2 className="section-heading">
            <span className="section-number">02.</span>
            Technical Stack
            <div className="section-divider"></div>
          </h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {[1, 2, 3, 4].map((skeleton) => (
              <div key={skeleton} className="surface-card p-8 animate-pulse">
                <div className="h-6 bg-slate-200 rounded w-1/3 mb-6"></div>
                <div className="flex flex-wrap gap-3">
                  <div className="h-10 bg-slate-200 rounded-lg w-24"></div>
                  <div className="h-10 bg-slate-200 rounded-lg w-32"></div>
                  <div className="h-10 bg-slate-200 rounded-lg w-20"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {Object.keys(skillsGrouped).map((category) => (
              <div key={category} className="surface-card p-8 hover:border-teal-200">
                <div className="flex items-center mb-6">
                  <div className="p-2.5 bg-teal-50 rounded-xl mr-4 border border-teal-100">
                    {getCategoryIcon(category)}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-wide">{category}</h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {skillsGrouped[category].map((skill) => (
                    <div
                      key={skill._id}
                      className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm font-medium hover:text-teal-700 hover:border-teal-200 hover:bg-teal-50/50 transition-all duration-300 cursor-default"
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
