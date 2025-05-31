'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Header from "@/components/portfolioView/Header"
import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import { useCallback, useEffect, useMemo, useState } from "react"
import { uploadFile } from "@/app/helpers/uploads"
import userGlobalStore, { IuserGlobalStore } from "@/app/global-store/user-store";
import toast from "react-hot-toast";
import { getCurrentUser, updateProfile } from "@/app/actions/user";
import FormInputWrapper from "@/components/ui/FormInputWrapper";
import FormFileUploadWrapper from "@/components/ui/FormFileUploadWrapper";

const formSchema = z.object({
  whatsAppNo: z.string().nonempty("This is Required"),
  phoneNo: z.string().nonempty("This is Required"),
  primarySkills: z.string().nonempty("This is Required"),
  heroImage: z.string(),
  profileTitle: z.string().nonempty("This is Required"),
})

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { user } = userGlobalStore() as IuserGlobalStore;
  const [selectedFileUpload, setSelectedFileUpload] = useState<File | string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      whatsAppNo: "",
      phoneNo: "",
      primarySkills: "",
      heroImage: "",
      profileTitle: "",
    },
  })

  const getProfile = useCallback(async () => {
    const { error, data } = await getCurrentUser();
    if (data) {
      form.reset({
        whatsAppNo: data.whatsAppNo,
        phoneNo: data?.phoneNo,
        primarySkills: data?.primarySkills,
        heroImage: data?.heroImage,
        profileTitle: data?.profileTitle || ""
      })
      setSelectedFileUpload(data.heroImage as string);
    } else {
      if (error) {
        toast.error(error);
      } else {
        toast.error("An error occurred while fetching profile data.");
      }
    }
  }, [form, setSelectedFileUpload])

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      let heroImage;
      if (typeof (selectedFileUpload) === 'string') {
        heroImage = selectedFileUpload;
      } else {
        heroImage = (await uploadFile(selectedFileUpload!)).data.publicUrl;
      }
      const { success } : { success: boolean } = await updateProfile({
        whatsAppNo: values.whatsAppNo,
        phoneNo: values.phoneNo,
        primarySkills: values.primarySkills,
        heroImage: heroImage,
        id: user!.id!,
        profileTitle: values.profileTitle,
      })
      if (success) {
        toast.success("Successfully Updated")
        getProfile();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error(error as string)
      }
    } finally {
      setLoading(false)
    }
  }

  const heroImage = useMemo(() => {
    if (!selectedFileUpload || typeof (selectedFileUpload) === 'string') {
      return selectedFileUpload;
    }
    return URL.createObjectURL(selectedFileUpload);
  }, [selectedFileUpload])

  return (
    <>
      <div className="max-w-[800px] m-auto">
        <Header title="Profile" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <FormInputWrapper<z.infer<typeof formSchema>>
              fieldName="profileTitle" 
              control={form.control}
              errors={form.formState.errors.profileTitle}
            />
            <FormInputWrapper 
              fieldName="whatsAppNo" 
              control={form.control}
              errors={form.formState.errors.profileTitle}
            />
            <FormInputWrapper 
              fieldName="phoneNo" 
              control={form.control}
              errors={form.formState.errors.profileTitle}
            />
            <FormInputWrapper 
            fieldName="primarySkills" 
              control={form.control}
              errors={form.formState.errors.profileTitle}
            />
            <FormFileUploadWrapper 
              name="heroImage"
              form={form}
              setSelectedFileUpload={setSelectedFileUpload}
              heroImage={heroImage}
            />
            <Button disabled={loading} type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  )
}

export default Profile