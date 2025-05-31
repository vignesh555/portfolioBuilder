'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
} from "@/components/ui/form"
import { forwardRef, useImperativeHandle, useMemo, useState } from "react"
import userGlobalStore, { IuserGlobalStore } from "@/app/global-store/user-store";
import FormInputWrapper from "@/components/ui/FormInputWrapper";
import { saveSkills, editSkills } from "@/app/actions/skills"
import toast from "react-hot-toast"
import { uploadFile } from "@/app/helpers/uploads"
import FormFileUploadWrapper from "../ui/FormFileUploadWrapper"

const formSchema = z.object({
    name: z.string().nonempty("This is Required"),
    icon: z.union([
        z.instanceof(File),
        z.string().min(1, "Icon is required")
    ]).refine(val => val instanceof File || (typeof val === "string" && val.length > 0), {
        message: "Icon is required",
    }),
})

interface CreateSkillsProps {
    getSkills: () => void;
}

const CreateSkills = forwardRef(({ getSkills }: CreateSkillsProps, ref) => {
    const [loading, setLoading] = useState(false);
    const { user } = userGlobalStore() as IuserGlobalStore;
    const [editId, setEditId] = useState<string | null>(null);
    const [selectedFileUpload, setSelectedFileUpload] = useState<string | File | null>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            icon: "",
        },
    })

    useImperativeHandle(ref, () => ({
        populateTheForm: (row) => {
            setEditId(row.id);
            setSelectedFileUpload(row.icon);
            form.reset({
                name: row.name,
                icon: row.icon,
            });
        }
    }));

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true)
            let heroImage;
            if (typeof (selectedFileUpload) === 'string') {
                heroImage = selectedFileUpload;
            } else {
                heroImage = (await uploadFile(selectedFileUpload!)).data.publicUrl;
            }

            if (editId) {
                const { success } = await editSkills({
                    // ...values,
                    name: values.name,
                    id: editId,
                    icon: heroImage,
                    userId: user?.id || "",
                });
                if (success) {
                    toast.success("Successfully Updated");
                    form.reset({
                        name: "",
                        icon: ""
                    });
                    setSelectedFileUpload(null);
                    setEditId(null);
                    getSkills();
                } else {
                    toast.error("Error in updating record");
                }
            } else {
                const { success } = await saveSkills({
                    ...values,
                    icon: heroImage,
                    userId: user?.id || "",
                });
                if (success) {
                    toast.success("Successfully Saved");
                    form.reset({
                        name: "",
                        icon: ""
                    });
                    setSelectedFileUpload(null);
                    setEditId(null);
                    getSkills();
                } else {
                    toast.error("Error in saving record");
                }
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
        <div className="mt-10">
            <Form {...form}>
                <form className="w-full" onSubmit={form.handleSubmit(onSubmit)} >
                    <FormInputWrapper fieldName="name" form={form} />
                    <FormFileUploadWrapper
                        name="icon"
                        form={form}
                        setSelectedFileUpload={setSelectedFileUpload}
                        heroImage={heroImage}
                    />
                    <Button disabled={loading} type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
})

CreateSkills.displayName = "CreateSkills";
export default CreateSkills;