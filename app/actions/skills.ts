"use server";

import { revalidatePath } from "next/cache";
import supabase from "../config/superbase-db-config";
import { ISkillsEditRequest, ISkillsSaveRequest, ISkillsResponse } from "../interfaces";

export const saveSkills = async (
  skills: ISkillsSaveRequest,
): Promise<{
  data?: ISkillsResponse | null;
  success?: boolean;
  error: Error | string | null;
}> => {
  try {
    const { data, error } = await supabase.from("skills").insert([
      {
        user_id: skills.userId,
        name: skills.name,
        icon: skills.icon,
      },
    ]);
    revalidatePath("/profile/" + skills.userId);
    if (error) {
      throw new Error("Error in save record");
    }
    return { 
        error: null, 
        data, 
        success: true 
};
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return { error, data: null, success: false };
    }
    return { error: "Error in save record", data: null, success: false };
  }
};

export const editSkills = async (skills: ISkillsEditRequest) => {
  try {
    const { data, error } = await supabase
      .from("skills")
      .update([
        {
            // user_id: skills.userId,
            name: skills.name,
            icon: skills.icon,
        },
      ])
      .eq("id", skills.id);
      revalidatePath("/profile/" + skills.userId);
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

export const fetchSkills = async (userId: string): Promise<{
  data?: ISkillsResponse[] | null;
  success?: boolean;
  error: Error | string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .eq("user_id", userId);
    if (error || !data) {
      throw new Error("Error in edit record");
    }

    const mData = data.map((oData) => ({
        id: oData.id,
        createdAt: oData.created_at,
        userId: oData.user_id,
        name: oData.name,
        icon: oData.icon,
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


export const fetchSkillsParticularId = async (id: string): Promise<{
  data?: ISkillsResponse[] | null;
  success?: boolean;
  error: Error | string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .eq("id", id);
    if (error || !data) {
      throw new Error("Error in edit record");
    }
    const mData = data.map((oData) => ({
        id: oData.id,
        createdAt: oData.created_at,
        userId: oData.user_id,
        name: oData.name,
        icon: oData.icon,
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


export const deleteSkillsParticularId = async (id: string, userId: string | undefined): Promise<{
  data?: ISkillsResponse[] | null;
  success?: boolean;
  error: Error | string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from("skills")
      .delete()
      .eq("id", id);
      revalidatePath("/profile/" + userId);
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
