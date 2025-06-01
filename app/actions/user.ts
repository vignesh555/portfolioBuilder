"use server";

import supabase from "../config/superbase-db-config";
import { currentUser } from "@clerk/nextjs/server";
import { ICurrentUserResponse, IUser, IUserProfileResponse, IUserRequest } from "../interfaces";
import toast from "react-hot-toast";

export const saveCurrentUser = async (userData: IUser) => {
  try {
    const { data, error } = await supabase
      .from("user_profiles")
      .insert([userData]);
    if (error) {
      throw new Error("Error in save record");
    }
    return {
      data,
      success: true,
    };
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
};

const getUserProfile = async (clerkUserId: string) : Promise<IUserProfileResponse> => {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("clerk_user_id", clerkUserId);

  if (error) {
     return {
      success: false,
      data: null,
      error: "Error fetching data"
    };
  }
  const user = data.length > 0 ? data[0] : null;
  if (user) {
    return {
      success: true,
      data: user,
      error: null
    };
  }
  return {
    success: false,
    data: user,
    error: null
  };
};



export const getCurrentUser = async (): Promise<ICurrentUserResponse> => {
  try {
    const clerkUser = await currentUser();
    const { data, success } = await getUserProfile(clerkUser!.id);
    if (success) {
      return {
        success: true,
        data: {
          id: data?.id || "",
          full_name: data?.full_name || "",
          email: data?.email || "",
          whatsAppNo: data?.whatsapp_no || "",
          phoneNo: data?.phone_no || "",
          primarySkills: data?.primary_skills || "",
          heroImage: data?.hero_image || "",
          profileTitle: data?.profile_title || ""
        },
        error: null
      };
    }
    const userData = {
      full_name: clerkUser?.firstName + " " + clerkUser?.lastName || "",
      email: clerkUser?.emailAddresses[0].emailAddress || "",
      clerk_user_id: clerkUser?.id || "",
    };
    const response = await saveCurrentUser(userData);
    if (response.success) {
      toast.success("Profile successfully updated");
      const { data: saveData, success: saveSuccess } = await getUserProfile(
        clerkUser!.id
      );
      return {
        success: saveSuccess,
        data: saveData,
        error: null,
      };
    }
    throw new Error(response.error);
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
    return {
        success: false,
        data: null,
        error: 'Error in fetching',
      };
  }
};

export const updateProfile = async (user: IUserRequest) => {
  try {
    const { data, error } = await supabase
      .from("user_profiles")
      .update({
        whatsapp_no: user.whatsAppNo,
        phone_no: user.phoneNo,
        primary_skills: user.primarySkills,
        hero_image: user.heroImage,
        profile_title: user.profileTitle,
      })
      .eq("id", user.id);
    if (error) {
      throw new Error("update on error");
    }
    return {
      success: true,
      data,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        data: error.message,
      };
    }
    return {
      success: false,
      data: "update on error",
    };
  }
};
