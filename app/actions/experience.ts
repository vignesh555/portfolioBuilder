"use server";

import supabase from "../config/superbase-db-config";
import { IExperienceEditRequest, IExperienceSaveRequest, IExperienceResponse } from "../interfaces";

export const saveExperience = async (
  experience: IExperienceSaveRequest,
): Promise<{
  data?: IExperienceResponse | null;
  success?: boolean;
  error: Error | string | null;
}> => {
  try {
    const { data, error } = await supabase.from("experience").insert([
      {
        position: experience.position,
        company_name: experience.companyName,
        country_name: experience.countryName,
        from_date: experience.fromDate,
        end_date: experience.endDate,
        description: experience.description,
        user_id: experience.userId
      },
    ]);
    if (error) {
      throw new Error("Error in save record");
    }
    return { error: null, data, success: true };
  } catch (error) {
    // console.log(error);
    if (error instanceof Error) {
      return { error, data: null, success: false };
    }
    return { error: "Error in save record", data: null, success: false };
  }
};

export const editExperience = async (experience: IExperienceEditRequest) => {
  try {
    const { data, error } = await supabase
      .from("experience")
      .update([
        {
          position: experience.position,
          company_name: experience.companyName,
          country_name: experience.countryName,
          from_date: experience.fromDate,
          end_date: experience.endDate,
          description: experience.description,
        },
      ])
      .eq("id", experience.id);
    if (error) {
      // console.log(error)
      throw new Error("Error in edit record");
    }
    return { error: null, data, success: true };
  } catch (error) {
    // console.log(error);
    if (error instanceof Error) {
      return { error, data: null, success: false };
    }
    return { error: "Error in edit record", data: null, success: false };
  }
};

export const fetchExperience = async (userId: string): Promise<{
  data?: IExperienceResponse[] | null;
  success?: boolean;
  error: Error | string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from("experience")
      .select("*")
      .eq("user_id", userId);
    if (error || !data) {
      throw new Error("Error in edit record");
    }

    const mData = data.map((oData) => ({
      id: oData.id,
      createdAt: oData.created_at,
      userId: oData.user_id,
      position: oData.position,
      companyName: oData.company_name,
      countryName: oData.country_name,
      fromDate: oData.from_date,
      endDate: oData.end_date,
      description: oData.description,
    }))
    return { error: null, data: mData, success: true };
  } catch (error) {
    // console.log(error);
    if (error instanceof Error) {
      return { error, data: null, success: false };
    }
    return { error: "Error in edit record", data: null, success: false };
  }
};


export const fetchExperienceParticularId = async (id: string): Promise<{
  data?: IExperienceResponse[] | null;
  success?: boolean;
  error: Error | string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from("experience")
      .select("*")
      .eq("id", id);
    if (error || !data) {
      throw new Error("Error in edit record");
    }
    const mData = data.map((oData) => ({
      id: oData.id,
      createdAt: oData.created_at,
      userId: oData.user_id,
      position: oData.position,
      companyName: oData.company_name,
      countryName: oData.country_name,
      fromDate: oData.from_date,
      endDate: oData.end_date,
      description: oData.description,
    }))
    return { error: null, data: mData, success: true };
  } catch (error) {
    // console.log(error);
    if (error instanceof Error) {
      return { error, data: null, success: false };
    }
    return { error: "Error in edit record", data: null, success: false };
  }
};

export const deleteExperienceParticularId = async (id: string): Promise<{
  data?: IExperienceResponse[] | null;
  success?: boolean;
  error: Error | string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from("experience")
      .delete()
      .eq("id", id);
    if (error) {
      throw new Error("Error in edit record");
    }
    return { error: null, data, success: true };
  } catch (error) {
    // console.log(error);
    if (error instanceof Error) {
      return { error, data: null, success: false };
    }
    return { error: "Error in edit record", data: null, success: false };
  }
};