"use server";

import supabase from "../config/superbase-db-config";
import { IProjectEditRequest, IProjectSaveRequest, IProjectResponse } from "../interfaces";

export const saveProject = async (
  project: IProjectSaveRequest,
): Promise<{
  data?: IProjectResponse | null;
  success?: boolean;
  error: Error | string | null;
}> => {
  try {
    console.log('saveProject')
    const { data, error } = await supabase.from("project").insert([
      {
        user_id: project.userId,
        name: project.name,
        objective: project.objective,
        description: project.description,
        skills: project.skills,
      },
    ]);
    if (error) {
      throw new Error("Error in save record");
    }
    return { error: null, data, success: true };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return { error, data: null, success: false };
    }
    return { error: "Error in save record", data: null, success: false };
  }
};

export const editProject = async (project: IProjectEditRequest) => {
  try {
    console.log('editAboutMe')
    const { data, error } = await supabase
      .from("project")
      .update([
        {
            name: project.name,
            objective: project.objective,
            description: project.description,
            skills: project.skills,
        },
      ])
      .eq("id", project.id);
    if (error) {
      throw new Error("Error in edit record");
    }
    return { error: null, data, success: true };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return { error, data: null, success: false };
    }
    return { error: "Error in edit record", data: null, success: false };
  }
};

export const fetchProject = async (userId: string): Promise<{
  data?: IProjectResponse[] | null;
  success?: boolean;
  error: Error | string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from("project")
      .select("*")
      .eq("user_id", userId);
    if (error || !data) {
      throw new Error("Error in edit record");
    }

    const mData = data.map((oData) => ({
        userId: oData.user_id,
        name: oData.name,
        objective: oData.objective,
        description: oData.description,
        skills: oData.skills,
        id: oData.id,
        createdAt: oData.created_at,
    }))

    return { error: null, data: mData, success: true };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return { error, data: null, success: false };
    }
    return { error: "Error in edit record", data: null, success: false };
  }
};


export const fetchProjectParticularId = async (id: string): Promise<{
  data?: IProjectResponse[] | null;
  success?: boolean;
  error: Error | string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from("project")
      .select("*")
      .eq("id", id);
    if (error || !data) {
      throw new Error("Error in edit record");
    }
    const mData = data.map((oData) => ({
        userId: oData.user_id,
        name: oData.name,
        objective: oData.objective,
        description: oData.description,
        skills: oData.skills,
        id: oData.id,
        createdAt: oData.created_at,
    }))
    return { error: null, data: mData, success: true };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return { error, data: null, success: false };
    }
    return { error: "Error in edit record", data: null, success: false };
  }
};


export const deleteProjectParticularId = async (id: string): Promise<{
  data?: IProjectResponse[] | null;
  success?: boolean;
  error: Error | string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from("project")
      .delete()
      .eq("id", id);
    if (error) {
      throw new Error("Error in edit record");
    }
    return { error: null, data, success: true };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return { error, data: null, success: false };
    }
    return { error: "Error in edit record", data: null, success: false };
  }
};