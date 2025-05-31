import { getAllInformation, getAllUserIds, getMetaInformation } from "@/app/helpers/allUserId"
import AboutMe from "@/components/portfolioView/About";
import ContactMe from "@/components/portfolioView/ContactMe";
import Experience from "@/components/portfolioView/Experience";
import Hero from "@/components/portfolioView/Hero";
import NavBar from "@/components/portfolioView/NavBar";
import Project from "@/components/portfolioView/Project";
import Skills from "@/components/portfolioView/Skills";

async function Profile({ params }: { params: { id: string } }) {
    const { id } = await params
    const { data } = await getAllInformation(parseInt(id));
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

export async function generateMetadata({ params }: { params: { id: string } }) {
    const { id } = await params
    const { data } = await getMetaInformation(id);
    const { heroData, aboutData } = data;  

    return {
        title: `${heroData.profileName} | ${heroData.profileTitle}`,
        description: aboutData.description,
        // icons: {
        //    icon: `/favicons/favIconVS.png`, 
        //    type: 'image/png',
        // },
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


export default Profile
