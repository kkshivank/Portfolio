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
            twitterLink: response.data.twitterLink || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch profile for footer initialization");
      }
    };
    fetchFooterData();
  }, []);

  return (
    <footer className="bg-white py-12 border-t border-slate-200 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center">
        {(profile.githubLink || profile.linkedinLink || profile.twitterLink) && (
          <div className="flex gap-4 mb-8">
            {profile.githubLink && (
              <a
                href={profile.githubLink}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-teal-600 hover:border-teal-200 transition-all"
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
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-teal-600 hover:border-teal-200 transition-all"
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
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-teal-600 hover:border-teal-200 transition-all"
                aria-label="Twitter Profile"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
            )}
          </div>
        )}

        <div className="flex items-center text-xs text-slate-400 font-mono mb-4 tracking-wider select-none">
          <span>BUILT WITH</span>
          <Heart className="h-3 w-3 mx-2 text-teal-500 fill-teal-100" />
          <span>MERN STACK • TAILWIND CSS</span>
        </div>

        <p className="text-slate-500 text-sm font-medium text-center tracking-wide">
          © {currentYear} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
