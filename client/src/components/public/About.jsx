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
        const [profileRes, eduRes, expRes, skillsRes] = await Promise.all([
          api.get("/profile").catch(() => ({ data: {} })),
          api.get("/education").catch(() => ({ data: [] })),
          api.get("/experiences").catch(() => ({ data: [] })),
          api.get("/skills").catch(() => ({ data: [] }))
        ]);

        setProfile(profileRes.data);

        if (eduRes.data?.length > 0) setLatestEducation(eduRes.data[0]);
        if (expRes.data?.length > 0) setLatestExperience(expRes.data[0]);
        if (skillsRes.data?.length > 0) setTopSkills(skillsRes.data.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch data for About section");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  const highlightCards = [
    latestEducation && {
      icon: GraduationCap,
      title: "Current Education",
      content: (
        <>
          Pursuing <span className="text-teal-700 font-semibold">{latestEducation.degree}</span> at {latestEducation.institution}.
        </>
      ),
    },
    latestExperience && {
      icon: Briefcase,
      title: "Current Focus",
      content: (
        <>
          Working as a <span className="text-teal-700 font-semibold">{latestExperience.role}</span> at {latestExperience.company}.
        </>
      ),
    },
    topSkills.length > 0 && {
      icon: Code2,
      title: "Core Tech Stack",
      content: (
        <>
          Actively building with <span className="text-teal-700 font-semibold">{topSkills.map(s => s.name).join(", ")}</span>.
        </>
      ),
    },
  ].filter(Boolean);

  return (
    <section id="about" className="section-block section-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12 md:mb-16">
          <h2 className="section-heading">
            <span className="section-number">01.</span>
            About Me
            <div className="section-divider"></div>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-4/6"></div>
                </div>
              ) : (
                <p className="whitespace-pre-wrap text-lg leading-8">
                  {profile?.bio || "Bio information is currently unavailable."}
                </p>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-5">
            {highlightCards.map(({ icon: Icon, title, content }) => (
              <div
                key={title}
                className="surface-card p-6 hover:border-teal-200 group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-teal-50 rounded-xl text-teal-600 flex-shrink-0 group-hover:bg-teal-100 transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-semibold text-lg mb-2">{title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
