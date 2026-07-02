import { useState, useEffect } from "react";
import { ArrowLeft, Briefcase, Building, Layers, Hash, Image as ImageIcon, Award, Target, Lightbulb } from "lucide-react";
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredCaseStudies.length === 0 ? (
                <div className="col-span-full text-center py-20 text-slate-500 surface-card border-dashed">
                  <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-30 text-teal-600" />
                  <p className="text-lg font-medium">No case studies found in this category.</p>
                </div>
              ) : (
                filteredCaseStudies.map((caseStudy) => (
                  <article
                    key={caseStudy._id}
                    className="surface-card-interactive p-6 md:p-8 flex flex-col gap-6"
                  >
                    {/* Thumbnail */}
                    {caseStudy.thumbnail && (
                      <div className="w-full h-48 rounded-xl overflow-hidden bg-slate-100 relative shrink-0">
                        <img
                          src={caseStudy.thumbnail}
                          alt={`${caseStudy.title} - case study thumbnail`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* Header */}
                    <div>
                      <div className="flex items-center gap-3 text-xs md:text-sm font-medium text-slate-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Building className="h-3.5 w-3.5" />
                          <span>{caseStudy.client}</span>
                        </div>
                        <span className="text-slate-300">•</span>
                        <div className="flex items-center gap-1">
                          <Layers className="h-3.5 w-3.5" />
                          <span>{caseStudy.industry}</span>
                        </div>
                      </div>

                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 leading-tight">
                        {caseStudy.title}
                      </h2>

                      {caseStudy.category && (
                        <span className="inline-block px-2.5 py-1 bg-teal-100 text-teal-700 rounded-md text-xs font-semibold mb-4">
                          {caseStudy.category}
                        </span>
                      )}
                    </div>

                    {/* Problem */}
                    {caseStudy.problem && (
                      <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-red-700 font-semibold text-sm mb-2">
                          <Target className="h-4 w-4" />
                          Challenge
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed line-clamp-3">
                          {caseStudy.problem}
                        </p>
                      </div>
                    )}

                    {/* Solution */}
                    {caseStudy.solution && (
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm mb-2">
                          <Lightbulb className="h-4 w-4" />
                          Solution
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed line-clamp-3">
                          {caseStudy.solution}
                        </p>
                      </div>
                    )}

                    {/* Result */}
                    {caseStudy.result && (
                      <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-green-700 font-semibold text-sm mb-2">
                          <Award className="h-4 w-4" />
                          Result
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed line-clamp-2">
                          {caseStudy.result}
                        </p>
                      </div>
                    )}

                    {/* Tech Stack */}
                    {caseStudy.techStack && caseStudy.techStack.length > 0 && (
                      <div className="pt-4 border-t border-slate-100">
                        <div className="flex flex-wrap gap-2">
                          {caseStudy.techStack.map((tech, idx) => (
                            <span
                              key={idx}
                              className="flex items-center text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200"
                            >
                              <Hash className="h-3 w-3 mr-1 text-slate-500" />
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
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
