import { useState, useEffect } from "react";
import { ArrowLeft, Briefcase, Building, Layers, Hash, Award, Target, Lightbulb, Calendar } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosinstance";
import { Helmet } from "react-helmet-async";

export default function CaseStudyDetail() {
  const [caseStudy, setCaseStudy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchCaseStudy = async () => {
      try {
        const response = await api.get("/casestudies");
        const allCaseStudies = response.data || [];
        const foundCaseStudy = allCaseStudies.find((cs) => cs._id === id);
        setCaseStudy(foundCaseStudy || null);
      } catch (error) {
        console.error("Failed to fetch case study");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCaseStudy();
  }, [id]);

  if (isLoading) {
    return (
      <div className="site-shell">
        <main className="section-block">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-center items-center h-64">
              <div className="loading-spinner"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="site-shell">
        <main className="section-block">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center py-20">
              <Briefcase className="h-12 w-12 mx-auto mb-4 text-slate-400" />
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Case Study Not Found</h2>
              <Link
                to="/case-studies"
                className="inline-flex items-center mt-8 px-6 py-3 bg-teal-400 text-white font-semibold rounded-lg hover:bg-teal-500 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Case Studies
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="site-shell">
      <Helmet>
        <title>{caseStudy.title} | Case Study | Shivank Lavania</title>
        <meta name="description" content={`Case study for ${caseStudy.client}: ${caseStudy.title}`} />
        <link rel="canonical" href={`https://www.shivanklavania.in/case-studies/${caseStudy._id}`} />
      </Helmet>

      <main className="section-block">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-slate-600 hover:text-teal-600 font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Case Studies
            </button>
          </div>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
              <Building className="h-4 w-4" />
              <span>{caseStudy.client}</span>
              <span className="text-slate-300">•</span>
              <Layers className="h-4 w-4" />
              <span>{caseStudy.industry}</span>
              {caseStudy.createdAt && (
                <>
                  <span className="text-slate-300">•</span>
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(caseStudy.createdAt).toLocaleDateString()}</span>
                </>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              {caseStudy.title}
            </h1>

            {caseStudy.category && (
              <span className="inline-block px-3 py-1.5 bg-teal-100 text-teal-700 rounded-md text-sm font-semibold">
                {caseStudy.category}
              </span>
            )}
          </header>

          {/* Thumbnail */}
          {caseStudy.thumbnail && (
            <div className="w-full h-[400px] rounded-2xl overflow-hidden bg-slate-100 relative mb-12">
              <img
                src={caseStudy.thumbnail}
                alt={`${caseStudy.title} - case study featured image`}
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          )}

          {/* Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Problem */}
              {caseStudy.problem && (
                <section className="surface-card p-6 md:p-8">
                  <div className="flex items-center gap-3 text-red-700 font-bold text-lg mb-4">
                    <Target className="h-6 w-6" />
                    <h2>The Challenge</h2>
                  </div>
                  <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {caseStudy.problem}
                  </div>
                </section>
              )}

              {/* Solution */}
              {caseStudy.solution && (
                <section className="surface-card p-6 md:p-8">
                  <div className="flex items-center gap-3 text-blue-700 font-bold text-lg mb-4">
                    <Lightbulb className="h-6 w-6" />
                    <h2>The Solution</h2>
                  </div>
                  <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {caseStudy.solution}
                  </div>
                </section>
              )}

              {/* Result */}
              {caseStudy.result && (
                <section className="surface-card p-6 md:p-8">
                  <div className="flex items-center gap-3 text-green-700 font-bold text-lg mb-4">
                    <Award className="h-6 w-6" />
                    <h2>The Result</h2>
                  </div>
                  <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {caseStudy.result}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="surface-card p-6 sticky top-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                  <Hash className="h-5 w-5 mr-2 text-teal-600" />
                  Tech Stack
                </h3>
                {caseStudy.techStack && caseStudy.techStack.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="flex items-center text-sm font-semibold bg-slate-100 text-slate-700 px-3 py-2 rounded-md border border-slate-200"
                      >
                        <Hash className="h-3 w-3 mr-1.5 text-slate-500" />
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm">No tech stack specified.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
