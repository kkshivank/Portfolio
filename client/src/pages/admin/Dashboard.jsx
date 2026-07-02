import { useState } from "react";
import {
  User, Code2, FolderGit2, Briefcase, GraduationCap,
  PenTool, BookOpen, Inbox, Shield, Menu, X, LayoutDashboard, Briefcase as CaseStudyIcon
} from "lucide-react";

// Import all the components we built
import ProfileManager from "../../components/admin/ProfileManager";
import SkillManager from "../../components/admin/SkillManager";
import ProjectManager from "../../components/admin/ProjectManager";
import ExperienceManager from "../../components/admin/ExperienceManager";
import EducationManager from "../../components/admin/EducationManager";
import BlogManager from "../../components/admin/BlogManager";
import CaseStudyManager from "../../components/admin/CaseStudyManager";
import ResearchPaperManager from "../../components/admin/ResearchPaperManager";
import MessageManager from "../../components/admin/MessageManager";
import SecurityManager from "../../components/admin/SecurityManager";

// Centralized configuration makes it extremely easy to manage tabs
const TABS = [
  { id: "profile", label: "Profile", icon: User, component: <ProfileManager /> },
  { id: "skills", label: "Skills", icon: Code2, component: <SkillManager /> },
  { id: "projects", label: "Projects", icon: FolderGit2, component: <ProjectManager /> },
  { id: "experience", label: "Experience", icon: Briefcase, component: <ExperienceManager /> },
  { id: "education", label: "Education", icon: GraduationCap, component: <EducationManager /> },
  { id: "blogs", label: "Blogs", icon: PenTool, component: <BlogManager /> },
  { id: "casestudies", label: "Case Studies", icon: CaseStudyIcon, component: <CaseStudyManager /> },
  { id: "research", label: "Research", icon: BookOpen, component: <ResearchPaperManager /> },
  { id: "messages", label: "Inbox", icon: Inbox, component: <MessageManager /> },
  { id: "security", label: "Security", icon: Shield, component: <SecurityManager /> },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get the currently selected component
  const ActiveComponent = TABS.find((tab) => tab.id === activeTab)?.component || <ProfileManager />;

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false); // Close mobile menu on selection
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden font-sans">
      
      {/* MOBILE OVERLAY */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 border-r border-slate-700 flex flex-col transition-transform duration-300 ease-in-out transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-700 bg-slate-900/50">
          <div className="flex items-center gap-2 font-bold text-xl text-teal-400">
            <LayoutDashboard className="h-6 w-6" />
            <span>Admin Panel</span>
          </div>
          {/* Mobile close button */}
          <button 
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? "bg-teal-400/10 text-teal-400 border border-teal-400/20 shadow-[0_0_10px_rgba(45,212,191,0.1)]" 
                    : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-teal-400" : "text-slate-500"}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-700 text-xs text-center text-slate-500 bg-slate-900/30">
          Portfolio Dashboard v1.0
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Mobile Header */}
        <header className="h-16 flex items-center justify-between px-4 border-b border-slate-700 bg-slate-800 md:hidden sticky top-0 z-30">
          <div className="flex items-center gap-2 font-bold text-lg text-teal-400">
            <LayoutDashboard className="h-5 w-5" />
            <span>Admin</span>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 -mr-2 text-slate-400 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <Menu className="h-6 w-6" />
          </button>
        </header>

        {/* Dynamic Content Rendering */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="mx-auto max-w-7xl">
            {ActiveComponent}
          </div>
        </div>
        
      </main>
    </div>
  );
}