"use client"
import Header from "./Header";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
} from "@/components/ui/form"
import LayoutWrapper from "./LayoutWrapper";
import { saveContact } from "@/app/actions/contact";
import { useTransition } from "react";
import { contactMeSchema, ContactMeSchemaConvertedType } from "@/app/validationSchema/contactMe";
import FormInputWrapper from "../ui/FormInputWrapper";
import FormMultiLineWrapper from "../ui/FormMultiLineWrapper";
import toast from "react-hot-toast";

function ContactMe() {
    const [isPending, startTransition] = useTransition();

    const form = useForm<ContactMeSchemaConvertedType>({
        resolver: zodResolver(contactMeSchema),
        defaultValues: {
            name: "",
            emailId: "",
            subject: "",
            content: "",
        },
    })
    async function onSubmit(values: ContactMeSchemaConvertedType) {
        startTransition(async () => {
            const { success, error } = await saveContact({
                name: values.name,
                emailId: values.emailId,
                subject: values.subject,
                content: values.content,
            });
            form.reset();
            if (success) {
                toast.success("Your message has been sent successfully!");
            }
            if (error) {
                toast.error(error);
            }
        });
    }
    return (
        <LayoutWrapper id="contact">
            <Header title="Contact Me" />
            <div className="w-full flex justify-between items-center md:justify-center">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                        <FormInputWrapper<ContactMeSchemaConvertedType>
                            control={form.control}
                            fieldName="name"
                            errors={form.formState.errors.name}
                            maxLength={50}
                        />
                        <FormInputWrapper<ContactMeSchemaConvertedType>
                            control={form.control}
                            fieldName="emailId"
                            errors={form.formState.errors.emailId}
                            maxLength={50}
                        />

                        <FormInputWrapper<ContactMeSchemaConvertedType>
                            control={form.control}
                            fieldName="subject"
                            errors={form.formState.errors.subject}
                            maxLength={50}
                        />
                        <FormMultiLineWrapper<ContactMeSchemaConvertedType>
                            form={form}
                            fieldName="content"

                        />
                        <Button disabled={isPending} type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </LayoutWrapper>
    )
}

export default ContactMe;