"use server";

import supabase from "../config/superbase-db-config";
import { IAboutMeRequest, IAboutMeResponse } from "../interfaces";

export const saveAboutMe = async (
  aboutMe: IAboutMeRequest,
  userId: string
): Promise<{
  data?: IAboutMeResponse | null;
  success?: boolean;
  error: Error | string | null;
}> => {
  try {
    const { data, error } = await supabase.from("about_me").insert([
      {
        bio: aboutMe.bio,
        bio_image: aboutMe.bioImage,
        user_id: userId
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

export const editAboutMe = async (aboutMe: IAboutMeRequest, userId: string) => {
  try {
    const { data, error } = await supabase
      .from("about_me")
      .update([
        {
          bio: aboutMe.bio,
          bio_image: aboutMe.bioImage,
        },
      ])
      .eq("user_id", userId);
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

export const fetchAboutMe = async (userId: string): Promise<{
  data?: IAboutMeResponse[] | null;
  success?: boolean;
  error: Error | string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from("about_me")
      .select("*")
      .eq("user_id", userId);
    if (error || !data) {
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
