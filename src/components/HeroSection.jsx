const HeroSection = () => {
  return (
    <div className="flex flex-row gap-60 px-30">
      <div className="w-full flex flex-2 flex-col">
        <div className="text-heroheading text-primary">
          Hi, I'm
          <span className="text-accent"> Shivank</span>
        </div>
        <div className="flex text-subtle text-subtext w-full justify-center mb-10">
          — an Assistant Professor, Developer, and Tech Educator based in India.
        </div>
              <div className="text-primary text-justify text-regular">
                  With a strong foundation in both academia and industry, I specialize in modern web development, cloud computing, and Salesforce consulting. I’m passionate about teaching, mentoring, and building impactful digital solutions that bridge the gap between theory and practice.
        </div>
      </div>
      <div className="flex flex-1 w-full justify-end">
        <img src="/src/assets/Hero/OBJECTS.svg" alt=""/>
      </div>
    </div>
  );
};

export default HeroSection;
