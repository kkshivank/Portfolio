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

  if (!isLoading && projects.length === 0) return null;

  return (
    <section id="projects" className="section-block section-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="section-heading">
            <span className="section-number">03.</span>
            Featured Projects
            <div className="section-divider"></div>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {isLoading ? (
            [1, 2, 3].map((skeleton) => (
              <div key={skeleton} className="surface-card p-8 h-80 animate-pulse flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="h-10 w-10 bg-slate-200 rounded-full"></div>
                    <div className="h-6 w-16 bg-slate-200 rounded"></div>
                  </div>
                  <div className="h-8 bg-slate-200 w-3/4 rounded mb-4"></div>
                  <div className="h-16 bg-slate-200 w-full rounded"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-6 bg-slate-200 w-16 rounded"></div>
                  <div className="h-6 bg-slate-200 w-16 rounded"></div>
                </div>
              </div>
            ))
          ) : (
            projects.map((project) => (
              <div
                key={project._id}
                className="surface-card-interactive p-6 md:p-8 flex flex-col justify-between group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-2.5 bg-teal-50 rounded-xl text-teal-600">
                    <FolderGit2 className="h-8 w-8" />
                  </div>

                  <div className="flex items-center gap-3 text-slate-400">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg hover:bg-slate-50 hover:text-teal-600 transition-colors"
                        aria-label="Source Repository"
                      >
                        <FaGithub className="h-5 w-5" />
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg hover:bg-slate-50 hover:text-teal-600 transition-colors"
                        aria-label="Live Production Deployment"
                      >
                        <FaExternalLinkAlt className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="mb-6 flex-grow">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-teal-700 transition-colors">
                    {project.title}
                  </h3>

                  <div className="text-slate-600 text-sm md:text-base leading-relaxed">
                    {project.summary}
                  </div>
                </div>

                {project.tech && project.tech.length > 0 && (
                  <ul className="flex flex-wrap gap-x-3 gap-y-2 font-mono text-xs text-teal-700/80 mt-auto pt-4 border-t border-slate-100">
                    {project.tech.map((techItem, idx) => (
                      <li key={idx} className="px-2 py-1 bg-teal-50 rounded-md">
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
