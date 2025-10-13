import React from 'react';
import Navbar from '../components/Navbar';

import { BookACallButton } from "../components/BookACallButton";
import { LetsChatButton } from "../components/LetSChatButton";

import CMS from "../assets/servicePageImages/CMS.png";
import AddLink from "../assets/servicePageImages/Add-Link.png";
import Analyze from "../assets/servicePageImages/Analyze.png";
import Chromebook from "../assets/servicePageImages/Chromebook.png";
import Cloud from "../assets/servicePageImages/Cloud.png";
import Clouds from "../assets/servicePageImages/clouds.png";
import Collaboration from "../assets/servicePageImages/Collaboration.png";
import Communicate from "../assets/servicePageImages/Communicate.png";
import ControlPanel from "../assets/servicePageImages/Control-Panel.png";
import DiscordNew from "../assets/servicePageImages/Discord-New.png";
import EventAccepted from "../assets/servicePageImages/Event-Accepted.png";
import FlowChart from "../assets/servicePageImages/Flow-Chart.png";
import GitHub from "../assets/servicePageImages/GitHub.png";
import Goal from "../assets/servicePageImages/Goal.png";
import GroupOfPeople from "../assets/servicePageImages/Group-of-people-holding-hands-together.png";
import Internship from "../assets/servicePageImages/Internship.png";
import LaptopSettings from "../assets/servicePageImages/Laptop-Settings.png";
import Module from "../assets/servicePageImages/Module.png";
import MultimediaPublishing from "../assets/servicePageImages/Multimedia-Publishing.png";
import Onboarding from "../assets/servicePageImages/Onboarding.png";
import OnlineEmployeeTraining from "../assets/servicePageImages/Online-employee-training.png";
import PersonalGrowth from "../assets/servicePageImages/Personal-Growth.png";
import PositiveDynamic from "../assets/servicePageImages/Positive-Dynamic.png";
import ProjectManagement from "../assets/servicePageImages/Project-Management.png";
import RequestService from "../assets/servicePageImages/Request-Service.png";
import RestAPI from "../assets/servicePageImages/Rest-API.png";
import Scholarship from "../assets/servicePageImages/Scholarship.png";
import StackedOrgChart from "../assets/servicePageImages/Stacked-Organizational-Chart-Highlighted-First-Node.png";
import StockTrader from "../assets/servicePageImages/Stock-trader-working-on-laptop-with-charts.png";
import Students from "../assets/servicePageImages/Students.png";
import TestPassed from "../assets/servicePageImages/Test-Passed.png";
import UploadToTheCloud from "../assets/servicePageImages/Upload-to-the-Cloud.png";
import Website from "../assets/servicePageImages/Website.png";
import Workstation from "../assets/servicePageImages/Workstation.png";
import YoungManDegree from "../assets/servicePageImages/Young-man-getting-an-academic-degree-online.png";

// Card for each deliverable
const ServiceCard = ({ text, image, alt }) => (
  <div className="flex flex-col items-center w-[120px] md:w-[150px] mb-4">
    <img src={image} alt={alt} className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] mb-2 icon-primary-precise" />
    <div className="text-primary text-center text-base md:text-lg font-normal font-[Jaldi] leading-tight">
      {text}
    </div>
  </div>
);

// Section for each service
const ServiceSection = ({
  leftImage,
  leftImageAlt,
  heading,
  subtext,
  description,
  deliverables,
  children, // <-- add children prop
}) => (
  <section className="w-full flex flex-col md:flex-row items-center justify-center my-16 relative">
    {/* Left visual */}
    <div className="flex-shrink-0 order-1 md:mr-16">
      <img src={leftImage} alt={leftImageAlt} className="w-[320px] md:w-[500px] lg:w-[450px] h-auto" />
    </div>
    {/* Text and deliverables */}
    <div className="flex-1 order-2 md:text-left max-w-3xl">
      <div className="text-primary text-title mb-2">
        {heading}
      </div>
      <div className="text-subtle text-regular mb-10">{subtext}</div>
      <div className="text-primary text-regular text-justify mb-6">{description}</div>
      <div>
        <div className="text-primary text-title mb-4">Deliverables</div>
        <div className="flex flex-row flex-nowrap gap-4">
          {deliverables.map((d, i) => (
            <ServiceCard key={i} {...d} />
          ))}
        </div>
      </div>
      {/* Buttons below deliverables */}
      <div className="flex flex-col md:flex-row items-center gap-58 mt-8">
        {children}
      </div>
    </div>
  </section>
);

