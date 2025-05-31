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
import FormDateWrapper from "@/components/ui/FormDateWrapper";
import { saveExperience, editExperience } from "@/app/actions/experience"
import toast from "react-hot-toast"
import { parse, format} from "date-fns"

const formSchema = z.object({
  position: z.string().nonempty("This is Required"),
  companyName: z.string().nonempty("This is Required"),
  countryName: z.string().nonempty("This is Required"),
  fromDate: z.coerce.date({ required_error: "This is Required", invalid_type_error: "Invalid date" }),
  endDate: z.coerce.date({ required_error: "This is Required", invalid_type_error: "Invalid date" }),
  description: z.string().nonempty("This is Required"),
})

interface CreateExperienceProps {
  getExperience: () => void;
}

const CreateExperience = forwardRef(({ getExperience }: CreateExperienceProps, ref) => {
  const [loading, setLoading] = useState(false);
  const { user } = userGlobalStore() as IuserGlobalStore;
  const [editId, setEditId] = useState<string | null>(null);
  // const [selectedFileUpload, setSelectedFileUpload] = useState(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      position: "",
      companyName: "",
      countryName: "",
      fromDate: undefined,
      endDate: undefined,
      description: ""
    },
  })

  useImperativeHandle(ref, () => ({
    populateTheForm: (row) => {
      setEditId(row.id);
      form.reset({
        position: row.position,
        companyName: row.companyName,
        countryName: row.countryName,
        fromDate: parse(row.fromDate, "dd-MM-yyyy", new Date()),
        endDate: parse(row.endDate, "dd-MM-yyyy", new Date()),
        description: row.description
      });
    }
  }));

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      if (editId) {
        const { success } = await editExperience({ 
          ...values, 
          id: editId,
          fromDate: format(new Date(values.fromDate), "dd-MM-yyyy"),
          endDate: format(new Date(values.endDate), "dd-MM-yyyy"),
         });
        if (success) {
          toast.success("Successfully Updated");
          form.reset({
             position: '',
            companyName: '',
            countryName: '',
            fromDate: undefined,
            endDate: undefined,
            description: ''
          });
          getExperience();
        } else {
          toast.error("Error in updating record");
        }
      } else {
        const { success } = await saveExperience({
          ...values, 
          fromDate: format(new Date(values.fromDate), "dd-MM-yyyy"),
          endDate: format(new Date(values.endDate), "dd-MM-yyyy"),
          userId: user?.id || "",
        });
        if (success) {
          toast.success("Successfully Saved");
          form.reset();
          getExperience();
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
          <FormInputWrapper fieldName="position" form={form} />
          <FormInputWrapper fieldName="companyName" form={form} />
          <FormInputWrapper fieldName="countryName" form={form} />
          <FormDateWrapper fieldName="fromDate" form={form} /> 
          <FormDateWrapper fieldName="endDate" form={form} /> 

          <FormMultiLineWrapper fieldName="description" form={form} />
          <Button disabled={loading} type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
})

CreateExperience.displayName = "CreateExperience";
export default CreateExperience;