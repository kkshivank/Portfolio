import React from 'react';
import { useState } from 'react';
import SkillsSection from "/src/components/SkillsSection";
import HeroSection from "/src/components/HeroSection";
import Navbar from "/src/components/Navbar";
import ServiceSection from "./components/ServiceSection";
import ServicesPage from "./components/ServicesPage";
import BlogPage from "./components/BlogPage";

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  if (currentPage === 'services') {
    return <ServicesPage 
      onNavigateHome={() => setCurrentPage('home')} 
      onNavigateToBlogs={() => setCurrentPage('blogs')}
    />;
  }
  if(currentPage === 'blogs'){
    return <BlogPage 
      onNavigateHome={() => setCurrentPage('home')} 
      onNavigateToServices={() => setCurrentPage('services')}
    />;
  }

  return (
    <>
      <div className="flex flex-col gap-40">
        <Navbar 
          onNavigateToServices={() => setCurrentPage('services')} 
          onNavigateHome={() => setCurrentPage('home')}
          onNavigateToBlogs={() => setCurrentPage('blogs')}
        />
        <HeroSection />
        <SkillsSection />
        <ServiceSection />
      </div>
    </>
  );
}

export default App;
