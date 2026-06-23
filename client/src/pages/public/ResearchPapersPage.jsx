import { useState, useEffect } from "react";
import { ArrowLeft, BookOpen, Users, Calendar, FileText, Library } from "lucide-react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../api/axiosinstance";
import { Helmet } from "react-helmet-async";

export default function ResearchPapersPage() {
  const [papers, setPapers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchResearch = async () => {
      try {
        const response = await api.get("/research-papers");
        setPapers(response.data || []);
      } catch (error) {
        console.error("Failed to fetch research papers");
      } finally {
        setIsLoading(false);
      }
    };
    fetchResearch();
  }, []);

  const totalPapers = papers.length;
  const latestYear = papers.length > 0
    ? Math.max(...papers.map(p => parseInt(p.year) || 0))
    : new Date().getFullYear();

  return (
    <div className="site-shell pb-24">
      <Helmet>

  <title>
    Research Papers | Shivank Lavania
  </title>

  <meta
    name="description"
    content="Research papers, publications and technical contributions by Shivank Lavania in Artificial Intelligence, Machine Learning, Cloud Computing and Software Engineering."
  />

  <meta
    name="keywords"
    content="Shivank Lavania Research Papers, AI Research, Machine Learning, Cloud Computing, Software Engineering"
  />

  <meta
    property="og:title"
    content="Research Papers | Shivank Lavania"
  />

  <meta
    property="og:description"
    content="Research papers and technical publications by Shivank Lavania."
  />

  <meta
    property="og:type"
    content="website"
  />

  <meta
    property="og:url"
    content="https://www.shivanklavania.in/research-papers"
  />

  <link
    rel="canonical"
    href="https://www.shivanklavania.in/research-papers"
  />

</Helmet>
    </div>
  );
}
