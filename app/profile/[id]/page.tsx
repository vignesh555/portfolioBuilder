import { getAllInformation, getAllUserIds, getMetaInformation } from "@/app/helpers/allUserId"
import AboutMe from "@/components/portfolioView/About";
import ContactMe from "@/components/portfolioView/ContactMe";
import Experience from "@/components/portfolioView/Experience";
import Hero from "@/components/portfolioView/Hero";
import NavBar from "@/components/portfolioView/NavBar";
import Project from "@/components/portfolioView/Project";
import Skills from "@/components/portfolioView/Skills";


export async function generateMetadata({ params }) {
   try {
    const { id } = params
    const { data } = await getMetaInformation(id);
    const { heroData, aboutData } = data;

    return {
        title: `${heroData.profileName} | ${heroData.profileTitle}`,
        description: aboutData.description,
        openGraph: {
            title: `${heroData.profileName} | ${heroData.profileTitle}`,
            description: aboutData.description,
            images: [
                {
                    url: aboutData.profilePhoto,
                    alt: `${heroData.profileName}'s profile picture`,
                },
            ],
        },
    }
   } catch (error) {
        if (error instanceof Error) {
            console.error("Error generating metadata:", error.message);
        } else { 
            console.error("Error generating metadata:", error);
            return {
                title: "Profile",
                description: "User profile page",
            }
        }
    }
    
}

export async function generateStaticParams() {
    const { data, success }  = await getAllUserIds();
    if (!success) {
        return [];
    }
    if (!data || data.length === 0) {
        return [];
    }
    const userIds = data.map((oData) => {
        return {
            id: oData.id.toString(),
        }
    });
    return userIds;
}


export default async function Profile({ params }) {
    const { id } = params;
    const { data } = await getAllInformation(id);
    console.log("Profile Data:", data);
    const { heroData, aboutData, experienceData, skillsData, projectsData } = data;
    return (
        <div>
            <NavBar />
            <div className="container mx-auto max-w-[1000px]">
                <Hero heroData={heroData} />
                <AboutMe aboutData={aboutData} />
                <Experience experienceData={experienceData} />
                <Skills skillsData={skillsData} />
                <Project projectsData={projectsData} />
                <ContactMe />
            </div>
        </div>  
    )
}

