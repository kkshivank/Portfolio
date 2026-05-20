import { Suspense, lazy } from 'react';
import Navbar from "../../components/public/Navbar";
import Hero from "../../components/public/Hero";

// Lazy load heavy sections to improve initial page load time
const About = lazy(() => import("../../components/public/About"));
const Skills = lazy(() => import("../../components/public/Skills"));
const Projects = lazy(() => import("../../components/public/Projects"));
const ExperienceEducation = lazy(() => import("../../components/public/ExperienceEducation"));
const Research = lazy(() => import("../../components/public/Research"));
const Blogs = lazy(() => import("../../components/public/Blogs"));
const Contact = lazy(() => import("../../components/public/Contact"));
const Footer = lazy(() => import("../../components/public/Footer"));

export default function Home() {
  return (
    <div className="bg-slate-900 min-h-screen selection:bg-teal-400/30 selection:text-teal-200">
      {/* 
        The Navbar is static as it's the primary interaction point.
      */}
      <Navbar />

      {/* 
        Main content wrapper with scroll-padding to account for fixed navbar.
        Added space-y-0 utility to prevent element bleed gaps.
      */}
      <main className="scroll-smooth space-y-0">
        <Hero />
        
        {/* 
          Suspense handles the fallback state while lazy components load.
          Reduced fallback min-height to match closer proximity expectations.
        */}
        <Suspense 
          fallback={
            <div className="min-h-[20vh] flex items-center justify-center bg-slate-900">
              <div className="w-8 h-8 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }
        >
          {/* 
            Pro-Tip: For optimal spacing compression, open each of the sub-components 
            below and change the root element wrapper padding from `py-24` to `py-16` 
            (or `py-12` for ultra-compact gaps).
          */}
          <About />
          <Skills />
          <Projects />
          <ExperienceEducation />
          <Research />
          <Blogs />
          <Contact />
          <Footer />
        </Suspense>
      </main>
    </div>
  );
}