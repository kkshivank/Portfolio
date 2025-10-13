import React from 'react'
import Card from '/src/components/Card.jsx';
import img1 from "/src/assets/ServiceSection/Property 1=Web Dev.svg";
import img2 from "/src/assets/ServiceSection/Property 1=Salesforce.svg";
import img3 from "/src/assets/ServiceSection/Property 1=TechTrain.svg";
import img4 from "/src/assets/ServiceSection/Property 1=Academic.svg";
import img5 from "/src/assets/ServiceSection/Property 1=Community.svg";    

const services = [
  {
    image: img1,
    title: "Web Development",
    description: "Creating fast, responsive websites using React and modern web tools.",
  },
  {
    image: img2,
    title: "Salesforce Consulting",
    description: "Implementing and customizing Salesforce solutions for clients.",
  },
  {
    image: img3,
    title: "Technical Training",
    description: "Delivering lectures, workshops, and internship training for students.",
  },
  {
    image: img4,
    title: "Academic Mentorship",
    description: "Supporting students with projects and learning paths.",
  },
  {
    image: img5,
    title: "Community Building",
    description: "Organizing events, hackathons,& sessions to promote quality learning.",
  },
];

const ServiceSection = () => {
    
  return (
  <div className="w-full flex flex-col items-center -mt-40 mb-40">
    <div className="text-primary text-heroheading mb-12">SERVICES</div>
    <div className="flex flex-wrap justify-center mx-20 gap-20 text-regular text-primary">
      {services.map((service, idx) => (
        <Card
          key={idx}
          image={service.image}
          title={service.title}
          description={service.description}
        />
      ))}
    </div>
  </div>
  )
}

export default ServiceSection
