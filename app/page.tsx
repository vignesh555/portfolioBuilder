import AboutMe from "../components/portfolioView/About";
import Experience from "../components/portfolioView/Experience";
import Hero from "../components/portfolioView/Hero";
import Project from "../components/portfolioView/Project";
import Skills from "../components/portfolioView/Skills";
import NavBar from "../components/portfolioView/NavBar";
import ContactMe from "../components/portfolioView/ContactMe";
import { aboutData, experienceData, heroData, projectData, skillsData } from "./assets";

export default function Home() {
  return (
    <>
        <NavBar />
        <div className="container mx-auto max-w-[1000px]">
          <Hero heroData={heroData} />
          <AboutMe aboutData={aboutData} />
          <Experience experienceData={experienceData} />
          <Skills skillsData={skillsData} />
          <Project projectsData={projectData} />
          <ContactMe />
        </div>
    </>
  );
}
