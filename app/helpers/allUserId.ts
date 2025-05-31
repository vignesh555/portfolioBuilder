import { heroData } from "../assets";
import supabase from "../config/superbase-db-config";

export const getAllUserIds = async () => {
    try {
         const { data, error } = await supabase
        .from("user_profiles")
        .select("*");
        console.log("Data fetched from user_profiles:", data);
        return {
            success: true,
            data: data || [],
            error: error ? error.message : null,
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                error: error.message,
            };
        }
        return {
            success: false,
            error: "Something went wrong",
        };
    }
}

export const getAllInformation = async (id) => {
    try {
       const results = await Promise.all([
        supabase.from("user_profiles").select("*").eq("id", id),
        supabase.from("about_me").select("*").eq("user_id", id),
        supabase.from("experience").select("*").eq("user_id", id),
        supabase.from("skills").select("*").eq("user_id", id),
        supabase.from("project").select("*").eq("user_id", id),
    ]);

    const heroData = {
        profileName: results[0].data?.[0]?.full_name,
        totalExperience: results[2].data?.length || 0,
        primarySkills: results[0].data?.[0]?.primary_skills,
        emailId: results[0].data?.[0]?.email,
        whatsAppno: results[0].data?.[0]?.whatsapp_no ,
        phoneNo: results[0].data?.[0]?.phone_no,
        heroImage: results[0].data?.[0]?.hero_image,
        profileTitle: results[0].data?.[0]?.profile_title || "",
    };
    const aboutData = {
        profilePhoto: results[1].data?.[0]?.bio_image || "",
        description: results[1].data?.[0]?.bio || "",
    }

    const experienceData = (results[2].data ?? []).map((exp) => ({
        companyName: exp.company_name,
        location: exp.country_name,
        position: exp.position,
        startDate: exp.from_date,
        endDate: exp.end_date || "Present",
        description: exp.description,
    })); 

    const skillsData = (results[3].data ?? []).map((skill) => ({
        name: skill.name,
        icon: skill.icon,
    }));

    const projectsData = (results[4].data ?? []).map((project) => ({
        title: project.name,
        objective: project.objective,
        techinicalDescription: project.description,
        skillsUsed: project.skills,
        gitHubLink: project.github_link || "",
    }));

    return {
        data: {
            heroData,
            aboutData,
            experienceData,
            skillsData,
            projectsData,            
        }
    } 
    } catch (error) {
        console.log("Error fetching user information:", error);
    }
    
}