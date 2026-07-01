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
  const personSchema = {
    "@context": "https://schema.org",

    "@type": "Person",

    name: "Shivank Lavania",

    url: "https://www.shivanklavania.in",

    image: "https://www.shivanklavania.in/portfolio.png",

    jobTitle: "Assistant Professor and Salesforce Developer",

    description:
      "Assistant Professor, Salesforce Developer, Trainer and Researcher based in Jaipur, India.",

    sameAs: [
      "https://www.linkedin.com/in/kkshivank696/"
    ]
  };

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

        <meta
          name="author"
          content="Shivank Lavania"
        />

        <link
          rel="canonical"
          href="https://www.shivanklavania.in/"
        />

        <meta
          property="og:title"
          content="Shivank Lavania | Assistant Professor | Salesforce Developer"
        />

        <meta
          property="og:description"
          content="Official portfolio of Shivank Lavania."
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:url"
          content="https://www.shivanklavania.in/"
        />

        <meta
          property="og:image"
          content="https://www.shivanklavania.in/portfolio.png"
        />

        <script
          type="application/ld+json"
        >
          {JSON.stringify(personSchema)}
        </script>

      </Helmet>

      <Navbar />

      <main className="scroll-smooth space-y-0">

        <Hero />

        <Suspense fallback={<div className="min-h-[20vh] flex items-center justify-center bg-slate-50"><div className="loading-spinner"></div></div>}>
          <About />
        </Suspense>

        <Suspense fallback={<div className="min-h-[20vh] flex items-center justify-center bg-slate-50"><div className="loading-spinner"></div></div>}>
          <Skills />
        </Suspense>

        <Suspense fallback={<div className="min-h-[20vh] flex items-center justify-center bg-slate-50"><div className="loading-spinner"></div></div>}>
          <Projects />
        </Suspense>

        <Suspense fallback={<div className="min-h-[20vh] flex items-center justify-center bg-slate-50"><div className="loading-spinner"></div></div>}>
          <ExperienceEducation />
        </Suspense>

        <Suspense fallback={<div className="min-h-[20vh] flex items-center justify-center bg-slate-50"><div className="loading-spinner"></div></div>}>
          <Research />
        </Suspense>

        <Suspense fallback={<div className="min-h-[20vh] flex items-center justify-center bg-slate-50"><div className="loading-spinner"></div></div>}>
          <Blogs />
        </Suspense>

        <Suspense fallback={<div className="min-h-[20vh] flex items-center justify-center bg-slate-50"><div className="loading-spinner"></div></div>}>
          <Contact />
        </Suspense>

        <Suspense fallback={<div className="min-h-[20vh] flex items-center justify-center bg-slate-50"><div className="loading-spinner"></div></div>}>
          <Footer />
        </Suspense>

      </main>

    </div>
  );
}