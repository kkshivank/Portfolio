import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import api from "../../api/axiosinstance";

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

  // Helper to extract a short tagline from the full bio (grabs the first sentence)
  const getTagline = (bio) => {
    if (!bio) return "";
    const firstSentence = bio.split(".")[0];
    return firstSentence + (firstSentence.length > 0 ? "." : "");
  };

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="w-8 h-8 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
      </section>
    );
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Decorative Blurs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center z-10">
        {/* Left Side: Typography & Content */}
        <div className="flex flex-col items-start text-left order-2 lg:order-1 animate-fade-in-up">
          <p className="text-teal-400 font-mono text-sm md:text-base tracking-wide mb-3 pl-1">
            Hi there, I am
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-100 tracking-tight mb-4">
            {profile?.name}
          </h1>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-400 mb-6">
            {profile?.role}
          </h2>

          <p className="text-lg md:text-xl text-slate-400 max-w-xl mb-10 leading-relaxed">
            {getTagline(profile?.bio)}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto">
            <a
              href="#projects"
              className="flex items-center justify-center px-8 py-3.5 bg-teal-400 text-slate-900 font-semibold rounded-lg hover:bg-teal-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(45,212,191,0.2)]"
            >
              View My Work
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>

            <a
              href="#contact"
              className="flex items-center justify-center px-8 py-3.5 bg-transparent text-slate-300 font-semibold rounded-lg border border-slate-600 hover:border-teal-400 hover:text-teal-400 transition-all duration-300 hover:-translate-y-1"
            >
              Contact Me
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5 pl-1">
            {profile?.githubLink && (
              <a
                href={profile.githubLink}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-teal-400 hover:-translate-y-1 transition-all duration-300"
                aria-label="GitHub Profile"
              >
                <FaGithub className="h-7 w-7" />
              </a>
            )}

            {profile?.linkedinLink && (
              <a
                href={profile.linkedinLink}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-teal-400 hover:-translate-y-1 transition-all duration-300"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin className="h-7 w-7" />
              </a>
            )}

            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="text-slate-400 hover:text-teal-400 hover:-translate-y-1 transition-all duration-300"
                aria-label="Email Me"
              >
                <FaEnvelope className="h-7 w-7" />
              </a>
            )}
          </div>
        </div>

        {/* Right Side: Profile Picture */}
        <div className="flex justify-center lg:justify-end items-center order-1 lg:order-2">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
            {/* Glowing ring behind image */}
            <div className="absolute inset-0 rounded-full border-2 border-teal-400/30 blur-sm animate-pulse"></div>

            {/* Image Wrapper */}
            <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl bg-slate-800 flex items-center justify-center">
              {profile?.profilePicture ? (
                <img
                  src={profile.profilePicture}
                  alt={profile?.name || "Profile"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-slate-600 font-mono text-lg">
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