'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Editor from 'react-simple-wysiwyg';
import Header from "@/components/portfolioView/Header"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCallback, useEffect, useMemo, useState } from "react"
import { uploadFile } from "@/app/helpers/uploads"
import userGlobalStore, { IuserGlobalStore } from "@/app/global-store/user-store";
import toast from "react-hot-toast";
import Image from "next/image";
import { getCurrentUser, updateProfile } from "@/app/actions/user";

const formSchema = z.object({
  whatsAppNo: z.string().nonempty("This is Required"),
  phoneNo: z.string().nonempty("This is Required"),
  primarySkills: z.string().nonempty("This is Required"),
  heroImage: z.string(),
})

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { user } = userGlobalStore() as IuserGlobalStore;
  const [selectedFileUpload, setSelectedFileUpload] = useState(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      whatsAppNo: "",
      phoneNo: "",
      primarySkills: "",
      heroImage: ""
    },
  })

  const getProfile = useCallback(async () => {
    const { error, data } = await getCurrentUser();
    console.log('data', data);
    if (data) {
      form.reset({
        whatsAppNo: data.whatsapp_no,
        phoneNo: data?.phone_no,
        primarySkills: data?.primary_skills,
        heroImage: data?.hero_image,
      })
      setSelectedFileUpload(data.hero_image as string);
    } else {
      toast.error(error instanceof Error ? error.message : error);
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
      const { success } = await updateProfile({
        whatsapp_no: values.whatsAppNo,
        phone_no: values.phoneNo,
        primary_skills: values.primarySkills,
        hero_image: heroImage,
        id: user!.id!
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
            <FormField
              control={form.control}
              name="whatsAppNo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="bg-white" placeholder="Enter Whatapp No" {...field} />
                  </FormControl>
                  {form.formState.errors['whatsAppNo'] ? (
                    <FormMessage />
                  ) : (
                    <div className="text-sm text-muted-foreground min-h-[20px]">&nbsp;</div>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="bg-white" placeholder="Enter Phone No" {...field} />
                  </FormControl>
                  {form.formState.errors.phoneNo ? (
                    <FormMessage />
                  ) : (
                    <div className="text-sm text-muted-foreground min-h-[20px]">&nbsp;</div>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="primarySkills"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="bg-white" placeholder="Enter Primary skills" {...field} />
                  </FormControl>
                  {form.formState.errors.primarySkills ? (
                    <FormMessage />
                  ) : (
                    <div className="text-sm text-muted-foreground min-h-[20px]">&nbsp;</div>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="heroImage"
              render={() => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-white"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setSelectedFileUpload(e.target.files![0])
                      }}
                    />
                  </FormControl>
                  {form.formState.errors.heroImage ? (
                    <FormMessage />
                  ) : (
                    <div className="text-sm text-muted-foreground min-h-[20px]">&nbsp;</div>
                  )}
                  {heroImage && <div className="border p-2 w-max">
                    <Image
                      src={heroImage}
                      className="w-32 h-32"
                      alt="Hero image"
                      width={150}
                      height={150}
                    />
                  </div>}
                </FormItem>
              )}
            />
            <Button disabled={loading} type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  )
}

export default Profile