import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import api from "../../api/axiosinstance";
import Typewriter from "typewriter-effect";

export default function Hero() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile");
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile for hero section");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const getTagline = (bio) => {
    if (!bio) return "";
    const firstSentence = bio.split(".")[0];
    return firstSentence + (firstSentence.length > 0 ? "." : "");
  };

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center hero-gradient">
        <div className="loading-spinner"></div>
      </section>
    );
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-6 lg:px-8 overflow-hidden hero-gradient"
    >
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-sky-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center z-10">
        <div className="flex flex-col items-start text-left order-2 lg:order-1 animate-fade-in-up">
          <span className="badge-accent mb-4">Hi there, I am</span>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-4 leading-[1.1]">
            {profile?.name}
          </h1>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-500 mb-6 leading-snug">
            <Typewriter
  options={{
    strings: [profile?.role || "Developer", "Learner", "Teacher"],
    autoStart: true,
    loop: true,
  }}
/>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 max-w-xl mb-10 leading-relaxed">
            {getTagline(profile?.bio)}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto">
            <a href="#projects" className="btn-primary">
              View My Work
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>

            <a href="#contact" className="btn-secondary">
              Contact Me
            </a>
          </div>

          <div className="flex items-center gap-5 pl-1">
            {profile?.githubLink && (
              <a
                href={profile.githubLink}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-teal-600 hover:border-teal-200 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
                aria-label="GitHub Profile"
              >
                <FaGithub className="h-6 w-6" />
              </a>
            )}

            {profile?.linkedinLink && (
              <a
                href={profile.linkedinLink}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-teal-600 hover:border-teal-200 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
            )}

            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-teal-600 hover:border-teal-200 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
                aria-label="Email Me"
              >
                <FaEnvelope className="h-6 w-6" />
              </a>
            )}
          </div>
        </div>

        <div className="flex justify-center lg:justify-end items-center order-1 lg:order-2">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
            <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-teal-400/30 via-sky-300/20 to-teal-200/30 blur-md"></div>
            <div className="absolute inset-0 rounded-full border-4 border-white shadow-2xl shadow-teal-500/10"></div>

            <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-white shadow-xl bg-slate-100 flex items-center justify-center ring-4 ring-teal-100">
              {profile?.profilePicture ? (
                <img
                  src={profile.profilePicture}
                  alt={profile?.name || "Profile"}
                  className="w-full h-full object-cover  object-top"
                />
              ) : (
                <span className="text-slate-400 font-mono text-lg">
                  No Image
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
