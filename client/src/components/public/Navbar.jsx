import { useState, useEffect } from "react";
import { Menu, X, FileText } from "lucide-react";
import api from "../../api/axiosinstance";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profile, setProfile] = useState({ name: "", resumeLink: "" });

  const NAV_LINKS = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Research", href: "#research" },
    { name: "Blogs", href: "#blogs" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold text-slate-900 tracking-tight">
              {first ? `${first} ` : "Portfolio"}
              {last && <span className="text-teal-600">{last}</span>}
            </a>
          </div>

          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
              >
                {link.name}
              </a>
            ))}

            {profile.resumeLink && (
              <a
                href={profile.resumeLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center px-5 py-2.5 rounded-xl border-2 border-teal-600 text-teal-700 hover:bg-teal-600 hover:text-white text-sm font-semibold transition-all duration-300 shadow-sm"
              >
                <FileText className="w-4 h-4 mr-2" />
                Resume
              </a>
            )}
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-teal-600 focus:outline-none p-1"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white/98 backdrop-blur-md border-b border-slate-200 transition-all duration-300 origin-top overflow-hidden shadow-lg ${
          isOpen ? "max-h-[500px] py-4 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 space-y-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-slate-700 hover:text-teal-600 transition-colors"
            >
              {link.name}
            </a>
          ))}

          {profile.resumeLink && (
            <div className="pt-4 border-t border-slate-200">
              <a
                href={profile.resumeLink}
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-full px-5 py-3 rounded-xl bg-teal-600 text-white font-semibold transition-colors shadow-md"
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
