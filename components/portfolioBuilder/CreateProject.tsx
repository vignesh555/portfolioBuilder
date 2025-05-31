'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import { forwardRef, useImperativeHandle, useState } from "react"
import userGlobalStore, { IuserGlobalStore } from "@/app/global-store/user-store";
import FormInputWrapper from "@/components/ui/FormInputWrapper";
import FormMultiLineWrapper from "@/components/ui/FormMultiLineWrapper";
import { saveProject, editProject } from "@/app/actions/project"
import toast from "react-hot-toast"
import { IProjectResponse } from "@/app/interfaces"

const formSchema = z.object({
  name: z.string().nonempty("This is Required"),
  objective: z.string().nonempty("This is Required"),
  description: z.string().nonempty("This is Required"),
  skills: z.string().nonempty("This is Required"),
})

interface CreateProjectProps {
  getProject: () => void;
}

const CreateProject = forwardRef(({ getProject }: CreateProjectProps, ref) => {
  const [loading, setLoading] = useState(false);
  const { user } = userGlobalStore() as IuserGlobalStore;
  const [editId, setEditId] = useState<string | null>(null);
  // const [selectedFileUpload, setSelectedFileUpload] = useState(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      objective: "",
      description: "",
      skills: ""
    },
  })

  useImperativeHandle(ref, () => ({
    populateTheForm: (row: IProjectResponse) => {
      setEditId(row.id);
      form.reset({
        name: row.name,
        objective: row.objective,   
        description: row.description, 
        skills: row.skills
      });
    }
  }));

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      if (editId) {
        const { success } = await editProject({ 
          ...values, 
          id: editId,
        });
        if (success) {
          toast.success("Successfully Updated");
          form.reset({
            name: "",
            objective: "",
            description: "",
            skills: ""
          });
          getProject();
        } else {
          toast.error("Error in updating record");
        }
      } else {
        const { success } = await saveProject({
          ...values, 
          userId: user?.id || "",
        });
        if (success) {
          toast.success("Successfully Saved");
          form.reset();
          getProject();
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


  return (
    <div className="mt-10">
      <Form {...form}>
        <form className="w-full" onSubmit={form.handleSubmit(onSubmit)} >
          <FormInputWrapper<z.infer<typeof formSchema>> 
            fieldName="name" 
            control={form.control}
            errors={form.formState.errors.name}
          />
          <FormInputWrapper<z.infer<typeof formSchema>> 
            fieldName="objective" 
            control={form.control}
            errors={form.formState.errors.objective}
          />
          <FormMultiLineWrapper<z.infer<typeof formSchema>> 
            fieldName="description" 
            form={form} 
          />
          <FormInputWrapper<z.infer<typeof formSchema>> 
            fieldName="skills" 
            control={form.control}
            errors={form.formState.errors.skills}
          />
          <Button disabled={loading} type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
})

CreateProject.displayName = "CreateProject";
export default CreateProject;