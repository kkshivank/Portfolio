import React from "react";

import iconRest from "/src/assets/SkillsSection/SVGRepo_iconCarrier-1.svg";
import iconReact from "/src/assets/SkillsSection/SVGRepo_iconCarrier-2.svg";
import iconNetworking from "/src/assets/SkillsSection/SVGRepo_iconCarrier-3.svg";
import iconCloudComputing from "/src/assets/SkillsSection/SVGRepo_iconCarrier-4.svg";
import iconBigDta from "/src/assets/SkillsSection/SVGRepo_iconCarrier-5.svg";
import iconMachineLearning from "/src/assets/SkillsSection/SVGRepo_iconCarrier-6.svg";
import iconNLP from "/src/assets/SkillsSection/SVGRepo_iconCarrier-7.svg";
import iconGit from "/src/assets/SkillsSection/SVGRepo_iconCarrier-8.svg";
import iconFigma from "/src/assets/SkillsSection/SVGRepo_iconCarrier-9.svg";
import iconVSCode from "/src/assets/SkillsSection/SVGRepo_iconCarrier-10.svg";
import iconGithub from "/src/assets/SkillsSection/SVGRepo_iconCarrier-11.svg";
import iconHeroku from "/src/assets/SkillsSection/SVGRepo_iconCarrier-12.svg";
import iconNodeJS from "/src/assets/SkillsSection/SVGRepo_iconCarrier-13.svg";
import iconAWS from "/src/assets/SkillsSection/SVGRepo_iconCarrier-14.svg";
import iconSalesforce from "/src/assets/SkillsSection/SVGRepo_iconCarrier-15.svg";
import iconCSS from "/src/assets/SkillsSection/SVGRepo_iconCarrier-16.svg";
import iconHTML from "/src/assets/SkillsSection/SVGRepo_iconCarrier-17.svg";
import iconPython from "/src/assets/SkillsSection/SVGRepo_iconCarrier-18.svg";
import iconJavaScript from "/src/assets/SkillsSection/SVGRepo_iconCarrier-19.svg";
import iconPostman from "/src/assets/SkillsSection/SVGRepo_iconCarrier.svg";

const skillsData = [
  {
    category: "LANGUAGES",
    items: [
      { icon: iconJavaScript, label: "JavaScript" },
      { icon: iconPython, label: "Python" },
      { icon: iconHTML, label: "HTML 5" },
      { icon: iconCSS, label: "CSS 3" },
    ],
  },
  {
    category: "CLOUD PLATFORMS",
    items: [
      { icon: iconAWS, label: "Amazon Web Services" },
      { icon: iconHeroku, label: "Heroku" },
      { icon: iconSalesforce, label: "Salesforce" },
      { icon: iconGithub, label: "GitHub" },
    ],
  },
  {
    category: "TOOLS",
    items: [
      { icon: iconGit, label: "Git" },
      { icon: iconVSCode, label: "VS Code" },
      { icon: iconFigma, label: "Figma" },
    ],
  },
  {
    category: "TEACHING AREAS",
    items: [
      { icon: iconMachineLearning, label: "Machine Learning" },
      { icon: iconNetworking, label: "Computer Networks" },
      { icon: iconNLP, label: "NLP" },
      { icon: iconBigDta, label: "Big Data" },
      { icon: iconCloudComputing, label: "Cloud Computing" },
    ],
  },
  {
    category: "FRAMEWORKS",
    items: [
      { icon: iconReact, label: "React Js" },
      { icon: iconNodeJS, label: "Node Js" },
    ],
  },
  {
    category: "TECHNOLOGIES",
    items: [
      { icon: iconPostman, label: "Postman" },
      { icon: iconRest, label: "REST APIs" },
    ],
  },
];

const SkillsSection = () => {
  return (
    <div className="w-full flex flex-col items-center md:px-4">
      <div className="w-[200px] md:w-[260px] h-[4px] bg-subtle rounded-[72px] mx-auto" />
      <div className="text-heroheading text-primary text-center w-full mb-25">
        SKILLS
      </div>

      <div className="w-full flex flex-col md:flex-row px-30 gap-40">
        {/* Left column: first 4 groups */}
        <div className="flex-1 flex flex-col gap-16">
          {skillsData.slice(0, 4).map((group) => (
            <div
              key={group.category}
              className="bg-transparent flex justify-center flex-row gap-8 "
            >
              <div className="text-heading text-primary text-nowrap w-full justify-end">
                {group.category}
              </div>
              <div className="flex flex-nowrap gap-4 w-full justify-end">
                {group.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center w-[80px] hover:drop-shadow-[0_2px_5px_rgba(107,112,218,0.6)] transition-all duration-75 hover:scale-101"
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="object-contain mb-1 w-[60px] h-[60px] "
                    />
                    <span className="text-subtext text-primary text-center text-sm">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right column: last 2 groups */}
        <div className="flex-1 flex flex-col justify-around">
          {skillsData.slice(4, 6).map((group) => (
            <div
              key={group.category}
              className="bg-transparent flex justify-end flex-row gap-8"
            >
              <div className="text-heading text-primary text-nowrap w-full justify-end">
                {group.category}
              </div>
              <div className="flex flex-nowrap gap-4 w-full justify-end">
                {group.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center w-[80px] hover:drop-shadow-[0_2px_5px_rgba(107,112,218,0.6)] transition-all duration-75 hover:scale-101"
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="object-contain mb-1 w-[60px] h-[60px] "
                    />
                    <span className="text-subtext text-primary text-center text-sm">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-[200px] md:w-[320px] h-[4px] bg-subtle rounded-[72px] mx-auto mt-20" />
    </div>
  );
};

export default SkillsSection;
