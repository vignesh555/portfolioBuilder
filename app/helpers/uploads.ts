import supabase from "../config/superbase-db-config";

export async function uploadFile(file: File) {
    try {
        const fileName = `${Date.now()}-${file.name}`
        await supabase.storage.from('basic').upload(fileName, file)
        const publicUrl = supabase.storage.from('basic').getPublicUrl(fileName);
        return publicUrl;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('something went wrong');

    }
  }