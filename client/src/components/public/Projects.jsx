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

        {/* Projects List */}
        <div className="space-y-24">
          {isLoading ? (
            [1, 2].map((skeleton) => (
              <div key={skeleton} className="flex flex-col lg:flex-row gap-8 animate-pulse">
                <div className="lg:w-7/12 h-64 md:h-96 bg-slate-800 rounded-xl"></div>
                <div className="lg:w-5/12 flex flex-col justify-center space-y-4">
                  <div className="h-4 bg-slate-800 w-1/4 rounded"></div>
                  <div className="h-8 bg-slate-800 w-3/4 rounded"></div>
                  <div className="h-24 bg-slate-800 w-full rounded"></div>
                  <div className="flex gap-2"><div className="h-6 bg-slate-800 w-16 rounded"></div></div>
                </div>
              </div>
            ))
          ) : (
            projects.map((project, index) => {
              // Alternate layouts: Even index images sit left, Odd sit right
              const isImageLeft = index % 2 === 0;

              return (
                <div 
                  key={project._id} 
                  className={`flex flex-col ${isImageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center group`}
                >
                  
                  {/* Project Visual Container */}
                  <div className="w-full lg:w-7/12 relative">
                    <div className="relative rounded-xl overflow-hidden aspect-video border border-slate-700/50 shadow-2xl group-hover:border-teal-400/30 transition-colors duration-500 bg-slate-950">
                      {/* Interactive responsive filter overlay */}
                      <div className="absolute inset-0 bg-teal-400/10 mix-blend-multiply group-hover:bg-transparent transition-all duration-500 z-10"></div>
                      
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FolderGit2 className="h-16 w-16 text-slate-700" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Project Informational Container */}
                  <div className={`w-full lg:w-5/12 flex flex-col ${isImageLeft ? 'lg:items-start lg:text-left' : 'lg:items-end lg:text-right'} relative z-20`}>
                    <p className="text-teal-400 font-mono text-sm mb-2 tracking-wide">Featured Project</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-100 mb-6 tracking-tight">{project.title}</h3>
                    
                    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 p-6 rounded-xl shadow-xl mb-6 text-slate-300 text-sm md:text-base leading-relaxed relative hover:border-slate-600/60 transition-colors">
                      {project.summary}
                    </div>

                    {/* Tech Stack List - Adjusted alignment vectors */}
                    {project.tech && project.tech.length > 0 && (
                      <ul className={`flex flex-wrap gap-2.5 mb-6 font-mono text-xs text-slate-400 ${isImageLeft ? 'justify-start' : 'justify-start lg:justify-end'}`}>
                        {project.tech.map((techItem, idx) => (
                          <li key={idx} className="bg-slate-950 px-3 py-1 rounded-md border border-slate-800 text-slate-300 font-medium">
                            {techItem}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Action Links using real brand definitions */}
                    <div className="flex items-center gap-5 text-slate-400">
                      {project.githubLink && (
                        <a 
                          href={project.githubLink} 
                          target="_blank" 
                          rel="noreferrer"
                          className="hover:text-teal-400 transition-colors flex items-center p-1 group/icon"
                          aria-label="Source Repository"
                        >
                          <FaGithub className="h-5 w-5 transform group-hover/icon:-translate-y-0.5 transition-transform" />
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
                          <FaExternalLinkAlt className="h-4 w-4 transform group-hover/icon:-translate-y-0.5 transition-transform" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}