const ServicesPage = ({ onNavigateHome, onNavigateToBlogs }) => {
  return (
    <div className="bg-background min-h-screen w-full">
      <Navbar 
        onNavigateHome={onNavigateHome} 
        onNavigateToBlogs={onNavigateToBlogs}
      />
      <div className="pt-24 max-w-[1400px] mx-auto px-4">
        <h1 className="text-primary text-heroheading text-center mb-16">SERVICES</h1>

        <ServiceSection
          leftImage={StockTrader}
          leftImageAlt="Stock trader working"
          heading="Web Development"
          subtext="Fast, modern, and mobile-first websites that elevate your online presence."
          description="I design and develop modern web experiences using technologies like React, Tailwind, and Node.js. Whether it's a personal portfolio, business site, or full-stack web app, my solutions focus on clean design, fast performance, and mobile-first usability."
          deliverables={[
            { text: "Frontend", image: Chromebook, alt: "Chromebook" },
            { text: "Backend", image: Workstation, alt: "Workstation" },
            { text: "API Integrations", image: RestAPI, alt: "Rest API" },
            { text: "Mobile Layouts", image: MultimediaPublishing, alt: "Multimedia" },
            { text: "SEOs", image: PositiveDynamic, alt: "Positive dynamic" },
            { text: "CMS", image: CMS, alt: "CMS" },
            { text: "Deployment", image: UploadToTheCloud, alt: "Upload to the cloud" },
          ]}
        >
          <BookACallButton onClick={() => window.location.href='tel:+916378662150'} />
          <LetsChatButton />
        </ServiceSection>

        <ServiceSection
          leftImage={Clouds}
          leftImageAlt="Clouds"
          heading="Salesforce Consulting"
          subtext="Streamlining your CRM with tailored Salesforce solutions."
          description="I help businesses get the most out of Salesforce by setting up, customizing, and optimizing their CRM system. Whether you're just starting or need complex automation and integrations, I offer strategy and execution aligned with your goals."
          deliverables={[
            { text: "Salesforce setup", image: LaptopSettings, alt: "Laptop settings" },
            { text: "Workflow Automation", image: StackedOrgChart, alt: "Stacked" },
            { text: "Third Party Integrations", image: AddLink, alt: "Add link" },
            { text: "Dashboard & report configuration", image: ControlPanel, alt: "Control panel" },
            { text: "Team onboarding & training", image: Onboarding, alt: "Onboarding" },
          ]}
        >
          <BookACallButton onClick={() => window.location.href='tel:+916378662150'} />
          <LetsChatButton />
        </ServiceSection>

        <ServiceSection
          leftImage={YoungManDegree}
          leftImageAlt="Young man getting an academic degree online"
          heading="Academic Mentorship"
          subtext="Personal guidance tailored to your academic journey — from semester plans to career strategies."
          description="I help students at various stages of their academic life — whether it's managing workloads, planning for higher studies, choosing a final year project, or navigating placements and research. My mentorship ensures clarity, direction, and confidence."
          deliverables={[
            { text: "Semester Planning", image: TestPassed, alt: "Test passed" },
            { text: "Project Selection", image: ProjectManagement, alt: "Project management" },
            { text: "Research Paper Simplification", image: Analyze, alt: "Analyze" },
            { text: "Internship Guidance", image: Internship, alt: "Internship" },
            { text: "Career Roadmaps", image: Goal, alt: "Goal" },
            { text: "Scholarship Tips", image: Scholarship, alt: "Scholarship" },
          ]}
        >
          <BookACallButton onClick={() => window.location.href='tel:+916378662150'} />
          <LetsChatButton />
        </ServiceSection>

        <ServiceSection
          leftImage={OnlineEmployeeTraining}
          leftImageAlt="Online employee training"
          heading="Technical Training"
          subtext="Empowering students and professionals with hands-on, real-world tech skills."
          description="I deliver engaging, project-based technical training on full-stack web development, Salesforce, and cloud computing. Whether you’re a student, fresher, or working professional — my sessions focus on industry-aligned learning with strong fundamentals."
          deliverables={[
            { text: "DSA", image: FlowChart, alt: "Flow chart" },
            { text: "Web Dev", image: Website, alt: "Website" },
            { text: "Salesforce & Cloud Fundamentals", image: Cloud, alt: "Cloud" },
            { text: "Git & GitHub", image: GitHub, alt: "GitHub" },
            { text: "System Design", image: Module, alt: "Module" },
            { text: "Hands on Projects", image: Students, alt: "Students" },
          ]}
        >
          <BookACallButton onClick={() => window.location.href='tel:+916378662150'} />
          <LetsChatButton />
        </ServiceSection>

        <ServiceSection
          leftImage={GroupOfPeople}
          leftImageAlt="Group of people"
          heading="Community Building"
          subtext="Fostering spaces where like-minded individuals grow, collaborate, and inspire."
          description="I’ve led and grown student-led communities, Discord servers, and technical interest groups from scratch. My focus is on inclusive growth, event planning, and mentorship within these communities — both online and offline."
          deliverables={[
            { text: "Discord Setup", image: DiscordNew, alt: "Discord new" },
            { text: "Guest Talk", image: Communicate, alt: "Communicate" },
            { text: "Events & Challanges", image: EventAccepted, alt: "Event accepted" },
            { text: "Moderation Systems", image: RequestService, alt: "Request service" },
            { text: "Member Growth", image: PersonalGrowth, alt: "Personal growth" },
            { text: "Collaboration Spaces", image: Collaboration, alt: "Collaboration" },
          ]}
        >
          <BookACallButton onClick={() => window.location.href='tel:+916378662150'} />
          <LetsChatButton />
        </ServiceSection>
        <div className="h-24" /> {/* Spacer at bottom */}
      </div>
    </div>
  );
}

export default ServicesPage;