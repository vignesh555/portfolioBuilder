"use server";

import supabase from "../config/superbase-db-config";
import { IContact } from "../interfaces";
import { ContactMeSchemaConvertedType } from "../validationSchema/contactMe";

export const saveContact = async ({
  name,
  emailId,
  subject,
  content
}: ContactMeSchemaConvertedType): Promise<{
  data?: IContact | null;
  success?: boolean;
  error: string | null;
}> => {
  try {
    await supabase
      .from("contact")
      .insert({
        name,
        email_id: emailId,
        subject,
        content,
      })
      return { error: null, data: null, success: true };
    } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, data: null, success: false };
    }
    return { error: "Error in save record", data: null, success: false };
  }
};

export const fetchContact = async (): Promise<{
  data?: IContact[] | null;
  success?: boolean;
  error: Error | string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from("contact")
      .select("*");
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
