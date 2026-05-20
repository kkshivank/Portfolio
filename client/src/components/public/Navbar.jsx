import { useState, useEffect } from "react";
import { Menu, X, FileText } from "lucide-react";
import api from "../../api/axiosinstance";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profile, setProfile] = useState({ name: "", resumeLink: "" });

  // FIXED: Updated href elements to match the standalone IDs inside Research.jsx and Blogs.jsx
  const NAV_LINKS = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Research", href: "#research" },
    { name: "Blogs", href: "#blogs" },
    { name: "Contact", href: "#contact" },
  ];

  // Handle scroll effect for the glassmorphism background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch Profile for dynamic Name and Resume Link
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile");
        if (response.data) {
          setProfile({
            name: response.data.name || "Developer", 
            resumeLink: response.data.resumeLink || ""
          });
        }
      } catch (error) {
        console.error("Failed to fetch profile for navbar");
      }
    };
    fetchProfile();
  }, []);

  // Helper to split the name so the last word gets the teal accent color dynamically
  const formatName = (fullName) => {
    if (!fullName) return { first: "", last: "" };
    const nameParts = fullName.trim().split(" ");
    if (nameParts.length <= 1) return { first: fullName, last: "" };
    const last = nameParts.pop();
    const first = nameParts.join(" ");
    return { first, last: last + "." };
  };

  const { first, last } = formatName(profile.name);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Dynamic Logo / Name */}
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold text-slate-100 tracking-tight">
              {first ? `${first} ` : "Portfolio"} 
              {last && <span className="text-teal-400">{last}</span>}
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors"
              >
                {link.name}
              </a>
            ))}

            {/* Dynamic Resume Button */}
            {profile.resumeLink && (
              <a
                href={profile.resumeLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center px-5 py-2.5 rounded-lg border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-slate-900 text-sm font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(45,212,191,0.1)] hover:shadow-[0_0_20px_rgba(45,212,191,0.3)]"
              >
                <FileText className="w-4 h-4 mr-2" />
                Resume
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-teal-400 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 transition-all duration-300 origin-top overflow-hidden ${
          isOpen ? "max-h-[500px] py-4 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 space-y-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-slate-300 hover:text-teal-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          {profile.resumeLink && (
            <div className="pt-4 border-t border-slate-700/50">
              <a
                href={profile.resumeLink}
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-full px-5 py-3 rounded-lg bg-teal-400 text-slate-900 font-semibold transition-colors"
              >
                <FileText className="w-4 h-4 mr-2" />
                View Resume
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}