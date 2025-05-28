import AboutMe from "../components/portfolioView/About";
import Experience from "../components/portfolioView/Experience";
import Hero from "../components/portfolioView/Hero";
import Project from "../components/portfolioView/Project";
import Skills from "../components/portfolioView/Skills";
import NavBar from "../components/portfolioView/NavBar";
import ContactMe from "../components/portfolioView/ContactMe";

export default function Home() {
  return (
    <>
        <NavBar />
        <Hero />
        <AboutMe />
        <Experience />
        <Skills />
        <Project />
        <ContactMe />
    </>
  );
}
