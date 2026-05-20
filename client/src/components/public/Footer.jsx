import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Heart } from "lucide-react";
import api from "../../api/axiosinstance";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [profile, setProfile] = useState({ name: "", githubLink: "", linkedinLink: "", twitterLink: "" });

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await api.get("/profile");
        if (response.data) {
          setProfile({
            name: response.data.name || "Developer",
            githubLink: response.data.githubLink || "",
            linkedinLink: response.data.linkedinLink || "",
            twitterLink: response.data.twitterLink || "", // Works if your schema supports it
          });
        }
      } catch (error) {
        console.error("Failed to fetch profile for footer initialization");
      }
    };
    fetchFooterData();
  }, []);

  return (
    <footer className="bg-slate-950 py-12 border-t border-slate-900 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center">
        
        {/* Dynamic Social Links Group */}
        {(profile.githubLink || profile.linkedinLink || profile.twitterLink) && (
          <div className="flex gap-6 mb-8">
            {profile.githubLink && (
              <a 
                href={profile.githubLink} 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-500 hover:text-teal-400 transition-colors p-1"
                aria-label="GitHub Profile"
              >
                <FaGithub className="h-5 w-5" />
              </a>
            )}
            {profile.linkedinLink && (
              <a 
                href={profile.linkedinLink} 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-500 hover:text-teal-400 transition-colors p-1"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            )}
            {profile.twitterLink && (
              <a 
                href={profile.twitterLink} 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-500 hover:text-teal-400 transition-colors p-1"
                aria-label="Twitter Profile"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
            )}
          </div>
        )}

        {/* Global Structural Meta-Tags */}
        <div className="flex items-center text-xs text-slate-600 font-mono mb-4 tracking-wider select-none">
          <span>BUILT WITH</span>
          <Heart className="h-3 w-3 mx-2 text-teal-500/80 fill-teal-500/20" />
          <span>MERN STACK • TAILWIND CSS</span>
        </div>

        {/* Dynamic Copyright Statement */}
        <p className="text-slate-600 text-sm font-medium text-center tracking-wide">
          © {currentYear} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}