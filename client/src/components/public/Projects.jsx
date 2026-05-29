import { useState, useEffect } from "react";
import { FolderGit2 } from "lucide-react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import api from "../../api/axiosinstance";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects");
        if (response.data && response.data.length > 0) {
          setProjects(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch projects");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Do not render the section if there are no live projects found after loading
  if (!isLoading && projects.length === 0) return null;

  return (
    <section id="projects" className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 flex items-center">
            <span className="text-teal-400 font-mono text-xl md:text-2xl mr-3">03.</span> 
            Featured Projects
            <div className="hidden md:block h-px bg-slate-700 w-64 ml-6"></div>
          </h2>
        </div>

        {/* Projects Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {isLoading ? (
            // Skeleton Loader adapted for grid
            [1, 2, 3].map((skeleton) => (
              <div key={skeleton} className="bg-slate-800/30 p-8 rounded-xl h-80 animate-pulse border border-slate-700/50 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="h-10 w-10 bg-slate-700 rounded-full"></div>
                    <div className="h-6 w-16 bg-slate-700 rounded"></div>
                  </div>
                  <div className="h-8 bg-slate-700 w-3/4 rounded mb-4"></div>
                  <div className="h-16 bg-slate-700 w-full rounded"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-6 bg-slate-700 w-16 rounded"></div>
                  <div className="h-6 bg-slate-700 w-16 rounded"></div>
                </div>
              </div>
            ))
          ) : (
            projects.map((project) => (
              <div 
                key={project._id} 
                className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 p-6 md:p-8 rounded-xl shadow-xl flex flex-col justify-between hover:border-teal-400/50 hover:-translate-y-2 transition-all duration-300 group"
              >
                
                {/* Top Row: Icon & Links */}
                <div className="flex justify-between items-start mb-6">
                  <div className="text-teal-400">
                    <FolderGit2 className="h-10 w-10" />
                  </div>
                  
                  {/* Action Links */}
                  <div className="flex items-center gap-4 text-slate-400">
                    {project.githubLink && (
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="hover:text-teal-400 transition-colors flex items-center p-1 group/icon"
                        aria-label="Source Repository"
                      >
                        <FaGithub className="h-[22px] w-[22px] transform group-hover/icon:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                    {project.liveLink && (
                      <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="hover:text-teal-400 transition-colors flex items-center p-1 group/icon"
                        aria-label="Live Production Deployment"
                      >
                        <FaExternalLinkAlt className="h-5 w-5 transform group-hover/icon:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Main Content */}
                <div className="mb-6 flex-grow">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-3 tracking-tight group-hover:text-teal-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <div className="text-slate-300 text-sm md:text-base leading-relaxed">
                    {project.summary}
                  </div>
                </div>

                {/* Tech Stack List (Pushed to bottom) */}
                {project.tech && project.tech.length > 0 && (
                  <ul className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-slate-500 mt-auto">
                    {project.tech.map((techItem, idx) => (
                      <li key={idx}>
                        {techItem}
                      </li>
                    ))}
                  </ul>
                )}

              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}