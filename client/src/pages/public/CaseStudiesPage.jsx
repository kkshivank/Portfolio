import { useState, useEffect } from "react";
import { ArrowLeft, Briefcase, Building, Layers, Hash, Image as ImageIcon, Award, Target, Lightbulb, ArrowRight } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/axiosinstance";
import { Helmet } from "react-helmet-async";

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);

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

  // Extract unique categories dynamically from case studies
  const categories = ["All", ...new Set(caseStudies.map((cs) => cs.category).filter(Boolean))];

  // Handle URL query parameter for category
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams, categories]);

  // Filter case studies based on active category
  const filteredCaseStudies = activeCategory === "All"
    ? caseStudies
    : caseStudies.filter((cs) => cs.category === activeCategory);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      navigate("/case-studies");
    } else {
      navigate(`/case-studies?category=${category}`);
    }
  };

  const totalCaseStudies = caseStudies.length;

  return (
    <div className="site-shell">
      <Helmet>
        <title>Case Studies | Shivank Lavania</title>
        <meta name="description" content="Explore detailed case studies showcasing real-world projects, solutions, and results." />
        <link rel="canonical" href="https://www.shivanklavania.in/case-studies" />
      </Helmet>

      <main className="section-block">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <header className="mb-16 border-b border-slate-200 pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <div className="inline-flex items-center justify-center p-2.5 bg-teal-50 rounded-xl text-teal-600 mb-5 border border-teal-100">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-2">
                  Case Studies
                </h1>
                <p className="text-slate-600 text-sm md:text-base font-medium">
                  Real-world projects showcasing challenges, solutions, and measurable results.
                </p>
              </div>

              {!isLoading && caseStudies.length > 0 && (
                <div className="flex items-center gap-8 surface-card p-5 shrink-0">
                  <div className="flex flex-col">
                    <span className="text-3xl font-black text-teal-600">{totalCaseStudies}</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">Case Studies</span>
                  </div>
                </div>
              )}
            </div>

            {/* Category Filter Tabs */}
            {!isLoading && categories.length > 1 && (
              <div className="flex flex-wrap gap-2 mt-8">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeCategory === category
                        ? "bg-teal-400 text-white shadow-md"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </header>

          {/* Empty State */}
          {!isLoading && caseStudies.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-teal-50 rounded-full mb-6">
                <Briefcase className="h-12 w-12 text-teal-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Case Studies Coming Soon</h2>
              <p className="text-slate-600 text-lg max-w-md mx-auto">
                Check back later to see detailed case studies showcasing real-world projects and solutions.
              </p>
              <Link
                to="/"
                className="inline-flex items-center mt-8 px-6 py-3 bg-teal-400 text-white font-semibold rounded-lg hover:bg-teal-500 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </div>
          )}

          {/* Case Studies Grid */}
          {!isLoading && caseStudies.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCaseStudies.length === 0 ? (
                <div className="col-span-full text-center py-20 text-slate-500 surface-card border-dashed">
                  <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-30 text-teal-600" />
                  <p className="text-lg font-medium">No case studies found in this category.</p>
                </div>
              ) : (
                filteredCaseStudies.map((caseStudy, index) => (
                  <article
                    key={caseStudy._id}
                    onClick={() => navigate(`/case-studies/${caseStudy._id}`)}
                    className="surface-card-interactive p-5 flex flex-col group cursor-pointer h-full overflow-hidden"
                  >
                    {/* Thumbnail */}
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

                    {/* Client */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <Building className="h-3 w-3" />
                      <span>{caseStudy.client}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors leading-tight line-clamp-1">
                      {caseStudy.title}
                    </h2>

                    {/* Category Badge */}
                    {caseStudy.category && (
                      <span className="inline-block px-2.5 py-1 bg-teal-100 text-teal-700 rounded-md text-xs font-semibold mb-3">
                        {caseStudy.category}
                      </span>
                    )}

                    {/* Tech Stack (first 2 + count) */}
                    {caseStudy.techStack && caseStudy.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {caseStudy.techStack.slice(0, 2).map((tech, idx) => (
                          <span
                            key={idx}
                            className="flex items-center text-[11px] uppercase tracking-wider text-teal-700 font-semibold bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100"
                          >
                            <Hash className="h-3 w-3 mr-0.5" /> {tech}
                          </span>
                        ))}
                        {caseStudy.techStack.length > 2 && (
                          <span className="flex items-center text-[11px] uppercase tracking-wider text-slate-500 font-semibold bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                            +{caseStudy.techStack.length - 2}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Read More Button */}
                    <button className="mt-auto flex items-center text-teal-700 font-semibold text-sm group-hover:text-teal-800 transition-colors">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </article>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
