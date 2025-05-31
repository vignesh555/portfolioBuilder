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
import { editAboutMe, fetchAboutMe, saveAboutMe } from "@/app/actions/aboutme";
import userGlobalStore, { IuserGlobalStore } from "@/app/global-store/user-store";
import toast from "react-hot-toast";
import Image from "next/image";

const formSchema = z.object({
  bio: z.string().nonempty("This is Required"),
  bioImage: z.string(),
})

const AboutMe = () => {
  const [loading, setLoading] = useState(false);
  const { user } = userGlobalStore() as IuserGlobalStore;
  const [selectedFileUpload, setSelectedFileUpload] = useState<string | File | null>(null);
  const [aboutMeId, setAboutMeId] = useState<number | string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bio: "",
      bioImage: ""
    },
  })

  const getAboutMe = useCallback(async () => {
    if (user && user.id) {
      const { error, data, success } = await fetchAboutMe(user.id);
      if (success && data && data.length > 0) {
        form.reset({
          bio: data[0].bio,
          bioImage: data[0].bio_image,
        })
        setAboutMeId(data[0].id)
        setSelectedFileUpload(data[0].bio_image as string);
      } else {
        toast.error(error instanceof Error ? error.message : error);
      }
    }
  }, [form, user, setAboutMeId, setSelectedFileUpload])

  useEffect(() => {
    getAboutMe();
  }, [getAboutMe]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      let bioImage;
      if (typeof (selectedFileUpload) === 'string') {
        bioImage = selectedFileUpload;
      } else {
        bioImage = (await uploadFile(selectedFileUpload!)).data.publicUrl;
      }
      const saveOrEditMethod = aboutMeId ? editAboutMe : saveAboutMe;
      const { success } = await saveOrEditMethod({
        bio: values.bio,
        bioImage,
      }, user!.id!)
      if (success) {
        toast.success("Successfully Updated")
        getAboutMe();
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
    if (!selectedFileUpload || typeof(selectedFileUpload) === 'string') {
      return selectedFileUpload;
    }
    return URL.createObjectURL(selectedFileUpload);
  }, [selectedFileUpload])

  return (
    <>
      <div className="max-w-[800px] m-auto">
        <Header title="About Me" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor
                      className="bg-white min-h-[200px]"
                      value={field.value}
                      onChange={(e) => form.setValue('bio', e?.target?.value)} />
                  </FormControl>
                  {form.formState.errors.bio ? (
                    <FormMessage />
                  ) : (
                    <div className="text-sm text-muted-foreground min-h-[20px]">&nbsp;</div>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bioImage"
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
                  {form.formState.errors.bioImage ? (
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

export default AboutMe