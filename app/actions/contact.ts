"use server";

import supabase from "../config/superbase-db-config";
import { IContact } from "../interfaces";

export const fetchContact = async (userId: string): Promise<{
  data?: IContact[] | null;
  success?: boolean;
  error: Error | string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from("contact")
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
        emailId: oData.email_id,
        subject: oData.subject,
        content: oData.content,
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
