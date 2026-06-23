import { Suspense, lazy } from "react";
import Navbar from "../../components/public/Navbar";
import Hero from "../../components/public/Hero";
import { Helmet } from "react-helmet-async";

const About = lazy(() => import("../../components/public/About"));
const Skills = lazy(() => import("../../components/public/Skills"));
const Projects = lazy(() => import("../../components/public/Projects"));
const ExperienceEducation = lazy(() =>
  import("../../components/public/ExperienceEducation")
);
const Research = lazy(() => import("../../components/public/Research"));
const Blogs = lazy(() => import("../../components/public/Blogs"));
const Contact = lazy(() => import("../../components/public/Contact"));
const Footer = lazy(() => import("../../components/public/Footer"));

export default function Home() {
  return (
    <div className="site-shell">

      <Helmet>

        <title>
          Shivank Lavania | Assistant Professor | Salesforce Developer
        </title>

        <meta
          name="description"
          content="Official portfolio of Shivank Lavania. Assistant Professor, Salesforce Developer, Trainer, Researcher and Full Stack Developer."
        />

        <meta
          name="keywords"
          content="Shivank Lavania, Salesforce Developer, Assistant Professor, Researcher, React Developer, Jaipur"
        />

        <link
          rel="canonical"
          href="https://www.shivanklavania.in/"
        />

      </Helmet>

      <Navbar />

      <main className="scroll-smooth space-y-0">

        <Hero />

        <Suspense
          fallback={
            <div className="min-h-[20vh] flex items-center justify-center bg-slate-50">
              <div className="loading-spinner"></div>
            </div>
          }
        >

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